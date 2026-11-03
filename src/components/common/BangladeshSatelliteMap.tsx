import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Plus, 
  Minus, 
  Target, 
  Layers, 
  X,
  ExternalLink,
  Shield,
  Plane,
  Radio,
  AlertTriangle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface ActiveMarkerInfo {
  type: 'drone' | 'sensor' | 'alert';
  title: string;
  sector: string;
  status: string;
  detail: string;
  actionTab?: any;
}

export const BangladeshSatelliteMap: React.FC = () => {
  const { setActiveTab, addToast } = useAppStore();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeLayer, setActiveLayer] = useState<'satellite' | 'topo'>('satellite');
  const [selectedMarker, setSelectedMarker] = useState<ActiveMarkerInfo | null>(null);

  // Geographic center of Bangladesh
  const BD_CENTER: [number, number] = [23.85, 90.25];

  // Sovereign Bangladesh Border Polygon Coordinates (Approximate accurate perimeter)
  const BD_BORDER_COORDS: [number, number][] = [
    [26.38, 88.55], // Panchagarh
    [26.15, 89.00], 
    [25.80, 89.80], // Kurigram / Brahmaputra entry
    [25.20, 89.95],
    [25.10, 91.80], // Sunamganj / Sylhet border
    [24.90, 92.40], // Jaflong / Tamabil
    [24.30, 92.20], // Moulvibazar
    [23.90, 91.30], // Brahmanbaria
    [23.40, 91.30], // Cumilla
    [23.00, 92.00], 
    [22.40, 92.30], // Rangamati / Hill Tracts
    [21.60, 92.35], // Bandarban
    [20.90, 92.25], // Teknaf / Naf river
    [21.40, 91.95], // Cox's Bazar coast
    [21.80, 91.40], // Chittagong port / estuary
    [22.20, 90.50], // Meghna river mouth / Bhola
    [21.85, 89.90], // Kuakata / Patuakhali
    [21.75, 89.25], // Sundarbans coast
    [22.25, 89.05], // Satkhira / Raimangal
    [23.10, 88.85], // Jashore
    [23.75, 88.60], // Meherpur
    [24.30, 88.25], // Chapai Nawabganj / Padma entry
    [24.80, 88.35],
    [25.20, 88.90], // Dinajpur / Hili
    [25.80, 88.60], 
    [26.38, 88.55]  // Back to Panchagarh
  ];

  // Initialize and manage real Leaflet GIS Satellite Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: BD_CENTER,
        zoom: 7,
        zoomControl: false,
        attributionControl: false,
        maxBounds: [
          [20.0, 87.0],
          [27.5, 93.5]
        ],
        minZoom: 6,
        maxZoom: 13
      });

      // Genuine ArcGIS World Imagery Satellite Tiles of Bangladesh
      const satelliteTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      const tileLayer = L.tileLayer(satelliteTileUrl, {
        maxZoom: 18,
        crossOrigin: true
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Draw Glowing Cyan Sovereign Boundary of Bangladesh (#21B8D5)
      // Glow background line
      L.polygon(BD_BORDER_COORDS, {
        color: '#21B8D5',
        weight: 5,
        opacity: 0.4,
        fillColor: '#159B69',
        fillOpacity: 0.04
      }).addTo(map);

      // Sharp foreground border line
      L.polygon(BD_BORDER_COORDS, {
        color: '#00FFFF',
        weight: 2.2,
        opacity: 0.95,
        fill: false,
        dashArray: undefined
      }).addTo(map);

      // Observation Area Zones (Dashed Cyan Polygons in border sectors)
      // Kurigram / Northern Observation Zone
      L.rectangle([
        [25.60, 89.40],
        [26.10, 89.95]
      ], {
        color: '#21B8D5',
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: '#21B8D5',
        fillOpacity: 0.1
      }).addTo(map);

      // Meherpur / Western Observation Zone
      L.rectangle([
        [23.50, 88.50],
        [23.95, 88.90]
      ], {
        color: '#21B8D5',
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: '#21B8D5',
        fillOpacity: 0.1
      }).addTo(map);

      // Teknaf / Southeastern Observation Zone
      L.rectangle([
        [20.85, 92.15],
        [21.30, 92.40]
      ], {
        color: '#21B8D5',
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: '#21B8D5',
        fillOpacity: 0.1
      }).addTo(map);

      // ==========================================
      // MARKERS: Drones (Blue), Sensors (Green), Alerts (Orange)
      // ==========================================

      // 1. Drone 1: Kurigram UAV (Blue #1479C9)
      const droneIconKurigram = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="cursor:pointer; display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#1479C9; border:2px solid #FFFFFF; box-shadow:0 0 10px rgba(20,121,201,0.8);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const mDrone1 = L.marker([25.85, 89.65], { icon: droneIconKurigram }).addTo(map);
      mDrone1.on('click', () => {
        setSelectedMarker({
          type: 'drone',
          title: 'Falcon UAV-02 (Kurigram)',
          sector: 'Sector Kurigram / Brahmaputra',
          status: 'Nominal Surveillance',
          detail: 'Altitude 1,200ft · Speed 58 km/h · Battery 88% · Thermal EO/IR Active',
          actionTab: 'aerial-ai'
        });
      });

      // 2. Drone 2: Sylhet UAV (Blue #1479C9)
      const droneIconSylhet = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="cursor:pointer; display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#1479C9; border:2px solid #FFFFFF; box-shadow:0 0 10px rgba(20,121,201,0.8);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const mDrone2 = L.marker([24.88, 91.88], { icon: droneIconSylhet }).addTo(map);
      mDrone2.on('click', () => {
        setSelectedMarker({
          type: 'drone',
          title: 'Falcon UAV-04 (Sylhet)',
          sector: 'Sector Sylhet / Jaflong',
          status: 'Airborne Patrol',
          detail: 'Altitude 1,450ft · Speed 64 km/h · Real-time live feed buffering',
          actionTab: 'aerial-ai'
        });
      });

      // 3. Drone 3: Central Padma Delta (Blue #1479C9)
      const mDrone3 = L.marker([23.45, 90.15], { icon: droneIconKurigram }).addTo(map);
      mDrone3.on('click', () => {
        setSelectedMarker({
          type: 'drone',
          title: 'Falcon UAV-01 (Padma Confluence)',
          sector: 'Sector Padma Delta',
          status: 'Riverine Mapping',
          detail: 'Mapping char erosion & sandbar morphometry via RiverShift AI engine',
          actionTab: 'rivershift-ai'
        });
      });

      // 4. Drone 4: Teknaf Coastal (Blue #1479C9)
      const mDrone4 = L.marker([21.10, 92.20], { icon: droneIconKurigram }).addTo(map);
      mDrone4.on('click', () => {
        setSelectedMarker({
          type: 'drone',
          title: 'Falcon UAV-05 (Teknaf Coastal)',
          sector: 'Sector Naf River / Teknaf',
          status: 'Maritime Surveillance',
          detail: 'Altitude 950ft · Night vision IR active · Synchronized with Falcon Boat-02',
          actionTab: 'falcon-boat'
        });
      });

      // 5. Alert: Sector-12 (Orange Warning #F39A24)
      const alertIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="cursor:pointer; display:flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:#F39A24; border:2px solid #FFFFFF; box-shadow:0 0 12px rgba(243,154,36,0.9); animation:pulse 1.5s infinite;">
            <span style="color:#FFFFFF; font-weight:900; font-size:15px; line-height:1;">!</span>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const mAlert = L.marker([24.95, 92.10], { icon: alertIcon }).addTo(map);
      mAlert.on('click', () => {
        setSelectedMarker({
          type: 'alert',
          title: 'Priority Alert: Sector-12',
          sector: 'Sector-12 Sylhet / Border Post 42',
          status: 'Unauthorized Movement Detected',
          detail: 'AI Confidence 94.2% · Human verification pending triage queue',
          actionTab: 'event-alerts'
        });
      });

      // 6. Sensors (Green #159B69)
      const createSensorIcon = () => L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="cursor:pointer; width:12px; height:12px; border-radius:50%; background:#159B69; border:2px solid #FFFFFF; box-shadow:0 0 6px rgba(21,155,105,0.9);"></div>
        `,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      const sensorCoords: [number, number, string, string][] = [
        [25.30, 88.95, 'Dinajpur Seismic Node S-04', 'Sector Dinajpur / Hili'],
        [23.70, 88.70, 'Meherpur Optical Array C-12', 'Sector Meherpur / Chuadanga'],
        [22.20, 89.30, 'Sundarbans EcoGuard IR Node', 'Sector Sundarbans West'],
        [21.80, 90.10, 'Coast Guard Radar Tower ST-01', 'Sector Kuakata Outer Reach'],
        [22.35, 92.20, 'Hill Tracts LoRa Node H-08', 'Sector Chittagong Hill Tracts'],
        [24.00, 91.20, 'Akhaura Riverine Sensor B-02', 'Sector Akhaura Waterway']
      ];

      sensorCoords.forEach(([lat, lng, name, sec]) => {
        const sMarker = L.marker([lat, lng], { icon: createSensorIcon() }).addTo(map);
        sMarker.on('click', () => {
          setSelectedMarker({
            type: 'sensor',
            title: name,
            sector: sec,
            status: 'Online · 99.8% Signal',
            detail: 'Telemetry reporting continuous stream · Zero packet drop'
          });
        });
      });

      mapInstanceRef.current = map;

      // Invalidate size to ensure crisp rendering
      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    }
  }, []);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleLocateCenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(BD_CENTER, 7);
      addToast({
        type: 'INFO',
        title: 'National Grid Centered',
        message: 'Map centered on Bangladesh sovereign borders.'
      });
    }
  };

  const handleToggleLayers = () => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const nextLayer = activeLayer === 'satellite' ? 'topo' : 'satellite';
    setActiveLayer(nextLayer);

    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const newUrl = nextLayer === 'satellite'
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const newTileLayer = L.tileLayer(newUrl, { maxZoom: 18, crossOrigin: true }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTileLayer;

    addToast({
      type: 'INFO',
      title: 'GIS Layer Toggled',
      message: `Layer switched to ${nextLayer === 'satellite' ? 'ArcGIS World Satellite' : 'CartoDB Topographic'}.`
    });
  };

  return (
    <div className="relative w-full h-[380px] lg:h-[420px] bg-[#071D33] overflow-hidden select-none">
      
      {/* Real Leaflet Map Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-10" 
        style={{ background: '#071D33' }}
      />

      {/* Map Control Buttons in Top-Left (+, -, Locate, Layers) */}
      <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-20">
        <button 
          onClick={handleZoomIn}
          className="w-7 h-7 bg-white rounded shadow-md border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-7 h-7 bg-white rounded shadow-md border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button 
          onClick={handleLocateCenter}
          className="w-7 h-7 bg-white rounded shadow-md border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          title="Locate / Center Grid"
        >
          <Target className="w-4 h-4" />
        </button>
        <button 
          onClick={handleToggleLayers}
          className="w-7 h-7 bg-white rounded shadow-md border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          title="Toggle Satellite / Topographic Layer"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Tactical Marker Info Popover Card */}
      {selectedMarker && (
        <div className="absolute top-3 right-3 bg-[#082B4C]/95 backdrop-blur-md p-3.5 rounded-lg border border-[#21B8D5]/40 text-white max-w-xs z-30 shadow-2xl animate-in fade-in zoom-in-95">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                selectedMarker.type === 'alert' ? 'bg-[#F39A24]' :
                selectedMarker.type === 'drone' ? 'bg-[#1479C9]' : 'bg-[#159B69]'
              }`} />
              <h4 className="text-xs font-bold">{selectedMarker.title}</h4>
            </div>
            <button 
              onClick={() => setSelectedMarker(null)}
              className="p-0.5 hover:bg-white/20 rounded transition-colors text-slate-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-[11px] text-[#21B8D5] font-mono mt-1">
            {selectedMarker.sector}
          </div>
          <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
            {selectedMarker.detail}
          </p>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[9px] font-mono text-[#159B69] font-bold">
              {selectedMarker.status}
            </span>
            {selectedMarker.actionTab && (
              <button 
                onClick={() => setActiveTab(selectedMarker.actionTab)}
                className="text-[10px] font-semibold text-white bg-[#1479C9] hover:bg-[#116bb3] px-2 py-0.5 rounded flex items-center space-x-1"
              >
                <span>Console</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Compact Map Legend Box in Bottom Left */}
      <div className="absolute bottom-3 left-3 bg-[#082B4C]/85 backdrop-blur-md p-2 rounded-lg border border-white/20 text-[10px] text-white space-y-1 z-20 font-sans shadow-lg">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#159B69]" />
          <span>Sensor</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1479C9]" />
          <span>Drone</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-[#F39A24]" />
          <span>Alert</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-2 border border-[#00FFFF] rounded-xs bg-[#00FFFF]/20" />
          <span>Observation Area</span>
        </div>
      </div>

    </div>
  );
};
