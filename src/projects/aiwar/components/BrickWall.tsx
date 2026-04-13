import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <BrickWall progress={1} color="#4C5B5C" width={100} height={200} strokeWidth={2} />
export const BrickWall: React.FC<Props> = ({ 
  progress, 
  color = '#4C5B5C', 
  width = 100, 
  height = 200, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Draw bricks from bottom to top
  const rows = Math.floor(height / 20);
  const bricks = [];
  
  for(let i=0; i<rows; i++) {
    const y = height - (i + 1) * 20;
    const rowP = Math.max(0, Math.min(1, (p * rows) - i));
    
    if (rowP > 0) {
      bricks.push(
        <g key={i}>
          <rect x={0} y={y} width={width} height={20} fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} opacity={rowP} />
          {/* Brick lines */}
          <line x1={width/3} y1={y} x2={width/3} y2={y+20} stroke={color} strokeWidth={strokeWidth} opacity={rowP} />
          <line x1={width*2/3} y1={y} x2={width*2/3} y2={y+20} stroke={color} strokeWidth={strokeWidth} opacity={rowP} />
        </g>
      );
    }
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {bricks}
    </svg>
  );
};
