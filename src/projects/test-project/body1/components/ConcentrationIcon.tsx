import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface ConcentrationIconProps {
  size?: number;
  color?: string;
}

export const ConcentrationIcon: React.FC<ConcentrationIconProps> = ({
  size = 200,
  color = COLORS.PRIMARY,
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
        d="M60 10L30 50H50L40 90L70 50H50L60 10Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
