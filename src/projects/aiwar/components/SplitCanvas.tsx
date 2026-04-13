import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <SplitCanvas progress={1} color="#2A363B" width={300} height={200} strokeWidth={2} />
export const SplitCanvas: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 300, 
  height = 200, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const w = width;
  const h = height;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Outer Border */}
      <rect 
        x={2} y={2} width={w - 4} height={h - 4} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={w*2 + h*2} strokeDashoffset={(w*2 + h*2) * (1 - p)} 
      />
      {/* Split Lines for 3 sections */}
      <line x1={w / 3} y1={0} x2={w / 3} y2={h * p} stroke={color} strokeWidth={strokeWidth} />
      <line x1={(w * 2) / 3} y1={0} x2={(w * 2) / 3} y2={h * p} stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
};
