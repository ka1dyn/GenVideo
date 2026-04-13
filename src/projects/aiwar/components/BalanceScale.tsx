import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <BalanceScale progress={1} color="#2A363B" width={400} height={300} strokeWidth={4} />
export const BalanceScale: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 400, 
  height = 300, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const base = `M 200 280 L 150 280 L 200 100 L 250 280 Z`;
  
  // Wiggle balance scale
  const angle = p < 0.8 ? Math.sin(p * 20) * 10 : 0;
  
  const arm = `M 50 100 L 350 100`;
  const panLeft = `M 50 100 L 20 180 L 80 180 Z`;
  const panRight = `M 350 100 L 320 180 L 380 180 Z`;

  // Draw human head
  const human = `M 50 170 A 10 10 0 1 0 50 169.9 M 50 180 Q 30 140 70 140 Z`;
  // Draw robot head
  const robot = `M 335 150 L 365 150 L 365 180 L 335 180 Z M 345 160 A 2 2 0 1 0 345 159.9 M 355 160 A 2 2 0 1 0 355 159.9 M 340 170 L 360 170`;

  const len = 1000;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={base} fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      
      <g style={{ transformOrigin: '200px 100px', transform: `rotate(${angle}deg)` }}>
        <path d={arm} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d={`${panLeft} ${panRight}`} fill="#D1D5DB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        
        <path d={human} fill="none" stroke="#E84A5F" strokeWidth={2} opacity={p} />
        <path d={robot} fill="none" stroke="#99B898" strokeWidth={2} strokeLinejoin="round" opacity={p} />
      </g>
    </svg>
  );
};
