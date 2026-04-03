import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, ANIMATION } from '../theme';

interface Props {
  size?: number;
  glowSize?: number;
  color?: string;
  glowColor?: string;
}

export const AISphere: React.FC<Props> = ({
  size = 200,
  glowSize = 60,
  color = COLORS.PRIMARY,
  glowColor = COLORS.PRIMARY_GLOW,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle pulsing animation
  const pulse = interpolate(
    Math.sin(frame / 20),
    [-1, 1],
    [0.95, 1.05]
  );

  // Floating rotation
  const rotate = interpolate(frame, [0, 360], [0, 360]);

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Outer Glow */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: glowColor,
          filter: `blur(${glowSize}px)`,
          transform: `scale(${pulse * 1.2})`,
          opacity: 0.6,
        }}
      />
      
      {/* Core Sphere */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, #FFFFFF 0%, ${color} 70%)`,
          boxShadow: EFFECTS.GLOW_MD,
          transform: `scale(${pulse}) rotate(${rotate}deg)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle internal patterns */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: `1px solid rgba(255,255,255,0.2)`,
            borderRadius: '50%',
            transform: `scale(0.8) rotate(${rotate * 0.5}deg)`,
          }}
        />
      </div>
    </div>
  );
};
