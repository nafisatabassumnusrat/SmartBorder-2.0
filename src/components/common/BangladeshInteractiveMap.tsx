import React, { useState } from 'react';
import { 
  MapPin, 
  Shield, 
  Plane, 
  Anchor, 
  Radio, 
  AlertTriangle, 
  ChevronRight, 
  Info,
  Maximize2
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { BANGLADESH_SECTORS } from '../../mockData/bangladeshSectors';
import { SectorInfo } from '../../types';

interface BangladeshInteractiveMapProps {
  onSelectSector?: (sector: SectorInfo) => void;
  height?: string;
}

export const BangladeshInteractiveMap: React.FC<BangladeshInteractiveMapProps> = ({ 
  onSelectSector,
  height = 'h-[440px]' 
}) => {
  const { language, selectedSector, setSelectedSector, setActiveTab } = useAppStore();
  const [hoveredSector, setHoveredSector] = useState<SectorInfo | null>(null);

  const active = selectedSector || BANGLADESH_SECTORS[0];

  const handleSectorClick = (sector: SectorInfo) => {
    setSelectedSector(sector);
    if (onSelectSector) onSelectSector(sector);
  };

  // Coordinates normalized to SVG 0-100% canvas for Bangladesh outline:
  // Bangladesh bbox: Lat 20.6 to 26.6 (Y range ~ 6 deg), Lng 88.0 to 92.7 (X range ~ 4.7 deg)
  const getSvgCoords = (coords: [number, number]) => {
    const lat = coords[0];
    const lng = coords[1];
    // Invert lat for SVG Y
    const x = ((lng - 88.0) / (92.7 - 88.0)) * 480 + 30;
    const y = ((26.6 - lat) / (26.6 - 20.6)) * 460 + 20;
    return { x, y };
  };

  return (
    <div className={`relative ${height} w-full bg-slate-50  rounded-xl border border-slate-200  p-4 flex flex-col lg:flex-row gap-4 overflow-hidden shadow-xs`}>
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 z-10 flex items-center space-x-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
        <Shield className="w-3.5 h-3.5 text-[#2386C8]" />
        <span className="text-[11px] font-bold text-[#10243A] font-mono">
          {language === 'BN' ? 'সার্বভৌম বাংলাদেশ সীমান্ত গ্রিড' : 'NATIONAL BORDER SECTOR GRID'}
        </span>
        <span className="text-[10px] font-mono text-slate-400">| 7 Strategic Sectors</span>
      </div>

      {/* SVG Interactive Map Area */}
      <div className="flex-1 relative flex items-center justify-center">
        <svg 
          viewBox="0 0 540 500" 
          className="w-full h-full max-h-[420px] select-none"
        >
          <defs>
            {/* River linear gradients */}
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.7" />
            </linearGradient>
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Bangladesh Generalized Sovereign Contour Outline */}
          <path
            d="M 120 40 
               L 180 30 
               L 240 70 
               L 320 60 
               L 380 90 
               L 410 160 
               L 430 220 
               L 470 290 
               L 490 380 
               L 450 430 
               L 410 410 
               L 360 440 
               L 300 420 
               L 240 430 
               L 190 440 
               L 140 420 
               L 110 370 
               L 100 290 
               L 80 230 
               L 70 170 
               L 90 90 
               Z"
            className="fill-slate-100 stroke-slate-300 stroke-2 transition-colors"
          />

          {/* Major River Lines: Jamuna / Brahmaputra -> Padma -> Meghna */}
          {/* Brahmaputra / Jamuna */}
          <path
            d="M 200 40 Q 210 130 220 180 T 250 260"
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Padma (Ganges entry from Chapai) */}
          <path
            d="M 80 200 Q 140 220 200 240 T 260 270"
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Meghna & Lower Estuary */}
          <path
            d="M 330 180 Q 300 240 270 280 T 280 400"
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Naf River Estuary */}
          <path
            d="M 465 380 Q 480 420 490 450"
            fill="none"
            stroke="#0284C7"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* River Label Annotations */}
          <text x="140" y="215" className="fill-blue-500/80 text-[10px] font-sans font-semibold">Padma River</text>
          <text x="225" y="120" className="fill-blue-500/80 text-[10px] font-sans font-semibold">Jamuna River</text>
          <text x="295" y="320" className="fill-blue-500/80 text-[10px] font-sans font-semibold">Meghna Estuary</text>
          <text x="445" y="440" className="fill-blue-500/80 text-[9px] font-sans font-semibold">Naf River</text>

          {/* Sector Nodes & Markers */}
          {BANGLADESH_SECTORS.map((sector) => {
            const { x, y } = getSvgCoords(sector.coordinates);
            const isSelected = active.id === sector.id;
            const isHovered = hoveredSector?.id === sector.id;

            return (
              <g 
                key={sector.id} 
                className="cursor-pointer transition-transform"
                onClick={() => handleSectorClick(sector)}
                onMouseEnter={() => setHoveredSector(sector)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                {/* Outer Ring / Pulsing Selection */}
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r="18"
                    className="fill-[#2386C8]/20 stroke-[#2386C8] stroke-2 animate-pulse"
                  />
                )}

                {/* Radar Node Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? "9" : "7"}
                  className={`transition-all ${
                    sector.threatLevel === 'HIGH' ? 'fill-rose-500 stroke-white' :
                    sector.threatLevel === 'MEDIUM' ? 'fill-amber-500 stroke-white' :
                    'fill-[#24A477] stroke-white'
                  } stroke-2 shadow-md`}
                />

                {/* Label text */}
                <text
                  x={x + 12}
                  y={y + 4}
                  className={`text-[11px] font-bold font-sans transition-all ${
                    isSelected 
                      ? 'fill-[#10243A]  font-extrabold' 
                      : 'fill-slate-600 '
                  }`}
                >
                  {language === 'BN' ? sector.nameBn.split('–')[0].trim() : sector.name.split('–')[0].trim()}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs p-2 rounded-lg border border-slate-200 text-[10px] space-y-1 shadow-xs">
          <div className="font-semibold text-slate-500 font-mono uppercase">
            {language === 'BN' ? 'সেক্টর সতর্কতা মাত্রা' : 'Sector Threat Status'}
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#24A477]" />
              <span className="text-slate-600">Normal (Low)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-600">Elevated (Medium)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-slate-600">Critical (High)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right / Side Panel: Selected Sector Dossier */}
      <div className="w-full lg:w-80 bg-white rounded-lg border border-slate-200 p-4 flex flex-col justify-between shadow-xs">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              {language === 'BN' ? 'সেক্টর বিস্তারিত তথ্য' : 'SECTOR DOSSIER'}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              active.threatLevel === 'HIGH' ? 'bg-rose-100 text-rose-700  ' :
              active.threatLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700  ' :
              'bg-emerald-100 text-emerald-700  '
            }`}>
              {active.threatLevel} PRIORITY
            </span>
          </div>

          <h3 className="font-bold text-base text-[#10243A] mt-2">
            {language === 'BN' ? active.nameBn : active.name}
          </h3>
          <p className="text-xs text-[#2386C8] font-medium mt-0.5">
            {active.bgbBattalion}
          </p>

          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {active.description}
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                <Plane className="w-3.5 h-3.5 text-[#2386C8]" />
                <span>Falcon UAVs</span>
              </div>
              <div className="text-base font-bold text-[#10243A] mt-1">
                {active.activeUavs} Units
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                <Anchor className="w-3.5 h-3.5 text-emerald-500" />
                <span>Falcon Boats</span>
              </div>
              <div className="text-base font-bold text-[#10243A] mt-1">
                {active.activeBoats} Active
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                <Radio className="w-3.5 h-3.5 text-indigo-500" />
                <span>Sensor Masts</span>
              </div>
              <div className="text-base font-bold text-[#10243A] mt-1">
                {active.sensorTowers} Masts
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Active Alerts</span>
              </div>
              <div className="text-base font-bold text-amber-600 mt-1">
                {active.openAlerts} Pending
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: Jump to GIS Map */}
        <button
          onClick={() => setActiveTab('geospatial')}
          className="mt-4 w-full py-2 px-3 rounded-lg bg-[#10243A] hover:bg-[#173B5C] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-xs"
        >
          <span>{language === 'BN' ? 'জিআইএস ম্যাপে সেক্টরটি খুলুন' : 'Open in Geospatial GIS Map'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

