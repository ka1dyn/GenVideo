import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <AnthropicLogo progress={1} color="#E8A87C" width={300} height={100} strokeWidth={3} />
export const AnthropicLogo: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  width = 300, 
  height = 100, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Anthropic Knot Logo (simplified curve) + Text
  const knot = `M 20 50 C 40 10, 80 10, 60 50 C 40 90, 80 90, 100 50`;
  const len = 200;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={knot} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <text 
        x={120} y={60} 
        fill="#2A363B" fontFamily="serif" fontSize={36} fontWeight="bold" 
        opacity={Math.max(0, p - 0.3) * 1.5}
      >
        ANTHROPIC
      </text>
    </svg>
  );
};
