import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <MiniDrones progress={1} color="#2A363B" size={150} strokeWidth={2} />
export const MiniDrones: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Create 5 mini drones swarming
  const drones = [
    { x: 30, y: 30, scale: 1, delay: 0 },
    { x: 100, y: 40, scale: 0.8, delay: 0.2 },
    { x: 60, y: 90, scale: 1.2, delay: 0.4 },
    { x: 20, y: 110, scale: 0.6, delay: 0.1 },
    { x: 120, y: 100, scale: 0.9, delay: 0.5 },
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {drones.map((d, i) => {
        const droneP = Math.max(0, Math.min(1, (p - d.delay) * 1.5));
        
        // Quadcopter shape
        const body = `M -10 -5 L 10 -5 L 10 5 L -10 5 Z M -5 5 L 0 10 L 5 5`;
        const props = `M -15 -10 L -5 -10 M 5 -10 L 15 -10`;
        const len = 100;
        
        // Spin propellers rapidly
        const spin = Math.floor(p * 20) % 2 === 0 ? -12 : -8;
        const propsSpin = `M -15 ${spin} L -5 ${spin} M 5 ${spin} L 15 ${spin}`;

        return (
          <g key={i} transform={`translate(${d.x}, ${d.y}) scale(${d.scale})`} style={{ opacity: droneP }}>
            <path d={body} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - droneP)} />
            <path d={propsSpin} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - droneP)} />
            {/* Signal waves */}
            <path d="M -5 15 A 5 5 0 0 0 5 15 M -10 20 A 10 10 0 0 0 10 20" fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} opacity={Math.floor(p * 15 + i) % 2 === 0 ? 1 : 0} />
          </g>
        );
      })}
    </svg>
  );
};
