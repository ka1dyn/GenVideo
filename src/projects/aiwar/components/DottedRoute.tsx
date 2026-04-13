import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <DottedRoute progress={1} color="#E84A5F" width={200} height={150} strokeWidth={3} />
export const DottedRoute: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  width = 200, 
  height = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = width * 2;

  // Winding path
  const route = `M 20 ${height - 20} Q 50 ${height - 50} 80 ${height - 40} T 150 50 Q 180 20 180 20`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={route} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray="8 8" strokeDashoffset={len * (1 - p)} opacity={p}
      />
      {/* End point marker */}
      {p > 0.9 && <circle cx={180} cy={20} r={5} fill={color} />}
      {p > 0 && <circle cx={20} cy={height - 20} r={4} fill={color} />}
    </svg>
  );
};
