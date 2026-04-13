import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
}

// @gallery: <CrownedAILogos progress={1} color="#2A363B" width={300} height={150} />
export const CrownedAILogos: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 300, 
  height = 150 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawCrown = (x: number, y: number) => (
    <path d={`M ${x-15} ${y+10} L ${x-20} ${y-10} L ${x-5} ${y} L ${x+5} ${y-15} L ${x+15} ${y} L ${x+30} ${y-10} L ${x+25} ${y+10} Z`} fill="#E8A87C" stroke={color} strokeWidth={2} strokeLinejoin="round" opacity={p} />
  );

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* GPT */}
      <g style={{ transform: `translateY(${(1-p)*20}px)`, opacity: p }}>
        {drawCrown(50, 40)}
        <circle cx={55} cy={70} r={20} fill="none" stroke={color} strokeWidth={3} />
        <path d="M 55 55 L 65 70 L 45 70 Z" fill={color} />
        <text x={55} y={110} textAnchor="middle" fill={color} fontFamily="monospace" fontWeight="bold">GPT</text>
      </g>
      
      {/* Claude */}
      <g style={{ transform: `translateY(${(1-p)*20}px)`, opacity: p }}>
        {drawCrown(150, 20)}
        <rect x={135} y={50} width={40} height={40} rx={5} fill="none" stroke={color} strokeWidth={3} />
        <circle cx={145} cy={65} r={3} fill={color} />
        <circle cx={165} cy={65} r={3} fill={color} />
        <path d="M 145 80 Q 155 85 165 80" fill="none" stroke={color} strokeWidth={2} />
        <text x={155} y={110} textAnchor="middle" fill={color} fontFamily="monospace" fontWeight="bold">CLAUDE</text>
      </g>

      {/* Gemini */}
      <g style={{ transform: `translateY(${(1-p)*20}px)`, opacity: p }}>
        {drawCrown(250, 40)}
        <path d="M 255 50 L 265 70 L 275 70 L 260 85 L 265 100 L 255 90 L 245 100 L 250 85 L 235 70 L 245 70 Z" fill="none" stroke={color} strokeWidth={2} />
        <text x={255} y={110} textAnchor="middle" fill={color} fontFamily="monospace" fontWeight="bold">GEMINI</text>
      </g>
    </svg>
  );
};
