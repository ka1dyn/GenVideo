import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <LaunchButton progress={1} color="#E84A5F" size={150} strokeWidth={4} />
export const LaunchButton: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 5;

  const base = `M 30 100 L 120 100 L 130 130 L 20 130 Z`;
  const button = `M 40 100 C 40 50, 110 50, 110 100 Z`;
  
  // Pressing animation down
  const pressY = p * 10;
  const pressedButton = `M 40 100 C 40 ${60 + pressY}, 110 ${60 + pressY}, 110 100 Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path d={base} fill="none" stroke="#2A363B" strokeWidth={strokeWidth} strokeLinejoin="round" opacity={0.6} strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      <path d={p > 0.5 ? pressedButton : button} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      <text x={75} y={120} textAnchor="middle" fill="#2A363B" fontFamily="monospace" fontWeight="bold" fontSize={16} opacity={p}>LAUNCH</text>
    </svg>
  );
};
