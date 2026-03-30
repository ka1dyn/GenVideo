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
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const durationFrames = Math.round(duration * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const progress = interpolate(
    adjustedFrame,
    [0, durationFrames],
    [0, 1],
    CLAMP,
  );

  // Ease out cubic for a nice deceleration
  const easedProgress = 1 - Math.pow(1 - progress, 3);
  const currentValue = from + (to - from) * easedProgress;
  const displayValue = currentValue.toFixed(decimals);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);

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
