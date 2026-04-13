import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ResearchPapers progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const ResearchPapers: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const drawPaper = (x: number, y: number, rot: number, delay: number) => {
    const paperP = Math.max(0, Math.min(1, p * 2 - delay));
    const len = size * 2;
    return (
      <g style={{ transformOrigin: `${x+40}px ${y+50}px`, transform: `rotate(${rot}deg)` }}>
        <rect x={x} y={y} width={80} height={100} fill="#FFF" stroke={color} strokeWidth={strokeWidth} strokeDasharray={len} strokeDashoffset={len * (1 - paperP)} />
        <path d={`M ${x+10} ${y+20} L ${x+70} ${y+20} M ${x+10} ${y+40} L ${x+60} ${y+40} M ${x+10} ${y+60} L ${x+70} ${y+60}`} fill="none" stroke={color} strokeWidth={strokeWidth*0.5} strokeDasharray={100} strokeDashoffset={100 * (1 - paperP)} />
      </g>
    );
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {drawPaper(40, 80, -10, 0)}
      {drawPaper(60, 60, 5, 0.2)}
      {drawPaper(70, 40, -5, 0.4)}
      
      {/* Top Paper Title */}
      <text x={110} y={55} textAnchor="middle" fill="#E84A5F" fontFamily="serif" fontSize={12} fontWeight="bold" transform="rotate(-5, 110, 90)" opacity={p>0.8?1:0}>KCL STUDY</text>
    </svg>
  );
};
