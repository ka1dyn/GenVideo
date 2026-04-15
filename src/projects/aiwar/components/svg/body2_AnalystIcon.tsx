import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface Body2AnalystIconProps {
  size?: number;
  color?: string;
}

export const Body2AnalystIcon: React.FC<Body2AnalystIconProps> = ({
  size = 120,
  color = COLORS.CHAR_STROKE,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <circle cx="12" cy="7" r="1.5" strokeWidth="1" fill={color} />
    </svg>
  );
};
