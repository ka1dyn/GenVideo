import React from "react";
import { Img } from "remotion";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, BORDER_RADIUS } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type ImageFrameProps = {
  src: string;
  alt?: string;
  variant?: "plain" | "rounded" | "bordered" | "shadow";
  animation?: "fadeIn" | "scaleIn" | "none";
  delay?: number;
  maxWidth?: number | string;
};

export const ImageFrame: React.FC<ImageFrameProps> = ({
  src,
  alt,
  variant = "rounded",
  animation = "fadeIn",
  delay = 0,
  maxWidth = "100%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity =
    animation === "none"
      ? 1
      : interpolate(adjustedFrame, [0, fps * 0.5], [0, 1], CLAMP);

  let transform = "";
  if (animation === "scaleIn") {
    const springVal = spring({
      frame: adjustedFrame,
      fps,
      config: SPRING_CONFIG.GENTLE,
    });
    const scale = interpolate(springVal, [0, 1], [0.9, 1]);
    transform = `scale(${scale})`;
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    plain: {},
    rounded: { borderRadius: BORDER_RADIUS.LG },
    bordered: {
      borderRadius: BORDER_RADIUS.LG,
      border: `1px solid ${COLORS.BORDER}`,
    },
    shadow: {
      borderRadius: BORDER_RADIUS.LG,
      boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
    },
  };

  return (
    <div
      style={{
        opacity,
        transform,
        maxWidth,
        overflow: "hidden",
        ...variantStyles[variant],
      }}
    >
      <Img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};
