import React from 'react';

interface Props {
  progress: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <WarningTape progress={1} width={400} height={100} strokeWidth={3} />
export const WarningTape: React.FC<Props> = ({ 
  progress, 
  width = 400, 
  height = 100,
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Cut in the middle
  const cutP = p > 0.5 ? Math.min(1, (p - 0.5) * 5) : 0;
  
  // Left tape
  const tapeL = `M 0 40 L ${width/2 - cutP*20} 40 L ${width/2 - cutP*20} 60 L 0 60 Z`;
  // Right tape
  const tapeR = `M ${width/2 + cutP*20} 40 L ${width} 40 L ${width} 60 L ${width/2 + cutP*20} 60 Z`;

  // Draw stripes on tape
  const stripesL = [];
  for(let i=0; i<width/2; i+=20) {
    stripesL.push(`M ${i} 40 L ${i+10} 60`);
  }
  const stripesR = [];
  for(let i=width/2; i<width; i+=20) {
    stripesR.push(`M ${i} 40 L ${i+10} 60`);
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={tapeL} fill="#E8A87C" stroke="#2A363B" strokeWidth={strokeWidth} />
      <path d={stripesL.join(' ')} fill="none" stroke="#2A363B" strokeWidth={strokeWidth} />

      <path d={tapeR} fill="#E8A87C" stroke="#2A363B" strokeWidth={strokeWidth} />
      <path d={stripesR.join(' ')} fill="none" stroke="#2A363B" strokeWidth={strokeWidth} />
      
      {/* 텍스트 */}
      <text x={80} y={54} fill="#2A363B" fontFamily="monospace" fontSize={12} fontWeight="bold" letterSpacing={2}>RESTRICTED</text>
      <text x={280} y={54} fill="#2A363B" fontFamily="monospace" fontSize={12} fontWeight="bold" letterSpacing={2}>RESTRICTED</text>
    </svg>
  );
};
