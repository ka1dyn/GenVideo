import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Body3GavelIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 150,
  color = COLORS.TEXT_MAIN,
}) => {
  return (
    <div style={{ width: size, height: size }}>
      <Wobble>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Gavel head */}
          <path
            d="M30 20 L70 20 L75 50 L25 50 Z"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Gavel handle */}
          <path
            d="M50 50 L50 90"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
          />
          {/* Base */}
          <path
            d="M20 90 L80 90"
            stroke={color}
            strokeWidth={SPACING.BORDER_NORMAL}
            strokeLinecap="round"
          />
        </svg>
      </Wobble>
    </div>
  );
};
