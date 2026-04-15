import React from 'react';
import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { COLORS, ANIMATION } from '../../../../constants/theme';

export const IntroClaudeSystem: React.FC<{
  size?: number;
}> = ({ size = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Phase 1: Core assembly (0-60f)
  const assemblySpring = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  
  // Phase 2: Claude Reveal (after 120f)
  const revealSpring = spring({ frame: frame - 120, fps, config: ANIMATION.SPRING_BOUNCY });
  
  const center = size / 2;
  const radius = (size / 2) * 0.7;
  
  // Hexagon points
  const getHexPoint = (angleIdx: number, rad: number) => {
    const angle = (angleIdx * 60 - 90) * (Math.PI / 180);
    return {
      x: center + Math.cos(angle) * rad,
      y: center + Math.sin(angle) * rad,
    };
  };

  const hexPoints = [0, 1, 2, 3, 4, 5].map(i => getHexPoint(i, radius * assemblySpring));
  const innerHexPoints = [0, 1, 2, 3, 4, 5].map(i => getHexPoint(i, radius * 0.4 * assemblySpring));
  const hexPath = `M ${hexPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
  const innerHexPath = `M ${innerHexPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Decorative Outer Orbits */}
      <circle
        cx={center}
        cy={center}
        r={radius * 1.2}
        stroke={COLORS.STROKE_SUBTLE}
        strokeWidth={1}
        strokeDasharray="4 8"
        opacity={0.3 * assemblySpring}
      />

      {/* Tactical Hexagon Frame */}
      <path
        d={hexPath}
        stroke={COLORS.SECONDARY}
        strokeWidth={3}
        strokeDasharray="20 10"
        opacity={0.5 * assemblySpring}
      />

      {/* Connection Lines (Hand-drawn feel via dash) */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const p = hexPoints[i];
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke={COLORS.SECONDARY_SOFT}
            strokeWidth={1.5}
            strokeDasharray="5 5"
            opacity={0.4 * assemblySpring}
          />
        );
      })}

      {/* Inner Core (Expands during reveal) */}
      <path
        d={innerHexPath}
        fill={COLORS.BG_SURFACE}
        stroke={COLORS.SECONDARY_DARK}
        strokeWidth={2}
        opacity={0.8 * assemblySpring}
        transform={`scale(${interpolate(revealSpring, [0, 1], [1, 1.4])})`}
        style={{ transformOrigin: `${center}px ${center}px` }}
      />

      {/* Pulse Effect */}
      <circle
        cx={center}
        cy={center}
        r={radius * 0.4 * (1 + 0.2 * revealSpring)}
        stroke={COLORS.SECONDARY}
        strokeWidth={2 + 4 * revealSpring}
        opacity={interpolate(revealSpring, [0, 0.5, 1], [0, 0.5, 0])}
      />

      {/* Claude Reveal Points */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const dist = radius * 0.4 * (1 + 0.6 * revealSpring);
        const x = center + Math.cos(angle) * dist;
        const y = center + Math.sin(angle) * dist;
        
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r={4}
            fill={COLORS.SECONDARY_BOLD}
            opacity={revealSpring}
          />
        );
      })}
    </svg>
  );
};
