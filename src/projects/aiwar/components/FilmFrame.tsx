import React from 'react';

interface Props {
  progress: number;
  width?: number;
  height?: number;
}

// @gallery: <FilmFrame progress={1} width={400} height={300} />
export const FilmFrame: React.FC<Props> = ({ 
  progress, 
  width = 400, 
  height = 300 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Slide effect
  const shift = (p * 100) % 40;

  const holesTop = [];
  const holesBottom = [];
  
  for(let i=-40; i<width+40; i+=40) {
    holesTop.push(<rect key={`t${i}`} x={i - shift} y={10} width={20} height={15} rx={3} fill="#F5F0EB" />);
    holesBottom.push(<rect key={`b${i}`} x={i - shift} y={height - 25} width={20} height={15} rx={3} fill="#F5F0EB" />);
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x={0} y={0} width={width} height={35} fill="#1A1C20" opacity={0.8} />
      <rect x={0} y={height-35} width={width} height={35} fill="#1A1C20" opacity={0.8} />
      {holesTop}
      {holesBottom}
    </svg>
  );
};
