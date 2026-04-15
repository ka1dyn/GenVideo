import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const body4_ExplosionSketch: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 800,
  color = COLORS.TEXT_ON_DARK,
  strokeWidth = 3,
}) => {
  const frame = useCurrentFrame();

  return (
    <Wobble>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Core Flash / Blast Lines */}
        <path d="M 50 50 L 5 5 M 50 50 L 95 5 M 50 50 L 5 95 M 50 50 L 95 95" strokeWidth={strokeWidth * 1.5} opacity={0.8} />
        <path d="M 50 50 L 20 20 M 50 50 L 80 20 M 50 50 L 20 80 M 50 50 L 80 80" strokeWidth={strokeWidth} opacity={0.6} />

        {/* Shrapnel / Debris Outlines */}
        <path d="M 40 30 Q 50 20 60 30 L 50 40 Z" />
        <path d="M 30 60 L 20 50 Q 30 40 40 50 Z" />
        <path d="M 70 70 L 80 60 L 90 75 Q 80 85 70 70 Z" />
        <path d="M 60 40 Q 70 35 75 45 L 65 55 Z" />

        {/* Sharp Glitch Lines / Distortions */}
        <path d="M 20 80 L 10 90 M 15 85 L 30 95" stroke={COLORS.STATE_ERROR_FG} strokeWidth={strokeWidth / 2} />
        <path d="M 70 10 L 85 25 M 65 20 L 90 30" stroke={COLORS.STATE_ERROR_FG} strokeWidth={strokeWidth / 2} />
        <path d="M 30 20 L 40 10 M 25 15 L 15 25" stroke={COLORS.STATE_ERROR_FG} strokeWidth={strokeWidth / 2} />
        
        {/* Abstract cloud outlines */}
        <path d="M 45 45 Q 30 30 50 25 Q 70 30 55 45" opacity={0.4} />
        <path d="M 50 55 Q 65 70 45 75 Q 25 70 40 55" opacity={0.4} />
      </svg>
    </Wobble>
  );
};
