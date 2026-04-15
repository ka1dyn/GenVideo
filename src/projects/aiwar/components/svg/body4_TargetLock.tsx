import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../../../constants/theme';

export const body4_TargetLock: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 600,
  color = COLORS.STATE_ERROR_FG,
  strokeWidth = 4,
}) => {
  const frame = useCurrentFrame();
  
  // Create an aggressive pulsing and rotating effect
  const pulse = interpolate(Math.sin(frame / 2), [-1, 1], [0.8, 1.2]);
  const rotation = (frame * 2) % 360;

  return (
    <div style={{
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Outer Reticle bounds */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth / 5}
        style={{ transform: `scale(${pulse})` }}
      >
        {/* Corner pieces */}
        <path d="M 10 30 L 10 10 L 30 10" strokeWidth={strokeWidth / 2} />
        <path d="M 90 30 L 90 10 L 70 10" strokeWidth={strokeWidth / 2} />
        <path d="M 10 70 L 10 90 L 30 90" strokeWidth={strokeWidth / 2} />
        <path d="M 90 70 L 90 90 L 70 90" strokeWidth={strokeWidth / 2} />
        
        {/* Rotating inner circle segment */}
        <circle cx="50" cy="50" r="30" strokeDasharray="30 20 10 20" style={{ transformOrigin: '50px 50px', transform: `rotate(${rotation}deg)` }} opacity={0.6} />
        <circle cx="50" cy="50" r="15" strokeDasharray="5 15" style={{ transformOrigin: '50px 50px', transform: `rotate(${-rotation * 2}deg)` }} />
        
        {/* Crosshair lines */}
        <line x1="50" y1="10" x2="50" y2="40" opacity={0.8} />
        <line x1="50" y1="90" x2="50" y2="60" opacity={0.8} />
        <line x1="10" y1="50" x2="40" y2="50" opacity={0.8} />
        <line x1="90" y1="50" x2="60" y2="50" opacity={0.8} />

        {/* Center Target Dot */}
        <circle cx="50" cy="50" r="2" fill={color} />
      </svg>
      
      {/* Digital Text Overlay */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '15%',
        color: color,
        fontFamily: 'monospace',
        fontSize: size * 0.04,
        fontWeight: 'bold',
        textShadow: `0 0 10px ${color}`,
      }}>
        [LOCKED]
      </div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        color: color,
        fontFamily: 'monospace',
        fontSize: size * 0.03,
        textShadow: `0 0 10px ${color}`,
      }}>
        TGT: {Math.floor(random(frame) * 99999).toString().padStart(5, '0')}
      </div>
    </div>
  );
};

// Helper random generator since we need it in component
const random = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};
