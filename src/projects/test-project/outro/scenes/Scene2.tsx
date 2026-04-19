import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS, SPACING, ANIMATION, Z } from '../../../../constants/theme';
import { Clock, GiftBox } from '../components/Scene2Components';
import { PaperTexture } from '../../../../shared-components/PaperTexture';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceSpring = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const clockRotation = interpolate(frame, [0, 100], [0, 720], {
    extrapolateRight: 'clamp',
  });

  const giftOpacity = spring({
    frame: frame - 100,
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SPACING.PX_120,
          opacity: entranceSpring,
          transform: `scale(${interpolate(entranceSpring, [0, 1], [0.9, 1])})`,
        }}
      >
        {/* Clock Section */}
        <div style={{ position: 'relative' }}>
          <Clock rotation={clockRotation} size={400} />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: FONTS.HANDWRITING,
                fontSize: FONTS.SIZE_3XL,
                color: COLORS.PRIMARY_BOLD,
                lineHeight: 1,
              }}
            >
              2시간
            </span>
            <span
              style={{
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_MD,
                color: COLORS.TEXT_SUB,
                fontWeight: FONTS.WEIGHT_MEDIUM,
              }}
            >
              여유
            </span>
          </div>
        </div>

        {/* Gift Section */}
        <div
          style={{
            opacity: giftOpacity,
            transform: `translateY(${interpolate(giftOpacity, [0, 1], [40, 0])}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: SPACING.PX_32,
          }}
        >
          <GiftBox size={300} />
          <div
            style={{
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              color: COLORS.TEXT_MAIN,
              fontWeight: FONTS.WEIGHT_BOLD,
              textAlign: 'center',
            }}
          >
            선물 같은 하루
          </div>
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
