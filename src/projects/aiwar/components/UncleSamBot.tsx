import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <UncleSamBot progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const UncleSamBot: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Shaking in anger
  const shake = Math.sin(p * 40) * 3;

  // Uncle Sam Hat
  const brim = `M 60 70 L 140 70`;
  const hatTop = `M 70 70 L 75 20 L 125 20 L 130 70 Z`;
  const stripes = `M 85 70 L 85 20 M 100 70 L 100 20 M 115 70 L 115 20`; // stars/stripes detail

  // Angry Face (square jaw)
  const face = `M 70 70 L 70 120 C 70 130, 130 130, 130 120 L 130 70`;
  const beard = `M 70 120 L 80 140 L 100 130 L 120 140 L 130 120`; // goatee
  
  const angryEyes = `M 80 90 L 95 95 M 120 90 L 105 95 L 95 95`; // slanted down
  const mouth = `M 85 110 Q 100 100 115 110`; // frown
  
  // kicking leg
  const kickLift = (1 - p) * 20;
  const leg = `M 100 130 L 110 160 L 140 ${160 - kickLift}`; // kicking out

  const len = size * 5;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transform: `translateX(${shake}px)` }}>
        <path 
          d={`${brim} ${hatTop} ${face} ${beard}`} 
          fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)}
        />
        <path d={stripes} fill="none" stroke="#E84A5F" strokeWidth={strokeWidth} opacity={p} />
        <path d={`${angryEyes} ${mouth}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={p} />
        <path d={leg} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" opacity={p} />
        
        {/* Steam coming out of ears */}
        <path d="M 60 90 Q 50 80 60 70 M 140 90 Q 150 80 140 70" fill="none" stroke="#99B898" strokeWidth={strokeWidth * 0.5} opacity={Math.floor(p * 15) % 2 === 0 ? 1 : 0} />
      </g>
    </svg>
  );
};
