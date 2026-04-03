import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface GlassPanelProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderColor?: string;
  borderRadius?: number;
  padding?: number;
  style?: React.CSSProperties;
  entryDelay?: number;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  width = "auto",
  height = "auto",
  borderColor = "rgba(255, 255, 255, 0.1)",
  borderRadius = 16,
  padding = 24,
  style = {},
  entryDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame: frame - entryDelay,
    fps,
    config: { stiffness: 100, damping: 15 },
  });

  const scale = interpolate(entry, [0, 1], [0.95, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const translateY = interpolate(entry, [0, 1], [20, 0]);

  return (
    <div
      style={{
        width,
        height,
        padding,
        borderRadius,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        border: `1px solid ${borderColor}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
