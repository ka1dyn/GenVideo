import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
}

// @gallery: <StormClouds progress={1} color="#1A1C20" width={400} height={200} />
export const StormClouds: React.FC<Props> = ({ 
  progress, 
  color = '#1A1C20', 
  width = 400, 
  height = 200 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Overlapping circles for clouds
  const clouds = `M 50 100 A 40 40 0 1 1 120 70 A 50 50 0 1 1 200 60 A 60 60 0 1 1 300 80 A 40 40 0 1 1 350 120 Z`;
  const clouds2 = `M 80 150 A 50 50 0 1 1 180 110 A 60 60 0 1 1 320 130 Z`;

  // Crosshatching rain
  const rain = [];
  for(let i=0; i<40; i++) {
    const x = i * 10;
    rain.push(`M ${x} 100 L ${x - 30} 300`);
    if(i%2===0) rain.push(`M ${x} 120 L ${x + 20} 300`);
  }

  const animX = (1 - p) * -50;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g style={{ transform: `translateX(${animX}px)` }}>
        <path d={clouds} fill={color} opacity={p * 0.8} />
        <path d={clouds2} fill="#4C5B5C" opacity={p * 0.9} />
        <path d={rain.join(' ')} fill="none" stroke={color} strokeWidth={1} strokeDasharray="5 5" strokeDashoffset={-p * 50} opacity={p * 0.5} />
      </g>
    </svg>
  );
};
