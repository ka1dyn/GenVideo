import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

interface StatusTagProps {
  /** Label text */
  label: string;
  /** Frame at which tag enters (local) */
  startFrame?: number;
  /** Tag background color */
  bgColor?: string;
  /** Tag text color */
  textColor?: string;
  /** Border color */
  borderColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  /** Show pulsing status dot */
  showDot?: boolean;
  /** Dot color */
  dotColor?: string;
  style?: React.CSSProperties;
}

export const StatusTag: React.FC<StatusTagProps> = ({
  label,
  startFrame = 0,
  bgColor = "transparent",
  textColor = "#E8EEFA",
  borderColor = "rgba(255, 255, 255, 0.08)",
  fontSize = 18,
  fontFamily = "'JetBrains Mono', monospace",
  fontWeight = 500,
  showDot = false,
  dotColor = "#1D9E75",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 22, stiffness: 250, mass: 0.8 },
  });

  // Pulse for dot — cycles every 60 frames
  const dotPulse = showDot
    ? interpolate(
        Math.sin(((frame - startFrame) / 60) * Math.PI * 2),
        [-1, 1],
        [0.4, 1],
      )
    : 1;

  return (
    <div
      style={{
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [-8, 0])}px)`,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 14px",
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        ...style,
      }}
    >
      {showDot && (
        <div
          style={{
            width: 6,
            height: 6,
            backgroundColor: dotColor,
            opacity: dotPulse,
            boxShadow: `0 0 8px ${dotColor}`,
          }}
        />
      )}
      <span
        style={{
          color: textColor,
          fontSize,
          fontFamily,
          fontWeight,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
};
