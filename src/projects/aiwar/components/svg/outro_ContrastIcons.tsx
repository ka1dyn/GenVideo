import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Outro_ContrastIcons: React.FC<{
  type: 'human' | 'ai';
  size?: number;
}> = ({ type, size = 200 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {type === 'human' && (
        <g>
          {/* Sketchy Heart Shape (Emotion) */}
          <path
            d="M 60,95 C 40,80 20,60 20,40 C 20,25 35,20 45,20 C 53,20 60,30 60,30 C 60,30 67,20 75,20 C 85,20 100,25 100,40 C 100,60 80,80 60,95 Z"
            stroke={COLORS.PRIMARY_BOLD}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* Nervous/Thinking lines inside */}
          <path d="M 45,35 Q 50,45 40,55" stroke={COLORS.PRIMARY_MID} strokeWidth={1} />
          <path d="M 75,35 Q 70,45 80,55" stroke={COLORS.PRIMARY_MID} strokeWidth={1} />
          <path d="M 60,50 V 70" stroke={COLORS.PRIMARY_MID} strokeWidth={1} strokeDasharray="2 3" />
        </g>
      )}

      {type === 'ai' && (
        <g>
          {/* Geometric Grid / Logic Gate (Efficiency) */}
          <rect x="20" y="20" width="80" height="80" stroke={COLORS.STROKE_INK} strokeWidth={1} strokeDasharray="3 3" />
          <path
            d="M 20,50 L 50,20 L 80,50 L 50,80 L 20,50 Z"
            stroke={COLORS.STROKE_INK}
            strokeWidth={2}
          />
          {/* Target points */}
          <circle cx="50" cy="50" r="5" fill={COLORS.STATE_ERROR_FG} />
          <path d="M 50,50 L 90,90" stroke={COLORS.STROKE_INK} strokeWidth={1.5} />
          <path d="M 90,85 V 95 H 80" stroke={COLORS.STROKE_INK} strokeWidth={1.5} />
          {/* Efficient path line */}
          <path d="M 30,90 C 50,90 50,50 50,50" stroke={COLORS.TEXT_SUB} strokeWidth={2} strokeDasharray="4 2" />
        </g>
      )}
    </svg>
  );
};
