import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Body1_Pentagon: React.FC<{
  size?: number;
  color?: string;
  thickness?: number;
}> = ({ size = 300, color = COLORS.STROKE_INK, thickness = 2.5 }) => {
  const center = size / 2;
  const radius = size * 0.4;
  
  // Calculate Pentagon points (5 points)
  const points = [0, 1, 2, 3, 4].map((i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  });

  const pathData = `M ${points[0].x},${points[0].y} 
                    L ${points[1].x},${points[1].y} 
                    L ${points[2].x},${points[2].y} 
                    L ${points[3].x},${points[3].y} 
                    L ${points[4].x},${points[4].y} Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Outer Pentagon with slight offset for hand-drawn feel */}
      <path
        d={pathData}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
      
      {/* Decorative details inside */}
      <path
        d={`M ${center - radius * 0.4},${center} L ${center + radius * 0.4},${center}`}
        stroke={color}
        strokeWidth={thickness * 0.5}
        strokeDasharray="4 4"
        opacity={0.3}
      />
    </svg>
  );
};
