import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { HandDrawnClock } from '../components/HandDrawnClock';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Text: "여러분, 혹시 오늘도 '시간이 없다'는 말을 입에 달고 사셨나요?"
  // Timeline: 0f 부터 시작 (총 128f 지속)
  const text = "여러분, 혹시 오늘도 '시간이 없다'는 말을 입에 달고 사셨나요?";
  const words = [
    { word: "여러분,", startFrame: 0 },
    { word: "혹시", startFrame: 14 },
    { word: "오늘도", startFrame: 28 },
    { word: "'시간이", startFrame: 39 },
    { word: "없다'는", startFrame: 54 },
    { word: "말을", startFrame: 68 },
    { word: "입에", startFrame: 79 },
    { word: "달고", startFrame: 90 },
    { word: "사셨나요?", startFrame: 100 },
  ];

  const clockScale = spring({
    frame: frame - 10, // Delay clock appearance slightly
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
          top: SPACING.PX_64, // Example spacing
          right: SPACING.PX_64,
          transform: `scale(${clockScale})`,
          opacity: clockScale,
        }}
      >
        <HandDrawnClock size={200} strokeWidth={5} color={COLORS.PRIMARY} wobbleIntensity={1.5} />
      </div>

      <div
        style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_MD,
          color: COLORS.TEXT_MAIN,
          textAlign: 'center',
          padding: SPACING.PX_32,
          maxWidth: '80%',
          // Protect bottom 150px for subtitles
          marginBottom: 150,
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
                display: 'inline-block', // To apply transform to each word
                marginRight: SPACING.PX_8, // Space between words
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
