import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING, BORDER_RADIUS } from "../constants/design";
import { CLAMP } from "../constants/animations";

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
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  maxValue,
  direction = "horizontal",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);
  const max = maxValue ?? Math.max(...data.map((d) => d.value));
  const opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);

  if (direction === "horizontal") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.SM, opacity, width: "100%" }}>
        {data.map((item, i) => {
          const barDelay = i * 0.1;
          const barFrame = Math.max(0, adjustedFrame - Math.round(barDelay * fps));
          const width = interpolate(barFrame, [0, fps * 0.6], [0, (item.value / max) * 100], CLAMP);

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: SPACING.SM }}>
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
                    width: `${width}%`,
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

  // Vertical bars
  const barWidth = Math.min(60, (800 - data.length * SPACING.SM) / data.length);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: SPACING.SM, opacity, height: 300 }}>
      {data.map((item, i) => {
        const barDelay = i * 0.1;
        const barFrame = Math.max(0, adjustedFrame - Math.round(barDelay * fps));
        const height = interpolate(barFrame, [0, fps * 0.6], [0, (item.value / max) * 100], CLAMP);

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.XS }}>
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
                width: barWidth,
                height: `${height}%`,
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
