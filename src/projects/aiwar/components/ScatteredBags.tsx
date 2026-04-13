import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ScatteredBags progress={1} color="#99B898" size={300} strokeWidth={3} />
export const ScatteredBags: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', 
  size = 300, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawBag = (x: number, y: number, r: number) => {
    return (
      <g style={{ transformOrigin: `${x}px ${y}px`, transform: `rotate(${r}deg)`, opacity: p }}>
        <rect x={x} y={y} width={30} height={40} rx={5} fill={color} stroke="#2A363B" strokeWidth={strokeWidth} />
        <rect x={x+5} y={y+10} width={20} height={20} rx={2} fill="none" stroke="#2A363B" strokeWidth={strokeWidth} />
        <path d={`M ${x+10} ${y} Q ${x+15} ${y-10} ${x+20} ${y}`} fill="none" stroke="#2A363B" strokeWidth={strokeWidth} />
      </g>
    );
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {drawBag(50, 200, -30)}
      {drawBag(140, 180, 15)}
      {drawBag(220, 230, 80)}
      {drawBag(100, 250, -100)}
    </svg>
  );
};
