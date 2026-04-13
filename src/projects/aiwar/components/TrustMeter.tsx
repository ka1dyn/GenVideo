import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TrustMeter progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const TrustMeter: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Box and arc
  const box = `M 30 140 L 170 140 L 160 80 L 40 80 Z`;
  const arc = `M 60 70 A 40 40 0 0 1 140 70`;
  const ticks = `M 70 50 L 75 55 M 100 40 L 100 45 M 130 50 L 125 55`;

  // needle wiggling
  const needleRot = -45 + Math.sin(p * 50) * 80;

  const len = size * 3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${box} ${arc} ${ticks}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8}
      />
      <text x={100} y={110} textAnchor="middle" fill={color} fontFamily="monospace" fontSize={16} fontWeight="bold" opacity={p}>TRUST</text>
      <text x={100} y={30} textAnchor="middle" fill="#E84A5F" fontFamily="monospace" fontSize={24} fontWeight="900" opacity={p > 0.5 ? 1 : 0}>?</text>
      
      {/* Needle */}
      <g style={{ transformOrigin: '100px 75px', transform: `rotate(${needleRot}deg)` }}>
        <line x1={100} y1={75} x2={100} y2={45} stroke="#E84A5F" strokeWidth={strokeWidth * 1.5} opacity={p} strokeLinecap="round" />
        <circle cx={100} cy={75} r={5} fill={color} opacity={p} />
      </g>
    </svg>
  );
};
