import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  curveOffset?: number; // How much to curve the arrow
}

// @gallery: <CurvedArrow progress={1} color="#E84A5F" size={150} strokeWidth={4} startX={20} startY={120} endX={130} endY={50} curveOffset={30} />
export const CurvedArrow: React.FC<Props> = ({ 
  progress, 
  color = '#E84A5F', 
  size = 150, 
  strokeWidth = 4,
  startX = 20,
  startY = 120,
  endX = 130,
  endY = 50,
  curveOffset = 30
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Calculate control point for Quadratic Bezier
  const dx = endX - startX;
  const dy = endY - startY;
  const cx = (startX + endX) / 2 - dy * (curveOffset / 100);
  const cy = (startY + endY) / 2 + dx * (curveOffset / 100);

  const d = `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;
  
  // Rough bezier length for stroke-dash
  const dist = Math.sqrt(dx * dx + cy * cy);
  const pathLen = dist * 2;

  // Arrowhead math (Angle at t=1 is driven by P1 -> P2)
  const angle = Math.atan2(endY - cy, endX - cx);
  const headLen = 15 + strokeWidth;
  
  // Arrow wings rotated by ~35 degrees (0.6 radians) from the back-vector
  const arrowL_X = endX - headLen * Math.cos(angle - 0.6);
  const arrowL_Y = endY - headLen * Math.sin(angle - 0.6);
  const arrowR_X = endX - headLen * Math.cos(angle + 0.6);
  const arrowR_Y = endY - headLen * Math.sin(angle + 0.6);

  const arrowHead = `M ${arrowL_X} ${arrowL_Y} L ${endX} ${endY} L ${arrowR_X} ${arrowR_Y}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={d} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeDasharray={pathLen}
        strokeDashoffset={pathLen * (1 - p)}
      />
      <path 
        d={arrowHead} 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeDasharray={headLen * 3}
        strokeDashoffset={headLen * 3 * (1 - p)}
      />
    </svg>
  );
};
