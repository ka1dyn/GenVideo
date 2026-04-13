import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <SpeechBubble progress={1} color="#2A363B" width={200} height={120} strokeWidth={3} />
export const SpeechBubble: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 200, 
  height = 120, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, Math.min(1, progress * 1.2))); // pop out faster
  const w = width;
  const h = height;
  const len = w * 2 + h * 2;

  // Speech bubble with a tail pointing down-left
  const bubble = `M 20 20 L ${w - 20} 20 C ${w - 5} 20, ${w - 5} 20, ${w - 5} 35 L ${w - 5} ${h - 30} C ${w - 5} ${h - 15}, ${w - 5} ${h - 15}, ${w - 20} ${h - 15} L 60 ${h - 15} L 30 ${h} L 40 ${h - 15} L 20 ${h - 15} C 5 ${h - 15}, 5 ${h - 15}, 5 ${h - 30} L 5 35 C 5 20, 5 20, 20 20 Z`;
  
  // Three dots
  const cw = w / 2;
  const ch = (h - 15) / 2;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ transformOrigin: '30px 120px', transform: `scale(${p})`, opacity: p }}>
      <path 
        d={bubble} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <circle cx={cw - 30} cy={ch} r={4} fill={color} opacity={p} />
      <circle cx={cw} cy={ch} r={4} fill={color} opacity={p} />
      <circle cx={cw + 30} cy={ch} r={4} fill={color} opacity={p} />
    </svg>
  );
};
