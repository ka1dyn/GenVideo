import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <PickupTruck progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const PickupTruck: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // A dusty pickup truck silhouette
  const body = `M 10 90 L 40 90 L 40 60 L 80 60 L 100 80 L 130 80 L 140 100 L 10 100 Z`; // Base body
  const wheel1 = `M 25 100 A 10 10 0 1 0 45 100 A 10 10 0 1 0 25 100`;
  const wheel2 = `M 100 100 A 10 10 0 1 0 120 100 A 10 10 0 1 0 100 100`;
  const window = `M 45 65 L 75 65 L 85 80 L 45 80 Z`; // Cab window
  
  const gunMount = `M 15 90 L 15 50 L 30 50 M 15 55 L 40 55 M 25 50 L 25 45 L 50 40`; // A mounted turret or antenna in bed
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${p})` }}>
        <path 
          d={`${body} ${wheel1} ${wheel2}`} 
          fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        />
        <path d={window} fill="#F5F0EB" />
        <path d={gunMount} fill="none" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
      </g>
    </svg>
  );
};
