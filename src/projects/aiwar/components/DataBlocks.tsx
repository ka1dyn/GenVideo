import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <DataBlocks progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const DataBlocks: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // A pile of cubes/blocks
  const cube1 = `M 50 100 l -20 -10 l 0 -20 l 20 10 l 0 20 M 50 80 l 20 -10 l 0 20 l -20 10 M 50 80 l -20 -10 l 20 -10 l 20 10 z`;
  const cube2 = `M 80 90 l -15 -8 l 0 -15 l 15 8 l 0 15 M 80 75 l 15 -8 l 0 15 l -15 8 M 80 75 l -15 -8 l 15 -8 l 15 8 z`;
  const cube3 = `M 60 70 l -15 -8 l 0 -15 l 15 8 l 0 15 M 60 55 l 15 -8 l 0 15 l -15 8 M 60 55 l -15 -8 l 15 -8 l 15 8 z`;

  const len = size * 4;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${cube1} ${cube2} ${cube3}`} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
    </svg>
  );
};
