import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Heart: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 120,
  color = COLORS.PRIMARY_DARK,
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
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </Wobble>
  );
};

export const Bell: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 120,
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
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    </Wobble>
  );
};
