import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
}

// @gallery: <TerminalScreen progress={1} color="#99B898" width={300} height={200} />
export const TerminalScreen: React.FC<Props> = ({ 
  progress, 
  color = '#99B898', // Terminal green
  width = 300, 
  height = 200 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const text = "WAR SIMULATION";
  const charCount = Math.floor(text.length * p);
  const visibleText = text.substring(0, charCount);
  const blink = Math.floor(p * 20) % 2 === 0;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x={10} y={10} width={width-20} height={height-20} rx={10} fill="#1A1C20" stroke="#2A363B" strokeWidth={5} />
      <text x={30} y={50} fill={color} fontFamily="monospace" fontSize={24}>
        &gt; {visibleText}{blink && "_"}
      </text>
    </svg>
  );
};
