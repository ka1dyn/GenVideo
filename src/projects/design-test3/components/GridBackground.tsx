import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface GridBackgroundProps {
  color: string;
  opacity?: number;
  strokeWidth?: number;
  spacing?: number;
  speed?: number;
  angle?: number;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  color,
  opacity = 0.15,
  strokeWidth = 1,
  spacing = 80,
  speed = 1,
  angle = 0,
}) => {
  const frame = useCurrentFrame();
  const offset = (frame * speed) % spacing;

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <pattern
            id="grid-pattern"
            x={offset}
            y={offset}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
            />
          </pattern>
        </defs>
        <rect width="200%" height="200%" x="-50%" y="-50%" fill="url(#grid-pattern)" />
      </svg>
    </AbsoluteFill>
  );
};
