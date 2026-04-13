import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <HackerSilhouette progress={1} color="#1A1C20" size={250} strokeWidth={3} />
export const HackerSilhouette: React.FC<Props> = ({ 
  progress, 
  color = '#1A1C20', 
  size = 250, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Hooded figure typing
  const hood = `M 125 40 C 70 40, 60 100, 60 120 C 60 140, 40 180, 20 200 L 230 200 C 210 180, 190 140, 190 120 C 190 100, 180 40, 125 40 Z`;
  const faceVoid = `M 90 100 C 90 70, 160 70, 160 100 C 160 130, 90 130, 90 100 Z`;
  
  // Wiggle on typing
  const typing = Math.sin(p * 60) * 2;

  const len = size * 4;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translateY(${typing}px)` }}>
        <path 
          d={hood} 
          fill={color} stroke="none" opacity={p * 0.9} 
        />
        <path 
          d={faceVoid} 
          fill="#E84A5F" opacity={p * 0.3} // creepy red glow inside hood
        />
        {/* Keyboard/hands motion implied at bottom */}
        <path 
          d={`M 60 190 L 190 190`} 
          stroke="#4C5B5C" strokeWidth={strokeWidth * 2} strokeDasharray="10 5" opacity={p} 
        />
      </g>
    </svg>
  );
};
