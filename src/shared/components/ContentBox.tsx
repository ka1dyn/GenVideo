import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, SPACING, BORDER_RADIUS } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type ContentBoxProps = {
  variant?: "glass" | "solid" | "outlined" | "accent";
  animation?: "fadeIn" | "scaleIn" | "none";
  delay?: number;
  children: React.ReactNode;
  padding?: number;
};

const VARIANT_STYLES: Record<NonNullable<ContentBoxProps["variant"]>, React.CSSProperties> = {
  glass: {
    backgroundColor: COLORS.GLASS,
    border: `1px solid ${COLORS.GLASS_BORDER}`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  solid: {
    backgroundColor: COLORS.BG_TERTIARY,
    border: `1px solid ${COLORS.BORDER}`,
  },
  outlined: {
    backgroundColor: "transparent",
    border: `1px solid ${COLORS.BORDER}`,
  },
  accent: {
    backgroundColor: COLORS.ACCENT_SUBTLE,
    border: `1px solid ${COLORS.BORDER_ACCENT}`,
  },
};

export const ContentBox: React.FC<ContentBoxProps> = ({
  variant = "solid",
  animation = "fadeIn",
  delay = 0,
  children,
  padding = SPACING.LG,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity =
    animation === "none"
      ? 1
      : interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], CLAMP);

  let transform = "";
  if (animation === "scaleIn") {
    const springVal = spring({
      frame: adjustedFrame,
      fps,
      config: SPRING_CONFIG.GENTLE,
    });
    const scale = interpolate(springVal, [0, 1], [0.95, 1]);
    transform = `scale(${scale})`;
  }

  return (
    <div
      style={{
        ...VARIANT_STYLES[variant],
        borderRadius: BORDER_RADIUS.LG,
        padding,
        opacity,
        transform,
      }}
    >
      {children}
    </div>
  );
};
