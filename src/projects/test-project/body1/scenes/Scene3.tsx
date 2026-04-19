import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';
import { DrawLine } from '../../../../shared-components/DrawLine';
import { PaperTexture } from '../../../../shared-components/PaperTexture';
import { ConcentrationIcon } from '../components/ConcentrationIcon';
import { RestIcon } from '../components/RestIcon';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // { "딱": 0f, "25분만": 3f, "몰입하고": 31f, "5분": 49f, "쉬는": 60f, "규칙이": 71f, ... }
  
  const enterSpring = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const dividerHeight = interpolate(frame, [0, 20], [0, height * 0.6], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      {/* Central Divider */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '20%',
        width: 4,
        height: dividerHeight,
        backgroundColor: COLORS.STROKE_INK,
        transform: 'translateX(-50%)',
        borderRadius: 2,
        opacity: 0.3,
      }} />

      <AbsoluteFill style={{ display: 'flex', flexDirection: 'row', zIndex: Z.CONTENT }}>
        {/* Left: 25m Focus */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          opacity: interpolate(frame, [3, 20], [0, 1]),
          transform: `translateX(${interpolate(enterSpring, [0, 1], [-50, 0])}px)`,
        }}>
          <Wobble intensity={2}>
            <ConcentrationIcon size={240} />
          </Wobble>
          <div style={{ 
            marginTop: SPACING.PX_40, 
            fontFamily: FONTS.HANDWRITING, 
            fontSize: FONTS.SIZE_LG,
            color: COLORS.PRIMARY_DARK,
          }}>
            딱 25분 몰입
          </div>
        </div>

        {/* Right: 5m Rest */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          opacity: interpolate(frame, [49, 65], [0, 1], { extrapolateLeft: 'clamp' }),
          transform: `translateX(${interpolate(frame, [49, 65], [50, 0], { extrapolateLeft: 'clamp' })}px)`,
        }}>
          <Wobble intensity={1.5}>
            <RestIcon size={240} />
          </Wobble>
          <div style={{ 
            marginTop: SPACING.PX_40, 
            fontFamily: FONTS.HANDWRITING, 
            fontSize: FONTS.SIZE_LG,
            color: COLORS.SECONDARY_DARK,
          }}>
            5분 휴식
          </div>
        </div>
      </AbsoluteFill>

      {/* Speed Multiplier Label */}
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: interpolate(frame, [114, 130], [0, 1], { extrapolateLeft: 'clamp' }),
      }}>
        <div style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_XL,
          color: COLORS.TEXT_MAIN,
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
        }}>
          속도 2배!
        </div>
        <DrawLine 
          width={200} 
          strokeWidth={10} 
          color={COLORS.PRIMARY} 
        />
      </div>
    </AbsoluteFill>
  );
};
