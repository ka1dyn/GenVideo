import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING, BORDER_RADIUS } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type IconBadgeProps = {
  icon: string;
  label?: string;
  variant?: "filled" | "outlined" | "glow";
  delay?: number;
  size?: "sm" | "md" | "lg";
};

const SIZE_MAP = {
  sm: { icon: 28, padding: SPACING.SM, fontSize: FONT_SIZES.XS },
  md: { icon: 40, padding: SPACING.MD, fontSize: FONT_SIZES.SM },
  lg: { icon: 56, padding: SPACING.LG, fontSize: FONT_SIZES.MD },
};

export const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  label,
  variant = "filled",
  delay = 0,
  size = "md",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const springVal = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIG.POP,
  });
  const scale = interpolate(springVal, [0, 1], [0.5, 1]);
  const opacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);

  const sizeConfig = SIZE_MAP[size];

  const bgStyles: Record<string, React.CSSProperties> = {
    filled: { backgroundColor: COLORS.BG_ELEVATED, border: `1px solid ${COLORS.BORDER}` },
    outlined: { backgroundColor: "transparent", border: `1px solid ${COLORS.BORDER_HOVER}` },
    glow: {
      backgroundColor: COLORS.ACCENT_SUBTLE,
      border: `1px solid ${COLORS.BORDER_ACCENT}`,
      boxShadow: `0 0 20px ${COLORS.ACCENT_GLOW}`,
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: SPACING.XS,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          ...bgStyles[variant],
          borderRadius: BORDER_RADIUS.LG,
          width: sizeConfig.icon + sizeConfig.padding,
          height: sizeConfig.icon + sizeConfig.padding,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: sizeConfig.icon,
        }}
      >
        {icon}
      </div>
      {label && (
        <div
          style={{
            ...TYPOGRAPHY.BODY,
            fontSize: sizeConfig.fontSize,
            color: COLORS.TEXT_SECONDARY,
            textAlign: "center",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
