import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  Maximize2, 
  Camera, 
  Layers, 
  Clock, 
  Sliders, 
  Compass, 
  Info,
  CheckCircle,
  Video as VideoIcon
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { sessionService } from '../../services/sessionService';
import { mediaService, DroneTelemetryHUD } from '../../services/mediaService';
import { observationService } from '../../services/observationService';
import { MonitoringSession, Observation } from '../../types';

export const MonitoringView: React.FC = () => {
  const { dataRevision, addToast } = useAppStore();
  const [sessions, setSessions] = useState<MonitoringSession[]>([]);
  const [activeSession, setActiveSession] = useState<MonitoringSession | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [thermalPalette, setThermalPalette] = useState<'WHITE_HOT' | 'IRONBOW' | 'STANDARD'>('STANDARD');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTimeMs, setCurrentTimeMs] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const loadSessions = async () => {
      const list = await sessionService.getSessions();
      setSessions(list);
      if (list.length > 0 && !activeSession) {
        setActiveSession(list[0]);
      }
      const obsList = await observationService.getObservations();
      setObservations(obsList);
    };
    loadSessions();
  }, [dataRevision, activeSession]);

  // Live Canvas Rendering Loop for Tactical UAV Stream
  useEffect(() => {
    let lastTimestamp = performance.now();

    const renderLoop = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      if (isPlaying) {
        setCurrentTimeMs((prev) => prev + delta * playbackSpeed);
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const telemetry: DroneTelemetryHUD = {
            altitudeMeters: 145 + Math.sin(currentTimeMs / 3000) * 8,
            speedKph: 48.5 + Math.cos(currentTimeMs / 2500) * 3,
            headingDeg: (128 + (currentTimeMs / 500)) % 360,
            pitchDeg: -35.2 + Math.sin(currentTimeMs / 2000) * 2,
            rollDeg: Math.cos(currentTimeMs / 1800) * 2.5,
            batteryPct: Math.max(15, 84 - Math.floor(currentTimeMs / 50000)),
            lat: 31.7820 + (Math.sin(currentTimeMs / 10000) * 0.002),
            lng: -106.4420 + (Math.cos(currentTimeMs / 10000) * 0.002),
            opticalZoom: 3.5,
            thermalPalette: thermalPalette === 'STANDARD' ? 'WHITE_HOT' : thermalPalette,
            targetTrackLocked: true
          };

          const boxes = showBoundingBoxes
            ? observations.slice(0, 3).map((o, idx) => ({
                x: o.boundingBox.x + (idx === 0 ? Math.sin(currentTimeMs / 1200) * 4 : 0),
                y: o.boundingBox.y + (idx === 0 ? Math.cos(currentTimeMs / 1200) * 3 : 0),
                w: o.boundingBox.width,
                h: o.boundingBox.height,
                label: o.label,
                conf: o.confidence
              }))
            : [];

          mediaService.drawDroneHUD(ctx, canvas.width, canvas.height, telemetry, currentTimeMs, boxes);
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, thermalPalette, showBoundingBoxes, currentTimeMs, observations]);

  const handleCaptureSnapshot = () => {
    addToast({
      type: 'SUCCESS',
      title: 'Frame Snapshot Captured',
      message: `Saved simulated tactical frame at ${new Date().toISOString().slice(11, 19)} UTC to Evidence Store.`
    });
  };

  if (!activeSession) return null;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              Monitoring &amp; Sensor Feeds
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              LIVE / REPLAY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulated high-definition optical &amp; infrared tactical surveillance feeds with on-edge object detection HUD.
          </p>
        </div>

        {/* Input Source & Processing Status Banner */}
        <div className="flex items-center space-x-3 bg-[#0D1526] border border-[#1E293B] px-3.5 py-1.5 rounded-lg text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300">SOURCE:</span>
            <span className="text-emerald-400 font-bold">DEMO / SIMULATED</span>
          </div>
          <div className="w-px h-3.5 bg-slate-700" />
          <div className="text-slate-400">
            FPS: <span className="text-slate-200">30.0</span>
          </div>
          <div className="w-px h-3.5 bg-slate-700" />
          <div className="text-slate-400">
            DROP: <span className="text-emerald-400">0.0%</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Video Player (Left 2 cols) & Metadata / Session History (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Player & Stream Controls */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tactical Canvas Video Stream Container */}
          <div className="relative rounded-xl overflow-hidden border border-[#1E293B] bg-slate-950 aspect-video shadow-2xl group">
            {/* HTML5 Canvas Rendering High-Tech UAV Feed */}
            <canvas
              ref={canvasRef}
              width={960}
              height={540}
              className="w-full h-full object-cover block"
            />

            {/* Top Right Quick Overlays */}
            <div className="absolute top-3 right-3 flex items-center space-x-2 pointer-events-auto">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                {activeSession.sessionCode}
              </span>
            </div>

            {/* Floating In-Stream Player Controls */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-3 flex items-center justify-between transition-opacity">
              {/* Play / Pause & Scrubber */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <div className="text-xs font-mono text-slate-300">
                  {Math.floor(currentTimeMs / 1000)}s / {activeSession.durationSeconds}s
                </div>
              </div>

              {/* Center Controls: Bounding Boxes & Palette */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    showBoundingBoxes
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Bounding Boxes: {showBoundingBoxes ? 'ON' : 'OFF'}
                </button>

                {/* Spectral Palette Toggles */}
                <div className="flex items-center bg-slate-900/80 border border-slate-700/60 rounded p-0.5 text-[10px] font-mono">
                  {(['STANDARD', 'WHITE_HOT', 'IRONBOW'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setThermalPalette(p)}
                      className={`px-2 py-0.5 rounded font-bold transition-all ${
                        thermalPalette === p
                          ? 'bg-emerald-500 text-slate-950'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {p === 'STANDARD' ? 'EO-4K' : p === 'WHITE_HOT' ? 'LWIR' : 'IRONBOW'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Controls: Snapshot & Speed */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCaptureSnapshot}
                  title="Capture snapshot frame for evidence logging"
                  className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>

                {/* Speed Multiplier */}
                <div className="flex items-center bg-slate-900/80 border border-slate-700/60 rounded p-0.5 text-[10px] font-mono">
                  {[1, 2, 4].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        playbackSpeed === spd
                          ? 'bg-blue-500 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Drone Telemetry Strip */}
          <div className="p-3.5 rounded-xl bg-[#0D1526] border border-[#1E293B] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Assigned Sector</span>
              <span className="text-slate-200 font-semibold">{activeSession.sectorName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Sensor Gimbal</span>
              <span className="text-slate-200 font-semibold">Pitch -35.2° • Yaw 14.1°</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Detections Tracked</span>
              <span className="text-emerald-400 font-bold">{activeSession.detectionsCount} Objects</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-500 block">Encryption Status</span>
              <span className="text-slate-200 font-semibold flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>AES-256 GCM</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata Panel & Session History */}
        <div className="space-y-6">
          {/* Metadata Panel */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Video &amp; Payload Metadata</span>
            </h2>

            <div className="space-y-2 text-xs divide-y divide-[#1E293B]/60 font-mono">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Resolution</span>
                <span className="text-slate-200">{activeSession.resolution}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Sensor Payload</span>
                <span className="text-slate-200 text-right max-w-[180px]">{activeSession.sensorPayload}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Device Assigned</span>
                <span className="text-emerald-400">{activeSession.deviceCallsign}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Session Type</span>
                <span className="text-slate-200">{activeSession.type}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Frames Processed</span>
                <span className="text-slate-200">{activeSession.totalFramesProcessed.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Data Source Label</span>
                <span className="text-amber-400 font-bold">{activeSession.dataSource}</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#080D1A] border border-[#1E293B] text-[11px] text-slate-400 flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Demonstration feed simulated locally via high-framerate HTML5 Canvas tactical renderer.
              </span>
            </div>
          </div>

          {/* Session History List */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Surveillance Sessions</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-500">
                {sessions.length} Available
              </span>
            </div>

            <div className="space-y-2">
              {sessions.map((s) => {
                const isSelected = activeSession.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setActiveSession(s)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#131E35] border-emerald-500/40 shadow-sm'
                        : 'bg-[#080D1A] border-[#1E293B] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                        <VideoIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span>{s.sessionCode}</span>
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {s.type === 'LIVE_SIMULATED' ? 'LIVE' : 'REPLAY'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight">{s.title}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1.5 flex items-center justify-between">
                      <span>{s.sectorName}</span>
                      <span>{s.detectionsCount} detections</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
