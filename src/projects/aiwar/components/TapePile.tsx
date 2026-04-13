import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TapePile progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const TapePile: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 5;

  // A pile of VHS tapes and film reels
  const tape1 = `M 20 120 L 80 120 L 70 90 L 10 90 Z M 25 100 C 35 100, 35 110, 45 110 C 55 110, 55 100, 65 100`;
  const tape2 = `M 60 110 L 130 110 L 140 80 L 70 80 Z`;
  const reel1 = `M 40 70 A 20 20 0 1 0 80 70 A 20 20 0 1 0 40 70 M 50 70 A 10 10 0 1 0 70 70 A 10 10 0 1 0 50 70`;
  const reel2 = `M 90 60 A 25 25 0 1 0 140 60 A 25 25 0 1 0 90 60`;
  const spilledFilm = `M 80 90 Q 100 130 120 120 T 140 140`;
  const tape3 = `M 50 50 L 100 50 L 95 30 L 45 30 Z`;

  // Draw progressively from bottom to top
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${tape1} ${tape2}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={`${reel1} ${reel2} ${spilledFilm}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - Math.max(0, (p - 0.3) * 1.5))}
      />
      <path 
        d={tape3} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - Math.max(0, (p - 0.6) * 2.5))}
      />
    </svg>
  );
};
