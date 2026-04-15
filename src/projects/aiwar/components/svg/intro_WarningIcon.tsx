import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const IntroWarningIcon: React.FC<{
  size?: number;
  color?: string;
}> = ({ size = 100, color = COLORS.STATE_ERROR_FG }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M 50 10 L 90 85 L 10 85 Z"
        stroke={color}
        strokeWidth={6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="47" y="35" width="6" height="30" rx="3" fill={color} />
      <circle cx="50" cy="75" r="4" fill={color} />
    </svg>
  );
};
