import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <DespairHuman progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const DespairHuman: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  // Person kneeling and holding head
  const head = `M 100 80 A 15 15 0 1 0 100 79.9`;
  const back = `M 85 90 C 60 110, 60 140, 70 160 L 90 160`;
  const arms = `M 75 105 L 110 90 M 75 110 L 115 95`;
  const legs = `M 70 160 C 90 150, 110 160, 130 160 M 100 140 L 110 160`;

  // Tombstones in bg
  const tombstones = `M 40 160 L 40 120 A 10 10 0 0 1 60 120 L 60 160 M 150 160 L 150 130 A 10 10 0 0 1 170 130 L 170 160`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${head} ${back} ${arms} ${legs}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
      />
      <path 
        d={tombstones} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth*0.5} 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.5}
      />
    </svg>
  );
};
