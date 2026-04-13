import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <PointingHand progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const PointingHand: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  // Bossy pointing finger from bottom right
  const sleeve = `M 150 150 L 100 100 L 110 80 L 150 120 Z`;
  const hand = `M 100 100 C 90 90, 80 90, 80 100 C 80 110, 90 120, 100 110`;
  const finger = `M 80 100 L 30 50 A 5 5 0 0 1 40 40 L 90 90`; // Index
  const curled = `M 95 95 A 5 5 0 0 1 110 85 M 105 105 A 5 5 0 0 1 120 95 M 115 115 A 5 5 0 0 1 130 105`; 
  
  // Stabbing jab
  const jab = p > 0.8 ? -10 + Math.sin(p * 20) * 5 : (1 - p) * 50;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translate(${jab}px, ${jab}px)` }}>
        <path 
          d={`${sleeve} ${hand} ${finger} ${curled}`} 
          fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
        {/* angry speed lines */}
        <path d="M 20 30 L 10 20 M 30 20 L 20 10" fill="none" stroke="#E84A5F" strokeWidth={strokeWidth} opacity={p > 0.8 ? 1 : 0} strokeLinecap="round" />
      </g>
    </svg>
  );
};
