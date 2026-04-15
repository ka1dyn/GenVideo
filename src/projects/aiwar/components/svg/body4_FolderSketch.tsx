import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const body4_FolderSketch: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 300,
  color = COLORS.TEXT_SUB,
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
};
