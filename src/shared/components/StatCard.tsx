import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING, BORDER_RADIUS } from "../constants/design";
import { SPRING_CONFIG, CLAMP, EASING_PRESET } from "../constants/animations";

type StatCardProps = {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
  trend?: "up" | "down" | "neutral";
  delay?: number;
  /** Phase 진행률 (0~1). 제공 시 delay 무시, progress 기반 등장. */
  progress?: number;
};

const TREND_COLORS = {
  up: COLORS.ACCENT,
  down: COLORS.ERROR,
  neutral: COLORS.TEXT_TERTIARY,
};

const TREND_ICONS = {
  up: "↑",
  down: "↓",
  neutral: "—",
};

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  suffix = "",
  prefix = "",
  trend,
  delay = 0,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity: number;
  let y: number;

  if (progress !== undefined) {
    // ── Progress-driven ──
    const p = Math.min(1, Math.max(0, progress));
    const eased = EASING_PRESET.SMOOTH_OUT(p);
    opacity = p;
    y = interpolate(eased, [0, 1], [20, 0]);
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
    y = interpolate(springVal, [0, 1], [20, 0]);
  }

  return (
    <div
      style={{
        backgroundColor: COLORS.BG_TERTIARY,
        border: `1px solid ${COLORS.BORDER}`,
        borderRadius: BORDER_RADIUS.LG,
        padding: SPACING.LG,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: SPACING.XS,
        }}
      >
        <span
          style={{
            ...TYPOGRAPHY.MONO,
            fontSize: FONT_SIZES.XL,
            color: COLORS.TEXT_PRIMARY,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {prefix}
          {value}
          {suffix}
        </span>
        {trend && (
          <span
            style={{
              ...TYPOGRAPHY.BODY,
              fontSize: FONT_SIZES.SM,
              color: TREND_COLORS[trend],
            }}
          >
            {TREND_ICONS[trend]}
          </span>
        )}
      </div>
      <div
        style={{
          ...TYPOGRAPHY.BODY,
          fontSize: FONT_SIZES.SM,
          color: COLORS.TEXT_TERTIARY,
          marginTop: SPACING.XS,
        }}
      >
        {label}
      </div>
    </div>
  );
};
