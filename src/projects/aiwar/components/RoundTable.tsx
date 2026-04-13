import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <RoundTable progress={1} color="#2A363B" width={400} height={200} strokeWidth={4} />
export const RoundTable: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 400, 
  height = 200, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = width * 3;

  const tableTop = `M 40 100 C 40 40, ${width-40} 40, ${width-40} 100 C ${width-40} 160, 40 160, 40 100 Z`;
  const tableSide = `M 40 100 L 40 120 C 40 180, ${width-40} 180, ${width-40} 120 L ${width-40} 100`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={`${tableTop} ${tableSide}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
    </svg>
  );
};
