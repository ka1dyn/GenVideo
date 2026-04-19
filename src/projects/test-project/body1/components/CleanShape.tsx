import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface CleanShapeProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const CleanShape: React.FC<CleanShapeProps> = ({
  size = 400,
  color = COLORS.PRIMARY,
  strokeWidth = 3,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        rx="8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
