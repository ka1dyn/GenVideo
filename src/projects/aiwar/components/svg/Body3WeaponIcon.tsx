import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Body3WeaponIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 120,
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
          {/* Crosshair sketch */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
          />
          <path
            d="M50 10 V30 M50 70 V90 M10 50 H30 M70 50 H90"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="5" fill={color} />
        </svg>
      </Wobble>
    </div>
  );
};
