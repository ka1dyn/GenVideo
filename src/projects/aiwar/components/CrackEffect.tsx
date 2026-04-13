import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <CrackEffect progress={1} color="#E8A87C" size={150} strokeWidth={3} />
export const CrackEffect: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 2;

  // A shatter/crack starting from center
  const crack1 = `M ${cx} ${cy} l -30 -40 l -10 -30`;
  const crack2 = `M ${cx} ${cy} l 40 -10 l 20 20`;
  const crack3 = `M ${cx} ${cy} l 10 50 l 40 20`;
  const crack4 = `M ${cx} ${cy} l -40 20 l -20 40`;
  const crack5 = `M ${cx} ${cy} l -20 -20 l -40 10`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${crack1} ${crack2} ${crack3} ${crack4} ${crack5}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={1 - p * 0.5}
      />
    </svg>
  );
};
