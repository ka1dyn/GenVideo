import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { HandDrawnTool } from '../components/HandDrawnTool';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text: "사실 우리가 바쁜 이유는 능력이 부족해서가 아니라 도구가 없어서입니다."
  // Timeline: 128f 부터 시작 (총 165f 지속)
  const words = [
    { word: "사실", startFrame: 0 },
    { word: "우리가", startFrame: 8 },
    { word: "바쁜", startFrame: 20 },
    { word: "이유는", startFrame: 28 },
    { word: "능력이", startFrame: 41 },
    { word: "부족해서가", startFrame: 54 },
    { word: "아니라", startFrame: 75 },
    { word: "도구가", startFrame: 94 },
    { word: "없어서입니다.", startFrame: 114 },
  ];

  const toolScale = spring({
    frame: frame - 10, // Delay tool appearance slightly
    fps,
    config: {
      damping: 200,
      mass: 0.5,
      stiffness: 100,
      overshootClamping: false,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          position: 'absolute',
          bottom: SPACING.PX_64 + 150, // Above subtitle area
          left: SPACING.PX_64,
          transform: `scale(${toolScale})`,
          opacity: toolScale,
        }}
      >
        <HandDrawnTool size={200} strokeWidth={5} color={COLORS.PRIMARY} wobbleIntensity={1.5} />
      </div>

      <div
        style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_MD,
          color: COLORS.TEXT_MAIN,
          textAlign: 'center',
          padding: SPACING.PX_32,
          maxWidth: '80%',
          marginBottom: 150, // Protect bottom 150px for subtitles
        }}
      >
        {words.map((wordObj, i) => {
          const opacity = spring({
            frame: frame - wordObj.startFrame,
            fps,
            config: {
              damping: 200,
              stiffness: 100,
              mass: 0.5,
            },
          });
          const translateY = interpolate(
            opacity,
            [0, 1],
            [SPACING.PX_16, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <span
              key={i}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                display: 'inline-block',
                marginRight: SPACING.PX_8,
              }}
            >
              {wordObj.word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
