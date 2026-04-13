import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <MultiplierStamp progress={1} color="#E84A5F" size={200} strokeWidth={4} />
export const MultiplierStamp: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 200, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Big stamp popping in
  const scale = p < 0.8 ? 2.5 - p * 1.5 : 1 + Math.sin((p - 0.8) * Math.PI * 5) * 0.1;
  const opacity = p === 0 ? 0 : 1;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${scale}) rotate(-10deg)`, opacity }}>
        <path 
          d={`M 10 30 Q 50 10 190 30 Q 180 90 190 170 Q 100 190 10 170 Q 20 100 10 30`} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray="20 10 5 10" 
        />
        <text x={size/2} y={size/2 + 20} textAnchor="middle" fill={color} fontFamily="monospace" fontSize={60} fontWeight="900" letterSpacing={-2} style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.1))' }}>
          x 100
        </text>
      </g>
    </svg>
  );
};
