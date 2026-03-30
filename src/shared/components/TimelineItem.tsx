import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type TimelineItemProps = {
  title: string;
  description?: string;
  marker?: string;
  position?: "left" | "right";
  isActive?: boolean;
  delay?: number;
};

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  marker,
  position = "left",
  isActive = false,
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
  const y = interpolate(springVal, [0, 1], [20, 0]);

  const dotColor = isActive ? COLORS.ACCENT : COLORS.TEXT_MUTED;
  const dotSize = isActive ? 14 : 10;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: SPACING.MD,
        opacity,
        transform: `translateY(${y}px)`,
        flexDirection: position === "right" ? "row-reverse" : "row",
      }}
    >
      {/* Dot + line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 20,
        }}
      >
        <div
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: dotColor,
            boxShadow: isActive ? `0 0 12px ${COLORS.ACCENT_GLOW}` : "none",
          }}
        />
        <div
          style={{
            width: 2,
            flex: 1,
            minHeight: 40,
            backgroundColor: COLORS.BORDER,
            marginTop: 4,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ paddingBottom: SPACING.MD }}>
        {marker && (
          <div
            style={{
              ...TYPOGRAPHY.MONO,
              fontSize: FONT_SIZES.XS,
              color: COLORS.TEXT_TERTIARY,
              marginBottom: 4,
            }}
          >
            {marker}
          </div>
        )}
        <div
          style={{
            ...TYPOGRAPHY.HEADING,
            fontSize: FONT_SIZES.SM,
            color: isActive ? COLORS.TEXT_PRIMARY : COLORS.TEXT_SECONDARY,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              ...TYPOGRAPHY.BODY,
              fontSize: FONT_SIZES.XS,
              color: COLORS.TEXT_TERTIARY,
              marginTop: 4,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
