import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY } from "../constants/design";
import { SPRING_CONFIG, CLAMP, EASING_PRESET } from "../constants/animations";

type AnimatedTitleProps = {
  text: string;
  animation?: "fadeIn" | "slideUp" | "scaleIn";
  size?: "hero" | "heading";
  delay?: number;
  align?: "left" | "center" | "right";
  color?: string;
  /** Phase 진행률 (0~1). 제공 시 delay 무시, progress 기반 애니메이션. */
  progress?: number;
};

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  animation = "slideUp",
  size = "heading",
  delay = 0,
  align = "center",
  color = COLORS.TEXT_PRIMARY,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const typo = size === "hero" ? TYPOGRAPHY.HERO : TYPOGRAPHY.HEADING;
  const fontSize = size === "hero" ? FONT_SIZES.XXL : FONT_SIZES.XL;

  let opacity: number;
  let transform = "";

  if (progress !== undefined) {
    // ── Progress-driven animation ──
    const p = Math.min(1, Math.max(0, progress));
    const eased = EASING_PRESET.SMOOTH_OUT(p);
    opacity = p;

    if (animation === "slideUp") {
      transform = `translateY(${interpolate(eased, [0, 1], [50, 0])}px)`;
    } else if (animation === "scaleIn") {
      transform = `scale(${interpolate(eased, [0, 1], [0.85, 1])})`;
    }
  } else {
    // ── Frame-driven animation (original) ──
    const delayFrames = Math.round(delay * fps);
    const adjustedFrame = Math.max(0, frame - delayFrames);

    const springVal = spring({
      frame: adjustedFrame,
      fps,
      config: size === "hero" ? SPRING_CONFIG.HEAVY : SPRING_CONFIG.GENTLE,
    });

    opacity = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], CLAMP);

    if (animation === "slideUp") {
      const y = interpolate(springVal, [0, 1], [50, 0]);
      transform = `translateY(${y}px)`;
    } else if (animation === "scaleIn") {
      const scale = interpolate(springVal, [0, 1], [0.85, 1]);
      transform = `scale(${scale})`;
    }
  }

  return (
    <div
      style={{
        ...typo,
        fontSize,
        color,
        textAlign: align,
        opacity,
        transform,
        maxWidth: "85%",
      }}
    >
      {text}
    </div>
  );
};
