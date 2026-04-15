import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface Body2SignalIconProps {
  size?: number;
  color?: string;
}

export const Body2SignalIcon: React.FC<Body2SignalIconProps> = ({
  size = 64,
  color = COLORS.PRIMARY,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 20a10 10 0 0 1 20 0" />
      <path d="M5 20a7 7 0 0 1 14 0" />
      <path d="M8 20a4 4 0 0 1 8 0" />
      <path d="M12 20l0 -2" />
    </svg>
  );
};
