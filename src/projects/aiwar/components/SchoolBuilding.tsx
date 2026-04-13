import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  isRuined?: boolean;
}

// @gallery: <SchoolBuilding progress={1} color="#2A363B" width={200} height={150} strokeWidth={3} isRuined={false} />
// @gallery: <SchoolBuilding progress={1} color="#2A363B" width={200} height={150} strokeWidth={3} isRuined={true} />
export const SchoolBuilding: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 200, 
  height = 150, 
  strokeWidth = 3,
  isRuined = false
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const w = width;
  const h = height;

  const totalLen = 800; // rough estimation for path lengths

  if (isRuined) {
    // Ruined, broken building sketch
    const ruinedOutline = `M 10 ${h - 10} L 10 ${h * 0.7} L 30 ${h * 0.6} L 50 ${h * 0.8} L 90 ${h * 0.5} L 120 ${h * 0.7} L 150 ${h * 0.4} L 180 ${h * 0.8} L ${w - 10} ${h * 0.9} L ${w - 10} ${h - 10} Z`;
    const debris = `M 30 ${h - 5} L 50 ${h - 20} L 70 ${h - 5} M 120 ${h - 5} L 140 ${h - 30} L 160 ${h - 5} M 150 ${h - 10} L 165 ${h - 25} L 180 ${h - 10}`;
    
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path 
          d={`${ruinedOutline} ${debris}`} 
          fill="none" 
          stroke={color} 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeDasharray={totalLen} 
          strokeDashoffset={totalLen * (1 - p)} 
        />
        <line x1={w*0.3} y1={h*0.6} x2={w*0.4} y2={h*0.8} stroke={color} strokeWidth={strokeWidth} opacity={p} />
        <line x1={w*0.7} y1={h*0.5} x2={w*0.6} y2={h*0.7} stroke={color} strokeWidth={strokeWidth} opacity={p} />
      </svg>
    );
  }

  // Normal Building
  const outline = `M 10 ${h - 10} L 10 ${h * 0.4} L ${w / 2} 10 L ${w - 10} ${h * 0.4} L ${w - 10} ${h - 10} Z`;
  const door = `M ${w / 2 - 20} ${h - 10} L ${w / 2 - 20} ${h - 50} L ${w / 2 + 20} ${h - 50} L ${w / 2 + 20} ${h - 10}`;
  const window1 = `M 30 ${h * 0.5} h 30 v 30 h -30 Z`;
  const window2 = `M ${w - 60} ${h * 0.5} h 30 v 30 h -30 Z`;
  const clock = `M ${w / 2} ${h * 0.25} m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={`${outline} ${door} ${window1} ${window2} ${clock}`} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeDasharray={totalLen} 
        strokeDashoffset={totalLen * (1 - p)} 
      />
      {/* Clock hands */}
      <path d={`M ${w/2} ${h*0.25} L ${w/2} ${h*0.25 - 8} M ${w/2} ${h*0.25} L ${w/2 + 5} ${h*0.25 + 5}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={p} />
    </svg>
  );
};
