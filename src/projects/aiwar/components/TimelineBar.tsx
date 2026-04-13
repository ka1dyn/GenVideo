import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
}

// @gallery: <TimelineBar progress={1} color="#E84A5F" width={300} height={50} />
export const TimelineBar: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  width = 300, 
  height = 50 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <line x1={20} y1={25} x2={width - 20} y2={25} stroke="#2A363B" strokeWidth={4} strokeLinecap="round" />
      <line x1={20} y1={25} x2={20 + (width - 40) * p} y2={25} stroke={color} strokeWidth={4} strokeLinecap="round" />
      
      <circle cx={20} cy={25} r={8} fill="#2A363B" />
      <text x={20} y={15} textAnchor="middle" fill="#2A363B" fontFamily="monospace" fontSize={12} fontWeight="bold">2013</text>
      
      <circle cx={width - 20} cy={25} r={8} fill={p === 1 ? color : "#2A363B"} opacity={p} />
      <text x={width - 20} y={15} textAnchor="middle" fill={p === 1 ? color : "#2A363B"} fontFamily="monospace" fontSize={12} fontWeight="bold" opacity={p}>2016</text>
    </svg>
  );
};
