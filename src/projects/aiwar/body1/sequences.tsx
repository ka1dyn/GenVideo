import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { Wobble } from '../../../shared-components/Wobble';
import { DrawLine } from '../../../shared-components/DrawLine';
import { PaperTexture } from '../../../shared-components/PaperTexture';
import { Body1_Pentagon } from '../components/svg/body1_Pentagon';
import { Body1_Thinker } from '../components/svg/body1_Thinker';
import { Body1_Drone } from '../components/svg/body1_Drone';
import { Body1_MilitaryVehicle } from '../components/svg/body1_MilitaryVehicle';
import { Body1_CivilianVehicle } from '../components/svg/body1_CivilianVehicle';
import { Body1_TacticalMap } from '../components/ui/Body1_TacticalMap';

/** [Scene 1]
 * @narrative — '프로젝트 메이븐'이라는 핵심 시스템을 무게감 있게 소개하며 시청자의 시선을 집중시킴
 * @layout — 화면 중앙에 수직 Flex 배치를 사용하며, 넉넉한 여백(SPACING.PX_80)을 통해 미니멀리즘 강조
 * @elements — '프로젝트 메이븐' (메인 텍스트), '중심 시스템' (상단 라벨), 강조용 원형 점(dot) 요소
 * @animation — 메인 텍스트는 SPRING_GENTLE 스케일 인, 상단 라벨은 위에서 아래로(ENTER_Y_SM) 부드럽게 등장
 * @tokens — COLORS.BG_BASE, COLORS.TEXT_MAIN, COLORS.PRIMARY, FONTS.SIZE_XL, FONTS.SIZE_MD, ANIMATION.SPRING_GENTLE
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 20,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelTranslateY = interpolate(frame, [0, 20], [ANIMATION.ENTER_Y_SM, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: SPACING.PX_32,
        }}
      >
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateY(${labelTranslateY}px)`,
            color: COLORS.TEXT_SUB,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_MD,
            fontWeight: FONTS.WEIGHT_MEDIUM,
            letterSpacing: FONTS.TRACKING_WIDE,
          }}
        >
          중심 시스템
        </div>

        <div
          style={{
            transform: `scale(${titleSpring})`,
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_XL,
            fontWeight: FONTS.WEIGHT_BOLD,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.PX_16,
          }}
        >
          PROJECT MAVEN
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 2]
 * @narrative — 과거(2017년)로의 시점 전환을 명확히 인지시키며 이야기의 기원을 암시
 * @layout — 좌우 대칭을 활용한 Grid 레이아웃, 좌측에 큰 연도 텍스트 배치, 우측에 설명 텍스트 배치
 * @elements — '2017' (거대 배경 텍스트), '과거로의 회상' (드로잉 라인), '기원' (텍스트)
 * @animation — '2017'은 투명도 조절과 함께 왼쪽에서 오른쪽으로(ENTER_X_MD) 이동, 드로잉 라인은 DrawLine 사용
 * @tokens — COLORS.BG_BASE, COLORS.SECONDARY_SOFT, COLORS.TEXT_MAIN, FONTS.SIZE_4XL, FONTS.SIZE_MD, ANIMATION.EASE_OUT
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const yearOpacity = interpolate(frame, [0, 30], [0, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const yearTranslateX = interpolate(frame, [0, 45], [ANIMATION.ENTER_X_MD, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      {/* 2017 배경 텍스트 */}
      <div
        style={{
          position: 'absolute',
          left: '25%',
          top: '40%',
          opacity: yearOpacity,
          transform: `translateX(${yearTranslateX}px)`,
          color: COLORS.SECONDARY,
          fontFamily: FONTS.DISPLAY,
          fontSize: FONTS.SIZE_4XL,
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          zIndex: Z.BG,
        }}
      >
        2017
      </div>

      {/* 오른쪽 콘텐츠 영역 */}
      <div
        style={{
          position: 'absolute',
          right: '25%',
          top: '51%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: SPACING.PX_24,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            fontWeight: FONTS.WEIGHT_SEMIBOLD,
            lineHeight: FONTS.LEADING_TIGHT,
          }}
        >
          이야기의 시작<br />
        </div>
        <div style={{ width: 400, height: 4 }}>
          <DrawLine 
            color={COLORS.PRIMARY_SOFT} 
            strokeWidth={4} 
            durationInFrames={45} 
            startFrame={30}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};



/** [Scene 3]
 * @narrative — 국방부의 심각한 고민을 '생각하는 사람'의 실루엣을 통해 직관적으로 표현
 * @layout — 화면 중앙에 '생각하는 사람' 스케치 배치, 하단에 강조 텍스트 배치
 * @elements — Body1_Thinker (SVG), '심각한 고민' (핵심 텍스트)
 * @animation — 생각하는 사람은 페이드인과 함께 미세한 Wobble 적용, 텍스트는 아래에서 위로 등장
 * @tokens — COLORS.BG_BASE, COLORS.TEXT_MAIN, FONTS.SIZE_LG, ANIMATION.SPRING_GENTLE
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const thinkerOpacity = interpolate(frame, [0, 30], [0, 1]);
  const textOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: SPACING.PX_48
        }}
      >
        <div style={{ opacity: thinkerOpacity }}>
          <Wobble interval={5}>
            <Body1_Thinker size={400} color={COLORS.STROKE_INK} />
          </Wobble>
        </div>

        <div style={{
          opacity: textOpacity,
          transform: `translateY(${interpolate(textOpacity, [0, 1], [20, 0])}px)`,
          textAlign: 'center'
        }}>
          <div style={{
            color: COLORS.TEXT_SUB,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_MD,
            fontWeight: FONTS.WEIGHT_MEDIUM,
            marginBottom: SPACING.PX_8
          }}>
            미국 국방부
          </div>
          <div style={{
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            textDecoration: 'underline',
            textDecorationColor: COLORS.PRIMARY_SOFT
          }}>
            심각한 고민
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 4]
 * @narrative — 쏟아지는 드론 영상 데이터의 압도적인 양과 인간의 한계를 대조하여 표현
 * @layout — 화면 상단에 드론 3대를 배치하고, 하단으로 쏟아지는 데이터 라인(DrawLine)을 통해 흐름 표현
 * @elements — 드론 드로잉(SVG), '24시간' (배지), 데이터 스트림(선), '분석 한계' (텍스트)
 * @animation — 드론은 위아래로 미세하게 부유(Floating), 데이터 라인은 무한 반복되는 DrawLine 효과
 * @tokens — COLORS.BG_BASE, COLORS.SECONDARY_MID, COLORS.TEXT_MAIN, FONTS.SIZE_MD, SPACING.PX_16, ANIMATION.DUR_LG
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floating = Math.sin(frame / 10) * 10;

  const drones = [
    { left: '20%', delay: 0 },
    { left: '50%', delay: 10 },
    { left: '80%', delay: 5 },
  ];

  const streamOpacity = interpolate(frame, [0, 20], [0, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      {/* 데이터 스트림 (배경) */}
      <div style={{ position: 'absolute', inset: 0, opacity: streamOpacity }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i + 1) * 8}%`,
              top: 0,
              bottom: 0,
              width: 2,
            }}
          >
            <DrawLine
              color={COLORS.SECONDARY_MID}
              strokeWidth={2}
              durationInFrames={60}
              startFrame={(i * 7) % 30}
              // DrawLine은 기본적으로 가로선을 그리므로 세로로 회전시켜야 함
              style={{ transform: 'rotate(90deg)', transformOrigin: 'top left', width: '200%' }}
            />
          </div>
        ))}
      </div>

      {/* 드론들 */}
      {drones.map((drone, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: drone.left,
            top: '15%',
            transform: `translateX(-50%) translateY(${floating + drone.delay}px)`,
          }}
        >
          <Wobble>
            <Body1_Drone size={150} color={COLORS.STROKE_INK} />
          </Wobble>
        </div>
      ))}

      {/* 정보 배지 */}
      <div
        style={{
          position: 'absolute',
          bottom: 250,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_16,
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.BG_DARK,
            color: COLORS.TEXT_ON_DARK,
            padding: `${SPACING.PX_8}px ${SPACING.PX_16}px`,
            borderRadius: SPACING.RADIUS_PILL,
            fontFamily: FONTS.MONO,
            fontSize: FONTS.SIZE_MD,
            fontWeight: FONTS.WEIGHT_BOLD,
          }}
        >
          24/7 데이터 수집
        </div>
        <div
          style={{
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            textAlign: 'center',
          }}
        >
          사람의 눈으로 감당 불가능
        </div>
      </div>
    </AbsoluteFill>
  );
};


/** [Scene 5]
 * @narrative — 군사와 민간 차량 식별의 어려움을 시각적 대비를 통해 표현하여 인간의 인지 한계 강조
 * @layout — 좌측(군사)과 우측(민간)의 2분할 구조, 중앙에 의문부호(?)를 배치하여 혼란 표현
 * @elements — '군사 차량' (박스), '민간 차량' (원), '?' (거대 텍스트), Wobble 효과
 * @animation — 박스와 원이 번갈아가며 강조(Scale Up), 의문부호는 점진적으로 커지며 떨림 표현
 * @tokens — COLORS.BG_BASE, COLORS.PRIMARY, COLORS.SECONDARY, FONTS.SIZE_XL, SPACING.PX_32, ANIMATION.SPRING_BOUNCY
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const militaryScale = interpolate(
    frame,
    [0, 20, 40, 60],
    [1, 1.1, 1, 1.05],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const civilianScale = interpolate(
    frame,
    [30, 50, 70, 90],
    [1, 1.1, 1, 1.05],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const questionOpacity = interpolate(frame, [80, 100], [0, 1]);
  const questionScale = spring({
    frame: frame - 80,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-around', padding: SPACING.PX_80 }}>
        {/* 군사 차량 (왼쪽) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_24, transform: `scale(${militaryScale})` }}>
          <div style={{ width: 300, height: 300, border: `4px solid ${COLORS.PRIMARY}`, borderRadius: SPACING.RADIUS_MD, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.BG_BASE }}>
            <Body1_MilitaryVehicle size={250} color={COLORS.PRIMARY_BOLD} />
          </div>
          <div style={{ color: COLORS.TEXT_MAIN, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
            군사용
          </div>
        </div>

        {/* 의문부호 (중앙) */}
        <div style={{ position: 'absolute', opacity: questionOpacity, transform: `scale(${questionScale})`, zIndex: Z.CONTENT }}>
          <Wobble>
            <div style={{ fontSize: 240, color: COLORS.PRIMARY_BOLD, fontFamily: FONTS.HANDWRITING }}>?</div>
          </Wobble>
        </div>

        {/* 민간 차량 (오른쪽) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_24, transform: `scale(${civilianScale})` }}>
          <div style={{ width: 300, height: 300, border: `4px solid ${COLORS.SECONDARY}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.BG_BASE }}>
            <Body1_CivilianVehicle size={250} color={COLORS.SECONDARY_DARK} />
          </div>
          <div style={{ color: COLORS.TEXT_MAIN, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
            민간용
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 6]
 * @narrative — 모든 문제의 해결책으로 등장한 '메이븐'을 강력하고 명확하게 선언
 * @layout — 화면 중앙에 수직 레이아웃, 이전 장면의 혼란이 사라지고 하나의 로고로 집중되는 구조
 * @elements — 'MAVEN' (메인 텍스트), '해결의 열쇠' (하단 보조 텍스트), 강조용 직선
 * @animation — 텍스트는 SPRING_BOUNCY로 강하게 튀어나오며 등장, 직선은 양옆으로 확장되는 DrawLine
 * @tokens — COLORS.BG_BASE, COLORS.PRIMARY_BOLD, COLORS.TEXT_MAIN, FONTS.SIZE_2XL, FONTS.SIZE_MD, ANIMATION.SPRING_BOUNCY
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mavenScale = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  const subTextOpacity = interpolate(frame, [30, 50], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: SPACING.PX_32 }}>
        <div style={{ transform: `scale(${mavenScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: COLORS.PRIMARY_BOLD, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_3XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, letterSpacing: 10 }}>
            MAVEN
          </div>
          <div style={{ width: 600, height: 6, marginTop: -SPACING.PX_16 }}>
            <DrawLine color={COLORS.PRIMARY} strokeWidth={6} durationInFrames={30} startFrame={15} />
          </div>
        </div>
        
        <div style={{ opacity: subTextOpacity, color: COLORS.TEXT_SUB, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_MEDIUM }}>
          전쟁을 관리하는 거대한 두뇌
        </div>
      </div>
    </AbsoluteFill>
  );
};


/** [Scene 7]
 * @narrative — 전문가(카트리나 맨슨)의 발언임을 명시하여 정보의 신뢰성과 전문성 확보
 * @layout — 우측 하단에 치우친 프로필 카드 형태, 정교한 테두리와 여백을 통해 전문적인 인상
 * @elements — '카트리나 맨슨' (텍스트), 'Bloomberg 기자' (보조 라벨), 카드 배경(BG_SURFACE)
 * @animation — 카드는 오른쪽에서 왼쪽으로(ENTER_X_SM) 부드럽게 등장, 텍스트는 순차적으로 페이드인
 * @tokens — COLORS.BG_SURFACE, COLORS.TEXT_MAIN, COLORS.SECONDARY_DARK, FONTS.SIZE_LG, SPACING.PX_32, EFFECTS.SHADOW_MD
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardTranslateX = interpolate(frame, [0, 30], [ANIMATION.ENTER_X_MD, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardOpacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          position: 'absolute',
          right: '32%',
          bottom: '35%',
          width: 700,
          padding: SPACING.PX_48,
          backgroundColor: COLORS.BG_SURFACE,
          border: `2px solid ${COLORS.STROKE_DEFAULT}`,
          borderRadius: SPACING.RADIUS_LG,
          boxShadow: EFFECTS.SHADOW_MD,
          transform: `translateX(${cardTranslateX}px)`,
          opacity: cardOpacity,
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.PX_16,
        }}
      >
        <div style={{ color: COLORS.SECONDARY_DARK, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
          BLOOMBERG 기자의 취재
        </div>
        <div style={{ color: COLORS.TEXT_MAIN, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_EXTRABOLD }}>
          카트리나 맨슨
        </div>
        <div style={{ width: 100, height: 4, backgroundColor: COLORS.PRIMARY_SOFT, borderRadius: 2 }} />
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 8]
 * @narrative — '전쟁판 구글 어스'라는 비유를 통해 메이븐의 실시간 전장 정보 장악력을 시각화
 * @layout — 왼쪽에 회전하는 와이어프레임 지구본, 오른쪽에 핵심 텍스트를 배치한 분할 레이아웃
 * @elements — Body1_TacticalMap (지구본+HUD), '전쟁판 구글 어스' (핵심 타이포그래피)
 * @animation — 지구본은 페이드인 후 지속 회전, 텍스트는 순차적으로 페이드인+슬라이드업
 * @tokens — COLORS.BG_BASE, COLORS.TEXT_MAIN, FONTS.SIZE_3XL, ANIMATION.SPRING_GENTLE
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  const globeOpacity = interpolate(frame, [0, 30], [0, 1]);
  const labelOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleSlide = interpolate(frame, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}>
        {/* Left: Globe */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: globeOpacity,
        }}>
          <Body1_TacticalMap />
        </div>

        {/* Right: Text */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: SPACING.PX_80,
        }}>
          <div style={{
            opacity: labelOpacity,
            color: COLORS.TEXT_SUB,
            fontFamily: FONTS.MONO,
            fontSize: 18,
            letterSpacing: 4,
            marginBottom: SPACING.PX_16,
          }}>
            TACTICAL INTELLIGENCE
          </div>
          <div style={{
            opacity: titleOpacity,
            transform: `translateY(${titleSlide}px)`,
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_3XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            lineHeight: 1.1,
          }}>
            전쟁판<br/>구글 어스
          </div>
          <DrawLine
            color={COLORS.PRIMARY}
            strokeWidth={3}
            durationInFrames={40}
            startFrame={60}
            style={{ width: 200, marginTop: SPACING.PX_24 }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};


/** [Scene 9]
 * @narrative — 메이븐의 성장을 시간의 흐름(8년)에 따라 시각화하여 시스템의 거대해진 규모 강조
 * @layout — 화면 중앙을 가로지르는 타임라인 선, 좌측(과거: 도구)에서 우측(현재: 전체 시스템)으로 확장
 * @elements — '8년의 진화' (상단 라벨), '분석 도구' (시작점), '운영 시스템' (종착점), 타임라인(선)
 * @animation — 타임라인 선은 DrawLine으로 왼쪽에서 오른쪽으로 확장, 각 지점의 텍스트는 순차적 등장
 * @tokens — COLORS.BG_BASE, COLORS.SECONDARY_MID, COLORS.TEXT_MAIN, FONTS.SIZE_LG, SPACING.PX_80, ANIMATION.DUR_XL
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = interpolate(frame, [10, 60], [0, 1000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const text1Opacity = interpolate(frame, [20, 40], [0, 1]);
  const text2Opacity = interpolate(frame, [70, 90], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: SPACING.PX_80 }}>
        <div style={{ color: COLORS.SECONDARY_DARK, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, marginBottom: SPACING.PX_96 }}>
          8년간의 비약적 성장
        </div>
        
        <div style={{ position: 'relative', width: 1000, height: 4 }}>
          <DrawLine color={COLORS.SECONDARY_MID} strokeWidth={4} durationInFrames={60} startFrame={10} />
          
          {/* Milestone 1 */}
          <div style={{ position: 'absolute', left: 0, top: 20, opacity: text1Opacity, textAlign: 'left' }}>
            <div style={{ color: COLORS.TEXT_SUB, fontFamily: FONTS.MONO, fontSize: 24 }}>2017</div>
            <div style={{ color: COLORS.TEXT_MAIN, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>드론 분석 도구</div>
          </div>

          {/* Milestone 2 */}
          <div style={{ position: 'absolute', right: 0, top: 20, opacity: text2Opacity, textAlign: 'right' }}>
            <div style={{ color: COLORS.TEXT_SUB, fontFamily: FONTS.MONO, fontSize: 24 }}>2025</div>
            <div style={{ color: COLORS.TEXT_MAIN, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>전쟁 전체 운영 시스템</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 10]
 * @narrative — 이 거대한 시스템의 '심장' 역할을 하는 것이 클로드(Claude)임을 밝히며 결론 도달
 * @layout — 화면 중앙에 클로드 로고와 시스템 엔진을 형상화한 기하학적 구조 배치
 * @elements — 'Claude' (핵심 텍스트), '핵심 엔진' (보조 텍스트), 동심원 형태의 장식 요소
 * @animation — 동심원은 Wobble과 함께 은은하게 박동(Pulse)하며 작동 중인 AI 시스템 표현
 * @tokens — COLORS.BG_BASE, COLORS.PRIMARY_BOLD, COLORS.TEXT_MAIN, FONTS.SIZE_2XL, SPACING.PX_40, ANIMATION.SPRING_GENTLE
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse = Math.sin(frame / 15) * 0.05 + 1;
  const claudeOpacity = interpolate(frame, [0, 30], [0, 1]);
  const ringScale = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ position: 'relative', width: 600, height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* AI Pulse Rings */}
          {[1, 1.4, 1.8].map((s, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 300 * s,
                height: 300 * s,
                border: `2px solid ${COLORS.PRIMARY_SOFT}`,
                borderRadius: '50%',
                opacity: (0.3 / s) * (frame > 20 ? 1 : 0),
                transform: `scale(${ringScale * pulse})`,
              }}
            >
              <Wobble>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: `1px solid ${COLORS.PRIMARY_MID}` }} />
              </Wobble>
            </div>
          ))}

          {/* Central Content */}
          <div style={{ opacity: claudeOpacity, textAlign: 'center', zIndex: Z.CONTENT }}>
            <div style={{ color: COLORS.PRIMARY_BOLD, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_3XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, letterSpacing: 4 }}>
              CLAUDE
            </div>
            <div style={{ color: COLORS.TEXT_MAIN, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, marginTop: SPACING.PX_16 }}>
              시스템의 핵심 두뇌
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


export const CUTS = {
  SCENE1: 0,
  SCENE2: 140,
  SCENE3: 266,
  SCENE4: 366,
  SCENE5: 585,
  SCENE6: 749,
  SCENE7: 807,
  SCENE8: 994,
  SCENE9: 1260,
  SCENE10: 1478,
  END: 1634
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={CUTS.SCENE1} durationInFrames={CUTS.SCENE2 - CUTS.SCENE1}>
        <Scene1 />
      </Sequence>
      <Sequence from={CUTS.SCENE2} durationInFrames={CUTS.SCENE3 - CUTS.SCENE2}>
        <Scene2 />
      </Sequence>
      <Sequence from={CUTS.SCENE3} durationInFrames={CUTS.SCENE4 - CUTS.SCENE3}>
        <Scene3 />
      </Sequence>
      <Sequence from={CUTS.SCENE4} durationInFrames={CUTS.SCENE5 - CUTS.SCENE4}>
        <Scene4 />
      </Sequence>
      <Sequence from={CUTS.SCENE5} durationInFrames={CUTS.SCENE6 - CUTS.SCENE5}>
        <Scene5 />
      </Sequence>
      <Sequence from={CUTS.SCENE6} durationInFrames={CUTS.SCENE7 - CUTS.SCENE6}>
        <Scene6 />
      </Sequence>
      <Sequence from={CUTS.SCENE7} durationInFrames={CUTS.SCENE8 - CUTS.SCENE7}>
        <Scene7 />
      </Sequence>
      <Sequence from={CUTS.SCENE8} durationInFrames={CUTS.SCENE9 - CUTS.SCENE8}>
        <Scene8 />
      </Sequence>
      <Sequence from={CUTS.SCENE9} durationInFrames={CUTS.SCENE10 - CUTS.SCENE9}>
        <Scene9 />
      </Sequence>
      <Sequence from={CUTS.SCENE10} durationInFrames={CUTS.END - CUTS.SCENE10}>
        <Scene10 />
      </Sequence>
    </AbsoluteFill>
  );
};
