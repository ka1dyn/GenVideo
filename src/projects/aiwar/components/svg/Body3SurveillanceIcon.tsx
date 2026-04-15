import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Body3SurveillanceIcon: React.FC<{ size?: number; color?: string }> = ({
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
          {/* Eye sketch */}
          <path
            d="M10 50 Q50 10 90 50 Q50 90 10 50 Z"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
          />
          <circle cx="50" cy="50" r="6" fill={color} />
        </svg>
      </Wobble>
    </div>
  );
};
