import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <JournalistMic progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const JournalistMic: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  const micHead = `M 50 50 A 25 25 0 1 0 100 50 A 25 25 0 1 0 50 50`;
  const mesh = `M 60 30 L 60 70 M 75 25 L 75 75 M 90 30 L 90 70 M 55 40 L 95 40 M 55 60 L 95 60`;
  const handle = `M 65 75 L 65 140 L 85 140 L 85 75 Z`;
  const cord = `M 75 140 Q 75 150 90 145 T 120 140`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${micHead} ${mesh} ${handle} ${cord}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
    </svg>
  );
};
