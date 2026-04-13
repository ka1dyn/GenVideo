import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <DateCalendar progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const DateCalendar: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  const box = `M 20 40 L 130 40 L 130 130 L 20 130 Z`;
  const ring1 = `M 40 30 L 40 50 M 50 30 L 50 50`;
  const ring2 = `M 100 30 L 100 50 M 110 30 L 110 50`;
  const line = `M 20 65 L 130 65`;

  // Draw circle around 28
  const circle = `M 80 80 C 100 70, 110 100, 90 120 C 70 110, 60 90, 80 80`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${box} ${ring1} ${ring2} ${line}`} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <text x={75} y={57} textAnchor="middle" fill="#E84A5F" fontFamily="monospace" fontSize={14} fontWeight="bold" opacity={p}>FEB</text>
      <text x={75} y={110} textAnchor="middle" fill={color} fontFamily="monospace" fontSize={48} fontWeight="900" opacity={p}>28</text>
      
      {p > 0.5 && (
        <path d={circle} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth * 1.5} strokeLinecap="round" 
          strokeDasharray={200} strokeDashoffset={200 * (1 - (p-0.5)*2)} />
      )}
    </svg>
  );
};
