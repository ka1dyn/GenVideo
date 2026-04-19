import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Clock: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  rotation?: number;
}> = ({
  size = 300,
  color = COLORS.TEXT_MAIN,
  strokeWidth = SPACING.BORDER_NORMAL,
  rotation = 0,
}) => {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="50" cy="50" r="45" />
        {/* Ticks */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="15"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        {/* Hour Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          transform={`rotate(${rotation} 50 50)`}
          strokeWidth={strokeWidth * 2}
        />
        {/* Minute Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          transform={`rotate(${rotation * 12} 50 50)`}
        />
      </svg>
    </div>
  );
};

export const GiftBox: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 200,
  color = COLORS.PRIMARY_DARK,
  strokeWidth = SPACING.BORDER_THICK,
}) => {
  return (
    <Wobble>
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
        <path d="M20 12v10H4V12" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    </Wobble>
  );
};
