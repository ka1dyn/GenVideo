import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <SweptStickmen progress={1} color="#2A363B" size={400} strokeWidth={2} />
export const SweptStickmen: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 400, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawStickman = (x: number, y: number, rot: number) => (
    <g style={{ transformOrigin: `${x}px ${y-10}px`, transform: `rotate(${rot + p * 360}deg)` }}>
      <circle cx={x} cy={y-15} r={8} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <line x1={x} y1={y-7} x2={x} y2={y+15} stroke={color} strokeWidth={strokeWidth} />
      <line x1={x-10} y1={y} x2={x+10} y2={y-5} stroke={color} strokeWidth={strokeWidth} />
      <line x1={x} y1={y+15} x2={x-10} y2={y+30} stroke={color} strokeWidth={strokeWidth} />
      <line x1={x} y1={y+15} x2={x+10} y2={y+30} stroke={color} strokeWidth={strokeWidth} />
    </g>
  );

  const men = [];
  for(let i=0; i<15; i++) {
    // start on right, swept left
    const startX = size - 50 + (i*30) % 100;
    const startY = 100 + (i*40) % 200;
    const currX = startX - p * 300;
    const currY = startY + Math.sin(p * 10 + i) * 50;
    
    if (p > 0) {
      men.push(<g key={i} style={{ opacity: p > 0.9 ? (1-p)*10 : 1 }}>{drawStickman(currX, currY, i * 45)}</g>);
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {men}
    </svg>
  );
};
