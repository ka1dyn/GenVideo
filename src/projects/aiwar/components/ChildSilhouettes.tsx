import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ChildSilhouettes progress={1} color="#E8A87C" size={400} strokeWidth={2} />
export const ChildSilhouettes: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 400, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawChild = (x: number, y: number, delay: number, index: number) => {
    const cp = Math.max(0, Math.min(1, (p - delay) * 2));
    if (cp === 0) return null;

    return (
      <g key={index} style={{ transform: `translateY(${(1-cp)*10}px)`, opacity: cp }}>
        <circle cx={x} cy={y-15} r={5} fill={color} />
        <line x1={x} y1={y-10} x2={x} y2={y+10} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1={x-5} y1={y} x2={x+5} y2={y} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1={x} y1={y+10} x2={x-5} y2={y+20} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1={x} y1={y+10} x2={x+5} y2={y+20} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </g>
    );
  };

  const children = [];
  for(let i=0; i<30; i++) {
    const x = 50 + (i * 73) % (size - 100);
    const y = size - 50 - ((i * 41) % 150);
    const delay = i / 30 * 0.5;
    children.push(drawChild(x, y, delay, i));
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {children}
      <text x={size/2} y={size/2} textAnchor="middle" fill="#E84A5F" fontFamily="serif" fontSize={120} fontWeight="bold" opacity={Math.max(0, p - 0.5) * 2}>
        168
      </text>
    </svg>
  );
};
