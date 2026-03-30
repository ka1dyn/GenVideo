import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING, BORDER_RADIUS } from "../constants/design";
import { CLAMP } from "../constants/animations";

type ProgressBarProps = {
  progress: number;
  variant?: "accent" | "gradient" | "success";
  label?: string;
  delay?: number;
  height?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = "accent",
  label,
  delay = 0,
  height = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const width = interpolate(
    adjustedFrame,
    [0, fps * 0.8],
    [0, progress * 100],
    CLAMP,
  );

  const opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);

  const barColor =
    variant === "gradient"
      ? COLORS.GRADIENT_BLUE
      : variant === "success"
        ? COLORS.SUCCESS
        : COLORS.ACCENT;

  return (
    <div style={{ opacity, width: "100%" }}>
      {label && (
        <div
          style={{
            ...TYPOGRAPHY.BODY,
            fontSize: FONT_SIZES.SM,
            color: COLORS.TEXT_SECONDARY,
            marginBottom: SPACING.XS,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{label}</span>
          <span style={{ color: COLORS.TEXT_PRIMARY }}>
            {Math.round(width)}%
          </span>
        </div>
      )}
      <div
        style={{
          width: "100%",
          height,
          backgroundColor: COLORS.BG_ELEVATED,
          borderRadius: BORDER_RADIUS.FULL,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: barColor,
            borderRadius: BORDER_RADIUS.FULL,
          }}
        />
      </div>
    </div>
  );
};
