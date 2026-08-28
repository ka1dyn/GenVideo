import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { StepList } from '../../../../shared-components/StepList';

export const Scene5: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture isDark />
      
      {/* Background Grid Pattern */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: `radial-gradient(${COLORS.OVERLAY_MED} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.5
      }} />

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        paddingBottom: 150, // 자막 영역 확보
        zIndex: Z.CONTENT,
        gap: SPACING.PX_96
      }}>
        <div style={{ width: '800px', fontSize: FONTS.SIZE_LG }}>
          <StepList 
            items={[
              "AI 탈출사건",
              "테스트 점수 조작",
              "Opus 4.7 성능 강등"
            ]}
            startFrame={0}
            stagger={45}
            color={COLORS.TEXT_ON_DARK}
            labelColor={COLORS.PRIMARY}
          />
        </div>

        <Appear delay={192}>
          <div style={{ 
            fontSize: FONTS.SIZE_XL, 
            color: COLORS.PRIMARY, 
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            fontFamily: FONTS.DISPLAY,
            letterSpacing: '0.05em'
          }}>
            지금 파헤쳐보겠습니다
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
