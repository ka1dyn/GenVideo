import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../theme';

interface Props {
  opacity?: number;
}

export const BackgroundGrid: React.FC<Props> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();
  
  // Subtle movement for the grid
  const moveX = interpolate(frame, [0, 600], [0, -20], { extrapolateRight: 'clamp' });
  const moveY = interpolate(frame, [0, 600], [0, -20], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          backgroundImage: `
            linear-gradient(to right, ${COLORS.BORDER} 1px, transparent 1px),
            linear-gradient(to bottom, ${COLORS.BORDER} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translate(${moveX}px, ${moveY}px)`,
          opacity: 0.5,
        }}
      />
      {/* Subtle radial glow to give depth */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at center, transparent 0%, ${COLORS.BG_VOID} 100%)`,
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
};
