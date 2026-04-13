import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
  type?: 'shield' | 'sword';
}

// @gallery: <PinIcon progress={1} color="#2A363B" size={80} strokeWidth={3} type="shield" />
// @gallery: <PinIcon progress={1} color="#E84A5F" size={80} strokeWidth={3} type="sword" />
export const PinIcon: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 80, 
  strokeWidth = 3,
  type = 'shield'
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Pin drop effect (coming from top to bottom)
  const yOffset = (1 - p) * -50;
  
  const shield = `M 40 10 L 15 20 L 15 45 C 15 65, 40 85, 40 85 C 40 85, 65 65, 65 45 L 65 20 Z`;
  const sword = `M 40 5 L 35 20 L 35 60 L 25 60 L 25 65 L 35 65 L 35 85 L 45 85 L 45 65 L 55 65 L 55 60 L 45 60 L 45 20 Z`;
  const len = size * 4;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translateY(${yOffset}px)`, opacity: p }}>
        <path 
          d={type === 'shield' ? shield : sword} 
          fill={color} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        />
        {/* White cross inside shield */}
        {type === 'shield' && (
          <path d="M 40 30 L 40 55 M 25 42 L 55 42" fill="none" stroke="#F5F0EB" strokeWidth={strokeWidth * 1.5} strokeLinecap="round" />
        )}
      </g>
      {/* Impact circle on the ground */}
      <ellipse cx={40} cy={85} rx={15 * p} ry={5 * p} fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} opacity={p} />
    </svg>
  );
};
