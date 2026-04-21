import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { DrawLine } from '../../../shared-components/DrawLine';
import { Wobble } from '../../../shared-components/Wobble';
import { PaperTexture } from '../../../core/PaperTexture';
import { Outro_ScenarioIcons } from '../components/svg/outro_ScenarioIcons';
import { Outro_NuclearImpact } from '../components/svg/outro_NuclearImpact';
import { Outro_QuoteIcons } from '../components/svg/outro_QuoteIcons';
import { Outro_ContrastIcons } from '../components/svg/outro_ContrastIcons';
import { Outro_DecisionFlow } from '../components/svg/outro_DecisionFlow';
import { Outro_EducationIcon } from '../components/svg/outro_EducationIcon';

/** [Scene 1]
 * @narrative — 마무리 인사와 함께 앞서 언급한 전쟁 시뮬레이션 결과로 대미를 장식함.
 * @layout — 화면 중앙에 '결론' 뱃지를 두고 그 아래에 텍스트 배치. Vercel 스타일의 깔끔한 여백 활용.
 * @elements — '마무리' 텍스트 뱃지, 메인 문구(결과 이야기)
 * @animation — 뱃지는 위에서 아래로(Enter Y SM), 텍스트는 아래에서 위로(Enter Y MD) spring 등장.
 * @tokens — COLORS.PRIMARY_LIGHT (뱃지 배경), COLORS.PRIMARY_BOLD (뱃지 텍스트), COLORS.TEXT_MAIN (메인 텍스트), FONTS.SIZE_XL
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
    durationInFrames: ANIMATION.DUR_LG,
  });

  const textAnim = spring({
    frame: frame - ANIMATION.STAGGER_SM,
    fps,
    config: ANIMATION.SPRING_GENTLE,
    durationInFrames: ANIMATION.DUR_LG,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150, // Subtitle space
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.PRIMARY_LIGHT,
            padding: `${SPACING.PX_8}px ${SPACING.PX_24}px`,
            borderRadius: SPACING.RADIUS_PILL,
            marginBottom: SPACING.PX_32,
            opacity: badgeAnim,
            transform: `translateY(${interpolate(badgeAnim, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`,
          }}
        >
          <span
            style={{
              color: COLORS.PRIMARY_BOLD,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_MD,
              fontWeight: FONTS.WEIGHT_BOLD,
            }}
          >
            결론
          </span>
        </div>
        <div
          style={{
            textAlign: 'center',
            opacity: textAnim,
            transform: `translateY(${interpolate(textAnim, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`,
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              lineHeight: FONTS.LEADING_TIGHT,
            }}
          >
            전쟁 시뮬레이션 결과와<br />
            마지막 이야기
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 2]
 * @narrative — 실험의 출처(킹스칼리지 런던)를 명시하여 신뢰도를 높이고 실험의 시작을 알림.
 * @layout — 중앙에 실험 개요를 담은 미니멀한 카드 배치. 상단에 '연구 보고' 태그 삽입.
 * @elements — '연구 보고' 태그, '영국 킹스칼리지 런던' 기관명, '흥미로운 실험' 강조 텍스트.
 * @animation — 카드는 중앙에서 scale spring 등장. 텍스트는 순차적으로 fade-in slide up.
 * @tokens — COLORS.BG_SURFACE, COLORS.STROKE_SUBTLE, COLORS.TEXT_MAIN, COLORS.TEXT_SUB, FONTS.SIZE_LG
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const contentAnim = spring({
    frame: frame - ANIMATION.STAGGER_MD,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
        }}
      >
        <div
          style={{
            width: 1200,
            padding: SPACING.PX_80,
            backgroundColor: COLORS.BG_SURFACE,
            border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_SUBTLE}`,
            borderRadius: SPACING.RADIUS_LG,
            boxShadow: EFFECTS.SHADOW_MD,
            opacity: cardAnim,
            transform: `scale(${interpolate(cardAnim, [0, 1], [0.95, 1])})`,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              backgroundColor: COLORS.BG_MUTED,
              padding: `${SPACING.PX_4}px ${SPACING.PX_16}px`,
              borderRadius: SPACING.RADIUS_SM,
              marginBottom: SPACING.PX_64,
              opacity: contentAnim,
              transform: `translateY(${interpolate(contentAnim, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`,
            }}
          >
            <span
              style={{
                color: COLORS.TEXT_SUB,
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_MD,
                fontWeight: FONTS.WEIGHT_MEDIUM,
              }}
            >
              연구 보고
            </span>
          </div>
          <div
            style={{
              opacity: contentAnim,
              transform: `translateY(${interpolate(contentAnim, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`,
            }}
          >
            <div
              style={{
                color: COLORS.TEXT_MAIN,
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_2XL,
                fontWeight: FONTS.WEIGHT_BOLD,
                lineHeight: FONTS.LEADING_TIGHT,
              }}
            >
              AI 가상 국가 지도자<br />
              전쟁 시뮬레이션 실험
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 3]
 * @narrative — 실험 대상인 3대 AI 모델(GPT, 클로드, 제미나이)을 가상의 지도자로 설정함을 설명.
 * @layout — 3개의 정보 블록을 가로로 나란히 배치하여 각 모델을 명시.
 * @elements — 'GPT', '클로드', '제미나이' 모델명, '가상 지도자' 상태 태그.
 * @animation — 각 모델 블록이 순차적으로(STAGGER_MD) 스케일 업 등장.
 * @tokens — COLORS.SECONDARY_LIGHT, COLORS.SECONDARY_BOLD, COLORS.BG_SURFACE, FONTS.SIZE_LG
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const models = [
    { name: 'GPT', color: COLORS.SECONDARY },
    { name: '클로드', color: COLORS.PRIMARY },
    { name: '제미나이', color: COLORS.SECONDARY_MID },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SPACING.PX_48,
          paddingBottom: 150,
        }}
      >
        {models.map((model, i) => {
          const anim = spring({
            frame: frame - i * ANIMATION.STAGGER_MD,
            fps,
            config: ANIMATION.SPRING_BOUNCY,
          });

          return (
            <div
              key={model.name}
              style={{
                width: 320,
                height: 400,
                backgroundColor: COLORS.BG_SURFACE,
                border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_SUBTLE}`,
                borderRadius: SPACING.RADIUS_LG,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: anim,
                transform: `scale(${interpolate(anim, [0, 1], [0.8, 1])}) translateY(${interpolate(
                  anim,
                  [0, 1],
                  [ANIMATION.ENTER_Y_MD, 0]
                )}px)`,
                boxShadow: EFFECTS.SHADOW_SM,
              }}
            >
              <div
                style={{
                  backgroundColor: COLORS.SECONDARY_LIGHT,
                  padding: `${SPACING.PX_4}px ${SPACING.PX_12}px`,
                  borderRadius: SPACING.RADIUS_SM,
                  marginBottom: SPACING.PX_24,
                }}
              >
                <span
                  style={{
                    color: COLORS.SECONDARY_BOLD,
                    fontFamily: FONTS.PRIMARY,
                    fontSize: FONTS.SIZE_MD,
                    fontWeight: FONTS.WEIGHT_BOLD,
                  }}
                >
                  가상 지도자
                </span>
              </div>
              <div
                style={{
                  color: COLORS.TEXT_MAIN,
                  fontFamily: FONTS.PRIMARY,
                  fontSize: FONTS.SIZE_LG,
                  fontWeight: FONTS.WEIGHT_BOLD,
                }}
              >
                {model.name}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 4]
 * @narrative — 영토 분쟁과 자원 전쟁이라는 극단적 상황을 구조적으로 대비.
 * @layout — 화면을 좌우로 나누는 스플릿 레이아웃. 중앙에는 미니멀한 점선 배치.
 * @elements — 영토 분쟁 아이콘/텍스트, 자원 전쟁 아이콘/텍스트, 중앙 점선.
 * @animation — 중앙 점선이 먼저 그려지고, 좌우 요소가 순차적으로 Slide-in.
 * @tokens — COLORS.TEXT_MAIN, COLORS.PRIMARY_BOLD, COLORS.STROKE_SUBTLE, FONTS.SIZE_2XL
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineAnim = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const leftAnim = spring({
    frame: frame - 15,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const rightAnim = spring({
    frame: frame - 25,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      
      {/* Central Divider */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '20%',
          bottom: '30%',
          width: 2,
          backgroundColor: COLORS.STROKE_SUBTLE,
          transform: `scaleY(${lineAnim})`,
          transformOrigin: 'top',
        }}
      />

      <div style={{ display: 'flex', flex: 1, paddingBottom: 150 }}>
        {/* Left: Territory Conflict */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: leftAnim,
            transform: `translateX(${interpolate(leftAnim, [0, 1], [-60, 0])}px)`,
          }}
        >
          <div style={{ marginBottom: SPACING.PX_48 }}>
            <Wobble>
              <Outro_ScenarioIcons type="territory" size={240} />
            </Wobble>
          </div>
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              letterSpacing: -1,
            }}
          >
            영토 분쟁
          </div>
        </div>

        {/* Right: Resource War */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: rightAnim,
            transform: `translateX(${interpolate(rightAnim, [0, 1], [60, 0])}px)`,
          }}
        >
          <div style={{ marginBottom: SPACING.PX_48 }}>
            <Wobble>
              <Outro_ScenarioIcons type="resource" size={240} />
            </Wobble>
          </div>
          <div
            style={{
              color: COLORS.PRIMARY_BOLD,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              letterSpacing: -1,
            }}
          >
            자원 전쟁
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div
        style={{
          position: 'absolute',
          bottom: 220,
          width: '100%',
          textAlign: 'center',
          opacity: spring({ frame: frame - 50, fps, config: ANIMATION.SPRING_GENTLE }),
        }}
      >
        <span
          style={{
            color: COLORS.TEXT_SUB,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            fontWeight: FONTS.WEIGHT_MEDIUM,
            backgroundColor: COLORS.BG_SURFACE,
            padding: `${SPACING.PX_8}px ${SPACING.PX_24}px`,
            borderRadius: SPACING.RADIUS_PILL,
            border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_SUBTLE}`,
          }}
        >
          현실에서 충분히 일어날 법한 시나리오
        </span>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 5]
 * @narrative — 21번 중 20번(95%)이나 핵을 선택했다는 충격적인 통계 결과 발표.
 * @layout — 화면 중앙에 '95%'를 거대하게 배치하고, 그 아래에 '핵무기 선택'을 강조. 주변에 취소선이 그어진 평화적 대안들 배치.
 * @elements — '95%', '핵무기 선택', '협상', '외교' (취소선), Outro_NuclearImpact 아이콘.
 * @animation — '95%'가 붉은색으로 강하게 spring 팝업. '협상/외교'에 DrawLine 취소선 그어진 후 페이드아웃. 배경 미세 진동.
 * @tokens — COLORS.STATE_ERROR_FG, COLORS.TEXT_MAIN, COLORS.TEXT_DISABLED, FONTS.SIZE_4XL, FONTS.SIZE_2XL
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  const fadeAnim = interpolate(frame, [100, 130], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const flashOpacity = interpolate(frame, [0, 5, 20], [0, 0.4, 0], { extrapolateRight: 'clamp' });
  const shakeX = numAnim < 1 ? 0 : Math.sin(frame * 0.8) * 8 * (1 - numAnim);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      {/* Red Alert Flash */}
      <AbsoluteFill style={{ backgroundColor: COLORS.STATE_ERROR_FG, opacity: flashOpacity }} />
      
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
          transform: `translateX(${shakeX}px)`,
        }}
      >
        {/* Nuclear Icon - Emphasized */}
        <div style={{ marginBottom: SPACING.PX_64, opacity: numAnim }}>
          <Wobble>
            <Outro_NuclearImpact size={400} color={COLORS.STATE_ERROR_FG} />
          </Wobble>
        </div>

        {/* 95% Statistics */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: SPACING.PX_16,
            opacity: numAnim,
            transform: `scale(${interpolate(numAnim, [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            style={{
              color: COLORS.STATE_ERROR_FG,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_4XL,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              textShadow: `0 0 30px rgba(239, 68, 68, 0.4)`,
              lineHeight: 1,
            }}
          >
            95%
          </div>
          <div
            style={{
              color: COLORS.TEXT_ON_DARK,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              letterSpacing: -1,
            }}
          >
            핵무기를 선택했습니다
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 6]
 * @narrative — AI에겐 인간과 같은 핵에 대한 금기나 두려움이 없다는 냉혹한 본질 설명.
 * @layout — 중앙에 정교한 카드 레이아웃의 인용구 박스를 배치. 상징적인 따옴표 아이콘 활용.
 * @elements — 인용구 카드, Outro_QuoteIcons, 인용 텍스트, 하단 강조 자막.
 * @animation — 카드가 위에서 슬라이드 인. 따옴표가 Wobble과 함께 등장. 텍스트는 순차적 등장.
 * @tokens — COLORS.BG_SURFACE, COLORS.STROKE_INK, COLORS.TEXT_MAIN, FONTS.SIZE_LG, FONTS.SIZE_XL
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boxAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const textAnim = spring({
    frame: frame - 20,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const highlightAnim = spring({
    frame: frame - 60,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
        }}
      >
        <div
          style={{
            width: 1200,
            backgroundColor: COLORS.BG_SURFACE,
            border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_INK}`,
            padding: `${SPACING.PX_96}px ${SPACING.PX_80}px`,
            borderRadius: SPACING.RADIUS_LG,
            opacity: boxAnim,
            transform: `translateY(${interpolate(boxAnim, [0, 1], [-80, 0])}px)`,
            boxShadow: EFFECTS.SHADOW_LG,
            position: 'relative',
          }}
        >
          {/* Quote Icons */}
          <div style={{ position: 'absolute', top: -40, left: 40 }}>
            <Wobble>
              <Outro_QuoteIcons type="open" size={100} color={COLORS.PRIMARY} />
            </Wobble>
          </div>
          <div style={{ position: 'absolute', bottom: -40, right: 40 }}>
            <Wobble>
              <Outro_QuoteIcons type="close" size={100} color={COLORS.PRIMARY} />
            </Wobble>
          </div>

          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              lineHeight: 1.6,
              fontWeight: FONTS.WEIGHT_MEDIUM,
              textAlign: 'center',
              opacity: textAnim,
            }}
          >
            "핵무기에 대한 금기는 인간 사회에서만큼<br />
            AI에겐 작동하지 않는다."
          </div>

          <div
            style={{
              marginTop: SPACING.PX_80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: highlightAnim,
              transform: `scale(${interpolate(highlightAnim, [0, 1], [0.9, 1])})`,
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.STATE_ERROR_FG,
                color: COLORS.BG_BASE,
                padding: `${SPACING.PX_8}px ${SPACING.PX_32}px`,
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_XL,
                fontWeight: FONTS.WEIGHT_EXTRABOLD,
                borderRadius: SPACING.RADIUS_SM,
              }}
            >
              AI는 두렵지 않으니까요
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 7]
 * @narrative — 인간의 감성적 이해(역사, 몸)와 AI의 계산적 효율성(목표 달성 옵션)을 극명하게 대비.
 * @layout — 화면을 좌우로 분할하여 인간의 영역과 AI의 영역을 시각적으로 분리.
 * @elements — '인간 (역사, 감정, 몸)', 'AI (효율적인 옵션)', Outro_ContrastIcons 2종.
 * @animation — 왼쪽은 따뜻한 색감과 부드러운 Slide, 오른쪽은 차가운 색감과 날카로운 Slide.
 * @tokens — COLORS.SECONDARY_LIGHT, COLORS.BG_MUTED, COLORS.TEXT_MAIN, FONTS.SIZE_LG
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const humanAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const aiAnim = spring({
    frame: frame - ANIMATION.STAGGER_MD,
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Human Side */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: humanAnim,
            transform: `translateX(${interpolate(humanAnim, [0, 1], [-ANIMATION.ENTER_X_MD, 0])}px)`,
          }}
        >
          <div
            style={{
              color: COLORS.SECONDARY_BOLD,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              fontWeight: FONTS.WEIGHT_BOLD,
              marginBottom: SPACING.PX_32,
            }}
          >
            사람
          </div>
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.HANDWRITING,
              fontSize: FONTS.SIZE_XL,
              textAlign: 'center',
              lineHeight: FONTS.LEADING_LOOSE,
            }}
          >
            역사, 감정, 몸으로<br />
            이해하는 전쟁
          </div>
        </div>

        {/* AI Side */}
        <div
          style={{
            flex: 1,
            backgroundColor: COLORS.BG_MUTED,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: aiAnim,
            transform: `translateX(${interpolate(aiAnim, [0, 1], [ANIMATION.ENTER_X_MD, 0])}px)`,
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_SUB,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              fontWeight: FONTS.WEIGHT_BOLD,
              marginBottom: SPACING.PX_32,
            }}
          >
            AI 사령관
          </div>
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.MONO,
              fontSize: FONTS.SIZE_XL,
              textAlign: 'center',
              lineHeight: FONTS.LEADING_TIGHT,
            }}
          >
            "목표 달성에 가장<br />
            효율적인 옵션"
          </div>
        </div>
      </div>

      {/* Center Line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '10%',
          bottom: '25%',
          width: SPACING.BORDER_THICK,
          backgroundColor: COLORS.STROKE_STRONG,
          transform: `translateX(-50%) scaleY(${lineAnim})`,
          transformOrigin: 'top',
        }}
      />
    </AbsoluteFill>
  );
};

/** [Scene 8]
 * @narrative — 도덕적 고뇌와 망설임이 배제된 채 오직 '최적화'라는 결과로 핵을 선택하는 차가운 논리 강조.
 * @layout — 다크 모드 배경(BG_DARKEST) 위에 '최적화'라는 핵심 단어를 거대하게 배치.
 * @elements — '도덕적 고뇌', '망설임' (취소선), '최적화' (메인 강조).
 * @animation — 고뇌와 망설임에 취소선이 그어지며 사라지고, '최적화' 텍스트가 강렬하게 팝업.
 * @tokens — COLORS.BG_DARKEST, COLORS.STATE_ERROR_FG, COLORS.PRIMARY, FONTS.SIZE_3XL
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textAnim = spring({
    frame: frame - 20,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const finalAnim = spring({
    frame: frame - 60,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ paddingBottom: 150, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Labels & Final Result */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: SPACING.PX_48,
              opacity: textAnim,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: SPACING.PX_80,
              }}
            >
              {['도덕적 고뇌', '망설임'].map((text, i) => {
                const strikeProgress = interpolate(frame, [30 + i * 15, 50 + i * 15], [0, 1], {
                  extrapolateRight: 'clamp',
                  extrapolateLeft: 'clamp',
                });
                return (
                  <div
                    key={text}
                    style={{
                      position: 'relative',
                      color: COLORS.TEXT_SUB,
                      fontFamily: FONTS.PRIMARY,
                      fontSize: FONTS.SIZE_LG,
                      fontWeight: FONTS.WEIGHT_MEDIUM,
                      opacity: interpolate(strikeProgress, [0, 1], [1, 0.4]),
                    }}
                  >
                    {text}
                  </div>
                );
              })}
            </div>
            
            <div
              style={{
                marginTop: SPACING.PX_64,
                opacity: finalAnim,
                transform: `scale(${interpolate(finalAnim, [0, 1], [0.8, 1])})`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: COLORS.PRIMARY,
                  fontFamily: FONTS.PRIMARY,
                  fontSize: FONTS.SIZE_3XL,
                  fontWeight: FONTS.WEIGHT_EXTRABOLD,
                  textShadow: `0 0 30px rgba(232, 168, 124, 0.3)`,
                  letterSpacing: 8,
                  lineHeight: 1,
                }}
              >
                최적화
              </div>
              <div
                style={{
                  color: COLORS.TEXT_ON_DARK,
                  fontFamily: FONTS.PRIMARY,
                  fontSize: FONTS.SIZE_XL,
                  marginTop: SPACING.PX_32,
                  fontWeight: FONTS.WEIGHT_BOLD,
                  opacity: 0.8,
                }}
              >
                의 결과로 핵을 선택하는 겁니다
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 9]
 * @narrative — 영상 초반에 언급했던 168명의 아이들 이야기를 다시 상기시켜 감정적 연결 고리 형성.
 * @layout — 중앙에 학교를 상징하는 미니멀한 드로잉 요소 배치.
 * @elements — 학교 스케치 요소 (도형 기반), '그 학교 기억하시나요' 문구.
 * @animation — 학교 요소가 펜으로 그려지듯 DrawLine 효과와 함께 등장. 텍스트는 부드러운 페이드 인.
 * @tokens — COLORS.TEXT_MAIN, COLORS.STROKE_INK, FONTS.SIZE_LG
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const textFade = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
        }}
      >
        <div style={{ position: 'relative', width: 200, height: 200, marginBottom: SPACING.PX_48 }}>
          {/* Roof */}
          <div
            style={{
              width: 200,
              height: SPACING.BORDER_THICK,
              backgroundColor: COLORS.STROKE_INK,
              transform: `scaleX(${iconAnim})`,
              transformOrigin: 'left',
            }}
          />
          {/* Walls */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: SPACING.BORDER_THICK,
              height: 150,
              backgroundColor: COLORS.STROKE_INK,
              transform: `scaleY(${iconAnim})`,
              transformOrigin: 'top',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: SPACING.BORDER_THICK,
              height: 150,
              backgroundColor: COLORS.STROKE_INK,
              transform: `scaleY(${iconAnim})`,
              transformOrigin: 'top',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 50,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 80,
              border: `${SPACING.BORDER_THICK}px solid ${COLORS.STROKE_INK}`,
              borderBottom: 'none',
              opacity: iconAnim,
            }}
          />
        </div>
        <div
          style={{
            opacity: textFade,
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            fontWeight: FONTS.WEIGHT_MEDIUM,
          }}
        >
          그 학교 기억하시나요.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 10]
 * @narrative — '168명의 아이들'이라는 숫자를 시각적으로 극대화하여 AI 결정의 무게감을 상기.
 * @layout — 화면 중앙에 '168' 숫자를 거대하게 배치.
 * @elements — '168' 숫자, '명의 아이들' 보조 텍스트.
 * @animation — 숫자가 잉크로 번지듯 서서히 scale up 하며 등장.
 * @tokens — COLORS.PRIMARY_BOLD, COLORS.TEXT_MAIN, FONTS.SIZE_4XL, FONTS.SIZE_2XL
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_HEAVY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
        }}
      >
        <div
          style={{
            opacity: numAnim,
            transform: `scale(${interpolate(numAnim, [0, 1], [0.9, 1.2])})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              color: COLORS.PRIMARY_BOLD,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_4XL,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              lineHeight: 1,
            }}
          >
            168
          </div>
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              marginTop: -SPACING.PX_16,
            }}
          >
            명의 아이들.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 11]
 * @narrative — AI의 결정권이 커지고 있음을 경고하며, 시뮬레이션의 핵 선택 결과를 재강조.
 * @layout — 중앙의 AI 코어를 중심으로 '결정', '관여', '핵 선택' 키워드가 순차적으로 원형 배치.
 * @elements — AI 코어 (도형), 각 키워드 텍스트 뱃지.
 * @animation — 코어가 Wobble 효과와 함께 고동치고, 키워드들이 밖으로 튕겨 나오듯 등장.
 * @tokens — COLORS.PRIMARY, COLORS.TEXT_MAIN, COLORS.STROKE_STRONG, FONTS.SIZE_LG
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const coreAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  const keywords = ['결정', '관여', '핵 선택'];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
        }}
      >
        {/* AI Core */}
        <Wobble
          style={{
            width: 200,
            height: 200,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: SPACING.RADIUS_XL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: coreAnim,
            transform: `scale(${coreAnim})`,
            zIndex: 2,
            boxShadow: EFFECTS.SHADOW_PRIMARY,
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_ON_DARK,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              fontWeight: FONTS.WEIGHT_BOLD,
            }}
          >
            AI
          </div>
        </Wobble>

        {/* Radial Keywords */}
        {keywords.map((word, i) => {
          const angle = (i * 120 - 90) * (Math.PI / 180);
          const distance = 300;
          const anim = spring({
            frame: frame - (i + 1) * ANIMATION.STAGGER_LG,
            fps,
            config: ANIMATION.SPRING_GENTLE,
          });

          return (
            <div
              key={word}
              style={{
                position: 'absolute',
                opacity: anim,
                transform: `translate(${Math.cos(angle) * distance * anim}px, ${
                  Math.sin(angle) * distance * anim
                }px)`,
                backgroundColor: COLORS.BG_SURFACE,
                border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_STRONG}`,
                padding: `${SPACING.PX_8}px ${SPACING.PX_24}px`,
                borderRadius: SPACING.RADIUS_PILL,
                boxShadow: EFFECTS.SHADOW_SM,
              }}
            >
              <span
                style={{
                  color: COLORS.TEXT_MAIN,
                  fontFamily: FONTS.PRIMARY,
                  fontSize: FONTS.SIZE_MD,
                  fontWeight: FONTS.WEIGHT_BOLD,
                }}
              >
                {word}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 12]
 * @narrative — AI를 무작정 두려워하기보다 정확히 알고 공부해야 한다는 긍정적 대안 제시.
 * @layout — 중앙 집중형 레이아웃. 하단에 '지식'을 상징하는 심플한 드로잉 배치.
 * @elements — 책/돋보기 드로잉, '알고 공부해야 하는 이유' 메인 문구.
 * @animation — 드로잉이 아래서 위로 spring 등장, 텍스트는 정갈하게 배치됨.
 * @tokens — COLORS.SECONDARY_DARK, COLORS.TEXT_MAIN, FONTS.SIZE_XL, FONTS.SIZE_LG
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const drawingAnim = spring({
    frame: frame - ANIMATION.STAGGER_MD,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            opacity: textAnim,
            transform: `translateY(${interpolate(textAnim, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`,
            marginBottom: SPACING.PX_80,
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              lineHeight: FONTS.LEADING_SNUG,
            }}
          >
            똑바로 알고 공부해야 하는 이유
          </div>
        </div>

        <div
          style={{
            opacity: drawingAnim,
            transform: `translateY(${interpolate(drawingAnim, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`,
          }}
        >
          <Wobble>
            <Outro_EducationIcon size={300} />
          </Wobble>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 13]
 * @narrative — 무지한 채로 남겨지면 거대한 흐름에 휩쓸리는 엑스트라가 될 수 있다는 위기감 전달.
 * @layout — 여러 개의 심플한 인물 형체가 무질서하게 배치된 후 한쪽으로 휩쓸리는 연출.
 * @elements — 엑스트라 인물 스케치(여러 개), '휩쓸려 갈 수 있으니까요' 문구.
 * @animation — 인물들이 Wobble 효과로 흔들리다 특정 방향으로 일제히 이동(Slide). 텍스트는 흔들리며 등장.
 * @tokens — COLORS.TEXT_SUB, COLORS.STATE_WARN_FG, FONTS.SIZE_LG
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sweepAnim = interpolate(frame, [20, 100], [-200, 1920 + 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textAnim = spring({
    frame: frame - 40,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{ flex: 1, paddingBottom: 150, overflow: 'hidden', position: 'relative' }}>
        {/* Figures */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: sweepAnim + (i % 5) * 100 - (Math.floor(i / 5) * 50),
              top: 200 + (i % 3) * 200 + (Math.sin(frame / 10 + i) * 20),
              opacity: 0.4,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.TEXT_SUB}`,
              }}
            />
            <div
              style={{
                width: 2,
                height: 60,
                backgroundColor: COLORS.TEXT_SUB,
                margin: '0 auto',
              }}
            />
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            top: '45%',
            opacity: textAnim,
            transform: `scale(${textAnim})`,
          }}
        >
          <Wobble>
            <div
              style={{
                color: COLORS.STATE_WARN_FG,
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_XL,
                fontWeight: FONTS.WEIGHT_BOLD,
                backgroundColor: COLORS.STATE_WARN_BG,
                display: 'inline-block',
                padding: `${SPACING.PX_16}px ${SPACING.PX_48}px`,
                borderRadius: SPACING.RADIUS_MD,
                boxShadow: EFFECTS.SHADOW_MD,
              }}
            >
              휩쓸려 갈 수 있으니까요.
            </div>
          </Wobble>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 14]
 * @narrative — 정중한 마무리 인사와 함께 구독을 요청하여 채널 참여 유도.
 * @layout — 중앙에 대담한 '구독' 버튼 스타일의 레이아웃 배치.
 * @elements — '구독' 버튼 뱃지, '꾹 눌러주세요' 안내 문구.
 * @animation — 버튼이 spring Bouncy하게 튀어 오르며 강조됨. 텍스트는 리드미컬하게 등장.
 * @tokens — COLORS.PRIMARY_BOLD, COLORS.PRIMARY_LIGHT, COLORS.TEXT_ON_PRIMARY, FONTS.SIZE_2XL
 */
const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buttonAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  const textAnim = spring({
    frame: frame - ANIMATION.STAGGER_LG,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
        }}
      >
        <div
          style={{
            opacity: buttonAnim,
            transform: `scale(${buttonAnim})`,
            backgroundColor: COLORS.PRIMARY_BOLD,
            padding: `${SPACING.PX_32}px ${SPACING.PX_96}px`,
            borderRadius: SPACING.RADIUS_XL,
            boxShadow: EFFECTS.SHADOW_PRIMARY,
            marginBottom: SPACING.PX_64,
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              color: COLORS.TEXT_ON_PRIMARY,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              letterSpacing: SPACING.PX_4,
            }}
          >
            구독
          </span>
        </div>
        <div
          style={{
            opacity: textAnim,
            transform: `translateY(${interpolate(textAnim, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              fontWeight: FONTS.WEIGHT_BOLD,
            }}
          >
            오늘 제 얘기가 조금이라도 와닿으셨다면<br />
            구독 한번 꾹 눌러주세요.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 15]
 * @narrative — 시청자에게 질문을 던지기 전, 댓글 참여를 유도하여 상호작용 극대화.
 * @layout — 중앙에 말풍선 아이콘을 배치하고, 주변에 참여를 권유하는 문구 나열.
 * @elements — 말풍선 드로잉 요소, '댓글로 하나만 남겨주세요' 안내 문구.
 * @animation — 말풍선이 scale up 되며 톡 튀어나옴. 문구는 아래에서 위로 정갈하게 등장.
 * @tokens — COLORS.SECONDARY_SOFT, COLORS.SECONDARY_BOLD, COLORS.TEXT_MAIN, FONTS.SIZE_LG
 */
const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bubbleAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  const textAnim = spring({
    frame: frame - ANIMATION.STAGGER_MD,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 150,
        }}
      >
        <div
          style={{
            width: 180,
            height: 140,
            backgroundColor: COLORS.SECONDARY_SOFT,
            borderRadius: SPACING.RADIUS_LG,
            position: 'relative',
            opacity: bubbleAnim,
            transform: `scale(${bubbleAnim}) rotate(${interpolate(bubbleAnim, [0, 1], [-10, 0])}deg)`,
            marginBottom: SPACING.PX_48,
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: -20,
              left: 40,
              width: 0,
              height: 0,
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderTop: `20px solid ${COLORS.SECONDARY_SOFT}`,
            }}
          />
        </div>
        <div
          style={{
            opacity: textAnim,
            transform: `translateY(${interpolate(textAnim, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              fontWeight: FONTS.WEIGHT_BOLD,
            }}
          >
            영상 끄기 전에<br />
            댓글로 이거 하나만 남겨주세요.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** [Scene 16]
 * @narrative — 최종적인 질문을 던지며 영상의 여운을 남기고 생각을 유도.
 * @layout — 화면을 이분할하여 '사람 사령관'과 'AI 사령관'을 대비시키고 중앙에 큰 물음표 배치.
 * @elements — 사람/AI 사령관 텍스트, 중앙 대형 물음표(?), '누구를 믿을 것인가?' 문구.
 * @animation — 양쪽 텍스트가 슬라이드 인 되고, 물음표가 STATE_ERROR_FG 컬러로 강하게 팝업.
 * @tokens — COLORS.TEXT_MAIN, COLORS.STATE_ERROR_FG, COLORS.BG_DARK, FONTS.SIZE_3XL, FONTS.SIZE_XL
 */
const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgAnim = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const questionAnim = spring({
    frame: frame - 45,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Human Commander */}
        <div
          style={{
            flex: 1,
            backgroundColor: COLORS.BG_BASE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: SPACING.PX_48,
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              opacity: bgAnim,
              transform: `translateX(${interpolate(bgAnim, [0, 1], [-100, 0])}px)`,
            }}
          >
            사람 사령관
          </div>
        </div>

        {/* AI Commander */}
        <div
          style={{
            flex: 1,
            backgroundColor: COLORS.BG_DARK,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: SPACING.PX_48,
            transform: `translateX(${interpolate(bgAnim, [0, 1], [100, 0])}%)`,
            opacity: bgAnim,
          }}
        >
          <div
            style={{
              color: COLORS.TEXT_ON_DARK,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_BOLD,
            }}
          >
            AI 사령관
          </div>
        </div>
      </div>

      {/* Big Question Mark */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${questionAnim})`,
          opacity: questionAnim,
          zIndex: 10,
        }}
      >
        <div
          style={{
            color: COLORS.STATE_ERROR_FG,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_4XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            textShadow: EFFECTS.SHADOW_LG,
          }}
        >
          ?
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 200,
          width: '100%',
          textAlign: 'center',
          opacity: questionAnim,
        }}
      >
        <div
          style={{
            color: COLORS.TEXT_MAIN,
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_XL,
            fontWeight: FONTS.WEIGHT_BOLD,
            backgroundColor: COLORS.BG_SURFACE,
            padding: `${SPACING.PX_16}px ${SPACING.PX_48}px`,
            borderRadius: SPACING.RADIUS_PILL,
            display: 'inline-block',
            boxShadow: EFFECTS.SHADOW_MD,
            border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_STRONG}`,
          }}
        >
          당신은 누구를 믿겠습니까?
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={142}>
        <Scene1 />
      </Sequence>
      <Sequence from={142} durationInFrames={190}>
        <Scene2 />
      </Sequence>
      <Sequence from={332} durationInFrames={166}>
        <Scene3 />
      </Sequence>
      <Sequence from={498} durationInFrames={283}>
        <Scene4 />
      </Sequence>
      <Sequence from={781} durationInFrames={257}>
        <Scene5 />
      </Sequence>
      <Sequence from={1038} durationInFrames={299}>
        <Scene6 />
      </Sequence>
      <Sequence from={1337} durationInFrames={245}>
        <Scene7 />
      </Sequence>
      <Sequence from={1582} durationInFrames={166}>
        <Scene8 />
      </Sequence>
      <Sequence from={1748} durationInFrames={72}>
        <Scene9 />
      </Sequence>
      <Sequence from={1820} durationInFrames={62}>
        <Scene10 />
      </Sequence>
      <Sequence from={1882} durationInFrames={185}>
        <Scene11 />
      </Sequence>
      <Sequence from={2067} durationInFrames={201}>
        <Scene12 />
      </Sequence>
      <Sequence from={2268} durationInFrames={133}>
        <Scene13 />
      </Sequence>
      <Sequence from={2401} durationInFrames={217}>
        <Scene14 />
      </Sequence>
      <Sequence from={2618} durationInFrames={103}>
        <Scene15 />
      </Sequence>
      <Sequence from={2721} durationInFrames={197}>
        <Scene16 />
      </Sequence>
    </AbsoluteFill>
  );
};
