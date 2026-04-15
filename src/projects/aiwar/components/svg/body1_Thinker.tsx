import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Body1_Thinker: React.FC<{
  size?: number;
  color?: string;
  thickness?: number;
}> = ({ size = 300, color = COLORS.STROKE_INK, thickness = 2.5 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Head */}
      <path
        d="M 100,50 C 110,50 115,58 115,65 C 115,75 108,82 100,82 C 92,82 85,75 85,65 C 85,58 90,50 100,50"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      {/* Body / Pose (Rodin-like sketch) */}
      <path
        d="M 95,85 C 80,95 75,110 75,130 L 75,170"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      <path
        d="M 105,85 C 120,95 130,110 130,140 L 130,170"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      {/* Hand on Chin / Thinking Pose */}
      <path
        d="M 120,110 C 110,105 100,95 100,85"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      {/* Sitting base */}
      <path
        d="M 60,170 L 140,170"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        opacity={0.5}
      />
      {/* Thinking symbol (subtle spark/question) */}
      <path
        d="M 115,40 L 120,30 M 125,45 L 135,42"
        stroke={color}
        strokeWidth={thickness * 0.8}
        strokeLinecap="round"
        opacity={0.6}
      />
    </svg>
  );
};
