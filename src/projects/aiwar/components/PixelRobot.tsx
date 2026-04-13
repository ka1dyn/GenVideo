import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <PixelRobot progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const PixelRobot: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  const head = `M 50 50 L 150 50 L 150 150 L 50 150 Z`;
  const antenna = `M 100 50 L 100 20 M 90 20 L 110 20`;
  const eyes = `M 70 80 L 90 80 M 110 80 L 130 80`;
  const mouth = `M 70 120 L 130 120`;

  const glow = Math.floor(p * 20) % 2 === 0 ? 1 : 0.5;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `scale(${p})`, transformOrigin: 'center' }}>
        <path d={`${head} ${antenna}`} fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter" />
        {/* Pixel style eyes and mouth */}
        <path d={`${eyes} ${mouth}`} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth * 2} strokeLinecap="square" opacity={glow} />
      </g>
    </svg>
  );
};
