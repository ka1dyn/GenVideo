import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TankSilhouette progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const TankSilhouette: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 5;

  // Armored vehicle/tank silhouette
  const treads = `M 20 100 L 130 100 L 140 85 L 130 70 L 20 70 L 10 85 Z`;
  const body = `M 30 70 L 30 50 L 110 50 L 120 70 Z`;
  const turret = `M 50 50 L 60 30 L 90 30 L 100 50 Z`;
  const gun = `M 90 40 L 140 40 L 140 45 L 90 45 Z`; // Gun barrel pointing right

  // Fills it to make a solid silhouette
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${treads} ${body} ${turret} ${gun}`} 
        fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        style={{ transformOrigin: 'center', transform: `scale(${p})` }}
      />
    </svg>
  );
};
