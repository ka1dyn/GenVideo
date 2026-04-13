import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <EraserHand progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const EraserHand: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Rubbing motion
  const rub = p < 0.8 ? Math.sin(p * 30) * 15 : 0;
  
  const sleeve = `M 200 200 L 150 130 L 130 150 L 180 220 Z`;
  const hand = `M 150 130 C 120 100, 90 120, 110 140 C 100 150, 110 160, 130 150`; 
  const eraser = `M 80 110 L 110 100 L 120 120 L 90 130 Z`;
  
  const len = size * 3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translateX(${rub}px) translateY(${rub * 0.5}px)` }}>
        <path 
          d={`${sleeve} ${hand}`} 
          fill="#1A1C20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
        <path 
          d={eraser} 
          fill="#E8A87C" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
      </g>
    </svg>
  );
};
