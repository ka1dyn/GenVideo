import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <OldFloppyDisk progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const OldFloppyDisk: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 5;

  const disk = `M 40 40 L 130 40 L 160 70 L 160 160 L 40 160 Z`;
  const slider = `M 60 40 L 110 40 L 110 70 L 60 70 Z`;
  const label = `M 50 100 L 150 100 L 150 150 L 50 150 Z`;
  
  // Cobwebs
  const webs = `M 40 40 L 20 20 M 40 40 L 20 50 M 40 40 L 50 20 M 20 30 Q 30 35 45 25 M 25 40 Q 35 45 40 50`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${disk} ${slider} ${label}`} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={webs} 
        fill="none" stroke="#99B898" strokeWidth={strokeWidth * 0.5} strokeDasharray={100} strokeDashoffset={100 * (1 - p)} opacity={0.6}
      />
      <text x={100} y={130} textAnchor="middle" fill={color} fontFamily="serif" fontSize={16} opacity={p * 0.5}>Intel</text>
    </svg>
  );
};
