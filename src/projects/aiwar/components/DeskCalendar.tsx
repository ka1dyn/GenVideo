import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <DeskCalendar progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const DeskCalendar: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  
  const base = `M 20 130 L 130 130 L 110 40 L 40 40 Z M 15 130 L 135 130`;
  const rings = `M 50 30 L 50 45 M 75 30 L 75 45 M 100 30 L 100 45`;
  const paper = `M 40 40 L 110 40 L 125 110 L 25 110 Z`;
  
  const len = size * 5;

  // Paper flipping animation
  const paperX = 25 - p * 50; 
  const paperY = 110 + p * 30;
  const paperRot = p * -45;
  const flippedPaperPath = `M 40 40 L 110 40 L ${125 + paperX} ${paperY} L ${paperX} ${paperY} Z`;

  // Year goes 2024 -> 2017 rapidly
  const currentYear = Math.floor(2024 - p * 7);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${base} ${rings}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      {/* Underlying paper */}
      <path d={paper} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={p} />
      <text x={cx} y={85} textAnchor="middle" fill={color} fontSize={28} fontWeight="bold" opacity={p}>{currentYear}</text>
      
      {/* Tearing top paper */}
      {p > 0 && p < 1 && (
        <path d={flippedPaperPath} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={1 - p} style={{ transformOrigin: '75px 40px', transform: `rotate(${paperRot}deg)` }} />
      )}
    </svg>
  );
};
