import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface SortedDataProps {
  size?: number;
  color?: string;
}

export const SortedData: React.FC<SortedDataProps> = ({
  size = 200,
  color = COLORS.SECONDARY_DARK,
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
        d="M30 20H70V80H30V20Z"
        stroke={color}
        strokeWidth="3"
      />
      <path d="M40 35H60" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 50H60" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 65H55" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
