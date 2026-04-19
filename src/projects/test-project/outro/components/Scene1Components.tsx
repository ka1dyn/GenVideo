import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Star: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 120,
  color = COLORS.PRIMARY,
  strokeWidth = SPACING.BORDER_THICK,
}) => {
  return (
    <Wobble>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </Wobble>
  );
};

export const CheckMark: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 40,
  color = COLORS.SECONDARY_DARK,
  strokeWidth = SPACING.BORDER_THICK,
}) => {
  return (
    <Wobble>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </Wobble>
  );
};
