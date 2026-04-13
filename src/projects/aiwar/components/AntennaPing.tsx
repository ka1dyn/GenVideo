import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <AntennaPing progress={1} color="#99B898" size={100} strokeWidth={3} />
export const AntennaPing: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', 
  size = 100, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2 + 10;
  
  // A dot
  const dot = `M ${cx} ${cy} A 2 2 0 1 0 ${cx+1} ${cy} Z`;
  
  // Arcs
  const arc1 = `M ${cx - 15} ${cy - 15} C ${cx - 5} ${cy - 25}, ${cx + 5} ${cy - 25}, ${cx + 15} ${cy - 15}`;
  const arc2 = `M ${cx - 25} ${cy - 25} C ${cx - 10} ${cy - 40}, ${cx + 10} ${cy - 40}, ${cx + 25} ${cy - 25}`;
  const arc3 = `M ${cx - 35} ${cy - 35} C ${cx - 15} ${cy - 55}, ${cx + 15} ${cy - 55}, ${cx + 35} ${cy - 35}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path d={dot} fill={color} opacity={p} />
      <path d={arc1} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={Math.floor(p * 20) % 3 === 0 ? 1 : 0.3} />
      <path d={arc2} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={Math.floor(p * 20 - 1) % 3 === 0 ? 1 : 0.3} />
      <path d={arc3} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={Math.floor(p * 20 - 2) % 3 === 0 ? 1 : 0.3} />
    </svg>
  );
};
