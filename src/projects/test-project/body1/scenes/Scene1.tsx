import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';
import { PaperTexture } from '../../../../shared-components/PaperTexture';
import { TangledLines } from '../components/TangledLines';
import { CleanShape } from '../components/CleanShape';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline data from plan
  // { "머릿속": 0f, "복잡한": 12f, "생각들을": 24f, "정리하는": 40f, "것만으로도": 56f, "뇌의": 80f, "부하가": 87f, "줄어들죠.": 100f }
  
  // Transitions
  const organizeStartFrame = 40;
  const organizeProgress = spring({
    frame: frame - organizeStartFrame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const opacityTangled = interpolate(organizeProgress, [0, 0.5], [1, 0]);
  const opacityClean = interpolate(organizeProgress, [0.5, 1], [0, 1]);
  const scale = interpolate(organizeProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      {/* Background Grid */}
      <AbsoluteFill style={{ zIndex: Z.BG }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.STROKE_SUBTLE} 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          opacity: 0.2,
        }} />
      </AbsoluteFill>

      {/* Main Content */}
      <AbsoluteFill style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: Z.CONTENT,
      }}>
        <div style={{ transform: `scale(${scale})` }}>
          <Wobble intensity={2}>
            <div style={{ position: 'relative', width: 400, height: 400 }}>
              <div style={{ position: 'absolute', opacity: opacityTangled }}>
                <TangledLines size={400} />
              </div>
              <div style={{ position: 'absolute', opacity: opacityClean }}>
                <CleanShape size={400} />
              </div>
            </div>
          </Wobble>
        </div>

        {/* Labels */}
        <div style={{
          position: 'absolute',
          top: '20%',
          fontFamily: FONTS.HANDWRITING,
          fontSize: FONTS.SIZE_LG,
          color: COLORS.TEXT_SUB,
          opacity: opacityTangled,
        }}>
          복잡한 생각들...
        </div>
        <div style={{
          position: 'absolute',
          bottom: '30%',
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_MD,
          color: COLORS.PRIMARY_DARK,
          opacity: opacityClean,
          fontWeight: FONTS.WEIGHT_BOLD,
        }}>
          깔끔하게 정리
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
