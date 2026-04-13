import React from 'react';

interface Props {
  progress: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <ColorTransitionTank progress={1} width={200} height={300} strokeWidth={3} />
export const ColorTransitionTank: React.FC<Props> = ({ 
  progress, 
  width = 200, 
  height = 300, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const outline = `M 20 20 L 20 280 C 20 290, 180 290, 180 280 L 180 20`;
  const waterLevel = 250;
  
  // Color transitioning from clean blue/green to corrupted black
  // Wait, theme colors: 99B898 (green) -> 1A1C20 (dark)
  const rT = Math.floor(153 + p * (26 - 153));
  const gT = Math.floor(184 + p * (28 - 184));
  const bT = Math.floor(152 + p * (32 - 152));
  const fluidColor = `rgba(${rT}, ${gT}, ${bT}, 0.8)`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Liquid */}
      <path 
        d={`M 20 ${height - waterLevel} L 20 280 C 20 290, 180 290, 180 280 L 180 ${height - waterLevel} Z`} 
        fill={fluidColor} 
      />
      
      {/* Tank bubble effect */}
      <circle cx={60} cy={150 - (p*100)%150} r={5} fill="#FFF" opacity={0.3} />
      <circle cx={140} cy={250 - (p*150)%250} r={8} fill="#FFF" opacity={0.3} />

      {/* Tank outline */}
      <path d={outline} fill="none" stroke="#2A363B" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
};
