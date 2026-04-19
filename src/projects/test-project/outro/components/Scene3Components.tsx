import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const LinkIcon: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 100,
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
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </Wobble>
  );
};

export const Arrow: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 80,
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
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    </Wobble>
  );
};
