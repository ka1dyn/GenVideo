import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <Satellite progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const Satellite: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  // Main body
  const body = `M 60 60 L 90 60 L 90 90 L 60 90 Z`;
  const dish = `M 75 60 L 65 40 Q 75 30 85 40 Z`; // Radar dish on top
  const dishRod = `M 75 60 L 75 45`;

  // Solar panels
  const leftPanel = `M 20 65 L 50 65 L 55 85 L 25 85 Z`;
  const rightPanel = `M 100 65 L 130 65 L 125 85 L 95 85 Z`;
  // Panel grids
  const lGrid = `M 35 65 L 40 85 M 25 75 L 50 75`;
  const rGrid = `M 115 65 L 110 85 M 100 75 L 125 75`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${p}) rotate(${p * 20 - 10}deg)` }}>
        <path 
          d={`${body} ${dish} ${dishRod} ${leftPanel} ${rightPanel} ${lGrid} ${rGrid}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
        {/* Signal sending down */}
        <path d="M 65 110 Q 75 120 85 110 M 55 125 Q 75 140 95 125" fill="none" stroke="#E84A5F" strokeWidth={strokeWidth * 0.5} opacity={Math.floor(p * 15) % 2 === 0 ? 1 : 0} />
      </g>
    </svg>
  );
};
