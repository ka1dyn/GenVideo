import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface GearSystemProps {
  size?: number;
  color?: string;
  rotation?: number;
}

export const GearSystem: React.FC<GearSystemProps> = ({
  size = 400,
  color = COLORS.STROKE_INK,
  rotation = 0,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gear 1 (Large) */}
      <g transform={`rotate(${rotation} 40 40)`}>
        <circle cx="40" cy="40" r="15" stroke={color} strokeWidth="2" />
        {[...Array(8)].map((_, i) => (
          <rect
            key={i}
            x="37"
            y="20"
            width="6"
            height="5"
            fill={color}
            transform={`rotate(${i * 45} 40 40)`}
          />
        ))}
      </g>
      {/* Gear 2 (Small) */}
      <g transform={`rotate(${-rotation * 1.5} 70 60)`}>
        <circle cx="70" cy="60" r="10" stroke={color} strokeWidth="2" />
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x="68"
            y="47"
            width="4"
            height="4"
            fill={color}
            transform={`rotate(${i * 60} 70 60)`}
          />
        ))}
      </g>
    </svg>
  );
};
