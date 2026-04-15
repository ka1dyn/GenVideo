import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Body1_CivilianVehicle: React.FC<{
  size?: number;
  color?: string;
  thickness?: number;
}> = ({ size = 300, color = COLORS.STROKE_INK, thickness = 2.5 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Sedan body outline */}
      <path
        d="M 30,140 L 170,140 L 165,115 L 140,85 L 60,85 L 45,115 Z"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Windows */}
      <path
        d="M 65,90 L 98,90 L 98,115 L 55,115 Z"
        stroke={color}
        strokeWidth={thickness * 0.7}
        opacity={0.5}
      />
      <path
        d="M 102,90 L 135,90 L 145,115 L 102,115 Z"
        stroke={color}
        strokeWidth={thickness * 0.7}
        opacity={0.5}
      />
      {/* Civilian wheels (simpler) */}
      <circle cx="55" cy="140" r="14" stroke={color} strokeWidth={thickness} fill={COLORS.BG_BASE} />
      <circle cx="145" cy="140" r="14" stroke={color} strokeWidth={thickness} fill={COLORS.BG_BASE} />
      {/* Door line */}
      <path d="M 100,90 L 100,140" stroke={color} strokeWidth={thickness * 0.5} opacity={0.3} />
    </svg>
  );
};
