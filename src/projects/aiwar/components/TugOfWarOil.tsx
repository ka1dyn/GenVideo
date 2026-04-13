import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TugOfWarOil progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const TugOfWarOil: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  // Drum
  const drum = `M 80 140 L 80 80 C 80 70, 120 70, 120 80 L 120 140 C 120 150, 80 150, 80 140 Z M 80 80 C 80 90, 120 90, 120 80`;
  const oilDrop = `M 100 150 C 95 160, 95 170, 100 170 C 105 170, 105 160, 100 150 Z`;

  // Rope and stickmen
  const ropeShift = Math.sin(p * 20) * 10;
  const rope = `M 20 110 L ${80 + ropeShift} 110 M ${120 + ropeShift} 110 L 180 110`;
  const p1 = `M 30 110 L 40 90 A 5 5 0 1 0 40 89.9 M 40 100 L 40 140 L 30 160 M 40 140 L 50 160`;
  const p2 = `M 170 110 L 160 90 A 5 5 0 1 0 160 89.9 M 160 100 L 160 140 L 150 160 M 160 140 L 170 160`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${drum} ${p1} ${p2}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path d={rope} stroke="#E8A87C" strokeWidth={strokeWidth} strokeDasharray="5 5" opacity={p} />
      <path d={oilDrop} fill="#1A1C20" opacity={p > 0.5 ? 1 : 0} />
    </svg>
  );
};
