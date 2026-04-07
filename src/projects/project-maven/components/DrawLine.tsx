import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";

interface DrawLineProps {
  /** Frame at which drawing starts (local) */
  startFrame?: number;
  /** Duration of draw animation in frames */
  durationInFrames?: number;
  color?: string;
  thickness?: number;
  /** Total width of the line in pixels */
  width?: number | string;
  direction?: "ltr" | "rtl";
  style?: React.CSSProperties;
}

export const DrawLine: React.FC<DrawLineProps> = ({
  startFrame = 0,
  durationInFrames = 30,
  color = "#378ADD",
  thickness = 2,
  width = "100%",
  direction = "ltr",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 22, stiffness: 250, mass: 0.8 },
    durationInFrames,
  });

  const scaleX = progress;

  return (
    <div
      style={{
        height: thickness,
        width,
        backgroundColor: color,
        transform: `scaleX(${scaleX})`,
        transformOrigin: direction === "ltr" ? "left center" : "right center",
        boxShadow: `0 0 8px ${color}`,
        ...style,
      }}
    />
  );
};
