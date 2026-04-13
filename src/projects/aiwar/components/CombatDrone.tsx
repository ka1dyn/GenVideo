import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <CombatDrone progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const CombatDrone: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  // Reaper style drone
  const fuselage = `M 30 70 Q 75 60 130 70 Q 140 75 130 80 Q 75 80 30 80 Q 10 75 30 70 Z`;
  const tail = `M 20 70 L 10 40 L 25 65 M 20 70 L 5 95 L 25 75 M 20 70 L 5 70`;
  const wing = `M 80 75 L 140 110 L 130 110 L 70 80`;
  const missile = `M 100 100 L 120 110 L 120 115 L 95 105 Z`;

  // Drone flying in from bottom-left
  const flyOffset = (1 - p) * 50;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translate(${flyOffset}px, ${flyOffset}px)` }}>
        <path 
          d={`${fuselage} ${tail} ${wing}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
        <path 
          d={missile} 
          fill="none" stroke="#E84A5F" strokeWidth={strokeWidth} strokeLinecap="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
      </g>
    </svg>
  );
};
