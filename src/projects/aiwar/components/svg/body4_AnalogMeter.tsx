import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const body4_AnalogMeter: React.FC<{
  size?: number;
  progress?: number; // 0 to 1
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 400,
  progress = 0,
  color = COLORS.PRIMARY,
  strokeWidth = 3,
}) => {
  const frame = useCurrentFrame();
  
  // Needle jitter animation
  const jitter = (Math.sin(frame * 2) * 2) + (Math.cos(frame * 5) * 1);
  const needleRotation = interpolate(progress, [0, 1], [-60, 60]) + jitter;

  return (
    <Wobble>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer Frame */}
        <path d="M 10 90 Q 50 10 90 90" strokeWidth={strokeWidth + 1} />
        <path d="M 10 90 H 90" opacity={0.3} />

        {/* Scale Markers */}
        {[...Array(7)].map((_, i) => {
          const angle = -60 + (i * 20);
          const rad = (angle - 90) * (Math.PI / 180);
          const x1 = 50 + 35 * Math.cos(rad);
          const y1 = 90 + 35 * Math.sin(rad);
          const x2 = 50 + 42 * Math.cos(rad);
          const y2 = 90 + 42 * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={i % 3 === 0 ? 3 : 1} />
          );
        })}

        {/* Danger Zone Highlight */}
        <path 
           d="M 75 45 Q 85 60 90 90" 
           stroke={COLORS.STATE_ERROR_FG} 
           strokeWidth={strokeWidth * 2} 
           opacity={0.3} 
        />

        {/* Needle Hub */}
        <circle cx="50" cy="90" r="4" fill={color} />

        {/* Needle */}
        <line 
          x1="50" 
          y1="90" 
          x2={50 + 40 * Math.cos((needleRotation - 90) * (Math.PI / 180))} 
          y2={90 + 40 * Math.sin((needleRotation - 90) * (Math.PI / 180))} 
          stroke={progress > 0.8 ? COLORS.STATE_ERROR_FG : color}
          strokeWidth={4}
        />

        {/* Background Labels (Sketchy) */}
        <text x="15" y="85" fill={color} fontSize="6" fontFamily="monospace" opacity={0.5}>0%</text>
        <text x="80" y="85" fill={color} fontSize="6" fontFamily="monospace" opacity={0.5}>100%</text>
      </svg>
    </Wobble>
  );
};
