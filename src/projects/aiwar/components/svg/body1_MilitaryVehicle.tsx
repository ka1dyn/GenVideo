import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Body1_MilitaryVehicle: React.FC<{
  size?: number;
  color?: string;
  thickness?: number;
}> = ({ size = 300, color = COLORS.STROKE_INK, thickness = 2.5 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Humvee body outline */}
      <path
        d="M 40,140 L 160,140 L 160,100 L 140,80 L 60,80 L 40,100 Z"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Roof detail */}
      <path
        d="M 60,80 L 60,70 L 140,70 L 140,80"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      {/* Windows */}
      <path
        d="M 65,85 L 100,85 L 100,105 L 65,105 Z"
        stroke={color}
        strokeWidth={thickness * 0.7}
        opacity={0.6}
      />
      <path
        d="M 105,85 L 135,85 L 135,105 L 105,105 Z"
        stroke={color}
        strokeWidth={thickness * 0.7}
        opacity={0.6}
      />
      {/* Combat wheels */}
      <circle cx="65" cy="140" r="18" stroke={color} strokeWidth={thickness} fill={COLORS.BG_BASE} />
      <circle cx="135" cy="140" r="18" stroke={color} strokeWidth={thickness} fill={COLORS.BG_BASE} />
      {/* Antenna */}
      <path d="M 145,70 L 155,50" stroke={color} strokeWidth={thickness * 0.8} strokeLinecap="round" />
    </svg>
  );
};
