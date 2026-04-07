import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONTS, SPACING, ANIMATION, EFFECTS } from "../theme";

interface QuotePanelProps {
  children: React.ReactNode;
  /** Frame at which panel enters (local). Use negative values to skip entrance animation. */
  startFrame?: number;
  /** Background color - defaults to GLASS_BG */
  bgColor?: string;
  /** Left accent bar color - defaults to PRIMARY */
  barColor?: string;
  /** Quotation mark color - defaults to ACCENT */
  quoteColor?: string;
  /** Source attribution text */
  source?: string;
  /** Source text color */
  sourceColor?: string;
  /** Source opacity (0-1) - typically animated in parent */
  sourceOpacity?: number;
  /** Optional overlay color (e.g. WARNING for tension) */
  overlayColor?: string;
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  /** Custom container style */
  style?: React.CSSProperties;
  /** If true, shows the opening quote mark */
  showQuoteMark?: boolean;
}

/**
 * A premium, standardized quote panel for Project Maven.
 * Follows the "Dark Terminal" aesthetic with a left vertical accent bar.
 */
export const QuotePanel: React.FC<QuotePanelProps> = ({
  children,
  startFrame = 5, // Default slight delay
  bgColor = EFFECTS.GLASS_BG,
  barColor = COLORS.PRIMARY,
  quoteColor = COLORS.ACCENT,
  source,
  sourceColor = COLORS.TEXT_DISABLED,
  sourceOpacity = 1,
  overlayColor,
  overlayOpacity = 0,
  style,
  showQuoteMark = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation for the entire panel
  const panelIn = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  return (
    <div
      style={{
        opacity: panelIn,
        transform: `translateX(${interpolate(panelIn, [0, 1], [ANIMATION.ENTER_X_MD, 0])}px)`,
        backgroundColor: bgColor,
        padding: SPACING.PX_40,
        maxWidth: 600,
        display: "flex",
        gap: SPACING.PX_24,
        position: "relative",
        overflow: "hidden",
        backdropFilter: EFFECTS.GLASS_BLUR,
        border: `1px solid ${EFFECTS.GLASS_BORDER}`,
        ...style,
      }}
    >
      {/* Optional tension/warning overlay */}
      {overlayColor && overlayOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Left accent bar */}
      <div
        style={{
          width: 4,
          backgroundColor: barColor,
          flexShrink: 0,
          borderRadius: SPACING.RADIUS_PILL,
          boxShadow: barColor === COLORS.PRIMARY ? EFFECTS.GLOW_SM : "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
        {showQuoteMark && (
          <div
            style={{
              color: quoteColor,
              fontSize: FONTS.SIZE_LG,
              fontFamily: FONTS.DISPLAY,
              marginBottom: SPACING.PX_8,
              lineHeight: 1,
              opacity: 0.8,
            }}
          >
            "
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_12 }}>
          {children}
        </div>

        {/* Source attribution line */}
        {source && (
          <div
            style={{
              opacity: sourceOpacity,
              marginTop: SPACING.PX_32,
              color: sourceColor,
              fontSize: FONTS.SIZE_SM,
              fontFamily: FONTS.MONO,
              letterSpacing: `${FONTS.TRACKING_WIDE}em`,
              display: "flex",
              alignItems: "center",
              gap: SPACING.PX_12,
            }}
          >
            <div style={{ width: 20, height: 1, backgroundColor: sourceColor, opacity: 0.5 }} />
            {source}
          </div>
        )}
      </div>
    </div>
  );
};

