import React from 'react';
import { Wobble } from '../../../../shared-components/Wobble';
import { AbsoluteFill } from 'remotion';

interface HandDrawnDotsProps {
  size?: number; // Size of each dot
  gap?: number; // Gap between dots
  strokeWidth?: number;
  color?: string;
  wobbleIntensity?: number;
}

export const HandDrawnDots: React.FC<HandDrawnDotsProps> = ({
  size = 20,
  gap = 10,
  strokeWidth = 2,
  color = 'black',
  wobbleIntensity = 0.8,
}) => {
  return (
    <div style={{ display: 'flex', gap: gap }}>
      {[...Array(3)].map((_, i) => (
        <Wobble key={i} intensity={wobbleIntensity} mode="smooth">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={(size / 2) - (strokeWidth / 2)}
              stroke={color}
              strokeWidth={strokeWidth}
            />
          </svg>
        </Wobble>
      ))}
    </div>
  );
};
