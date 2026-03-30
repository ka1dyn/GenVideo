import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type QuoteProps = {
  text: string;
  author?: string;
  delay?: number;
};

export const Quote: React.FC<QuoteProps> = ({
  text,
  author,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.5], [0, 1], CLAMP);
  const springVal = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIG.GENTLE,
  });
  const y = interpolate(springVal, [0, 1], [30, 0]);

  const authorOpacity = interpolate(
    adjustedFrame,
    [fps * 0.4, fps * 0.8],
    [0, 1],
    CLAMP,
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        maxWidth: "80%",
      }}
    >
      {/* Opening quote mark */}
      <div
        style={{
          ...TYPOGRAPHY.HERO,
          fontSize: 80,
          color: COLORS.ACCENT,
          lineHeight: 0.6,
          marginBottom: SPACING.SM,
          opacity: 0.6,
        }}
      >
        &ldquo;
      </div>
      {/* Quote text */}
      <div
        style={{
          ...TYPOGRAPHY.HEADING,
          fontSize: FONT_SIZES.LG,
          color: COLORS.TEXT_PRIMARY,
          paddingLeft: SPACING.MD,
        }}
      >
        {text}
      </div>
      {/* Author */}
      {author && (
        <div
          style={{
            ...TYPOGRAPHY.BODY,
            fontSize: FONT_SIZES.SM,
            color: COLORS.TEXT_TERTIARY,
            paddingLeft: SPACING.MD,
            marginTop: SPACING.MD,
            opacity: authorOpacity,
          }}
        >
          — {author}
        </div>
      )}
    </div>
  );
};
