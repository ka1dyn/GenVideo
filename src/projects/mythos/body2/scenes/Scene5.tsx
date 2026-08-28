import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene5: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_SURFACE }}>
      <PaperTexture />
      {/* 그리드 패턴 */}
      <AbsoluteFill style={{ 
        backgroundImage: `radial-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 0)`,
        backgroundSize: `${SPACING.PX_48}px ${SPACING.PX_48}px`,
        opacity: 0.5,
      }} />

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        paddingBottom: 150, // 자막 영역 회피
        gap: SPACING.PX_96,
      }}>
        {/* 카드 그리드 */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          gap: SPACING.PX_48 
        }}>
          <Appear delay={11} type="fadeUp">
            <Card variant="surface" shadow="md">
              <div style={{ padding: SPACING.PX_24, textAlign: 'center' }}>
                <div style={{ fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_SUB }}>
                  실제 성능
                </div>
                <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_BOLD, color: COLORS.TEXT_MAIN }}>
                  100%
                </div>
              </div>
            </Card>
          </Appear>

          <Appear delay={56} type="fadeUp">
            <Card variant="emphasis" shadow="lg">
              <div style={{ padding: SPACING.PX_24, textAlign: 'center' }}>
                <div style={{ fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_SUB }}>
                  테스트 결과
                </div>
                <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_BOLD, color: COLORS.STATE_ERROR_FG }}>
                  20%
                </div>
              </div>
            </Card>
          </Appear>
        </div>

        {/* 하단 강조 텍스트 */}
        <div style={{ 
          fontFamily: FONTS.DISPLAY, 
          fontSize: FONTS.SIZE_LG, 
          fontWeight: FONTS.WEIGHT_BOLD, 
          color: COLORS.TEXT_MAIN 
        }}>
          <UnderLine startFrame={97} color={COLORS.PRIMARY}>
            <span>능력 은폐 가설</span>
          </UnderLine>
        </div>
      </div>
    </AbsoluteFill>
  );
};
