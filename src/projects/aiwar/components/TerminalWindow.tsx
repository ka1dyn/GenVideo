import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <TerminalWindow progress={1} color="#2A363B" width={180} height={120} strokeWidth={3} />
export const TerminalWindow: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 180, 
  height = 120, 
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
        x={5} y={5} width={w - 10} height={h - 10} rx={5} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} 
      />
      {/* Top Bar */}
      <line x1={5} y1={25} x2={w - 5} y2={25} stroke={color} strokeWidth={strokeWidth} strokeDasharray={w} strokeDashoffset={w * (1 - p)} />
      {/* Buttons */}
      <circle cx={15} cy={15} r={3} fill={color} opacity={p} />
      <circle cx={25} cy={15} r={3} fill={color} opacity={p} />
      <circle cx={35} cy={15} r={3} fill={color} opacity={p} />
      
      {/* Code lines */}
      <path 
        d={`M 15 40 h ${50 * p} M 15 55 h ${80 * p} M 15 70 h ${40 * p} M 65 70 h ${60 * p} M 15 85 h ${90 * p}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" 
      />
      
      {/* Blinking block cursor */}
      <rect 
        x={20 + 90 * p} y={75} width={8} height={12} fill={color} 
        opacity={Math.floor(p * 15) % 2 === 0 ? 1 : 0} 
      />
    </svg>
  );
};
