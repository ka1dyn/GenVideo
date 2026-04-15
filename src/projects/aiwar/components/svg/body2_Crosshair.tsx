import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface Body2CrosshairProps {
  size?: number;
  color?: string;
  locked?: boolean;
}

export const Body2Crosshair: React.FC<Body2CrosshairProps> = ({
  size = 200,
  color = COLORS.STROKE_INK,
  locked = false,
}) => {
  const finalColor = locked ? COLORS.STATE_ERROR_FG : color;
  const strokeWidth = locked ? 3 : 1.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corner brackets */}
      <path d="M10 30 V10 H30" stroke={finalColor} strokeWidth={strokeWidth} />
      <path d="M70 10 H90 V30" stroke={finalColor} strokeWidth={strokeWidth} />
      <path d="M90 70 V90 H70" stroke={finalColor} strokeWidth={strokeWidth} />
      <path d="M30 90 H10 V70" stroke={finalColor} strokeWidth={strokeWidth} />

      {/* Center cross */}
      <line x1="45" y1="50" x2="55" y2="50" stroke={finalColor} strokeWidth={strokeWidth} />
      <line x1="50" y1="45" x2="50" y2="55" stroke={finalColor} strokeWidth={strokeWidth} />

      {/* Decorative circles if locked */}
      {locked && (
        <circle cx="50" cy="50" r="40" stroke={finalColor} strokeWidth="1" strokeDasharray="4 4" />
      )}
    </svg>
  );
};
