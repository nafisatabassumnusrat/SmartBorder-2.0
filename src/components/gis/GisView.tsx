import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Compass, 
  Filter, 
  Activity, 
  Eye, 
  AlertTriangle,
  Radio,
  Clock,
  Maximize2
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { observationService } from '../../services/observationService';
import { deviceService } from '../../services/deviceService';
import { MOCK_ENV_CHANGES } from '../../mockData/environmentalChanges';
import { Device, Observation, EnvironmentalChangeFeature } from '../../types';
import { formatCoordinates, formatRelativeTime } from '../../utils/formatters';

export const GisView: React.FC = () => {
  const { dataRevision, setActiveTab } = useAppStore();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [observations, setObservations] = useState<Observation[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [envChanges, setEnvChanges] = useState<EnvironmentalChangeFeature[]>(MOCK_ENV_CHANGES);
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [showFlightPaths, setShowFlightPaths] = useState<boolean>(true);
  const [showEnvLayer, setShowEnvLayer] = useState<boolean>(true);

  // Center coordinate of our demonstration training sector
  const DEMO_CENTER: [number, number] = [31.7820, -106.4420];

  useEffect(() => {
    const fetchData = async () => {
      const [obsList, devList] = await Promise.all([
        observationService.getObservations(),
        deviceService.getDevices()
      ]);
      setObservations(obsList);
      setDevices(devList);
      if (obsList.length > 0 && !selectedObs) {
        setSelectedObs(obsList[0]);
      }
    };
    fetchData();
  }, [dataRevision]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create map
      const map = L.map(mapContainerRef.current, {
        center: DEMO_CENTER,
        zoom: 13,
        zoomControl: true,
        attributionControl: false
      });

      // CartoDB Dark Matter tactical tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers/layers except tile layer
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    // 1. Add Demonstration Sector Boundary Polygons
    const demoPolygon = L.polygon([
      [31.8300, -106.4700],
      [31.8300, -106.3900],
      [31.7450, -106.3900],
      [31.7450, -106.4700]
    ], {
      color: '#10B981',
      weight: 1.5,
      dashArray: '4, 4',
      fillColor: '#10B981',
      fillOpacity: 0.04
    }).addTo(map);

    demoPolygon.bindTooltip('DEMO BOUNDARY // SYNTHETIC RANGE ALPHA-BRAVO', {
      permanent: true,
      direction: 'top',
      className: 'bg-slate-900 text-emerald-400 font-mono text-[10px] border border-emerald-500/30'
    });

    // 2. Add Observation Markers
    observations.forEach((obs) => {
      const isCritical = obs.confidence >= 0.90;
      const markerColor = isCritical ? '#EF4444' : '#10B981';

      const customIcon = L.divIcon({
        className: 'custom-tactical-marker',
        html: `
          <div style="
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: rgba(13, 21, 38, 0.9);
            border: 2px solid ${markerColor};
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px ${markerColor}60;
          ">
            <div style="
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: ${markerColor};
            "></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([obs.coordinates.lat, obs.coordinates.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedObs(obs);
      });

      marker.bindPopup(`
        <div style="font-family: monospace; font-size: 11px; padding: 4px;">
          <div style="font-weight: bold; color: ${markerColor}; margin-bottom: 4px;">
            ● ${obs.label}
          </div>
          <div style="color: #94A3B8; margin-bottom: 2px;">
            Confidence: <strong>${(obs.confidence * 100).toFixed(1)}%</strong>
          </div>
          <div style="color: #94A3B8; margin-bottom: 2px;">
            Sector: ${obs.sector}
          </div>
          <div style="color: #64748B; font-size: 9px; margin-top: 4px;">
            LAT/LNG: ${obs.coordinates.lat.toFixed(4)}, ${obs.coordinates.lng.toFixed(4)}
          </div>
        </div>
      `);
    });

    // 3. Add Drone UAV Flight Path
    if (showFlightPaths) {
      const flightPathCoords: [number, number][] = [
        [31.7700, -106.4600],
        [31.7820, -106.4420],
        [31.7950, -106.4250],
        [31.8150, -106.4020]
      ];

      L.polyline(flightPathCoords, {
        color: '#10B981',
        weight: 2,
        dashArray: '6, 6',
        opacity: 0.7
      }).addTo(map);

      // UAV icon at current position
      const uavIcon = L.divIcon({
        className: 'uav-marker',
        html: `
          <div style="
            background: #10B981;
            color: #070B14;
            padding: 4px 8px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 10px;
            font-weight: bold;
            border: 1px solid white;
            white-space: nowrap;
          ">
            ✈ SkyGuard-Alpha 01 (145m)
          </div>
        `,
        iconAnchor: [60, 20]
      });

      L.marker([31.7820, -106.4420], { icon: uavIcon }).addTo(map);
    }

    // 4. Environmental Change Layer
    if (showEnvLayer) {
      envChanges.forEach((env) => {
        L.circle([env.coordinates.lat, env.coordinates.lng], {
          radius: 350,
          color: '#F59E0B',
          fillColor: '#F59E0B',
          fillOpacity: 0.15,
          weight: 1.5,
          dashArray: '3, 3'
        }).addTo(map).bindTooltip(`Δ NDVI ${env.ndviDelta} (${env.type})`, {
          permanent: false,
          direction: 'center',
          className: 'bg-black text-amber-300 font-mono text-[9px]'
        });
      });
    }

  }, [observations, devices, envChanges, showFlightPaths, showEnvLayer]);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              GIS &amp; Environmental Intelligence
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              GEOSPATIAL TAC-MAP
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time geospatial observation tracking, environmental vegetation anomalies (NDVI), and UAV flight paths across demonstration training sectors.
          </p>
        </div>

        {/* Data Freshness Indicator */}
        <div className="flex items-center space-x-3 bg-[#0D1526] border border-[#1E293B] px-3.5 py-1.5 rounded-lg text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-300">FRESHNESS:</span>
            <span className="text-emerald-400 font-bold">&lt; 1.2s (ACTIVE)</span>
          </div>
          <div className="w-px h-3.5 bg-slate-700" />
          <div className="text-slate-400">
            CRS: <span className="text-slate-200">WGS84 / UTM 13N</span>
          </div>
        </div>
      </div>

      {/* Synthetic Coordinates Disclaimer Banner */}
      <div className="p-3 rounded-lg bg-[#0D1526] border border-[#1E293B] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2 font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-slate-200">Demonstration Location Boundary:</strong> Coordinates shown are synthetic tactical test sectors. No real-world classified locations or sensitive facilities are exposed.
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
          DATA_SOURCE = "SIMULATED"
        </span>
      </div>

      {/* Main Map Layout: 8 Cols Map + 4 Cols Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Container & Controls (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          {/* Map Layer Toolbar */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 text-[10px] uppercase font-bold pl-1">Map Layers:</span>
              <button
                onClick={() => setShowFlightPaths(!showFlightPaths)}
                className={`px-2 py-1 rounded transition-colors ${
                  showFlightPaths
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                UAV Flight Path: {showFlightPaths ? 'VISIBLE' : 'HIDDEN'}
              </button>

              <button
                onClick={() => setShowEnvLayer(!showEnvLayer)}
                className={`px-2 py-1 rounded transition-colors ${
                  showEnvLayer
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                NDVI Delta Layer: {showEnvLayer ? 'VISIBLE' : 'HIDDEN'}
              </button>
            </div>

            <div className="text-[10px] text-slate-400 flex items-center space-x-2 pr-1">
              <span>Zoom to:</span>
              <button
                onClick={() => mapInstanceRef.current?.setView(DEMO_CENTER, 14)}
                className="text-emerald-400 hover:underline"
              >
                Sector Bravo-4
              </button>
            </div>
          </div>

          {/* Leaflet Map Div */}
          <div className="relative rounded-xl overflow-hidden border border-[#1E293B] shadow-2xl h-[560px] bg-[#070B14]">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Floating Map Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-[#0D1526]/90 backdrop-blur-md border border-[#1E293B] p-3 rounded-lg text-xs font-mono space-y-1.5 shadow-xl pointer-events-none select-none">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Tactical Legend</div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-slate-300 text-[10px]">Critical Observation (&gt;90% Conf)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-300 text-[10px]">Verified Target Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-300 text-[10px]">NDVI / Soil Disturbance Zone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Observation Details Drawer & Environmental Change Cards (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Observation Inspection Drawer */}
          {selectedObs ? (
            <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-semibold text-slate-100">Pin Target Details</h2>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {(selectedObs.confidence * 100).toFixed(1)}% CONF
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative rounded-lg overflow-hidden border border-[#1E293B] aspect-video">
                <img
                  src={selectedObs.evidenceThumbnail}
                  alt={selectedObs.label}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  {selectedObs.spectralBand}
                </span>
              </div>

              {/* Info rows */}
              <div className="space-y-2 text-xs font-mono divide-y divide-[#1E293B]/60">
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Class</span>
                  <span className="text-slate-200 font-bold">{selectedObs.detectionClass}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Coordinates</span>
                  <span className="text-emerald-400">
                    {formatCoordinates(selectedObs.coordinates.lat, selectedObs.coordinates.lng)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Sector</span>
                  <span className="text-slate-200">{selectedObs.sector}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Timestamp</span>
                  <span className="text-slate-300">{formatRelativeTime(selectedObs.timestamp)}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-snug p-2.5 rounded bg-[#080D1A] border border-[#1E293B]">
                {selectedObs.notes}
              </p>

              <button
                onClick={() => setActiveTab('ai-intelligence')}
                className="w-full py-2 bg-[#131E35] hover:bg-[#1A2845] text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono font-medium transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Open in Explainable AI Center →</span>
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 bg-[#0D1526] border border-[#1E293B] rounded-xl text-xs">
              Click any marker on the map to inspect target details.
            </div>
          )}

          {/* Environmental Change Summary */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2 font-mono">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Bi-Temporal Surface Changes</span>
            </h3>

            <div className="space-y-2.5">
              {envChanges.map((change) => (
                <div
                  key={change.id}
                  className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B] text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{change.name}</span>
                    <span className="text-amber-400 font-bold">Δ {change.ndviDelta}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{change.sector}</div>
                  <div className="text-[10px] text-slate-500">
                    Baseline: {change.baselineDate} → Current: {change.currentDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
