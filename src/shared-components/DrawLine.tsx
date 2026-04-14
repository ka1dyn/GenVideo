import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

interface DrawLineProps {
  /** Frame at which drawing starts (local) */
  startFrame?: number;
  /** Duration of draw animation in frames */
  durationInFrames?: number;
  color?: string;
  thickness?: number;
  /** Alias for thickness to prevent AI errors */
  strokeWidth?: number;
  /** Total width of the line in pixels */
  width?: number | string;
  direction?: "ltr" | "rtl";
  style?: React.CSSProperties;
}

/**
 * A marker-style highlighter underline that draws itself in with a spring animation.
 * Use under text elements for a hand-highlighted notebook feel.
 */
export const DrawLine: React.FC<DrawLineProps> = ({
  startFrame = 0,
  durationInFrames = 30,
  color = "#E8A87C",
  thickness,
  strokeWidth = 2,
  width = "100%",
  direction = "ltr",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const finalThickness = thickness ?? strokeWidth;

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
        height: finalThickness,
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
