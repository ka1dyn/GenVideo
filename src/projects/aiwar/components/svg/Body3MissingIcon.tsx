import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Body3MissingIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 200,
  color = COLORS.TEXT_DISABLED,
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
          {/* Box outline */}
          <rect
            x="20"
            y="30"
            width="60"
            height="50"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinejoin="round"
          />
          {/* Question mark inside or dash */}
          <path
            d="M50 45 V65"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
          />
          <circle cx="50" cy="40" r="2" fill={color} />
        </svg>
      </Wobble>
    </div>
  );
};
