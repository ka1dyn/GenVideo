import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const IntroAiBoxes: React.FC<{
  index: number;
  size?: number;
}> = ({ index, size = 200 }) => {
  const colors = [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.PRIMARY_BOLD];
  const color = colors[index % colors.length];
  
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Outer hand-drawn square */}
      <path
        d="M 10 10 L 90 12 L 88 90 L 12 88 Z"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Inner pattern */}
      {index === 0 && ( // GPT style - grid
        <path d="M 30 30 H 70 M 30 50 H 70 M 30 70 H 70 M 30 30 V 70 M 50 30 V 70 M 70 30 V 70" stroke={color} strokeWidth={1} opacity={0.5} />
      )}
      {index === 1 && ( // Gemini style - sparkle
        <path d="M 50 20 L 60 40 L 80 50 L 60 60 L 50 80 L 40 60 L 20 50 L 40 40 Z" stroke={color} strokeWidth={2} />
      )}
      {index === 2 && ( // Claude style - circles
        <circle cx="50" cy="50" r="25" stroke={color} strokeWidth={2} strokeDasharray="4 2" />
      )}
    </svg>
  );
};
