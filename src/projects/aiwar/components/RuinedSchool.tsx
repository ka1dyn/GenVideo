import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <RuinedSchool progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const RuinedSchool: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 5;

  const base = `M 20 180 L 180 180`;
  const outline = `M 30 180 L 30 120 L 70 90 L 100 120 L 120 100 L 170 180`; // Broken jagged edges
  const windows = `M 40 140 L 60 140 L 60 160 L 40 160 Z M 130 160 L 150 160 L 150 180 L 130 180 Z`;
  const rubble = `M 70 180 L 90 150 L 110 180 Z M 100 180 L 115 165 L 130 180 Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${base} ${outline} ${windows} ${rubble}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.6}
      />
    </svg>
  );
};
