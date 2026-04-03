import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface HighTechCodeBlockProps {
  width?: number;
  height?: number;
  color: string;
  borderColor?: string;
  backgroundColor?: string;
  title?: string;
  content: string[];
  typingSpeed?: number;
  opacity?: number;
  scale?: number;
  glowintensity?: number;
  startFrame?: number;
  frameOverride?: number;
}

export const HighTechCodeBlock: React.FC<HighTechCodeBlockProps> = ({
  width = 600,
  height = 400,
  color,
  borderColor = 'rgba(255,255,255,0.2)',
  backgroundColor = 'rgba(0,0,0,0.8)',
  title = 'TERMINAL',
  content,
  typingSpeed = 2,
  opacity = 1,
  scale = 1,
  glowintensity = 0.5,
  startFrame = 0,
  frameOverride,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = frameOverride !== undefined ? frameOverride : currentFrame - startFrame;
  const { fps } = useVideoConfig();

  const totalChars = content.join(' ').length;
  const charsShown = Math.floor(Math.max(0, frame) / typingSpeed);

  let currentLine = 0;
  let charsInCurrentLine = 0;
  let cumulativeChars = 0;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: `0 0 40px rgba(0,0,0,0.5), 0 0 ${glowintensity * 20}px ${color}44`,
        opacity,
        transform: `scale(${scale})`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: `1px solid ${borderColor}`,
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 400,
          }}
        >
          {title}
        </div>
        <div style={{ width: 36 }} />
      </div>

      {/* Terminal Content */}
      <div
        style={{
          padding: 16,
          flex: 1,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14,
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.5,
          overflow: 'hidden',
        }}
      >
        {content.map((line, i) => {
          const lineStart = cumulativeChars;
          cumulativeChars += line.length + 1;
          const shown = Math.max(0, Math.min(line.length, charsShown - lineStart));

          if (shown <= 0 && i !== 0 && charsShown < lineStart) return null;

          return (
            <div key={i} style={{ marginBottom: 4 }}>
              <span style={{ color, marginRight: 8 }}>{'>'}</span>
              <span>{line.substring(0, shown)}</span>
              {charsShown >= lineStart && charsShown < lineStart + line.length && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 16,
                    backgroundColor: color,
                    marginLeft: 2,
                    verticalAlign: 'middle',
                    opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
