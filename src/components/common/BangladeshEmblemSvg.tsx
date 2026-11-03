import React from 'react';

export const BangladeshEmblemSvg: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} shrink-0 select-none`}
    >
      {/* Outer Circle with Red Ring */}
      <circle cx="50" cy="50" r="48" fill="#10243A" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="50" cy="50" r="44" fill="#006A4E" stroke="#F59E0B" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="32" fill="#F42A41" />

      {/* Golden Water Lily (Shapla) */}
      <g fill="#F59E0B" stroke="#D97706" strokeWidth="0.5">
        {/* Central petal */}
        <path d="M50,26 C47,38 47,48 50,56 C53,48 53,38 50,26 Z" />
        {/* Left inner petal */}
        <path d="M50,38 C42,42 38,50 44,56 C46,52 48,46 50,38 Z" />
        {/* Right inner petal */}
        <path d="M50,38 C58,42 62,50 56,56 C54,52 52,46 50,38 Z" />
        {/* Left outer petal */}
        <path d="M50,44 C36,46 32,56 40,62 C44,58 46,52 50,44 Z" />
        {/* Right outer petal */}
        <path d="M50,44 C64,46 68,56 60,62 C56,58 54,52 50,44 Z" />
      </g>

      {/* Water waves underneath */}
      <path 
        d="M34,66 Q42,62 50,66 Q58,70 66,66 Q58,74 50,70 Q42,74 34,66 Z" 
        fill="#FFFFFF" 
        opacity="0.9" 
      />

      {/* 4 Stars at top */}
      <g fill="#F59E0B">
        <polygon points="50,11 51.5,15 55.5,15 52.5,17.5 53.5,21.5 50,19 46.5,21.5 47.5,17.5 44.5,15 48.5,15" />
        <polygon points="41,13 42,16.5 45.5,16.5 43,18.5 44,22 41,20 38,22 39,18.5 36.5,16.5 40,16.5" />
        <polygon points="59,13 60,16.5 63.5,16.5 61,18.5 62,22 59,20 56,22 57,18.5 54.5,16.5 58,16.5" />
      </g>
    </svg>
  );
};

