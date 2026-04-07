import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface FlashOverlayProps {
  /** Frame at which flash starts (local) */
  startFrame?: number;
  /** How many frames the flash lasts */
  durationInFrames?: number;
  color?: string;
  maxOpacity?: number;
}

export const FlashOverlay: React.FC<FlashOverlayProps> = ({
  startFrame = 0,
  durationInFrames = 20,
  color = "#050810",
  maxOpacity = 1,
}) => {
  const frame = useCurrentFrame();

  const elapsed = frame - startFrame;
  if (elapsed < 0 || elapsed > durationInFrames) return null;

  const mid = durationInFrames / 2;
  const opacity =
    elapsed <= mid
      ? interpolate(elapsed, [0, mid], [0, maxOpacity], {
          extrapolateRight: "clamp",
        })
      : interpolate(elapsed, [mid, durationInFrames], [maxOpacity, 0], {
          extrapolateRight: "clamp",
        });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: color,
        opacity,
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  );
};
