import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY } from "../constants/design";
import { SPRING_CONFIG, CLAMP, EASING_PRESET } from "../constants/animations";

type AnimatedTextProps = {
  text: string;
  variant?: "body" | "subtitle" | "caption" | "mono";
  animation?: "fadeIn" | "slideUp" | "none";
  delay?: number;
  align?: "left" | "center" | "right";
  color?: string;
  /** Phase 진행률 (0~1). 제공 시 delay 무시, progress 기반 애니메이션. */
  progress?: number;
};

const VARIANT_STYLES = {
  body: { typo: TYPOGRAPHY.BODY, fontSize: FONT_SIZES.MD, defaultColor: COLORS.TEXT_PRIMARY },
  subtitle: { typo: TYPOGRAPHY.HEADING, fontSize: FONT_SIZES.LG, defaultColor: COLORS.TEXT_SECONDARY },
  caption: { typo: TYPOGRAPHY.BODY, fontSize: FONT_SIZES.SM, defaultColor: COLORS.TEXT_TERTIARY },
  mono: { typo: TYPOGRAPHY.MONO, fontSize: FONT_SIZES.SM, defaultColor: COLORS.TEXT_SECONDARY },
} as const;

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  variant = "body",
  animation = "fadeIn",
  delay = 0,
  align = "left",
  color,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const style = VARIANT_STYLES[variant];

  let opacity: number;
  let transform = "";

  if (progress !== undefined) {
    // ── Progress-driven animation ──
    const p = Math.min(1, Math.max(0, progress));
    const eased = EASING_PRESET.SMOOTH_OUT(p);
    opacity = animation === "none" ? 1 : p;

    if (animation === "slideUp") {
      transform = `translateY(${interpolate(eased, [0, 1], [30, 0])}px)`;
    }
  } else {
    // ── Frame-driven animation (original) ──
    const delayFrames = Math.round(delay * fps);
    const adjustedFrame = Math.max(0, frame - delayFrames);

    opacity =
      animation === "none"
        ? 1
        : interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], CLAMP);

    if (animation === "slideUp") {
      const springVal = spring({
        frame: adjustedFrame,
        fps,
        config: SPRING_CONFIG.GENTLE,
      });
      const y = interpolate(springVal, [0, 1], [30, 0]);
      transform = `translateY(${y}px)`;
    }
  }

  return (
    <div
      style={{
        ...style.typo,
        fontSize: style.fontSize,
        color: color ?? style.defaultColor,
        textAlign: align,
        opacity,
        transform,
        maxWidth: "90%",
      }}
    >
      {text}
    </div>
  );
};
