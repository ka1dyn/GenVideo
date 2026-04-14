import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface ScanLineProps {
  /** Frame at which sweep starts (local) */
  startFrame?: number;
  /** Duration of a single sweep in frames */
  sweepDuration?: number;
  color?: string;
  opacity?: number;
  thickness?: number;
  /** Alias for thickness to prevent AI errors */
  strokeWidth?: number;
  /** If true, repeats the sweep */
  loop?: boolean;
}

export const ScanLine: React.FC<ScanLineProps> = ({
  startFrame = 0,
  sweepDuration = 60,
  color = "#378ADD",
  opacity = 0.6,
  thickness,
  strokeWidth = 2,
  loop = false,
}) => {
  const frame = useCurrentFrame();

  const finalThickness = thickness ?? strokeWidth;

  const elapsed = Math.max(0, frame - startFrame);
  const progress = loop
    ? (elapsed % sweepDuration) / sweepDuration
    : Math.min(elapsed / sweepDuration, 1);

  const yPercent = progress * 100;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `${yPercent}%`,
          left: 0,
          width: "100%",
          height: finalThickness,
          backgroundColor: color,
          opacity,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
};
