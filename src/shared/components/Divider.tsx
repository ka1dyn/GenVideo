import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, SPACING } from "../constants/design";
import { CLAMP } from "../constants/animations";

type DividerProps = {
  variant?: "line" | "gradient" | "glow" | "dashed";
  width?: string;
  delay?: number;
};

export const Divider: React.FC<DividerProps> = ({
  variant = "line",
  width = "100%",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const scaleX = interpolate(adjustedFrame, [0, fps * 0.5], [0, 1], CLAMP);
  const opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);

  const getStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      width,
      height: 1,
      opacity,
      transform: `scaleX(${scaleX})`,
      transformOrigin: "left center",
      margin: `${SPACING.SM}px 0`,
    };

    switch (variant) {
      case "gradient":
        return {
          ...base,
          background: `linear-gradient(90deg, transparent, ${COLORS.BORDER_HOVER}, transparent)`,
        };
      case "glow":
        return {
          ...base,
          height: 2,
          background: COLORS.ACCENT,
          boxShadow: `0 0 12px ${COLORS.ACCENT_GLOW}`,
        };
      case "dashed":
        return {
          ...base,
          height: 0,
          borderTop: `1px dashed ${COLORS.BORDER_HOVER}`,
        };
      default:
        return {
          ...base,
          backgroundColor: COLORS.BORDER,
        };
    }
  };

  return <div style={getStyle()} />;
};
