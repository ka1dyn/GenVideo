import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Outro_ScenarioIcons: React.FC<{
  type: 'territory' | 'resource';
  size?: number;
  color?: string;
}> = ({ type, size = 180, color = COLORS.STROKE_INK }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {type === 'territory' && (
        <g>
          {/* Abstract Island/Map shape */}
          <path
            d="M 30,40 Q 40,20 60,30 T 90,45 T 85,80 T 50,95 T 25,75 Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
          {/* Boundary/Conflict line */}
          <path
            d="M 40,35 Q 60,60 80,85"
            stroke={COLORS.STATE_ERROR_FG}
            strokeWidth={3}
            strokeDasharray="4 4"
          />
          {/* Small settlement dots */}
          <circle cx="45" cy="55" r="3" fill={color} />
          <circle cx="70" cy="45" r="3" fill={color} />
          <circle cx="65" cy="75" r="3" fill={color} />
        </g>
      )}

      {type === 'resource' && (
        <g>
          {/* Storage Tank shape */}
          <path
            d="M 35,40 L 85,40 L 88,85 L 32,85 Z"
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M 35,40 Q 60,30 85,40"
            stroke={color}
            strokeWidth={2}
          />
          {/* Liquid/Energy level */}
          <path
            d="M 33,70 Q 60,65 87,70"
            stroke={COLORS.PRIMARY}
            strokeWidth={1.5}
          />
          <path
            d="M 33,70 L 87,70 L 88,85 L 32,85 Z"
            fill={COLORS.PRIMARY_LIGHT}
            opacity={0.4}
          />
          {/* Warning sign on tank */}
          <path
            d="M 60,48 L 65,58 L 55,58 Z"
            fill={COLORS.STATE_WARN_FG}
          />
        </g>
      )}
    </svg>
  );
};
