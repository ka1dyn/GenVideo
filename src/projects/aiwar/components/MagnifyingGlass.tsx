import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <MagnifyingGlass progress={1} color="#2A363B" size={100} strokeWidth={4} />
export const MagnifyingGlass: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 100, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const r = size * 0.3;
  const cx = size * 0.4;
  const cy = size * 0.4;
  const handleLen = size * 0.4;

  const circleLen = 2 * Math.PI * r;
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle 
        cx={cx} cy={cy} r={r} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeDasharray={circleLen} 
        strokeDashoffset={circleLen * (1 - p)} 
      />
      <line 
        x1={cx + r * 0.707} y1={cy + r * 0.707} 
        x2={cx + r * 0.707 + handleLen * p} y2={cy + r * 0.707 + handleLen * p} 
        stroke={color} 
        strokeWidth={strokeWidth * 1.5} 
        strokeLinecap="round" 
      />
    </svg>
  );
};
