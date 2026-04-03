import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface DataNodeProps {
  type?: 'square' | 'rhombus' | 'circle' | 'hexagon';
  size?: number;
  color: string;
  glowColor?: string;
  glowIntensity?: number; // 0 to 1
  label?: string;
  labelColor?: string;
  isGlowing?: boolean;
  pulseSpeed?: number;
  style?: React.CSSProperties;
}

export const DataNode: React.FC<DataNodeProps> = ({
  type = 'rhombus',
  size = 60,
  color,
  glowColor,
  glowIntensity = 0.5,
  label,
  labelColor = '#FFFFFF',
  isGlowing = true,
  pulseSpeed = 0.05,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const renderShape = () => {
    switch (type) {
      case 'circle':
        return <circle cx={size / 2} cy={size / 2} r={(size / 2) * 0.8} fill={color} />;
      case 'square':
        return (
          <rect
            x={size * 0.15}
            y={size * 0.15}
            width={size * 0.7}
            height={size * 0.7}
            fill={color}
          />
        );
      case 'hexagon':
        return (
          <polygon
            points={`${size * 0.5},${size * 0.05} ${size * 0.95},${size * 0.25} ${size * 0.95},${
              size * 0.75
            } ${size * 0.5},${size * 0.95} ${size * 0.05},${size * 0.75} ${size * 0.05},${
              size * 0.25
            }`}
            fill={color}
          />
        );
      case 'rhombus':
      default:
        return (
          <polygon
            points={`${size / 2},${size * 0.1} ${size * 0.9},${size / 2} ${size / 2},${
              size * 0.9
            } ${size * 0.1},${size / 2}`}
            fill={color}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          filter: isGlowing
            ? `drop-shadow(0 0 ${size * 0.2 * glowIntensity}px ${glowColor || color})`
            : 'none',
        }}
      >
        {renderShape()}
      </svg>
      {label && (
        <span
          style={{
            marginTop: 8,
            color: labelColor,
            fontSize: size * 0.3,
            fontWeight: 600,
            fontFamily: 'JetBrains Mono, monospace',
            textShadow: `0 0 10px ${color}`,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
