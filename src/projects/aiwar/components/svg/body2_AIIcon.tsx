import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../../../constants/theme';

interface Body2AIIconProps {
  size?: number;
  color?: string;
}

export const Body2AIIcon: React.FC<Body2AIIconProps> = ({
  size = 120,
  color = COLORS.PRIMARY,
}) => {
  const frame = useCurrentFrame();
  
  // Animation calculations
  const rotation = (frame * 1.5) % 360;
  const pulse = interpolate(Math.sin(frame / 10), [-1, 1], [0.8, 1.2]);
  const innerPulse = interpolate(Math.sin(frame / 7), [-1, 1], [0.6, 1]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Glow (Subtle) */}
      <circle cx="50" cy="50" r="45" fill={color} opacity={0.05} />
      
      {/* Outer Rotating Ring */}
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="10 5"
        transform={`rotate(${rotation} 50 50)`}
        opacity={0.4}
      />

      {/* Static Concentric Rings */}
      <circle cx="50" cy="50" r="32" stroke={color} strokeWidth="1" opacity={0.2} />
      <circle cx="50" cy="50" r="24" stroke={color} strokeWidth="1" opacity={0.2} />

      {/* Orbiting Particles */}
      {[0, 120, 240].map((angle, i) => {
        const rad = ((angle + rotation * (i % 2 === 0 ? 1 : -1)) * Math.PI) / 180;
        const px = 50 + Math.cos(rad) * 40;
        const py = 50 + Math.sin(rad) * 40;
        return (
          <circle key={i} cx={px} cy={py} r="3" fill={color} />
        );
      })}

      {/* Core Unit */}
      <g transform={`scale(${pulse})`} style={{ transformOrigin: 'center' }}>
        <rect
          x="35"
          y="35"
          width="30"
          height="30"
          rx="6"
          fill={COLORS.BG_SURFACE}
          stroke={color}
          strokeWidth="3"
        />
        {/* Core Detail */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill={color}
          opacity={innerPulse}
        />
        <path
          d="M 40 40 L 60 60 M 60 40 L 40 60"
          stroke={color}
          strokeWidth="1"
          opacity={0.5}
        />
      </g>

      {/* Geometric Connections */}
      <path
        d="M 50 10 V 30 M 50 70 V 90 M 10 50 H 30 M 70 50 H 90"
        stroke={color}
        strokeWidth="1"
        opacity={0.3}
      />
    </svg>
  );
};

