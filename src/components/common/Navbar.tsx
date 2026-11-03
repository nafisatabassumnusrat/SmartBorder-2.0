import React, { useEffect, useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  RotateCcw, 
  CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { UserRole } from '../../types';
import { settingsService } from '../../services/settingsService';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    toggleNotification, 
    bumpDataRevision, 
    addToast 
  } = useAppStore();

  const [currentTime, setCurrentTime] = useState<string>('Nov 3, 2026 09:24:17 AM');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: "Nov 3, 2026 09:24:17 AM"
      const datePart = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Dhaka',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const timePart = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(`${datePart}  ${timePart}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const rolesList: { role: UserRole; title: string; desc: string }[] = [
    { role: 'Super Admin', title: 'Dr. Ahmed Rahman', desc: 'Super Admin (Directorate General)' },
    { role: 'Executive Viewer', title: 'Cmdr. Farhana Yasmin', desc: 'Executive Viewer (PMO Liaison)' },
    { role: 'Intelligence Analyst', title: 'Major Rafiqul Islam', desc: 'Intelligence Analyst (BGB Intel)' },
    { role: 'Verification Officer', title: 'Sr. Insp. Nazmul Huda', desc: 'Verification Officer (Customs/BGB)' },
    { role: 'Module Operator', title: 'Lt. Cmdr. Tanvir Ahmed', desc: 'Module Operator (Coast Guard)' },
    { role: 'System Administrator', title: 'Engr. Shamima Akhter', desc: 'System Administrator (Survey of BD)' },
    { role: 'Auditor', title: 'Dr. Mahmudul Hasan', desc: 'Auditor (Digital Security Agency)' }
  ];

  const handleRoleSelect = async (role: UserRole) => {
    await switchRole(role);
    setIsRoleDropdownOpen(false);
  };

  const handleResetFactory = async () => {
    if (window.confirm('Reset all demo fixtures, vehicle OCR scans, and alerts back to baseline factory state?')) {
      setIsResetting(true);
      try {
        await settingsService.resetDemoData();
        bumpDataRevision();
        addToast({
          type: 'SUCCESS',
          title: 'Demo Data Restored',
          message: 'All records and reviewer decisions restored to factory state.'
        });
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#E2EAF3] flex items-center justify-between px-6 sticky top-0 z-40 select-none shadow-xs relative overflow-hidden shrink-0">
      {/* Subtle Bangladesh-Inspired Horizon Landscape Texture in Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-right-bottom bg-repeat-x bg-contain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 64' fill='%23082B4C'%3E%3Cpath d='M0,48 Q150,22 300,45 T600,32 T900,48 T1200,38 L1200,64 L0,64 Z'/%3E%3Ccircle cx='80' cy='30' r='18' opacity='0.3'/%3E%3Ccircle cx='95' cy='35' r='14' opacity='0.3'/%3E%3Ccircle cx='680' cy='26' r='16' opacity='0.3'/%3E%3C/svg%3E")`
        }}
      />

      {/* Left: Bangladesh Flag & National Tagline */}
      <div className="flex items-center space-x-3.5 relative z-10">
        {/* Authentic Bangladesh Flag SVG */}
        <div className="w-7 h-4.5 rounded-xs overflow-hidden shadow-xs border border-slate-200 relative shrink-0">
          <svg viewBox="0 0 500 300" className="w-full h-full">
            <rect width="500" height="300" fill="#006A4E" />
            <circle cx="225" cy="150" r="100" fill="#F42A41" />
          </svg>
        </div>

        <span className="text-sm font-serif italic text-[#172B45] tracking-wide font-medium hidden sm:inline">
          Secure Borders. A Safer Bangladesh.
        </span>
      </div>

      {/* Right: Operational Status, Notification Bell, User Profile */}
      <div className="flex items-center space-x-5 md:space-x-6 relative z-10">
        {/* System Online with Green Status Dot and Live Clock */}
        <div className="flex items-center space-x-2 text-right">
          <span className="w-2.5 h-2.5 rounded-full bg-[#159B69] shrink-0 animate-pulse" />
          <div className="text-left">
            <div className="text-xs font-bold text-[#172B45] leading-tight">
              System Online
            </div>
            <div className="text-[11px] font-mono text-[#6B7D93]">
              {currentTime}
            </div>
          </div>
        </div>

        {/* Notification Bell with Badge '3' */}
        <button
          onClick={toggleNotification}
          className="relative p-2 rounded-full hover:bg-slate-100 text-[#172B45] transition-colors"
          title="Alert Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D9363E] text-[9px] font-bold text-white shadow-xs">
            3
          </span>
        </button>

        {/* User Profile: Dr. Ahmed Rahman / Super Admin + Dropdown Indicator */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center space-x-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-9 h-9 rounded-full object-cover border border-slate-300 shadow-xs" 
            />
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-[#172B45] leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[11px] text-[#6B7D93]">
                {currentUser.role}
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#6B7D93] shrink-0" />
          </button>

          {/* Role Switcher Dropdown (RBAC Simulation) */}
          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-[#E2EAF3] shadow-xl py-2 z-50 text-[#172B45]">
              <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-mono uppercase tracking-wider text-[#6B7D93] font-bold">
                Switch Role (RBAC Simulation)
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleRoleSelect(item.role)}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      currentUser.role === item.role ? 'bg-blue-50 text-[#1479C9] font-semibold' : ''
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#172B45]">{item.title}</div>
                      <div className="text-[10px] text-[#6B7D93]">{item.desc}</div>
                    </div>
                    {currentUser.role === item.role && (
                      <CheckCircle2 className="w-4 h-4 text-[#1479C9]" />
                    )}
                  </button>
                ))}
              </div>
              <div className="pt-2 px-3 border-t border-slate-100">
                <button
                  onClick={handleResetFactory}
                  disabled={isResetting}
                  className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-[11px] text-[#D9363E] hover:text-white hover:bg-[#D9363E] rounded-md transition-colors font-medium"
                >
                  <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
                  <span>Reset Factory Demo Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
