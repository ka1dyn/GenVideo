import React from 'react';
import { Wobble } from '../../../../shared-components/Wobble';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../../../../constants/theme'; // Import COLORS for the gear fill

interface HandDrawnNotionTemplateProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  wobbleIntensity?: number;
}

export const HandDrawnNotionTemplate: React.FC<HandDrawnNotionTemplateProps> = ({
  size = 100,
  strokeWidth = 3,
  color = 'black',
  wobbleIntensity = 1.0,
}) => {
  return (
    <Wobble intensity={wobbleIntensity} mode="smooth">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100" // Fixed viewBox
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Document shape */}
        <rect x="15" y="10" width="70" height="80" rx="8" ry="8" stroke={color} strokeWidth={strokeWidth} />
        {/* Lines inside document */}
        <line x1="25" y1="30" x2="65" y2="30" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="25" y1="45" x2="55" y2="45" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <line x1="25" y1="60" x2="65" y2="60" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />

        {/* Simple gear for automation - top right corner of document */}
        <g transform="translate(70, 20) scale(0.3)">
          <path
            d="M50 0 L60 15 L55 25 L70 30 L75 40 L65 50 L70 65 L60 75 L50 70 L35 75 L25 65 L30 50 L20 40 L25 30 L10 25 L15 15 Z"
            fill={color}
            stroke={color}
            strokeWidth={3}
          />
          <circle cx="45" cy="45" r="15" fill={COLORS.BG_BASE} stroke={color} strokeWidth={3} />
        </g>
      </svg>
    </Wobble>
  );
};
