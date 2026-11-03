import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Radio, 
  Plane, 
  Anchor, 
  Eye, 
  Scan, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';

export const DataFusionCenter: React.FC = () => {
  const { language, addToast } = useAppStore();
  const [activePipelineStage, setActivePipelineStage] = useState<number>(3);

  const streams = [
    {
      name: 'Falcon UAV Optical & Thermal Feeds',
      type: 'UAV_FEED',
      rate: '1,842 frames/hr',
      latency: '18ms',
      quality: '99.8%',
      status: 'ACTIVE',
      icon: Plane,
      color: 'text-sky-500'
    },
    {
      name: 'Sentinel-2 & Landsat-9 Satellite Rasters',
      type: 'SATELLITE_RASTER',
      rate: '4 sweeps/day',
      latency: '120ms',
      quality: '98.5%',
      status: 'ACTIVE',
      icon: Layers,
      color: 'text-blue-500'
    },
    {
      name: 'Fixed FLIR Mast Towers & Radar',
      type: 'THERMAL_STREAM',
      rate: '60 Hz continuous',
      latency: '8ms',
      quality: '99.9%',
      status: 'ACTIVE',
      icon: Eye,
      color: 'text-amber-500'
    },
    {
      name: 'Falcon Boat Sonar & Hydrography',
      type: 'RIVER_SONAR',
      rate: '10 pings/sec',
      latency: '22ms',
      quality: '97.4%',
      status: 'ACTIVE',
      icon: Anchor,
      color: 'text-teal-500'
    },
    {
      name: 'TrustPlate Land Port Gate OCR',
      type: 'LAND_PORT_OCR',
      rate: '240 scans/hr',
      latency: '45ms',
      quality: '98.4%',
      status: 'ACTIVE',
      icon: Scan,
      color: 'text-indigo-500'
    },
    {
      name: 'BGB Field Patrol Intelligence Reports',
      type: 'FIELD_REPORT',
      rate: 'Manual Dispatch Log',
      latency: 'Immediate',
      quality: 'Verified',
      status: 'ACTIVE',
      icon: FileText,
      color: 'text-emerald-500'
    }
  ];

  const pipelineStages = [
    {
      num: 1,
      titleEn: '1. Ingestion & Quality Filtering',
      titleBn: '১. ইনজেশন ও কোয়ালিটি ফিল্টার',
      descEn: 'Raw telemetry verification, packet validation, and noise suppression'
    },
    {
      num: 2,
      titleEn: '2. Spatial & Temporal Normalization',
      titleBn: '২. স্থানিক ও সময়ভিত্তিক সমন্বয়',
      descEn: 'Georeferencing into WGS84 / BTM and synchronized timestamp alignment'
    },
    {
      num: 3,
      titleEn: '3. Multi-Modal AI Correlation',
      titleBn: '৩. মাল্টি-মোডাল এআই পারস্পরিক সম্পর্ক',
      descEn: 'Cross-sensor spatial fusion: linking radar blip with thermal camera track'
    },
    {
      num: 4,
      titleEn: '4. Bayesian Confidence Assessment',
      titleBn: '৪. আত্মবিশ্বাস ও অনিশ্চয়তা মূল্যায়ন',
      descEn: 'Calculates false alarm probability and threat severity scoring'
    },
    {
      num: 5,
      titleEn: '5. Unified Intelligence Layer Dispatch',
      titleBn: '৫. সমন্বিত ইন্টেলিজেন্স লেয়ার প্রেরণ',
      descEn: 'Populates Command Dashboard and dispatches to Human Verification Desk'
    }
  ];

  return (
    <div className="pb-12">
      <PageHeader
        category="DATA & ANALYTICS"
        categoryBn="ডাটা ও বিশ্লেষণ"
        title={language === 'BN' ? 'ডাটা ফিউশন সেন্টার' : 'Data Fusion Center – Unified Multi-Sensor Engine'}
        subtitle={language === 'BN' 
          ? 'বহু-উৎস সেন্সর ডাটা ইনজেশন পাইপলাইন ও সমন্বিত ইন্টেলিজেন্স স্তর' 
          : 'Central nervous system correlating multi-sensor inputs into an authoritative sovereign intelligence picture'}
        statusBadge="FUSION PIPELINE THROUGHPUT: NOMINAL"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Core Architecture Pipeline Diagram */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-[#10243A]">
                Unified Intelligence Layer – 5-Stage Processing Architecture
              </h3>
              <p className="text-xs text-slate-500">
                Data correlation from 6 autonomous sensors into explainable threat intelligence
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">
              Pipeline Latency: 18ms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {pipelineStages.map((stage) => {
              const isSelected = activePipelineStage === stage.num;
              return (
                <div
                  key={stage.num}
                  onClick={() => setActivePipelineStage(stage.num)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50  border-[#2386C8] shadow-xs scale-102'
                      : 'border-slate-200  hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                    STAGE {stage.num}
                  </div>
                  <h4 className="font-bold text-xs text-[#10243A] mt-1">
                    {language === 'BN' ? stage.titleBn : stage.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    {stage.descEn}
                  </p>
                  <div className="mt-3 flex items-center space-x-1 text-[10px] text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Processing Active</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6 Ingestion Data Streams Grid */}
        <div>
          <h3 className="text-base font-bold text-[#10243A] mb-3">
            Active Multi-Modal Ingestion Feeds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {streams.map((stream, idx) => {
              const Icon = stream.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#2386C8] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <Icon className={`w-5 h-5 ${stream.color}`} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                          STREAM 0{idx + 1}
                        </div>
                        <h4 className="font-bold text-xs text-[#10243A]">
                          {stream.name}
                        </h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {stream.status}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Ingest Rate</div>
                      <div className="font-bold text-slate-800 mt-0.5">{stream.rate}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Latency</div>
                      <div className="font-mono font-semibold text-slate-800 mt-0.5">{stream.latency}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Data Integrity</div>
                      <div className="font-bold text-emerald-600 mt-0.5">{stream.quality}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multi-Sensor Cross-Corroboration Matrix */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#10243A]">
              Multi-Sensor Cross-Corroboration Evidence Matrix
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Bayesian Fusion Engine v3.2
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">Correlated Incident</th>
                  <th className="p-2.5">Sector</th>
                  <th className="p-2.5">Corroborating Sensors</th>
                  <th className="p-2.5">Fused Confidence</th>
                  <th className="p-2.5">Intelligence Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#10243A]">
                    Target TG-SYL-9041 (Pedestrian Transit)
                  </td>
                  <td className="p-2.5">Sylhet Sector (Jaflong)</td>
                  <td className="p-2.5 text-slate-600">
                    Falcon-01 Thermal UAV + Tamabil FLIR Mast + Ground Geophone Array
                  </td>
                  <td className="p-2.5 font-mono font-bold text-emerald-600">97.8% Fused</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">
                      Pending Human Sign-off
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-[#10243A]">
                    Target TG-TEK-5509 (Naf River Watercraft)
                  </td>
                  <td className="p-2.5">Cox's Bazar / Teknaf</td>
                  <td className="p-2.5 text-slate-600">
                    Falcon Boat 02 Radar + Marine Drive Thermal Mast + Sonar Depth
                  </td>
                  <td className="p-2.5 font-mono font-bold text-emerald-600">96.4% Fused</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                      Critical Flagged
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

