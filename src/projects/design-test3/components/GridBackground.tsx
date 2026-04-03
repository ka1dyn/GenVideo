import React from "react";
import { AbsoluteFill, useVideoConfig, interpolate, useCurrentFrame } from "remotion";

interface GridBackgroundProps {
  color?: string;
  borderColor?: string;
  cellSize?: number;
  opacity?: number;
  pulse?: boolean;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  color = "transparent",
  borderColor = "rgba(255, 255, 255, 0.05)",
  cellSize = 60,
  opacity = 1,
  pulse = false,
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const pulseOpacity = pulse
    ? interpolate(Math.sin(frame / 30), [-1, 1], [0.3, 0.7])
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity: opacity * pulseOpacity,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -cellSize,
          left: -cellSize,
          right: -cellSize,
          bottom: -cellSize,
          backgroundImage: `
            linear-gradient(to right, ${borderColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${borderColor} 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />
    </AbsoluteFill>
  );
};
