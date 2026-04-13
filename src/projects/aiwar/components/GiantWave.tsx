import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <GiantWave progress={1} color="#99B898" width={600} height={400} strokeWidth={3} />
export const GiantWave: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', 
  width = 600, 
  height = 400, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = width * 4;

  const wave1 = `M 0 400 Q 150 200 300 300 T 600 200 L 600 400 Z`;
  const wave2 = `M 0 400 Q 200 100 400 250 T 600 150 L 600 400 Z`; // Hokusai style tip
  const crest = `M 380 230 C 350 150, 450 50, 500 150 C 550 50, 650 100, 600 200`; // Wave curling
  const drops = `M 450 100 A 5 5 0 1 0 450 99 M 480 80 A 5 5 0 1 0 480 79 M 520 120 A 5 5 0 1 0 520 119`;

  const waveOffset = p * 100;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g style={{ transform: `translateX(${-waveOffset}px)` }}>
        <path d={wave1} fill="#4C5B5C" opacity={p * 0.5} />
        <path d={wave2} fill={color} opacity={p * 0.7} />
        <path d={`${crest} ${drops}`} fill="none" stroke="#F5F0EB" strokeWidth={strokeWidth*2} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9} />
      </g>
    </svg>
  );
};
