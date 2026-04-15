import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Outro_DecisionFlow: React.FC<{
  progress: number;
  size?: number;
}> = ({ progress, size = 250 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      {/* Box A: Agony */}
      <g opacity={progress > 0.1 ? 1 : 0}>
        <rect x="20" y="20" width="40" height="25" stroke={COLORS.TEXT_SUB} strokeWidth={1.5} />
        <path d="M 15,15 L 65,50" stroke={COLORS.STATE_ERROR_FG} strokeWidth={3} opacity={progress > 0.4 ? 1 : 0} />
      </g>

      {/* Box B: Hesitation */}
      <g opacity={progress > 0.2 ? 1 : 0}>
        <rect x="90" y="20" width="40" height="25" stroke={COLORS.TEXT_SUB} strokeWidth={1.5} />
        <path d="M 85,15 L 135,50" stroke={COLORS.STATE_ERROR_FG} strokeWidth={3} opacity={progress > 0.5 ? 1 : 0} />
      </g>

      {/* Central Option: Optimization */}
      <g opacity={progress > 0.6 ? 1 : 0}>
        <rect
          x="45"
          y="70"
          width="60"
          height="35"
          stroke={COLORS.PRIMARY_BOLD}
          strokeWidth={2}
          fill={COLORS.PRIMARY_LIGHT}
          opacity={0.3}
        />
        {/* Core spark */}
        <path
          d="M 75,78 L 78,85 L 85,88 L 78,91 L 75,98 L 72,91 L 65,88 L 72,85 Z"
          fill={COLORS.PRIMARY_BOLD}
        />
      </g>

      {/* Connecting Arrows */}
      <path
        d="M 40,45 Q 40,60 55,75"
        stroke={COLORS.STROKE_SUBTLE}
        strokeWidth={1.5}
        strokeDasharray="2 2"
        opacity={progress > 0.7 ? 1 : 0}
      />
      <path
        d="M 110,45 Q 110,60 95,75"
        stroke={COLORS.STROKE_SUBTLE}
        strokeWidth={1.5}
        strokeDasharray="2 2"
        opacity={progress > 0.7 ? 1 : 0}
      />
      
      {/* Result Arrow */}
      <path
        d="M 75,105 V 135"
        stroke={COLORS.PRIMARY_BOLD}
        strokeWidth={2}
        opacity={progress > 0.9 ? 1 : 0}
      />
      <path
        d="M 65,128 L 75,138 L 85,128"
        stroke={COLORS.PRIMARY_BOLD}
        strokeWidth={2}
        opacity={progress > 0.9 ? 1 : 0}
      />
    </svg>
  );
};
