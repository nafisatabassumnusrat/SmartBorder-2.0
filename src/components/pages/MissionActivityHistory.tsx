import React, { useState } from 'react';
import { 
  History, 
  Calendar, 
  Plane, 
  Anchor, 
  Clock, 
  ShieldCheck, 
  Filter, 
  Search, 
  Download, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PageHeader } from '../common/PageHeader';

interface MissionRecord {
  id: string;
  code: string;
  title: string;
  sector: string;
  asset: string;
  type: 'SCHEDULED_PERIMETER_SWEEP' | 'RIVERINE_INTERDICTION' | 'FLOOD_RELIEF_RECON' | 'NIGHT_THERMAL_PATROL';
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ABORTED';
  durationMinutes: number;
  coveragePct: number;
  commander: string;
  date: string;
  detectionsCount: number;
}

export const MissionActivityHistory: React.FC = () => {
  const { language, addToast } = useAppStore();
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const missions: MissionRecord[] = [
    {
      id: 'msn-01',
      code: 'MSN-BD-2026-4401',
      title: 'Sylhet Tamabil-Piyain Low Altitude Perimeter Orbit',
      sector: 'Sylhet – Tamabil / Jaflong Sector',
      asset: 'Falcon-01 UAV',
      type: 'SCHEDULED_PERIMETER_SWEEP',
      status: 'COMPLETED',
      durationMinutes: 95,
      coveragePct: 98.4,
      commander: 'Major Rafiqul Islam (48 BGB)',
      date: '2026-11-03 21:30',
      detectionsCount: 8
    },
    {
      id: 'msn-02',
      code: 'MSN-BD-2026-4402',
      title: 'Naf River International Estuary Fairway Night Sweep',
      sector: "Cox's Bazar – Teknaf / Naf River Sector",
      asset: 'Falcon Boat 02 + Falcon-03 UAV',
      type: 'RIVERINE_INTERDICTION',
      status: 'IN_PROGRESS',
      durationMinutes: 140,
      coveragePct: 94.2,
      commander: 'Lt. Commander Tanvir Ahmed (Coast Guard)',
      date: '2026-11-03 22:10',
      detectionsCount: 19
    },
    {
      id: 'msn-03',
      code: 'MSN-BD-2026-4398',
      title: 'Brahmaputra Jatrapur Seasonal Char Hydrographic Survey',
      sector: 'Kurigram – Brahmaputra Char Sector',
      asset: 'Falcon-02 UAV (LiDAR Suite)',
      type: 'SCHEDULED_PERIMETER_SWEEP',
      status: 'COMPLETED',
      durationMinutes: 120,
      coveragePct: 100.0,
      commander: 'Capt. Mahmud Hasan (22 BGB)',
      date: '2026-11-03 16:45',
      detectionsCount: 22
    },
    {
      id: 'msn-04',
      code: 'MSN-BD-2026-4389',
      title: 'Benapole Cargo Perimeter Night Thermal Interdiction',
      sector: 'Jashore – Benapole Land Port Sector',
      asset: 'Falcon-04 UAV + FLIR Mast ST-02',
      type: 'NIGHT_THERMAL_PATROL',
      status: 'COMPLETED',
      durationMinutes: 180,
      coveragePct: 99.1,
      commander: 'Senior Insp. Nazmul Huda',
      date: '2026-11-02 23:00',
      detectionsCount: 12
    }
  ];

  const filtered = missions.filter(m => {
    const matchesType = filterType === 'ALL' || m.type === filterType;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.code.toLowerCase().includes(searchQuery.toLowerCase()) || m.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="pb-12">
      <PageHeader
        category="OPERATIONS"
        categoryBn="অপারেশন ও মাঠ কার্যক্রম"
        title={language === 'BN' ? 'মিশন ও টহল কার্যক্রমের ইতিহাস' : 'Mission & Activity History – Patrol Flight Logs'}
        subtitle={language === 'BN' 
          ? 'অনুমোদিত আকাশ ও নদী টহল অধিবেশন, সেক্টর কভারেজ এবং ফ্লাইট ট্রেইল' 
          : 'Immutable operational records of authorized surveillance sorties, river sweeps, and coverage milestones'}
        statusBadge="ALL MISSIONS OFFICIALLY LOGGED"
      />

      <div className="px-6 space-y-6 max-w-7xl mx-auto">
        {/* Mission KPI Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Total Authorised Sorties</div>
            <div className="text-2xl font-bold text-[#10243A] mt-2">1,842 Missions</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">100% Sovereign Authorization</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Average Sector Coverage</div>
            <div className="text-2xl font-bold text-sky-600 mt-2">97.8%</div>
            <div className="text-[11px] text-slate-400 mt-1">Perimeter scan density</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Active Missions in Flight</div>
            <div className="text-2xl font-bold text-emerald-600 mt-2">1 In Progress</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Naf Estuary (Teknaf)</div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Incident Flags Produced</div>
            <div className="text-2xl font-bold text-indigo-600 mt-2">61 Detections</div>
            <div className="text-[11px] text-slate-400 mt-1">Past 48 hours</div>
          </div>
        </div>

        {/* Filter and Search Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search mission code or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-[#10243A] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-1.5 text-xs">
            {['ALL', 'SCHEDULED_PERIMETER_SWEEP', 'RIVERINE_INTERDICTION', 'NIGHT_THERMAL_PATROL'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filterType === t 
                    ? 'bg-[#10243A] text-white ' 
                    : 'text-slate-600  hover:bg-slate-100'
                }`}
              >
                {t.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Missions Registry Table */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-2.5">Mission Code</th>
                  <th className="p-2.5">Operation Description</th>
                  <th className="p-2.5">Assigned Asset</th>
                  <th className="p-2.5">Commander</th>
                  <th className="p-2.5">Coverage</th>
                  <th className="p-2.5">Duration</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((m) => (
                  <tr 
                    key={m.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-2.5 font-mono font-bold text-[#2386C8]">
                      {m.code}
                    </td>
                    <td className="p-2.5">
                      <div className="font-bold text-[#10243A]">{m.title}</div>
                      <div className="text-[10px] text-slate-500">{m.sector}</div>
                    </td>
                    <td className="p-2.5 font-medium">{m.asset}</td>
                    <td className="p-2.5 text-slate-600">{m.commander}</td>
                    <td className="p-2.5 font-mono font-bold text-emerald-600">{m.coveragePct}%</td>
                    <td className="p-2.5 font-mono text-slate-500">{m.durationMinutes} mins</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                        m.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {m.status}
                      </span>
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

