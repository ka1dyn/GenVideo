import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <PentagonBuilding progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const PentagonBuilding: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 5;

  // Draw 2 pentagons (outer, inner) layout
  const pi5 = Math.PI * 2 / 5;
  const getPenta = (r: number) => {
    return Array.from({length: 6}).map((_, i) => {
      const a = i * pi5 - Math.PI / 2;
      return `${i === 0 ? 'M' : 'L'} ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
    }).join(' ');
  }

  const outer = getPenta(60);
  const mid = getPenta(40);
  const inner = getPenta(20);

  const lines = Array.from({length: 5}).map((_, i) => {
    const a = i * pi5 - Math.PI / 2;
    return `M ${cx + 20 * Math.cos(a)} ${cy + 20 * Math.sin(a)} L ${cx + 60 * Math.cos(a)} ${cy + 60 * Math.sin(a)}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${outer} ${mid} ${inner} ${lines}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
    </svg>
  );
};
