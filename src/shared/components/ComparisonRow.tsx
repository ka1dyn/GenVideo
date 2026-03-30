import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, CLAMP, EASING_PRESET } from "../constants/animations";

type ComparisonRowProps = {
  label: string;
  before: string;
  after: string;
  delay?: number;
  /** Phase 진행률 (0~1). 제공 시 delay 무시, progress 기반 등장.
   *  0→50%: before 표시, 50%→100%: after 강조 등장. */
  progress?: number;
};

export const ComparisonRow: React.FC<ComparisonRowProps> = ({
  label,
  before,
  after,
  delay = 0,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity: number;
  let x: number;
  let afterOpacity: number;

  if (progress !== undefined) {
    // ── Progress-driven ──
    const p = Math.min(1, Math.max(0, progress));
    const eased = EASING_PRESET.SMOOTH_OUT(Math.min(1, p * 2));
    // 전체 행: progress 초반 50%에 fade-in + slide
    opacity = interpolate(p, [0, 0.5], [0, 1], CLAMP);
    x = interpolate(eased, [0, 1], [20, 0]);
    // "after" 값: progress 후반 40%~100%에 등장
    afterOpacity = interpolate(p, [0.4, 0.8], [0, 1], CLAMP);
  } else {
    // ── Frame-driven (original) ──
    const delayFrames = Math.round(delay * fps);
    const adjustedFrame = Math.max(0, frame - delayFrames);

    opacity = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], CLAMP);
    const springVal = spring({
      frame: adjustedFrame,
      fps,
      config: SPRING_CONFIG.GENTLE,
    });
    x = interpolate(springVal, [0, 1], [20, 0]);
    afterOpacity = interpolate(
      adjustedFrame,
      [fps * 0.3, fps * 0.6],
      [0, 1],
      CLAMP,
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: SPACING.LG,
        opacity,
        transform: `translateX(${x}px)`,
        padding: `${SPACING.SM}px 0`,
        borderBottom: `1px solid ${COLORS.BORDER}`,
      }}
    >
      <div
        style={{
          ...TYPOGRAPHY.BODY,
          fontSize: FONT_SIZES.SM,
          color: COLORS.TEXT_TERTIARY,
          width: "20%",
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      <div
        style={{
          ...TYPOGRAPHY.BODY,
          fontSize: FONT_SIZES.MD,
          color: COLORS.TEXT_MUTED,
          textDecoration: "line-through",
          flex: 1,
        }}
      >
        {before}
      </div>
      <div
        style={{
          ...TYPOGRAPHY.HEADING,
          fontSize: FONT_SIZES.MD,
          color: COLORS.TEXT_PRIMARY,
          flex: 1,
          opacity: afterOpacity,
        }}
      >
        {after}
      </div>
    </div>
  );
};
