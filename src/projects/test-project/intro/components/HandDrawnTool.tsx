import React from 'react';
import { Wobble } from '../../../../shared-components/Wobble';
import { AbsoluteFill } from 'remotion';

interface HandDrawnToolProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  wobbleIntensity?: number;
}

export const HandDrawnTool: React.FC<HandDrawnToolProps> = ({
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
        viewBox="0 0 100 100" // Use a fixed viewBox for easier drawing, scale with size prop
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }} // Allow wobble to go outside viewBox
      >
        {/* Simple wrench shape */}
        <path
          d="M 10 90 L 30 70 L 70 30 L 90 10 L 80 0 L 60 20 L 20 60 L 0 80 Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Wrench head */}
        <path
          d="M 75 25 L 85 15 M 85 25 L 75 15"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Wobble>
  );
};

