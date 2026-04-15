import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Outro_AiModels: React.FC<{
  type: 'gpt' | 'claude' | 'gemini';
  size?: number;
  color?: string;
}> = ({ type, size = 150, color = COLORS.TEXT_MAIN }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {type === 'gpt' && (
        <g>
          {/* Chat Bubble Base */}
          <path
            d="M 20 25 L 80 22 L 78 65 L 45 68 L 25 85 L 28 66 L 20 65 Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Sparkle inside */}
          <path
            d="M 45 35 L 50 45 L 60 50 L 50 55 L 45 65 L 40 55 L 30 50 L 40 45 Z"
            fill={COLORS.SECONDARY_MID}
            opacity={0.6}
          />
        </g>
      )}
      
      {type === 'claude' && (
        <g>
          {/* Outer circle (Dashed/Sketchy) */}
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke={color}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          {/* Inner core (Multi-layer circles) */}
          <circle cx="50" cy="50" r="15" stroke={COLORS.PRIMARY} strokeWidth={2} />
          <circle cx="50" cy="50" r="5" fill={COLORS.PRIMARY_BOLD} />
          {/* Orbits */}
          <path d="M 20 50 Q 50 20 80 50" stroke={color} strokeWidth={1} opacity={0.3} />
          <path d="M 20 50 Q 50 80 80 50" stroke={color} strokeWidth={1} opacity={0.3} />
        </g>
      )}

      {type === 'gemini' && (
        <g>
          {/* Twin Sparkles */}
          <path
            d="M 35 20 L 42 35 L 55 42 L 42 49 L 35 64 L 28 49 L 15 42 L 28 35 Z"
            stroke={COLORS.SECONDARY_BOLD}
            strokeWidth={1.5}
          />
          <path
            d="M 65 50 L 70 60 L 80 65 L 70 70 L 65 80 L 60 70 L 50 65 L 60 60 Z"
            stroke={COLORS.SECONDARY}
            strokeWidth={1.5}
          />
          {/* Connection line */}
          <path d="M 40 45 L 60 60" stroke={color} strokeWidth={1} strokeDasharray="2 2" />
        </g>
      )}
    </svg>
  );
};
