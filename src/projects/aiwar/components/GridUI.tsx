import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <GridUI progress={1} color="#99B898" size={200} strokeWidth={1} />
export const GridUI: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', 
  size = 200, 
  strokeWidth = 1 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Tactical coordinate grid overlay
  const step = 20;
  const lines = [];
  for(let i = step; i < size; i += step) {
    // horizontal
    lines.push(`M 0 ${i} L ${size} ${i}`);
    // vertical
    lines.push(`M ${i} 0 L ${i} ${size}`);
  }

  // Crosshairs
  const cx = size / 2;
  const cy = size / 2;
  const crosshair = `M ${cx - 40} ${cy} L ${cx - 10} ${cy} M ${cx + 10} ${cy} L ${cx + 40} ${cy} M ${cx} ${cy - 40} L ${cx} ${cy - 10} M ${cx} ${cy + 10} L ${cx} ${cy + 40}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity: p }}>
      <path 
        d={lines.join(' ')} 
        fill="none" stroke={color} strokeWidth={strokeWidth} opacity={0.3}
      />
      <path 
        d={crosshair} 
        fill="none" stroke={color} strokeWidth={strokeWidth * 2} strokeLinecap="round" 
        style={{ transformOrigin: 'center', transform: `scale(${p})` }}
      />
      <circle cx={cx} cy={cy} r={size * 0.4} fill="none" stroke={color} strokeWidth={strokeWidth} opacity={0.3} />
      {/* Random coordinate labels */}
      <text x={10} y={20} fill={color} fontSize={10} fontFamily="monospace" opacity={Math.floor(p * 10) % 2 === 0 ? 1 : 0.5}>LAT: 33.513</text>
      <text x={10} y={35} fill={color} fontSize={10} fontFamily="monospace" opacity={Math.floor(p * 10) % 2 === 0 ? 1 : 0.5}>LON: 44.208</text>
    </svg>
  );
};
