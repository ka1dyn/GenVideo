import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { HandDrawnDots } from '../components/HandDrawnDots';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text: "오늘은 제 삶의 질을 180도 바꿔준 세 가지 아이템을 소개할게요."
  // Timeline: 293f 부터 시작 (총 159f 지속)
  const words = [
    { word: "오늘은", startFrame: 0 },
    { word: "제", startFrame: 19 },
    { word: "삶의", startFrame: 24 },
    { word: "질을", startFrame: 34 },
    { word: "180도", startFrame: 46 },
    { word: "바꿔준", startFrame: 69 },
    { word: "세", startFrame: 86 },
    { word: "가지", startFrame: 92 },
    { word: "아이템을", startFrame: 103 },
    { word: "소개할게요.", startFrame: 122 },
  ];

  const dotsScale = spring({
    frame: frame - 10, // Delay dots appearance slightly
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
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_MD,
          color: COLORS.TEXT_MAIN,
          textAlign: 'center',
          padding: SPACING.PX_32,
          maxWidth: '80%',
          // Position text above the dots and subtitle area
          marginBottom: SPACING.PX_96 + 150, // Adjusted to make space for dots and subtitles
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

      <div
        style={{
          position: 'absolute',
          bottom: SPACING.PX_64 + 150, // Above subtitle area
          transform: `scale(${dotsScale})`,
          opacity: dotsScale,
        }}
      >
        <HandDrawnDots size={40} strokeWidth={3} color={COLORS.SECONDARY} wobbleIntensity={1.0} />
      </div>
    </AbsoluteFill>
  );
};
