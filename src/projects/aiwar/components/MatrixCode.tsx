import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
}

// @gallery: <MatrixCode progress={1} color="#99B898" width={300} height={200} />
export const MatrixCode: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', 
  width = 300, 
  height = 200 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const chars = "01100101 MA V E N 01 DAT AC O RR UP T 010".split('');
  
  const columns = 10;
  const streams = [];
  
  for(let i=0; i<columns; i++) {
    const streamY = (Math.sin(p * 10 + i) * 0.5 + 0.5) * height; // sliding down
    const textGroup = [];
    for(let j=0; j<8; j++) {
      const char = chars[(i*8 + j) % chars.length];
      const opacity = 1 - (j / 8); 
      textGroup.push(
        <text key={j} x={i * 30} y={streamY - j * 20} fill={j === 0 ? "#E8A87C" : color} opacity={opacity} fontFamily="monospace" fontSize={16} fontWeight="bold">
          {char}
        </text>
      );
    }
    streams.push(<g key={i}>{textGroup}</g>);
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'hidden' }}>
      {p > 0.1 && streams}
    </svg>
  );
};
