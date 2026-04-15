import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const IntroTargetGrid: React.FC<{
  progress: number;
  size?: number;
}> = ({ progress, size = 400 }) => {
  const dots = [];
  const count = 10; // 10x10 grid
  const step = size / count;
  
  for (let i = 0; i < count * count; i++) {
    const x = (i % count) * step + step / 2;
    const y = Math.floor(i / count) * step + step / 2;
    
    // threshold for this dot
    const threshold = i / (count * count);
    const isActive = progress > threshold;
    
    dots.push(
      <circle
        key={i}
        cx={x}
        cy={y}
        r={isActive ? step / 4 : step / 8}
        fill={isActive ? COLORS.PRIMARY : COLORS.STROKE_SUBTLE}
        opacity={isActive ? 1 : 0.4}
      />
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {dots}
    </svg>
  );
};
