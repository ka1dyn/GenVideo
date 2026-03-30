import React from "react";
import { SPACING, BORDER_RADIUS } from "../constants/design";

type GlassPanelProps = {
  intensity?: "light" | "medium" | "strong";
  children: React.ReactNode;
  padding?: number;
};

const INTENSITY_MAP = {
  light: { bg: "rgba(255,255,255,0.02)", blur: 8, border: "rgba(255,255,255,0.04)" },
  medium: { bg: "rgba(255,255,255,0.04)", blur: 16, border: "rgba(255,255,255,0.08)" },
  strong: { bg: "rgba(255,255,255,0.06)", blur: 24, border: "rgba(255,255,255,0.12)" },
};

export const GlassPanel: React.FC<GlassPanelProps> = ({
  intensity = "medium",
  children,
  padding = SPACING.LG,
}) => {
  const config = INTENSITY_MAP[intensity];

  return (
    <div
      style={{
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: BORDER_RADIUS.LG,
        padding,
        backdropFilter: `blur(${config.blur}px)`,
        WebkitBackdropFilter: `blur(${config.blur}px)`,
      }}
    >
      {children}
    </div>
  );
};
