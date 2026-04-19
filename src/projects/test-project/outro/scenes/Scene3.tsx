import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS, SPACING, ANIMATION, Z, EFFECTS } from '../../../../constants/theme';
import { LinkIcon, Arrow } from '../components/Scene3Components';
import { PaperTexture } from '../../../../shared-components/PaperTexture';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEntrance = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const arrowEntrance = spring({
    frame: frame - 40,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.PX_96,
      }}
    >
      <PaperTexture />

      {/* Comment Card UI (Vercel-like) */}
      <div
        style={{
          width: 800,
          backgroundColor: COLORS.BG_SURFACE,
          borderRadius: SPACING.RADIUS_LG,
          border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
          boxShadow: EFFECTS.SHADOW_MD,
          padding: SPACING.PX_48,
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.PX_32,
          opacity: cardEntrance,
          transform: `translateY(${interpolate(cardEntrance, [0, 1], [100, 0])}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.PX_24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: SPACING.RADIUS_PILL,
              backgroundColor: COLORS.PRIMARY_LIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LinkIcon size={40} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_MD,
                color: COLORS.TEXT_MAIN,
                fontWeight: FONTS.WEIGHT_BOLD,
              }}
            >
              고정 댓글
            </span>
            <span
              style={{
                fontFamily: FONTS.PRIMARY,
                fontSize: SPACING.PX_24,
                color: COLORS.TEXT_SUB,
              }}
            >
              방금 확인됨
            </span>
          </div>
        </div>

        <div
          style={{
            height: SPACING.BORDER_THIN,
            backgroundColor: COLORS.STROKE_SUBTLE,
            width: '100%',
          }}
        />

        <div
          style={{
            fontFamily: FONTS.HANDWRITING,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.TEXT_BODY,
            lineHeight: 1.4,
          }}
        >
          더 자세한 활용법과 꿀팁이 담긴 가이드를 확인해 보세요!
        </div>

        <div
          style={{
            alignSelf: 'flex-start',
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.TEXT_ON_PRIMARY,
            padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`,
            borderRadius: SPACING.RADIUS_MD,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_MD,
            fontWeight: FONTS.WEIGHT_BOLD,
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.PX_16,
            boxShadow: EFFECTS.SHADOW_PRIMARY,
          }}
        >
          링크 확인하기
          <Arrow size={32} color={COLORS.TEXT_ON_PRIMARY} />
        </div>
      </div>

      {/* Floating Arrow to guide attention */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '25%',
          opacity: arrowEntrance,
          transform: `translateX(${interpolate(
            frame,
            [40, 100],
            [50, 0]
          )}px) rotate(-15deg)`,
        }}
      >
        <Arrow size={120} />
      </div>

      {/* Caption Guard Rail */}
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
