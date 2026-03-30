import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY } from "../constants/design";
import { CLAMP } from "../constants/animations";

type HighlightedTextProps = {
  text: string;
  highlightColor?: string;
  delay?: number;
  fontSize?: number;
};

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlightColor = COLORS.ACCENT,
  delay = 0,
  fontSize = FONT_SIZES.LG,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const textOpacity = interpolate(adjustedFrame, [0, fps * 0.3], [0, 1], CLAMP);
  const highlightWidth = interpolate(
    adjustedFrame,
    [fps * 0.15, fps * 0.6],
    [0, 100],
    CLAMP,
  );

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
