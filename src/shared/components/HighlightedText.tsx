import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY } from "../constants/design";
import { CLAMP } from "../constants/animations";

type HighlightedTextProps = {
  text: string;
  highlightColor?: string;
  delay?: number;
  fontSize?: number;
  /** Phase 진행률 (0~1). 제공 시 delay 무시, progress 기반 하이라이트. */
  progress?: number;
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlightColor = COLORS.ACCENT,
  delay = 0,
  fontSize = FONT_SIZES.LG,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let textOpacity: number;
  let highlightWidth: number;

  if (progress !== undefined) {
    // ── Progress-driven ──
    const p = Math.min(1, Math.max(0, progress));
    // 텍스트: progress 초반(0→40%)에 fade-in
    textOpacity = interpolate(p, [0, 0.4], [0, 1], CLAMP);
    // 하이라이트: progress 30%~100%에 걸쳐 채움
    highlightWidth = interpolate(p, [0.3, 1], [0, 100], CLAMP);
  } else {
    // ── Frame-driven (original) ──
    const delayFrames = Math.round(delay * fps);
    const adjustedFrame = Math.max(0, frame - delayFrames);

    textOpacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);
    highlightWidth = interpolate(
      adjustedFrame,
      [fps * 0.15, fps * 0.6],
      [0, 100],
      CLAMP,
    );
  }

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        opacity: textOpacity,
      }}
    >
      {/* Highlight bar behind text */}
      <div
        style={{
          position: "absolute",
          bottom: "0.05em",
          left: -4,
          right: -4,
          height: "0.35em",
          background: highlightColor,
          opacity: 0.25,
          borderRadius: 3,
          width: `${highlightWidth}%`,
        }}
      />
      <span
        style={{
          ...TYPOGRAPHY.HEADING,
          fontSize,
          color: COLORS.TEXT_PRIMARY,
          position: "relative",
        }}
      >
        {text}
      </span>
    </div>
  );
};
