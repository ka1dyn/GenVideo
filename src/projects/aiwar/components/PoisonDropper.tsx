import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <PoisonDropper progress={1} color="#2A363B" size={150} strokeWidth={3} />
export const PoisonDropper: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const bulb = `M 50 40 C 30 40, 30 10, 75 10 C 120 10, 120 40, 100 40 Z`;
  const tube = `M 60 40 L 70 100 L 80 100 L 90 40`;
  
  // Squeeze bulb
  const squeeze = p > 0.4 ? Math.sin((p - 0.4) * Math.PI) * 10 : 0;
  const activeBulb = `M ${50 + squeeze} 40 C 30 40, ${30 + squeeze} 10, 75 10 C ${120 - squeeze} 10, 120 40, ${100 - squeeze} 40 Z`;

  // Drop falls
  const dropY = p < 0.4 ? 100 : 100 + (p - 0.4) * 150;
  const drop = `M 75 ${dropY} C 80 ${dropY+5}, 80 ${dropY+15}, 75 ${dropY+20} C 70 ${dropY+15}, 70 ${dropY+5}, 75 ${dropY} Z`;

  const len = size * 3;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${activeBulb} ${tube}`} 
        fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.9}
      />
      {p > 0.4 && (
        <path d={drop} fill="#1A1C20" opacity={dropY > 200 ? 0 : 1} />
      )}
      {/* Warning label on tube */}
      <path d={`M 65 60 L 85 60 M 67 70 L 83 70`} stroke="#E84A5F" strokeWidth={strokeWidth} />
    </svg>
  );
};
