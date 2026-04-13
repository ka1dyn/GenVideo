import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <SignboardChange progress={1} color="#2A363B" width={300} height={150} strokeWidth={3} />
export const SignboardChange: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 300, 
  height = 150,
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const board = `M 20 20 L 280 20 L 280 120 L 20 120 Z`;
  const len = width * 3;

  // text erase / write effect
  const originalOpacity = p < 0.5 ? 1 - p * 2 : 0;
  const newOpacity = p > 0.5 ? (p - 0.5) * 2 : 0;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={board} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
      />
      <text x={150} y={85} textAnchor="middle" fill="#99B898" fontFamily="sans-serif" fontSize={48} fontWeight="bold" opacity={originalOpacity}>HOSPITAL</text>
      
      {/* the new text is written sloppily in red */}
      <text x={150} y={85} textAnchor="middle" fill="#E84A5F" fontFamily="Marker Felt, cursive, sans-serif" fontSize={48} fontWeight="bold" opacity={newOpacity}>ARMORY</text>
      
      {/* scratch marks */}
      {p > 0.3 && p < 0.7 && (
        <path d={`M 50 70 L 250 80 M 60 85 L 240 70`} stroke="#2A363B" strokeWidth={strokeWidth * 1.5} opacity={1 - Math.abs(p - 0.5)*2} strokeLinecap="round" />
      )}
    </svg>
  );
};
