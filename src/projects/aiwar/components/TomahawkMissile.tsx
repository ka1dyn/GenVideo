import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <TomahawkMissile progress={1} color="#2A363B" size={300} strokeWidth={4} />
export const TomahawkMissile: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 300, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  // Missile coming from top left to bottom right
  const body = `M 40 40 L 160 160 L 140 180 L 20 60 Z`;
  const nose = `M 40 40 C 30 30, 10 10, 20 60`; 
  const fins = `M 130 150 L 160 120 L 170 130 L 140 160 Z M 160 160 L 180 180 L 190 170 L 170 150 Z`;

  // Motion blur lines behind
  const motion = `M 180 180 L 250 250 M 150 200 L 200 250 M 200 150 L 250 200`;

  const flyOffset = (1 - p) * -100;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translate(${flyOffset}px, ${flyOffset}px)` }}>
        <path d={`${body} ${nose} ${fins}`} fill="#4C5B5C" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <path d={motion} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth * 0.5} strokeLinecap="round" strokeDasharray="10 10" opacity={0.5} />
      </g>
    </svg>
  );
};
