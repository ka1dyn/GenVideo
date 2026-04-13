import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <CampingCarSilhouette progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const CampingCarSilhouette: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Camping car / Minivan silhouette
  const body = `M 20 100 L 130 100 L 140 70 L 110 40 L 40 40 L 20 60 Z`;
  const wheel1 = `M 35 100 A 10 10 0 1 0 55 100 A 10 10 0 1 0 35 100`;
  const wheel2 = `M 95 100 A 10 10 0 1 0 115 100 A 10 10 0 1 0 95 100`;
  const window = `M 50 45 L 100 45 L 115 65 L 50 65 Z`; // Cutout for window
  const surfboard = `M 30 35 L 120 35 L 125 30 L 30 30 Z`; // Something distinct on top

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${p})` }}>
        <path 
          d={`${body} ${wheel1} ${wheel2} ${surfboard}`} 
          fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        />
        <path d={window} fill="#F5F0EB" />
      </g>
    </svg>
  );
};
