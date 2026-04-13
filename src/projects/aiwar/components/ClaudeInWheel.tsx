import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ClaudeInWheel progress={1} color="#E8A87C" size={150} strokeWidth={3} />
export const ClaudeInWheel: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.45;

  // Hamster wheel
  const wheel = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;
  
  // Wheel rungs spinning
  const numRungs = 8;
  const rungs = [];
  const rotOffset = p * 360 * 2; // spin 2 times
  for(let i=0; i<numRungs; i++) {
    const angle = (i / numRungs) * Math.PI * 2 + (rotOffset * Math.PI / 180);
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    rungs.push(`M ${cx} ${cy} L ${x1} ${y1}`);
  }

  // Claude icon in center, bouncing
  const jumpY = Math.abs(Math.sin(p * Math.PI * 15)) * 10 - 5;
  const cCurve = "M 65 65 A 15 15 0 1 0 65 85";
  const spark = "M 85 75 A 5 5 0 0 0 92.5 67.5 A 5 5 0 0 0 100 75 A 5 5 0 0 0 92.5 82.5 A 5 5 0 0 0 85 75 Z";

  // Sweat drops
  const sweat = `M 95 60 Q 100 55 95 50 Q 90 55 95 60 M 60 55 Q 65 50 60 45 Q 55 50 60 55`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Wheel */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2A363B" strokeWidth={strokeWidth} opacity={p} />
      <path d={rungs.join(' ')} fill="none" stroke="#2A363B" strokeWidth={strokeWidth * 0.5} opacity={p * 0.5} />
      
      {/* Claude inside */}
      <g style={{ transform: `translateY(${jumpY}px)`, opacity: p }}>
        <path d={`${cCurve} ${spark}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        {/* Sweat */}
        <path d={sweat} fill="#99B898" opacity={Math.floor(p * 20) % 2 === 0 ? 1 : 0} />
      </g>
    </svg>
  );
};
