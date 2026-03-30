import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type AnimatedTitleProps = {
  text: string;
  animation?: "fadeIn" | "slideUp" | "scaleIn";
  size?: "hero" | "heading";
  delay?: number;
  align?: "left" | "center" | "right";
  color?: string;
};

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  animation = "slideUp",
  size = "heading",
  delay = 0,
  align = "center",
  color = COLORS.TEXT_PRIMARY,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const typo = size === "hero" ? TYPOGRAPHY.HERO : TYPOGRAPHY.HEADING;
  const fontSize = size === "hero" ? FONT_SIZES.XXL : FONT_SIZES.XL;

  const springVal = spring({
    frame: adjustedFrame,
    fps,
    config: size === "hero" ? SPRING_CONFIG.HEAVY : SPRING_CONFIG.GENTLE,
  });

  const opacity = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], CLAMP);

  let transform = "";
  if (animation === "slideUp") {
    const y = interpolate(springVal, [0, 1], [50, 0]);
    transform = `translateY(${y}px)`;
  } else if (animation === "scaleIn") {
    const scale = interpolate(springVal, [0, 1], [0.85, 1]);
    transform = `scale(${scale})`;
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
