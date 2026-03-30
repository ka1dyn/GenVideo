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
  /** Phase 진행률 (0~1). 제공 시 delay/speed 무시, progress가 타이핑을 구동. */
  progress?: number;
};

const SPEED_MAP = { slow: 3, normal: 2, fast: 1 };

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  variant = "mono",
  speed = "normal",
  delay = 0,
  fontSize,
  color,
  progress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let charsToShow: number;
  let showCursor: boolean;

  if (progress !== undefined) {
    // ── Progress-driven: 0→1이 0글자→전체 글자로 매핑 ──
    const p = Math.min(1, Math.max(0, progress));
    charsToShow = Math.min(text.length, Math.floor(text.length * p));
    showCursor = p > 0 && charsToShow < text.length;
  } else {
    // ── Frame-driven (original) ──
    const delayFrames = Math.round(delay * fps);
    const adjustedFrame = Math.max(0, frame - delayFrames);
    const framesPerChar = SPEED_MAP[speed];
    charsToShow = Math.min(
      text.length,
      Math.floor(adjustedFrame / framesPerChar),
    );
    showCursor = adjustedFrame > 0 && charsToShow < text.length;
  }

  const typo = variant === "mono" ? TYPOGRAPHY.MONO : TYPOGRAPHY.BODY;
  const defaultFontSize = FONT_SIZES.MD;
  const defaultColor = COLORS.TEXT_PRIMARY;

  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

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
