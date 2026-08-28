import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, SPACING, FONTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { StepList } from '../../../../shared-components/StepList';
import { TypeWriter } from '../../../../shared-components/TypeWriter';

export const Scene5: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_MUTED,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.PX_80,
    }}>
      <PaperTexture />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(90deg, ${COLORS.STROKE_SUBTLE} 1px, transparent 1px), linear-gradient(0deg, ${COLORS.STROKE_SUBTLE} 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
        opacity: 0.2,
      }} />
      
      <div style={{ width: '100%', maxWidth: 1000, paddingBottom: 150, zIndex: 1 }}>
        <div style={{ 
          marginBottom: SPACING.PX_48,
          fontSize: FONTS.SIZE_LG,
          color: COLORS.PRIMARY_BOLD,
          fontFamily: FONTS.DISPLAY,
          fontWeight: FONTS.WEIGHT_BOLD,
        }}>
          <TypeWriter text="탈출 시퀀스 분석" startFrame={0} speed={2} />
        </div>
        <StepList 
          items={[
            "보안 취약점 연결",
            "인터넷 접근권한 획득",
            "연구원 이메일 발송"
          ]}
          startFrame={29}
          stagger={70}
          labelType="number"
          color={COLORS.TEXT_MAIN}
          labelColor={COLORS.PRIMARY}
        />
      </div>
    </AbsoluteFill>
  );
};
