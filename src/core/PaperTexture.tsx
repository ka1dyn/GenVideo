import React from "react";

interface PaperTextureProps {
  /** Texture opacity (default: 0.05) */
  opacity?: number;
  /** Whether to adjust blending for dark mode backgrounds */
  isDark?: boolean;
}

/**
 * SVG feTurbulence-based paper noise overlay.
 * Place inside an AbsoluteFill to give the scene a warm analog paper feel.
 * Covers the FULL screen — does not respect caption safe areas.
 */
export const PaperTexture: React.FC<PaperTextureProps> = ({
  opacity,
  isDark = false,
}) => {
  const defaultOpacity = isDark ? 0.02 : 0.02;
  const finalOpacity = Math.min(opacity ?? defaultOpacity, 0.02);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: finalOpacity,
        pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
};
