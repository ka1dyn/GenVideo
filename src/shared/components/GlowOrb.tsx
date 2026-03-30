import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../constants/design";
import { CLAMP } from "../constants/animations";

type GlowOrbProps = {
  size?: number;
  color?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "center";
  delay?: number;
  blur?: number;
};

const POSITION_MAP: Record<NonNullable<GlowOrbProps["position"]>, React.CSSProperties> = {
  topLeft: { top: "-10%", left: "-10%" },
  topRight: { top: "-10%", right: "-10%" },
  bottomLeft: { bottom: "-10%", left: "-10%" },
  bottomRight: { bottom: "-10%", right: "-10%" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
};

export const GlowOrb: React.FC<GlowOrbProps> = ({
  size = 400,
  color = COLORS.ACCENT_GLOW,
  position = "topRight",
  delay = 0,
  blur = 80,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity = interpolate(adjustedFrame, [0, fps * 1.0], [0, 1], CLAMP);

  return (
    <div
      style={{
        position: "absolute",
        ...POSITION_MAP[position],
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity: opacity * 0.6,
        pointerEvents: "none",
      }}
    />
  );
};
