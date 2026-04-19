import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS, SPACING, ANIMATION, Z } from '../../../../constants/theme';
import { Star, CheckMark } from '../components/Scene1Components';
import { PaperTexture } from '../../../../shared-components/PaperTexture';

const TASKS = ['자료 조사', '문서 요약', '데이터 정리'];

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceSpring = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.PX_96,
        gap: SPACING.PX_120,
      }}
    >
      <PaperTexture />

      {/* Left: Structured Checklist (Vercel-like) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.PX_24,
          opacity: entranceSpring,
          transform: `translateX(${interpolate(entranceSpring, [0, 1], [-50, 0])}px)`,
        }}
      >
        {TASKS.map((task, i) => {
          const taskSpring = spring({
            frame: frame - 20 - i * 10,
            fps,
            config: ANIMATION.SPRING_SNAPPY,
          });

          return (
            <div
              key={task}
              style={{
                backgroundColor: COLORS.BG_SURFACE,
                border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_SUBTLE}`,
                borderRadius: SPACING.RADIUS_MD,
                padding: `${SPACING.PX_24}px ${SPACING.PX_32}px`,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.PX_24,
                boxShadow: `0 4px 12px ${COLORS.OVERLAY_LIGHT}`,
                opacity: taskSpring,
                transform: `translateX(${interpolate(taskSpring, [0, 1], [-20, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_STRONG}`,
                  borderRadius: SPACING.RADIUS_SM,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {frame > 40 + i * 15 && <CheckMark size={24} />}
              </div>
              <span
                style={{
                  fontFamily: FONTS.PRIMARY,
                  fontSize: FONTS.SIZE_MD,
                  color: COLORS.TEXT_MAIN,
                  fontWeight: FONTS.WEIGHT_MEDIUM,
                }}
              >
                {task}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right: Value Star (Pen Sketch) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SPACING.PX_40,
        }}
      >
        <div
          style={{
            opacity: spring({
              frame: frame - 80,
              fps,
              config: ANIMATION.SPRING_BOUNCY,
            }),
            transform: `scale(${spring({
              frame: frame - 80,
              fps,
              config: ANIMATION.SPRING_BOUNCY,
            })}) rotate(${interpolate(frame, [80, 150], [0, 15])}deg)`,
          }}
        >
          <Star size={320} />
        </div>
        <div
          style={{
            fontFamily: FONTS.HANDWRITING,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.PRIMARY_DARK,
            opacity: spring({
              frame: frame - 100,
              fps,
              config: ANIMATION.SPRING_GENTLE,
            }),
          }}
        >
          가치 있는 일
        </div>
      </div>

      {/* Caption Guard Rail (Invisible but useful for alignment) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          height: 150,
          width: '100%',
          zIndex: Z.UI,
        }}
      />
    </AbsoluteFill>
  );
};
