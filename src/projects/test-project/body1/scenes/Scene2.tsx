import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';
import { PaperTexture } from '../../../../shared-components/PaperTexture';
import { PomodoroTimer } from '../components/PomodoroTimer';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // { "두": 0f, "번째는": 6f, "집중력을": 22f, "극대화하는": 44f, "'뽀모도로": 71f, "타이머'": 93f, "활용법이에요.": 109f }
  
  const timerStartFrame = 71;
  const timerProgress = interpolate(frame, [timerStartFrame, timerStartFrame + 60], [0, 0.75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const enterSpring = spring({
    frame: frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const rippleScale = interpolate(frame % 45, [0, 45], [1, 1.8]);
  const rippleOpacity = interpolate(frame % 45, [0, 30, 45], [0, 0.3, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        left: SPACING.PX_80,
        top: SPACING.PX_80,
        fontFamily: FONTS.MONO,
        fontSize: FONTS.SIZE_LG,
        color: COLORS.STROKE_SUBTLE,
        opacity: interpolate(enterSpring, [0, 1], [0, 0.5]),
      }}>
        02. METHOD
      </div>

      <AbsoluteFill style={{ 
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: SPACING.PX_120,
        zIndex: Z.CONTENT,
      }}>
        {/* Left Side: Text Labels */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: SPACING.PX_24 }}>
          <div style={{
            fontFamily: FONTS.HANDWRITING,
            fontSize: FONTS.SIZE_XL,
            color: COLORS.TEXT_MAIN,
            opacity: interpolate(frame, [22, 40], [0, 1], { extrapolateLeft: 'clamp' }),
          }}>
            집중력 극대화
          </div>
          <div style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_MD,
            color: COLORS.TEXT_BODY,
            opacity: interpolate(frame, [71, 90], [0, 1], { extrapolateLeft: 'clamp' }),
            padding: `${SPACING.PX_8}px ${SPACING.PX_24}px`,
            backgroundColor: COLORS.BG_MUTED,
            borderRadius: SPACING.RADIUS_MD,
            width: 'fit-content',
          }}>
            뽀모도로 타이머
          </div>
        </div>

        {/* Right Side: Timer */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative',
        }}>
          {/* Ripple Effect */}
          <div style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: `4px solid ${COLORS.SECONDARY}`,
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }} />
          
          <Wobble intensity={1.5}>
            <div style={{ transform: `scale(${interpolate(enterSpring, [0, 1], [0.8, 1])})` }}>
              <PomodoroTimer size={450} progress={timerProgress} />
            </div>
          </Wobble>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
