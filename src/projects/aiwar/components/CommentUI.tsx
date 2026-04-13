import React from 'react';

interface Props {
  progress: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <CommentUI progress={1} width={500} height={200} strokeWidth={3} />
export const CommentUI: React.FC<Props> = ({ 
  progress, 
  width = 500, 
  height = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const box = `M 20 20 L ${width-20} 20 L ${width-20} 140 L 80 140 L 50 180 L 50 140 L 20 140 Z`;
  
  const text = "영상 끄기 전에 생각해보세요...";
  const charCount = Math.floor(text.length * p);
  const visibleText = text.substring(0, charCount);
  const blink = p < 1 && Math.floor(p * 20) % 2 === 0;

  const len = width * 3;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={box} 
        fill="#FFF" stroke="#2A363B" strokeWidth={strokeWidth} strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
      />
      <circle cx={60} cy={70} r={20} fill="#E8A87C" stroke="#2A363B" strokeWidth={2} opacity={p} />
      <path d="M 50 80 Q 60 70 70 80" fill="none" stroke="#2A363B" strokeWidth={2} opacity={p} />
      <circle cx={55} cy={65} r={2} fill="#2A363B" opacity={p} />
      <circle cx={65} cy={65} r={2} fill="#2A363B" opacity={p} />

      <text x={100} y={78} fill="#2A363B" fontFamily="sans-serif" fontSize={24} fontWeight="bold">
        {visibleText}{blink && "|"}
      </text>
    </svg>
  );
};
