import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
  count?: number;
}

// @gallery: <StickmanCrowd progress={1} color="#2A363B" size={300} strokeWidth={2} count={50} />
export const StickmanCrowd: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 300, 
  strokeWidth = 2,
  count = 50 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Random stickmen layout
  const gridW = Math.ceil(Math.sqrt(count));
  const spacing = size / gridW;
  
  const drawStickman = (x: number, y: number, scale: number, i: number) => {
    // A single simple stickman path
    const headScale = scale * 4;
    const path = `M ${x} ${y + headScale} L ${x} ${y + scale * 15} M ${x - scale * 5} ${y + scale * 8} L ${x + scale * 5} ${y + scale * 8} M ${x} ${y + scale * 15} L ${x - scale * 6} ${y + scale * 25} M ${x} ${y + scale * 15} L ${x + scale * 6} ${y + scale * 25}`;
    
    return (
      <g key={i}>
        <circle cx={x} cy={y} r={headScale} fill="none" stroke={color} strokeWidth={strokeWidth} />
        <path d={path} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  };

  const crowd = [];
  // Use a seeded or deterministic approach based on index so it doesn't flicker on re-renders
  for (let i = 0; i < count; i++) {
    const col = i % gridW;
    const row = Math.floor(i / gridW);
    // Add some pseudo-random jitter
    const jitterX = (Math.sin(i * 123) * 0.4) * spacing;
    const jitterY = (Math.cos(i * 321) * 0.4) * spacing;
    crowd.push(drawStickman(col * spacing + spacing / 2 + jitterX, row * spacing + spacing / 2 + jitterY, spacing * 0.05, i));
  }

  // Draw them incrementally
  const visibleCount = Math.floor(p * count);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {crowd.slice(0, visibleCount)}
    </svg>
  );
};
