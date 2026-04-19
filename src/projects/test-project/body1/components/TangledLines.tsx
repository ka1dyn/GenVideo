import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface TangledLinesProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const TangledLines: React.FC<TangledLinesProps> = ({
  size = 400,
  color = COLORS.STROKE_INK,
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
      <path
        d="M20,50 Q30,20 50,50 T80,50 M30,40 Q50,70 70,40 T90,60 M10,60 Q40,30 60,60 T90,40 M40,20 Q60,80 80,20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
