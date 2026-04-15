import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const body4_MilitaryBaseSketch: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 400,
  color = COLORS.TEXT_BODY,
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main Hangar/Warehouse */}
      <path d="M15 80 L15 50 Q50 30 85 50 L85 80 Z" />
      <path d="M15 65 H85" opacity={0.5} />
      
      {/* Radar Dish */}
      <path d="M70 40 L80 20 M75 30 L85 35" />
      <path d="M75 15 Q85 15 85 25" strokeWidth={strokeWidth + 0.5} />
      
      {/* Fence around the base */}
      <path d="M5 80 H95" strokeWidth={strokeWidth + 1} />
      <path d="M10 80 V70 M20 80 V70 M30 80 V70 M40 80 V70 M50 80 V70 M60 80 V70 M70 80 V70 M80 80 V70 M90 80 V70" opacity={0.6} />

      {/* Flagpole */}
      <line x1="25" y1="50" x2="25" y2="20" />
      <path d="M25 20 L40 25 L25 30" fill={color} opacity={0.3} />

      {/* Ground detail */}
      <path d="M10 85 Q50 87 90 85" opacity={0.4} strokeWidth={1} />
    </svg>
  );
};
