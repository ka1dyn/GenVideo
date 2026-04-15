import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface Body2ScanLineProps {
  color?: string;
  width?: number;
  height?: number;
}

export const Body2ScanLine: React.FC<Body2ScanLineProps> = ({
  color = COLORS.PRIMARY,
  width = 2,
  height = 400,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill={color} fillOpacity="0.6" />
      <rect width={width} height={height / 4} fill={color} />
      <rect y={height * 0.75} width={width} height={height / 4} fill={color} />
    </svg>
  );
};
