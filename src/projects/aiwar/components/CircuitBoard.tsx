import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <CircuitBoard progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const CircuitBoard: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 5;

  const bg = `M 40 40 L 160 40 L 160 160 L 40 160 Z`;
  const chip = `M 80 80 L 120 80 L 120 120 L 80 120 Z`;
  
  // Circuit lines
  const lines = `
    M 80 90 L 60 90 L 60 60 
    M 80 110 L 50 110 
    M 120 90 L 140 90 L 140 130 L 150 130
    M 120 110 L 130 110 L 130 150
    M 100 80 L 100 60 M 100 120 L 100 140
  `;

  // Nodes
  const coords = [[60,60], [50,110], [150,130], [130,150], [100,60], [100,140]];
  const nodes = coords.map((c, i) => (
    <circle key={i} cx={c[0]} cy={c[1]} r={3} fill={color} opacity={p} />
  ));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${bg} ${chip} ${lines}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8}
      />
      {nodes}
    </svg>
  );
};
