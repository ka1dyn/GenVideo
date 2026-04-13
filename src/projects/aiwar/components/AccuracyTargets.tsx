import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number; // width essentially
  strokeWidth?: number;
}

// @gallery: <AccuracyTargets progress={1} color="#2A363B" size={400} strokeWidth={3} />
export const AccuracyTargets: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 400, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawTarget = (x: number, y: number, r: number) => {
    return (
      <g>
        <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={`${r * 2 * Math.PI}`} strokeDashoffset={r * 2 * Math.PI * (1 - p)} />
        <circle cx={x} cy={y} r={r * 0.6} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={`${r * 1.2 * Math.PI}`} strokeDashoffset={r * 1.2 * Math.PI * (1 - p)} />
        <circle cx={x} cy={y} r={r * 0.2} fill={color} opacity={p} />
      </g>
    );
  };

  const drawDart = (x: number, y: number, rot: number) => (
    <g style={{ transformOrigin: `${x}px ${y}px`, transform: `rotate(${rot}deg) scale(${p > 0.5 ? 1 : 0})` }}>
      <line x1={x} y1={y} x2={x+15} y2={y-15} stroke="#E84A5F" strokeWidth={strokeWidth*1.5} strokeLinecap="round" />
      <path d={`M ${x+15} ${y-15} L ${x+20} ${y-10} L ${x+20} ${y-20} Z`} fill="#E84A5F" />
    </g>
  );

  return (
    <svg width={size} height={size/2} viewBox={`0 0 ${size} ${size/2}`}>
      {/* 84% Human Target */}
      {drawTarget(size * 0.25, size * 0.25, 40)}
      {drawDart(size * 0.25 + 5, size * 0.25 - 5, -20)}
      <text x={size * 0.25} y={size * 0.25 + 70} textAnchor="middle" fill="#2A363B" fontFamily="monospace" fontSize={24} fontWeight="bold" opacity={p}>84%</text>

      {/* divider */}
      <line x1={size * 0.5} y1={20} x2={size * 0.5} y2={size/2 - 20} stroke={color} strokeWidth={strokeWidth} strokeDasharray="10 10" opacity={0.3} />

      {/* 60% AI Target */}
      {drawTarget(size * 0.75, size * 0.25, 40)}
      {drawDart(size * 0.75 - 20, size * 0.25 - 30, 10)}
      {drawDart(size * 0.75 + 30, size * 0.25 + 10, -40)}
      {drawDart(size * 0.75 - 10, size * 0.25 + 25, 60)}
      <text x={size * 0.75} y={size * 0.25 + 70} textAnchor="middle" fill="#E84A5F" fontFamily="monospace" fontSize={24} fontWeight="bold" opacity={p}>60%</text>
    </svg>
  );
};
