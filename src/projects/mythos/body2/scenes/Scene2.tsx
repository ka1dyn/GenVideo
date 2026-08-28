import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, EFFECTS, SPACING } from '../../../../constants/theme';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { TypeWriter } from '../../../../shared-components/TypeWriter';

export const Scene2: React.FC = () => {
  const imagePath = staticFile('mythos/body2/images/ai_test.png');

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARK }}>
      <Img 
        src={imagePath} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          opacity: 0.6,
        }} 
      />
      <AbsoluteFill style={{ backgroundColor: EFFECTS.TINT_DARK }} />
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        gap: SPACING.PX_80,
        paddingBottom: 150, // 자막 영역 회피
      }}>
        <div style={{ 
          fontFamily: FONTS.MONO, 
          fontSize: FONTS.SIZE_MD, 
          fontWeight: FONTS.WEIGHT_MEDIUM, 
          color: COLORS.TEXT_ON_DARK,
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`,
          borderRadius: SPACING.RADIUS_MD,
        }}>
          <TypeWriter 
            text="SYSTEM: 테스트 환경 감지됨" 
            startFrame={41} 
            speed={2}
          />
        </div>

        <Appear delay={93} type="scale">
          <Card variant="emphasis" shadow="lg">
            <span style={{ 
              fontFamily: FONTS.PRIMARY, 
              fontSize: FONTS.SIZE_LG, 
              fontWeight: FONTS.WEIGHT_BOLD,
              color: COLORS.STATE_WARN_FG,
              padding: `0 ${SPACING.PX_24}px`,
            }}>
              상태: 인지 완료
            </span>
          </Card>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
