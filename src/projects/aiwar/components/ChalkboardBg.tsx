import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <ChalkboardBg progress={1} color="#2A363B" width={300} height={200} strokeWidth={2} />
export const ChalkboardBg: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 300, 
  height = 200, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = width * 2 + height * 2;

  // Board outline and wood frame
  const frameOuter = `M 10 10 L ${width - 10} 10 L ${width - 10} ${height - 10} L 10 ${height - 10} Z`;
  const frameInner = `M 20 20 L ${width - 20} 20 L ${width - 20} ${height - 20} L 20 ${height - 20} Z`;

  // Chalk smudges/lines
  const smudges = `
    M 40 40 L 80 50 M 50 60 L 120 40 M 100 80 L 150 90 M 180 50 L 250 60
    M 60 140 L 110 150 M 160 160 L 220 140
  `;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={`${frameOuter} ${frameInner}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8}
      />
      <rect x={20} y={20} width={width-40} height={height-40} fill="#4C5B5C" opacity={p * 0.2} />
      <path 
        d={smudges} 
        fill="none" stroke="#F5F0EB" strokeWidth={strokeWidth * 4} strokeLinecap="round" 
        opacity={p * 0.1} 
      />
    </svg>
  );
};
