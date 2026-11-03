import React, { useState } from 'react';
import { 
  Waves, 
  Split, 
  Layers, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { MOCK_RIVERSHIFT_RECORDS } from '../../mockData/rivershiftData';
import { RiverShiftRecord } from '../../types';

export const RiverShiftAi: React.FC = () => {
  const { language, addToast } = useAppStore();
  const [records, setRecords] = useState<RiverShiftRecord[]>(MOCK_RIVERSHIFT_RECORDS);
  const [selectedRecord, setSelectedRecord] = useState<RiverShiftRecord>(MOCK_RIVERSHIFT_RECORDS[0]);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeTabMode, setActiveTabMode] = useState<'ANALYSIS' | 'CHAR_MAP' | 'HISTORY'>('ANALYSIS');

  const handleValidateReport = (rec: RiverShiftRecord) => {
    addToast({
      type: 'SUCCESS',
      title: language === 'BN' ? 'প্রতিবেদন যাচাইকৃত' : 'RiverShift Analysis Endorsed',
      message: language === 'BN' 
        ? `${rec.locationName} এর নদী ভাঙন ও চর গঠনের তথ্য বাংলাদেশ জরিপ অধিদপ্তর কর্তৃক অনুমোদিত।` 
        : `Hydrographic analysis for ${rec.locationName} endorsed by Survey of Bangladesh.`
    });
  };

  return (
    <div className="pb-12">
      <PageHeader
        category="INTELLIGENCE MODULES"
        categoryBn="গোয়েন্দা প্রযুক্তি মডিউল"
        title={language === 'BN' ? 'রিভারশিফ্ট এআই (নদী ও ভূপ্রকৃতি পরিবর্তন)' : 'RiverShift AI – River & Terrain Change Analysis'}
        subtitle={language === 'BN' 
          ? 'পদ্মা, যমুনা ও মেঘনা নদীর পাড় ভাঙন, চর সৃষ্টি ও চ্যানেল পরিবর্তনের উপগ্রহ বিশ্লেষণ' 
          : 'Multi-temporal satellite radar & optical change detection for Padma, Jamuna, Meghna & Brahmaputra riverbanks and shifting char lands'}
        statusBadge="SURVEY OF BD & BWDB COLLABORATION"
        actionButtons={
          <button
            onClick={() => handleValidateReport(selectedRecord)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#24A477] bg-[#24A477] hover:bg-[#1f8c65] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'BN' ? 'জরিপ অধিদপ্তর অনুমোদন' : 'Validate with Survey Dept'}</span>
          </button>
        }
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Key Aggregate Morphological Change Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'BN' ? 'নতুন চর সৃষ্টি (অ্যাক্রিশন)' : 'Net Char Accretion'}</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-2">
              +142.6 ha
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Brahmaputra Jatrapur Reach
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'BN' ? 'নদীভাঙন (ইরোজন)' : 'Active Bank Erosion'}</span>
              <TrendingDown className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-rose-600 mt-2">
              -88.4 ha
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              84.0 m/yr scour rate near Sariakandi
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'BN' ? 'চ্যানেল পার্শ্বীয় স্থানচ্যুতি' : 'Max Lateral Shift'}</span>
              <Waves className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-[#10243A] mt-2">
              340 meters
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Eastern channel diversion
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'BN' ? 'এআই মডেল নির্ভুলতা' : 'Model Confidence'}</span>
              <CheckCircle2 className="w-4 h-4 text-[#2386C8]" />
            </div>
            <div className="text-2xl font-bold text-[#2386C8] mt-2">
              96.8%
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              Multi-temporal SAR verified
            </div>
          </div>
        </div>

        {/* River Reach Selector Ribbon */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {records.map((rec) => (
            <button
              key={rec.id}
              onClick={() => setSelectedRecord(rec)}
              className={`px-3 py-2 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRecord.id === rec.id
                  ? 'bg-[#10243A] text-white  border-transparent shadow-xs'
                  : 'bg-white  text-slate-700  border-slate-200  hover:bg-slate-50'
              }`}
            >
              🌊 {rec.riverSystem} River: {rec.locationName}
            </button>
          ))}
        </div>

        {/* Interactive Before vs After Satellite Comparison Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Slider (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-sm text-[#10243A]">
                    {selectedRecord.riverSystem} River – {selectedRecord.locationName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Baseline ({selectedRecord.baselineYear}) vs Current ({selectedRecord.currentYear}) Satellite Multispectral Imagery
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedRecord.riskCategory === 'CRITICAL_RISK' ? 'bg-rose-100 text-rose-700  ' :
                    selectedRecord.riskCategory === 'HIGH_RISK' ? 'bg-amber-100 text-amber-700  ' :
                    'bg-emerald-100 text-emerald-700  '
                  }`}>
                    {selectedRecord.riskCategory}
                  </span>
                </div>
              </div>

              {/* Slider Canvas */}
              <div className="relative h-[360px] rounded-xl overflow-hidden border border-slate-200 select-none bg-slate-900">
                {/* Background: Current Year */}
                <img
                  src={selectedRecord.currentImageUrl}
                  alt="Current Satellite Image"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/60 text-white text-[11px] font-mono px-2.5 py-1 rounded backdrop-blur-xs font-bold">
                  Sentinel-2 ({selectedRecord.currentYear})
                </div>

                {/* Foreground: Baseline Historical Year */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={selectedRecord.historicalImageUrl}
                    alt="Historical Satellite Image"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ width: '100%', maxWidth: 'none' }}
                  />
                  <div className="absolute top-3 left-3 bg-[#10243A]/80 text-[#38BDF8] text-[11px] font-mono px-2.5 py-1 rounded backdrop-blur-xs font-bold">
                    Landsat-8 Baseline ({selectedRecord.baselineYear})
                  </div>
                </div>

                {/* Slider bar thumb line */}
                <div 
                  className="absolute inset-y-0 w-0.5 bg-white z-10 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-7 h-7 rounded-full bg-white text-[#10243A] shadow-lg flex items-center justify-center text-xs font-bold">
                    ↔
                  </div>
                </div>

                {/* Range Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(+e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>

              {/* Instruction banner */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>◀ Slide left to view current channel state / Slide right to view baseline ▶</span>
                <span className="font-mono text-[11px]">Position: {sliderPos}%</span>
              </div>
            </div>
          </div>

          {/* Morphological Shift Analysis Dossier (1 column) */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-[#2386C8] font-bold pb-2 border-b border-slate-200">
                HYDROGRAPHIC CHANGE REPORT
              </div>

              <h4 className="font-bold text-sm text-[#10243A] mt-2">
                {selectedRecord.locationName}
              </h4>
              <p className="text-xs text-slate-500">
                {selectedRecord.sector}
              </p>

              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Net Accretion (Char):</span>
                  <span className="font-bold text-emerald-600">+{selectedRecord.accretionHectares} ha</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Bank Erosion:</span>
                  <span className="font-bold text-rose-600">-{selectedRecord.erosionHectares} ha</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Lateral Bank Shift:</span>
                  <span className="font-mono font-semibold">{selectedRecord.lateralShiftMeters} meters</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Annual Scour Velocity:</span>
                  <span className="font-mono font-semibold">{selectedRecord.erosionRateMetersPerYear} m/yr</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Confidence Score:</span>
                  <span className="font-bold text-[#2386C8]">{(selectedRecord.confidenceScore * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed">
                <strong>Analysis Finding:</strong> {selectedRecord.notes}
              </div>

              <div className="mt-3 text-[10px] text-slate-400 font-mono">
                Validation Authority: {selectedRecord.validationAuthority}
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Reach Historical Comparison Records Table */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <h3 className="font-bold text-sm text-[#10243A] mb-3">
            {language === 'BN' ? 'নদীভাঙন ও চর পরিবর্তন পর্যবেক্ষণ তালিকা' : 'Sovereign River Systems Change Registry'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">River System</th>
                  <th className="p-2.5">Reach / Location</th>
                  <th className="p-2.5">Observation Span</th>
                  <th className="p-2.5">Accretion</th>
                  <th className="p-2.5">Erosion</th>
                  <th className="p-2.5">Scour Velocity</th>
                  <th className="p-2.5">Risk Rating</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((rec) => (
                  <tr 
                    key={rec.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-2.5 font-bold text-[#10243A]">
                      🌊 {rec.riverSystem}
                    </td>
                    <td className="p-2.5 font-medium">{rec.locationName}</td>
                    <td className="p-2.5 font-mono text-slate-500">{rec.baselineYear} → {rec.currentYear}</td>
                    <td className="p-2.5 font-bold text-emerald-600">+{rec.accretionHectares} ha</td>
                    <td className="p-2.5 font-bold text-rose-600">-{rec.erosionHectares} ha</td>
                    <td className="p-2.5 font-mono">{rec.erosionRateMetersPerYear} m/yr</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rec.riskCategory === 'CRITICAL_RISK' ? 'bg-rose-100 text-rose-700  ' :
                        rec.riskCategory === 'HIGH_RISK' ? 'bg-amber-100 text-amber-700  ' :
                        'bg-emerald-100 text-emerald-700  '
                      }`}>
                        {rec.riskCategory}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => setSelectedRecord(rec)}
                        className="px-2.5 py-1 rounded bg-blue-50 text-[#2386C8] hover:bg-[#2386C8] hover:text-white font-medium text-[11px] transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

