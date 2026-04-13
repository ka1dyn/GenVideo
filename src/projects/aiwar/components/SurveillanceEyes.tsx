import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <SurveillanceEyes progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const SurveillanceEyes: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawEye = (x: number, y: number, r: number, delay: number, i: number) => {
    const eyeP = Math.max(0, Math.min(1, (p - delay) * 2));
    const len = r * 8;
    const lid = `M ${x - r} ${y} Q ${x} ${y - r*1.5} ${x + r} ${y} Q ${x} ${y + r*1.5} ${x - r} ${y}`;
    const pupilX = x + Math.sin(p * 5 + i) * (r * 0.3); // wandering eyes
    return (
      <g key={i}>
        <path 
          d={lid} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - eyeP)}
        />
        <circle cx={pupilX} cy={y} r={r * 0.3} fill={color} opacity={eyeP} />
      </g>
    );
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {drawEye(40, 40, 20, 0, 1)}
      {drawEye(110, 60, 25, 0.2, 2)}
      {drawEye(70, 110, 15, 0.4, 3)}
      {drawEye(130, 120, 10, 0.5, 4)}
    </svg>
  );
};
