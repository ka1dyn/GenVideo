import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <StudyBook progress={1} color="#2A363B" size={300} strokeWidth={3} />
export const StudyBook: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 300, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  const bookLeft = `M 150 250 C 100 280, 50 250, 30 200 L 30 80 C 50 130, 100 160, 150 130 Z`;
  const bookRight = `M 150 250 C 200 280, 250 250, 270 200 L 270 80 C 250 130, 200 160, 150 130 Z`;
  const pages = `M 40 190 Q 100 220 150 200 M 150 200 Q 200 220 260 190 M 50 180 Q 100 210 150 190 M 150 190 Q 200 210 250 180`;
  const spine = `M 150 130 L 150 250`;

  // Magnifying glass over it
  const glass = `M 180 120 A 30 30 0 1 1 180 119.9 M 205 145 L 230 170`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${bookLeft} ${bookRight} ${pages} ${spine}`} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
      />
      <g style={{ transform: `scale(${p})`, transformOrigin: '200px 140px' }}>
        <path d={glass} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth} strokeLinecap="round" />
        <circle cx={180} cy={120} r={28} fill="#99B898" opacity={0.2} />
      </g>
    </svg>
  );
};
