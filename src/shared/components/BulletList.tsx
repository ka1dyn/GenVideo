import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, TIMING, CLAMP } from "../constants/animations";

type BulletListProps = {
  items: string[];
  icon?: string;
  staggerDelay?: number;
  delay?: number;
  fontSize?: number;
};

export const BulletList: React.FC<BulletListProps> = ({
  items,
  icon = "→",
  staggerDelay = TIMING.STAGGER,
  delay = 0,
  fontSize = FONT_SIZES.MD,
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
        const itemDelay = delayFrames + Math.round(i * staggerDelay * fps);
        const adjustedFrame = Math.max(0, frame - itemDelay);

        const opacity = interpolate(adjustedFrame, [0, fps * 0.35], [0, 1], CLAMP);
        const springVal = spring({
          frame: adjustedFrame,
          fps,
          config: SPRING_CONFIG.GENTLE,
        });
        const x = interpolate(springVal, [0, 1], [30, 0]);

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
