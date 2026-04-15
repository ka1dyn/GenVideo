import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { Wobble } from '../../../shared-components/Wobble';
import { DrawLine } from '../../../shared-components/DrawLine';
import { PaperTexture } from '../../../shared-components/PaperTexture';
import { IntroUnderline } from '../components/svg/intro_Underline';
import { IntroTargetGrid } from '../components/svg/intro_TargetGrid';
import { IntroClaudeSystem } from '../components/svg/intro_ClaudeSystem';
import { IntroWarningIcon } from '../components/svg/intro_WarningIcon';
import { IntroAiBoxes } from '../components/svg/intro_AiBoxes';


/** [Scene 1]
 * @narrative — 2026년 초 발생한 미국의 이란 공격 사실을 엄중하고 임팩트 있게 전달
 * @layout — 화면 중앙에 연도/시점(상단)과 핵심 사건(하단)을 배치한 미니멀 타이포그래피 레이아웃
 * @elements — 텍스트("2026년 초", "미국, 이란 공격"), 드로잉 요소(핵심 강조 언더라인)
 * @animation — 상단 텍스트 슬라이드 업, 메인 텍스트 스프링 등장, 언더라인 드로잉 애니메이션
 * @tokens — COLORS.TEXT_MAIN, COLORS.TEXT_SUB, COLORS.PRIMARY, FONTS.SIZE_LG, FONTS.SIZE_3XL, ANIMATION.SPRING_GENTLE
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const springConfig = ANIMATION.SPRING_GENTLE;
  
  const yearOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const yearY = interpolate(frame, [0, 15], [20, 0], { extrapolateRight: 'clamp' });
  
  const mainSpring = spring({ frame: frame - 10, fps, config: springConfig });
  const mainOpacity = interpolate(mainSpring, [0, 1], [0, 1]);
  const mainScale = interpolate(mainSpring, [0, 1], [0.95, 1]);
  
  const lineProgress = spring({ frame: frame - 25, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: 'center', alignItems: 'center' }}>
      <PaperTexture />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: SPACING.PX_16,
        marginBottom: 100 // 자막 영역 확보
      }}>
        <div style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_LG,
          color: COLORS.TEXT_SUB,
          opacity: yearOpacity,
          transform: `translateY(${yearY}px)`
        }}>
          2026년 초
        </div>
        
        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_3XL,
            fontWeight: FONTS.WEIGHT_BOLD,
            color: COLORS.TEXT_MAIN,
            opacity: mainOpacity,
            transform: `scale(${mainScale})`
          }}>
            미국, 이란 공격
          </div>
          
          <div style={{ 
            position: 'absolute', 
            bottom: -20, 
            left: 0, 
            right: 0, 
            display: 'flex', 
            justifyContent: 'center',
            opacity: mainOpacity
          }}>
            <Wobble>
              <div style={{ width: 600, overflow: 'hidden' }}>
                <div style={{ transform: `translateX(${(lineProgress - 1) * 100}%)` }}>
                  <IntroUnderline width={600} height={20} color={COLORS.PRIMARY} strokeWidth={6} />
                </div>
              </div>
            </Wobble>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 2]
 * @narrative — 24시간 내 1,000개 이상의 표적 타격이라는 압도적인 작전 규모를 데이터 중심으로 시각화
 * @layout — 좌측에 핵심 지표(24h, 1000+), 우측에 이를 뒷받침하는 그리드 형태의 타격 분포 드로잉 배치
 * @elements — 텍스트("24시간", "1,000+ 표적", "압도적 규모"), SVG(타격 지점 그리드 드로잉)
 * @animation — 지표 텍스트 순차적 등장, 그리드 도트들의 스태거(Stagger) 등장 및 강조 효과
 * @tokens — COLORS.TEXT_MAIN, COLORS.PRIMARY_BOLD, FONTS.SIZE_XL, FONTS.SIZE_4XL, SPACING.PX_48, ANIMATION.SPRING_SNAPPY
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const leftSpring = spring({ frame: frame - 10, fps, config: ANIMATION.SPRING_SNAPPY });
  const rightSpring = spring({ frame: frame - 30, fps, config: ANIMATION.SPRING_SNAPPY });
  
  const gridProgress = interpolate(frame, [30, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        padding: SPACING.PX_120,
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.PX_120 * 2
      }}>
        {/* Left Side: Stats */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: SPACING.PX_48,
          opacity: leftSpring,
          transform: `translateX(${interpolate(leftSpring, [0, 1], [-50, 0])}px)`
        }}>
          <div>
            <div style={{ fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_SUB }}>단 24시간 만에</div>
            <div style={{ 
              fontFamily: FONTS.PRIMARY, 
              fontSize: FONTS.SIZE_4XL, 
              fontWeight: FONTS.WEIGHT_EXTRABOLD, 
              color: COLORS.PRIMARY_BOLD,
              lineHeight: 1
            }}>
              1,000+
            </div>
            <div style={{ fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_XL, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>표적 타격</div>
          </div>
          
          <div style={{ 
            height: 2, 
            width: 200, 
            backgroundColor: COLORS.STROKE_DEFAULT,
            transform: `scaleX(${leftSpring})`,
            transformOrigin: 'left'
          }} />
          
          <div style={{ 
            fontFamily: FONTS.PRIMARY, 
            fontSize: FONTS.SIZE_MD, 
            color: COLORS.TEXT_BODY,
            lineHeight: 1.4
          }}>
            전례 없는<br/>압도적 작전 규모
          </div>
        </div>

        {/* Right Side: Visual Grid */}
        <div style={{ 
          opacity: rightSpring,
          transform: `scale(${interpolate(rightSpring, [0, 1], [0.8, 1])}) rotate(2deg)`
        }}>
          <Wobble>
            <div style={{ 
              padding: SPACING.PX_40, 
              backgroundColor: COLORS.BG_SURFACE, 
              borderRadius: SPACING.RADIUS_LG,
              boxShadow: EFFECTS.SHADOW_MD,
              border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_SUBTLE}`
            }}>
              <IntroTargetGrid progress={gridProgress} size={500} />
            </div>
          </Wobble>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3]
 * - 원본 텍스트: 역시나 이 작전의 중심에는 AI가 있었습니다. 그리고 그 AI 시스템 안에, 여러분이 매일 쓰는 클로드가 있었어요.
 * - 단어 등장 프레임 (Local): { "역시나": 0f, "이": 15f, "작전의": 20f, "중심에는": 35f, "AI가": 58f, "있었습니다.": 71f, "그리고": 101f, "그": 123f, "AI": 129f, "시스템": 134f, "안에,": 154f, "여러분이": 170f, "매일": 185f, "쓰는": 192f, "클로드가": 200f, "있었어요.": 214f }
 * - 타임라인: 259f 부터 시작 (총 235f 지속)
 * - [🔥 페르소나 리마인드]: Vercel 스타일의 미니멀한 구조 위에, 펜 스케치 질감을 '포인트'로만 제한적으로 얹습니다.
 * - 비주얼 컨셉: {FILL_S3_VISUAL: 정보량을 최소화하세요. 예술적인 그림 기획보다 텍스트(타이포그래피), 여백, 점, 선, 간단한 도형을 활용한 구조적 배치를 1순위로 기획합니다. }
 * - SVG 컴포넌트: {FILL_S3_SVG: SVG 기획 시 내부에 텍스트(라벨, 이름 등)를 절대 포함하지 마세요. SVG는 오직 순수 그림 용도로만 기획하며 필요할 때만 제한적으로(최대 0~2개) 사용하세요. }
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Timings based on narrative (approx local frames)
  // [0f] "역시나 이 작전의 중심에는 AI가 있었습니다."
  // [120f] "그리고 그 AI 시스템 안에..."
  // [180f] "...여러분이 매일 쓰는 클로드가 있었어요."
  
  const systemOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOutOpacity = interpolate(frame, [150, 175], [1, 0], { extrapolateRight: 'clamp' }); // Fade out as Claude arrives
  
  const revealSpring = spring({ frame: frame - 120, fps, config: ANIMATION.SPRING_BOUNCY });
  const finalRevealSpring = spring({ frame: frame - 170, fps, config: ANIMATION.SPRING_GENTLE });
  
  const textOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const combinedSystemOpacity = systemOpacity * fadeOutOpacity;
  const claudeOpacity = interpolate(finalRevealSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: 'center', alignItems: 'center' }}>
      <PaperTexture />
      
      {/* Background Grid Accent */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.1,
        backgroundImage: `radial-gradient(${COLORS.STROKE_DEFAULT} 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        
        {/* Main AI System Core */}
        <div style={{ 
          opacity: combinedSystemOpacity,
          transform: `scale(${interpolate(revealSpring, [0, 1], [1, 0.85])}) translateY(${interpolate(revealSpring, [0, 1], [0, -100])}px)`,
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        }}>
          <IntroClaudeSystem size={700} />
        </div>
        
        {/* Narrative Text Overlay */}
        <div style={{ 
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_24,
          bottom: 180, 
          opacity: textOpacity * fadeOutOpacity, // Apply same fade out
          zIndex: Z.CONTENT
        }}>
          <div style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_3XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            color: COLORS.TEXT_MAIN,
            transform: `translateY(${interpolate(revealSpring, [0, 1], [0, -20])}px)`
          }}>
            전략적 AI 시스템
          </div>
        </div>

        {/* Revealed Claude Identity */}
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_40,
          opacity: claudeOpacity,
          transform: `translateY(${interpolate(finalRevealSpring, [0, 1], [40, 0])}px)`,
          zIndex: Z.CONTENT + 10
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" fill="none" viewBox="0 0 400 400">
              <path fill="#D97757" d="m124.011 241.251 49.164-27.585.826-2.396-.826-1.333h-2.396l-8.217-.506-28.09-.759-24.363-1.012-23.603-1.266-5.938-1.265L75 197.79l.574-3.661 4.994-3.358 7.153.625 15.808 1.079 23.722 1.637 17.208 1.012 25.493 2.649h4.049l.574-1.637-1.384-1.012-1.079-1.012-24.548-16.635-26.573-17.58-13.919-10.123-7.524-5.129-3.796-4.808-1.637-10.494 6.833-7.525 9.178.624 2.345.625 9.296 7.153 19.858 15.37 25.931 19.098 3.796 3.155 1.519-1.08.185-.759-1.704-2.851-14.104-25.493-15.049-25.931-6.698-10.747-1.772-6.445c-.624-2.649-1.08-4.876-1.08-7.592l7.778-10.561L144.729 75l10.376 1.383 4.37 3.797 6.445 14.745 10.443 23.215 16.197 31.566 4.741 9.364 2.53 8.672.945 2.649h1.637v-1.519l1.332-17.782 2.464-21.832 2.395-28.091.827-7.912 3.914-9.482 7.778-5.129 6.074 2.902 4.994 7.153-.692 4.623-2.969 19.301-5.821 30.234-3.796 20.245h2.21l2.531-2.53 10.241-13.599 17.208-21.511 7.593-8.537 8.857-9.431 5.686-4.488h10.747l7.912 11.76-3.543 12.147-11.067 14.037-9.178 11.895-13.16 17.714-8.216 14.172.759 1.131 1.957-.186 29.727-6.327 16.062-2.901 19.166-3.29 8.672 4.049.944 4.116-3.408 8.419-20.498 5.062-24.042 4.808-35.801 8.469-.439.321.506.624 16.13 1.519 6.9.371h16.888l31.448 2.345 8.217 5.433 4.926 6.647-.827 5.061-12.653 6.445-17.074-4.049-39.85-9.482-13.666-3.408h-1.889v1.131l11.388 11.135 20.87 18.845 26.133 24.295 1.333 6.006-3.357 4.741-3.543-.506-22.962-17.277-8.858-7.777-20.06-16.888H238.5v1.771l4.623 6.765 24.413 36.696 1.265 11.253-1.771 3.661-6.327 2.21-6.951-1.265-14.29-20.06-14.745-22.591-11.895-20.246-1.451.827-7.018 75.601-3.29 3.863-7.592 2.902-6.327-4.808-3.357-7.778 3.357-15.37 4.049-20.06 3.29-15.943 2.969-19.807 1.772-6.58-.118-.439-1.451.186-14.931 20.498-22.709 30.689-17.968 19.234-4.302 1.704-7.458-3.864.692-6.9 4.167-6.141 24.869-31.634 14.999-19.605 9.684-11.32-.068-1.637h-.573l-66.052 42.887-11.759 1.519-5.062-4.741.625-7.778 2.395-2.531 19.858-13.665-.068.067z" />
            </svg>
        </div>
        </div>
    </AbsoluteFill>
  );
};

/** [Scene 4]
 * @narrative — AI가 실제 전쟁에서 사용되는 방식과 그에 따른 위험성을 경고하는 긴장감 조성
 * @layout — 상단에 질문형 타이포그래피, 중앙에 위험을 상징하는 경고 카드 3개 순차적 배치
 * @elements — 텍스트("어떻게 사용되는가?", "위험성", "실제 사건"), SVG(경고 표지판 드로잉)
 * @animation — 카드들의 순차적 슬라이드 업(Stagger), 경고 SVG의 긴박한 떨림 효과
 * @tokens — COLORS.STATE_ERROR_FG, COLORS.TEXT_MAIN, COLORS.BG_MUTED, FONTS.SIZE_XL, ANIMATION.SPRING_HEAVY
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleOpacity = interpolate(frame, [0, 20], [0, 1]);
  
  const card1 = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_SNAPPY });
  const card2 = spring({ frame: frame - 70, fps, config: ANIMATION.SPRING_SNAPPY });
  const card3 = spring({ frame: frame - 100, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_MUTED }}>
      <PaperTexture />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: SPACING.PX_120,
        boxSizing: 'border-box'
      }}>
        <div style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_2XL,
          fontWeight: FONTS.WEIGHT_BOLD,
          color: COLORS.TEXT_MAIN,
          opacity: titleOpacity,
          marginBottom: SPACING.PX_80
        }}>
          AI는 전쟁에서 안전한가?
        </div>

        <div style={{ display: 'flex', gap: SPACING.PX_40 }}>
          {[
            { label: '사용 방식', spring: card1, color: COLORS.SECONDARY_DARK },
            { label: '위험성', spring: card2, color: COLORS.STATE_ERROR_FG, warning: true },
            { label: '실제 사건', spring: card3, color: COLORS.PRIMARY_DARK }
          ].map((item, i) => (
            <div key={i} style={{
              width: 400,
              height: 500,
              backgroundColor: COLORS.BG_BASE,
              borderRadius: SPACING.RADIUS_LG,
              boxShadow: EFFECTS.SHADOW_MD,
              border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_SUBTLE}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: SPACING.PX_32,
              opacity: item.spring,
              transform: `translateY(${interpolate(item.spring, [0, 1], [100, 0])}px)`
            }}>
              {item.warning && (
                <Wobble interval={2}>
                  <IntroWarningIcon size={120} />
                </Wobble>
              )}
              <div style={{
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_XL,
                fontWeight: FONTS.WEIGHT_BOLD,
                color: item.color,
                textAlign: 'center'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 5]
 * @narrative — 주요 AI 모델들의 전쟁 시뮬레이션 결과에 대한 궁금증을 유발하며 시청 지속 유도
 * @layout — 상단에 3대 AI 모델 로고(드로잉)를 나란히 배치, 하단에 '충격적 결과' 강조 타이포그래피
 * @elements — 텍스트("전쟁 시뮬레이션", "충격적인 결과", "끝까지 시청해주세요"), SVG(AI 모델들을 상징하는 3개 박스)
 * @animation — 로고들의 순차적 팝업, '충격적 결과' 텍스트의 강렬한 스케일 업 및 색상 강조
 * @tokens — COLORS.PRIMARY_BOLD, COLORS.BG_DARK, TEXT_ON_DARK, FONTS.SIZE_3XL, ANIMATION.SPRING_BOUNCY
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const boxesSpring = [
    spring({ frame: frame - 50, fps, config: ANIMATION.SPRING_BOUNCY }),
    spring({ frame: frame - 65, fps, config: ANIMATION.SPRING_BOUNCY }),
    spring({ frame: frame - 95, fps, config: ANIMATION.SPRING_BOUNCY })
  ];

  const resultSpring = spring({ frame: frame - 180, fps, config: ANIMATION.SPRING_BOUNCY });
  const footerOpacity = interpolate(frame, [260, 280], [0, 1], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture isDark />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150
      }}>
        {/* Top: AI Models */}
        <div style={{ display: 'flex', gap: SPACING.PX_80, marginBottom: SPACING.PX_80 }}>
          {['GPT', 'Gemini', 'Claude'].map((name, i) => (
            <div key={name} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: SPACING.PX_24,
              opacity: boxesSpring[i],
              transform: `scale(${interpolate(boxesSpring[i], [0, 1], [0.5, 1])})`
            }}>
              <div style={{ 
                fontFamily: FONTS.MONO, 
                fontSize: FONTS.SIZE_LG, 
                color: COLORS.TEXT_ON_DARK,
                fontWeight: FONTS.WEIGHT_BOLD
              }}>
                {name}
              </div>
            </div>
          ))}
        </div>

        {/* Center: Main Message */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_16,
          opacity: resultSpring,
          transform: `scale(${interpolate(resultSpring, [0, 1], [0.8, 1])})`
        }}>
          <div style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.TEXT_SUB
          }}>
            전쟁 시뮬레이션
          </div>
          <div style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_4XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            color: COLORS.PRIMARY,
            textShadow: `0 0 20px ${COLORS.PRIMARY_BOLD}44`
          }}>
            충격적인 결과
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const CUTS = {
  SCENE1: 0,
  SCENE2: 61,
  SCENE3: 259,
  SCENE4: 494,
  SCENE5: 733,
  END: 1051
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
      <Sequence from={CUTS.SCENE5} durationInFrames={CUTS.END - CUTS.SCENE5}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
