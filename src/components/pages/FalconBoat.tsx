import React, { useState } from 'react';
import { 
  Anchor, 
  Waves, 
  Droplets, 
  Compass, 
  Battery, 
  ShieldCheck, 
  Activity, 
  Thermometer, 
  Gauge, 
  Clock, 
  LifeBuoy,
  FileText,
  AlertTriangle,
  Play
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { MOCK_FALCON_BOATS } from '../../mockData/falconBoatData';
import { FalconBoatTelemetry } from '../../types';

export const FalconBoat: React.FC = () => {
  const { language, addToast, bumpDataRevision } = useAppStore();
  const [boats, setBoats] = useState<FalconBoatTelemetry[]>(MOCK_FALCON_BOATS);
  const [selectedBoat, setSelectedBoat] = useState<FalconBoatTelemetry>(MOCK_FALCON_BOATS[0]);

  const handleDispatchWaypoint = (callsign: string) => {
    addToast({
      type: 'INFO',
      title: language === 'BN' ? 'জলযান গতিপথ হালনাগাদ' : 'Navigational Waypoint Sent',
      message: `${callsign} has engaged autonomous riverine patrol path towards shallow shoal fairway.`
    });
    bumpDataRevision();
  };

  return (
    <div className="pb-12">
      <PageHeader
        category="INTELLIGENCE MODULES"
        categoryBn="গোয়েন্দা প্রযুক্তি মডিউল"
        title={language === 'BN' ? 'ফ্যালকন বোট (স্বয়ংক্রিয় নৌযান ও নদী পর্যবেক্ষণ)' : 'Falcon Boat – Autonomous Riverine Patrol & Water Telemetry'}
        subtitle={language === 'BN' 
          ? 'পদ্মা, যমুনা, নাফ নদী ও সুন্দরবনের জলসীমা পর্যবেক্ষণ, সোনার বাথিমেট্রি এবং পানির গুণমান পরিমাপ' 
          : 'Unmanned autonomous surface vessel (ASV) fleet performing riverine border interdiction, shallow bathymetry, and environmental sensor monitoring'}
        statusBadge="4 AUTONOMOUS CRAFT COMMISSIONED"
        actionButtons={
          <button
            onClick={() => handleDispatchWaypoint(selectedBoat.callsign)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#14B8A6] bg-[#14B8A6] hover:bg-[#0f9485] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'BN' ? 'নতুন টহল রুট প্রেরণ' : 'Transmit Waypoint Vector'}</span>
          </button>
        }
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Fleet Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {boats.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBoat(b)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedBoat.id === b.id
                  ? 'bg-teal-50  border-teal-500 shadow-xs'
                  : 'bg-white  border-slate-200  hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-xs text-[#10243A] flex items-center space-x-1.5">
                  <Anchor className="w-3.5 h-3.5 text-teal-600" />
                  <span>{b.callsign.split('(')[0]}</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  b.status === 'PATROLLING' ? 'bg-emerald-100 text-emerald-700  ' :
                  b.status === 'SURVEYING' ? 'bg-blue-100 text-blue-700  ' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {b.status}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-1">
                🌊 {b.waterway.split('Reach')[0]}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                Batt: {b.batteryPct}% | Depth: {b.sonarDepthMeters}m
              </div>
            </button>
          ))}
        </div>

        {/* Selected Vessel Telemetry & Water Quality Sensor Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Vessel Telemetry and Sonar Profile (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-sm text-[#10243A]">
                    {selectedBoat.callsign} – Navigational Telemetry
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedBoat.missionType}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-600">
                    Propulsion Battery: {selectedBoat.batteryPct}%
                  </span>
                </div>
              </div>

              {/* Sonar Bathymetry Profile Graphic */}
              <div className="relative h-60 rounded-xl bg-gradient-to-b from-sky-900 to-indigo-950 p-4 overflow-hidden border border-slate-300 text-white flex flex-col justify-between shadow-inner">
                {/* Surface Telemetry Bar */}
                <div className="flex items-center justify-between text-xs font-mono bg-black/40 backdrop-blur-xs p-2 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span>SPEED: <strong>{selectedBoat.speedKnots} Knots</strong></span>
                    <span>HEADING: <strong>{selectedBoat.headingDeg}° SE</strong></span>
                  </div>
                  <div>
                    <span>GPS FIX: RTK FIXED (±2cm)</span>
                  </div>
                </div>

                {/* Simulated Riverbed Sonar Wave */}
                <div className="relative flex items-center justify-center my-auto">
                  <div className="text-center">
                    <div className="text-4xl font-extrabold font-mono text-[#38BDF8]">
                      {selectedBoat.sonarDepthMeters}m
                    </div>
                    <div className="text-xs text-slate-300 uppercase tracking-widest font-mono mt-1">
                      MULTIBEAM SONAR DEPTH TO RIVERBED
                    </div>
                  </div>
                </div>

                {/* Riverbed Warning Banner */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 border-t border-white/20 pt-2">
                  <span>Shoal Hazard Warning: CLEAR FAIRWAY</span>
                  <span>Waterway: {selectedBoat.waterway}</span>
                </div>
              </div>

              {/* Water Quality Telemetry Sensor Grid */}
              <div className="mt-4">
                <div className="text-[10px] font-mono uppercase text-[#14B8A6] font-bold mb-2">
                  ENVIRONMENTAL SENSOR SUITE TELEMETRY:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium">Acidity (pH Level)</div>
                    <div className="text-lg font-bold text-[#10243A] mt-1">
                      {selectedBoat.waterQuality.ph} pH
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Optimal Riverine Range</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium">Turbidity (Sediment)</div>
                    <div className="text-lg font-bold text-[#10243A] mt-1">
                      {selectedBoat.waterQuality.turbidityNTU} NTU
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Monsoon Silt Load</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium">Dissolved Oxygen (DO)</div>
                    <div className="text-lg font-bold text-[#10243A] mt-1">
                      {selectedBoat.waterQuality.dissolvedOxygenMgL} mg/L
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Healthy Aquatic Ecology</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium">Water Temperature</div>
                    <div className="text-lg font-bold text-[#10243A] mt-1">
                      {selectedBoat.waterQuality.waterTempC}°C
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Seasonal Ambient</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium">Salinity Index</div>
                    <div className="text-lg font-bold text-[#10243A] mt-1">
                      {selectedBoat.waterQuality.salinityPpt} ppt
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Tidal Fairway Salinity</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-500 font-medium">Oil / Hydrocarbon Trace</div>
                    <div className="text-lg font-bold text-emerald-600 mt-1">
                      {selectedBoat.waterQuality.hydrocarbonPpm} ppm
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Zero Contamination</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mission History and Maintenance Log (1 column) */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-teal-600 font-bold pb-2 border-b border-slate-200">
                VESSEL SPECIFICATIONS & READINESS
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Hull Design:</span>
                  <span className="font-semibold">ASV-450 Shallow Draft Catamaran</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Assigned Sector:</span>
                  <span className="font-semibold text-slate-800">{selectedBoat.sector}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Coordinates:</span>
                  <span className="font-mono text-slate-700">
                    {selectedBoat.coordinates.lat.toFixed(4)}° N, {selectedBoat.coordinates.lng.toFixed(4)}° E
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Last Maintenance:</span>
                  <span className="font-mono text-slate-500">{new Date(selectedBoat.lastMaintenance).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200 text-xs text-teal-900">
                <strong>Flood & Disaster Support:</strong> Equipped with auxiliary emergency tow line, life-ring deployer, and autonomous river rescue waypoint beacon.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

