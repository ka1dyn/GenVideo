import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const IntroUnderline: React.FC<{
  width: number;
  height: number;
  color?: string;
  strokeWidth?: number;
}> = ({ width, height, color = COLORS.PRIMARY, strokeWidth = 4 }) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <path
        d={`M 4 ${height / 2} Q ${width / 4} ${height / 2 + 5}, ${width / 2} ${height / 2} T ${width - 4} ${height / 2}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};
