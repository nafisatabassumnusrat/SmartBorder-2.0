import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Video, 
  Layers, 
  Cpu, 
  Compass, 
  Activity, 
  Radio, 
  Eye, 
  Sparkles, 
  Clock, 
  Maximize2,
  FileText,
  AlertTriangle,
  Play,
  Pause
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { deviceService } from '../../services/deviceService';
import { sessionService } from '../../services/sessionService';
import { observationService } from '../../services/observationService';
import { Device, MonitoringSession, Observation } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

export const FalconAerialIntelligence: React.FC = () => {
  const { language, dataRevision, stepSimulation, addToast } = useAppStore();
  const [drones, setDrones] = useState<Device[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<Device | null>(null);
  const [sessions, setSessions] = useState<MonitoringSession[]>([]);
  const [activeSession, setActiveSession] = useState<MonitoringSession | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [showGradCam, setShowGradCam] = useState<boolean>(false);
  const [selectedObservation, setSelectedObservation] = useState<Observation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const devList = await deviceService.getDevices();
      const droneList = devList.filter(d => d.type === 'DRONE_UAV');
      setDrones(droneList);
      if (droneList.length > 0 && !selectedDrone) {
        setSelectedDrone(droneList[0]);
      }

      const sessList = await sessionService.getSessions();
      setSessions(sessList);
      if (sessList.length > 0 && !activeSession) {
        setActiveSession(sessList[0]);
      }

      const obsList = await observationService.getObservations();
      setObservations(obsList);
    };
    fetchData();
  }, [dataRevision]);

  const handleTriggerSweep = async () => {
    addToast({
      type: 'INFO',
      title: language === 'BN' ? 'এরিয়াল সুইপ নির্দেশ জারি' : 'Autonomous Orbit Command Sent',
      message: language === 'BN' 
        ? `${selectedDrone?.callsign || 'Falcon-01'} কে নতুন পেরিমিটার স্ক্যান নির্দেশ প্রদান করা হয়েছে।` 
        : `Dispatched ${selectedDrone?.callsign || 'Falcon-01'} on continuous border surveillance sweep.`
    });
    await stepSimulation();
  };

  const drone = selectedDrone || drones[0];

  return (
    <div className="pb-12">
      <PageHeader
        category="INTELLIGENCE MODULES"
        categoryBn="গোয়েন্দা প্রযুক্তি মডিউল"
        title={language === 'BN' ? 'ফ্যালকন এরিয়াল ড্রোন নজরদারি' : 'Falcon Aerial Intelligence'}
        subtitle={language === 'BN' 
          ? 'ইউএভি টেলিমেট্রি, অপটিক্যাল ও অবলোহিত থার্মাল কম্পিউটার ভিশন এবং ফ্লাইট রেকর্ড' 
          : 'High-endurance UAV telemetry, real-time dual-spectrum computer vision, and flight session archives'}
        statusBadge="UAV-01 LIVE TELEMETRY LINKED"
        actionButtons={
          <button
            onClick={handleTriggerSweep}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#10243A] bg-[#10243A] hover:bg-[#173B5C] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plane className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{language === 'BN' ? 'টহল সুইপ শুরু করুন' : 'Dispatch Patrol Sweep'}</span>
          </button>
        }
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Drone Fleet Selection Ribbon */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
            {language === 'BN' ? 'নজরদারি ড্রোন বহর:' : 'ACTIVE FALCON UAV FLEET:'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {drones.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDrone(d)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  drone?.id === d.id
                    ? 'bg-blue-50  border-[#2386C8] shadow-xs'
                    : 'border-slate-200  hover:bg-slate-50 '
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-[#10243A] flex items-center space-x-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#2386C8]" />
                    <span>{d.callsign.split('(')[0]}</span>
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    d.status === 'PATROLLING' ? 'bg-emerald-100 text-emerald-700  ' :
                    d.status === 'ONLINE' ? 'bg-blue-100 text-blue-700  ' :
                    'bg-slate-100 text-slate-600  '
                  }`}>
                    {d.status}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-1">
                  📍 {d.assignedSector.split('–')[0]}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Batt: {d.batteryPct}% | Alt: {d.coordinates.altitudeMeters}m
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Video Feed Player with Telemetry HUD Overlays */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed Video Canvas (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-md aspect-video flex items-center justify-center">
              {/* Simulated Aerial Video Frame */}
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90"
              />

              {/* Real-time Bounding Boxes Overlay */}
              {showBoundingBoxes && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Bounding box 1: Person on border scrub path */}
                  <div 
                    className="absolute border-2 border-emerald-400 bg-emerald-500/10 rounded-xs"
                    style={{ left: '42%', top: '35%', width: '14%', height: '26%' }}
                  >
                    <div className="absolute -top-5 left-0 bg-emerald-600 text-white text-[9px] font-mono px-1 rounded font-bold whitespace-nowrap">
                      PERSON [92.4%]
                    </div>
                  </div>

                  {/* Bounding box 2: Second target */}
                  <div 
                    className="absolute border-2 border-amber-400 bg-amber-500/10 rounded-xs"
                    style={{ left: '58%', top: '42%', width: '12%', height: '22%' }}
                  >
                    <div className="absolute -top-5 left-0 bg-amber-600 text-white text-[9px] font-mono px-1 rounded font-bold whitespace-nowrap">
                      PERSON [89.1%]
                    </div>
                  </div>
                </div>
              )}

              {/* Grad-CAM Heatmap Simulation Overlay */}
              {showGradCam && (
                <div className="absolute inset-0 bg-gradient-radial from-red-500/30 via-yellow-500/15 to-transparent pointer-events-none mix-blend-color-dodge" />
              )}

              {/* Tactical HUD Header Overlays */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between text-white text-[11px] font-mono bg-black/40 backdrop-blur-xs p-2 rounded-lg border border-white/10">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="font-bold text-emerald-400">REC ● LIVE EO/IR STREAM</span>
                  <span className="text-slate-300">| {drone?.callsign}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>FPS: 30.0</span>
                  <span>4K UHD (3840x2160)</span>
                  <span>H.265 AES-256</span>
                </div>
              </div>

              {/* Tactical HUD Footer Telemetry */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-[11px] font-mono bg-black/50 backdrop-blur-xs p-2 rounded-lg border border-white/10">
                <div className="flex items-center space-x-4">
                  <span>ALT: <strong>{drone?.coordinates.altitudeMeters || 145}m AGL</strong></span>
                  <span>SPD: <strong>{drone?.telemetry.speedKph || 54.2} km/h</strong></span>
                  <span>HDG: <strong>{drone?.telemetry.headingDeg || 128}° SE</strong></span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>PITCH: <strong>{drone?.telemetry.gimbalPitchDeg || -35.2}°</strong></span>
                  <span>YAW: <strong>{drone?.telemetry.gimbalYawDeg || 14.1}°</strong></span>
                  <span>SIG: <strong>{drone?.telemetry.signalStrengthDbm || -68} dBm</strong></span>
                </div>
              </div>
            </div>

            {/* Video Player Toggles */}
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs shadow-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    showBoundingBoxes ? 'bg-emerald-50  text-emerald-700  border-emerald-300' : 'border-slate-300 text-slate-500'
                  }`}
                >
                  AI Bounding Boxes ({showBoundingBoxes ? 'ON' : 'OFF'})
                </button>
                <button
                  onClick={() => setShowGradCam(!showGradCam)}
                  className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                    showGradCam ? 'bg-amber-50  text-amber-700  border-amber-300' : 'border-slate-300 text-slate-500'
                  }`}
                >
                  Grad-CAM Attention Map ({showGradCam ? 'ON' : 'OFF'})
                </button>
              </div>

              <span className="text-slate-400 text-[11px] font-mono">
                Model: Falcon-YOLOv9-Thermal-BD-v3
              </span>
            </div>
          </div>

          {/* Right: Telemetry & Detection Stream (1 column) */}
          <div className="space-y-4">
            {/* Live UAV Telemetry Dossier */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-[#2386C8] font-bold pb-2 border-b border-slate-200">
                UAV AVIONICS & SENSOR SUITE
              </div>
              <h3 className="font-bold text-sm text-[#10243A] mt-2">
                {drone?.callsign}
              </h3>
              <p className="text-xs text-slate-500">
                {drone?.model}
              </p>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Firmware:</span>
                  <span className="font-mono font-semibold">{drone?.firmwareVersion}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Assigned Sector:</span>
                  <span className="font-semibold text-slate-800">{drone?.assignedSector}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Battery Reserve:</span>
                  <span className="font-bold text-emerald-600">{drone?.batteryPct}% (3.8h remaining)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Coordinates:</span>
                  <span className="font-mono text-slate-700">
                    {drone?.coordinates.lat.toFixed(4)}° N, {drone?.coordinates.lng.toFixed(4)}° E
                  </span>
                </div>
              </div>
            </div>

            {/* Detections in Current Sweep */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                  SESSION DETECTIONS
                </span>
                <span className="text-xs font-bold text-[#2386C8]">
                  {observations.length} Targets
                </span>
              </div>

              <div className="mt-3 space-y-2.5 max-h-[300px] overflow-y-auto">
                {observations.slice(0, 4).map((obs) => (
                  <div 
                    key={obs.id}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center space-x-3 cursor-pointer hover:border-[#2386C8] transition-colors"
                  >
                    <img 
                      src={obs.evidenceThumbnail} 
                      alt={obs.label} 
                      className="w-12 h-12 rounded object-cover shrink-0" 
                    />
                    <div className="truncate flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#10243A] truncate">
                          {obs.label}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">
                          {(obs.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {obs.sector}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                        {formatRelativeTime(obs.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Aerial Photo & Video Gallery with Evidence Metadata */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-[#10243A]">
                {language === 'BN' ? 'এরিয়াল ফটোগ্রাফি ও ফ্রেম আর্কাইভ' : 'High-Resolution Aerial Frame Archive'}
              </h3>
              <p className="text-xs text-slate-500">
                Geotagged 4K optical and infrared frames captured during authorized perimeter orbits
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {observations.slice(0, 4).map((obs) => (
              <div 
                key={obs.id}
                className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs group"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img 
                    src={obs.evidenceThumbnail} 
                    alt={obs.label} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                    {obs.spectralBand === 'LONGWAVE_INFRARED_THERMAL' ? 'LWIR THERMAL' : '4K OPTICAL'}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                    {(obs.confidence * 100).toFixed(1)}% Conf
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-bold text-xs text-[#10243A] truncate">
                    {obs.label}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    📍 {obs.sector}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    LAT: {obs.coordinates.lat.toFixed(4)}° | LNG: {obs.coordinates.lng.toFixed(4)}°
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

