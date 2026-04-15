import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const body4_SchoolSketch: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 400,
  color = COLORS.TEXT_BODY,
  strokeWidth = 2,
}) => {
  return (
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
      {/* Main Building Frame */}
      <path
        d="M20 80 L20 45 Q50 35 80 45 L80 80"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      {/* Roof Detail */}
      <path
        d="M15 48 L50 25 L85 48"
        stroke={color}
        strokeWidth={strokeWidth + 0.5}
      />
      <path d="M50 25 L50 20 M45 20 L55 20" stroke={color} strokeWidth={1.5} /> {/* Chimney/Spire */}

      {/* Clock on the wall */}
      <circle cx="50" cy="42" r="6" stroke={color} strokeWidth={1} />
      <line x1="50" y1="42" x2="50" y2="39" stroke={color} strokeWidth={1} />
      <line x1="50" y1="42" x2="53" y2="42" stroke={color} strokeWidth={1} />

      {/* School Name Sign */}
      <rect x="35" y="72" width="30" height="8" rx="2" stroke={color} strokeWidth={1} />
      <path d="M40 76 H60" stroke={color} strokeWidth={0.5} opacity={0.6} />

      {/* Windows with cross-bars */}
      <rect x="28" y="52" width="12" height="12" stroke={color} strokeWidth={1} />
      <path d="M28 58 H40 M34 52 V64" stroke={color} strokeWidth={0.5} opacity={0.8} />

      <rect x="60" y="52" width="12" height="12" stroke={color} strokeWidth={1} />
      <path d="M60 58 H72 M66 52 V64" stroke={color} strokeWidth={0.5} opacity={0.8} />

      {/* Door */}
      <path d="M45 80 V65 H55 V80" stroke={color} strokeWidth={strokeWidth} />

      {/* Nature/Trees with more organic feel */}
      <path
        d="M10 80 Q0 65 10 50 Q20 65 10 80"
        stroke={COLORS.SECONDARY_MID}
        strokeWidth={1.5}
      />
      <path
        d="M90 80 Q80 70 90 60 Q100 70 90 80"
        stroke={COLORS.SECONDARY_MID}
        strokeWidth={1.5}
      />
    </svg>
  );
};
