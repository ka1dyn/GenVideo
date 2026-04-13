import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TrackingBox progress={1} color="#E84A5F" size={150} strokeWidth={4} />
export const TrackingBox: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, Math.min(1, progress * 1.5))); // animate in faster
  const cx = size / 2;
  const cy = size / 2;

  // Four corner brackets
  const m = 10;
  const w = size - 20;
  const b = 25; // bracket leg len
  const topLeft = `M ${m+b} ${m} L ${m} ${m} L ${m} ${m+b}`;
  const topRight = `M ${m+w-b} ${m} L ${m+w} ${m} L ${m+w} ${m+b}`;
  const bottomLeft = `M ${m+b} ${m+w} L ${m} ${m+w} L ${m} ${m+w-b}`;
  const bottomRight = `M ${m+w-b} ${m+w} L ${m+w} ${m+w} L ${m+w} ${m+w-b}`;

  const len = size * 2;
  
  // Tracking text blinking
  const textFlash = Math.floor(progress * 15) % 2 === 0 ? 1 : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${1.2 - p*0.2})` }}>
        <path 
          d={`${topLeft} ${topRight} ${bottomLeft} ${bottomRight}`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8}
        />
        <text 
          x={cx} y={m - 5} textAnchor="middle" fill={color} fontFamily="monospace" fontSize={16} fontWeight="bold" 
          opacity={textFlash * p}
        >
          TRACKING
        </text>
      </g>
    </svg>
  );
};
