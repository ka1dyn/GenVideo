import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <BigBenStamp progress={1} color="#E84A5F" size={150} strokeWidth={3} />
export const BigBenStamp: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  if (p < 0.1) return null;
  const stampP = Math.min(1, (p - 0.1) * 2);
  const scale = 1 + (1 - stampP) * 3;
  const opacity = stampP;

  const tower = `M 60 120 L 90 120 L 90 50 L 75 20 L 60 50 Z`;
  const clock = `M 75 60 A 10 10 0 1 0 75 59.9`;
  const ring1 = `M 75 10 A 65 65 0 1 0 75 140 A 65 65 0 1 0 75 10`;
  const ring2 = `M 75 15 A 60 60 0 1 0 75 135 A 60 60 0 1 0 75 15`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: '75px 75px', transform: `scale(${scale}) rotate(-15deg)`, opacity }}>
        <path d={`${tower} ${clock} ${ring1} ${ring2}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <path d={`M 75 60 L 75 55 M 75 60 L 80 60`} stroke={color} strokeWidth={1} />
        <text x={75} y={110} textAnchor="middle" fill={color} fontFamily="serif" fontSize={14} fontWeight="bold">LONDON</text>
      </g>
    </svg>
  );
};
