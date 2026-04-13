import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <BriefingFolder progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const BriefingFolder: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  const folder = `M 20 40 L 60 40 L 70 50 L 130 50 L 130 120 L 20 120 Z`;
  const paper = `M 30 30 L 110 30 L 110 100 L 30 100 Z`; // Sticking out
  const graph = `M 40 90 L 60 70 L 80 80 L 100 50`; // Briefing chart
  const star = `M 75 40 L 70 30 L 65 40 Z`; // Star icon

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `translateY(${(1 - p) * 20}px)`, opacity: p }}>
        <path d={paper} fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <path d={`${graph} ${star}`} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth} strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
        <path d={folder} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9} />
      </g>
    </svg>
  );
};
