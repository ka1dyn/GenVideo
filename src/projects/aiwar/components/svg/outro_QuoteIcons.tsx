import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Outro_QuoteIcons: React.FC<{
  type: 'open' | 'close';
  size?: number;
  color?: string;
}> = ({ type, size = 120, color = COLORS.STROKE_INK }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {type === 'open' && (
        <g>
          <path
            d="M 30,40 Q 20,40 20,60 Q 20,80 40,80 L 40,60 Q 40,40 50,40"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <path
            d="M 60,40 Q 50,40 50,60 Q 50,80 70,80 L 70,60 Q 70,40 80,40"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
      )}
      {type === 'close' && (
        <g transform="rotate(180, 50, 50)">
          <path
            d="M 30,40 Q 20,40 20,60 Q 20,80 40,80 L 40,60 Q 40,40 50,40"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <path
            d="M 60,40 Q 50,40 50,60 Q 50,80 70,80 L 70,60 Q 70,40 80,40"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
};
