import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Outro_NuclearImpact: React.FC<{
  size?: number;
  color?: string;
}> = ({ size = 200, color = COLORS.STATE_ERROR_FG }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Outer warning circle - multiple sketchy lines */}
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth={0.5} opacity={0.3} />
      <path
        d="M 10,50 Q 15,20 50,10 Q 80,15 90,50 Q 85,85 50,90 Q 20,85 10,50"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      
      {/* Danger/Radioactive-like symbol (stylized) */}
      <g transform="translate(50, 50)">
        <path
          d="M 0,0 L -20,-35 Q 0,-45 20,-35 Z"
          fill={color}
          opacity={0.8}
        />
        <path
          d="M 0,0 L 35,5 Q 40,25 25,35 Z"
          fill={color}
          opacity={0.8}
        />
        <path
          d="M 0,0 L -25,30 Q -40,15 -35,-5 Z"
          fill={color}
          opacity={0.8}
        />
        <circle cx="0" cy="0" r="10" fill={COLORS.BG_BASE} />
        <circle cx="0" cy="0" r="4" fill={color} />
      </g>
    </svg>
  );
};
