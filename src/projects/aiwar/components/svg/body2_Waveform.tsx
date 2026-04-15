import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../../../../constants/theme';

interface Body2WaveformProps {
  size?: number;
  color?: string;
  progress?: number;
}

export const Body2Waveform: React.FC<Body2WaveformProps> = ({
  size = 300,
  color = COLORS.PRIMARY,
}) => {
  const frame = useCurrentFrame();

  return (
    <svg
      width={size}
      height={100}
      viewBox="0 0 300 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 40 }).map((_, i) => {
        const height = interpolate(
          Math.sin(frame * 0.2 + i * 0.5),
          [-1, 1],
          [10, 80]
        );
        return (
          <rect
            key={i}
            x={i * 7.5}
            y={50 - height / 2}
            width={4}
            height={height}
            fill={color}
            rx={2}
          />
        );
      })}
    </svg>
  );
};
