import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type ComparisonRowProps = {
  label: string;
  before: string;
  after: string;
  delay?: number;
};

export const ComparisonRow: React.FC<ComparisonRowProps> = ({
  label,
  before,
  after,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], CLAMP);
  const springVal = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIG.GENTLE,
  });
  const x = interpolate(springVal, [0, 1], [20, 0]);

  const afterOpacity = interpolate(
    adjustedFrame,
    [fps * 0.3, fps * 0.6],
    [0, 1],
    CLAMP,
  );

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
