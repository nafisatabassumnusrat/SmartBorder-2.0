import React, { useState } from 'react';
import { 
  FileBarChart, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Activity, 
  Waves, 
  Plane, 
  Scan,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';

export const AnalyticsReports: React.FC = () => {
  const { language, addToast } = useAppStore();
  const [selectedRange, setSelectedRange] = useState<string>('6M');

  // Trend data by month for Bangladesh sectors
  const monthlyIncidents = [
    { month: 'Jun', sylhet: 12, benapole: 18, teknaf: 28, kurigram: 14, chapai: 8 },
    { month: 'Jul', sylhet: 15, benapole: 22, teknaf: 34, kurigram: 19, chapai: 11 },
    { month: 'Aug', sylhet: 18, benapole: 19, teknaf: 42, kurigram: 26, chapai: 14 },
    { month: 'Sep', sylhet: 14, benapole: 24, teknaf: 36, kurigram: 22, chapai: 12 },
    { month: 'Oct', sylhet: 11, benapole: 20, teknaf: 31, kurigram: 17, chapai: 9 },
    { month: 'Nov', sylhet: 8, benapole: 16, teknaf: 25, kurigram: 13, chapai: 6 }
  ];

  // River accretion vs erosion trend
  const riverTrends = [
    { year: '2021', accretion: 95, erosion: 110 },
    { year: '2022', accretion: 112, erosion: 104 },
    { year: '2023', accretion: 128, erosion: 98 },
    { year: '2024', accretion: 135, erosion: 92 },
    { year: '2025', accretion: 140, erosion: 89 },
    { year: '2026', accretion: 142, erosion: 88 }
  ];

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Month,Sylhet,Benapole,Teknaf,Kurigram,Chapai\n" + 
      monthlyIncidents.map(e => `${e.month},${e.sylhet},${e.benapole},${e.teknaf},${e.kurigram},${e.chapai}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SmartBorder_National_Intelligence_Report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'SUCCESS',
      title: 'CSV Intelligence Dump Downloaded',
      message: 'Sovereign tabular dataset exported successfully.'
    });
  };

  const handlePrintBriefing = () => {
    window.print();
    addToast({
      type: 'INFO',
      title: 'Formatted for Prime Minister Executive Briefing',
      message: 'Document dispatched to sovereign PDF / Print Spooler.'
    });
  };

  return (
    <div className="pb-12">
      <PageHeader
        category="DATA & ANALYTICS"
        categoryBn="ডাটা ও বিশ্লেষণ"
        title={language === 'BN' ? 'বিশ্লেষণ ও সরকারি প্রতিবেদন' : 'Analytics & Official Intelligence Briefings'}
        subtitle={language === 'BN' 
          ? 'মডিউলভিত্তিক কার্যক্ষমতা, নদী ভাঙনের ঐতিহাসিক পরিসংখ্যান ও প্রধানমন্ত্রীর কার্যালয়ের নির্বাহী প্রতিবেদন' 
          : 'High-level operational metrics, 12-month threat trajectories, and institutional briefing documents'}
        statusBadge="OFFICIAL REPORT SP-2026-BD"
        actionButtons={
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold shadow-xs hover:bg-slate-50 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrintBriefing}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#2386C8] bg-[#2386C8] hover:bg-[#1b6fa7] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Briefing</span>
            </button>
          </div>
        }
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Executive Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Monthly Interdictions</div>
            <div className="text-2xl font-bold text-[#10243A] mt-2">68 Incidents</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center space-x-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-18.4% reduction YoY</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">UAV Reconnaissance Flight Hours</div>
            <div className="text-2xl font-bold text-sky-600 mt-2">1,420 Hours</div>
            <div className="text-[11px] text-slate-500 mt-1">99.2% Mission Completion</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Human Verification Concordance</div>
            <div className="text-2xl font-bold text-emerald-600 mt-2">97.6%</div>
            <div className="text-[11px] text-slate-500 mt-1">Officer agreement with AI flags</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Riverine Char Displacement Tracked</div>
            <div className="text-2xl font-bold text-blue-600 mt-2">+142.6 ha</div>
            <div className="text-[11px] text-slate-500 mt-1">Padma-Jamuna Brahmaputra basin</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Sector Incidents Trend */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-[#10243A]">
                  Border Incidents & Anomalies by Sector (6-Month Trajectory)
                </h3>
                <p className="text-xs text-slate-500">
                  Teknaf (Naf River) and Benapole represent top operational monitoring zones
                </p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyIncidents} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="teknaf" name="Teknaf (Naf)" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="benapole" name="Benapole" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="sylhet" name="Sylhet" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: RiverShift Char Accretion vs Bank Erosion */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-[#10243A]">
                  RiverShift AI: Annual Char Accretion vs Erosion (Hectares)
                </h3>
                <p className="text-xs text-slate-500">
                  Brahmaputra and Padma river dynamic shift over 6-year sovereign baseline
                </p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riverTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="accretion" name="Char Accretion (ha)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="erosion" name="Bank Erosion (ha)" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Official Briefing Report Table */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <h3 className="font-bold text-sm text-[#10243A] mb-3">
            Inter-Agency Operational Intelligence Summary Table
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">Sector & Battalion</th>
                  <th className="p-2.5">Deployed Assets</th>
                  <th className="p-2.5">AI Detections (30d)</th>
                  <th className="p-2.5">Officer Verifications</th>
                  <th className="p-2.5">False Positive Rate</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold">Sylhet (48 BGB Battalion)</td>
                  <td className="p-2.5">2 Falcon UAVs + 3 FLIR Masts</td>
                  <td className="p-2.5 font-mono">142 Targets</td>
                  <td className="p-2.5 font-mono text-emerald-600 font-bold">138 Verified</td>
                  <td className="p-2.5 font-mono">2.8%</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      NOMINAL
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold">Teknaf (2 BGB + Coast Guard)</td>
                  <td className="p-2.5">2 Falcon Boats + 2 UAVs + 4 Masts</td>
                  <td className="p-2.5 font-mono">298 Targets</td>
                  <td className="p-2.5 font-mono text-emerald-600 font-bold">285 Verified</td>
                  <td className="p-2.5 font-mono">4.3%</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">
                      ELEVATED WATCH
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold">Benapole (49 BGB Battalion)</td>
                  <td className="p-2.5">TrustPlate OCR + 1 UAV + 4 Masts</td>
                  <td className="p-2.5 font-mono">820 Vehicles</td>
                  <td className="p-2.5 font-mono text-emerald-600 font-bold">814 Cleared</td>
                  <td className="p-2.5 font-mono">0.7%</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      NOMINAL
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold">Kurigram (22 BGB Battalion)</td>
                  <td className="p-2.5">RiverShift AI + 1 UAV + 1 Boat</td>
                  <td className="p-2.5 font-mono">64 Morphological Flags</td>
                  <td className="p-2.5 font-mono text-emerald-600 font-bold">64 SOB Certified</td>
                  <td className="p-2.5 font-mono">0.0%</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                      HYDROGRAPHIC SURVEY
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

