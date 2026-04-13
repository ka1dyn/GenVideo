import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <SoldierSilhouette progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const SoldierSilhouette: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  const hat = `M 40 50 Q 75 30 110 50 Q 120 50 130 60 L 20 60 Q 30 50 40 50 Z`; // Combat cap
  const head = `M 50 60 L 50 90 Q 75 110 100 90 L 100 60 Z`;
  const body = `M 50 100 Q 30 110 20 150 L 130 150 Q 120 110 100 100 Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${hat} ${head} ${body}`} 
        fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
      />
    </svg>
  );
};
