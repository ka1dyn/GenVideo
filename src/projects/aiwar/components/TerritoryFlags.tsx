import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TerritoryFlags progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const TerritoryFlags: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  const land1 = `M 20 140 C 30 110, 80 120, 90 150 C 95 180, 40 180, 20 140 Z`;
  const land2 = `M 110 130 C 130 90, 180 110, 170 160 C 140 180, 90 160, 110 130 Z`;
  const crack = `M 95 100 L 90 140 L 105 160 L 95 190`; 

  const flag1 = `M 50 120 L 50 60 M 50 60 L 80 70 L 50 80`;
  const flag2 = `M 140 110 L 140 50 M 140 50 L 110 60 L 140 70`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${land1} ${land2} ${crack}`} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
      />
      {p > 0.5 && (
        <>
          <path d={flag1} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth} strokeLinejoin="round" strokeDasharray={100} strokeDashoffset={100 * (1 - (p-0.5)*2)} />
          <path d={flag2} fill="none" stroke="#99B898" strokeWidth={strokeWidth} strokeLinejoin="round" strokeDasharray={100} strokeDashoffset={100 * (1 - (p-0.5)*2)} />
        </>
      )}
    </svg>
  );
};
