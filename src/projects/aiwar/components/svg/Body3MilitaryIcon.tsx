import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Body3MilitaryIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 200,
  color = COLORS.TEXT_MAIN,
}) => {
  return (
    <div style={{ width: size, height: size }}>
      <Wobble>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Tank body sketch */}
          <path
            d="M40 140 H160 V160 H40 Z"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60 110 H140 V140 H60 Z"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M100 110 V90 H160"
            stroke={color}
            strokeWidth={SPACING.BORDER_THICK}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Wheels */}
          <circle cx="60" cy="160" r="10" stroke={color} strokeWidth={SPACING.BORDER_NORMAL} />
          <circle cx="100" cy="160" r="10" stroke={color} strokeWidth={SPACING.BORDER_NORMAL} />
          <circle cx="140" cy="160" r="10" stroke={color} strokeWidth={SPACING.BORDER_NORMAL} />
        </svg>
      </Wobble>
    </div>
  );
};
