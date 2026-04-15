import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const IntroAiCore: React.FC<{
  progress: number;
  size?: number;
}> = ({ progress, size = 300 }) => {
  const center = size / 2;
  const radius = (size / 2) * 0.8 * progress;
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Outer circles */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={COLORS.SECONDARY}
        strokeWidth={2}
        strokeDasharray="10 5"
        opacity={0.3}
      />
      <circle
        cx={center}
        cy={center}
        r={radius * 0.7}
        stroke={COLORS.SECONDARY_MID}
        strokeWidth={1.5}
        opacity={0.5}
      />
      {/* Central dots */}
      <circle
        cx={center}
        cy={center}
        r={radius * 0.2}
        fill={COLORS.SECONDARY_DARK}
      />
      {/* Decorative lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1={center + Math.cos((angle * Math.PI) / 180) * (radius * 0.3)}
          y1={center + Math.sin((angle * Math.PI) / 180) * (radius * 0.3)}
          x2={center + Math.cos((angle * Math.PI) / 180) * radius}
          y2={center + Math.sin((angle * Math.PI) / 180) * radius}
          stroke={COLORS.SECONDARY}
          strokeWidth={1}
          opacity={0.4}
        />
      ))}
    </svg>
  );
};
