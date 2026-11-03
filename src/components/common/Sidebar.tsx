import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Plane,
  Waves,
  Leaf,
  Radio,
  Car,
  Anchor,
  Layers,
  Database,
  FileBarChart,
  Bell,
  UserCheck,
  History,
  Cpu,
  Users,
  ShieldCheck,
  Settings,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { AppTab } from '../../types';
import { BangladeshEmblemSvg } from './BangladeshEmblemSvg';
import { MartyrsMemorialSvg } from './MartyrsMemorialSvg';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, language } = useAppStore();

  const isExecutiveDashboard = activeTab === 'executive-dashboard' || activeTab === 'command-center';

  const isTabActive = (tabId: AppTab | string, aliases: string[] = []) => {
    return activeTab === tabId || aliases.includes(activeTab);
  };

  return (
    <aside className="w-64 bg-[#062744] text-slate-300 flex flex-col justify-between shrink-0 select-none border-r border-[#0D365C] relative overflow-hidden z-30 transition-all duration-300">
      <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
        {/* Top Header Identity */}
        <div className="p-4 flex items-center space-x-3 border-b border-[#0D365C]/80 bg-[#05213B]/60">
          <BangladeshEmblemSvg className="w-9 h-9 shrink-0 drop-shadow-md" />
          <div className="leading-tight min-w-0">
            <h1 className="text-base font-bold text-white tracking-tight flex items-center space-x-1">
              <span>SmartBorder</span>
              <span className="text-[#21B8D5]">2.0</span>
            </h1>
            <div className="text-xs text-slate-200 font-semibold tracking-wide">Falcon Bots</div>
            <div className="text-[10px] text-slate-400 font-mono tracking-tight truncate">
              Unified Intelligence Control Panel
            </div>
          </div>
        </div>

        {/* Executive Dashboard Active Button */}
        <div className="p-3 pb-1">
          <button
            onClick={() => setActiveTab('executive-dashboard')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
              isExecutiveDashboard
                ? 'bg-[#1479C9] text-white shadow-md'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">
              {language === 'BN' ? 'নির্বাহী ড্যাশবোর্ড' : 'Executive Dashboard'}
            </span>
          </button>
        </div>

        {/* Section 1: INTELLIGENCE */}
        <div className="px-3 py-2 space-y-1">
          <div className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">
            {language === 'BN' ? 'গোয়েন্দা মডিউল' : 'INTELLIGENCE'}
          </div>

          <button
            onClick={() => setActiveTab('geospatial')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('geospatial', ['gis'])
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 truncate">
              <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">Geospatial Intelligence</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab('aerial-ai')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('aerial-ai', ['monitoring'])
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 truncate">
              <Plane className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">Falcon Aerial Intelligence</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab('rivershift-ai')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('rivershift-ai')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 truncate">
              <Waves className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">RiverShift AI</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab('ecoguard-ai')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('ecoguard-ai', ['ai-intelligence'])
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 truncate">
              <Leaf className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">EcoGuard AI</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab('borderlink-ai')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('borderlink-ai')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 truncate">
              <Radio className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">BorderLink AI</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab('trustplate-ai')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('trustplate-ai')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 truncate">
              <Car className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">TrustPlate AI</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab('falcon-boat')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('falcon-boat')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 truncate">
              <Anchor className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">Falcon Boat</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>
        </div>

        {/* Section 2: DATA & ANALYTICS */}
        <div className="px-3 py-2 space-y-1">
          <div className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">
            {language === 'BN' ? 'ডেটা ও অ্যানালিটিক্স' : 'DATA & ANALYTICS'}
          </div>

          <button
            onClick={() => setActiveTab('data-fusion')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('data-fusion')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Data Fusion Center</span>
          </button>

          <button
            onClick={() => setActiveTab('data-management')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('data-management')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Data Management</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics-reports')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('analytics-reports', ['reports'])
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <FileBarChart className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Analytics & Reports</span>
          </button>
        </div>

        {/* Section 3: OPERATIONS */}
        <div className="px-3 py-2 space-y-1">
          <div className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">
            {language === 'BN' ? 'অপারেশনস' : 'OPERATIONS'}
          </div>

          <button
            onClick={() => setActiveTab('event-alerts')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('event-alerts', ['alerts'])
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 truncate">
              <Bell className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">Event & Alert Center</span>
            </div>
            <span className="w-4 h-4 rounded-full bg-[#D9363E] text-[10px] font-bold text-white flex items-center justify-center shrink-0">
              3
            </span>
          </button>

          <button
            onClick={() => setActiveTab('human-verification')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('human-verification', ['incidents'])
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Human Verification Center</span>
          </button>

          <button
            onClick={() => setActiveTab('mission-history')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('mission-history')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <History className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Mission & Activity History</span>
          </button>

          <button
            onClick={() => setActiveTab('devices-sensors')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('devices-sensors')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Device & Sensor Management</span>
          </button>
        </div>

        {/* Section 4: ADMINISTRATION */}
        <div className="px-3 py-2 space-y-1">
          <div className="px-3 py-1 text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">
            {language === 'BN' ? 'প্রশাসন' : 'ADMINISTRATION'}
          </div>

          <button
            onClick={() => setActiveTab('user-roles')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('user-roles')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">User & Role Management</span>
          </button>

          <button
            onClick={() => setActiveTab('security-audit')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('security-audit')
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Security & Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('system-settings')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isTabActive('system-settings', ['admin'])
                ? 'bg-[#1479C9] text-white font-bold'
                : 'text-slate-300 hover:bg-[#0B355B] hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">System Settings</span>
          </button>
        </div>
      </div>

      {/* Bottom Architectural Monument Silhouette (Jatiya Smriti Soudho) */}
      <div className="pt-2 border-t border-[#0D365C] bg-[#051D33] shrink-0">
        <MartyrsMemorialSvg className="w-full h-16 opacity-90 hover:opacity-100 transition-opacity" />
      </div>
    </aside>
  );
};
