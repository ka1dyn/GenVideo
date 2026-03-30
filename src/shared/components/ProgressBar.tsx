import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING, BORDER_RADIUS } from "../constants/design";
import { CLAMP } from "../constants/animations";

type ProgressBarProps = {
  /** 목표 채움 비율 (0~1) — 바가 최종적으로 도달할 위치 */
  value: number;
  variant?: "accent" | "gradient" | "success";
  label?: string;
  delay?: number;
  height?: number;
  /** Phase 진행률 (0~1). 제공 시 delay 무시, progress가 바 채움을 구동.
   *  progress 0→1이 0%→value*100%로 매핑. */
  progress?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = "accent",
  label,
  delay = 0,
  height = 8,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let width: number;
  let opacity: number;

  if (progress !== undefined) {
    // ── Progress-driven ──
    const p = Math.min(1, Math.max(0, progress));
    width = p * value * 100;
    opacity = Math.min(1, p * 5);
  } else {
    // ── Frame-driven (original) ──
    const delayFrames = Math.round(delay * fps);
    const adjustedFrame = Math.max(0, frame - delayFrames);

    width = interpolate(
      adjustedFrame,
      [0, fps * 0.8],
      [0, value * 100],
      CLAMP,
    );
    opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);
  }

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
