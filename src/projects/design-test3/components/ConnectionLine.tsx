import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface ConnectionLineProps {
  points: [number, number][];
  color: string;
  strokeWidth?: number;
  isFlowing?: boolean;
  progress?: number; // 0 to 1
  opacity?: number;
  glowintensity?: number;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  points,
  color,
  strokeWidth = 2,
  isFlowing = false,
  progress = 1,
  opacity = 0.6,
  glowintensity = 0.5,
}) => {
  const frame = useCurrentFrame();

  const pathD = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');

  const dashArray = 40;
  const dashOffset = isFlowing ? -(frame * 2) % dashArray : 0;

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={isFlowing ? `${dashArray / 2} ${dashArray / 2}` : 'none'}
        strokeDashoffset={dashOffset}
        style={{
          opacity: progress * opacity,
          filter: `drop-shadow(0 0 ${glowintensity * 10}px ${color})`,
          transition: 'stroke-dashoffset 0.1s linear',
        }}
      />
    </svg>
  );
};
