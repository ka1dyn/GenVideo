import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <SecretFolder progress={1} color="#2A363B" width={200} height={150} strokeWidth={3} />
export const SecretFolder: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 200, 
  height = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const w = width;
  const h = height;

  const folderBack = `M 10 30 L 10 ${h - 10} L ${w - 10} ${h - 10} L ${w - 10} 30 Z`;
  const folderTab = `M 10 30 L 10 10 L 60 10 L 75 30`;
  const folderFront = `M 5 45 L 20 ${h - 5} L ${w - 5} ${h - 5} L ${w - 20} 45 Z`;

  const len = w * 4 + h * 4;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={`${folderBack} ${folderTab}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.6}
      />
      <path 
        d={`${folderFront}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} 
      />
      <text x={w / 2} y={h / 2} textAnchor="middle" fill={color} opacity={p} fontFamily="monospace" fontSize={24} fontWeight="bold" transform="scale(1, 1.2)">
        PROJECT MAVEN
      </text>
    </svg>
  );
};
