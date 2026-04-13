import React from 'react';

interface Props {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <CursorClick progress={1} size={150} strokeWidth={3} />
export const CursorClick: React.FC<Props> = ({ 
  progress, 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Comes from bottom right, clicks at center
  const posX = (1 - Math.min(1, p * 2)) * 100;
  const posY = (1 - Math.min(1, p * 2)) * 100;

  const hand = `M 50 80 L 50 30 A 10 10 0 1 1 70 30 L 70 60 A 10 10 0 1 1 90 60 A 10 10 0 1 1 110 60 A 10 10 0 1 1 130 60 L 130 100 A 30 30 0 0 1 70 130 L 50 110 Z`;
  
  const isClicking = p > 0.8;
  const scale = isClicking ? 0.9 : 1;

  const clickLines = `M 60 10 L 40 -10 M 80 0 L 80 -25 M 100 10 L 120 -10`;

  return (
    <svg width={size} height={size} viewBox={`-30 -30 ${size+30} ${size+30}`}>
      <g style={{ transform: `translate(${posX}px, ${posY}px) scale(${scale})`, transformOrigin: '70px 80px' }}>
        <path d={hand} fill="#FFF" stroke="#2A363B" strokeWidth={strokeWidth} strokeLinejoin="round" />
        {isClicking && (
          <path d={clickLines} stroke="#E84A5F" strokeWidth={strokeWidth} strokeLinecap="round" />
        )}
      </g>
    </svg>
  );
};
