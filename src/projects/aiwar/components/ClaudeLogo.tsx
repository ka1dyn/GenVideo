import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ClaudeLogo progress={1} color="#E8A87C" size={120} strokeWidth={4} />
export const ClaudeLogo: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 100, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;
  
  // A simple 4-point spark/star for Claude/AI representation
  const pathData = `
    M ${cx} ${cy - r}
    Q ${cx} ${cy} ${cx + r} ${cy}
    Q ${cx} ${cy} ${cx} ${cy + r}
    Q ${cx} ${cy} ${cx - r} ${cy}
    Q ${cx} ${cy} ${cx} ${cy - r}
    Z
  `;

  // Path length for 4-point star is roughly radius * 6
  const len = size * 3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={pathData} 
        fill="none"
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeDasharray={len}
        strokeDashoffset={len * (1 - p)}
      />
    </svg>
  );
};
