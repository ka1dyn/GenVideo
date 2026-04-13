import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <MissileIcon progress={1} color="#E84A5F" size={100} strokeWidth={2} />
export const MissileIcon: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 100, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  const body = `M 40 20 L 60 20 L 70 60 L 30 60 Z M 50 5 L 40 20 L 60 20 Z`; // Nose and cylinder
  const fins1 = `M 30 60 L 20 80 L 35 80 L 40 60 Z`;
  const fins2 = `M 70 60 L 80 80 L 65 80 L 60 60 Z`;
  const exhaust = `M 40 80 L 60 80 L 55 90 L 45 90 Z`;
  const fire = `M 45 90 L 50 100 L 55 90 Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${p}) translateY(${10 - p * 10}px)` }}>
        <path 
          d={`${body} ${fins1} ${fins2} ${exhaust}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        />
        <path d={fire} fill="#E8A87C" stroke="#E8A87C" strokeWidth={strokeWidth} strokeLinejoin="round" opacity={Math.floor(p * 20) % 2 === 0 ? 1 : 0} />
      </g>
    </svg>
  );
};
