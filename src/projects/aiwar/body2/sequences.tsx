import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Easing, interpolateColors } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { Wobble } from '../../../shared-components/Wobble';
import { DrawLine } from '../../../shared-components/DrawLine';
import { PaperTexture } from '../../../shared-components/PaperTexture';
import { Body2ScanLine } from '../components/svg/body2_ScanLine';
import { Body2DataFlow } from '../components/svg/body2_DataFlow';
import { Body2DataIcons } from '../components/svg/body2_DataIcons';
import { Body2Crosshair } from '../components/svg/body2_Crosshair';
import { Body2SignalIcon } from '../components/svg/body2_SignalIcon';
import { Body2SocialIcon } from '../components/svg/body2_SocialIcon';
import { Body2ReportCard } from '../components/ui/body2_ReportCard';
import { Body2Waveform } from '../components/svg/body2_Waveform';
import { Body2AnalystIcon } from '../components/svg/body2_AnalystIcon';
import { Body2AIIcon } from '../components/svg/body2_AIIcon';
import { Body2AnalystGroup } from '../components/svg/body2_AnalystGroup';
import { Body1_CivilianVehicle } from '../components/svg/body1_CivilianVehicle';

/** [Scene 1]
 * @narrative — 클로드의 분석 탐색이 시작됨을 알리는 중앙 타이포그래피 등장
 * @layout — 중앙 정렬(Flex), 텍스트 주변을 감싸는 스캔 라인과 데이터 포인트 배치
 * @elements — "Claude" 텍스트, 분석용 스캔 라인(SVG), 주변 데이터 점(Dot)들
 * @animation — 텍스트 Spring 등장, 스캔 라인의 좌우 스캐닝(Interpolate), 데이터 포인트 랜덤 페이드인
 * @tokens — COLORS.TEXT_MAIN, COLORS.PRIMARY, FONTS.SIZE_4XL, SPACING.PX_32
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const textSpring = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  const scanPos = interpolate(
    frame % 60,
    [0, 30, 60],
    [width * 0.3, width * 0.7, width * 0.3],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: 'center', alignItems: 'center' }}>
      <PaperTexture opacity={0.4} />

      {/* Scan Line */}
      <div style={{ position: 'absolute', left: scanPos, top: height / 2 - 200 }}>
        <Body2ScanLine height={400} />
      </div>

      <div style={{ transform: `scale(${textSpring})`, textAlign: 'center' }}>
        <h1 style={{
          fontFamily: FONTS.DISPLAY,
          fontSize: FONTS.SIZE_4XL,
          fontWeight: FONTS.WEIGHT_BOLD,
          color: COLORS.TEXT_MAIN,
          margin: 0,
          letterSpacing: FONTS.TRACKING_WIDER,
        }}>
          CLAUDE
        </h1>
        <div style={{
          width: 200,
          height: 4,
          backgroundColor: COLORS.PRIMARY,
          margin: `${SPACING.PX_16}px auto 0`,
          borderRadius: SPACING.RADIUS_PILL,
        }} />
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 2]
 * @narrative — 메이븐(데이터 수집)과 클로드(데이터 분석)의 협업 과정을 좌우 레이아웃으로 시각화
 * @layout — 좌측(Maven), 우측(Claude) 분할(Flex row), 중앙 연결 데이터 흐름 구조
 * @elements — "MAVEN" 텍스트, "CLAUDE" 텍스트, 두 영역을 잇는 화살표와 데이터 입자(Flow SVG)
 * @animation — 좌측에서 우측으로 흐르는 입자 애니메이션, 영역 전환 페이드 효과
 * @tokens — COLORS.BG_MUTED, COLORS.SECONDARY, COLORS.PRIMARY_DARK, FONTS.SIZE_2XL
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const mavenSpring = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const claudeSpring = spring({
    frame: frame - 20,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const flowProgress = frame / 60;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: SPACING.PX_96 }}>
      <PaperTexture opacity={0.3} />
      
      {/* Maven Section */}
      <div style={{ flex: 1, textAlign: 'center', transform: `translateY(${interpolate(mavenSpring, [0, 1], [20, 0])}px)`, opacity: mavenSpring }}>
        <div style={{
          backgroundColor: COLORS.BG_SURFACE,
          padding: SPACING.PX_48,
          borderRadius: SPACING.RADIUS_LG,
          border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
          boxShadow: EFFECTS.SHADOW_SM,
        }}>
          <p style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_MD,
            color: COLORS.TEXT_SUB,
            marginTop: SPACING.PX_8,
          }}>
            데이터 수집
          </p>
        </div>
      </div>

      {/* Connection / Flow */}
      <div style={{ width: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Body2DataFlow width={300} progress={flowProgress} />
      </div>

      {/* Claude Section */}
      <div style={{ flex: 1, textAlign: 'center', transform: `translateY(${interpolate(claudeSpring, [0, 1], [20, 0])}px)`, opacity: claudeSpring }}>
        <div style={{
          backgroundColor: COLORS.PRIMARY_LIGHT,
          padding: SPACING.PX_48,
          borderRadius: SPACING.RADIUS_LG,
          border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.PRIMARY_SOFT}`,
          boxShadow: EFFECTS.SHADOW_MD,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none" viewBox="0 0 400 400">
              <path fill="#D97757" d="m124.011 241.251 49.164-27.585.826-2.396-.826-1.333h-2.396l-8.217-.506-28.09-.759-24.363-1.012-23.603-1.266-5.938-1.265L75 197.79l.574-3.661 4.994-3.358 7.153.625 15.808 1.079 23.722 1.637 17.208 1.012 25.493 2.649h4.049l.574-1.637-1.384-1.012-1.079-1.012-24.548-16.635-26.573-17.58-13.919-10.123-7.524-5.129-3.796-4.808-1.637-10.494 6.833-7.525 9.178.624 2.345.625 9.296 7.153 19.858 15.37 25.931 19.098 3.796 3.155 1.519-1.08.185-.759-1.704-2.851-14.104-25.493-15.049-25.931-6.698-10.747-1.772-6.445c-.624-2.649-1.08-4.876-1.08-7.592l7.778-10.561L144.729 75l10.376 1.383 4.37 3.797 6.445 14.745 10.443 23.215 16.197 31.566 4.741 9.364 2.53 8.672.945 2.649h1.637v-1.519l1.332-17.782 2.464-21.832 2.395-28.091.827-7.912 3.914-9.482 7.778-5.129 6.074 2.902 4.994 7.153-.692 4.623-2.969 19.301-5.821 30.234-3.796 20.245h2.21l2.531-2.53 10.241-13.599 17.208-21.511 7.593-8.537 8.857-9.431 5.686-4.488h10.747l7.912 11.76-3.543 12.147-11.067 14.037-9.178 11.895-13.16 17.714-8.216 14.172.759 1.131 1.957-.186 29.727-6.327 16.062-2.901 19.166-3.29 8.672 4.049.944 4.116-3.408 8.419-20.498 5.062-24.042 4.808-35.801 8.469-.439.321.506.624 16.13 1.519 6.9.371h16.888l31.448 2.345 8.217 5.433 4.926 6.647-.827 5.061-12.653 6.445-17.074-4.049-39.85-9.482-13.666-3.408h-1.889v1.131l11.388 11.135 20.87 18.845 26.133 24.295 1.333 6.006-3.357 4.741-3.543-.506-22.962-17.277-8.858-7.777-20.06-16.888H238.5v1.771l4.623 6.765 24.413 36.696 1.265 11.253-1.771 3.661-6.327 2.21-6.951-1.265-14.29-20.06-14.745-22.591-11.895-20.246-1.451.827-7.018 75.601-3.29 3.863-7.592 2.902-6.327-4.808-3.357-7.778 3.357-15.37 4.049-20.06 3.29-15.943 2.969-19.807 1.772-6.58-.118-.439-1.451.186-14.931 20.498-22.709 30.689-17.968 19.234-4.302 1.704-7.458-3.864.692-6.9 4.167-6.141 24.869-31.634 14.999-19.605 9.684-11.32-.068-1.637h-.573l-66.052 42.887-11.759 1.519-5.062-4.741.625-7.778 2.395-2.531 19.858-13.665-.068.067z" />
            </svg>
          <p style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_MD,
            color: COLORS.TEXT_BODY,
            marginTop: SPACING.PX_8,
          }}>
            데이터 분석
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 3]
 * @narrative — 160개 이상의 방대한 정보 채널 유입을 시각화
 * @layout — 중앙 강조(160+), 주변 정보 소스 아이콘(Grid/Circular 배치)
 * @elements — "160+" 텍스트, 위성/드론/레이더 아이콘(SVG), 연결선(DrawLine)
 * @animation — 중앙 텍스트 스케일업, 주변 아이콘들의 순차 등장(Stagger) 및 중앙 유입 애니메이션
 * @tokens — COLORS.TEXT_MAIN, COLORS.SECONDARY_BOLD, FONTS.SIZE_3XL, SPACING.PX_48
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const countSpring = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  const icons = [
    { type: 'satellite' as const, x: -300, y: -200 },
    { type: 'drone' as const, x: 300, y: -200 },
    { type: 'radar' as const, x: -300, y: 200 },
    { type: 'satellite' as const, x: 300, y: 200 },
    { type: 'drone' as const, x: 0, y: -300 },
    { type: 'radar' as const, x: 0, y: 300 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: 'center', alignItems: 'center' }}>
      <PaperTexture opacity={0.3} />
      
      {/* Central Number */}
      <div style={{ transform: `scale(${countSpring})`, textAlign: 'center', zIndex: Z.CONTENT }}>
        <Wobble mode="jumpy" intensity={5}>
        <h1 style={{
          fontFamily: FONTS.DISPLAY,
          fontSize: FONTS.SIZE_4XL,
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          color: COLORS.TEXT_MAIN,
          margin: 0,
        }}>
          160+
        </h1>
        </Wobble>
        <p style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_LG,
          color: COLORS.SECONDARY_BOLD,
          marginTop: -SPACING.PX_8,
        }}>
          정보 채널 실시간 유입
        </p>
      </div>

      {/* Surround Icons */}
      {icons.map((icon, i) => {
        const iconSpring = spring({
          frame: frame - (i * 10),
          fps,
          config: ANIMATION.SPRING_GENTLE,
        });
        
        const moveIn = interpolate(iconSpring, [0, 1], [100, 0]);
        const finalX = icon.x > 0 ? icon.x - moveIn : icon.x + moveIn;
        const finalY = icon.y > 0 ? icon.y - moveIn : icon.y + moveIn;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              transform: `translate(${finalX}px, ${finalY}px) scale(${iconSpring})`,
              opacity: iconSpring,
            }}
          >
            <Body2DataIcons type={icon.type} size={80} />
            <div style={{ position: 'absolute', top: 40, left: 40, width: 200, height: 1, backgroundColor: COLORS.STROKE_SUBTLE, transformOrigin: 'left', transform: `rotate(${Math.atan2(-icon.y, -icon.x) * 180 / Math.PI}deg) scaleX(${iconSpring})`, opacity: 0.3 }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** [Scene 4]
 * @narrative — 드론 시점의 십자선을 활용해 수상한 차량 발견 연출
 * @layout — 상단 텍스트, 중앙 십자선(Crosshair) 및 차량 타겟팅 영역 배치
 * @elements — "수상한 차량 포착" 텍스트, 드론 시점 십자선(SVG), 타겟 박스(Wobble)
 * @animation — 십자선의 유기적 이동(Interpolate), 차량 발견 시 빨간색 타겟 고정(Lock-on)
 * @tokens — COLORS.STATE_ERROR_FG, COLORS.STROKE_INK, FONTS.SIZE_XL, SPACING.PX_32
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Search movement
  const searchX = interpolate(
    frame,
    [0, 40, 80, 120],
    [width * 0.4, width * 0.6, width * 0.45, width * 0.5],
    { easing: Easing.bezier(0.4, 0, 0.2, 1) }
  );
  const searchY = interpolate(
    frame,
    [0, 60, 120],
    [height * 0.4, height * 0.55, height * 0.45],
    { easing: Easing.bezier(0.4, 0, 0.2, 1) }
  );

  const isLocked = frame > 80;
  const lockSpring = spring({
    frame: frame - 80,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_MUTED }}>
      <PaperTexture opacity={0.4} />
      
      {/* Header */}
      <div style={{ position: 'absolute', top: SPACING.PX_80, left: SPACING.PX_80 }}>
        <h2 style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_XL,
          fontWeight: FONTS.WEIGHT_BOLD,
          color: COLORS.TEXT_MAIN,
          margin: 0,
        }}>
          실시간 감시 모드
        </h2>
        <div style={{
          width: 300,
          height: 2,
          backgroundColor: COLORS.STROKE_INK,
          marginTop: SPACING.PX_8,
        }} />
      </div>

      {/* Target (Vehicle surrogate) */}
      <div style={{
        position: 'absolute',
        left: width * 0.5 - 140,
        top: height * 0.45 - 100,
        width: 120,
        height: 80,
      }}>
        <Wobble>
             <Body1_CivilianVehicle size={300} color={isLocked ? COLORS.BG_DARKEST : COLORS.STROKE_DEFAULT} />
        </Wobble>
      </div>

      {/* Crosshair */}
      <div style={{
        position: 'absolute',
        left: searchX - 100,
        top: searchY - 100,
        transform: isLocked ? `scale(${interpolate(lockSpring, [0, 1], [1.2, 1])})` : 'none',
      }}>
        <Body2Crosshair locked={isLocked} size={200} />
      </div>

      {/* Info Panel */}
      <div style={{ position: 'absolute', bottom: 200, right: SPACING.PX_80, textAlign: 'right' }}>
        <p style={{ fontFamily: FONTS.MONO, fontSize: 32, color: isLocked ? COLORS.STATE_ERROR_FG : COLORS.TEXT_SUB }}>
          위도: 34.0522° N, 경도: 118.2437° W
        </p>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 5]
 * @narrative — 클로드가 차량 이동 경로 → 통신 신호 일치 → SNS 게시물 발견 → 최종 표적 후보 등록까지의 교차 분석 과정을 4단계로 시각화
 * @layout — 화면 중앙에 지도 느낌의 "분석 보드". 단계마다 증거 카드가 하나씩 추가되며 최종 판정
 * @elements — 이동 경로(점선), 통신 아이콘(SVG), SNS 아이콘(SVG), 표적 스탬프
 * @animation — 각 단계가 순차적으로 페이드인, 마지막 단계에서 전체 보드가 붉게 변하며 "표적 후보" 팝업
 * @tokens — COLORS.BG_BASE, COLORS.STATE_ERROR_FG, COLORS.PRIMARY, FONTS.SIZE_2XL, SPACING.PX_48
 *
 * 타임라인 (로컬 프레임 기준, 총 421f):
 * Phase 1 (0~86f): 차량 이동 경로 추적
 * Phase 2 (86~195f): 통신 신호 겹침 발견
 * Phase 3 (195~340f): 소셜미디어 게시물 발견
 * Phase 4 (340~421f): 종합 판단 → 표적 후보 등록
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase Opacities ---
  const phase1Opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const phase2Opacity = interpolate(frame, [86, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phase3Opacity = interpolate(frame, [195, 220], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phase4Active = frame >= 340;
  const phase4Spring = spring({ frame: frame - 340, fps, config: ANIMATION.SPRING_BOUNCY });

  // --- Route progress ---
  const routeProgress = interpolate(frame, [10, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />

      {/* Analysis Board Container */}
      <div style={{
        position: 'absolute',
        top: 80,
        left: 120,
        right: 120,
        bottom: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.PX_32,
      }}>

        {/* Board Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: SPACING.PX_16,
          borderBottom: `4px solid ${COLORS.STROKE_DEFAULT}`,
        }}>
          <div style={{
            fontFamily: FONTS.MONO,
            fontSize: 56,
            color: COLORS.TEXT_SUB,
            fontWeight: 'bold',
            letterSpacing: 4,
          }}>
            교차분석
          </div>
          <div style={{
            fontFamily: FONTS.MONO,
            fontSize: 28,
            color: phase4Active ? COLORS.STATE_ERROR_FG : COLORS.TEXT_DISABLED,
            fontWeight: phase4Active ? 'bold' : 'normal',
          }}>
            {phase4Active ? '● 확인' : '○ 분석중...'}
          </div>
        </div>

        {/* Evidence Cards Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: SPACING.PX_32,
          flex: 1,
        }}>

          {/* Card 1: Route Trail */}
          <div style={{
            position: 'relative',
            flex: '1 1 45%',
            opacity: phase1Opacity,
            backgroundColor: COLORS.BG_SURFACE,
            border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
            borderRadius: SPACING.RADIUS_LG,
            padding: SPACING.PX_32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ position: 'absolute', top: SPACING.PX_32, left: SPACING.PX_32, fontFamily: FONTS.MONO, fontSize: 24, color: COLORS.PRIMARY, fontWeight: 'bold', letterSpacing: 2 }}>
              01 경로 분석
            </div>
            {/* Route Visualization */}
            <svg width="100%" height={200} viewBox="0 0 600 200" fill="none" style={{ marginTop: 40 }}>
              <path
                d="M 30,160 Q 120,40 200,100 T 380,60 Q 450,110 570,30"
                stroke={COLORS.STATE_ERROR_FG}
                strokeWidth={6}
                strokeDasharray="16 12"
                strokeDashoffset={600 - routeProgress * 600}
                strokeLinecap="round"
                opacity={0.8}
              />
              {/* Route points */}
              {[
                { cx: 30, cy: 160 },
                { cx: 200, cy: 100 },
                { cx: 380, cy: 60 },
                { cx: 570, cy: 30 },
              ].map((pt, i) => {
                const ptOpacity = interpolate(frame, [20 + i * 15, 35 + i * 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                return (
                  <circle key={i} cx={pt.cx} cy={pt.cy} r={12} fill={COLORS.STATE_ERROR_FG} opacity={ptOpacity} />
                );
              })}
            </svg>
          </div>

          {/* Card 2: Signal Match */}
          <div style={{
            position: 'relative',
            flex: '1 1 45%',
            opacity: phase2Opacity,
            backgroundColor: COLORS.BG_SURFACE,
            border: `${SPACING.BORDER_NORMAL}px solid ${phase2Opacity > 0.5 ? COLORS.STATE_WARN_FG : COLORS.STROKE_DEFAULT}`,
            borderRadius: SPACING.RADIUS_LG,
            padding: SPACING.PX_32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SPACING.PX_24,
          }}>
            <div style={{ position: 'absolute', top: SPACING.PX_32, left: SPACING.PX_32, fontFamily: FONTS.MONO, fontSize: 24, color: COLORS.STATE_WARN_FG, fontWeight: 'bold', letterSpacing: 2 }}>
              02 통신 신호
            </div>
            <Wobble interval={4}>
              <Body2SignalIcon size={140} />
            </Wobble>
            <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 36, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>
              위치 일치
            </div>
          </div>

          {/* Card 3: Social Media */}
          <div style={{
            position: 'relative',
            flex: '1 1 45%',
            opacity: phase3Opacity,
            backgroundColor: COLORS.BG_SURFACE,
            border: `${SPACING.BORDER_NORMAL}px solid ${phase3Opacity > 0.5 ? COLORS.SECONDARY : COLORS.STROKE_DEFAULT}`,
            borderRadius: SPACING.RADIUS_LG,
            padding: SPACING.PX_32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SPACING.PX_24,
          }}>
            <div style={{ position: 'absolute', top: SPACING.PX_32, left: SPACING.PX_32, fontFamily: FONTS.MONO, fontSize: 24, color: COLORS.SECONDARY_DARK, fontWeight: 'bold', letterSpacing: 2 }}>
              03 소셜 매칭
            </div>
            <Wobble interval={5}>
              <Body2SocialIcon size={140} />
            </Wobble>
            <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 36, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>
              지오태그 겹침
            </div>
          </div>

          {/* Card 4: Final Verdict */}
          <div style={{
            position: 'relative',
            flex: '1 1 45%',
            opacity: phase4Active ? 1 : 0.15,
            backgroundColor: phase4Active ? COLORS.STATE_ERROR_BG : COLORS.BG_SURFACE,
            border: `6px solid ${phase4Active ? COLORS.STATE_ERROR_FG : COLORS.STROKE_SUBTLE}`,
            borderRadius: SPACING.RADIUS_LG,
            padding: SPACING.PX_32,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${phase4Active ? phase4Spring : 1})`,
          }}>
            <div style={{ position: 'absolute', top: SPACING.PX_32, left: SPACING.PX_32, fontFamily: FONTS.MONO, fontSize: 24, color: COLORS.STATE_ERROR_FG, fontWeight: 'bold', letterSpacing: 2 }}>
              04 종합 판단
            </div>
            <div style={{
              fontFamily: FONTS.PRIMARY,
              fontSize: 64,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              color: COLORS.STATE_ERROR_FG,
              textAlign: 'center',
              textShadow: `0 0 20px ${COLORS.STATE_ERROR_BG}`,
            }}>
              표적 확정
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 6]
 * @narrative — 좌표, 무기, 법적 문서가 포함된 자동화된 전술 리스트 생성
 * @layout — 화면 중앙에 거대한 보고서 문서 배치
 * @elements — "전술 타겟 브리핑 문서", GPS 좌표, 추천 무기, 법적 정당화 문서(스탬프)
 * @animation — 대본 타이밍에 맞춰 탁탁 등장하다가, 마지막 법적 문서에서 쾅! 스탬프가 찍히는 연출
 * @tokens — COLORS.BG_SURFACE, COLORS.STROKE_DEFAULT, FONTS.SIZE_LG, SPACING.PX_48
 *
 * 타임라인 (로컬 프레임 기준, 총 257f):
 * 0~87f: 베이스 리스트 틀 생성 ("리스트를 만들어요")
 * 87f~: GPS 좌표 ("GPS 좌표"), 무기 추천(95f) ("추천 무기")
 * 134f~: 법적 정당화 문서 ("심지어 법적 정당화 문서까지 자동으로요")
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Base UI
  const baseOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  
  // Phase 2: GPS & Weapon (Frame 87)
  const isPhase2 = frame >= 87;
  const gpsItem = spring({ frame: frame - 87, fps, config: ANIMATION.SPRING_SNAPPY });
  const weaponItem = spring({ frame: frame - 95, fps, config: ANIMATION.SPRING_SNAPPY });

  // Phase 3: Legal (Frame 134)
  const isPhase3 = frame >= 134;
  const legalBox = spring({ frame: frame - 134, fps, config: ANIMATION.SPRING_GENTLE });
  const stampSpring = spring({ frame: frame - 145, fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, padding: SPACING.PX_96, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <PaperTexture />
      
      {/* Container Document */}
      <div style={{
        width: 1200,
        height: 1000,
        backgroundColor: COLORS.BG_SURFACE,
        border: `4px solid ${COLORS.STROKE_DEFAULT}`,
        borderRadius: SPACING.RADIUS_MD,
        boxShadow: EFFECTS.SHADOW_LG,
        opacity: baseOp,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: SPACING.PX_48,
          borderBottom: `4px solid ${COLORS.STROKE_DEFAULT}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.BG_MUTED,
        }}>
          <div>
            <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 48, fontWeight: 'bold', color: COLORS.TEXT_MAIN, marginTop: 12 }}>자동 전술 타겟 브리핑</div>
          </div>
          <div style={{ fontFamily: FONTS.MONO, fontSize: 32, color: COLORS.PRIMARY, fontWeight: 'bold' }}>
            ● 클로드 생성
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: SPACING.PX_64, display: 'flex', flexDirection: 'column', gap: SPACING.PX_48, flex: 1 }}>
          
          {/* GPS Info */}
          <div style={{ 
            opacity: gpsItem, 
            transform: `translateX(${interpolate(gpsItem, [0, 1], [-80, 0])}px)`,
            display: 'flex', borderBottom: `2px solid ${COLORS.STROKE_SUBTLE}`, paddingBottom: 32, alignItems: 'center'
          }}>
            <div style={{ width: 300, fontFamily: FONTS.MONO, fontSize: 32, color: COLORS.TEXT_SUB, fontWeight: 'bold' }}>01 GPS 좌표</div>
            <div style={{ fontFamily: FONTS.MONO, fontSize: 40, fontWeight: 'bold', color: COLORS.TEXT_MAIN }}>위도 34.0522°, 경도 118.2437°</div>
          </div>

          {/* Weapon Info */}
          <div style={{ 
            opacity: weaponItem, 
            transform: `translateX(${interpolate(weaponItem, [0, 1], [-80, 0])}px)`,
            display: 'flex', borderBottom: `2px solid ${COLORS.STROKE_SUBTLE}`, paddingBottom: 32, alignItems: 'center'
          }}>
            <div style={{ width: 300, fontFamily: FONTS.MONO, fontSize: 32, color: COLORS.TEXT_SUB, fontWeight: 'bold' }}>02 추천 무기</div>
            <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 44, fontWeight: 'bold', color: COLORS.SECONDARY_DARK }}>MQ-9</div>
          </div>

          {/* Legal Info */}
          <div style={{ 
            opacity: legalBox, 
            transform: `scale(${interpolate(legalBox, [0, 1], [0.95, 1])})`,
            marginTop: 'auto',
            padding: SPACING.PX_40,
            backgroundColor: COLORS.BG_MUTED,
            border: `4px dashed ${COLORS.STROKE_DEFAULT}`,
            borderRadius: SPACING.RADIUS_MD,
            position: 'relative'
          }}>
            <div style={{ fontFamily: FONTS.MONO, fontSize: 24, color: COLORS.TEXT_SUB, marginBottom: 20, fontWeight: 'bold' }}>03 // 법적 정당화 문서 자동 첨부</div>
            <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 32, color: COLORS.TEXT_BODY, lineHeight: 1.6 }}>
              무력분쟁법(LOAC) 제51조 자위권 교전수칙(ROE) 항목 1.2에 의거하여 즉각적인 타격이 법적으로 정당화됨을 검증 완료함.
            </div>

            {/* Stamp */}
            {isPhase3 && (
              <div style={{
                position: 'absolute',
                right: -20,
                bottom: -20,
                fontFamily: FONTS.MONO,
                fontSize: 90,
                fontWeight: 900,
                color: COLORS.STATE_ERROR_FG,
                border: `10px solid ${COLORS.STATE_ERROR_FG}`,
                padding: '10px 40px',
                transform: `scale(${stampSpring}) rotate(-12deg)`,
                opacity: stampSpring,
                borderRadius: 16,
                textShadow: `0 0 20px ${COLORS.STATE_ERROR_BG}`,
                boxShadow: `0 0 30px ${COLORS.STATE_ERROR_BG} inset`,
                backgroundColor: 'rgba(255,255,255,0.8)',
              }}>
                승인
              </div>
            )}
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 7]
 * @narrative — 분석관의 음성 요청에 반응하는 전술 브리핑 생성 인터페이스
 * @layout — 중앙 하단 음성 파형(Waveform), 중앙 전술 브리핑 텍스트 영역 배치
 * @elements — 음성 파형(SVG), "전술 브리핑 생성..." 상태 텍스트, 브리핑 카드
 * @animation — 파형의 유기적 움직임, 텍스트의 정교한 타이핑 효과 및 카드 등장
 * @tokens — COLORS.PRIMARY, COLORS.TEXT_MAIN, FONTS.SIZE_LG, SPACING.PX_32
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const typingProgress = Math.min(1, frame / 150);
  const fullText = "대상: 수상한 차량 (ID: #0415)\n위협 수준: 고위험\n추천 대응: 전술적 저지 및 정밀 타격\n법적 근거: 제51조 자위권 행사 기준 충족";
  const displayedText = fullText.slice(0, Math.floor(typingProgress * fullText.length));

  const waveOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, padding: SPACING.PX_96 }}>
      <PaperTexture opacity={0.3} />
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.PX_16 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: COLORS.PRIMARY, animation: 'pulse 1.5s infinite' }} />
        <h2 style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_XL, color: COLORS.TEXT_MAIN, margin: 0 }}>
          분석관 음성 요청 처리 중...
        </h2>
      </div>

      {/* Briefing Box */}
      <div style={{
        marginTop: SPACING.PX_64,
        backgroundColor: COLORS.BG_SURFACE,
        border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.PRIMARY_SOFT}`,
        borderRadius: SPACING.RADIUS_LG,
        padding: SPACING.PX_48,
        minHeight: 400,
        boxShadow: EFFECTS.SHADOW_MD,
      }}>
        <pre style={{
          fontFamily: FONTS.MONO,
          fontSize: 32,
          color: COLORS.TEXT_MAIN,
          whiteSpace: 'pre-wrap',
          lineHeight: 1.8,
          margin: 0,
        }}>
          {displayedText}
          {frame % 30 < 15 && <span style={{ borderLeft: `4px solid ${COLORS.PRIMARY}`, marginLeft: 4 }}>&nbsp;</span>}
        </pre>
      </div>

      {/* Waveform at bottom */}
      <div style={{ position: 'absolute', bottom: 200, left: 0, width: '100%', display: 'flex', justifyContent: 'center', opacity: waveOpacity }}>
        <Body2Waveform size={600} />
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </AbsoluteFill>
  );
};

/** [Scene 8]
 * @narrative — AI의 분석 지원 후 인간이 최종 결정을 내리는 프로세스 강조
 * @layout — 좌측 AI 영역, 우측 인간(분석관) 영역, 중앙 승인 흐름 구조
 * @elements — AI 아이콘(SVG), 인간 아이콘(SVG), "최종 결정" 버튼/텍스트
 * @animation — AI에서 인간으로의 데이터 전달, 인간 아이콘 주변의 승인 대기 효과
 * @tokens — COLORS.SECONDARY_DARK, COLORS.CHAR_STROKE, FONTS.SIZE_XL, SPACING.PX_48
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const aiSpring = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const humanSpring = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_GENTLE });
  
  const flowProgress = interpolate(frame, [60, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const isPending = frame > 130;
  const decisionSpring = spring({ frame: frame - 130, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: SPACING.PX_96, gap: 40 }}>
      <PaperTexture opacity={0.3} />

      {/* AI Side */}
      <div style={{ 
        width: 400, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        opacity: aiSpring, 
        transform: `scale(${aiSpring})` 
      }}>
        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Body2AIIcon size={180} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONTS.DISPLAY, fontSize: 56, color: COLORS.PRIMARY_DARK, fontWeight: 'bold', marginTop: SPACING.PX_16 }}>AI 시스템</p>
          <p style={{ fontFamily: FONTS.PRIMARY, fontSize: 48, color: COLORS.TEXT_SUB, margin: 0 }}>분석 및 추천 제공</p>
        </div>
      </div>

      {/* Arrow / Flow */}
      <div style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200 }}>
        <div style={{
          width: '100%',
          height: 4,
          backgroundColor: COLORS.STROKE_DEFAULT,
          position: 'relative',
        }}>
           <div style={{
             position: 'absolute',
             left: 0,
             top: 0,
             height: '100%',
             width: `${flowProgress * 100}%`,
             backgroundColor: COLORS.PRIMARY,
           }} />
           <div style={{
             position: 'absolute',
             right: -10,
             top: -12,
             width: 0,
             height: 0,
             borderTop: '15px solid transparent',
             borderBottom: '15px solid transparent',
             borderLeft: `20px solid ${interpolateColors(flowProgress, [0.9, 1], [COLORS.STROKE_DEFAULT, COLORS.PRIMARY])}`,
           }} />
        </div>
      </div>

      {/* Human Side */}
      <div style={{ 
        width: 400, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        opacity: humanSpring, 
        transform: `scale(${humanSpring})` 
      }}>
        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Body2AnalystIcon size={180} />
          {isPending && (
             <div style={{
               position: 'absolute',
               top: -30,
               left: '50%',
               transform: `translateX(-50%) scale(${decisionSpring})`,
               backgroundColor: COLORS.STATE_WARN_BG,
               color: COLORS.STATE_WARN_FG,
               padding: `${SPACING.PX_8}px ${SPACING.PX_24}px`,
               borderRadius: SPACING.RADIUS_PILL,
               fontFamily: FONTS.DISPLAY,
               fontSize: 48,
               fontWeight: 'bold',
               whiteSpace: 'nowrap',
               border: `2px solid ${COLORS.STATE_WARN_FG}`,
               zIndex: 10,
             }}>
               최종 승인 대기 중
             </div>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONTS.DISPLAY, fontSize: 56, color: COLORS.TEXT_MAIN, fontWeight: 'bold', marginTop: SPACING.PX_16 }}>인간 분석관</p>
          <p style={{ fontFamily: FONTS.PRIMARY, fontSize: 48, color: COLORS.TEXT_SUB, margin: 0 }}>최종 결정 및 책임</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 9]
 * @narrative — AI 도입 전후의 분석 효율 100배 향상을 수치와 아이콘으로 비교
 * @layout — 좌측(2,000명 군집), 우측(20명 소수), 중앙 "100배 효율" 강조 레이아웃
 * @elements — 분석관 군집 아이콘(SVG), 소수 아이콘, "100x" 강조 텍스트, 비교 바 차트
 * @animation — 수많은 아이콘들의 페이드 아웃 후 정예 인원 등장, 수치 카운팅 효과
 * @tokens — COLORS.TEXT_MAIN, COLORS.PRIMARY_BOLD, FONTS.SIZE_3XL, SPACING.PX_48
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const count1 = interpolate(frame, [0, 80], [0, 2000], { extrapolateRight: 'clamp' });
  const opacity1 = interpolate(frame, [100, 130], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const count2 = interpolate(frame, [130, 180], [0, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity2 = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const isFinalPhase = frame >= 220;
  const finalSpring = spring({ frame: frame - 220, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: 'center', alignItems: 'center' }}>
      <PaperTexture opacity={0.3} />

      {/* Phase 1: 2,000 Analysts */}
      {frame < 130 && (
        <div style={{ 
          opacity: opacity1, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
           <Body2AnalystGroup count={400} size={600}/>
           <p style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_2XL, fontWeight: 'bold', color: COLORS.TEXT_MAIN, marginTop: SPACING.PX_32 }}>
             {Math.floor(count1).toLocaleString()}명 필요
           </p>
        </div>
      )}

      {/* Phase 2: 20 Analysts */}
      {frame >= 130 && (
        <div style={{ 
          opacity: opacity2, 
          textAlign: 'center', 
          position: 'absolute', 
          top: interpolate(finalSpring, [0, 1], [height / 2 - 200, height * 0.15]), 
          transform: `scale(${interpolate(finalSpring, [0, 1], [1, 0.8])})`,
        }}>
           <h3 style={{ fontFamily: FONTS.PRIMARY, fontSize: 32, color: COLORS.SECONDARY_DARK, marginBottom: SPACING.PX_16 }}>AI 도입 후</h3>
           <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              {Array.from({ length: Math.min(20, Math.floor(count2)) }).map((_, i) => (
                <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: COLORS.SECONDARY }} />
              ))}
           </div>
           <p style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_2XL, fontWeight: 'bold', color: COLORS.TEXT_MAIN }}>
             단 {Math.floor(count2)}명
           </p>
        </div>
      )}

      {/* Result: 100x Efficiency */}
      {isFinalPhase && (
        <div style={{ transform: `scale(${finalSpring})`, textAlign: 'center', marginTop: 200 }}>
          <div style={{
            backgroundColor: COLORS.PRIMARY_LIGHT,
            border: `4px solid ${COLORS.PRIMARY_BOLD}`,
            padding: `${SPACING.PX_48}px ${SPACING.PX_80}px`,
            borderRadius: SPACING.RADIUS_XL,
            boxShadow: EFFECTS.SHADOW_LG,
          }}>
            <h2 style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_4XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, color: COLORS.PRIMARY_BOLD, margin: 0 }}>
              100배
            </h2>
            <p style={{ fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_BOLD, color: COLORS.TEXT_MAIN, margin: 0 }}>
              효율성 향상
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

export const CUTS = {
  SCENE1: 0,
  SCENE2: 101,
  SCENE3: 262,
  SCENE4: 579,
  SCENE5: 700,
  SCENE6: 1180,
  SCENE7: 1437,
  SCENE8: 1716,
  SCENE9: 1912,
  END: 2250
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
      <Sequence from={CUTS.SCENE9} durationInFrames={CUTS.END - CUTS.SCENE9}>
        <Scene9 />
      </Sequence>
    </AbsoluteFill>
  );
};
