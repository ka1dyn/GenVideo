import React from 'react';

interface Props {
  progress: number;
  color?: string; // background color to obscure
  width?: number;
  height?: number;
}

// @gallery: <ClipPathExpand progress={1} color="#1A1C20" width={400} height={300} />
export const ClipPathExpand: React.FC<Props> = ({ 
  progress, 
  color = '#1A1C20', // dark thriller color
  width = 400, 
  height = 300 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Creates a jagged, expanding circular ink blot
  const maxR = Math.max(width, height) * 1.5;
  const currentR = p * maxR;

  // We can use an SVG filter or just a jagged polygon path
  const points = 16;
  const pathData = Array.from({length: points+1}).map((_, i) => {
    const angle = (i / points) * Math.PI * 2;
    // Add jitter
    const jitter = 1 + (Math.sin(i * 12345) * 0.2); 
    const r = currentR * jitter;
    const x = width / 2 + Math.cos(angle) * r;
    const y = height / 2 + Math.sin(angle) * r;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ') + ' Z';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={pathData} fill={color} opacity={p * 0.8} />
    </svg>
  );
};
