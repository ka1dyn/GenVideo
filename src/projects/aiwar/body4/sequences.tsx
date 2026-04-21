import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, interpolateColors, random } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { Wobble } from '../../../shared-components/Wobble';
import { DrawLine } from '../../../shared-components/DrawLine';
import { PaperTexture } from '../../../core/PaperTexture';
import { body4_QuestionMark as QuestionMark } from '../components/svg/body4_QuestionMark';
import { body4_SchoolSketch as SchoolSketch } from '../components/svg/body4_SchoolSketch';
import { body4_ParentChildSketch as ParentChildSketch } from '../components/svg/body4_ParentChildSketch';
import { body4_MorningSun as MorningSun } from '../components/svg/body4_MorningSun';
import { body4_TargetLock as TargetLock } from '../components/svg/body4_TargetLock';
import { body4_ExplosionSketch as ExplosionSketch } from '../components/svg/body4_ExplosionSketch';
import { body4_MilitaryBaseSketch as MilitaryBaseSketch } from '../components/svg/body4_MilitaryBaseSketch';
import { body4_FolderSketch as FolderSketch } from '../components/svg/body4_FolderSketch';
import { body4_AnalogMeter as AnalogMeter } from '../components/svg/body4_AnalogMeter';
import { Body3GavelIcon as GavelIcon } from '../components/svg/Body3GavelIcon';
import { Body2AIIcon as AIIcon } from '../components/svg/body2_AIIcon';
import { body4_LetterSketch as LetterSketch } from '../components/svg/body4_LetterSketch';
import { body4_WarningSketch as WarningSketch } from '../components/svg/body4_WarningSketch';
import { body4_TargetGrid as TargetGrid } from '../components/svg/body4_TargetGrid';
import { body4_AnalyticalMatchChart as AnalyticalMatchChart } from '../components/svg/body4_AnalyticalMatchChart';
import { body4_EyeSketch as EyeSketch } from '../components/svg/body4_EyeSketch';

/**
 * [Scene 1]
 * @narrative AI의 신뢰성에 대한 의문을 제기하며 실증적 테스트(메이븐 정확도)의 시작을 알림
 * @layout 중앙 정렬을 기본으로 하되, 상단에 '신뢰성 테스트' 타이틀 배치, 중앙에 큰 물음표와 AI 텍스트 배치
 * @elements 'AI 신뢰성?' 텍스트, 'TEST 01' 배지, 흔들리는 물음표(Wobble), 구분선(DrawLine)
 * @animation 물음표는 탄성 있게 등장(Spring), 텍스트는 아래에서 위로 순차적 등장(Stagger), 배경 요소 은은하게 확대
 * @tokens COLORS.TEXT_MAIN, COLORS.PRIMARY, FONTS.SIZE_3XL, SPACING.PX_32
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const badgeSpring = spring({ frame: frame - 15, fps, config: ANIMATION.SPRING_BOUNCY });
  const iconSpring = spring({ frame: frame - 30, fps, config: ANIMATION.SPRING_SNAPPY });
  const lineProgress = interpolate(frame - 60, [0, 60], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      {/* Badge */}
      <div style={{
        position: 'absolute',
        top: SPACING.PX_80,
        left: SPACING.PX_80,
        backgroundColor: COLORS.BG_EMPHASIS,
        padding: `${SPACING.PX_12}px ${SPACING.PX_24}px`,
        borderRadius: SPACING.RADIUS_PILL,
        border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
        opacity: badgeSpring,
        transform: `scale(${badgeSpring})`,
      }}>
        <span style={{ 
          color: COLORS.TEXT_SUB, 
          fontFamily: FONTS.MONO, 
          fontSize: FONTS.SIZE_MD,
          fontWeight: FONTS.WEIGHT_BOLD 
        }}>TEST 01</span>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: SPACING.PX_64,
        paddingBottom: 150, // Subtitle area avoidance
      }}>
        {/* Title */}
        <div style={{
          opacity: titleSpring,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [20, 0])}px)`,
        }}>
          <h1 style={{
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_3XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            margin: 0,
            textAlign: 'center',
          }}>AI 신뢰성?</h1>
          <div style={{ width: '100%', height: SPACING.PX_8, marginTop: SPACING.PX_16 }}>
            <DrawLine 
              width={600} 
              strokeWidth={SPACING.BORDER_THICK * 2} 
              color={COLORS.PRIMARY} 
              startFrame={60}
              durationInFrames={60}
            />
          </div>
        </div>

        {/* Icon */}
        <div style={{
          opacity: iconSpring,
          transform: `scale(${iconSpring})`,
        }}>
          <Wobble>
            <QuestionMark size={320} strokeWidth={1.5} color={COLORS.PRIMARY_BOLD} />
          </Wobble>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2]
 * @narrative 메이븐 AI(60%)와 사람(84%)의 정확도 차이를 시각적으로 대비하여 AI의 한계를 강조
 * @layout 좌우 2분할 레이아웃. 왼쪽은 메이븐(AI), 오른쪽은 사람(Human) 영역으로 구분
 * @elements '60%' vs '84%' 큰 숫자, 각각의 레이블 텍스트, 수직 구분선, 드로잉 바 그래프
 * @animation 숫자는 카운트업 느낌으로 빠르게 증가, 바 그래프는 아래에서 위로 드로잉(DrawLine), 대비되는 색상 강조
 * @tokens COLORS.PRIMARY(AI), COLORS.SECONDARY(Human), FONTS.SIZE_4XL, SPACING.PX_64
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const aiSpring = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const humanSpring = spring({ frame: frame - 130, fps, config: ANIMATION.SPRING_SNAPPY });
  
  const aiProgress = interpolate(frame, [0, 45], [0, 0.6], { extrapolateRight: 'clamp' });
  const humanProgress = interpolate(frame - 130, [0, 45], [0, 0.84], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        paddingBottom: 100,
      }}>
        {/* Left: AI (Maven) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: SPACING.PX_120,
          opacity: aiSpring,
        }}>
          <span style={{ 
            color: COLORS.PRIMARY_DARK, 
            fontFamily: FONTS.MONO, 
            fontSize: FONTS.SIZE_LG,
            fontWeight: FONTS.WEIGHT_BOLD,
            marginBottom: SPACING.PX_24
          }}>메이븐 AI</span>
          <h2 style={{
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_4XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            margin: 0,
            marginBottom: SPACING.PX_48
          }}>{Math.round(aiProgress * 100)}%</h2>
          <div style={{ height: 350, width: 120, position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              width: '100%', 
              height: 400 * aiProgress, 
              backgroundColor: COLORS.PRIMARY,
              borderRadius: `${SPACING.RADIUS_MD}px ${SPACING.RADIUS_MD}px 0 0`,
              opacity: 0.8
            }} />
          </div>
        </div>

        {/* Divider */}
        <div style={{ 
          width: SPACING.BORDER_THICK, 
          height: '60%', 
          alignSelf: 'center',
          backgroundColor: COLORS.STROKE_DEFAULT,
          opacity: 0.3
        }} />

        {/* Right: Human */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: SPACING.PX_120,
          opacity: humanSpring,
        }}>
          <span style={{ 
            color: COLORS.SECONDARY_DARK, 
            fontFamily: FONTS.MONO, 
            fontSize: FONTS.SIZE_LG,
            fontWeight: FONTS.WEIGHT_BOLD,
            marginBottom: SPACING.PX_24
          }}>사람</span>
          <h2 style={{
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_4XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            margin: 0,
            marginBottom: SPACING.PX_48
          }}>{Math.round(humanProgress * 100)}%</h2>
          <div style={{ height: 350, width: 120, position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              width: '100%', 
              height: 400 * humanProgress, 
              backgroundColor: COLORS.SECONDARY,
              borderRadius: `${SPACING.RADIUS_MD}px ${SPACING.RADIUS_MD}px 0 0`,
              opacity: 0.8
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


/**
 * [Scene 3]
 * @narrative 분위기를 반전시켜 이어질 비극적인 실화에 대한 긴장감 조성
 * @layout 전체 화면을 어둡게 전환하고, 중앙에 핵심 문구를 묵직하게 배치
 * @elements '없을 겁니다' 강조 텍스트, 어두운 오버레이(BG_DARK), 미세한 노이즈 효과
 * @animation 배경색이 서서히 어두워지며(Interpolate), 텍스트가 정적으로 서서히 확대되어 압도감 부여
 * @tokens COLORS.BG_DARK, COLORS.TEXT_ON_DARK, FONTS.SIZE_2XL, SPACING.PX_48
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const textScale = interpolate(frame, [0, 100], [1.1, 1], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <AbsoluteFill style={{ 
        backgroundColor: COLORS.BG_DARKEST, 
        opacity: bgOpacity 
      }} />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150,
      }}>
        <div style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          textAlign: 'center',
        }}>
          <h2 style={{
            color: COLORS.TEXT_ON_DARK,
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_3XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            letterSpacing: SPACING.PX_8,
            margin: 0,
          }}>오차의 함정</h2>
        </div>
      </div>

      {/* Subtle Noise/Vignette Effect using Overlay */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle, transparent 40%, ${COLORS.BG_DARKEST} 100%)`,
        opacity: 0.4,
        pointerEvents: 'none',
      }} />
    </AbsoluteFill>
  );
};

/**
 * [Scene 4]
 * @narrative 특정 날짜와 장소를 명시하여 사건의 구체적인 타임라인 제시
 * @layout 상단에 날짜(2월 28일)를 배치하고, 하단에 사건의 명칭(이란 전쟁)을 배치하는 수직 구조
 * @elements '2월 28일' 날짜 텍스트, '이란 전쟁 첫날' 설명 텍스트, 가로 구분선(DrawLine)
 * @animation 날짜는 도장을 찍듯 강하게 등장(Spring), 구분선이 왼쪽에서 오른쪽으로 길게 그어짐
 * @tokens COLORS.TEXT_MAIN, COLORS.PRIMARY_BOLD, FONTS.SIZE_3XL, SPACING.PX_24
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dateSpring = spring({ frame, fps, config: ANIMATION.SPRING_HEAVY });
  const lineProgress = interpolate(frame - 25, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const eventOpacity = interpolate(frame - 50, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150,
      }}>
        {/* Date */}
        <div style={{
          transform: `scale(${interpolate(dateSpring, [0, 1], [1.5, 1])}) translateY(${interpolate(dateSpring, [0, 1], [-50, 0])}px)`,
          opacity: dateSpring,
        }}>
          <h2 style={{
            color: COLORS.PRIMARY_BOLD,
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_4XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            margin: 0,
          }}>2월 28일</h2>
        </div>

        {/* Separator */}
        <div style={{ margin: `${SPACING.PX_40}px 0` }}>
          <DrawLine
            width={800}
            strokeWidth={SPACING.BORDER_THICK}
            color={COLORS.STROKE_DEFAULT}
            startFrame={25}
            durationInFrames={40}
          />

        </div>

        {/* Event */}
        <div style={{
          opacity: eventOpacity,
          transform: `translateY(${interpolate(eventOpacity, [0, 1], [10, 0])}px)`,
        }}>
          <h3 style={{
            color: COLORS.TEXT_BODY,
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_XL,
            fontWeight: FONTS.WEIGHT_MEDIUM,
            margin: 0,
            letterSpacing: SPACING.PX_4,
          }}>이란 전쟁 첫날</h3>
        </div>
      </div>
    </AbsoluteFill>
  );
};


/**
 * [Scene 5]
 * @narrative 비극이 일어나기 직전의 평화로운 일상을 묘사하여 대조 극대화
 * @layout 상단에 장소(미납 초등학교) 명시, 중앙에 평화로운 학교와 인물들의 드로잉 배치
 * @elements '미납 초등학교' 장소 텍스트, 학교 건물 드로잉(SVG), 학부모와 아이 드로잉(SVG)
 * @animation 요소들이 왼쪽에서 오른쪽으로 부드럽게 슬라이드하며 등장, 따뜻한 색감 강조(SECONDARY_LIGHT)
 * @tokens COLORS.SECONDARY_LIGHT, COLORS.TEXT_BODY, FONTS.SIZE_LG, SPACING.PX_32
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const entranceSpring = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  
  // Elements transitions
  const sunOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });
  const schoolOpacity = interpolate(frame, [10, 50], [0, 1], { extrapolateRight: 'clamp' });
  const peopleProgress = interpolate(frame, [60, 200], [-100, 200], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{ 
      background: `radial-gradient(circle at 10% 10%, ${COLORS.PRIMARY_LIGHT}44 0%, ${COLORS.BG_BASE} 70%)`,
    }}>
      <PaperTexture opacity={0.05} />
      
      {/* Environment: Morning Sun */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: 60,
        opacity: sunOpacity,
        transform: `scale(${interpolate(sunOpacity, [0, 1], [0.5, 1])})`,
      }}>
        <MorningSun size={200} />
      </div>

      {/* Environment: Soft Clouds */}
      <div style={{
        position: 'absolute',
        top: 150,
        right: interpolate(frame, [0, 215], [-100, 150]),
        opacity: 0.3,
      }}>
        <svg width="200" height="100" viewBox="0 0 100 50" fill={COLORS.STROKE_SUBTLE}>
          <path d="M10 40 Q30 10 50 30 T90 30" stroke={COLORS.STROKE_DEFAULT} strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150,
      }}>
        {/* Narrative Location/Time Label */}
        <div style={{
          position: 'absolute',
          top: SPACING.PX_120,
          textAlign: 'center',
          opacity: entranceSpring,
          transform: `translateY(${interpolate(entranceSpring, [0, 1], [-20, 0])}px)`,
        }}>
          <h4 style={{
            color: COLORS.TEXT_SUB,
            fontFamily: FONTS.HANDWRITING,
            fontSize: FONTS.SIZE_LG,
            margin: 0,
          }}>2월 28일 아침,</h4>
          <h2 style={{
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_XL,
            fontWeight: FONTS.WEIGHT_BOLD,
            margin: 0,
            marginTop: SPACING.PX_8,
          }}>미납 초등학교 앞</h2>
        </div>

        {/* Main Art: School */}
        <div style={{
          opacity: schoolOpacity,
          transform: `scale(${interpolate(schoolOpacity, [0, 1], [0.95, 1])}) translateY(${Math.sin(frame / 30) * 5}px)`,
          marginTop: 100,
        }}>
          <Wobble>
            <SchoolSketch size={550} color={COLORS.TEXT_BODY} strokeWidth={1.5} />
          </Wobble>
        </div>

        {/* Characters: Parent & Child */}
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: `${peopleProgress}px`,
          opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `scale(${interpolate(Math.sin(frame / 10), [-1, 1], [0.98, 1.02])})`,
        }}>
          <ParentChildSketch size={240} color={COLORS.TEXT_MAIN} />
          {/* Subtle label */}
          <div style={{
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: FONTS.HANDWRITING,
            fontSize: 32,
            color: COLORS.SECONDARY_DARK,
            whiteSpace: 'nowrap',
          }}>평소와 같은 등굣길</div>
        </div>
      </div>

      {/* Vignette for cinematic feel */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle, transparent 50%, ${COLORS.BG_BASE}aa 100%)`,
        pointerEvents: 'none',
      }} />
    </AbsoluteFill>
  );
};

/**
 * [Scene 6]
 * @narrative 씬 5의 평화로움을 곧바로 박살내는 군사 AI의 타겟 락온과 폭발 연출
 * @layout 단계별 구현 (Phase 1: 학교에 락온, Phase 2: 대규모 폭발, Phase 3: 사망자 텍스트)
 * @elements 학교 스케치(재사용), TargetLock(SVG), 투박한 폭발 스케치(SVG), 거대 붉은색 텍스트
 * @animation 크리스프한 스프링(락온), 강한 화면 흔들림(폭발), 무거운 도장 텍스트(사상자)
 * @tokens COLORS.STATE_ERROR_FG, COLORS.BG_DARKEST, FONTS.SIZE_4XL
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase Boundaries:
  // Phase 1: 0 - 85 (Lock on - building suspense)
  // Phase 2: 85 - 120 (Explosion - missile strikes)
  // Phase 3: 116 - end (Result - text follows script timing)
  
  // Frame mappings
  const phase1Out = interpolate(frame, [80, 85], [1, 0], { extrapolateRight: 'clamp' });
  const lockOnScale = spring({ frame, fps, config: ANIMATION.SPRING_BOUNCY });
  
  // Screen Shake effect for Explosion
  const shakeX = frame > 80 && frame < 125 ? (random(`shakeX-${frame}`) - 0.5) * 60 : 0;
  const shakeY = frame > 80 && frame < 125 ? (random(`shakeY-${frame}`) - 0.5) * 60 : 0;
  
  const explosionScale = spring({ frame: frame - 82, fps, config: ANIMATION.SPRING_HEAVY });
  const explosionOpacity = interpolate(frame, [105, 125], [1, 0], { extrapolateRight: 'clamp' });
  const flashOpacity = interpolate(frame, [82, 88, 120], [0, 1, 0], { extrapolateRight: 'clamp' });
  
  // Text timing exactly synced to script timings:
  // 116: "이 공격으로 168명이 사망했는데,"
  // 220: "대부분이 7살에서 12살 사이의 아이들이었어요."
  const numberSpring = spring({ frame: frame - 116, fps, config: ANIMATION.SPRING_SNAPPY });
  const subTextOpacity = interpolate(frame, [210, 230], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: frame > 80 ? COLORS.BG_DARKEST : COLORS.BG_BASE,
      transform: `translate(${shakeX}px, ${shakeY}px)`
    }}>
      <PaperTexture isDark={frame > 82} />
      
      {/* -----------------------------
          PHASE 1: TARGET LOCK
         ----------------------------- */}
      {frame < 88 && (
        <AbsoluteFill style={{ opacity: phase1Out, background: `radial-gradient(circle at 10% 10%, ${COLORS.PRIMARY_LIGHT}44 0%, ${COLORS.BG_BASE} 70%)` }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            paddingBottom: 150,
          }}>
            {/* Dark vignette closing in to show threat */}
            <AbsoluteFill style={{
              background: `radial-gradient(circle, transparent 30%, rgba(30,0,0,0.8) 120%)`,
            }} />
            
            {/* School Base */}
            <div style={{ transform: `scale(1) translateY(${-5}px)`, marginTop: 100 }}>
              <SchoolSketch size={550} color={COLORS.TEXT_BODY} strokeWidth={1.5} />
            </div>

            {/* People Base at frozen end position from Scene 5 */}
            <div style={{
              position: 'absolute',
              bottom: '25%',
              left: 200, 
            }}>
              <ParentChildSketch size={240} color={COLORS.TEXT_MAIN} />
            </div>
            
            {/* The Lock On UI */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${interpolate(lockOnScale, [0, 1], [4, 1])})`,
            }}>
              <TargetLock size={900} />
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* -----------------------------
          PHASE 2: THE STRIKE
         ----------------------------- */}
      {frame > 80 && frame < 130 && (
         <AbsoluteFill style={{ opacity: explosionOpacity }}>
           {/* Blinding Flash */}
           <AbsoluteFill style={{ backgroundColor: COLORS.STATE_ERROR_BG, opacity: flashOpacity }} />
           
           {/* Explosion Art */}
           <div style={{
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             height: '100%',
             transform: `scale(${interpolate(explosionScale, [0, 1], [0.1, 1.5])})`
           }}>
             <ExplosionSketch size={1000} color={COLORS.TEXT_ON_DARK} strokeWidth={6} />
           </div>
         </AbsoluteFill>
      )}

      {/* -----------------------------
          PHASE 3: THE DEVASTATION 
         ----------------------------- */}
      {frame > 110 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          paddingBottom: 150,
        }}>
          {/* Main Casualty Count */}
          <div style={{
            opacity: numberSpring,
            transform: `scale(${interpolate(numberSpring, [0, 1], [1.5, 1])})`,
            textAlign: 'center',
          }}>
            <h2 style={{
              color: COLORS.STATE_ERROR_FG,
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_4XL,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              margin: 0,
              textShadow: `0 0 50px rgba(138, 40, 24, 0.5)`,
            }}>168명 사망</h2>
          </div>

          {/* Sub Details */}
          <div style={{
            marginTop: SPACING.PX_80,
            opacity: subTextOpacity,
            textAlign: 'center',
          }}>
            <p style={{
              color: COLORS.TEXT_ON_DARK,
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              fontWeight: FONTS.WEIGHT_MEDIUM,
              margin: 0,
            }}>대부분 7살 ~ 12살 아이들</p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};


/**
 * [Scene 7]
 * @narrative 비극의 원인이 된 학교와 군사 시설의 위험한 인접성 설명 (조사 보고서 스타일)
 * @layout 분석 지도 스타일. 좌측엔 학교, 우측엔 군사 시설을 격자 배경 위에 배치
 * @elements SchoolSketch, MilitaryBaseSketch, 거리 측정선, '위험 구역' 표시
 * @animation 시설들이 도면처럼 선으로 드로잉되며 등장, 거리 측정선이 깜빡이며 인접성 강조
 * @tokens COLORS.BG_MUTED, COLORS.STATE_ERROR_FG, FONTS.SIZE_LG
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entranceScaling = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const entranceOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const measureLine = interpolate(frame - 40, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  const pulse = 1; // 정적 표시로 변경

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Grid Pattern Background */}
      <AbsoluteFill style={{ 
        backgroundImage: `radial-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.5
      }} />
      <PaperTexture opacity={0.05} />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150,
        position: 'relative',
      }}>
        {/* Connection/Measurement Line */}
        <div style={{
          position: 'absolute',
          width: 400 * measureLine,
          height: 6,
          backgroundColor: COLORS.STATE_ERROR_FG,
          opacity: pulse,
          zIndex: 1,
        }}>
          <div style={{
            position: 'absolute',
            top: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: FONTS.MONO,
            fontSize: 40,
            color: COLORS.STATE_ERROR_FG,
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}>● 인접 거리: 00m</div>
        </div>

        {/* School (Left) */}
        <div style={{
          marginRight: 250,
          opacity: entranceOpacity,
          transform: `scale(1)`,
          textAlign: 'center',
          zIndex: 2,
        }}>
           <div style={{
             backgroundColor: COLORS.BG_SURFACE,
             padding: SPACING.PX_32,
             borderRadius: SPACING.RADIUS_MD,
             boxShadow: EFFECTS.SHADOW_MD,
             border: `2px solid ${COLORS.STROKE_DEFAULT}`,
           }}>
             <SchoolSketch size={400} color={COLORS.TEXT_BODY} />
             <div style={{ fontFamily: FONTS.HANDWRITING, fontSize: 54, marginTop: 20 }}>미납 초등학교</div>
           </div>
        </div>

        {/* Military Base (Right) */}
        <div style={{
          marginLeft: 250,
          opacity: entranceOpacity,
          transform: `scale(1)`,
          textAlign: 'center',
          zIndex: 2,
        }}>
           <div style={{
             backgroundColor: COLORS.BG_EMPHASIS,
             padding: SPACING.PX_32,
             borderRadius: SPACING.RADIUS_MD,
             boxShadow: EFFECTS.SHADOW_MD,
             border: `3px solid ${COLORS.STROKE_STRONG}`,
           }}>
             <MilitaryBaseSketch size={400} color={COLORS.STATE_ERROR_FG} />
             <div style={{ fontFamily: FONTS.HANDWRITING, fontSize: 54, marginTop: 20, color: COLORS.STATE_ERROR_FG }}>이란 혁명수비대 시설</div>
           </div>
        </div>
      </div>
      
      {/* Top Label */}
      <div style={{
        position: 'absolute',
        top: SPACING.PX_80,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: FONTS.MONO,
        fontSize: 40,
        color: COLORS.TEXT_SUB,
        letterSpacing: 8,
        fontWeight: 'bold',
      }}>현장 분석 // 07 구역</div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8]
 * @narrative 담장이 세워지며 시각적으로는 분리되었으나 데이터 상에서는 여전히 모호한 상황
 * @layout Scene 7의 지도를 유지하되 중앙에 거대한 담장을 드로잉
 * @elements 담장 드로잉, '분리 완료' 도장 효과, 2013-2016 화살표
 * @animation 굵은 담장이 위에서 아래로 빠르게 그려짐(DrawLine), '데이터 업데이트 누락' 강조 텍스트
 * @tokens COLORS.STROKE_INK, COLORS.STATE_WARN_FG, FONTS.SIZE_XL
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wallDraw = interpolate(frame, [10, 50], [0, 1], { extrapolateRight: 'clamp' });
  const stampOpacity = interpolate(frame - 60, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill style={{ 
        backgroundImage: `radial-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.3
      }} />
      <PaperTexture opacity={0.05} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150,
      }}>
        {/* Background Icons (Faded but clearer) */}
        <div style={{ opacity: 0.5, transform: 'translateX(-350px)' }}>
          <SchoolSketch size={350} color={COLORS.TEXT_DISABLED} />
        </div>
        <div style={{ opacity: 0.5, transform: 'translateX(350px)' }}>
          <MilitaryBaseSketch size={350} color={COLORS.TEXT_DISABLED} />
        </div>

        {/* The Wall (Corrected position and stronger presence) */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '70%',
        }}>
           <div style={{ transform: 'rotate(90deg)', transformOrigin: 'top left' }}>
             <DrawLine 
               width={750} 
               strokeWidth={SPACING.BORDER_THICK * 8} 
               color={COLORS.STROKE_INK} 
               startFrame={10} 
               durationInFrames={40} 
             />
           </div>
        </div>

        {/* Narrative Stamp (Larger) */}
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          opacity: stampOpacity,
          backgroundColor: COLORS.STATE_WARN_BG,
          padding: `${SPACING.PX_32}px ${SPACING.PX_80}px`,
          border: `6px solid ${COLORS.STATE_WARN_FG}`,
          borderRadius: SPACING.RADIUS_SM,
          boxShadow: EFFECTS.SHADOW_MD,
          zIndex: 10,
        }}>
          <span style={{
            color: COLORS.STATE_WARN_FG,
            fontFamily: FONTS.DISPLAY,
            fontSize: 64,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
          }}>물리적 분리 (2016)</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9]
 * @narrative 미군의 공격이 과거의 잘못된(업데이트되지 않은) 정보에 기반했음을 폭로
 * @layout 중앙에 '데이터 폴더' 아이콘을 배치하고, 그 위로 '오래된 정보' 도장을 찍는 연출
 * @elements '오래된 정보' 텍스트, '데이터베이스 v.2016.02', 취소선(DrawLine)
 * @animation 폴더 등장 후 붉은 도장이 쾅 찍히며 날짜 위에 굵은 붉은색 X 표시가 드로잉됨
 * @tokens COLORS.STATE_WARN_FG, COLORS.BG_MUTED, FONTS.SIZE_2XL
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const folderSpring = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const stampSpring = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_SNAPPY });
  const crossOutProgress = interpolate(frame - 80, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <AbsoluteFill style={{ 
        backgroundImage: `radial-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.2
      }} />
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150,
        gap: SPACING.PX_48,
        position: 'relative'
      }}>
        {/* Folder */}
        <div style={{
          opacity: folderSpring,
          transform: `scale(${folderSpring}) rotate(${interpolate(folderSpring, [0, 1], [-5, 0])}deg)`,
        }}>
          <FolderSketch size={450} color={COLORS.TEXT_SUB} />
        </div>

        {/* Timeline Text with Cross-out */}
        <div style={{ position: 'relative', marginTop: -SPACING.PX_40 }}>
          <div style={{
            opacity: folderSpring,
            color: COLORS.TEXT_SUB,
            fontFamily: FONTS.MONO,
            fontSize: 28,
            letterSpacing: 2,
          }}>
            데이터베이스 [v.2016.02]
          </div>
          {/* Red X / Cross out */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '-10%',
            width: '120%',
            height: 10,
            transform: 'translateY(-50%)',
          }}>
            <div style={{ position: 'absolute', width: '100%', top: 0, left: 0, transform: 'rotate(5deg)' }}>
               <DrawLine width={500} strokeWidth={8} color={COLORS.STATE_ERROR_FG} startFrame={80} durationInFrames={20} />
            </div>
          </div>
        </div>

        {/* Warning Label (Smooth Slide instead of Glitch) */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          opacity: interpolate(frame - 40, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
          border: `12px solid ${COLORS.STATE_ERROR_FG}`,
          padding: `${SPACING.PX_32}px ${SPACING.PX_64}px`,
          borderRadius: SPACING.RADIUS_SM,
          backgroundColor: COLORS.STATE_ERROR_FG,
          boxShadow: EFFECTS.SHADOW_LG,
          zIndex: 10,
        }}>
          <span style={{
            color: COLORS.BG_BASE,
            fontFamily: FONTS.DISPLAY,
            fontSize: 64,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            whiteSpace: 'nowrap',
          }}>업데이트 누락</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10]
 * @narrative AI가 개입했을 확률이 높다는 결론을 깔끔한 조사 보고서 형식의 텍스트로 차분하게 전달
 * @layout 화면 중앙에 정렬된 텍스트 블록
 * @elements 단정한 타이포그래피, 얇은 선, 작은 AIIcon
 * @animation 텍스트가 위에서부터 차례대로 천천히 페이드인
 * @tokens COLORS.TEXT_ON_DARK, COLORS.PRIMARY, FONTS.MONO, FONTS.DISPLAY
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  // Typography Fade-ins (Slow and calm breathing)
  const reportTitleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const humanPhaseOpacity = interpolate(frame - 40, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const aiPhaseOpacity = interpolate(frame - 100, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture opacity={0.03} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150,
        paddingLeft: 100,
        paddingRight: 100,
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1200,
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.PX_40,
        }}>
          {/* Phase 1: Investigation Report Header & Human Uncertainty */}
          <div style={{ opacity: reportTitleOpacity, display: 'flex', flexDirection: 'column', gap: SPACING.PX_16 }}>
            <div style={{ 
              color: COLORS.TEXT_DISABLED, 
              fontFamily: FONTS.MONO, 
              fontSize: 28, 
              letterSpacing: 4 
            }}>
              [ 진상 조사 보고 ]
            </div>
            <div style={{
               height: 1,
               width: '100%',
               backgroundColor: COLORS.TEXT_DISABLED,
               opacity: 0.3,
            }} />
          </div>

          <div style={{ opacity: humanPhaseOpacity, marginTop: SPACING.PX_40 }}>
            <div style={{ 
              color: COLORS.TEXT_ON_DARK, 
              fontFamily: FONTS.DISPLAY, 
              fontSize: 54, 
              fontWeight: FONTS.WEIGHT_MEDIUM,
              opacity: 0.8,
            }}>
              인간의 직접 타격 판단: <span style={{ color: COLORS.TEXT_DISABLED }}>불확실</span>
            </div>
          </div>

          {/* Phase 2: AI Intervention Conclusion */}
          <div style={{ 
            opacity: aiPhaseOpacity, 
            marginTop: SPACING.PX_80,
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.PX_32,
            backgroundColor: 'rgba(232, 168, 124, 0.05)',
            padding: SPACING.PX_48,
            borderLeft: `8px solid ${COLORS.PRIMARY}`,
            borderRadius: `0 ${SPACING.RADIUS_MD}px ${SPACING.RADIUS_MD}px 0`,
          }}>
            <AIIcon size={80} color={COLORS.PRIMARY} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.PX_16 }}>
               <div style={{ 
                 color: COLORS.PRIMARY, 
                 fontFamily: FONTS.MONO, 
                 fontSize: 32, 
                 letterSpacing: 2,
               }}>
                 ▶ 분석 결론
               </div>
               <div style={{ 
                 color: COLORS.TEXT_ON_DARK, 
                 fontFamily: FONTS.DISPLAY, 
                 fontSize: 64, 
                 fontWeight: FONTS.WEIGHT_EXTRABOLD,
               }}>
                 AI 의사결정 개입 가능성: <span style={{ color: COLORS.PRIMARY }}>매우 높음</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11]
 * @narrative 하원 의원들의 공식적인 서한 발송을 통해 사건의 공론화와 책임 추궁 강조
 * @layout 다큐멘터리식 자막 (문서 그래픽 제거, 텍스트 중심)
 * @elements 타이포그래피, 매우 얇은 강조선
 * @animation 느리고 차분한 페이드인
 * @tokens COLORS.BG_BASE, COLORS.TEXT_MAIN, FONTS.DISPLAY
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const questionOpacity = interpolate(frame - 40, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const underlineWidth = interpolate(frame - 60, [0, 30], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture opacity={0.5} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 100,
      }}>
        {/* Simple Report Box */}
        <div style={{
          width: '100%',
          maxWidth: 1000,
          backgroundColor: COLORS.BG_SURFACE,
          padding: `${SPACING.PX_80}px ${SPACING.PX_64}px`,
          borderRadius: SPACING.RADIUS_MD,
          border: `2px solid ${COLORS.STROKE_DEFAULT}`,
          boxShadow: EFFECTS.SHADOW_MD,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_64,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          {/* Top Label */}
          <div style={{ 
            opacity: titleOpacity, 
            color: COLORS.TEXT_SUB, 
            fontFamily: FONTS.MONO, 
            fontSize: 24, 
            letterSpacing: 2,
            borderBottom: `1px solid ${COLORS.STROKE_SUBTLE}`,
            paddingBottom: 8,
            width: '100%',
            textAlign: 'center',
          }}>
            [ 발췌: 미 하원 120인 공식 서한 ]
          </div>

          {/* Main Question */}
          <div style={{ position: 'relative', opacity: questionOpacity, textAlign: 'center' }}>
            <h2 style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.DISPLAY,
              fontSize: 54,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              margin: 0,
              lineHeight: 1.4,
            }}>
              "메이븐 AI가 이 민간인 지역을<br/>
              표적으로 선정했습니까?"
            </h2>
            {/* Minimal Underline */}
            <div style={{
              position: 'absolute',
              bottom: -15,
              left: '50%',
              transform: 'translateX(-50%)',
              height: 4,
              backgroundColor: COLORS.PRIMARY,
              width: `${underlineWidth}%`,
              opacity: 0.8,
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 12]
 * @narrative 60% 정확도의 AI가 전쟁에서 가져올 수 있는 치명적인 위험성과 타겟 식별 실패를 시각화
 * @layout 중앙에 60% 통계와 타겟 분석 그리드(TargetGrid) 배치
 * @elements TargetGrid, '60%' 거대 텍스트, '식별 실패' 도장
 * @animation 그리드 분석 중 오류(X)가 실시간으로 발생, 동시에 '60%' 텍스트가 경고등처럼 맥동
 * @tokens COLORS.STATE_ERROR_FG, COLORS.BG_DARKEST, FONTS.SIZE_4XL
 */
/**
 * [Scene 12]
 * @narrative 60% 정확도의 AI가 전쟁에서 가져올 수 있는 치명적인 위험성을 통계적으로 전달
 * @layout 라이트 모드 리포트 박스. 수평 바 차트로 성공/위험 대비
 * @elements 수평 바 차트, 대조 텍스트
 * @animation 바 차트가 부드럽게 채워짐
 * @tokens COLORS.BG_BASE, COLORS.STATE_ERROR_FG, FONTS.DISPLAY
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();

  const boxOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const progress1 = interpolate(frame, [20, 70], [0, 0.6], { extrapolateRight: 'clamp' });
  const progress2 = interpolate(frame - 50, [0, 50], [0, 0.4], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame - 100, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture opacity={0.5} />
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 100,
      }}>
        {/* Simplified Report Box */}
        <div style={{
          width: '100%',
          maxWidth: 1000,
          backgroundColor: COLORS.BG_SURFACE,
          padding: `${SPACING.PX_80}px ${SPACING.PX_80}px`,
          borderRadius: SPACING.RADIUS_MD,
          border: `2px solid ${COLORS.STROKE_DEFAULT}`,
          boxShadow: EFFECTS.SHADOW_MD,
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.PX_64,
          opacity: boxOpacity,
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              color: COLORS.TEXT_SUB,
              fontFamily: FONTS.MONO,
              fontSize: 24,
              letterSpacing: 2,
              margin: 0,
            }}>[ 분석 데이터: AI 타겟 식별 정확도 ]</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.PX_48 }}>
            {/* Accuracy Bar (60%) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.TEXT_SUB, fontFamily: FONTS.MONO }}>
                <span>AI 타겟 식별 정확도</span>
                <span style={{ fontWeight: 'bold' }}>60.0%</span>
              </div>
              <div style={{ width: '100%', height: 24, backgroundColor: COLORS.BG_MUTED, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ width: `${progress1 * 100}%`, height: '100%', backgroundColor: COLORS.TEXT_DISABLED }} />
              </div>
            </div>

            {/* Risk Bar (40%) - Highlighted */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.STATE_ERROR_FG, fontFamily: FONTS.MONO }}>
                <span>오류 위험</span>
                <span style={{ fontWeight: 'bold' }}>40.0%</span>
              </div>
              <div style={{ width: '100%', height: 24, backgroundColor: COLORS.BG_MUTED, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ width: `${progress2 * 100}%`, height: '100%', backgroundColor: COLORS.STATE_ERROR_FG }} />
              </div>
            </div>
          </div>

          {/* Warning Subtext */}
          <div style={{ 
            marginTop: SPACING.PX_16, 
            textAlign: 'center',
            opacity: textOpacity,
          }}>
            <p style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.DISPLAY,
              fontSize: 32,
              fontWeight: FONTS.WEIGHT_BOLD,
              margin: 0,
            }}>
              "10번 중 4번은 무고한 생명이<br/>
              잘못된 타겟으로 분류될 수 있습니다."
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


/**
 * [Scene 13]
 * @narrative AI 기술의 가장 취약한 지점인 '의도적인 데이터 오염' 가능성 경고
 * @layout 화면 중앙에 '근본적인 문제' 타이틀, 배경에 노이즈와 글리치 효과 배치
 * @elements '근본적인 문제' 텍스트, '일부러 틀리게' 강조 문구, 글리치 노이즈(Wobble)
 * @animation 텍스트가 지지직거리며 등장(Glitch), '틀리게' 단어에서 색상이 붉은색으로 급변
 * @tokens COLORS.STATE_ERROR_FG, COLORS.BG_DARK, FONTS.SIZE_2XL, SPACING.PX_48
 */
/**
 * [Scene 13]
 * @narrative AI 기술의 근본적인 취약점인 '의도적인 데이터 오염' 리스크 경고
 * @layout 라이트 모드 리포트 박스 (Scene 11, 12와 통일)
 * @elements 단정한 타이포그래피, 텍스트 강조 배경
 * @animation 느린 페이드인, 텍스트 하단 붉은 강조 효과 등장
 * @tokens COLORS.BG_BASE, COLORS.STATE_ERROR_FG, FONTS.DISPLAY
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();

  const boxOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame - 30, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const mainTextOpacity = interpolate(frame - 80, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const highlightWidth = interpolate(frame - 100, [0, 30], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture opacity={0.5} />
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 100,
      }}>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_16 }}>
            <span style={{ 
              color: COLORS.TEXT_DISABLED, 
              fontFamily: FONTS.DISPLAY, 
              fontSize: 48,
              opacity: mainTextOpacity,
            }}>가장 근본적인 문제:</span>
            
            <div style={{ position: 'relative', opacity: mainTextOpacity }}>
              <h1 style={{
                color: COLORS.TEXT_MAIN,
                fontFamily: FONTS.DISPLAY,
                fontSize: 80,
                fontWeight: FONTS.WEIGHT_EXTRABOLD,
                margin: 0,
                zIndex: 2,
                position: 'relative',
              }}>
                AI를 일부러 틀리게
              </h1>
              {/* Highlight Underline */}
              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 0,
                height: 30,
                backgroundColor: `${COLORS.STATE_ERROR_FG}22`,
                width: `${highlightWidth}%`,
                zIndex: 1,
              }} />
            </div>
          </div>

          {/* Detailed Explanation */}
          <div style={{ 
            marginTop: SPACING.PX_64, 
            textAlign: 'center',
            opacity: interpolate(frame - 120, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
          }}>
            <p style={{
              color: COLORS.STATE_ERROR_FG,
              fontFamily: FONTS.HANDWRITING,
              fontSize: 48,
              margin: 0,
            }}>
              "학습 데이터의 오염은 AI의 의사결정 자체를 오염시킵니다."
            </p>
          </div>
        </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 14]
 * @narrative AI 두뇌 코어의 오염을 1차원적이고 직관적인 그래픽 단 하나로 거칠게 표현
 * @layout 중앙 단일 객체 기반
 * @elements AI Brain SVG 1개, 대형 텍스트 1개
 * @animation 평온하던 AI 두뇌가 붉게 변색되는 정적인 연출
 * @tokens COLORS.PRIMARY, COLORS.STATE_ERROR_FG, FONTS.DISPLAY
 */
const Scene14: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Appearances
  const coreOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  // Phase 2: Pollution Event
  const isPolluted = frame > 110;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture opacity={0.5} />
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 100,
        gap: 60,
      }}>
        {/* Abstract AI Brain Graphic */}
        <div style={{ opacity: coreOpacity }}>
          <div style={{ position: 'relative' }}>
            {/* Base SVG */}
            <AIIcon size={280} color={isPolluted ? COLORS.STATE_ERROR_FG : COLORS.TEXT_MAIN} />
          </div>
        </div>

        {/* Huge Direct Text */}
        <div style={{ 
          opacity: coreOpacity, 
          textAlign: 'center',
        }}>
          <div style={{ 
            fontFamily: FONTS.DISPLAY, 
            fontSize: 72, 
            color: isPolluted ? COLORS.STATE_ERROR_FG : COLORS.TEXT_MAIN, 
            fontWeight: 'bold',
            letterSpacing: 2,
          }}>
            {isPolluted ? "[ 코어 데이터 오염됨 ]" : "[ AI 두뇌 알고리즘 ]"}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 15]
 * @narrative 적대국에 의한 데이터 오염이 실전에서 민간 시설 오타격으로 이어지는 시나리오 제시
 * @layout 지도 연상되는 어두운 배경 위에 단일 타겟 마커 렌더링
 * @elements 초록색 정상 마커, 경고 로그, 붉은색 강제 조준점(Crosshair)
 * @animation 텍스트 로그 후 거대한 조준점이 스탬프처럼 찍히며 강제 타겟팅
 * @tokens COLORS.STATE_SUCCESS_FG, COLORS.STATE_ERROR_FG, FONTS.DISPLAY
 */
const Scene15: React.FC = () => {
  const frame = useCurrentFrame();

  const isCorrupted = frame > 120;
  const crosshairScale = spring({ frame: Math.max(0, frame - 120), fps: 30, config: ANIMATION.SPRING_HEAVY });
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      {/* Map Grid Background (Subtle) */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `radial-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        opacity: 0.3,
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Civilian Marker (Original) */}
          <div style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: `4px dashed ${COLORS.STATE_SUCCESS_FG}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${COLORS.STATE_SUCCESS_FG}11`,
            opacity: isCorrupted ? 0.2 : 1,
            transition: 'opacity 0.2s',
          }}>
            <div style={{
              position: 'absolute',
              bottom: -60,
              color: COLORS.STATE_SUCCESS_FG,
              fontFamily: FONTS.MONO,
              fontSize: 32,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              letterSpacing: 2,
            }}>
              일반 민간 시설
            </div>
          </div>

          {/* Corruption Log */}
          {frame > 80 && !isCorrupted && (
            <div style={{
              position: 'absolute',
              top: -80,
              color: COLORS.STATE_ERROR_FG,
              fontFamily: FONTS.MONO,
              fontSize: 24,
              opacity: interpolate(frame - 80, [0, 10], [0, 1])
            }}>
              {'>'} 타겟 세팅중...
            </div>
          )}

          {/* Military Crosshair (Corrupted) */}
          {isCorrupted && (
            <div style={{
              position: 'absolute',
              width: 400,
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${interpolate(crosshairScale, [0, 1], [3, 1])})`,
              opacity: interpolate(crosshairScale, [0, 1], [0, 1]),
            }}>
              {/* Crosshair Graphic */}
              <div style={{ position: 'absolute', width: '100%', height: 4, backgroundColor: COLORS.STATE_ERROR_FG }} />
              <div style={{ position: 'absolute', width: 4, height: '100%', backgroundColor: COLORS.STATE_ERROR_FG }} />
              <div style={{ 
                position: 'absolute', width: 250, height: 250, 
                border: `8px solid ${COLORS.STATE_ERROR_FG}`, borderRadius: '50%' 
              }} />
              <div style={{ 
                position: 'absolute', width: 320, height: 320, 
                border: `4px solid ${COLORS.STATE_ERROR_FG}`, borderRadius: '50%',
                borderLeftColor: 'transparent', borderRightColor: 'transparent',
                transform: `rotate(${frame}deg)`
              }} />

              {/* Corrupted Label */}
              <div style={{
                position: 'absolute',
                bottom: -80,
                backgroundColor: COLORS.STATE_ERROR_FG,
                color: COLORS.TEXT_ON_DARK,
                fontFamily: FONTS.DISPLAY,
                fontSize: 40,
                fontWeight: 'bold',
                padding: '12px 32px',
                borderRadius: 8,
                whiteSpace: 'nowrap',
              }}>
                [ 군사 타겟으로 불법 재설정됨 ]
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 16]
 * @narrative AI 오염과 판단 오류가 핵심이 되는 '새로운 형태의 전쟁'이 시작되었음을 선언
 * @layout 다크 모드 캔버스에 거대한 타이포그래피 중앙 정렬
 * @elements '새로운 형태의 전쟁' 메인 텍스트
 * @animation 56프레임의 짧은 길이에 맞춰, 텍스트가 화면에 쾅 박히듯(Stomp) 거칠게 등장
 * @tokens COLORS.TEXT_ON_DARK, COLORS.STATE_ERROR_FG, FONTS.SIZE_3XL
 */
const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Short & intense "Stomp" impact
  const stompScale = spring({ frame, fps, config: { damping: 15, mass: 2, stiffness: 200 } });
  const impactShake = frame > 10 && frame < 18 ? (random(`shake-${frame}`) - 0.5) * 20 : 0;
  
  // Sudden red flash on impact
  const isImpact = frame >= 8 && frame <= 10;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture opacity={0.03} />
      
      {/* Red Flash */}
      <AbsoluteFill style={{ 
        backgroundColor: COLORS.STATE_ERROR_FG,
        opacity: isImpact ? 1 : 0,
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150,
      }}>
        <div style={{
          transform: `scale(${interpolate(stompScale, [0, 1], [3, 1])}) translateY(${impactShake}px)`,
          opacity: interpolate(frame, [0, 5], [0, 1]),
          textAlign: 'center',
        }}>
          <h1 style={{
            color: COLORS.TEXT_ON_DARK,
            fontFamily: FONTS.DISPLAY,
            fontSize: 100, // Very large
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            margin: 0,
            letterSpacing: SPACING.PX_16,
            textShadow: `0 10px 40px ${COLORS.STATE_ERROR_FG}88`,
          }}>
            새로운 형태의 전쟁
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};


export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={221}>
        <Scene1 />
      </Sequence>
      <Sequence from={221} durationInFrames={306}>
        <Scene2 />
      </Sequence>
      <Sequence from={527} durationInFrames={102}>
        <Scene3 />
      </Sequence>
      <Sequence from={629} durationInFrames={164}>
        <Scene4 />
      </Sequence>
      <Sequence from={793} durationInFrames={215}>
        <Scene5 />
      </Sequence>
      <Sequence from={1008} durationInFrames={323}>
        <Scene6 />
      </Sequence>
      <Sequence from={1331} durationInFrames={173}>
        <Scene7 />
      </Sequence>
      <Sequence from={1504} durationInFrames={182}>
        <Scene8 />
      </Sequence>
      <Sequence from={1686} durationInFrames={200}>
        <Scene9 />
      </Sequence>
      <Sequence from={1886} durationInFrames={401}>
        <Scene10 />
      </Sequence>
      <Sequence from={2287} durationInFrames={218}>
        <Scene11 />
      </Sequence>
      <Sequence from={2505} durationInFrames={182}>
        <Scene12 />
      </Sequence>
      <Sequence from={2687} durationInFrames={178}>
        <Scene13 />
      </Sequence>
      <Sequence from={2865} durationInFrames={163}>
        <Scene14 />
      </Sequence>
      <Sequence from={3028} durationInFrames={231}>
        <Scene15 />
      </Sequence>
      <Sequence from={3259} durationInFrames={56}>
        <Scene16 />
      </Sequence>
    </AbsoluteFill>
  );
};
