import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <GiantRobotHand progress={1} color="#2A363B" size={400} strokeWidth={5} />
export const GiantRobotHand: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 400, 
  strokeWidth = 5 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Hand coming from top down
  const dropY = (1 - p) * -300;
  
  const palm = `M 150 100 L 250 100 L 270 200 M 130 200 L 150 100`;
  const fingers = `
    M 130 200 L 100 280 L 80 250
    M 170 210 L 150 300 L 130 280
    M 210 210 L 200 310 L 190 290
    M 250 200 L 260 270 L 280 250
  `;
  const joints = `M 150 200 A 10 10 0 1 0 150 199.9 M 190 205 A 10 10 0 1 0 190 204.9 M 230 205 A 10 10 0 1 0 230 204.9`;

  const len = size * 5;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translateY(${dropY}px)` }}>
        <path 
          d={`${palm} ${fingers} ${joints}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
        />
        {/* Glowing nuke emblem on back of hand */}
        <circle cx={200} cy={150} r={20} fill="#E84A5F" opacity={p > 0.5 ? Math.sin(p*20)*0.5 + 0.5 : 0} />
      </g>
    </svg>
  );
};
