import React from 'react';
import { Wobble } from '../../../../shared-components/Wobble';
import { AbsoluteFill } from 'remotion';

interface HandDrawnClockProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  wobbleIntensity?: number;
}

export const HandDrawnClock: React.FC<HandDrawnClockProps> = ({
  size = 100,
  strokeWidth = 3,
  color = 'black',
  wobbleIntensity = 1.0,
}) => {
  return (
    <Wobble intensity={wobbleIntensity} mode="smooth">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - (strokeWidth / 2)} // Adjust radius for stroke-width
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>
    </Wobble>
  );
};

