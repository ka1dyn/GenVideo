import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <GiantXMark progress={1} color="#E84A5F" size={200} strokeWidth={6} />
export const GiantXMark: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 200, 
  strokeWidth = 6 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 1.5;

  // Cross lines
  const line1 = `M 20 20 L ${size - 20} ${size - 20}`;
  const line2 = `M ${size - 20} 20 L 20 ${size - 20}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={line1} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={line2} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - Math.max(0, p - 0.2)) * 1.25}
      />
    </svg>
  );
};
