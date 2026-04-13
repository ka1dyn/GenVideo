import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <Newspaper progress={1} color="#2A363B" size={150} strokeWidth={2} />
export const Newspaper: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 5;

  const outline = `M 20 20 L 130 20 L 130 140 L 20 140 Z M 25 25 L 125 25`;
  const logo = `M 30 40 H 120`; // Bloomberg-like header space
  const columns = `
    M 30 60 H 70 M 30 70 H 70 M 30 80 H 70 M 30 90 H 50
    M 80 60 H 120 M 80 70 H 120 M 80 80 H 120 M 80 90 H 100
    M 30 110 H 120 M 30 120 H 120 M 30 130 H 80
  `;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${outline} ${columns}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <text x={75} y={42} textAnchor="middle" fill={color} fontFamily="serif" fontSize={14} fontWeight="bold" opacity={p}>Bloomberg</text>
    </svg>
  );
};
