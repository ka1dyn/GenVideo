import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
}

// @gallery: <VictimsText progress={1} color="#E84A5F" size={300} />
export const VictimsText: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 300 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  return (
    <svg width={size} height={size * 0.5} viewBox={`0 0 ${size} ${size * 0.5}`}>
      <text 
        x={size / 2} y={size * 0.4} 
        textAnchor="middle" 
        fill={color} 
        fontFamily="sans-serif" 
        fontSize={100} 
        fontWeight="900" 
        letterSpacing={-5}
        style={{ filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.2))' }}
        opacity={p}
      >
        168
      </text>
    </svg>
  );
};
