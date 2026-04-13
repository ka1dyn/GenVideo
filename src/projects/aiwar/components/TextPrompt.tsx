import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <TextPrompt progress={1} color="#99B898" width={200} height={80} strokeWidth={3} />
export const TextPrompt: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', 
  width = 200, 
  height = 80, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const w = width;
  const h = height;
  const len = w * 2 + h * 2;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Box */}
      <rect 
        x={5} y={5} width={w - 10} height={h - 10} rx={10} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} 
      />
      {/* text lines */}
      <line x1={20} y1={30} x2={20 + (w - 60) * p} y2={30} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1={20} y1={50} x2={20 + (w - 100) * p} y2={50} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      
      {/* Blinking cursor */}
      <line 
        x1={25 + (w - 100) * p} y1={40} x2={25 + (w - 100) * p} y2={60} 
        stroke={color} strokeWidth={strokeWidth} 
        opacity={Math.floor(p * 10) % 2 === 0 ? 1 : 0} 
      />
    </svg>
  );
};
