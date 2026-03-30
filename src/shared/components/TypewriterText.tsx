import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY } from "../constants/design";

type TypewriterTextProps = {
  text: string;
  variant?: "body" | "mono";
  speed?: "normal" | "fast" | "slow";
  delay?: number;
  fontSize?: number;
  color?: string;
};

const SPEED_MAP = { slow: 3, normal: 2, fast: 1 };

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  variant = "mono",
  speed = "normal",
  delay = 0,
  fontSize,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const framesPerChar = SPEED_MAP[speed];
  const charsToShow = Math.min(
    text.length,
    Math.floor(adjustedFrame / framesPerChar),
  );

  const typo = variant === "mono" ? TYPOGRAPHY.MONO : TYPOGRAPHY.BODY;
  const defaultFontSize = variant === "mono" ? FONT_SIZES.MD : FONT_SIZES.MD;
  const defaultColor = variant === "mono" ? COLORS.TEXT_PRIMARY : COLORS.TEXT_PRIMARY;

  const showCursor = adjustedFrame > 0 && charsToShow < text.length;
  const cursorBlink = Math.floor(adjustedFrame / 15) % 2 === 0;

  return (
    <div
      style={{
        ...typo,
        fontSize: fontSize ?? defaultFontSize,
        color: color ?? defaultColor,
      }}
    >
      {text.slice(0, charsToShow)}
      {showCursor && (
        <span
          style={{
            opacity: cursorBlink ? 1 : 0,
            color: COLORS.ACCENT,
          }}
        >
          |
        </span>
      )}
    </div>
  );
};
