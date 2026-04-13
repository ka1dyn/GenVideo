import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS, FONTS } from '../../../constants/theme';
import { spring, interpolate, useVideoConfig } from 'remotion';

interface Props {
  type: 'target' | 'terms' | 'letter' | 'lawsuit';
  progress: number;
  title?: string;
  content?: string[];
  width?: number;
  height?: number;
}

/**
 * @gallery: <StatedDocument type="target" progress={1} title="표적 보고서" />
 * @gallery: <StatedDocument type="terms" progress={1} title="사용 약관" />
 * @gallery: <StatedDocument type="letter" progress={1} title="의회 서한" />
 * @gallery: <StatedDocument type="lawsuit" progress={1} title="소송 신청서" />
 */
export const StatedDocument: React.FC<Props> = ({
  type,
  progress,
  title = "공식 문서",
  content = ["섹션 1: 데이터 분석", "섹션 2: 전술 경로", "섹션 3: 법적 준수"],
  width = 500,
  height = 700,
}) => {
  const { fps } = useVideoConfig();
  
  // Animation for the stamp
  const stampSpring = spring({
    frame: progress * 60,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  
  const stampRotation = interpolate(stampSpring, [0, 1], [15, -10]);
  const stampScale = interpolate(stampSpring, [0, 0.8, 1], [3, 1.2, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.2], [0, 1]);

  return (
    <div style={{ position: 'relative', width, height }}>
      {/* Paper Base */}
      <Wobble intensity={1.5}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.BG_SURFACE,
          border: `2px solid ${COLORS.STROKE_INK}`,
          padding: '40px',
          boxShadow: '8px 8px 0px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ 
            fontFamily: FONTS.HANDWRITING, 
            fontSize: '40px', 
            color: COLORS.TEXT_MAIN,
            borderBottom: `2px solid ${COLORS.STROKE_DEFAULT}`,
            paddingBottom: '10px'
          }}>
            {title}
          </div>
          
          {/* Content Lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {content.map((line, i) => {
              const lineProgress = Math.max(0, Math.min(1, (progress * 2) - (i * 0.1)));
              return (
                <div key={i} style={{ 
                  fontFamily: FONTS.PRIMARY, 
                  fontSize: '24px', 
                  color: COLORS.TEXT_BODY,
                  position: 'relative'
                }}>
                  {line}
                  {/* Highlight for "terms" type */}
                  {type === 'terms' && (
                    <div style={{
                      position: 'absolute',
                      left: -5,
                      top: '20%',
                      height: '70%',
                      width: `${lineProgress * 105}%`,
                      backgroundColor: COLORS.SECONDARY_SOFT,
                      zIndex: -1,
                      opacity: 0.6
                    }} />
                  )}
                  {/* Draw effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: `${(1 - lineProgress) * 100}%`,
                    backgroundColor: COLORS.BG_SURFACE,
                    zIndex: 1
                  }} />
                </div>
              );
            })}
          </div>
          
          {/* Signature/Seal Area */}
          <div style={{ marginTop: 'auto', alignSelf: 'flex-end', width: '150px', height: '150px', border: `1px dashed ${COLORS.STROKE_DEFAULT}` }}>
          </div>
        </div>
      </Wobble>

      {/* Stamp Animation for target/lawsuit */}
      {(type === 'target' || type === 'lawsuit') && progress > 0.6 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${stampScale}) rotate(${stampRotation}deg)`,
          opacity: stampOpacity,
          pointerEvents: 'none'
        }}>
          <div style={{
            padding: '10px 30px',
            border: `8px solid ${COLORS.STATE_ERROR_FG}`,
            color: COLORS.STATE_ERROR_FG,
            fontSize: '60px',
            fontWeight: 'bold',
            fontFamily: FONTS.DISPLAY,
            textTransform: 'uppercase',
            letterSpacing: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 20px rgba(138, 40, 24, 0.2)'
          }}>
            {type === 'target' ? '타격 대상' : '소송 제기'}
          </div>
        </div>
      )}
    </div>
  );
};
