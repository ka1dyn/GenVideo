import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY } from "../constants/design";
import { CLAMP } from "../constants/animations";

type NumberCounterProps = {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
  fontSize?: number;
  color?: string;
  decimals?: number;
  /** Phase 진행률 (0~1). 제공 시 delay/duration 무시, progress가 카운팅을 구동. */
  progress?: number;
};

export const NumberCounter: React.FC<NumberCounterProps> = ({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  delay = 0,
  duration = 1.2,
  fontSize = FONT_SIZES.XXL,
  color = COLORS.TEXT_PRIMARY,
  decimals = 0,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let currentValue: number;
  let opacity: number;

  if (progress !== undefined) {
    // ── Progress-driven: 0→1이 from→to로 직접 매핑 ──
    const p = Math.min(1, Math.max(0, progress));
    const easedP = 1 - Math.pow(1 - p, 3); // ease-out cubic
    currentValue = from + (to - from) * easedP;
    // 빠른 fade-in (progress 10%에 도달하면 완전히 불투명)
    opacity = Math.min(1, p * 10);
  } else {
    // ── Frame-driven (original) ──
    const delayFrames = Math.round(delay * fps);
    const durationFrames = Math.round(duration * fps);
    const adjustedFrame = Math.max(0, frame - delayFrames);

    const rawProgress = interpolate(
      adjustedFrame,
      [0, durationFrames],
      [0, 1],
      CLAMP,
    );
    const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
    currentValue = from + (to - from) * easedProgress;
    opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);
  }

  const displayValue = currentValue.toFixed(decimals);

  return (
    <div
      style={{
        ...TYPOGRAPHY.MONO,
        fontSize,
        color,
        opacity,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </div>
  );
};
