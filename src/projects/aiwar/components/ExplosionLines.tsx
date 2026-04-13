import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ExplosionLines progress={1} color="#E84A5F" size={200} strokeWidth={4} />
export const ExplosionLines: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 200, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;

  // Simple expanding mushroom lines
  const linesCount = 16;
  const maxRadius = size * 0.4;
  const currentRadius = maxRadius * p;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* expanding shockwave */}
      <circle cx={cx} cy={cy} r={currentRadius} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={1 - p} />
      <circle cx={cx} cy={cy} r={currentRadius * 0.5} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={(1 - p) * 0.5} />
      
      {/* explosion splinters */}
      {[...Array(linesCount)].map((_, i) => {
        const angle = (i * Math.PI * 2) / linesCount;
        const x1 = cx + currentRadius * Math.cos(angle) * 0.3;
        const y1 = cy + currentRadius * Math.sin(angle) * 0.3;
        const x2 = cx + currentRadius * Math.cos(angle);
        const y2 = cy + currentRadius * Math.sin(angle);
        return (
          <line 
            key={i} 
            x1={x1} y1={y1} 
            x2={x2} y2={y2} 
            stroke={color} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            opacity={1 - p * 0.8}
          />
        );
      })}
    </svg>
  );
};
