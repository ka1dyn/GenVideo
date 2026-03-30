import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, CLAMP, EASING_PRESET } from "../constants/animations";

type QuoteProps = {
  text: string;
  author?: string;
  delay?: number;
  /** Phase 진행률 (0~1). 제공 시 delay 무시, progress 기반 등장.
   *  0→60%: 인용문 등장, 60%→100%: 저자 등장. */
  progress?: number;
};

export const Quote: React.FC<QuoteProps> = ({
  text,
  author,
  delay = 0,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity: number;
  let y: number;
  let authorOpacity: number;

  if (progress !== undefined) {
    // ── Progress-driven ──
    const p = Math.min(1, Math.max(0, progress));
    const eased = EASING_PRESET.SMOOTH_OUT(Math.min(1, p / 0.6));
    opacity = interpolate(p, [0, 0.6], [0, 1], CLAMP);
    y = interpolate(eased, [0, 1], [30, 0]);
    authorOpacity = interpolate(p, [0.6, 1], [0, 1], CLAMP);
  } else {
    // ── Frame-driven (original) ──
    const delayFrames = Math.round(delay * fps);
    const adjustedFrame = Math.max(0, frame - delayFrames);

    opacity = interpolate(adjustedFrame, [0, fps * 0.5], [0, 1], CLAMP);
    const springVal = spring({
      frame: adjustedFrame,
      fps,
      config: SPRING_CONFIG.GENTLE,
    });
    y = interpolate(springVal, [0, 1], [30, 0]);
    authorOpacity = interpolate(
      adjustedFrame,
      [fps * 0.4, fps * 0.8],
      [0, 1],
      CLAMP,
    );
  }

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
