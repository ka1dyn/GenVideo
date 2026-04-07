import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

interface TypewriterTextProps {
  text: string;
  /** Frame at which typing starts (local frame) */
  startFrame?: number;
  /** Number of frames per character reveal */
  framesPerChar?: number;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  letterSpacing?: string;
  cursorColor?: string;
  /** Show blinking cursor */
  showCursor?: boolean;
  style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  framesPerChar = 2,
  color = "#E8EEFA",
  fontSize = 22,
  fontWeight = 500,
  fontFamily = "'JetBrains Mono', monospace",
  letterSpacing,
  cursorColor = "#EF9F27",
  showCursor = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(
    Math.floor(elapsed / framesPerChar),
    text.length
  );
  const displayText = text.slice(0, charsToShow);
  const isComplete = charsToShow >= text.length;

  // Cursor blink: toggle every 30 frames (0.5s at 60fps)
  const cursorVisible = !isComplete || Math.floor(frame / 30) % 2 === 0;

  return (
    <div
      style={{
        color,
        fontSize,
        fontWeight,
        fontFamily,
        letterSpacing,
        whiteSpace: "pre",
        display: "inline-flex",
        alignItems: "center",
        ...style,
      }}
    >
      <span>{displayText}</span>
      {showCursor && cursorVisible && (
        <span
          style={{
            display: "inline-block",
            width: Math.max(2, fontSize * 0.06),
            height: fontSize * 0.85,
            backgroundColor: cursorColor,
            marginLeft: 2,
          }}
        />
      )}
    </div>
  );
};
