import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <AnalogTimer progress={1} color="#2A363B" size={150} strokeWidth={4} />
export const AnalogTimer: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;
  const len = size * 3;

  // The hand rotates incredibly fast (p * 360 * 24 degrees)
  const angle = p * 360 * 24;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Timer outline */}
      <circle 
        cx={cx} cy={cy} r={r} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeDasharray={len}
        strokeDashoffset={len * (1 - Math.min(1, progress * 10))} 
      />
      {/* Top button */}
      <path d={`M ${cx - 10} ${cy - r - 10} h 20 v 10 h -20 z`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={Math.min(1, progress * 10)} />
      {/* Ticks */}
      <line x1={cx} y1={cy - r + 5} x2={cx} y2={cy - r + 15} stroke={color} strokeWidth={strokeWidth} opacity={p} />
      <line x1={cx + r - 15} y1={cy} x2={cx + r - 5} y2={cy} stroke={color} strokeWidth={strokeWidth} opacity={p} />
      <line x1={cx} y1={cy + r - 15} x2={cx} y2={cy + r - 5} stroke={color} strokeWidth={strokeWidth} opacity={p} />
      <line x1={cx - r + 5} y1={cy} x2={cx - r + 15} y2={cy} stroke={color} strokeWidth={strokeWidth} opacity={p} />
      
      {/* Fast spinning hand */}
      <g transform={`rotate(${angle} ${cx} ${cy})`}>
        <line x1={cx} y1={cy} x2={cx} y2={cy - r + 10} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </g>
    </svg>
  );
};
