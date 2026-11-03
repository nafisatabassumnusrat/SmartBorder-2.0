import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Eye, 
  Plane, 
  Anchor, 
  Radio, 
  Waves, 
  Clock, 
  Split, 
  Maximize2, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Compass
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { BANGLADESH_SECTORS } from '../../mockData/bangladeshSectors';
import { deviceService } from '../../services/deviceService';
import { observationService } from '../../services/observationService';
import { Device, Observation, SectorInfo } from '../../types';

export const GeospatialIntelligence: React.FC = () => {
  const { language, selectedSector, setSelectedSector, dataRevision } = useAppStore();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [devices, setDevices] = useState<Device[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [activeLayer, setActiveLayer] = useState<'STREET' | 'SATELLITE' | 'DARK'>('DARK');
  const [showFlightPaths, setShowFlightPaths] = useState<boolean>(true);
  const [showRiverLayers, setShowRiverLayers] = useState<boolean>(true);
  const [showSensors, setShowSensors] = useState<boolean>(true);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareSliderPos, setCompareSliderPos] = useState<number>(50);

  // Center of Bangladesh
  const BD_CENTER: [number, number] = [23.85, 90.35];

  useEffect(() => {
    const loadData = async () => {
      const [devList, obsList] = await Promise.all([
        deviceService.getDevices(),
        observationService.getObservations()
      ]);
      setDevices(devList);
      setObservations(obsList);
    };
    loadData();
  }, [dataRevision]);

  // Leaflet initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: selectedSector ? selectedSector.coordinates : BD_CENTER,
        zoom: selectedSector ? 9 : 7,
        zoomControl: true,
        attributionControl: false,
        maxBounds: [
          [20.0, 87.0],
          [27.0, 93.5]
        ]
      });

      // CartoDB base
      const tileUrl = activeLayer === 'SATELLITE'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        : activeLayer === 'STREET'
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl, { maxZoom: 18 }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers except tiles
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.Polyline || layer instanceof L.Polygon) {
        map.removeLayer(layer);
      }
    });

    // Sector polygons & markers
    BANGLADESH_SECTORS.forEach((sec) => {
      const isCurrent = selectedSector?.id === sec.id;
      const markerColor = sec.threatLevel === 'HIGH' ? '#EF4444' : sec.threatLevel === 'MEDIUM' ? '#F59E0B' : '#24A477';

      // Sector Center Marker
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="background-color: ${markerColor}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); ${isCurrent ? 'transform: scale(1.4); outline: 3px solid #2386C8;' : ''}"></div>
        `,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker(sec.coordinates, { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px; min-width: 180px;">
          <div style="font-weight: bold; font-size: 13px; color: #10243A;">${sec.name}</div>
          <div style="font-size: 11px; color: #2386C8; margin-top: 2px;">${sec.bgbBattalion}</div>
          <div style="font-size: 11px; color: #475569; margin-top: 4px;">Terrain: ${sec.terrainType}</div>
          <div style="font-size: 11px; color: #475569;">Active UAVs: ${sec.activeUavs} | Boats: ${sec.activeBoats}</div>
        </div>
      `);

      marker.on('click', () => {
        setSelectedSector(sec);
      });

      // Buffer perimeter circle around sector
      if (isCurrent) {
        L.circle(sec.coordinates, {
          radius: 25000,
          color: '#2386C8',
          fillColor: '#2386C8',
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: '4, 4'
        }).addTo(map);
      }
    });

    // Drone flight path polygon simulation
    if (showFlightPaths) {
      // Sylhet UAV patrol loop
      const sylhetRoute: [number, number][] = [
        [25.1740, 92.0125],
        [25.1950, 92.0500],
        [25.1600, 92.0800],
        [25.1400, 92.0300],
        [25.1740, 92.0125]
      ];
      L.polyline(sylhetRoute, {
        color: '#0284C7',
        weight: 2,
        dashArray: '6, 6',
        opacity: 0.8
      }).addTo(map);

      // Teknaf Naf River boat patrol vector
      const teknafVector: [number, number][] = [
        [20.8900, 92.2800],
        [20.8647, 92.2980],
        [20.8300, 92.3200]
      ];
      L.polyline(teknafVector, {
        color: '#14B8A6',
        weight: 3,
        opacity: 0.9
      }).addTo(map);
    }

    // Hardware devices markers
    if (showSensors) {
      devices.forEach((dev) => {
        const devIcon = L.divIcon({
          className: 'dev-icon',
          html: `
            <div style="background-color: ${dev.type === 'DRONE_UAV' ? '#0284C7' : dev.type === 'FALCON_BOAT' ? '#14B8A6' : '#6366F1'}; width: 10px; height: 10px; border-radius: 2px; border: 1.5px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.3);"></div>
          `,
          iconSize: [10, 10],
          iconAnchor: [5, 5]
        });

        const m = L.marker([dev.coordinates.lat, dev.coordinates.lng], { icon: devIcon }).addTo(map);
        m.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px;">
            <div style="font-weight: bold; font-size: 12px; color: #10243A;">${dev.callsign}</div>
            <div style="font-size: 10px; color: #64748B;">Type: ${dev.type} | Battery: ${dev.batteryPct}%</div>
            <div style="font-size: 10px; color: #24A477; font-weight: bold;">Status: ${dev.status}</div>
          </div>
        `);
      });
    }

  }, [selectedSector, activeLayer, showFlightPaths, showSensors, devices]);

  const handleZoomToSector = (sec: SectorInfo) => {
    setSelectedSector(sec);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(sec.coordinates, 10, { duration: 1.2 });
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(BD_CENTER, 7, { duration: 1 });
    }
  };

  const activeSec = selectedSector || BANGLADESH_SECTORS[0];

  return (
    <div className="pb-12">
      <PageHeader
        category="INTELLIGENCE MODULES"
        categoryBn="গোয়েন্দা প্রযুক্তি মডিউল"
        title={language === 'BN' ? 'ভূস্থানিক গোয়েন্দা তথ্য (GIS)' : 'Geospatial Intelligence'}
        subtitle={language === 'BN' 
          ? 'বাংলাদেশ জিআইএস মানচিত্র, নদী ব্যবস্থার স্তর, সীমান্ত সেক্টর ও সেন্সর অবস্থান' 
          : 'National GIS spatial intelligence, river system hydrography, sensor placements, and historical raster comparisons'}
        statusBadge="SENTINEL-2 COPERNICUS LINK ACTIVE"
        actionButtons={
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#2386C8] bg-white text-[#2386C8] hover:bg-blue-50 text-xs font-semibold shadow-xs transition-colors"
          >
            <Split className="w-3.5 h-3.5" />
            <span>{language === 'BN' ? 'ঐতিহাসিক উপগ্রহ তুলনা' : 'Historical Image Compare'}</span>
          </button>
        }
      />

      <div className="px-6 space-y-4 max-w-7xl mx-auto">
        {/* Layer Controls & Quick Sector Jump Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          {/* Layer toggles */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-mono text-[11px] uppercase mr-1">Layers:</span>
            
            <button
              onClick={() => setShowFlightPaths(!showFlightPaths)}
              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                showFlightPaths 
                  ? 'bg-blue-50  text-[#2386C8] border-blue-200  font-semibold' 
                  : 'border-slate-200  text-slate-500'
              }`}
            >
              Flight Patrol Paths
            </button>

            <button
              onClick={() => setShowSensors(!showSensors)}
              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                showSensors 
                  ? 'bg-emerald-50  text-emerald-700  border-emerald-200  font-semibold' 
                  : 'border-slate-200  text-slate-500'
              }`}
            >
              Sensor Towers & Assets
            </button>

            <button
              onClick={() => setShowRiverLayers(!showRiverLayers)}
              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                showRiverLayers 
                  ? 'bg-teal-50  text-teal-700  border-teal-200  font-semibold' 
                  : 'border-slate-200  text-slate-500'
              }`}
            >
              River Systems Layer
            </button>
          </div>

          {/* Base map style */}
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={handleResetView}
              className="px-2.5 py-1 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px] font-semibold"
            >
              Reset Bangladesh Fit
            </button>
          </div>
        </div>

        {/* Main Map Workspace with Sector Inspector Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Map Canvas (3 columns) */}
          <div className="lg:col-span-3 rounded-xl border border-slate-200 overflow-hidden bg-slate-900 h-[620px] relative shadow-xs">
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Quick Sector Floating Selector */}
            <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5 max-w-lg bg-white/95 backdrop-blur-xs p-2 rounded-lg border border-slate-200 shadow-md">
              <span className="text-[10px] font-mono text-slate-400 uppercase w-full mb-1">
                {language === 'BN' ? 'দ্রুত সেক্টর নির্বাচন:' : 'Quick Sector Focus:'}
              </span>
              {BANGLADESH_SECTORS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleZoomToSector(sec)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    activeSec.id === sec.id
                      ? 'bg-[#10243A] text-white '
                      : 'bg-slate-100  text-slate-700  hover:bg-slate-200'
                  }`}
                >
                  {language === 'BN' ? sec.nameBn.split('–')[0].trim() : sec.name.split('–')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Sector Inspector Drawer (1 column) */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-[10px] font-mono uppercase text-[#2386C8] font-bold">
                  {language === 'BN' ? 'সেক্টর স্পেশাল ডজিয়ার' : 'SECTOR GIS DOSSIER'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeSec.threatLevel === 'HIGH' ? 'bg-red-100 text-red-700  ' :
                  activeSec.threatLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700  ' :
                  'bg-emerald-100 text-emerald-700  '
                }`}>
                  {activeSec.threatLevel}
                </span>
              </div>

              <h3 className="font-bold text-base text-[#10243A] mt-2 leading-snug">
                {language === 'BN' ? activeSec.nameBn : activeSec.name}
              </h3>
              <p className="text-xs text-[#2386C8] font-semibold mt-0.5">
                {activeSec.bgbBattalion}
              </p>

              <div className="text-[11px] font-mono text-slate-500 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                LAT: {activeSec.coordinates[0].toFixed(4)}° N | LNG: {activeSec.coordinates[1].toFixed(4)}° E
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {activeSec.description}
              </p>

              {/* Topography details */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Terrain Type:</span>
                  <span className="font-semibold text-slate-800">{activeSec.terrainType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Major River:</span>
                  <span className="font-semibold text-slate-800">{activeSec.primaryRiver || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Active Drones:</span>
                  <span className="font-semibold text-slate-800">{activeSec.activeUavs} Units</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Falcon Boats:</span>
                  <span className="font-semibold text-slate-800">{activeSec.activeBoats} Craft</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Sensor Towers:</span>
                  <span className="font-semibold text-slate-800">{activeSec.sensorTowers} Masts</span>
                </div>
              </div>
            </div>

            {/* Bottom action button */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-[#2386C8] hover:bg-[#1b6fa7] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-xs"
              >
                <Split className="w-3.5 h-3.5" />
                <span>{language === 'BN' ? 'উপগ্রহ ছবি তুলনা করুন' : 'Compare Satellite History'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Imagery Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-lg text-[#10243A] flex items-center space-x-2">
                  <span>{language === 'BN' ? 'উপগ্রহ চিত্র তুলনা: ২০১৫ বনাম ২০২৬' : 'Satellite Imagery Comparison: Baseline (2020) vs Current (2026)'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Padma and Jamuna braided channels displacement and riverbank boundary changes
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Split Comparison Slider Canvas */}
            <div className="mt-4 relative h-[380px] rounded-xl overflow-hidden border border-slate-200 select-none">
              {/* Background: Current 2026 Image */}
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80"
                alt="Current Satellite 2026"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/60 text-white text-[11px] font-mono px-2.5 py-1 rounded backdrop-blur-xs font-bold">
                Sentinel-2 (Current 2026)
              </div>

              {/* Foreground: Historical 2020 Image (Clipped by slider position) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
                style={{ width: `${compareSliderPos}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80"
                  alt="Historical Satellite 2020"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: '100%', maxWidth: 'none' }}
                />
                <div className="absolute top-3 left-3 bg-[#10243A]/80 text-[#38BDF8] text-[11px] font-mono px-2.5 py-1 rounded backdrop-blur-xs font-bold">
                  Landsat-8 (Baseline 2020)
                </div>
              </div>

              {/* Draggable Slider Range */}
              <input
                type="range"
                min="0"
                max="100"
                value={compareSliderPos}
                onChange={(e) => setCompareSliderPos(+e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>

            {/* Slider Controls / Instructions */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span>◀ Drag slider left/right to reveal temporal river erosion and char accretion ▶</span>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#10243A] text-white text-xs font-semibold hover:bg-[#173B5C]"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

