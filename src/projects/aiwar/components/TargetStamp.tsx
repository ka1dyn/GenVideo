import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TargetStamp progress={1} color="#E84A5F" size={150} strokeWidth={4} />
export const TargetStamp: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 100, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const r1 = size * 0.4;
  const r2 = size * 0.2;
  const len = size * 3.14;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`} 
      style={{ transform: `scale(${0.5 + p * 0.5})`, opacity: p }}
    >
      {/* Outer Circle */}
      <circle cx={cx} cy={cy} r={r1} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      {/* Inner Circle */}
      <circle cx={cx} cy={cy} r={r2} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      {/* Crosshairs */}
      <line x1={cx} y1={cy - r1 - 10} x2={cx} y2={cy + r1 + 10} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={size} strokeDashoffset={size * (1 - p)} />
      <line x1={cx - r1 - 10} y1={cy} x2={cx + r1 + 10} y2={cy} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={size} strokeDashoffset={size * (1 - p)} />
    </svg>
  );
};
