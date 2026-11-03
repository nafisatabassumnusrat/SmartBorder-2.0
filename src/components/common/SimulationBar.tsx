import React, { useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  StepForward, 
  Sparkles,
  Shield
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const SimulationBar: React.FC = () => {
  const {
    isSimRunning,
    isSimPaused,
    simSpeed,
    simTickCount,
    lastSimEvent,
    language,
    startSimulation,
    pauseSimulation,
    stepSimulation,
    resetSimulation,
    setSimSpeed
  } = useAppStore();

  useEffect(() => {
    if (!isSimRunning || isSimPaused) return;

    const intervalMs = Math.max(500, Math.floor(3000 / simSpeed));
    const timer = setInterval(() => {
      stepSimulation();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSimRunning, isSimPaused, simSpeed, stepSimulation]);

  return (
    <div className="bg-[#0C1B2E] border-b border-[#1E3A5F] px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
      {/* Left: Simulation Engine Status */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            {language === 'BN' ? 'ডেমো সিমুলেশন ইঞ্জিন:' : 'SOVEREIGN DEMO ENGINE:'}
          </span>
          <span
            className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold border ${
              isSimRunning && !isSimPaused
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                : isSimPaused
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSimRunning && !isSimPaused
                  ? 'bg-emerald-400 animate-ping'
                  : isSimPaused
                  ? 'bg-amber-400'
                  : 'bg-slate-500'
              }`}
            />
            <span>{isSimRunning && !isSimPaused ? 'RUNNING' : isSimPaused ? 'PAUSED' : 'IDLE / READY'}</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center space-x-1 font-mono text-slate-400 text-[11px]">
          <span>TICKS:</span>
          <strong className="text-slate-200">{simTickCount}</strong>
        </div>

        {/* Live event ticker */}
        <div className="hidden md:flex items-center space-x-2 text-[11px] text-slate-400 border-l border-slate-800 pl-3">
          <span className="text-slate-500">EVENT LOG:</span>
          <span className="text-emerald-400 font-mono truncate max-w-xs lg:max-w-md">
            {lastSimEvent || (language === 'BN' ? 'সিস্টেম স্বাভাবিক অবস্থায় প্রস্তুত' : 'Perimeter nominal. Ready for demonstration.')}
          </span>
        </div>
      </div>

      {/* Right: Simulation Controls */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 bg-[#10243A] p-0.5 rounded-lg border border-[#1E3A5F]">
          {!isSimRunning || isSimPaused ? (
            <button
              onClick={startSimulation}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#2386C8] hover:bg-[#1b6fa7] text-white font-medium text-[11px] transition-colors"
              title="Start Synthetic Telemetry Stream"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{language === 'BN' ? 'চালান' : 'Run Demo'}</span>
            </button>
          ) : (
            <button
              onClick={pauseSimulation}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-medium text-[11px] transition-colors"
              title="Pause Simulation"
            >
              <Pause className="w-3 h-3 fill-current" />
              <span>{language === 'BN' ? 'থামান' : 'Pause'}</span>
            </button>
          )}

          <button
            onClick={() => stepSimulation()}
            className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-[#173B5C] text-slate-300 hover:text-white transition-colors"
            title="Single Frame Step"
          >
            <StepForward className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{language === 'BN' ? 'পদক্ষেপ' : 'Step'}</span>
          </button>

          <button
            onClick={resetSimulation}
            className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-[#173B5C] text-slate-400 hover:text-rose-400 transition-colors"
            title="Reset Simulation Ticks"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed multipliers */}
        <div className="hidden sm:flex items-center space-x-1 bg-[#10243A] p-0.5 rounded-lg border border-[#1E3A5F] text-[10px] font-mono">
          {[1, 2, 5].map((speed) => (
            <button
              key={speed}
              onClick={() => setSimSpeed(speed as 1 | 2 | 5)}
              className={`px-2 py-0.5 rounded transition-colors ${
                simSpeed === speed ? 'bg-[#2386C8] text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
