import React, { useEffect, useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Search, 
  Sliders, 
  SlidersHorizontal, 
  CheckCircle, 
  HelpCircle, 
  BarChart3, 
  Eye, 
  Maximize2, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { observationService } from '../../services/observationService';
import { MOCK_MODEL_METRICS } from '../../mockData/modelEvaluations';
import { MOCK_ENV_CHANGES } from '../../mockData/environmentalChanges';
import { DetectionClass, Observation, ModelMetric } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

export const AiIntelligenceView: React.FC = () => {
  const { dataRevision } = useAppStore();
  const [observations, setObservations] = useState<Observation[]>([]);
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModel, setActiveModel] = useState<ModelMetric>(MOCK_MODEL_METRICS[0]);
  const [activeTab, setActiveTab] = useState<'ANALYSIS' | 'EVALUATION' | 'COMPARISON'>('ANALYSIS');
  const [splitSliderPos, setSplitSliderPos] = useState<number>(50);
  const [showGradCam, setShowGradCam] = useState<boolean>(false);

  useEffect(() => {
    const fetchObs = async () => {
      const list = await observationService.getObservations({
        detectionClass: selectedClass !== 'ALL' ? (selectedClass as DetectionClass) : undefined,
        query: searchQuery
      });
      setObservations(list);
      if (list.length > 0 && !selectedObs) {
        setSelectedObs(list[0]);
      }
    };
    fetchObs();
  }, [dataRevision, selectedClass, searchQuery]);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100 flex items-center space-x-2">
              <span>Explainable AI Intelligence Center</span>
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              DETERMINISTIC MOCK AI
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explainable AI decision traces, Grad-CAM attention maps, Bayesian uncertainty scores, and bi-temporal image change analysis.
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center bg-[#0D1526] border border-[#1E293B] rounded-lg p-1 space-x-1 font-mono text-xs">
          <button
            onClick={() => setActiveTab('ANALYSIS')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'ANALYSIS'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Observation Evidence
          </button>
          <button
            onClick={() => setActiveTab('COMPARISON')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'COMPARISON'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Image Comparison Slider
          </button>
          <button
            onClick={() => setActiveTab('EVALUATION')}
            className={`px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'EVALUATION'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Model Evaluation
          </button>
        </div>
      </div>

      {/* Prominent Operational Disclaimer */}
      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-start space-x-2.5 text-xs text-amber-300">
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
        <div>
          <strong className="font-semibold text-amber-200">Demonstration Integrity Notice:</strong> All inference detections, confidence values, and attention heatmaps are generated from deterministic synthetic demo fixtures. SmartBorder 2.0 does not claim that real-time AI inference is running on live hardware during this competition demonstration.
        </div>
      </div>

      {/* TAB 1: OBSERVATION EVIDENCE & EXPLAINABILITY */}
      {activeTab === 'ANALYSIS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Filterable Observations List (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200 uppercase font-mono tracking-wider">
                  Observations Feed ({observations.length})
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  Active Model: YOLOv8x-INT8
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search label, sector, device..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#080D1A] border border-[#1E293B] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Class Filter Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['ALL', 'PERSON', 'VEHICLE_UNAUTHORIZED', 'FENCE_BREACH_DAMAGE', 'ANIMAL_WILDLIFE', 'THERMAL_HEAT_SIGNATURE'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      selectedClass === cls
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                        : 'bg-[#080D1A] text-slate-400 border border-[#1E293B] hover:text-slate-200'
                    }`}
                  >
                    {cls.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {observations.map((obs) => {
                const isSelected = selectedObs?.id === obs.id;
                return (
                  <div
                    key={obs.id}
                    onClick={() => setSelectedObs(obs)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-3.5 ${
                      isSelected
                        ? 'bg-[#131E35] border-emerald-500/40 shadow-md'
                        : 'bg-[#0D1526] border-[#1E293B] hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={obs.evidenceThumbnail}
                      alt={obs.label}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-100 truncate">{obs.label}</span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">
                          {(obs.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate">{obs.sector}</div>
                      <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-slate-500">
                        <span>{obs.deviceCallsign}</span>
                        <span>{formatRelativeTime(obs.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Evidence Viewer & Explainability Card (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {selectedObs ? (
              <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                  <div>
                    <h2 className="text-base font-semibold text-slate-100 flex items-center space-x-2">
                      <span>{selectedObs.label}</span>
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">
                      ID: {selectedObs.id} • Sector: {selectedObs.sector}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      Confidence: {(selectedObs.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Evidence Image Viewer with Bounding Box / Grad-CAM Attention Toggle */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Evidence Frame ({selectedObs.spectralBand})</span>
                    <button
                      onClick={() => setShowGradCam(!showGradCam)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        showGradCam
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      Grad-CAM Heatmap: {showGradCam ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border border-[#1E293B] aspect-video bg-black">
                    <img
                      src={showGradCam && selectedObs.gradCamAttentionUrl ? selectedObs.gradCamAttentionUrl : selectedObs.evidenceFullFrame}
                      alt="Full Evidence Frame"
                      className="w-full h-full object-cover"
                    />

                    {/* Synthetic Bounding Box Overlay */}
                    {!showGradCam && (
                      <div
                        style={{
                          left: `${selectedObs.boundingBox.x}%`,
                          top: `${selectedObs.boundingBox.y}%`,
                          width: `${selectedObs.boundingBox.width}%`,
                          height: `${selectedObs.boundingBox.height}%`
                        }}
                        className="absolute border-2 border-emerald-400 bg-emerald-500/15 pointer-events-none rounded flex flex-col justify-between p-1"
                      >
                        <span className="bg-slate-950/90 text-[10px] font-mono text-emerald-400 px-1 py-0.5 rounded border border-emerald-500/40 self-start">
                          {selectedObs.detectionClass}
                        </span>
                        <span className="text-[9px] font-mono text-slate-200 self-end bg-black/70 px-1 rounded">
                          {(selectedObs.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Explainable AI Uncertainty & Decision Distribution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Bayesian Uncertainty Meter */}
                  <div className="p-3.5 rounded-lg bg-[#080D1A] border border-[#1E293B] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Bayesian Uncertainty</span>
                      <span className="font-mono text-slate-200 font-bold">{(selectedObs.uncertaintyScore * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-[#1A253D] rounded-full h-2">
                      <div
                        style={{ width: `${selectedObs.uncertaintyScore * 100}%` }}
                        className="bg-amber-400 h-2 rounded-full"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Epistemic model confidence margin: {selectedObs.uncertaintyScore < 0.15 ? 'HIGH CERTAINTY' : 'MODERATE CERTAINTY'}
                    </p>
                  </div>

                  {/* Spectral Band & Model Engine */}
                  <div className="p-3.5 rounded-lg bg-[#080D1A] border border-[#1E293B] space-y-1.5 text-xs font-mono">
                    <div className="text-slate-400">Model Engine:</div>
                    <div className="text-emerald-400 font-bold">{selectedObs.modelEngine}</div>
                    <div className="text-slate-500 text-[10px] pt-1">
                      Sensor: {selectedObs.spectralBand}
                    </div>
                  </div>
                </div>

                {/* Reasoning Notes */}
                <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block">
                    AI Decision Rationale &amp; Spatial Trace
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedObs.notes}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 bg-[#0D1526] border border-[#1E293B] rounded-xl text-xs">
                Select an observation to inspect evidence frames and model confidence.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BI-TEMPORAL IMAGE COMPARISON SLIDER */}
      {activeTab === 'COMPARISON' && (
        <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-3">
            <div>
              <h2 className="text-base font-semibold text-slate-100">
                Bi-Temporal Surface &amp; Barrier Change Inspection
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Compare baseline reference drone imagery against current patrol pass. Drag slider to reveal changes.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-md">
              Sector Bravo-4 Post 108
            </div>
          </div>

          {/* Interactive Split Image Comparison Container */}
          <div className="relative rounded-xl overflow-hidden aspect-video border border-[#1E293B] select-none">
            {/* After Image (Background) */}
            <img
              src={MOCK_ENV_CHANGES[0].afterImageUrl}
              alt="Current Discontinuity Frame"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-red-950/80 backdrop-blur-md border border-red-500/40 text-red-300 text-[11px] font-mono px-2.5 py-1 rounded">
              CURRENT PATROL: 2026-11-03 (Cut Detected)
            </div>

            {/* Before Image (Clipped by Slider Position) */}
            <div
              style={{ width: `${splitSliderPos}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-emerald-400"
            >
              <img
                src={MOCK_ENV_CHANGES[0].beforeImageUrl}
                alt="Baseline Reference Frame"
                className="absolute inset-0 w-[100vw] max-w-none h-full object-cover"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-slate-700 text-slate-200 text-[11px] font-mono px-2.5 py-1 rounded">
                BASELINE: 2026-11-01 (Intact Barrier)
              </div>
            </div>

            {/* Slider Handle */}
            <div
              style={{ left: `${splitSliderPos}%` }}
              className="absolute inset-y-0 -ml-3 flex items-center pointer-events-none"
            >
              <div className="w-6 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg font-bold text-xs">
                ↔
              </div>
            </div>
          </div>

          {/* Slider Range Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>← Baseline Reference</span>
              <span className="text-emerald-400 font-bold">{splitSliderPos}% Split Position</span>
              <span>Current Frame with Breach Flag →</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={splitSliderPos}
              onChange={(e) => setSplitSliderPos(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
              <span className="text-slate-500 block text-[10px]">VEGETATION DELTA (NDVI)</span>
              <span className="text-red-400 font-bold text-sm">-0.28 Structural Cut</span>
            </div>
            <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
              <span className="text-slate-500 block text-[10px]">CHANGE MODEL</span>
              <span className="text-slate-200 font-bold text-sm">ViT-ChangeDet-v1.1</span>
            </div>
            <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
              <span className="text-slate-500 block text-[10px]">ANOMALY CONFIDENCE</span>
              <span className="text-emerald-400 font-bold text-sm">91.6% Match</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MODEL EVALUATION BENCHMARKS */}
      {activeTab === 'EVALUATION' && (
        <div className="space-y-6">
          {/* Model Selector & High Level Metrics */}
          <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-100">{activeModel.name}</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Version: {activeModel.modelVersion} • Dataset Split: {activeModel.datasetDate}
                </p>
              </div>

              {/* Model Switcher */}
              <div className="flex items-center space-x-2">
                {MOCK_MODEL_METRICS.map((m) => (
                  <button
                    key={m.modelVersion}
                    onClick={() => setActiveModel(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                      activeModel.modelVersion === m.modelVersion
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                        : 'bg-[#080D1A] text-slate-400 border-[#1E293B] hover:text-slate-200'
                    }`}
                  >
                    {m.modelVersion}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">mAP @ 0.50</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{(activeModel.mAP50 * 100).toFixed(1)}%</span>
              </div>
              <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">mAP @ 0.50:0.95</span>
                <span className="text-xl font-bold font-mono text-blue-400">{(activeModel.mAP50_95 * 100).toFixed(1)}%</span>
              </div>
              <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Precision / Recall</span>
                <span className="text-xl font-bold font-mono text-slate-100">
                  {(activeModel.precision * 100).toFixed(0)}% / {(activeModel.recall * 100).toFixed(0)}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#080D1A] border border-[#1E293B]">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Inference Latency</span>
                <span className="text-xl font-bold font-mono text-slate-100">{activeModel.avgLatencyMs} ms</span>
              </div>
            </div>
          </div>

          {/* Interactive Confusion Matrix & Class Metrics Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Performance Breakdown */}
            <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-slate-100 font-mono">
                Class-Level Performance Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#1E293B] text-[10px] uppercase text-slate-400">
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Precision</th>
                      <th className="pb-2">Recall</th>
                      <th className="pb-2">F1-Score</th>
                      <th className="pb-2 text-right">Samples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]/60">
                    {activeModel.classMetrics.map((cm) => (
                      <tr key={cm.category} className="hover:bg-[#131E35]/40 transition-colors">
                        <td className="py-2.5 font-semibold text-slate-200">{cm.category}</td>
                        <td className="py-2.5 text-emerald-400">{(cm.precision * 100).toFixed(1)}%</td>
                        <td className="py-2.5 text-blue-400">{(cm.recall * 100).toFixed(1)}%</td>
                        <td className="py-2.5 text-slate-300">{(cm.f1 * 100).toFixed(1)}%</td>
                        <td className="py-2.5 text-right text-slate-400">{cm.sampleCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Confusion Matrix Visual Matrix */}
            <div className="bg-[#0D1526] border border-[#1E293B] rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-slate-100 font-mono">
                Confusion Matrix Distribution
              </h3>
              <div className="space-y-2">
                {activeModel.confusionMatrix.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#080D1A] border border-[#1E293B] flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="text-slate-400">Actual: </span>
                      <strong className="text-slate-200">{item.actual}</strong>
                      <span className="text-slate-500 mx-2">→</span>
                      <span className="text-slate-400">Predicted: </span>
                      <strong className={item.actual === item.predicted ? 'text-emerald-400' : 'text-amber-400'}>
                        {item.predicted}
                      </strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
