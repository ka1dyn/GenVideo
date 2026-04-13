import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ChainedClaude progress={1} color="#E8A87C" size={150} strokeWidth={3} />
export const ChainedClaude: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Wiggling/Struggling
  const struggle = Math.sin(p * 50) * 5;

  // Claude logo
  const cCurve = "M 65 65 A 15 15 0 1 0 65 85";
  const spark = "M 85 75 A 5 5 0 0 0 92.5 67.5 A 5 5 0 0 0 100 75 A 5 5 0 0 0 92.5 82.5 A 5 5 0 0 0 85 75 Z";

  // Chains/ropes wrapping
  // We use multiple lines intersecting the logo
  const chains = `
    M 30 70 Q 75 90 120 70 
    M 40 80 Q 75 100 110 80 
    M 50 60 Q 75 40 100 60
  `;
  
  // Grabbing hands from the sides
  const lHand = `M 10 75 C 30 75, 40 60, 40 70 L 30 80 Z`;
  const rHand = `M 140 75 C 120 75, 110 60, 110 70 L 120 80 Z`;

  const len = size * 3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `translateX(${struggle}px)` }}>
        {/* Claude */}
        <path d={`${cCurve} ${spark}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        {/* Chains */}
        <path 
          d={chains} 
          fill="none" stroke="#2A363B" strokeWidth={strokeWidth * 1.5} strokeLinecap="round" strokeDasharray="5 5" 
          strokeDashoffset={-p * 20} opacity={Math.max(0, p - 0.2)} 
        />
        {/* Hands */}
        <path 
          d={`${lHand} ${rHand}`} 
          fill="#F5F0EB" stroke="#2A363B" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          style={{ transformOrigin: 'center', transform: `scale(${p})` }}
        />
      </g>
    </svg>
  );
};
