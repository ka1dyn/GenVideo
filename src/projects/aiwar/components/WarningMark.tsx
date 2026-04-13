import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <WarningMark progress={1} color="#E84A5F" size={100} strokeWidth={4} />
export const WarningMark: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 100, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 3;

  // Blinking effect
  const blink = Math.floor(p * 10) % 2 === 0 ? 1 : 0.3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Triangle */}
      <polygon 
        points={`${cx},10 10,${size - 10} ${size - 10},${size - 10}`}
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeDasharray={len}
        strokeDashoffset={len * (1 - p)} 
      />
      {/* Exclamation */}
      <line x1={cx} y1={40} x2={cx} y2={size - 40} stroke={color} strokeWidth={strokeWidth * 1.5} strokeLinecap="round" opacity={p * blink} />
      <circle cx={cx} cy={size - 25} r={strokeWidth} fill={color} opacity={p * blink} />
    </svg>
  );
};
