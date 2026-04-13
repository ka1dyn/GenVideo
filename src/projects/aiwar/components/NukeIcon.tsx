import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <NukeIcon progress={1} color="#E84A5F" size={150} strokeWidth={3} />
export const NukeIcon: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  const bomb = `M 75 20 C 50 20, 30 50, 40 100 L 45 120 L 105 120 L 110 100 C 120 50, 100 20, 75 20 Z`;
  const fins = `M 45 120 L 20 140 L 40 140 L 50 120 Z M 105 120 L 130 140 L 110 140 L 100 120 Z`;
  const logo = `M 75 60 A 15 15 0 1 0 75 59.9 M 75 90 A 5 5 0 1 0 75 89.9`; // simple radiation mark

  // Pulsing scale
  const scale = 1 + Math.sin(p * Math.PI) * 0.2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: '75px 75px', transform: `scale(${scale})`, opacity: p }}>
        <path 
          d={`${bomb} ${fins} ${logo}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
        {p > 0.5 && <path d="M 60 70 L 70 80 L 80 60 L 90 70 M 60 40 L 90 40" stroke="#FFF" strokeWidth={2} />}
      </g>
    </svg>
  );
};
