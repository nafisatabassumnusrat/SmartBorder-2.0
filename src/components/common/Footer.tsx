import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const Footer: React.FC = () => {
  const { language, setLanguage } = useAppStore();

  return (
    <footer className="h-10 bg-white border-t border-[#E2EAF3] px-6 flex items-center justify-between text-xs text-[#6B7D93] select-none z-30 shrink-0">
      {/* Left Copyright */}
      <div className="text-[11px] font-medium text-[#172B45]">
        © 2026 SmartBorder 2.0 | Falcon Bots | Government of Bangladesh
      </div>

      {/* Center Demo Data notice */}
      <div className="hidden md:flex items-center space-x-1.5 text-[11px] font-mono text-[#6B7D93]">
        <span>Data Source: <strong className="text-[#172B45]">DEMO DATA</strong></span>
        <span>|</span>
        <span>Last Updated: Nov 3, 2026, 09:24 AM</span>
      </div>

      {/* Right: Bilingual Switcher Pill & Version */}
      <div className="flex items-center space-x-4">
        {/* Language Pill */}
        <div className="inline-flex items-center p-0.5 rounded-full bg-slate-100 border border-[#E2EAF3] text-[11px]">
          <button
            onClick={() => setLanguage('EN')}
            className={`px-3 py-0.5 rounded-full font-medium transition-colors ${
              language === 'EN'
                ? 'bg-[#1479C9] text-white font-bold shadow-xs'
                : 'text-[#6B7D93] hover:text-[#172B45]'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('BN')}
            className={`px-3 py-0.5 rounded-full font-medium transition-colors ${
              language === 'BN'
                ? 'bg-[#1479C9] text-white font-bold shadow-xs'
                : 'text-[#6B7D93] hover:text-[#172B45]'
            }`}
          >
            বাংলা
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#6B7D93]">
          v2.0.0
        </span>
      </div>
    </footer>
  );
};
