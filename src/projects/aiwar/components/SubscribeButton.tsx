import React from 'react';

interface Props {
  progress: number;
  width?: number;
  height?: number;
}

// @gallery: <SubscribeButton progress={1} width={300} height={100} />
export const SubscribeButton: React.FC<Props> = ({ 
  progress, 
  width = 300, 
  height = 100 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const isClicked = p > 0.8;
  
  const scale = p < 0.2 ? p * 5 : (isClicked ? 0.95 : 1);
  const color = isClicked ? "#99B898" : "#E84A5F";
  const text = isClicked ? "SUBSCRIBED" : "SUBSCRIBE";

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${scale})` }}>
        <rect x={10} y={10} width={width-20} height={height-20} rx={40} fill={color} stroke="#1A1C20" strokeWidth={4} />
        <text x={width/2} y={height/2 + 10} textAnchor="middle" fill="#FFF" fontFamily="sans-serif" fontSize={32} fontWeight="900" letterSpacing={2}>
          {text}
        </text>
      </g>
    </svg>
  );
};
