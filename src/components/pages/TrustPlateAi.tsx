import React, { useState } from 'react';
import { 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Truck, 
  FileText, 
  UserCheck, 
  Search, 
  XCircle,
  Eye,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';
import { MOCK_TRUSTPLATE_RECORDS } from '../../mockData/trustplateData';
import { TrustPlateRecord } from '../../types';

export const TrustPlateAi: React.FC = () => {
  const { language, addToast, bumpDataRevision } = useAppStore();
  const [records, setRecords] = useState<TrustPlateRecord[]>(MOCK_TRUSTPLATE_RECORDS);
  const [selectedRecord, setSelectedRecord] = useState<TrustPlateRecord>(MOCK_TRUSTPLATE_RECORDS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleVerifyVehicle = (id: string, action: 'CLEARED' | 'DETAINED') => {
    setRecords(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          customsClearance: action,
          verifiedByOfficer: action === 'CLEARED' 
            ? 'Verified & Cleared by Senior Insp. Nazmul Huda' 
            : 'Detained for Secondary Physical Inspection'
        };
      }
      return r;
    }));

    if (selectedRecord.id === id) {
      setSelectedRecord(prev => ({
        ...prev,
        customsClearance: action,
        verifiedByOfficer: action === 'CLEARED' 
          ? 'Verified & Cleared by Senior Insp. Nazmul Huda' 
          : 'Detained for Secondary Physical Inspection'
      }));
    }

    addToast({
      type: action === 'CLEARED' ? 'SUCCESS' : 'ALERT',
      title: action === 'CLEARED' ? 'Vehicle Cleared' : 'Vehicle Detained',
      message: `${selectedRecord.plateBengali} [${action}]. Customs record synchronized with BRTA database.`
    });
    bumpDataRevision();
  };

  const filtered = records.filter(r => 
    r.plateBengali.includes(searchQuery) || 
    r.plateEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.checkpoint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-12">
      <PageHeader
        category="INTELLIGENCE MODULES"
        categoryBn="গোয়েন্দা প্রযুক্তি মডিউল"
        title={language === 'BN' ? 'ট্রাস্টপ্লেট এআই (যানবাহন নম্বরপ্লেট ওসিআর)' : 'TrustPlate AI – Land Port Vehicle OCR & BRTA Cross-Match'}
        subtitle={language === 'BN' 
          ? 'বেনাপোল, তামাবিল ও হিলি স্থলবন্দরে বাংলা নম্বরপ্লেট শনাক্তকরণ ও বিআরটিএ ডাটাবেজ যাচাই' 
          : 'High-speed automated license plate recognition supporting Bengali script and real-time validation against BRTA national registry'}
        statusBadge="BRTA LIVE GATEWAY INTERFACED"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Search & Checkpoint Filter Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'BN' ? 'বাংলা প্লেট বা চেকপোস্ট খুঁজুন...' : 'Search Bengali plate or checkpoint...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#10243A] focus:outline-hidden focus:border-[#2386C8]"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
            <span>OCR Engine: <strong>BanglaOCR-v4.2-ResNet</strong></span>
            <span>| Accuracy: <strong className="text-emerald-600">98.4%</strong></span>
          </div>
        </div>

        {/* Vehicle Inspection Detail & Live Camera Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vehicle Visual Frame & Plate Bounding Box (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-sm text-[#10243A]">
                    {selectedRecord.checkpoint}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedRecord.sector}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                    selectedRecord.brtaStatus === 'AUTHORIZED' ? 'bg-emerald-100 text-emerald-700  ' :
                    'bg-rose-100 text-rose-700  '
                  }`}>
                    BRTA: {selectedRecord.brtaStatus}
                  </span>
                </div>
              </div>

              {/* Vehicle Image Frame with Bengali Plate Simulation */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner flex items-center justify-center">
                <img
                  src={selectedRecord.imageUrl}
                  alt="Vehicle Ingress Camera"
                  className="w-full h-full object-cover"
                />

                {/* License Plate Zoom Inset Bounding Box */}
                <div 
                  className="absolute border-2 border-[#2386C8] bg-[#2386C8]/10 rounded-xs shadow-lg"
                  style={{ left: '32%', top: '65%', width: '36%', height: '22%' }}
                >
                  <div className="absolute -top-5 left-0 bg-[#2386C8] text-white text-[10px] font-mono px-1.5 py-0.2 rounded font-bold whitespace-nowrap">
                    ANPR OCR LOCK [{(selectedRecord.ocrConfidence * 100).toFixed(1)}%]
                  </div>
                </div>

                {/* Floating Bengali License Plate Representation */}
                <div className="absolute bottom-4 inset-x-6 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-300 shadow-xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                      DECODED BENGALI SCRIPT LICENSE PLATE:
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#10243A] tracking-wider font-sans mt-0.5">
                      {selectedRecord.plateBengali}
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      {selectedRecord.plateEnglish}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase text-slate-500">
                      CONFIDENCE
                    </div>
                    <div className="text-lg font-bold text-emerald-600 font-mono">
                      {(selectedRecord.ocrConfidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Character by Character Confidence Breakdown */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-mono uppercase text-slate-500 mb-2 font-semibold">
                  GLYPH-LEVEL RECOGNITION CERTAINTY:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRecord.characterBreakdown.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`px-2 py-1 rounded border text-center ${
                        item.confidence >= 0.95 
                          ? 'bg-emerald-50  text-emerald-800  border-emerald-200 ' 
                          : 'bg-amber-50  text-amber-800  border-amber-200 '
                      }`}
                    >
                      <div className="text-sm font-bold">{item.char}</div>
                      <div className="text-[9px] font-mono">{(item.confidence * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BRTA Database Verification Dossier (1 column) */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-[#2386C8] font-bold pb-2 border-b border-slate-200">
                BRTA & CUSTOMS DOSSIER
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Registered Driver:</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.driverName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Vehicle Class:</span>
                  <span className="font-semibold">{selectedRecord.vehicleClass}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Manifest Code:</span>
                  <span className="font-mono text-slate-700">{selectedRecord.manifestCode}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Customs Clearance:</span>
                  <span className={`font-bold ${
                    selectedRecord.customsClearance === 'CLEARED' ? 'text-emerald-600' :
                    selectedRecord.customsClearance === 'DETAINED' ? 'text-rose-600' :
                    'text-amber-600'
                  }`}>
                    {selectedRecord.customsClearance}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="font-mono text-slate-500">{new Date(selectedRecord.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              {selectedRecord.verifiedByOfficer && (
                <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200 text-[11px] text-[#2386C8]">
                  <strong>Inspection Sign-off:</strong> {selectedRecord.verifiedByOfficer}
                </div>
              )}

              {/* Action Buttons for Customs Officer */}
              <div className="mt-5 pt-3 border-t border-slate-200 space-y-2">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold mb-2">
                  CUSTOMS OFFICER ACTION:
                </div>
                <button
                  onClick={() => handleVerifyVehicle(selectedRecord.id, 'CLEARED')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize Port Clearance</span>
                </button>
                <button
                  onClick={() => handleVerifyVehicle(selectedRecord.id, 'DETAINED')}
                  className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors shadow-xs"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Detain for Physical Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gate Passage Registry Table */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <h3 className="font-bold text-sm text-[#10243A] mb-3">
            {language === 'BN' ? 'স্থলবন্দর যানবাহন যাচাইয়ের ইতিহাস' : 'Land Port Vehicle Passage & Verification Registry'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">Bengali Plate</th>
                  <th className="p-2.5">English Equivalent</th>
                  <th className="p-2.5">Checkpoint</th>
                  <th className="p-2.5">BRTA Status</th>
                  <th className="p-2.5">OCR Conf</th>
                  <th className="p-2.5">Clearance</th>
                  <th className="p-2.5 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr 
                    key={r.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-2.5 font-bold text-base text-[#10243A]">
                      {r.plateBengali}
                    </td>
                    <td className="p-2.5 font-mono text-slate-600">{r.plateEnglish}</td>
                    <td className="p-2.5">{r.checkpoint}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.brtaStatus === 'AUTHORIZED' ? 'bg-emerald-100 text-emerald-700  ' :
                        'bg-rose-100 text-rose-700  '
                      }`}>
                        {r.brtaStatus}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono font-bold text-[#2386C8]">
                      {(r.ocrConfidence * 100).toFixed(1)}%
                    </td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.customsClearance === 'CLEARED' ? 'bg-emerald-100 text-emerald-700' :
                        r.customsClearance === 'DETAINED' ? 'bg-rose-100 text-rose-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {r.customsClearance}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => setSelectedRecord(r)}
                        className="px-2.5 py-1 rounded bg-blue-50 text-[#2386C8] hover:bg-[#2386C8] hover:text-white font-medium text-[11px] transition-colors"
                      >
                        Inspect Plate
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

