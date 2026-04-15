import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../../../constants/theme';

export const body4_MorningSun: React.FC<{
  size?: number;
  color?: string;
}> = ({
  size = 150,
  color = COLORS.STATE_WARN_BG,
}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 15), [-1, 1], [0.8, 1.2]);
  
  return (
    <div style={{ 
      width: size, 
      height: size, 
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Outer Glow */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: color,
        borderRadius: '50%',
        filter: 'blur(30px)',
        opacity: 0.4 * pulse,
      }} />
      
      {/* Sun Core */}
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 100 100"
        fill="none"
        stroke={COLORS.STATE_WARN_FG}
        strokeWidth={3}
      >
        <circle cx="50" cy="50" r="25" fill={color} opacity={0.8} />
        {/* Sun Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="15"
            x2="50"
            y2="5"
            transform={`rotate(${angle} 50 50)`}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
};
