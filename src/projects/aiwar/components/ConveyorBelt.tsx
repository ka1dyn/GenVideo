import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <ConveyorBelt progress={1} color="#2A363B" width={300} height={100} strokeWidth={3} />
export const ConveyorBelt: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 300, 
  height = 100, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = width * 3;

  // The belt outline
  const beltObj = `M 30 40 L ${width-30} 40 A 20 20 0 0 1 ${width-30} 80 L 30 80 A 20 20 0 0 1 30 40`;
  
  // Wheels inside
  const wheels = [];
  for(let x=40; x<width-30; x+=40) {
    wheels.push(`M ${x} 60 A 10 10 0 1 0 ${x+20} 60 A 10 10 0 1 0 ${x} 60 M ${x+5} 60 L ${x+15} 60 M ${x+10} 55 L ${x+10} 65`);
  }

  // Ticks on the belt mimicking motion
  const tickOffset = (p * 50) % 20;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path 
        d={beltObj} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)}
      />
      <path 
        d={wheels.join(' ')} 
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} strokeLinecap="round" 
        style={{ transformOrigin: 'center', transform: `rotate(${p * 360}deg)` }} opacity={p}
      />
      {/* Belt motion ticks */}
      <line x1={30} y1={40} x2={width-30} y2={40} stroke={color} strokeWidth={strokeWidth} strokeDasharray="5 15" strokeDashoffset={tickOffset} opacity={p} />
    </svg>
  );
};
