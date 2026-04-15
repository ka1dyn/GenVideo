import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { Wobble } from '../../../shared-components/Wobble';
import { DrawLine } from '../../../shared-components/DrawLine';
import { PaperTexture } from '../../../shared-components/PaperTexture';
import { Body3MilitaryIcon } from '../components/svg/Body3MilitaryIcon';
import { Body3WeaponIcon } from '../components/svg/Body3WeaponIcon';
import { Body3SurveillanceIcon } from '../components/svg/Body3SurveillanceIcon';
import { Body3GavelIcon } from '../components/svg/Body3GavelIcon';
import { Body3BattlefieldSketch } from '../components/svg/Body3BattlefieldSketch';
import { Body3MissingIcon } from '../components/svg/Body3MissingIcon';

const DrawX: React.FC<{ size: number; color: string; progress: number }> = ({ size, color, progress }) => {
  const p1 = Math.min(1, progress * 2);
  const p2 = Math.max(0, (progress - 0.5) * 2);

  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <path
        d="M 10 10 L 90 90"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="120"
        strokeDashoffset={120 * (1 - p1)}
      />
      <path
        d="M 90 10 L 10 90"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="120"
        strokeDashoffset={120 * (1 - p2)}
      />
    </svg>
  );
};

/** [Scene 1]
 * @narrative — 앤트로픽의 군사적 사용 반대 철학
 * @layout — 중앙 정렬 기반의 대비형 레이아웃 (기업명 vs 금지 대상)
 * @elements — 텍스트(앤트로픽, 군사적 목적), 스케치 아이콘(Military), DrawX
 * @animation — 텍스트 spring 등장 후 X 표시 드로잉 애니메이션
 * @tokens — COLORS.TEXT_MAIN, COLORS.STATE_ERROR_FG, FONTS.SIZE_LG, SPACING.PX_48
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const xProgress = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: 'center', alignItems: 'center' }}>
      <PaperTexture />
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: SPACING.PX_48,
        transform: `scale(${spr})`,
        opacity: spr,
      }}>
        <div style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_2XL,
          fontWeight: FONTS.WEIGHT_BOLD,
          color: COLORS.TEXT_MAIN,
        }}>
          앤트로픽 (Anthropic)
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Body3MilitaryIcon size={300} color={COLORS.TEXT_SUB} />
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <DrawX size={400} color={COLORS.STATE_ERROR_FG} progress={xProgress} />
          </div>
          
          <div style={{
            marginTop: SPACING.PX_24,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.STATE_ERROR_FG,
            fontWeight: FONTS.WEIGHT_BOLD,
          }}>
            군사적 목적 사용 금지
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 2]
 * @narrative — 펜타곤에 제시한 구체적인 사용 금지 조건 (자율 무기, 대량 감시)
 * @layout — 상단 헤더와 하단 2분할 카드 레이아웃 (Flexbox, gap: 80px)
 * @elements — 헤더 텍스트(사용 조건), 조건 카드 2종(자율 무기, 대량 감시), 스케치 아이콘
 * @animation — 헤더 등장 후 카드 순차적 spring 등장 (stagger 적용)
 * @tokens — COLORS.BG_SURFACE, COLORS.STROKE_DEFAULT, FONTS.SIZE_MD, SPACING.PX_64
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpr = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const card1Spr = spring({
    frame: frame - 30,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  const card2Spr = spring({
    frame: frame - 45,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, padding: SPACING.PX_80 }}>
      <PaperTexture />
      
      <div style={{
        fontFamily: FONTS.PRIMARY,
        fontSize: FONTS.SIZE_XL,
        color: COLORS.TEXT_MAIN,
        fontWeight: FONTS.WEIGHT_BOLD,
        opacity: titleSpr,
        transform: `translateY(${interpolate(titleSpr, [0, 1], [20, 0])}px)`,
        borderLeft: `${SPACING.BORDER_THICK}px solid ${COLORS.PRIMARY}`,
        paddingLeft: SPACING.PX_32,
        marginBottom: SPACING.PX_80,
      }}>
        펜타곤 공급 조건
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 80,
      }}>
        {/* Card 1: Autonomous Weapons */}
        <div style={{
          width: 500,
          height: 600,
          backgroundColor: COLORS.BG_SURFACE,
          border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
          borderRadius: SPACING.RADIUS_LG,
          padding: SPACING.PX_48,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          opacity: card1Spr,
          transform: `scale(${card1Spr}) translateY(${interpolate(card1Spr, [0, 1], [50, 0])}px)`,
          boxShadow: EFFECTS.SHADOW_SM,
        }}>
          <Body3WeaponIcon size={200} color={COLORS.STATE_ERROR_FG} />
          <div style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.TEXT_MAIN,
            fontWeight: FONTS.WEIGHT_BOLD,
            textAlign: 'center',
          }}>
            자율 무기<br/>개발 금지
          </div>
        </div>

        {/* Card 2: Mass Surveillance */}
        <div style={{
          width: 500,
          height: 600,
          backgroundColor: COLORS.BG_SURFACE,
          border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
          borderRadius: SPACING.RADIUS_LG,
          padding: SPACING.PX_48,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          opacity: card2Spr,
          transform: `scale(${card2Spr}) translateY(${interpolate(card2Spr, [0, 1], [50, 0])}px)`,
          boxShadow: EFFECTS.SHADOW_SM,
        }}>
          <Body3SurveillanceIcon size={200} color={COLORS.STATE_ERROR_FG} />
          <div style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.TEXT_MAIN,
            fontWeight: FONTS.WEIGHT_BOLD,
            textAlign: 'center',
          }}>
            대량 감시<br/>용도 금지
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 3]
 * @narrative — 트럼프 행정부의 보복 조치(공급망 위험 기업 지정)와 앤트로픽의 즉각 소송
 * @layout — 중앙 앤트로픽 노드와 이를 압박하는 낙인형 레이아웃 + 법정 공방 시각화
 * @elements — 텍스트(공급망 위험 기업), 낙인(Stamp), 텍스트(소송 제기), 스케치 아이콘(Gavel)
 * @animation — 낙인이 찍힐 때의 강한 spring 효과 후 화면 좌우 2분할로 대치 상황 연출
 * @tokens — COLORS.STATE_ERROR_FG, COLORS.STATE_SUCCESS_FG, FONTS.SIZE_XL, SPACING.PX_40
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Stamp (0-150f)
  const stampSpr = spring({
    frame: frame - 20,
    fps,
    config: ANIMATION.SPRING_HEAVY,
  });

  const shake = stampSpr > 0.9 && frame < 60 ? Math.sin(frame * 2) * 10 : 0;

  // Phase 2: Lawsuit (150f-)
  const lawsuitOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: 'clamp' });
  const lawsuitSpr = spring({
    frame: frame - 150,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: 'center', alignItems: 'center', transform: `translateX(${shake}px)` }}>
      <PaperTexture />
      
      {/* Background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        fontFamily: FONTS.PRIMARY,
        fontSize: FONTS.SIZE_2XL,
        color: COLORS.TEXT_DISABLED,
        opacity: 0.2,
        fontWeight: FONTS.WEIGHT_BOLD,
      }}>
        앤트로픽 (Anthropic)
      </div>

      {/* Stamp */}
      {frame < 160 && (
        <div style={{
          padding: `${SPACING.PX_24}px ${SPACING.PX_48}px`,
          border: `${SPACING.BORDER_THICK * 2}px solid ${COLORS.STATE_ERROR_FG}`,
          borderRadius: SPACING.RADIUS_MD,
          color: COLORS.STATE_ERROR_FG,
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_XL,
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          transform: `scale(${interpolate(stampSpr, [0, 1], [4, 1])}) rotate(${interpolate(stampSpr, [0, 1], [-20, -10])}deg)`,
          opacity: interpolate(frame, [150, 160], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * stampSpr,
          boxShadow: EFFECTS.SHADOW_LG,
          zIndex: Z.CONTENT,
        }}>
          공급망 위험 기업 지정
        </div>
      )}

      {/* Lawsuit Overlay */}
      {frame > 150 && (
        <AbsoluteFill style={{
          backgroundColor: COLORS.BG_BASE,
          opacity: lawsuitOpacity,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
        }}>
          <PaperTexture />
          
          {/* US Government Side (Left) */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: SPACING.PX_80,
            position: 'relative',
            borderRight: `2px dashed ${COLORS.STATE_ERROR_FG}33`
          }}>
            <div style={{ 
              position: 'absolute', 
              top: 100, 
              fontFamily: FONTS.MONO, 
              fontSize: 24, 
              color: COLORS.STATE_ERROR_FG,
              letterSpacing: 4
            }}>미 정부 조치</div>
            
            <div style={{
              backgroundColor: COLORS.BG_SURFACE,
              border: `4px solid ${COLORS.STATE_ERROR_FG}`,
              padding: SPACING.PX_40,
              borderRadius: SPACING.RADIUS_MD,
              textAlign: 'center',
              boxShadow: EFFECTS.SHADOW_MD,
              transform: `translateX(${interpolate(lawsuitSpr, [0, 1], [-100, 0])}px)`
            }}>
              <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 48, fontWeight: 'bold', color: COLORS.STATE_ERROR_FG, marginBottom: 16 }}>미국 정부</div>
              <div style={{ width: 100, height: 4, backgroundColor: COLORS.STATE_ERROR_FG, margin: '0 auto 24px' }} />
              <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 32, color: COLORS.TEXT_MAIN, fontWeight: 'bold' }}>"공급망 위험 차단"</div>
            </div>
          </div>

          {/* Central VS / Divider */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              width: 4,
              height: 200,
              background: `linear-gradient(to bottom, transparent, ${COLORS.STROKE_DEFAULT}, transparent)`,
            }} />
            <div style={{
              margin: '20px 0',
              transform: `scale(${lawsuitSpr})`,
            }}>
              <Body3GavelIcon size={160} color={COLORS.PRIMARY_BOLD} />
            </div>
            <div style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: 64,
              fontWeight: 900,
              color: COLORS.PRIMARY_BOLD,
              fontStyle: 'italic',
              textShadow: `4px 4px 0px ${COLORS.BG_BASE}`,
              opacity: lawsuitSpr
            }}>대립</div>
            <div style={{
              width: 4,
              height: 200,
              background: `linear-gradient(to bottom, transparent, ${COLORS.STROKE_DEFAULT}, transparent)`,
            }} />
          </div>

          {/* Anthropic Side (Right) */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: SPACING.PX_80,
            position: 'relative',
          }}>
            <div style={{ 
              position: 'absolute', 
              top: 100, 
              fontFamily: FONTS.MONO, 
              fontSize: 24, 
              color: COLORS.STATE_SUCCESS_FG,
              letterSpacing: 4
            }}>기업 대응</div>

            <div style={{
              backgroundColor: COLORS.BG_SURFACE,
              border: `4px solid ${COLORS.STATE_SUCCESS_FG}`,
              padding: SPACING.PX_40,
              borderRadius: SPACING.RADIUS_MD,
              textAlign: 'center',
              boxShadow: EFFECTS.SHADOW_MD,
              transform: `translateX(${interpolate(lawsuitSpr, [0, 1], [100, 0])}px)`
            }}>
              <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 48, fontWeight: 'bold', color: COLORS.STATE_SUCCESS_FG, marginBottom: 16 }}>앤트로픽</div>
              <div style={{ width: 100, height: 4, backgroundColor: COLORS.STATE_SUCCESS_FG, margin: '0 auto 24px' }} />
              <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 32, color: COLORS.TEXT_MAIN, fontWeight: 'bold' }}>"부당한 조치, 즉각 소송"</div>
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/** [Scene 4]
 * @narrative — 아이러니: 퇴출 압박(법적 분쟁) 와중에도 전장에서 실제 가동 중인 클로드
 * @layout — 좌측의 법적 경고문(배경)과 이를 가로지르는 우측의 실전 가동 모니터링 UI
 * @elements — "RESTRICTED" 경고문, 전술 뷰파인더(SVG), "LIVE_FEED" 텍스트, 타겟 락온 표시
 * @animation — 경고문 위에 디지털 노이즈와 함께 실전 데이터가 덮어씌워지는 연출
 * @tokens — COLORS.BG_DARK, COLORS.STATE_ERROR_FG, COLORS.PRIMARY, FONTS.SIZE_LG
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Ban Document (Background)
  const docOpacity = interpolate(frame, [0, 20], [0, 0.4], { extrapolateRight: 'clamp' });
  
  // Phase 2: Live Feed (Foreground)
  const feedOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' });
  const scanLine = interpolate(frame % 40, [0, 40], [-100, 100]);
  
  const viewfinderSpring = spring({
    frame: frame - 45,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture opacity={0.03} />

      <Body3BattlefieldSketch color={COLORS.BG_DARK} />

      {/* Foreground: Active AI Viewport */}
      <div style={{
        opacity: feedOpacity,
        zIndex: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          width: 1200,
          height: 700,
          border: `2px solid ${COLORS.PRIMARY}`,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 40, 40, 0.4)',
          transform: `scale(${viewfinderSpring})`,
          boxShadow: `0 0 50px ${COLORS.PRIMARY}44`,
        }}>
          {/* Scanline */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            backgroundColor: COLORS.PRIMARY,
            top: `${50 + scanLine}%`,
            boxShadow: `0 0 10px ${COLORS.PRIMARY}`,
            opacity: 0.5,
          }} />

          {/* Viewfinder Reticles */}
          <div style={{ position: 'absolute', top: 40, left: 40, width: 40, height: 40, borderTop: `4px solid ${COLORS.PRIMARY}`, borderLeft: `4px solid ${COLORS.PRIMARY}` }} />
          <div style={{ position: 'absolute', top: 40, right: 40, width: 40, height: 40, borderTop: `4px solid ${COLORS.PRIMARY}`, borderRight: `4px solid ${COLORS.PRIMARY}` }} />
          <div style={{ position: 'absolute', bottom: 40, left: 40, width: 40, height: 40, borderBottom: `4px solid ${COLORS.PRIMARY}`, borderLeft: `4px solid ${COLORS.PRIMARY}` }} />
          <div style={{ position: 'absolute', bottom: 40, right: 40, width: 40, height: 40, borderBottom: `4px solid ${COLORS.PRIMARY}`, borderRight: `4px solid ${COLORS.PRIMARY}` }} />

          {/* AI Status Text */}
          <div style={{ position: 'absolute', top: 40, left: 100, fontFamily: FONTS.MONO, color: COLORS.PRIMARY, fontSize: 32 }}>
            ● [현장 중계] 07 구역
          </div>
          <div style={{ position: 'absolute', bottom: 40, right: 100, textAlign: 'right', fontFamily: FONTS.MONO, color: COLORS.PRIMARY, fontSize: 32 }}>
             클로드 엔진 v3.2<br/>
             상태: <span style={{ color: COLORS.STATE_SUCCESS_FG }}>실전 투입 중</span>
          </div>

          {/* Central Tracking UI */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{ width: 300, height: 300, border: `2px dashed ${COLORS.PRIMARY}`, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <div style={{ width: 200, height: 200, border: `1px solid ${COLORS.PRIMARY}`, borderRadius: '50%', opacity: 0.5 }} />
            </div>
            <div style={{ 
              marginTop: 32, 
              fontSize: 48, 
              color: '#FFFFFF', 
              fontFamily: FONTS.HANDWRITING,
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(0,0,0,0.8)',
              backgroundColor: 'rgba(0,0,0,0.4)',
              padding: '10px 30px',
              borderRadius: 10
            }}>
               "전쟁터 실전 분석 중..."
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 5]
 * @narrative — 대체재 부재로 인한 어쩔 수 없는 사용 지속 (실용적 선택)
 * @layout — 상단 검색창 UI와 중앙 검색 결과 제로(0) 상태 레이아웃
 * @elements — 검색창 스케치, 텍스트(대체 AI), 숫자(0), 스케치 아이콘(Empty Box)
 * @animation — 타이핑 애니메이션 후 숫자가 줄어들며 'Claude' 강조
 * @tokens — COLORS.STATE_WARN_FG, COLORS.PRIMARY, FONTS.SIZE_LG, SPACING.PX_48
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const searchText = "대체 AI 서비스 검색...";
  const typingSpeed = 3;
  const charsShown = Math.min(searchText.length, Math.floor(frame / typingSpeed));
  
  const searchResultSpr = spring({
    frame: frame - 60,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const finalClaudeSpr = spring({
    frame: frame - 100,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, padding: SPACING.PX_80 }}>
      <PaperTexture />
      
      {/* Search UI */}
      <div style={{
        width: '100%',
        height: 100,
        border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
        borderRadius: SPACING.RADIUS_MD,
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${SPACING.PX_32}px`,
        fontFamily: FONTS.PRIMARY,
        fontSize: FONTS.SIZE_MD,
        color: COLORS.TEXT_SUB,
        backgroundColor: COLORS.BG_SURFACE,
      }}>
        🔍 {searchText.slice(0, charsShown)}
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: searchResultSpr,
        transform: `translateY(${interpolate(searchResultSpr, [0, 1], [30, 0])}px)`,
      }}>
        <Body3MissingIcon size={240} color={COLORS.TEXT_DISABLED} />
        <div style={{
          marginTop: SPACING.PX_32,
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_XL,
          color: COLORS.TEXT_MAIN,
          fontWeight: FONTS.WEIGHT_BOLD,
        }}>
          검색 결과 <span style={{ color: COLORS.STATE_ERROR_FG }}>0</span>건
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={230}>
        <Scene1 />
      </Sequence>
      <Sequence from={230} durationInFrames={281}>
        <Scene2 />
      </Sequence>
      <Sequence from={511} durationInFrames={406}>
        <Scene3 />
      </Sequence>
      <Sequence from={917} durationInFrames={222}>
        <Scene4 />
      </Sequence>
      <Sequence from={1139} durationInFrames={155}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
