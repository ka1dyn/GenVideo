import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Outro_EducationIcon: React.FC<{
  size?: number;
  color?: string;
}> = ({ size = 200, color = COLORS.STROKE_INK }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      {/* Book Cover */}
      <path
        d="M 35,30 L 115,30 Q 120,30 120,35 L 120,115 Q 120,120 115,120 L 35,120 Q 30,120 30,115 L 30,45 Q 30,30 45,30"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Book Spine Detail */}
      <path
        d="M 42,30 V 120"
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="4 2"
      />

      {/* AI/Knowledge Symbol (Magnifying glass + AI Core) */}
      <g transform="translate(75, 75)">
        {/* Core circle */}
        <circle
          cx="0"
          cy="0"
          r="15"
          stroke={COLORS.PRIMARY}
          strokeWidth={2}
          fill={COLORS.PRIMARY_LIGHT}
          opacity={0.3}
        />
        {/* Abstract "A" or Core lines */}
        <path
          d="M -8,5 L 0,-10 L 8,5"
          stroke={COLORS.PRIMARY_BOLD}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M -5,0 H 5"
          stroke={COLORS.PRIMARY_BOLD}
          strokeWidth={2}
          strokeLinecap="round"
        />
        
        {/* Sparkles around symbol */}
        <path
          d="M 22,-22 L 25,-25 M -22,-22 L -25,-25 M 22,22 L 25,25"
          stroke={COLORS.PRIMARY_BOLD}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </g>

      {/* Sketchy shadow lines */}
      <path
        d="M 35,125 Q 75,128 115,125"
        stroke={color}
        strokeWidth={1.5}
        opacity={0.3}
      />
    </svg>
  );
};
