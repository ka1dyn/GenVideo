import React from 'react';

interface Props {
  progress: number;
  text?: string;
  color?: string;
  width?: number;
  height?: number;
}

// @gallery: <GlitchText progress={1} text="NEW WARS" color="#E84A5F" width={400} height={150} />
export const GlitchText: React.FC<Props> = ({ 
  progress, 
  text = "NEW WARS", 
  color = '#E84A5F', 
  width = 400, 
  height = 150 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  if (p === 0) return null;

  const isGlitch = p < 0.9 && Math.floor(p * 30) % 3 === 0;
  
  const gOffset1 = isGlitch ? 10 : 0;
  const gOffset2 = isGlitch ? -15 : 0;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`scale(${p < 0.2 ? 5 * p : 1})`} style={{ transformOrigin: 'center' }}>
        <text x={width/2 - gOffset1} y={height/2 + 20} textAnchor="middle" fill="#99B898" fontFamily="sans-serif" fontSize={80} fontWeight="900" opacity={0.6}>
          {text}
        </text>
        <text x={width/2 + gOffset2} y={height/2 + 20} textAnchor="middle" fill="#4C5B5C" fontFamily="sans-serif" fontSize={80} fontWeight="900" opacity={0.6}>
          {text}
        </text>
        <text x={width/2} y={height/2 + 20} textAnchor="middle" fill={color} fontFamily="sans-serif" fontSize={80} fontWeight="900">
          {text}
        </text>

        {isGlitch && (
          <path d={`M 0 ${height/2} L ${width} ${height/2} M 0 ${height/2 + 30} L ${width} ${height/2 + 30}`} stroke="#2A363B" strokeWidth={5} />
        )}
      </g>
    </svg>
  );
};
