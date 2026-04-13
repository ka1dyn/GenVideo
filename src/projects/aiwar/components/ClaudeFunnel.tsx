import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ClaudeFunnel progress={1} color="#E8A87C" size={150} strokeWidth={3} />
export const ClaudeFunnel: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const len = size * 5;

  // Funnel shape
  const funnel = `M 20 20 L 130 20 L 95 80 L 95 130 L 55 130 L 55 80 Z`;
  const opening = `M 20 20 Q 75 -10 130 20 Q 75 50 20 20`; // Oval opening

  // Anthropic logo loosely sketched in the middle
  const cCurve = "M 65 95 A 10 10 0 1 0 65 115";
  const spark = "M 80 105 A 5 5 0 0 0 85 100 A 5 5 0 0 0 90 105 A 5 5 0 0 0 85 110 A 5 5 0 0 0 80 105 Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${funnel} ${opening}`} 
        fill="none" stroke="#2A363B" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={p}
      />
      <path 
        d={`${cCurve} ${spark}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" strokeLinejoin="round" 
        opacity={Math.max(0, p - 0.5) * 2}
      />
    </svg>
  );
};
