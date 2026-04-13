import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <FingerPress progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const FingerPress: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  // A hand pointing a finger downwards
  const finger = `M 60 70 L 60 120 A 10 10 0 0 0 80 120 L 80 80`; // index finger
  const thumb = `M 40 80 C 50 80, 55 90, 55 100 A 10 10 0 0 0 70 100`; // curved thumb
  const curledFingers = `M 80 90 A 10 10 0 0 0 100 90 L 100 80 M 100 85 A 10 10 0 0 0 120 85 L 120 70 M 120 75 A 10 10 0 0 0 140 75 L 140 60`; 
  const arm = `M 40 80 L 10 10 M 140 60 L 110 0`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: '70px 120px', transform: `translateY(${p > 0.5 ? 10 : (p * 20)}px) scale(${1 - p*0.05})` }}>
        <path 
          d={`${finger} ${thumb} ${curledFingers} ${arm}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
        />
      </g>
    </svg>
  );
};
