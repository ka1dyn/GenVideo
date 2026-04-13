import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <LargeQuestionMark progress={1} color="#E84A5F" size={150} strokeWidth={5} />
export const LargeQuestionMark: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 5 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 3;

  const qPath = `M ${cx - 20} ${cy - 20} C ${cx - 20} ${cy - 60}, ${cx + 40} ${cy - 60}, ${cx + 40} ${cy - 20} C ${cx + 40} ${cy + 10}, ${cx} ${cy + 10}, ${cx} ${cy + 40}`;
  
  // Flash effect
  const opacity = Math.floor(p * 15) % 2 === 0 ? 1 : 0.3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity: p === 1 ? opacity : 1 }}>
      <path 
        d={qPath} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <circle cx={cx} cy={cy + 60} r={strokeWidth} fill={color} opacity={p} />
    </svg>
  );
};
