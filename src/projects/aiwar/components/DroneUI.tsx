import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <DroneUI progress={1} color="#E84A5F" size={200} strokeWidth={2} />
export const DroneUI: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B',  // usually black/green, let's use ink
  size = 200, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  
  // Camera Corners
  const bracketSize = size * 0.15;
  const tL = `M ${bracketSize} 10 L 10 10 L 10 ${bracketSize}`;
  const tR = `M ${size - bracketSize} 10 L ${size - 10} 10 L ${size - 10} ${bracketSize}`;
  const bL = `M ${bracketSize} ${size - 10} L 10 ${size - 10} L 10 ${size - bracketSize}`;
  const bR = `M ${size - bracketSize} ${size - 10} L ${size - 10} ${size - 10} L ${size - 10} ${size - bracketSize}`;

  // Crosshair
  const crosshair = `M ${cx} ${cy - 20} L ${cx} ${cy - 5} M ${cx} ${cy + 5} L ${cx} ${cy + 20} M ${cx - 20} ${cy} L ${cx - 5} ${cy} M ${cx + 5} ${cy} L ${cx + 20} ${cy}`;
  
  const len = size * 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${tL} ${tR} ${bL} ${bR} ${crosshair}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.6}
      />
      {/* REC button blinking */}
      <circle cx={30} cy={30} r={5} fill="#E84A5F" opacity={Math.floor(p * 20) % 2 === 0 ? 1 : 0} />
      <text x={45} y={34} fill={color} fontSize={12} fontFamily="monospace" fontWeight="bold" opacity={p}>REC</text>
    </svg>
  );
};
