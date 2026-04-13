import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ProhibitedMark progress={1} color="#E84A5F" size={150} strokeWidth={6} />
export const ProhibitedMark: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 6 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;
  const len = r * 2 * Math.PI + r * 2;

  // Stomp effect (scale from 3 -> 1)
  const scale = p < 0.8 ? 2 - p * 1.25 : 1;

  const circle = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;
  const slash = `M ${cx - r * 0.707} ${cy - r * 0.707} L ${cx + r * 0.707} ${cy + r * 0.707}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${scale})`, opacity: p }}>
        <path 
          d={`${circle} ${slash}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        />
        <circle cx={cx} cy={cy} r={r} fill={color} opacity={0.1} />
      </g>
    </svg>
  );
};
