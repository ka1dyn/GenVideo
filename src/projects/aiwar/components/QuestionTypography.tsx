import React from 'react';

interface Props {
  progress: number;
  text?: string;
  color?: string;
  size?: number;
}

// @gallery: <QuestionTypography progress={1} text="AI가 그 학교를 표적으로 선정했습니까?" color="#2A363B" size={600} />
export const QuestionTypography: React.FC<Props> = ({ 
  progress, 
  text = "AI가 그 학교를 표적으로 선정했습니까?", 
  color = '#2A363B', 
  size = 600 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Typewriter effect
  const charCount = Math.floor(text.length * p);
  const visibleText = text.substring(0, charCount);

  return (
    <svg width={size} height={100} viewBox={`0 0 ${size} 100`}>
      <text 
        x={size / 2} y={60} 
        textAnchor="middle" 
        fill={color} 
        fontFamily="serif" 
        fontSize={32} 
        fontWeight="bold" 
        letterSpacing={-1}
        style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.1))' }}
      >
        {visibleText}
        <tspan opacity={Math.floor(p * 20) % 2 === 0 ? 1 : 0}>_</tspan>
      </text>
    </svg>
  );
};
