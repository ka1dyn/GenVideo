import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { HandDrawnNotionTemplate } from '../components/HandDrawnNotionTemplate';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text: "첫 번째는 모든 기록을 자동화해 주는 스마트 노션 템플릿입니다."
  // Timeline: 452f 부터 시작 (총 123f 지속)
  const words = [
    { word: "첫", startFrame: 0 },
    { word: "번째는", startFrame: 4 },
    { word: "모든", startFrame: 18 },
    { word: "기록을", startFrame: 27 },
    { word: "자동화해", startFrame: 40 },
    { word: "주는", startFrame: 69 },
    { word: "스마트", startFrame: 74 },
    { word: "노션", startFrame: 81 },
    { word: "템플릿입니다.", startFrame: 90 },
  ];

  const templateScale = spring({
    frame: frame - 10, // Delay template appearance slightly
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
          top: SPACING.PX_64,
          left: SPACING.PX_64,
          transform: `scale(${templateScale})`,
          opacity: templateScale,
        }}
      >
        <HandDrawnNotionTemplate size={200} strokeWidth={5} color={COLORS.PRIMARY} wobbleIntensity={1.5} />
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
