import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <AIBrain progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const AIBrain: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = 500;
  
  // A side-profile brain with inner grooves and AI circuitry nodes
  const brainOutline = "M 80 120 L 80 105 L 95 110 L 110 105 L 120 95 L 125 80 L 120 60 L 110 40 L 90 25 L 70 25 L 45 30 L 30 45 L 25 60 L 30 80 L 45 95 L 65 90 L 75 100 L 80 105";
  const grooves = [
    "M 30 60 L 50 55 L 65 65 L 75 40",
    "M 115 80 L 100 75 L 90 50 L 100 30",
    "M 45 95 L 60 80 L 80 85 L 90 75",
    "M 70 25 L 75 45 L 65 65",
  ].join(" ");
  const circuits = [
    "M 40 70 L 55 70 L 70 85",
    "M 105 60 L 95 60 L 85 75",
  ].join(" ");
  const nodes = [{x: 40, y: 70}, {x: 70, y: 85}, {x: 105, y: 60}, {x: 85, y: 75}];

  return (
    <svg width={size} height={size} viewBox={`0 0 150 150`}>
      <path 
        d={`${brainOutline} ${grooves} ${circuits}`} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeDasharray={len} 
        strokeDashoffset={len * (1 - p)} 
      />
      {nodes.map((n, i) => (
        <circle 
          key={i} cx={n.x} cy={n.y} r={4} 
          fill={color} 
          style={{ opacity: p, transition: 'opacity 0.2s', transitionDelay: `${i * 0.1}s` }} 
        />
      ))}
    </svg>
  );
};
