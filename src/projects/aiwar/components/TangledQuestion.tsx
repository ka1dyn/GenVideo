import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TangledQuestion progress={1} color="#E84A5F" size={150} strokeWidth={3} />
export const TangledQuestion: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 10;

  // A random scribbled path
  const tangle = `M ${cx} ${cy} 
    C 20 20, 130 30, 100 80 
    C 70 120, 140 130, 120 40 
    C 90 -20, 20 80, 50 110 
    C 80 140, 10 100, 40 50 
    C 70 10, 150 90, 80 100`;

  // Question mark inside
  const questionPath = `M ${cx - 10} ${cy - 20} C ${cx - 10} ${cy - 40}, ${cx + 20} ${cy - 40}, ${cx + 20} ${cy - 20} C ${cx + 20} ${cy}, ${cx - 5} ${cy}, ${cx} ${cy + 15}`;
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={tangle} 
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.5}
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={questionPath} 
        fill="none" stroke={color} strokeWidth={strokeWidth * 1.5} strokeLinecap="round"
        strokeDasharray={size} strokeDashoffset={size * (1 - p)}
      />
      <circle cx={cx} cy={cy + 30} r={strokeWidth} fill={color} opacity={p} />
    </svg>
  );
};
