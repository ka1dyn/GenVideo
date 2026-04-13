import React from 'react';

interface Props {
  progress: number;
  width?: number;
  height?: number;
}

// @gallery: <GridMonitors progress={1} width={400} height={300} />
export const GridMonitors: React.FC<Props> = ({ 
  progress, 
  width = 400, 
  height = 300 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  const cols = 7;
  const rows = 3;
  const total = cols * rows; // 21

  const cw = width / cols;
  const ch = height / rows;

  const getTileColor = (index: number) => {
    // 20 out of 21 turns red
    if (index === 10) return "#99B898"; // one green/safe
    return p > 0.3 + (index * 0.01) ? "#E84A5F" : "#2A363B";
  };

  const getTileText = (index: number) => {
    if (index === 10) return "S";
    return p > 0.3 + (index * 0.01) ? "N" : "_";
  };

  const tiles = [];
  for(let i=0; i<total; i++) {
    const x = (i % cols) * cw;
    const y = Math.floor(i / cols) * ch;
    tiles.push(
      <g key={i} transform={`translate(${x}, ${y})`}>
        <rect x={2} y={2} width={cw-4} height={ch-4} rx={2} fill={getTileColor(i)} stroke="#1A1C20" strokeWidth={2} opacity={p} />
        <text x={cw/2} y={ch/2 + 5} textAnchor="middle" fill="#FFF" fontFamily="monospace" fontSize={14} fontWeight="bold" opacity={p}>{getTileText(i)}</text>
      </g>
    );
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {tiles}
    </svg>
  );
};
