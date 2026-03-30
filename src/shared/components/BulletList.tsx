import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, TIMING, CLAMP, EASING_PRESET } from "../constants/animations";

type BulletListProps = {
  items: string[];
  icon?: string;
  staggerDelay?: number;
  delay?: number;
  fontSize?: number;
  /** Phase 진행률 (0~1). 제공 시 delay/staggerDelay 무시, 아이템이 progress에 맞춰 순차 등장. */
  progress?: number;
};

export const BulletList: React.FC<BulletListProps> = ({
  items,
  icon = "→",
  staggerDelay = TIMING.STAGGER,
  delay = 0,
  fontSize = FONT_SIZES.MD,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: SPACING.SM + 4,
      }}
    >
      {items.map((item, i) => {
        let opacity: number;
        let x: number;

        if (progress !== undefined) {
          // ── Progress-driven: 아이템을 progress 범위에 걸쳐 순차 등장 ──
          const p = Math.min(1, Math.max(0, progress));
          const N = items.length;
          // 각 아이템의 등장에 소요되는 progress 폭
          const entranceWidth = Math.max(0.15, 1 / (N + 1));
          const startAt = N > 1 ? (i / (N - 1)) * (1 - entranceWidth) : 0;
          const itemP = interpolate(
            p,
            [startAt, Math.min(1, startAt + entranceWidth)],
            [0, 1],
            CLAMP,
          );
          const eased = EASING_PRESET.SMOOTH_OUT(itemP);
          opacity = itemP;
          x = interpolate(eased, [0, 1], [30, 0]);
        } else {
          // ── Frame-driven (original) ──
          const itemDelay = delayFrames + Math.round(i * staggerDelay * fps);
          const adjustedFrame = Math.max(0, frame - itemDelay);

          opacity = interpolate(adjustedFrame, [0, fps * 0.35], [0, 1], CLAMP);
          const springVal = spring({
            frame: adjustedFrame,
            fps,
            config: SPRING_CONFIG.GENTLE,
          });
          x = interpolate(springVal, [0, 1], [30, 0]);
        }

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: SPACING.SM,
              opacity,
              transform: `translateX(${x}px)`,
            }}
          >
            <span
              style={{
                ...TYPOGRAPHY.BODY,
                fontSize,
                color: COLORS.ACCENT,
                flexShrink: 0,
              }}
            >
              {icon}
            </span>
            <span
              style={{
                ...TYPOGRAPHY.BODY,
                fontSize,
                color: COLORS.TEXT_PRIMARY,
              }}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};
