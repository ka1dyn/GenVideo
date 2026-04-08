import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONTS, SPACING, EFFECTS, ANIMATION } from "../theme";
import { VIDEO_FPS } from "../../../constants/video-config";

interface SubscribeButtonProps {
  isClicked?: boolean;
  scale?: number;
  style?: React.CSSProperties;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  isClicked = false,
  scale = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  
  const clickSpring = spring({
    frame: isClicked ? frame : 0,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_SNAPPY,
  });

  const buttonScale = interpolate(clickSpring, [0, 0.5, 1], [1, 0.92, 1]);

  return (
    <div
      style={{
        backgroundColor: COLORS.PRIMARY,
        padding: `${SPACING.PX_12}px ${SPACING.PX_32}px`,
        borderRadius: SPACING.RADIUS_MD,
        boxShadow: EFFECTS.GLOW_MD,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale * buttonScale})`,
        ...style,
      }}
    >
      <span
        style={{
          color: COLORS.TEXT_ON_PRIMARY,
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_MD,
          fontWeight: FONTS.WEIGHT_BOLD,
        }}
      >
        구독
      </span>
    </div>
  );
};
