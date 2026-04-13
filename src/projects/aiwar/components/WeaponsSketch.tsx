import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <WeaponsSketch progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const WeaponsSketch: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  // A tank cannon / rifle sketch
  const rifle = `M 20 120 L 70 120 L 80 130 L 100 130 L 100 110 L 190 110 L 190 115 L 100 115 L 90 90 L 60 90 L 50 110 L 20 110 Z`;
  const scope = `M 80 85 L 120 85 L 120 75 L 80 75 Z M 95 85 L 95 95 M 105 85 L 105 95`;
  const cannon = `M 20 50 L 180 30 L 180 45 L 20 80 Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${rifle} ${scope} ${cannon}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.6}
      />
    </svg>
  );
};
