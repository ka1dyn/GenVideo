import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <FallingLetters progress={1} color="#2A363B" size={400} strokeWidth={2} />
export const FallingLetters: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 400, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawLetter = (x: number, y: number, rot: number, delay: number, i: number) => {
    const fallP = Math.max(0, Math.min(1, p * 2 - delay));
    if (fallP === 0) return null;
    
    const currY = y - (1 - Math.pow(fallP, 2)) * 300;
    
    return (
      <g key={i} style={{ transformOrigin: `${x}px ${currY}px`, transform: `rotate(${rot}deg)` }}>
        <rect x={x-20} y={currY-15} width={40} height={30} fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <path d={`M ${x-20} ${currY-15} L ${x} ${currY} L ${x+20} ${currY-15}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        {/* specific letters get a seal */}
        {i % 3 === 0 && <circle cx={x} cy={currY} r={4} fill="#E84A5F" />}
      </g>
    );
  };

  const letters = [];
  for(let i=0; i<30; i++) {
    // stable pseudorandom
    const x = 50 + (i * 87) % (size - 100);
    const y = size - 30 - ((i * 43) % 150);
    const rot = -30 + (i * 17) % 60;
    const delay = i / 30;
    letters.push(drawLetter(x, y, rot, delay, i));
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {letters}
    </svg>
  );
};
