import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <NetworkNodes progress={1} color="#2A363B" size={200} strokeWidth={2} />
export const NetworkNodes: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;

  // Generate some concentric nodes
  const nodes = [
    {x: cx, y: cy, r: 8}, // Center
    {x: cx - 40, y: cy - 30, r: 5}, {x: cx + 50, y: cy - 20, r: 4}, {x: cx - 10, y: cy + 50, r: 6},
    {x: cx - 70, y: cy + 10, r: 3}, {x: cx + 60, y: cy + 40, r: 5}, {x: cx + 10, y: cy - 70, r: 5},
    {x: cx - 80, y: cy - 60, r: 4}, {x: cx + 80, y: cy - 50, r: 4}, {x: cx - 50, y: cy + 70, r: 4}, {x: cx + 70, y: cy + 80, r: 3}
  ];

  // Map out connection lines (from center to inner, inner to outer)
  const lines = [
    [0, 1], [0, 2], [0, 3], [0, 6],
    [1, 4], [1, 7], [2, 8], [3, 5], [3, 9], [5, 10], [6, 8],
    [1, 6], [2, 6], [3, 4], [4, 9] // Cross links
  ];

  const len = size;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Draw connections with variable offsets depending on distance from center to simulate signal flow out */}
      {lines.map((pair, i) => {
        const n1 = nodes[pair[0]];
        const n2 = nodes[pair[1]];
        return (
          <path 
            key={`l-${i}`}
            d={`M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`} 
            fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} opacity={Math.max(0, p - 0.2)}
            strokeDasharray={len} strokeDashoffset={len * (1 - p)}
          />
        );
      })}
      {/* Draw nodes scaling up */}
      {nodes.map((n, i) => (
        <circle 
          key={`n-${i}`}
          cx={n.x} cy={n.y} r={n.r * Math.max(0, Math.min(1, p * 1.5 - i * 0.05))} 
          fill={i === 0 ? "#E84A5F" : color} stroke="none" 
        />
      ))}
    </svg>
  );
};
