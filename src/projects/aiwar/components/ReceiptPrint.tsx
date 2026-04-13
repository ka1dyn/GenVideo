import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <ReceiptPrint progress={1} color="#2A363B" size={150} strokeWidth={2} />
export const ReceiptPrint: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Printing up from bottom
  const maxH = size * 0.9;
  const h = p * maxH;
  
  const width = 80;
  const x = (size - width) / 2;
  const startY = size - 10;
  
  // Zigzag bottom
  const zz = `L ${x+width} ${startY - h} L ${x+width} ${startY} L ${x+width-10} ${startY-5} L ${x+width-20} ${startY} L ${x+width-30} ${startY-5} L ${x+width-40} ${startY} L ${x+width-50} ${startY-5} L ${x+width-60} ${startY} L ${x+width-70} ${startY-5} L ${x} ${startY} Z`;
  const paper = `M ${x} ${startY - h} L ${x+width} ${startY - h} ${zz}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Machine slot */}
      <line x1={x - 10} y1={startY} x2={x+width + 10} y2={startY} stroke={color} strokeWidth={strokeWidth * 2} strokeLinecap="round" />
      
      {/* Paper printed */}
      <path d={paper} fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} style={{ clipPath: `polygon(0 ${startY - h}, 100% ${startY - h}, 100% 100%, 0 100%)` }} />
      
      {/* Print text lines */}
      {p > 0.2 && <line x1={x + 10} y1={startY - h + 20} x2={x + width - 10} y2={startY - h + 20} stroke={color} strokeWidth={strokeWidth} strokeDasharray="10 2 5 2" opacity={p} />}
      {p > 0.4 && <line x1={x + 10} y1={startY - h + 40} x2={x + width - 10} y2={startY - h + 40} stroke={color} strokeWidth={strokeWidth} strokeDasharray="15 5 10 5" opacity={p} />}
      {p > 0.6 && <line x1={x + 10} y1={startY - h + 60} x2={x + width - 10} y2={startY - h + 60} stroke={color} strokeWidth={strokeWidth} strokeDasharray="5 2 20 2" opacity={p} />}
      {p > 0.8 && <line x1={x + 10} y1={startY - h + 80} x2={x + width - 10} y2={startY - h + 80} stroke={color} strokeWidth={strokeWidth} strokeDasharray="18 4 8 4" opacity={p} />}
    </svg>
  );
};
