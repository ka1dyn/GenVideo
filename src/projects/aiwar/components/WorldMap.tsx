import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <WorldMap progress={1} color="#2A363B" width={300} height={150} strokeWidth={2} />
export const WorldMap: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  width = 300, 
  height = 150, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const paths = [
    "M 15 25 L 30 15 L 55 12 L 75 10 L 85 15 L 75 25 L 65 25 L 60 35 L 55 45 L 40 50 L 35 48 L 30 40 L 25 35 L 15 25 Z",
    "M 85 8 L 105 5 L 100 15 L 85 15 Z",
    "M 45 55 L 60 55 L 75 75 L 60 115 L 50 120 L 45 80 L 40 60 Z",
    "M 125 45 L 120 35 L 135 25 L 145 15 L 180 12 L 250 15 L 265 20 L 250 30 L 240 45 L 235 60 L 220 65 L 205 60 L 195 55 L 175 50 L 180 70 L 165 95 L 155 115 L 140 105 L 125 75 L 140 55 L 145 45 L 135 40 Z",
    "M 118 28 L 125 22 L 130 26 L 122 32 Z",
    "M 260 35 L 265 45 L 255 50 Z",
    "M 175 85 L 180 95 L 170 100 Z",
    "M 235 95 L 265 90 L 270 110 L 245 115 L 230 105 Z",
    "M 280 120 L 285 130 L 280 135 Z",
  ];
  const totalLength = 500;

  return (
    <svg width={width} height={height} viewBox="0 0 300 160">
      {/* Longitude/Latitude lines (bg) */}
      <ellipse 
        cx="150" cy="80" rx="140" ry="75" 
        fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} strokeDasharray="5 10" 
        opacity={p * 0.3}
      />
      <path d="M 150 5 V 155 M 10 80 H 290" fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} strokeDasharray="5 10" opacity={p * 0.2} />

      {/* Continents */}
      {paths.map((d, i) => (
        <path 
          key={i}
          d={d}
          fill="none"
          stroke={color} 
          strokeWidth={strokeWidth}
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeDasharray={totalLength}
          strokeDashoffset={totalLength * (1 - p)}
        />
      ))}
    </svg>
  );
};
