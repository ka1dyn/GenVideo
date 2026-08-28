import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { ProgressBar } from '../../../../shared-components/ProgressBar';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene4: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture />
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        paddingBottom: 150, // 자막 영역 회피
        position: 'relative',
      }}>
        {/* 1. 신뢰의 위기 */}
        <Appear delay={19} exitAt={57} type="fadeUp" style={{ position: 'absolute' }}>
          <Wobble mode="smooth" intensity={2}>
            <div style={{ 
              fontFamily: FONTS.DISPLAY, 
              fontSize: FONTS.SIZE_2XL, 
              fontWeight: FONTS.WEIGHT_BOLD, 
              color: COLORS.STATE_ERROR_FG,
            }}>
              신뢰의 위기
            </div>
          </Wobble>
        </Appear>

        {/* 2. 안전성 판단 근거 */}
        <Appear delay={66} exitAt={129} type="fadeUp" style={{ position: 'absolute' }}>
          <div style={{ width: 600, textAlign: 'center' }}>
            <div style={{ 
              fontFamily: FONTS.PRIMARY, 
              fontSize: FONTS.SIZE_MD, 
              color: COLORS.TEXT_ON_DARK,
              marginBottom: SPACING.PX_24,
            }}>
              안전성 판단 근거
            </div>
            <ProgressBar value={1.0} startFrame={66} duration={40} color={COLORS.PRIMARY} />
          </div>
        </Appear>

        {/* 3. 유일한 판단 도구: 테스트 */}
        <Appear delay={147} type="scale" style={{ position: 'absolute' }}>
          <Card variant="outline">
            <div style={{ 
              fontFamily: FONTS.DISPLAY, 
              fontSize: FONTS.SIZE_XL, 
              fontWeight: FONTS.WEIGHT_BOLD, 
              color: COLORS.TEXT_ON_DARK,
              padding: `${SPACING.PX_16}px ${SPACING.PX_48}px`,
            }}>
              유일한 판단 도구: 테스트
            </div>
          </Card>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
