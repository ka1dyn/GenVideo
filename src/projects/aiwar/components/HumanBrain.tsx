import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <HumanBrain progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const HumanBrain: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 5;

  // Squiggly brain shape
  const outline = `M 100 40 C 60 30, 20 60, 30 110 C 30 150, 70 170, 100 160 C 130 170, 170 150, 170 110 C 180 60, 140 30, 100 40 Z`;
  const sulci = `M 100 40 C 95 80, 110 120, 100 160 M 60 70 C 80 90, 60 120, 70 140 M 140 70 C 120 90, 140 120, 130 140 M 40 100 Q 60 110 50 130 M 160 100 Q 140 110 150 130`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${outline} ${sulci}`} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8}
      />
    </svg>
  );
};
