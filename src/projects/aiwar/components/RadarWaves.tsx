import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <RadarWaves progress={1} color="#99B898" size={150} strokeWidth={2} />
export const RadarWaves: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', 
  size = 150, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;

  // Expanding animated radar circles
  const maxR = size * 0.45;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={2} fill={color} opacity={p} />
      {[0, 0.33, 0.66].map((offset, i) => {
        const radP = (p * 2 + offset) % 1;
        return (
          <circle 
            key={i} cx={cx} cy={cy} 
            r={radP * maxR} 
            fill="none" stroke={color} strokeWidth={strokeWidth} 
            opacity={(1 - radP) * p} 
          />
        );
      })}
    </svg>
  );
};
