import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <FamilyStickmen progress={1} color="#2A363B" size={200} strokeWidth={4} />
export const FamilyStickmen: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Adult holding kid's hand
  const adultHead = `M 60 70 A 15 15 0 1 0 60 69.9`;
  const adultBody = `M 60 85 L 60 140 M 60 140 L 40 190 M 60 140 L 80 190`; 
  const adultArms = `M 40 100 L 60 90 L 100 110`;

  const kidHead = `M 120 110 A 10 10 0 1 0 120 109.9`;
  const kidBody = `M 120 120 L 120 160 M 120 160 L 110 190 M 120 160 L 130 190`;
  const kidArms = `M 100 110 L 120 125 L 140 140`;
  
  // Backpack on kid
  const backpack = `M 125 125 L 145 125 L 145 150 L 125 150 Z`;

  const len = size * 5;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${adultHead} ${adultBody} ${adultArms} ${kidHead} ${kidBody} ${kidArms}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={backpack} 
        fill="#99B898" stroke={color} strokeWidth={strokeWidth * 0.5} strokeLinejoin="round" 
        strokeDasharray={100} strokeDashoffset={100 * (1 - p)} opacity={0.8}
      />
    </svg>
  );
};
