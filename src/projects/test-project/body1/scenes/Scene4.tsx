import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';
import { PaperTexture } from '../../../../shared-components/PaperTexture';
import { GearSystem } from '../components/GearSystem';
import { SortedData } from '../components/SortedData';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // { "마지막": 0f, ..., "AI": 127f, "자동화": 129f, "툴입니다.": 150f }
  
  const rotation = frame * 2;
  const enterSpring = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });

  // Data flow animation
  const dataProgress = interpolate(frame % 60, [0, 60], [0, 1]);
  const dataX = interpolate(dataProgress, [0, 1], [-200, 400]);
  const dataOpacity = interpolate(dataProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ 
      background: `linear-gradient(135deg, ${COLORS.BG_BASE} 0%, ${COLORS.SECONDARY_LIGHT} 100%)` 
    }}>
      <PaperTexture />
      
      {/* Background Gears */}
      <div style={{
        position: 'absolute',
        right: '-10%',
        bottom: '-10%',
        opacity: 0.1,
        transform: `rotate(${frame * 0.5}deg)`,
      }}>
        <GearSystem size={800} color={COLORS.STROKE_INK} rotation={frame} />
      </div>

      <AbsoluteFill style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: Z.CONTENT,
      }}>
        {/* Central AI Hub */}
        <div style={{ position: 'relative' }}>
          <Wobble intensity={2}>
            <GearSystem size={400} color={COLORS.PRIMARY_DARK} rotation={rotation} />
          </Wobble>
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            color: COLORS.TEXT_MAIN,
            backgroundColor: COLORS.BG_BASE,
            padding: `${SPACING.PX_8}px ${SPACING.PX_16}px`,
            borderRadius: SPACING.RADIUS_MD,
            boxShadow: EFFECTS.SHADOW_MD,
            opacity: interpolate(frame, [127, 140], [0, 1], { extrapolateLeft: 'clamp' }),
          }}>
            AI
          </div>
        </div>

        {/* Floating Data Documents */}
        <div style={{
          position: 'absolute',
          transform: `translateX(${dataX}px)`,
          opacity: dataOpacity,
        }}>
          <Wobble intensity={3}>
            <SortedData size={120} />
          </Wobble>
        </div>

        {/* Labels */}
        <div style={{
          position: 'absolute',
          top: '15%',
          fontFamily: FONTS.HANDWRITING,
          fontSize: FONTS.SIZE_LG,
          color: COLORS.TEXT_BODY,
          opacity: interpolate(frame, [41, 60], [0, 1], { extrapolateLeft: 'clamp' }),
        }}>
          반복되는 단순 노동을
        </div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_MD,
          color: COLORS.PRIMARY_BOLD,
          opacity: interpolate(frame, [129, 150], [0, 1], { extrapolateLeft: 'clamp' }),
          letterSpacing: SPACING.PX_4,
        }}>
          자동화로 해결!
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
