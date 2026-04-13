import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <MilitaryHelmet progress={1} color="#2A363B" size={120} strokeWidth={4} />
export const MilitaryHelmet: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 120, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  const helmet = `M 10 90 C 10 30, 110 30, 110 90 L 10 90 Z`;
  const brim = `M 5 90 C 20 85, 100 85, 115 90`;
  const net = `M 30 50 L 50 90 M 60 40 L 80 90 M 40 90 L 80 50 M 20 70 L 60 70 M 60 75 L 100 65`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${helmet} ${brim} ${net}`} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeDasharray={len} 
        strokeDashoffset={len * (1 - p)} 
      />
    </svg>
  );
};
