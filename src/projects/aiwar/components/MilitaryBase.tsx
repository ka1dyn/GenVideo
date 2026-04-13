import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <MilitaryBase progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const MilitaryBase: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 5;

  const fence = `M 10 150 L 190 150 M 10 140 L 190 140 M 10 130 L 190 130`; // barb wire fence base
  const posts = `M 30 120 L 30 160 M 90 120 L 90 160 M 150 120 L 150 160`;
  const building = `M 40 130 L 40 60 L 140 60 L 140 130 Z`;
  const radar = `M 70 60 L 70 40 M 90 60 L 90 30 M 70 40 A 20 20 0 0 1 110 40`;
  const sandbags = `M 50 130 A 10 10 0 0 0 70 130 A 10 10 0 0 0 90 130 A 10 10 0 0 0 110 130 A 10 10 0 0 0 130 130`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${fence} ${posts} ${building} ${radar} ${sandbags}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8}
      />
    </svg>
  );
};
