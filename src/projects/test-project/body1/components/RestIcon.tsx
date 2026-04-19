import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface RestIconProps {
  size?: number;
  color?: string;
}

export const RestIcon: React.FC<RestIconProps> = ({
  size = 200,
  color = COLORS.SECONDARY,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 70Q20 50 40 50Q40 30 60 30Q80 30 80 50Q95 50 95 70H20Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
