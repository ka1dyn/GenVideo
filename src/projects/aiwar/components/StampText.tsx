import React from 'react';

interface Props {
  progress: number;
  color?: string;
  text: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <StampText progress={1} color="#E84A5F" text="TOP SECRET" size={200} strokeWidth={4} />
export const StampText: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  text, 
  size = 200, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Stamping pop scale effect inside
  const scale = p < 0.8 ? 2 - p : 1 + (1 - p) * 0.5;
  const opacity = p;

  return (
    <svg width={size} height={size * 0.5} viewBox={`0 0 ${size} ${size * 0.5}`} style={{ transform: `scale(${scale})`, opacity }}>
      <rect 
        x={10} y={10} width={size - 20} height={size * 0.5 - 20} rx={10} 
        fill="none" stroke={color} strokeWidth={strokeWidth} 
        strokeDasharray="15 5" 
      />
      <rect 
        x={15} y={15} width={size - 30} height={size * 0.5 - 30} rx={5} 
        fill="none" stroke={color} strokeWidth={strokeWidth / 2} 
      />
      <text 
        x={size / 2} y={size * 0.25 + 10} 
        textAnchor="middle" fill={color} fontFamily="monospace" fontSize={size * 0.15} fontWeight="heavy" letterSpacing={2}
      >
        {text}
      </text>
    </svg>
  );
};
