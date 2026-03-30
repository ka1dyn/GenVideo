import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING, BORDER_RADIUS } from "../constants/design";
import { CLAMP, EASING_PRESET } from "../constants/animations";

type BarChartDataItem = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  data: BarChartDataItem[];
  maxValue?: number;
  direction?: "horizontal" | "vertical";
  delay?: number;
  /** Phase 진행률 (0~1). 제공 시 delay 무시, progress에 맞춰 바가 채워짐. */
  progress?: number;
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  direction = "horizontal",
  delay = 0,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const max = maxValue ?? Math.max(...data.map((d) => d.value));

  if (direction === "horizontal") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.SM, width: "100%" }}>
        {data.map((item, i) => {
          let opacity: number;
          let barWidth: number;

          if (progress !== undefined) {
            // ── Progress-driven ──
            const p = Math.min(1, Math.max(0, progress));
            const N = data.length;
            // 각 바가 순차적으로 등장 + 채워짐
            const barStagger = N > 1 ? 0.1 : 0;
            const startAt = i * barStagger;
            const barP = interpolate(p, [startAt, Math.min(1, startAt + (1 - (N - 1) * barStagger))], [0, 1], CLAMP);
            const eased = EASING_PRESET.SMOOTH_OUT(barP);
            opacity = interpolate(barP, [0, 0.3], [0, 1], CLAMP);
            barWidth = eased * (item.value / max) * 100;
          } else {
            // ── Frame-driven (original) ──
            const delayFrames = Math.round(delay * fps);
            const adjustedFrame = Math.max(0, frame - delayFrames);
            const barDelay = i * 0.1;
            const barFrame = Math.max(0, adjustedFrame - Math.round(barDelay * fps));
            opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);
            barWidth = interpolate(barFrame, [0, fps * 0.6], [0, (item.value / max) * 100], CLAMP);
          }

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: SPACING.SM, opacity }}>
              <div
                style={{
                  ...TYPOGRAPHY.BODY,
                  fontSize: FONT_SIZES.XS,
                  color: COLORS.TEXT_TERTIARY,
                  width: 100,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {item.label}
              </div>
              <div style={{ flex: 1, height: 28, backgroundColor: COLORS.BG_ELEVATED, borderRadius: BORDER_RADIUS.SM, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: "100%",
                    backgroundColor: item.color ?? COLORS.ACCENT,
                    borderRadius: BORDER_RADIUS.SM,
                  }}
                />
              </div>
              <div
                style={{
                  ...TYPOGRAPHY.MONO,
                  fontSize: FONT_SIZES.XS,
                  color: COLORS.TEXT_SECONDARY,
                  width: 60,
                  flexShrink: 0,
                }}
              >
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // ── Vertical bars ──
  const barWidthPx = Math.min(60, (800 - data.length * SPACING.SM) / data.length);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: SPACING.SM, height: 300 }}>
      {data.map((item, i) => {
        let opacity: number;
        let barHeight: number;

        if (progress !== undefined) {
          const p = Math.min(1, Math.max(0, progress));
          const N = data.length;
          const barStagger = N > 1 ? 0.1 : 0;
          const startAt = i * barStagger;
          const barP = interpolate(p, [startAt, Math.min(1, startAt + (1 - (N - 1) * barStagger))], [0, 1], CLAMP);
          const eased = EASING_PRESET.SMOOTH_OUT(barP);
          opacity = interpolate(barP, [0, 0.3], [0, 1], CLAMP);
          barHeight = eased * (item.value / max) * 100;
        } else {
          const delayFrames = Math.round(delay * fps);
          const adjustedFrame = Math.max(0, frame - delayFrames);
          const barDelay = i * 0.1;
          const barFrame = Math.max(0, adjustedFrame - Math.round(barDelay * fps));
          opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);
          barHeight = interpolate(barFrame, [0, fps * 0.6], [0, (item.value / max) * 100], CLAMP);
        }

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.XS, opacity }}>
            <div
              style={{
                ...TYPOGRAPHY.MONO,
                fontSize: FONT_SIZES.XS,
                color: COLORS.TEXT_SECONDARY,
              }}
            >
              {item.value}
            </div>
            <div
              style={{
                width: barWidthPx,
                height: `${barHeight}%`,
                backgroundColor: item.color ?? COLORS.ACCENT,
                borderRadius: `${BORDER_RADIUS.SM}px ${BORDER_RADIUS.SM}px 0 0`,
              }}
            />
            <div
              style={{
                ...TYPOGRAPHY.BODY,
                fontSize: FONT_SIZES.XS,
                color: COLORS.TEXT_TERTIARY,
              }}
            >
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
