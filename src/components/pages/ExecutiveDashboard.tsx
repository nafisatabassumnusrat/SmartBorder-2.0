import React, { useState } from 'react';
import { 
  Radio, 
  Plane, 
  Server, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  MapPin, 
  Waves, 
  Leaf, 
  Car, 
  Ship, 
  Building2, 
  ChevronDown, 
  ArrowRight, 
  BarChart2, 
  LayoutGrid, 
  Zap, 
  FileText, 
  Settings, 
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { BangladeshSatelliteMap } from '../common/BangladeshSatelliteMap';

export const ExecutiveDashboard: React.FC = () => {
  const { language, setActiveTab } = useAppStore();
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [perfRange, setPerfRange] = useState<'7d' | '14d' | '30d'>('7d');

  // 7 Intelligence Modules for Overview Module Status panel
  const moduleStatusList = [
    { id: 'geospatial' as const, name: 'Geospatial Intelligence', nameBn: 'ভূ-স্থানিক গোয়েন্দা', icon: MapPin, status: 'Online' },
    { id: 'aerial-ai' as const, name: 'Falcon Aerial Intelligence', nameBn: 'ফ্যালকন এরিয়াল গোয়েন্দা', icon: Plane, status: 'Online' },
    { id: 'rivershift-ai' as const, name: 'RiverShift AI', nameBn: 'রিভারশিফ্ট এআই', icon: Waves, status: 'Online' },
    { id: 'ecoguard-ai' as const, name: 'EcoGuard AI', nameBn: 'ইকোগার্ড এআই', icon: Leaf, status: 'Online' },
    { id: 'borderlink-ai' as const, name: 'BorderLink AI', nameBn: 'বর্ডারলিঙ্ক এআই', icon: Radio, status: 'Online' },
    { id: 'trustplate-ai' as const, name: 'TrustPlate AI', nameBn: 'ট্রাস্টপ্লেট এআই', icon: Car, status: 'Online' },
    { id: 'falcon-boat' as const, name: 'Falcon Boat', nameBn: 'ফ্যালকন বোট', icon: Ship, status: 'Online' },
  ];

  // 5 Specific Timeline Activities from Reference Image 2
  const recentActivities = [
    {
      time: '09:20 AM',
      dotColor: 'bg-[#D9363E]',
      text: 'New alert: Unauthorized movement detected in Sector-12',
      textBn: 'নতুন সতর্কতা: সেক্টর-১২ এ অননুমোদিত গতিবিধি চিহ্নিত হয়েছে',
      badge: 'High',
      badgeClass: 'bg-red-50 text-[#D9363E] border border-red-200',
      actionTab: 'event-alerts' as const
    },
    {
      time: '09:17 AM',
      dotColor: 'bg-[#159B69]',
      text: 'Drone data processing completed (Area: Kurigram)',
      textBn: 'ড্রোন ডেটা প্রক্রিয়াকরণ সম্পন্ন হয়েছে (এলাকা: কুড়িগ্রাম)',
      badge: 'Info',
      badgeClass: 'bg-blue-50 text-[#1479C9] border border-blue-200',
      actionTab: 'aerial-ai' as const
    },
    {
      time: '09:14 AM',
      dotColor: 'bg-[#1479C9]',
      text: 'River change analysis updated (Jamuna Region)',
      textBn: 'নদীর গতিপথ পরিবর্তনের বিশ্লেষণ হালনাগাদ (যমুনা অঞ্চল)',
      badge: 'Info',
      badgeClass: 'bg-blue-50 text-[#1479C9] border border-blue-200',
      actionTab: 'rivershift-ai' as const
    },
    {
      time: '09:11 AM',
      dotColor: 'bg-[#F39A24]',
      text: 'Human verification pending (12 cases)',
      textBn: 'মানব যাচাইকরণ অপেক্ষমাণ (১২টি কেস)',
      badge: 'Action',
      badgeClass: 'bg-amber-50 text-[#F39A24] border border-amber-200',
      actionTab: 'human-verification' as const
    },
    {
      time: '09:08 AM',
      dotColor: 'bg-[#159B69]',
      text: 'New data received from EcoGuard AI',
      textBn: 'ইকোগার্ড এআই থেকে নতুন তথ্য প্রাপ্ত হয়েছে',
      badge: 'Success',
      badgeClass: 'bg-emerald-50 text-[#159B69] border border-emerald-200',
      actionTab: 'ecoguard-ai' as const
    }
  ];

  // Performance data for the last seven days
  const performanceData = [
    { date: 'Oct 28', processing: 88, accuracy: 87, uptime: 86 },
    { date: 'Oct 29', processing: 91, accuracy: 92, uptime: 90 },
    { date: 'Oct 30', processing: 90, accuracy: 94, uptime: 91 },
    { date: 'Nov 1', processing: 96, accuracy: 92, uptime: 93 },
    { date: 'Nov 2', processing: 97, accuracy: 94, uptime: 94 },
    { date: 'Nov 3', processing: 95, accuracy: 97, uptime: 96 }
  ];

  return (
    <div className="min-h-full bg-[#F2F6FC] text-[#17324F] p-4 md:p-6 space-y-4 max-w-[1720px] mx-auto select-none font-sans">
      
      {/* ========================================================
          5. KPI CARDS (6 Separate White Cards with Soft Shadows)
         ======================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* 1. Active Data Sources — 12 / 14 */}
        <div className="bg-white rounded-xl p-3.5 md:p-4 border border-[#E2EAF3] shadow-xs flex items-center space-x-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-full bg-[#082B4C] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Radio className="w-5 h-5 text-[#21B8D5]" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-[#718096] font-medium truncate">
              {language === 'BN' ? 'সক্রিয় ডেটা সোর্স' : 'Active Data Sources'}
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-bold text-[#17324F] tracking-tight">
                12 / 14
              </span>
              <span className="text-xs font-semibold text-[#159B69] flex items-center">
                ↑ +1
              </span>
            </div>
          </div>
        </div>

        {/* 2. Active Drones — 8 / 10 */}
        <div className="bg-white rounded-xl p-3.5 md:p-4 border border-[#E2EAF3] shadow-xs flex items-center space-x-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-full bg-[#159B69] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Plane className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-[#718096] font-medium truncate">
              {language === 'BN' ? 'সক্রিয় ড্রোন' : 'Active Drones'}
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-bold text-[#17324F] tracking-tight">
                8 / 10
              </span>
              <span className="text-xs font-semibold text-[#159B69] flex items-center">
                ↑ +1
              </span>
            </div>
          </div>
        </div>

        {/* 3. Processing Tasks — 24 */}
        <div className="bg-white rounded-xl p-3.5 md:p-4 border border-[#E2EAF3] shadow-xs flex items-center space-x-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-full bg-[#082B4C] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Server className="w-5 h-5 text-[#21B8D5]" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-[#718096] font-medium truncate">
              {language === 'BN' ? 'প্রসেসিং টাস্ক' : 'Processing Tasks'}
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-bold text-[#17324F] tracking-tight">
                24
              </span>
              <span className="text-xs font-semibold text-[#1479C9] flex items-center">
                ↓ -3
              </span>
            </div>
          </div>
        </div>

        {/* 4. Pending Verification — 17 */}
        <div 
          onClick={() => setActiveTab('human-verification')}
          className="bg-white rounded-xl p-3.5 md:p-4 border border-[#E2EAF3] shadow-xs flex items-center space-x-3.5 hover:shadow-sm transition-shadow cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-[#F39A24] text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-[#718096] font-medium truncate">
              {language === 'BN' ? 'যাচাইকরণ অপেক্ষমাণ' : 'Pending Verification'}
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-bold text-[#17324F] tracking-tight">
                17
              </span>
              <span className="text-xs font-semibold text-[#718096] flex items-center">
                → 0
              </span>
            </div>
          </div>
        </div>

        {/* 5. Offline Devices — 2 */}
        <div 
          onClick={() => setActiveTab('devices-sensors')}
          className="bg-white rounded-xl p-3.5 md:p-4 border border-[#E2EAF3] shadow-xs flex items-center space-x-3.5 hover:shadow-sm transition-shadow cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-[#D9363E] text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-[#718096] font-medium truncate">
              {language === 'BN' ? 'অফলাইন ডিভাইস' : 'Offline Devices'}
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-bold text-[#17324F] tracking-tight">
                2
              </span>
              <span className="text-xs font-semibold text-[#1479C9] flex items-center">
                ↓ -1
              </span>
            </div>
          </div>
        </div>

        {/* 6. System Health — 98.5% */}
        <div className="bg-white rounded-xl p-3.5 md:p-4 border border-[#E2EAF3] shadow-xs flex items-center space-x-3.5 hover:shadow-sm transition-shadow">
          <div className="w-11 h-11 rounded-full bg-[#159B69] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Activity className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-[#718096] font-medium truncate">
              {language === 'BN' ? 'সিস্টেম স্বাস্থ্য' : 'System Health'}
            </div>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-xl md:text-2xl font-bold text-[#17324F] tracking-tight">
                98.5%
              </span>
              <span className="text-[#159B69] text-base leading-none">
                ●
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================
          6 & 7. BANGLADESH INTELLIGENCE OVERVIEW & RECENT ACTIVITIES
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* 6. BANGLADESH INTELLIGENCE OVERVIEW (Occupies 8 Cols on LG) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E2EAF3] shadow-xs overflow-hidden flex flex-col">
          
          {/* Light Header Bar with Deep-Blue Section Heading */}
          <div className="bg-[#F8FAFC] border-b border-[#E2EAF3] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <Building2 className="w-4 h-4 text-[#1479C9]" />
              <h2 className="text-sm font-bold text-[#082B4C] tracking-tight">
                {language === 'BN' ? 'বাংলাদেশ ইন্টেলিজেন্স ওভারভিউ' : 'Bangladesh Intelligence Overview'}
              </h2>
            </div>
            <div className="relative">
              <button className="inline-flex items-center space-x-1.5 text-xs text-[#17324F] bg-white border border-[#E2EAF3] hover:bg-slate-50 px-2.5 py-1 rounded shadow-2xs font-medium transition-colors">
                <span>{language === 'BN' ? 'বিগত ২৪ ঘণ্টা' : 'Last 24 Hours'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#718096]" />
              </button>
            </div>
          </div>

          {/* Body: Map on Left (~65%) + Module Status on Right (~35%) */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[380px] lg:min-h-[420px]">
            
            {/* Real Bangladesh Satellite Map (65% width) */}
            <div className="w-full md:w-[65%] bg-[#071D33] relative border-b md:border-b-0 md:border-r border-[#E2EAF3] overflow-hidden shrink-0">
              <BangladeshSatelliteMap />
            </div>

            {/* Module Status Panel (35% width) */}
            <div className="w-full md:w-[35%] p-4 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E2EAF3]">
                  <h3 className="text-sm font-bold text-[#082B4C]">
                    {language === 'BN' ? 'মডিউল স্ট্যাটাস' : 'Module Status'}
                  </h3>
                  <button 
                    onClick={() => setActiveTab('geospatial')}
                    className="text-xs text-[#1479C9] hover:underline flex items-center space-x-0.5 font-semibold"
                  >
                    <span>{language === 'BN' ? 'সকল দেখুন' : 'View All'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 7 Intelligence Modules Status List */}
                <div className="mt-2.5 space-y-2">
                  {moduleStatusList.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#F4F7FB] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon className="w-4 h-4 text-[#1479C9] group-hover:scale-110 transition-transform shrink-0" />
                          <span className="text-xs font-semibold text-[#17324F] group-hover:text-[#1479C9] transition-colors truncate">
                            {language === 'BN' ? item.nameBn : item.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs font-medium text-[#159B69] shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#159B69] animate-pulse" />
                          <span>{item.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2EAF3] text-[11px] text-[#718096] flex items-center justify-between">
                <span>All 7 Intelligence Engines Active</span>
                <span className="font-mono text-[#159B69] font-bold">100% HEALTH</span>
              </div>
            </div>

          </div>

        </div>

        {/* 7. RECENT ACTIVITIES PANEL (Occupies 4 Cols on LG) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E2EAF3] shadow-xs overflow-hidden flex flex-col">
          
          {/* Light Header Bar with Deep-Blue Section Heading */}
          <div className="bg-[#F8FAFC] border-b border-[#E2EAF3] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <Activity className="w-4 h-4 text-[#1479C9]" />
              <h2 className="text-sm font-bold text-[#082B4C] tracking-tight">
                {language === 'BN' ? 'সাম্প্রতিক কার্যক্রম' : 'Recent Activities'}
              </h2>
            </div>
            <button 
              onClick={() => setActiveTab('event-alerts')}
              className="text-xs text-[#1479C9] font-semibold hover:underline flex items-center space-x-0.5"
            >
              <span>{language === 'BN' ? 'সকল দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Activity Timeline List on Clean White Background */}
          <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
            {recentActivities.map((act, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveTab(act.actionTab)}
                className="flex items-start space-x-3 p-1.5 rounded-lg hover:bg-[#F4F7FB] transition-colors cursor-pointer group"
              >
                {/* Timestamp & Colored Timeline Indicator */}
                <div className="flex items-center space-x-2 shrink-0 pt-0.5">
                  <span className={`w-2 h-2 rounded-full ${act.dotColor} shrink-0`} />
                  <span className="text-[11px] font-mono text-[#718096]">
                    {act.time}
                  </span>
                </div>

                {/* Dark Readable Activity Description */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#17324F] line-clamp-2 leading-relaxed group-hover:text-[#1479C9] transition-colors">
                    {language === 'BN' ? act.textBn : act.text}
                  </p>
                </div>

                {/* Colored Status Badge */}
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${act.badgeClass}`}>
                  {act.badge}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ========================================================
          8. BOTTOM DASHBOARD SECTIONS (A, B, C, D)
         ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">

        {/* 8.A System Performance (LG: 3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-4 border border-[#E2EAF3] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E2EAF3]">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-[#1479C9]" />
                <h3 className="text-xs md:text-sm font-bold text-[#082B4C]">
                  {language === 'BN' ? 'সিস্টেম পারফরম্যান্স' : 'System Performance'}
                </h3>
              </div>
              <button className="text-[11px] text-[#718096] hover:text-[#17324F] flex items-center space-x-0.5 font-medium">
                <span>{language === 'BN' ? 'বিগত ৭ দিন' : 'Last 7 Days'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Three Distinguishable Legend Series: Blue, Green, Navy */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-[#718096]">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-xs bg-[#1479C9]" />
                <span>{language === 'BN' ? 'ডেটা প্রসেসিং' : 'Data Processing'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-xs bg-[#159B69]" />
                <span>{language === 'BN' ? 'নির্ভুলতা' : 'Analysis Accuracy'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-xs bg-[#082B4C]" />
                <span>{language === 'BN' ? 'আপটাইম' : 'System Uptime'}</span>
              </div>
            </div>

            {/* Grouped Bar Chart with Percentage Y-Axis & Date X-Axis */}
            <div className="mt-3 flex">
              {/* Y-axis labels */}
              <div className="w-7 flex flex-col justify-between text-[9px] font-mono text-[#718096] pr-1 py-1 text-right shrink-0 h-32">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Chart Bars Canvas with light grid */}
              <div className="flex-1 h-32 flex items-end justify-between px-1 border-b border-[#E2EAF3] relative">
                <div className="absolute inset-x-0 top-0 border-t border-slate-100 pointer-events-none" />
                <div className="absolute inset-x-0 top-1/4 border-t border-slate-100 pointer-events-none" />
                <div className="absolute inset-x-0 top-2/4 border-t border-slate-100 pointer-events-none" />
                <div className="absolute inset-x-0 top-3/4 border-t border-slate-100 pointer-events-none" />

                {performanceData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center space-y-1 z-10">
                    <div className="flex items-end space-x-0.5 h-24">
                      {/* Blue bar: Data Processing (#1479C9) */}
                      <div 
                        style={{ height: `${d.processing}%` }}
                        className="w-1.5 bg-[#1479C9] rounded-t-xs hover:opacity-85 transition-all cursor-pointer"
                        title={`Data Processing: ${d.processing}%`}
                      />
                      {/* Green bar: Analysis Accuracy (#159B69) */}
                      <div 
                        style={{ height: `${d.accuracy}%` }}
                        className="w-1.5 bg-[#159B69] rounded-t-xs hover:opacity-85 transition-all cursor-pointer"
                        title={`Analysis Accuracy: ${d.accuracy}%`}
                      />
                      {/* Navy bar: System Uptime (#082B4C) */}
                      <div 
                        style={{ height: `${d.uptime}%` }}
                        className="w-1.5 bg-[#082B4C] rounded-t-xs hover:opacity-85 transition-all cursor-pointer"
                        title={`System Uptime: ${d.uptime}%`}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-[#718096]">
                      {d.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-[#718096] font-mono text-center">
            Avg Uptime: 99.4% · Zero Latency Spike
          </div>
        </div>

        {/* 8.B Intelligence Modules Grid (LG: 3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-4 border border-[#E2EAF3] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-2 border-b border-[#E2EAF3]">
              <LayoutGrid className="w-4 h-4 text-[#1479C9]" />
              <h3 className="text-xs md:text-sm font-bold text-[#082B4C]">
                {language === 'BN' ? 'ইন্টেলিজেন্স মডিউল' : 'Intelligence Modules'}
              </h3>
            </div>

            {/* Seven Module Cards Grid on Light-Gray/Pale-Blue Background */}
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              <button
                onClick={() => setActiveTab('geospatial')}
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2EAF3] hover:border-[#1479C9] hover:bg-blue-50/50 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all group"
              >
                <MapPin className="w-4 h-4 text-[#1479C9] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-[#17324F] mt-1 line-clamp-2 leading-tight">
                  {language === 'BN' ? 'ভূ-স্থানিক' : 'Geospatial Intelligence'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('aerial-ai')}
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2EAF3] hover:border-[#1479C9] hover:bg-blue-50/50 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all group"
              >
                <Plane className="w-4 h-4 text-[#1479C9] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-[#17324F] mt-1 line-clamp-2 leading-tight">
                  {language === 'BN' ? 'ফ্যালকন এরিয়াল' : 'Falcon Aerial Intelligence'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('rivershift-ai')}
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2EAF3] hover:border-[#1479C9] hover:bg-blue-50/50 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all group"
              >
                <Waves className="w-4 h-4 text-[#1479C9] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-[#17324F] mt-1 line-clamp-2 leading-tight">
                  {language === 'BN' ? 'রিভারশিফ্ট' : 'RiverShift AI'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('ecoguard-ai')}
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2EAF3] hover:border-[#1479C9] hover:bg-blue-50/50 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all group"
              >
                <Leaf className="w-4 h-4 text-[#159B69] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-[#17324F] mt-1 line-clamp-2 leading-tight">
                  {language === 'BN' ? 'ইকোগার্ড' : 'EcoGuard AI'}
                </span>
              </button>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveTab('borderlink-ai')}
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2EAF3] hover:border-[#1479C9] hover:bg-blue-50/50 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all group"
              >
                <Radio className="w-4 h-4 text-[#1479C9] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-[#17324F] mt-1 line-clamp-2 leading-tight">
                  {language === 'BN' ? 'বর্ডারলিঙ্ক' : 'BorderLink AI'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('trustplate-ai')}
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2EAF3] hover:border-[#1479C9] hover:bg-blue-50/50 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all group"
              >
                <Car className="w-4 h-4 text-[#1479C9] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-[#17324F] mt-1 line-clamp-2 leading-tight">
                  {language === 'BN' ? 'ট্রাস্টপ্লেট' : 'TrustPlate AI'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('falcon-boat')}
                className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2EAF3] hover:border-[#1479C9] hover:bg-blue-50/50 hover:shadow-xs flex flex-col items-center justify-center text-center transition-all group"
              >
                <Ship className="w-4 h-4 text-[#1479C9] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-[#17324F] mt-1 line-clamp-2 leading-tight">
                  {language === 'BN' ? 'ফ্যালকন বোট' : 'Falcon Boat'}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-[#718096] font-mono text-center">
            Click any module to open command interface
          </div>
        </div>

        {/* 8.C Drone Surveillance Flight Scenario Card (LG: 3 Cols) */}
        <div 
          onClick={() => setActiveTab('aerial-ai')}
          className="lg:col-span-3 rounded-xl overflow-hidden border border-[#E2EAF3] shadow-xs relative group h-48 md:h-auto min-h-[190px] bg-[#07192C] cursor-pointer"
          title="Click to open Falcon Aerial Intelligence Console"
        >
          {/* Atmospheric Aerial River Delta & Sky Photograph */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80")`,
              filter: 'brightness(0.85) contrast(1.15)'
            }}
          />

          {/* Deep Navy to Sky Atmospheric Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06182B]/95 via-[#0A2540]/40 to-transparent pointer-events-none" />

          {/* SVG Canvas: Flying Falcon Surveillance UAV with Scan Beam & HUD */}
          <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <defs>
              {/* Scan Beam Gradient from Gimbal to Ground */}
              <linearGradient id="droneScanBeam" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#21B8D5" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#21B8D5" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.05" />
              </linearGradient>

              {/* Glowing Sensor Glow */}
              <filter id="sensorGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Tactical Scanning Cone Projecting Downward */}
            <polygon 
              points="250,75 140,230 360,230" 
              fill="url(#droneScanBeam)" 
            />

            {/* Ground Surveillance Target Sweep Rings */}
            <ellipse cx="250" cy="225" rx="75" ry="12" fill="none" stroke="#21B8D5" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
            <ellipse cx="250" cy="225" rx="45" ry="7" fill="#21B8D5" fillOpacity="0.15" stroke="#00FFFF" strokeWidth="1" />
            
            {/* Target Crosshair on Ground */}
            <circle cx="250" cy="225" r="4" fill="#00FFFF" />
            <line x1="240" y1="225" x2="260" y2="225" stroke="#00FFFF" strokeWidth="1" />
            <line x1="250" y1="219" x2="250" y2="231" stroke="#00FFFF" strokeWidth="1" />

            {/* Tactical HUD Telemetry in Top-Right */}
            <g transform="translate(240, 18)" opacity="0.9">
              <rect x="0" y="0" width="150" height="42" rx="6" fill="#082B4C" fillOpacity="0.75" stroke="#21B8D5" strokeWidth="0.8" />
              <circle cx="12" cy="14" r="3.5" fill="#159B69" className="animate-pulse" />
              <text x="22" y="17" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">UAV-01 PATROL</text>
              <text x="12" y="32" fill="#21B8D5" fontSize="8" fontWeight="bold" fontFamily="monospace">ALT 1,420 FT · 62 KM/H</text>
            </g>

            {/* ========================================================
                FALCON TACTICAL DRONE (Airframe, Rotors, Gimbal)
               ======================================================== */}
            <g transform="translate(250, 70) scale(0.95)">
              
              {/* Drone Shadow / Depth */}
              <ellipse cx="0" cy="18" rx="45" ry="6" fill="#000000" opacity="0.3" filter="blur(4px)" />

              {/* 4 Carbon-Fiber Rotor Arms */}
              <line x1="-42" y1="-14" x2="42" y2="14" stroke="#082B4C" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="-42" y1="14" x2="42" y2="-14" stroke="#082B4C" strokeWidth="4.5" strokeLinecap="round" />

              {/* Motor Pods */}
              <circle cx="-42" cy="-14" r="5" fill="#0F172A" stroke="#21B8D5" strokeWidth="1.2" />
              <circle cx="42" cy="-14" r="5" fill="#0F172A" stroke="#21B8D5" strokeWidth="1.2" />
              <circle cx="-42" cy="14" r="5" fill="#0F172A" stroke="#21B8D5" strokeWidth="1.2" />
              <circle cx="42" cy="14" r="5" fill="#0F172A" stroke="#21B8D5" strokeWidth="1.2" />

              {/* Spinning Propeller Blur Discs */}
              <ellipse cx="-42" cy="-14" rx="26" ry="6" fill="#FFFFFF" fillOpacity="0.25" stroke="#21B8D5" strokeWidth="0.8" strokeDasharray="3 2" />
              <ellipse cx="42" cy="-14" rx="26" ry="6" fill="#FFFFFF" fillOpacity="0.25" stroke="#21B8D5" strokeWidth="0.8" strokeDasharray="3 2" />
              <ellipse cx="-42" cy="14" rx="26" ry="6" fill="#FFFFFF" fillOpacity="0.25" stroke="#21B8D5" strokeWidth="0.8" strokeDasharray="3 2" />
              <ellipse cx="42" cy="14" rx="26" ry="6" fill="#FFFFFF" fillOpacity="0.25" stroke="#21B8D5" strokeWidth="0.8" strokeDasharray="3 2" />

              {/* Navigation Strobe Lights */}
              <circle cx="-42" cy="14" r="2.5" fill="#EF4444" />
              <circle cx="42" cy="14" r="2.5" fill="#10B981" />
              <circle cx="0" cy="-18" r="2" fill="#38BDF8" />

              {/* Main Drone Aerodynamic Fuselage Body */}
              <path 
                d="M -22,-6 L -14,-14 L 14,-14 L 22,-6 L 16,10 L -16,10 Z" 
                fill="#0B233C" 
                stroke="#FFFFFF" 
                strokeWidth="1.5" 
              />
              <path 
                d="M -12,-8 L 0,-14 L 12,-8 L 8,4 L -8,4 Z" 
                fill="#1479C9" 
              />

              {/* Bangladesh Flag Insignia on Drone Top Plate */}
              <rect x="-6" y="-8" width="12" height="7" fill="#006A4E" rx="1" />
              <circle cx="0" cy="-4.5" r="2" fill="#F42A41" />

              {/* Optical / Thermal Gimbal Camera Turret */}
              <circle cx="0" cy="6" r="6.5" fill="#082B4C" stroke="#21B8D5" strokeWidth="1.5" />
              <circle cx="0" cy="7" r="3.5" fill="#00FFFF" filter="url(#sensorGlow)" />
            </g>
          </svg>

          {/* Dark Overlay Box at Bottom-Left: "A Smarter Border | A Stronger Bangladesh" */}
          <div className="absolute bottom-3 left-3 bg-[#082B4C]/85 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-white/15 text-white shadow-lg z-20">
            <div className="text-xs font-serif font-bold tracking-wide">
              {language === 'BN' ? 'একটি স্মার্ট সীমান্ত' : 'A Smarter Border'}
            </div>
            <div className="text-xs font-serif font-bold tracking-wide text-[#21B8D5]">
              {language === 'BN' ? 'একটি শক্তিশালী বাংলাদেশ' : 'A Stronger Bangladesh'}
            </div>
          </div>
        </div>

        {/* 8.D Quick Access (LG: 3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl p-4 border border-[#E2EAF3] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-2 border-b border-[#E2EAF3]">
              <Zap className="w-4 h-4 text-[#1479C9]" />
              <h3 className="text-xs md:text-sm font-bold text-[#082B4C]">
                {language === 'BN' ? 'কুইক অ্যাক্সেস' : 'Quick Access'}
              </h3>
            </div>

            {/* 5 Dedicated Quick Access Rows */}
            <div className="mt-2.5 space-y-1">
              <button
                onClick={() => setActiveTab('geospatial')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F4F7FB] transition-colors group text-left border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-[#718096] group-hover:text-[#1479C9] transition-colors shrink-0" />
                  <span className="text-xs font-medium text-[#17324F] group-hover:text-[#1479C9] transition-colors">
                    {language === 'BN' ? 'বাংলাদেশ মানচিত্র দেখুন' : 'View Bangladesh Map'}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#718096] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              <button
                onClick={() => setActiveTab('event-alerts')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F4F7FB] transition-colors group text-left border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="w-4 h-4 text-[#718096] group-hover:text-[#1479C9] transition-colors shrink-0" />
                  <span className="text-xs font-medium text-[#17324F] group-hover:text-[#1479C9] transition-colors">
                    {language === 'BN' ? 'অ্যালার্ট পরীক্ষা করুন' : 'Check Alerts'}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#718096] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              <button
                onClick={() => setActiveTab('analytics-reports')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F4F7FB] transition-colors group text-left border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-[#718096] group-hover:text-[#1479C9] transition-colors shrink-0" />
                  <span className="text-xs font-medium text-[#17324F] group-hover:text-[#1479C9] transition-colors">
                    {language === 'BN' ? 'প্রতিবেদন তৈরি করুন' : 'Generate Report'}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#718096] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              <button
                onClick={() => setActiveTab('human-verification')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F4F7FB] transition-colors group text-left border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-4 h-4 text-[#718096] group-hover:text-[#1479C9] transition-colors shrink-0" />
                  <span className="text-xs font-medium text-[#17324F] group-hover:text-[#1479C9] transition-colors">
                    {language === 'BN' ? 'যাচাইকরণ কিউ' : 'Verification Queue'}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#718096] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              <button
                onClick={() => setActiveTab('system-settings')}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F4F7FB] transition-colors group text-left"
              >
                <div className="flex items-center space-x-3">
                  <Settings className="w-4 h-4 text-[#718096] group-hover:text-[#1479C9] transition-colors shrink-0" />
                  <span className="text-xs font-medium text-[#17324F] group-hover:text-[#1479C9] transition-colors">
                    {language === 'BN' ? 'সিস্টেম সেটিংস' : 'System Settings'}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#718096] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-[#718096] font-mono text-center">
            Prime Minister Demonstration Mode
          </div>
        </div>

      </div>

    </div>
  );
};

export default ExecutiveDashboard;
