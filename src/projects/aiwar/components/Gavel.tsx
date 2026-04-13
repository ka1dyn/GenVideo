import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <Gavel progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const Gavel: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Strike animation (rotates from 0 down to -45, then bounces)
  let rot = 0;
  if(p < 0.5) rot = p * 2 * -45;
  else rot = -45 + Math.sin((p - 0.5) * Math.PI * 4) * 10 * (1 - p); // damping bounce
  
  const head = `M 30 40 L 70 40 L 70 70 L 30 70 Z M 20 45 L 30 45 L 30 65 L 20 65 Z M 70 45 L 80 45 L 80 65 L 70 65 Z`;
  const handle = `M 50 70 L 50 140`;
  
  // Sound waves when hit
  const impact = `M 20 80 Q 10 90 20 100 M 5 85 Q -5 95 5 105`;

  const len = size * 3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: '80px 140px', transform: `rotate(${rot}deg)` }}>
        <path 
          d={`${head} ${handle}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        />
      </g>
      {p > 0.5 && (
        <path d={impact} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth} strokeLinecap="round" opacity={(1-p)*2} />
      )}
    </svg>
  );
};
