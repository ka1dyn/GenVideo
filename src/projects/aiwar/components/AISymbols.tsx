import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
  type: 'GPT' | 'GEMINI' | 'CLAUDE';
}

// @gallery: <AISymbols progress={1} color="#2A363B" size={80} strokeWidth={3} type="GPT" />
// @gallery: <AISymbols progress={1} color="#2A363B" size={80} strokeWidth={3} type="GEMINI" />
// @gallery: <AISymbols progress={1} color="#2A363B" size={80} strokeWidth={3} type="CLAUDE" />
export const AISymbols: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 80, 
  strokeWidth = 3,
  type
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const len = size * 4;

  const renderGPT = () => {
    // OpenAI geometric flower logo (6 interlocking petals)
    const petal = "M -4 -8 L -4 -20 A 13 13 0 0 1 16 -14 A 13 13 0 0 1 10 6 L 0 6 Z";
    return (
      <g transform={`translate(${cx}, ${cy - 10})`}>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <path 
            key={i}
            d={petal}
            transform={`rotate(${angle} 0 0)`}
            fill="none" stroke={color} strokeWidth={strokeWidth*0.7} strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={150} strokeDashoffset={150 * (1 - p)}
          />
        ))}
        {/* Label to make it completely unambiguous */}
        <text y={45} textAnchor="middle" fill={color} opacity={p} fontFamily="monospace" fontSize={14} fontWeight="bold">GPT</text>
      </g>
    );
  };

  const renderGemini = () => {
    // Gemini 4-point stars
    const starOuter = "M 0 -25 Q 0 0 25 0 Q 0 0 0 25 Q 0 0 -25 0 Q 0 0 0 -25 Z";
    const starInner = "M 18 -18 Q 18 -8 28 -8 Q 18 -8 18 2 Q 18 -8 8 -8 Q 18 -8 18 -18 Z"; 
    return (
      <g transform={`translate(${cx}, ${cy - 10})`}>
        <path d={starOuter} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={200} strokeDashoffset={200 * (1 - p)} />
        <path d={starInner} fill="none" stroke={color} strokeWidth={strokeWidth*0.8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={150} strokeDashoffset={150 * (1 - p)} />
        <text y={45} textAnchor="middle" fill={color} opacity={p} fontFamily="monospace" fontSize={14} fontWeight="bold">GEMINI</text>
      </g>
    );
  };

  const renderClaude = () => {
    // Elegant Anthropic-like Serif "C" combined with an AI spark
    const cCurve = "M 15 -18 A 20 20 0 1 0 15 18";
    const spark = "M 5 -20 Q 5 -5 20 -5 Q 5 -5 5 10 Q 5 -5 -10 -5 Q 5 -5 5 -20 Z";
    return (
      <g transform={`translate(${cx}, ${cy - 10})`}>
        <path d={cCurve} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={150} strokeDashoffset={150 * (1 - p)} />
        <path d={spark} transform="scale(0.7) translate(15, -15)" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={150} strokeDashoffset={150 * (1 - p)} />
        <text y={45} textAnchor="middle" fill={color} opacity={p} fontFamily="serif" fontSize={16} letterSpacing={1} fontWeight="bold">Claude</text>
      </g>
    );
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {type === 'GPT' && renderGPT()}
      {type === 'GEMINI' && renderGemini()}
      {type === 'CLAUDE' && renderClaude()}
    </svg>
  );
};
