import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <SkullIcon progress={1} color="#E84A5F" size={150} strokeWidth={3} />
export const SkullIcon: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  const skull = `M 50 100 C 30 100, 30 50, 75 50 C 120 50, 120 100, 100 100 L 100 120 L 90 120 L 90 110 L 80 110 L 80 120 L 70 120 L 70 110 L 60 110 L 60 120 L 50 120 Z`;
  const eyes = `M 60 85 A 5 5 0 1 0 60 84.9 M 90 85 A 5 5 0 1 0 90 84.9`;
  const nose = `M 75 95 L 70 100 L 80 100 Z`;

  // Blink effect
  const blink = Math.floor(p * 10) % 2 === 0 ? 1 : 0.3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${skull} ${eyes} ${nose}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={blink}
      />
    </svg>
  );
};
