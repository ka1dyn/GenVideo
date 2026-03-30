import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../constants/design";

type SceneBackgroundProps = {
  variant?: "solid" | "gradient" | "radialGlow" | "mesh";
  children: React.ReactNode;
};

const VARIANT_STYLES: Record<NonNullable<SceneBackgroundProps["variant"]>, React.CSSProperties> = {
  solid: {
    backgroundColor: COLORS.BG_PRIMARY,
  },
  gradient: {
    background: COLORS.GRADIENT_SUBTLE,
  },
  radialGlow: {
    background: `${COLORS.GRADIENT_SPOTLIGHT}, ${COLORS.BG_PRIMARY}`,
  },
  mesh: {
    background: `
      radial-gradient(ellipse at 20% 50%, rgba(0,112,243,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(0,112,243,0.05) 0%, transparent 40%),
      ${COLORS.BG_PRIMARY}
    `,
  },
};

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  variant = "solid",
  children,
}) => {
  return (
    <AbsoluteFill style={VARIANT_STYLES[variant]}>
      {children}
    </AbsoluteFill>
  );
};
