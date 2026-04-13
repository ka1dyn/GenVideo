import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <RobotScissors progress={1} color="#2A363B" size={200} strokeWidth={4} />
export const RobotScissors: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 4 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Snipping motion
  const angleL = 15 - Math.sin(p * Math.PI) * 15;
  const angleR = -15 + Math.sin(p * Math.PI) * 15;

  const base = `M 100 180 L 100 120 M 80 120 L 120 120 L 120 130 L 80 130 Z`;
  // Left blade
  const bladeL = `M 100 120 C 70 100, 80 60, 100 40 L 100 120 Z`;
  // Right blade
  const bladeR = `M 100 120 C 130 100, 120 60, 100 40 L 100 120 Z`;

  const flyOffset = (1-p)*100;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translateY(${flyOffset}px)` }}>
        <path d={base} fill="#4C5B5C" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        
        <g style={{ transformOrigin: '100px 120px', transform: `rotate(${angleL}deg)` }}>
          <path d={bladeL} fill="#D1D5DB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        </g>
        <g style={{ transformOrigin: '100px 120px', transform: `rotate(${angleR}deg)` }}>
          <path d={bladeR} fill="#D1D5DB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        </g>
        <circle cx={100} cy={120} r={5} fill={color} />
      </g>
    </svg>
  );
};
