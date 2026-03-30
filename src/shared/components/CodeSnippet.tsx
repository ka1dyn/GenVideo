import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING, BORDER_RADIUS } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type CodeSnippetProps = {
  code: string;
  language?: string;
  title?: string;
  highlightLines?: number[];
  delay?: number;
};

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language,
  title,
  highlightLines = [],
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], CLAMP);
  const springVal = spring({
    frame: adjustedFrame,
    fps,
    config: SPRING_CONFIG.GENTLE,
  });
  const y = interpolate(springVal, [0, 1], [20, 0]);

  const lines = code.split("\n");

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        width: "100%",
      }}
    >
      {/* Window chrome bar */}
      <div
        style={{
          backgroundColor: COLORS.BG_ELEVATED,
          borderRadius: `${BORDER_RADIUS.LG}px ${BORDER_RADIUS.LG}px 0 0`,
          padding: `${SPACING.SM}px ${SPACING.MD}px`,
          display: "flex",
          alignItems: "center",
          gap: SPACING.XS,
          borderBottom: `1px solid ${COLORS.BORDER}`,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)" }} />
        </div>
        {title && (
          <div
            style={{
              ...TYPOGRAPHY.MONO,
              fontSize: FONT_SIZES.XS - 2,
              color: COLORS.TEXT_TERTIARY,
              marginLeft: SPACING.SM,
            }}
          >
            {title}
          </div>
        )}
        {language && !title && (
          <div
            style={{
              ...TYPOGRAPHY.MONO,
              fontSize: FONT_SIZES.XS - 2,
              color: COLORS.TEXT_MUTED,
              marginLeft: SPACING.SM,
            }}
          >
            {language}
          </div>
        )}
      </div>

      {/* Code body */}
      <div
        style={{
          backgroundColor: COLORS.BG_TERTIARY,
          borderRadius: `0 0 ${BORDER_RADIUS.LG}px ${BORDER_RADIUS.LG}px`,
          padding: SPACING.MD,
          border: `1px solid ${COLORS.BORDER}`,
          borderTop: "none",
          overflow: "hidden",
        }}
      >
        {lines.map((line, i) => {
          const lineDelay = delayFrames + Math.round((i * 0.04) * fps);
          const lineFrame = Math.max(0, frame - lineDelay);
          const lineOpacity = interpolate(lineFrame, [0, fps * 0.2], [0, 1], CLAMP);
          const isHighlighted = highlightLines.includes(i + 1);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                opacity: lineOpacity,
                backgroundColor: isHighlighted ? COLORS.ACCENT_SUBTLE : "transparent",
                marginLeft: isHighlighted ? -SPACING.SM : 0,
                marginRight: isHighlighted ? -SPACING.SM : 0,
                paddingLeft: isHighlighted ? SPACING.SM : 0,
                paddingRight: isHighlighted ? SPACING.SM : 0,
                borderRadius: isHighlighted ? BORDER_RADIUS.SM : 0,
              }}
            >
              {/* Line number */}
              <span
                style={{
                  ...TYPOGRAPHY.MONO,
                  fontSize: FONT_SIZES.XS,
                  color: COLORS.TEXT_MUTED,
                  width: 36,
                  textAlign: "right",
                  marginRight: SPACING.SM,
                  flexShrink: 0,
                  userSelect: "none",
                }}
              >
                {i + 1}
              </span>
              {/* Code line */}
              <span
                style={{
                  ...TYPOGRAPHY.MONO,
                  fontSize: FONT_SIZES.SM - 2,
                  color: isHighlighted ? COLORS.TEXT_PRIMARY : COLORS.TEXT_SECONDARY,
                  whiteSpace: "pre",
                }}
              >
                {line}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
