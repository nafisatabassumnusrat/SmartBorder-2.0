import React from 'react';

export const MartyrsMemorialSvg: React.FC<{ className?: string }> = ({ className = "w-full h-24" }) => {
  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <svg 
        viewBox="0 0 280 120" 
        preserveAspectRatio="xMidYMax meet" 
        className="w-full h-full opacity-35 hover:opacity-50 transition-opacity"
      >
        <defs>
          <linearGradient id="monumentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#475569" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="reflectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* 7 Ascending Triangular Pylons of Jatiya Smriti Soudho */}
        {/* Pylon 7 (Widest, Lowest) */}
        <polygon points="140,40 50,90 230,90" fill="url(#monumentGrad)" opacity="0.3" />
        {/* Pylon 6 */}
        <polygon points="140,32 70,90 210,90" fill="url(#monumentGrad)" opacity="0.4" />
        {/* Pylon 5 */}
        <polygon points="140,24 90,90 190,90" fill="url(#monumentGrad)" opacity="0.5" />
        {/* Pylon 4 */}
        <polygon points="140,16 105,90 175,90" fill="url(#monumentGrad)" opacity="0.6" />
        {/* Pylon 3 */}
        <polygon points="140,10 118,90 162,90" fill="url(#monumentGrad)" opacity="0.7" />
        {/* Pylon 2 */}
        <polygon points="140,4 128,90 152,90" fill="url(#monumentGrad)" opacity="0.85" />
        {/* Pylon 1 (Tallest Central Apex) */}
        <polygon points="140,0 135,90 145,90" fill="#E2E8F0" opacity="0.95" />

        {/* Base Water Line */}
        <line x1="20" y1="90" x2="260" y2="90" stroke="#64748B" strokeWidth="1" opacity="0.6" />

        {/* Water Reflection */}
        <polygon points="140,90 135,115 145,115" fill="url(#reflectionGrad)" opacity="0.4" />
        <polygon points="140,90 115,110 165,110" fill="url(#reflectionGrad)" opacity="0.25" />
        <polygon points="140,90 80,105 200,105" fill="url(#reflectionGrad)" opacity="0.15" />

        {/* Ripple lines */}
        <line x1="110" y1="94" x2="170" y2="94" stroke="#94A3B8" strokeWidth="0.8" opacity="0.4" />
        <line x1="90" y1="99" x2="190" y2="99" stroke="#94A3B8" strokeWidth="0.6" opacity="0.3" />
        <line x1="70" y1="105" x2="210" y2="105" stroke="#94A3B8" strokeWidth="0.5" opacity="0.2" />
      </svg>
    </div>
  );
};

