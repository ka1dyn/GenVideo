import React from "react";
import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SPACING, ANIMATION } from "../theme";

interface TimelineBarProps {
  label: string;
  delay?: number;
  duration?: number;
  expandDelay?: number;
  color?: string;
  maxWidth?: number;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  label,
  delay = 0,
  duration = 60,
  expandDelay = 30,
  color = COLORS.PRIMARY,
  maxWidth = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame: frame - delay,
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  const stretchProgress = spring({
    frame: frame - delay - expandDelay,
    fps,
    config: { damping: 200, stiffness: 10, mass: 2 }, // Very slow, heavy stretch
  });

  const width = interpolate(stretchProgress, [0, 1], [100, maxWidth], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: SPACING.PX_16,
        transform: `translateY(${(1 - enterProgress) * 20}px)`,
        opacity: enterProgress,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_MD,
          fontWeight: FONTS.WEIGHT_BOLD,
          color: COLORS.TEXT_MAIN,
          width: 140, // fixed width for label
          textAlign: "right",
        }}
      >
        {label}
      </div>
      <div
        style={{
          height: 12,
          backgroundColor: color,
          borderRadius: SPACING.RADIUS_PILL,
          width: width,
          boxShadow: `0 0 16px ${color}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
      </div>
    </div>
  );
};
