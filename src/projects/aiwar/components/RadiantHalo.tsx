import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <RadiantHalo progress={1} color="#E8A87C" size={200} strokeWidth={3} />
export const RadiantHalo: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const innerR = 50;
  const outerR = size / 2;
  const numRays = 16;
  
  const rays = Array.from({length: numRays}).map((_, i) => {
    const angle = (i / numRays) * Math.PI * 2;
    // Alternate long and short rays
    const startOffset = i % 2 === 0 ? innerR : innerR * 1.2;
    const endOffset = i % 2 === 0 ? outerR : outerR * 0.8;
    
    const x1 = cx + startOffset * Math.cos(angle);
    const y1 = cy + startOffset * Math.sin(angle);
    const x2 = cx + endOffset * Math.cos(angle);
    const y2 = cy + endOffset * Math.sin(angle);
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }).join(' ');

  const len = outerR;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${p < 0.5 ? p * 2 : 1 + (p - 0.5)*0.2}) rotate(${p * 10}deg)` }}>
        <path 
          d={rays} 
          fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" 
          strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={1 - p*0.3}
        />
        {/* Inner pulsing core lines */}
        <circle cx={cx} cy={cy} r={innerR * 0.9} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray="10 5" opacity={Math.floor(p * 20) % 2 === 0 ? 1 : 0.4} />
      </g>
    </svg>
  );
};
