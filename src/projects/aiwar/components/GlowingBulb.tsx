import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <GlowingBulb progress={1} color="#E8A87C" size={150} strokeWidth={3} />
export const GlowingBulb: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const len = size * 3;

  const bulb = `M 45 60 C 45 20, 105 20, 105 60 C 105 80, 90 90, 85 110 L 65 110 C 60 90, 45 80, 45 60 Z`;
  const base = `M 60 110 L 90 110 M 65 120 L 85 120 M 70 130 L 80 130`;
  const filament = `M 65 80 L 70 50 L 75 60 L 80 50 L 85 80`;

  // Rays
  const rays = `M 75 10 L 75 -10 M 20 20 L 0 5 M 130 20 L 150 5 M 10 70 L -10 70 M 140 70 L 160 70`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${bulb} ${base} ${filament}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={rays} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" 
        strokeDasharray={50} strokeDashoffset={50 * (1 - p)} opacity={Math.floor(p * 15) % 2 === 0 ? 1 : 0.4}
      />
    </svg>
  );
};
