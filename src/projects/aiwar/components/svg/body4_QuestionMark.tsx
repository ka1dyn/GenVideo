import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const body4_QuestionMark: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 200,
  color = COLORS.PRIMARY,
  strokeWidth = 3,
}) => {
  return (
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
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
};
