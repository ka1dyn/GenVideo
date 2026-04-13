import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ClaudeWithPointer progress={1} color="#E8A87C" size={200} strokeWidth={3} />
export const ClaudeWithPointer: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 4;

  // Claude's base logo (Anthropic C + Spark)
  const cCurve = "M 60 70 A 30 30 0 1 0 60 130";
  const spark = "M 40 60 Q 40 85 70 85 Q 40 85 40 115 Q 40 85 10 85 Q 40 85 40 60 Z";
  
  // A stick pointer
  const pointer = `M 110 120 L 180 30`;
  // Simple hand holding it
  const hand = `M 95 125 C 105 110, 120 115, 115 130 C 105 140, 95 130, 95 125`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${p})` }}>
        <path d={cCurve} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d={spark} transform="scale(0.8) translate(30, 0)" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path 
          d={pointer} 
          fill="none" stroke="#2A363B" strokeWidth={strokeWidth * 1.5} strokeLinecap="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)} 
        />
        <path d={hand} fill="none" stroke="#2A363B" strokeWidth={strokeWidth} strokeLinecap="round" opacity={p} />
      </g>
    </svg>
  );
};
