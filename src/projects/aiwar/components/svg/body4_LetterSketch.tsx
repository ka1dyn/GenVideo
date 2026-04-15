import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const body4_LetterSketch: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 400,
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
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
      {/* Signature lines at bottom */}
      <line x1="15" y1="16" x2="19" y2="16" />
      <line x1="15" y1="14" x2="18" y2="14" />
    </svg>
  );
};
