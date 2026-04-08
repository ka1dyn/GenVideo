import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION } from "../theme";

interface FlowBoxProps {
  title: string;
  subtitle?: string;
  borderColor?: string;
  glowColor?: string;
  delay?: number;
  isActive?: boolean;
}

export const FlowBox: React.FC<FlowBoxProps> = ({
  title,
  subtitle,
  borderColor = COLORS.BORDER_STRONG,
  glowColor = "transparent",
  delay = 0,
  isActive = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  const activeProgress = spring({
    frame: isActive ? frame - delay - 10 : 0,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <div
      style={{
        padding: `${SPACING.PX_24}px ${SPACING.PX_32}px`,
        backgroundColor: COLORS.BG_SURFACE,
        border: `${SPACING.BORDER_NORMAL}px solid ${borderColor}`,
        borderRadius: SPACING.RADIUS_MD,
        boxShadow: isActive ? `0 0 24px ${glowColor}` : EFFECTS.SHADOW_MD,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: SPACING.PX_8,
        transform: `scale(${progress}) translateY(${(1 - progress) * 20}px)`,
        opacity: progress,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Active Highlight */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          opacity: activeProgress * 0.15,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_MD,
          fontWeight: FONTS.WEIGHT_BOLD,
          color: isActive ? COLORS.TEXT_MAIN : COLORS.TEXT_BODY,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily: FONTS.MONO,
            fontSize: FONTS.SIZE_SM,
            fontWeight: FONTS.WEIGHT_MEDIUM,
            color: isActive ? borderColor : COLORS.TEXT_MUTED,
            textAlign: "center",
            zIndex: 1,
            letterSpacing: FONTS.TRACKING_WIDE,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
