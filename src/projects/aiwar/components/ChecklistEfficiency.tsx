import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ChecklistEfficiency progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const ChecklistEfficiency: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const board = `M 30 20 L 170 20 L 170 180 L 30 180 Z`;
  const clip = `M 80 10 L 120 10 L 120 30 L 80 30 Z`;

  const drawCheckboxRow = (y: number, isChecked: boolean, index: number) => {
    const rowP = Math.max(0, Math.min(1, p * 3 - index));
    return (
      <g opacity={rowP}>
        <rect x={50} y={y} width={20} height={20} fill="#FFF" stroke={color} strokeWidth={strokeWidth} />
        {isChecked && rowP > 0.5 && <path d={`M 55 ${y+10} L 60 ${y+15} L 75 ${y-5}`} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth*1.5} />}
        <line x1={80} y1={y+10} x2={150} y2={y+10} stroke={color} strokeWidth={strokeWidth} opacity={0.5} />
      </g>
    );
  };

  const len = size * 3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${board} ${clip}`} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <text x={100} y={50} textAnchor="middle" fill={color} fontFamily="monospace" fontSize={14} fontWeight="bold" opacity={p}>100% EFFICIENT</text>
      
      {drawCheckboxRow(70, true, 0)}
      {drawCheckboxRow(100, true, 1)}
      {drawCheckboxRow(130, true, 2)}
    </svg>
  );
};
