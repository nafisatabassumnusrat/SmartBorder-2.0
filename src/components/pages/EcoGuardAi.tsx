import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Flame, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Maximize2, 
  Activity, 
  Info,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { MOCK_ECOGUARD_DETECTIONS, EcoGuardDetection } from '../../mockData/ecoguardData';

export const EcoGuardAi: React.FC = () => {
  const { language, addToast, bumpDataRevision } = useAppStore();
  const [detections, setDetections] = useState<EcoGuardDetection[]>(MOCK_ECOGUARD_DETECTIONS);
  const [selectedDetection, setSelectedDetection] = useState<EcoGuardDetection>(MOCK_ECOGUARD_DETECTIONS[0]);
  const [viewMode, setViewMode] = useState<'SPLIT' | 'OPTICAL' | 'THERMAL'>('SPLIT');
  const [thermalPalette, setThermalPalette] = useState<'IRONBOW' | 'WHITE_HOT'>('IRONBOW');

  const handleDecision = (id: string, decision: 'VERIFIED' | 'REJECTED') => {
    setDetections(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          verificationStatus: decision,
          reviewerDecision: decision === 'VERIFIED' 
            ? 'Approved by Verification Officer - Incident Logged' 
            : 'Rejected as False Alarm / Benign Wildlife by Verification Officer'
        };
      }
      return d;
    }));

    if (selectedDetection.id === id) {
      setSelectedDetection(prev => ({
        ...prev,
        verificationStatus: decision,
        reviewerDecision: decision === 'VERIFIED' 
          ? 'Approved by Verification Officer - Incident Logged' 
          : 'Rejected as False Alarm / Benign Wildlife by Verification Officer'
      }));
    }

    addToast({
      type: decision === 'VERIFIED' ? 'SUCCESS' : 'WARNING',
      title: decision === 'VERIFIED' ? 'Detection Verified' : 'Detection Dismissed',
      message: `${selectedDetection.targetId} status updated to [${decision}]. Audit record generated.`
    });
    bumpDataRevision();
  };

  return (
    <div className="pb-12">
      <PageHeader
        category="INTELLIGENCE MODULES"
        categoryBn="গোয়েন্দা প্রযুক্তি মডিউল"
        title={language === 'BN' ? 'ইকোগার্ড এআই (অপটিক্যাল ও থার্মাল)' : 'EcoGuard AI – Dual-Spectrum Biological & Threat Classifier'}
        subtitle={language === 'BN' 
          ? 'দৃশ্যমান ও অবলোহিত থার্মাল বিশ্লেষণ, মানুষ ও বন্যপ্রাণীর নির্ভুল শ্রেণিবিভাগ ও মানব যাচাইকরণ' 
          : 'Dual-band electro-optical & thermal infrared sensor analytics for discriminating unauthorized border crossing from local livestock & wildlife'}
        statusBadge="FLIR BOSON 640 RADIOMETRIC READY"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Detection Queue Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {detections.map((det) => (
            <button
              key={det.id}
              onClick={() => setSelectedDetection(det)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedDetection.id === det.id
                  ? 'bg-blue-50  border-[#2386C8] shadow-xs'
                  : 'bg-white  border-slate-200  hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="text-[#2386C8] font-bold">{det.targetId}</span>
                <span className={`px-1.5 py-0.2 rounded font-bold ${
                  det.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700  ' :
                  det.verificationStatus === 'REJECTED' ? 'bg-slate-200 text-slate-700  ' :
                  'bg-amber-100 text-amber-700  '
                }`}>
                  {det.verificationStatus === 'PENDING_HUMAN_REVIEW' ? 'PENDING' : det.verificationStatus}
                </span>
              </div>
              <div className="font-bold text-xs text-[#10243A] truncate">
                {det.category}: {det.locationName.split('(')[0]}
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">
                📍 {det.sector.split('–')[0]}
              </div>
              <div className="text-[10px] font-mono text-emerald-600 mt-1">
                {(det.confidence * 100).toFixed(1)}% Conf | +{det.heatSignatureCelsius}°C
              </div>
            </button>
          ))}
        </div>

        {/* Dual-Spectrum Visualizer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Dual Spectrum Viewer (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              {/* Header and View Mode Switcher */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-sm text-[#10243A]">
                    {selectedDetection.targetId} – {selectedDetection.locationName}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={() => setViewMode('SPLIT')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewMode === 'SPLIT' ? 'bg-[#10243A] text-white ' : 'bg-slate-100  text-slate-600 '
                    }`}
                  >
                    Side-by-Side Dual
                  </button>
                  <button
                    onClick={() => setViewMode('THERMAL')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewMode === 'THERMAL' ? 'bg-[#10243A] text-white ' : 'bg-slate-100  text-slate-600 '
                    }`}
                  >
                    Thermal (LWIR)
                  </button>
                  <button
                    onClick={() => setViewMode('OPTICAL')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      viewMode === 'OPTICAL' ? 'bg-[#10243A] text-white ' : 'bg-slate-100  text-slate-600 '
                    }`}
                  >
                    Optical (RGB)
                  </button>
                </div>
              </div>

              {/* Viewer Screen Canvas */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner">
                {viewMode === 'SPLIT' && (
                  <div className="grid grid-cols-2 h-full">
                    {/* Left: Visible Optical */}
                    <div className="relative h-full border-r border-slate-800 overflow-hidden">
                      <img 
                        src={selectedDetection.opticalImageUrl} 
                        alt="Optical Capture" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs font-bold">
                        VISIBLE (4K EO)
                      </div>
                    </div>

                    {/* Right: Thermal Infrared with Color Filter */}
                    <div className="relative h-full overflow-hidden">
                      <img 
                        src={selectedDetection.thermalImageUrl} 
                        alt="Thermal Capture" 
                        className={`w-full h-full object-cover ${
                          thermalPalette === 'IRONBOW' 
                            ? 'sepia hue-rotate-180 contrast-125' 
                            : 'grayscale contrast-150'
                        }`} 
                      />
                      <div className="absolute top-2 left-2 bg-amber-500/80 text-black text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs font-bold">
                        THERMAL (LWIR 640)
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                        Core Temp: +{selectedDetection.heatSignatureCelsius}°C
                      </div>
                    </div>
                  </div>
                )}

                {viewMode === 'OPTICAL' && (
                  <div className="relative w-full h-full">
                    <img 
                      src={selectedDetection.opticalImageUrl} 
                      alt="Optical Capture" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-mono px-2.5 py-1 rounded font-bold">
                      HIGH-RESOLUTION VISIBLE OPTICAL (RGB)
                    </div>
                  </div>
                )}

                {viewMode === 'THERMAL' && (
                  <div className="relative w-full h-full">
                    <img 
                      src={selectedDetection.thermalImageUrl} 
                      alt="Thermal Capture" 
                      className={`w-full h-full object-cover ${
                        thermalPalette === 'IRONBOW' 
                          ? 'sepia hue-rotate-180 contrast-125' 
                          : 'grayscale contrast-150'
                      }`} 
                    />
                    <div className="absolute top-3 left-3 bg-amber-500 text-black text-[11px] font-mono px-2.5 py-1 rounded font-bold">
                      LONGWAVE INFRARED (LWIR RADIOMETRIC)
                    </div>
                  </div>
                )}
              </div>

              {/* Palette & Controls Footer */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <span>Thermal Palette:</span>
                  <button
                    onClick={() => setThermalPalette('IRONBOW')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      thermalPalette === 'IRONBOW' ? 'bg-amber-100 text-amber-800 font-bold' : 'text-slate-400'
                    }`}
                  >
                    Ironbow (False Color)
                  </button>
                  <button
                    onClick={() => setThermalPalette('WHITE_HOT')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      thermalPalette === 'WHITE_HOT' ? 'bg-slate-200 text-slate-800 font-bold' : 'text-slate-400'
                    }`}
                  >
                    White-Hot (Grayscale)
                  </button>
                </div>

                <div className="text-[11px] font-mono">
                  Ambient: {selectedDetection.ambientTempCelsius}°C | ΔT: +{(selectedDetection.heatSignatureCelsius - selectedDetection.ambientTempCelsius).toFixed(1)}°C
                </div>
              </div>
            </div>
          </div>

          {/* Classification & Human Review Action Desk (1 column) */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-[#2386C8] font-bold pb-2 border-b border-slate-200">
                AI CLASSIFICATION EXPLAINABILITY
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Predicted Category:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    selectedDetection.category === 'PERSON' ? 'bg-red-100 text-red-700  ' :
                    selectedDetection.category === 'WATERCRAFT' ? 'bg-blue-100 text-blue-700  ' :
                    'bg-emerald-100 text-emerald-700  '
                  }`}>
                    {selectedDetection.category}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Confidence Score:</span>
                    <span className="font-bold text-[#2386C8]">{(selectedDetection.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Bayesian Uncertainty:</span>
                    <span className="font-mono text-slate-700">{(selectedDetection.uncertaintyScore * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Timestamp:</span>
                    <span className="font-mono text-slate-500">{new Date(selectedDetection.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed">
                  <strong>AI Explanation:</strong> {selectedDetection.aiExplanation}
                </div>

                {selectedDetection.reviewerDecision && (
                  <div className="mt-2.5 p-2 bg-emerald-50 rounded border border-emerald-200 text-[11px] text-emerald-800">
                    <strong>Reviewer Sign-off:</strong> {selectedDetection.reviewerDecision}
                  </div>
                )}
              </div>

              {/* Responsible AI Human Review Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-200 space-y-2">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold mb-2">
                  HUMAN VERIFICATION ACTION:
                </div>
                <button
                  onClick={() => handleDecision(selectedDetection.id, 'VERIFIED')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify as Genuine Target</span>
                </button>
                <button
                  onClick={() => handleDecision(selectedDetection.id, 'REJECTED')}
                  className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors border border-slate-200"
                >
                  <XCircle className="w-4 h-4 text-slate-400" />
                  <span>Dismiss as Benign / False Positive</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

