import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ExhaustedPerson progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const ExhaustedPerson: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 5;

  // Person slumped over a desk
  const desk = `M 10 100 L 140 100`;
  const head = `M 60 85 A 15 15 0 1 0 90 85 A 15 15 0 1 0 60 85`; // Face down
  const body = `M 75 70 C 100 40, 130 90, 130 100`; // Hunched back
  const arms = `M 75 70 C 50 80, 30 100, 30 100 M 75 70 C 90 80, 110 100, 110 100`; // Arms sprawled
  
  // Papers flying around
  const paper1 = `M 20 40 l 15 -5 l 5 15 l -15 5 z`;
  const paper2 = `M 110 30 l 15 5 l -5 15 l -15 -5 z`;
  const zz = `M 30 20 l 10 0 l -10 10 l 10 0 M 45 10 l 8 0 l -8 8 l 8 0`; // 'Z z'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${desk} ${head} ${body} ${arms}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={`${paper1} ${paper2}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={zz} 
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} strokeLinecap="round" strokeLinejoin="round" 
        opacity={Math.floor(p * 5) % 2 === 0 ? 1 : 0} 
      />
    </svg>
  );
};
