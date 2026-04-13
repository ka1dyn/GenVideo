import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <BatteryGauge progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const BatteryGauge: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const shake = Math.sin(p * 50) * 3;
  const batteryOutline = `M 40 70 L 140 70 L 140 130 L 40 130 Z M 140 90 L 150 90 L 150 110 L 140 110 Z`;
  const len = size * 4;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translateX(${shake}px)` }}>
        <path 
          d={batteryOutline} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
        {/* Level 60% */}
        {p > 0.5 && (
          <rect x={45} y={75} width={60} height={50} fill="#E84A5F" opacity={0.6 + Math.sin(p * 20) * 0.2} />
        )}
        <text x={95} y={105} textAnchor="middle" fill="#2A363B" fontFamily="monospace" fontSize={24} fontWeight="bold" opacity={p}>60%</text>
      </g>
    </svg>
  );
};
