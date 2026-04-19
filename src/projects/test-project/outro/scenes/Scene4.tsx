import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS, SPACING, ANIMATION, Z } from '../../../../constants/theme';
import { Heart, Bell } from '../components/Scene4Components';
import { PaperTexture } from '../../../../shared-components/PaperTexture';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const iconsEntrance = spring({
    frame: frame - 60,
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

      {/* Decorative Border (Pen Sketch) */}
      <div
        style={{
          position: 'absolute',
          top: SPACING.PX_40,
          left: SPACING.PX_40,
          right: SPACING.PX_40,
          bottom: SPACING.PX_40,
          border: `${SPACING.BORDER_THICK}px solid ${COLORS.STROKE_SUBTLE}`,
          borderRadius: SPACING.RADIUS_XL,
          opacity: entrance,
          transform: `scale(${interpolate(entrance, [0, 1], [1.05, 1])})`,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_64,
          opacity: entrance,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.TEXT_MAIN,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            textAlign: 'center',
            lineHeight: FONTS.LEADING_TIGHT,
          }}
        >
          오늘 영상이 도움 되셨나요?
        </div>

        <div
          style={{
            display: 'flex',
            gap: SPACING.PX_120,
            opacity: iconsEntrance,
            transform: `translateY(${interpolate(iconsEntrance, [0, 1], [40, 0])}px)`,
          }}
        >
          {/* Bell / Subscribe */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: SPACING.PX_24,
            }}
          >
            <Bell size={200} />
            <span
              style={{
                fontFamily: FONTS.HANDWRITING,
                fontSize: FONTS.SIZE_LG,
                color: COLORS.SECONDARY_DARK,
              }}
            >
              구독
            </span>
          </div>

          {/* Heart / Like */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: SPACING.PX_24,
            }}
          >
            <Heart size={200} />
            <span
              style={{
                fontFamily: FONTS.HANDWRITING,
                fontSize: FONTS.SIZE_LG,
                color: COLORS.PRIMARY_DARK,
              }}
            >
              좋아요
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: SPACING.PX_40,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_MD,
            color: COLORS.TEXT_SUB,
            fontWeight: FONTS.WEIGHT_MEDIUM,
          }}
        >
          시청해 주셔서 감사합니다!
        </div>
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
