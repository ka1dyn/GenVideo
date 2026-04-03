import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface CodeSnippetProps {
  lines: string[];
  typingSpeed?: number;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
  entryDelay?: number;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  lines,
  typingSpeed = 2,
  fontSize = 18,
  color = "#00FFCC",
  backgroundColor = "rgba(0, 0, 0, 0.3)",
  padding = 24,
  borderRadius = 12,
  style = {},
  entryDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalChars = lines.join("").length;
  const typedCount = Math.min(
    totalChars,
    Math.floor(Math.max(0, frame - entryDelay) * typingSpeed)
  );

  let currentCharCount = 0;

  return (
    <pre
      style={{
        fontSize,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        color,
        backgroundColor,
        padding,
        borderRadius,
        margin: 0,
        lineHeight: 1.5,
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        ...style,
      }}
    >
      {lines.map((line, i) => {
        const lineStart = currentCharCount;
        const lineEnd = lineStart + line.length;
        currentCharCount += line.length;

        const visibleCount = Math.max(0, Math.min(line.length, typedCount - lineStart));
        const visibleText = line.substring(0, visibleCount);

        return (
          <div key={i} style={{ height: "1.5em", minWidth: "1px" }}>
            {visibleText}
            {visibleCount < line.length && visibleCount > 0 && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1em",
                  backgroundColor: color,
                  marginLeft: 2,
                  verticalAlign: "middle",
                  opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0,
                }}
              />
            )}
          </div>
        );
      })}
    </pre>
  );
};
