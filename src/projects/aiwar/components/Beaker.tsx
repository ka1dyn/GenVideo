import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <Beaker progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const Beaker: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 3;

  const outline = `M 60 20 L 90 20 L 90 60 L 120 120 C 130 140, 110 140, 75 140 C 40 140, 20 140, 30 120 L 60 60 Z`;
  const liquid = `M 40 100 Q 75 ${100 + Math.sin(p*10)*10} 110 100 L 115 110 C 120 130, 100 130, 75 130 C 50 130, 30 130, 35 110 Z`;
  
  const bubbles = [
    { cx: 75, cy: 120 - (p*30)%40, r: 4 },
    { cx: 90, cy: 110 - (p*40)%30, r: 3 },
    { cx: 60, cy: 125 - (p*20)%25, r: 5 },
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={outline} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8}
      />
      {p > 0.3 && (
        <>
          <path d={liquid} fill="#99B898" opacity={0.5} />
          {bubbles.map((b, i) => (
            <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="#FFF" opacity={p} />
          ))}
        </>
      )}
    </svg>
  );
};
