import React from 'react';
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { COLORS, SPACING, EFFECTS, FONTS, ANIMATION } from '../theme';
import { GridBackground } from '../components/GridBackground';
import { DataNode } from '../components/DataNode';
import { ConnectionLine } from '../components/ConnectionLine';

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 그렇다면 실제 현장에서는 어떤 변화가 일어나고 있을까요?
 * 단어 등장 타이밍: "그렇다면": 1f, "실제": 32f, "현장에서는": 44f, "어떤": 81f, "변화가": 97f, "일어나고": 118f, "있을까요?": 147f
 * 비주얼 컨셉: 배경에 미세한 전기 신호가 흐르는 인포그래픽 보드가 나타납니다. '현장'을 상징하는 추상적인 개발 워크스테이션 노드들이 활성화되며, 질문을 던지듯 텍스트가 순차적으로 집중 배치됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wordSprings = [
    spring({ frame: frame - 1, fps, config: ANIMATION.SPRING_SNAPPY }),
    spring({ frame: frame - 32, fps, config: ANIMATION.SPRING_SNAPPY }),
    spring({ frame: frame - 44, fps, config: ANIMATION.SPRING_SNAPPY }),
    spring({ frame: frame - 81, fps, config: ANIMATION.SPRING_SNAPPY }),
    spring({ frame: frame - 97, fps, config: ANIMATION.SPRING_SNAPPY }),
    spring({ frame: frame - 118, fps, config: ANIMATION.SPRING_SNAPPY }),
    spring({ frame: frame - 147, fps, config: ANIMATION.SPRING_SNAPPY }),
  ];

  const words = ["그렇다면", "실제", "현장에서는", "어떤", "변화가", "일어나고", "있을까요?"];

  const nodeSpring1 = spring({ frame: frame - 10, fps, config: ANIMATION.SPRING_GENTLE });
  const nodeSpring2 = spring({ frame: frame - 25, fps, config: ANIMATION.SPRING_GENTLE });
  const nodeSpring3 = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, overflow: 'hidden' }}>
      <GridBackground color={COLORS.PRIMARY_DIM} speed={0.5} opacity={0.2} spacing={100} />
      
      {/* Background Graphic: Workstation Nodes */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', bottom: 150, top: 0 }}>
        <div style={{ position: 'relative', width: 600, height: 400 }}>
          <ConnectionLine 
            points={[[300, 200], [150, 100]]} 
            color={COLORS.PRIMARY} 
            progress={nodeSpring2} 
            isFlowing={true} 
            opacity={0.3} 
          />
          <ConnectionLine 
            points={[[300, 200], [450, 100]]} 
            color={COLORS.SECONDARY} 
            progress={nodeSpring3} 
            isFlowing={true} 
            opacity={0.3} 
          />
          
          {/* Center Main Node */}
          <div style={{ position: 'absolute', top: 200, left: 300, transform: `translate(-50%, -50%) scale(${nodeSpring1})` }}>
            <DataNode color={COLORS.PRIMARY} size={120} type="hexagon" glowColor={COLORS.PRIMARY_GLOW} label="CORE" />
          </div>
          
          {/* Side Nodes */}
          <div style={{ position: 'absolute', top: 100, left: 150, transform: `translate(-50%, -50%) scale(${nodeSpring2})` }}>
            <DataNode color={COLORS.TEXT_MAIN} size={60} type="square" glowColor={COLORS.PRIMARY_DIM} />
          </div>
          <div style={{ position: 'absolute', top: 100, left: 450, transform: `translate(-50%, -50%) scale(${nodeSpring3})` }}>
            <DataNode color={COLORS.SECONDARY} size={60} type="square" glowColor={COLORS.SECONDARY_DIM} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Typography container */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: '10%' }}>
        <div style={{
          display: 'flex', gap: SPACING.PX_24, flexWrap: 'wrap', 
          width: '80%', justifyContent: 'center'
        }}>
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                fontFamily: FONTS.PRIMARY,
                fontWeight: FONTS.WEIGHT_BOLD,
                fontSize: FONTS.SIZE_LG,
                color: i === 1 || i === 2 ? COLORS.PRIMARY : COLORS.TEXT_MAIN,
                opacity: wordSprings[i],
                transform: `translateY(${interpolate(wordSprings[i], [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px) scale(${interpolate(wordSprings[i], [0, 1], [0.9, 1])})`,
                textShadow: EFFECTS.GLOW_TEXT_SM,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 막연한 기대감이 아닌, 실제 데이터를 바탕으로 AI 도입의 극적인 효과를 살펴보겠습니다.
 * 단어 등장 타이밍: "막연한": 188f, "기대감이": 245f, "아닌,": 286f, "실제": 317f, "데이터를": 349f, "바탕으로": 385f, "AI": 435f, "도입의": 443f, "극적인": 460f, "효과를": 485f, "살펴보겠습니다.": 511f
 * 비주얼 컨셉: 안개 같은 효과가 걷히며 선명한 디지털 대시보드가 로드됩니다. '실제 데이터' 등장 시 수치형 막대 그래프가 솟아오르며, AI 도입 시점이 타임라인 선상에서 강조되는 연출을 시도합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wordTimings = [0, 57, 98, 129, 161, 197, 247, 255, 272, 297, 323];
  const words = ["막연한", "기대감이", "아닌,", "실제", "데이터를", "바탕으로", "AI", "도입의", "극적인", "효과를", "살펴보겠습니다."];
  const wordSprings = wordTimings.map(t => spring({ frame: frame - t, fps, config: ANIMATION.SPRING_SNAPPY }));

  const dashboardSlide = spring({ frame: frame - 30, fps, config: ANIMATION.SPRING_HEAVY });
  const dashboardOpacity = interpolate(dashboardSlide, [0, 1], [0, 1]);

  const barStartFrame = 129;
  const bar1 = spring({ frame: frame - barStartFrame, fps, config: ANIMATION.SPRING_SNAPPY });
  const bar2 = spring({ frame: frame - barStartFrame - 5, fps, config: ANIMATION.SPRING_SNAPPY });
  const bar3 = spring({ frame: frame - barStartFrame - 10, fps, config: ANIMATION.SPRING_SNAPPY });
  const bar4 = spring({ frame: frame - barStartFrame - 15, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, overflow: 'hidden' }}>
      <GridBackground color={COLORS.PRIMARY_DIM} speed={0.2} opacity={0.1} />

      {/* Typography */}
      <AbsoluteFill style={{ padding: SPACING.PX_64, top: SPACING.PX_40 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.PX_16, maxWidth: '80%' }}>
          {words.map((w, i) => (
            <span key={i} style={{
              fontFamily: FONTS.PRIMARY,
              fontWeight: i >= 3 && i <= 4 ? FONTS.WEIGHT_EXTRABOLD : FONTS.WEIGHT_MEDIUM,
              fontSize: FONTS.SIZE_LG,
              color: i >= 3 && i <= 4 ? COLORS.PRIMARY : (i >= 6 ? COLORS.TEXT_MAIN : COLORS.TEXT_MUTED),
              opacity: wordSprings[i],
              transform: `translateY(${interpolate(wordSprings[i], [0, 1], [10, 0])}px)`,
            }}>
              {w}
            </span>
          ))}
        </div>
      </AbsoluteFill>

      {/* Digital Dashboard & Bar Chart */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', bottom: 200 }}>
        <div style={{ 
          width: 800, height: 400, 
          backgroundColor: COLORS.BG_SURFACE, 
          borderRadius: SPACING.RADIUS_LG,
          border: `1px solid ${COLORS.BORDER}`,
          opacity: dashboardOpacity,
          transform: `translateY(${interpolate(dashboardSlide, [0, 1], [100, 0])}px)`,
          boxShadow: EFFECTS.SHADOW_LG,
          display: 'flex', flexDirection: 'column',
          padding: SPACING.PX_32,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Dashboard Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${COLORS.BORDER}`, paddingBottom: SPACING.PX_16 }}>
            <span style={{ color: COLORS.TEXT_MUTED, fontFamily: FONTS.MONO }}>PERFORMANCE_METRICS</span>
            <span style={{ color: COLORS.PRIMARY, fontFamily: FONTS.MONO }}>LIVE</span>
          </div>
          
          {/* Bars area */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', flex: 1, marginTop: SPACING.PX_32 }}>
            {[bar1, bar2, bar3, bar4].map((b, i) => (
              <div key={i} style={{
                width: 80,
                height: `${interpolate(b, [0, 1], [0, i === 3 ? 90 : 30 + i * 15])}%`,
                backgroundColor: i === 3 ? COLORS.PRIMARY : COLORS.TEXT_DISABLED,
                borderRadius: `${SPACING.RADIUS_SM}px ${SPACING.RADIUS_SM}px 0 0`,
                position: 'relative',
                boxShadow: i === 3 ? EFFECTS.GLOW_SM : 'none',
              }}>
                {i === 3 && (
                  <div style={{
                    position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
                    fontFamily: FONTS.MONO, color: COLORS.PRIMARY, fontSize: FONTS.SIZE_SM,
                    opacity: b
                  }}>
                    AI 도입
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 실제로 최근 한 연구에 따르면, AI 코딩 어시스턴트를 도입한
 * 단어 등장 타이밍: "실제로": 587f, "최근": 634f, "한": 676f, "연구에": 680f, "따르면,": 727f, "AI": 776f, "코딩": 782f, "어시스턴트를": 803f, "도입한": 863f
 * 비주얼 컨셉: 논문의 레이아웃을 추상화한 기하학적인 칸막이들이 화면에 펼쳐집니다. 리서치 데이터를 상징하는 작은 스캐닝 라인이 화면을 훑고 지나가며 권위 있는 연구 분위기를 조성합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const offset = 587;
  const wordTimings = [587, 634, 676, 680, 727, 776, 782, 803, 863].map(t => t - offset);
  const words = ["실제로", "최근", "한", "연구에", "따르면,", "AI", "코딩", "어시스턴트를", "도입한"];

  const wordSprings = wordTimings.map(t => spring({ frame: frame - t, fps, config: ANIMATION.SPRING_SNAPPY }));

  const layoutSpring1 = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_HEAVY });
  const layoutSpring2 = spring({ frame: frame - 35, fps, config: ANIMATION.SPRING_HEAVY });
  const layoutSpring3 = spring({ frame: frame - 50, fps, config: ANIMATION.SPRING_HEAVY });

  const scanProgress = interpolate(frame, [80, 180], [0, 100], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const scanOpacity = interpolate(frame, [80, 100, 160, 180], [0, 1, 1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, overflow: 'hidden' }}>
      <GridBackground color={COLORS.TEXT_MUTED} speed={0.1} opacity={0.05} />

      {/* Typography */}
      <AbsoluteFill style={{ padding: SPACING.PX_64, top: SPACING.PX_40 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.PX_16, maxWidth: '90%', justifyContent: 'center' }}>
          {words.map((w, i) => (
            <span key={i} style={{
              fontFamily: FONTS.PRIMARY,
              fontWeight: i >= 5 ? FONTS.WEIGHT_BOLD : FONTS.WEIGHT_REGULAR,
              fontSize: FONTS.SIZE_LG,
              color: i >= 5 ? COLORS.PRIMARY : COLORS.TEXT_MAIN,
              opacity: wordSprings[i],
              transform: `translateX(${interpolate(wordSprings[i], [0, 1], [-10, 0])}px)`,
            }}>
              {w}
            </span>
          ))}
        </div>
      </AbsoluteFill>

      {/* Paper Layout */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', top: 100, bottom: 150 }}>
        <div style={{
          width: 800, height: 400,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: SPACING.PX_16,
          position: 'relative'
        }}>
          <div style={{ 
            backgroundColor: COLORS.BG_SURFACE, 
            border: `1px solid ${COLORS.BORDER}`,
            gridRow: '1 / 3',
            borderRadius: SPACING.RADIUS_MD,
            transform: `scaleY(${layoutSpring1})`,
            transformOrigin: 'top',
            opacity: layoutSpring1,
          }} />
          <div style={{ 
            backgroundColor: COLORS.BG_SURFACE, 
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: SPACING.RADIUS_MD,
            transform: `scaleX(${layoutSpring2})`,
            transformOrigin: 'left',
            opacity: layoutSpring2,
          }} />
          <div style={{ 
            backgroundColor: COLORS.BG_SURFACE, 
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: SPACING.RADIUS_MD,
            transform: `scaleX(${layoutSpring3})`,
            transformOrigin: 'left',
            opacity: layoutSpring3,
          }} />
          
          {/* Scanning Line */}
          <AbsoluteFill style={{ opacity: scanOpacity, zIndex: 10 }}>
            <div style={{
              position: 'absolute',
              top: `${scanProgress}%`,
              left: 0, right: 0,
              height: 2,
              backgroundColor: COLORS.SECONDARY,
              boxShadow: EFFECTS.GLOW_SECONDARY
            }} />
          </AbsoluteFill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 조직의 개발 생산성은 무려 55%나 향상되었습니다.
 * 단어 등장 타이밍: "조직의": 894f, "개발": 925f, "생산성은": 945f, "무려": 986f, "55%나": 1006f, "향상되었습니다.": 1040f
 * 비주얼 컨셉: 거대한 카운터 넘버 '55%'가 화면 정중앙에 강렬하게 등장합니다. 브랜드 블루 컬러의 에너지가 넘버 주변을 감싸며 전방으로 확장되는 파장 모션을 연출합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Large 55% Counter Animation */}
      {/* TODO: Implement Expanding Wave Motion in Primary Color */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 반복적인 보일러플레이트 작성 시간이 획기적으로 줄어든 덕분이죠.
 * 단어 등장 타이밍: "반복적인": 1133f, "보일러플레이트": 1183f, "작성": 1246f, "시간이": 1264f, "획기적으로": 1294f, "줄어든": 1346f, "덕분이죠.": 1378f
 * 비주얼 컨셉: 동일한 형태의 사각형(보일러플레이트)들이 무한정 복사되던 흐름이 일시에 멈추고, 단 하나의 마스터 블록으로 압축되는 압축 모션을 보여줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Boilerplate Replication Stop and Master Block Compression */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 개발자들의 업무 시간 분배도 완전히 달라졌습니다.
 * 단어 등장 타이밍: "개발자들의": 1430f, "업무": 1475f, "시간": 1484f, "분배도": 1499f, "완전히": 1522f, "달라졌습니다.": 1550f
 * 비주얼 컨셉: 파이 차트 혹은 도넛 차트 형태의 UI 컴포넌트가 분해되고, 각 색상별 영역이 재조정되며 획기적인 '비율 변화'를 정적으로 시각화합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Deconstructing and Realigning Chart Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 단순 반복 작업에 쏟는 시간은 80% 감소한 반면,
 * 단어 등장 타이밍: "단순": 1727f, "반복": 1748f, "작업에": 1771f, "쏟는": 1808f, "시간은": 1825f, "80%": 1859f, "감소한": 1884f, "반면,": 1916f
 * 비주얼 컨셉: 80%를 나타내는 거대한 영역이 위에서 아래로 가라앉으며 소멸하고, 바닥에 하강 기류를 나타내는 화살표 아이콘(직선형)이 배치됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Fading 80% Area and Descending Arrow Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 창의적인 아키텍처 설계와 비즈니스 로직 고민에 쏟는 시간은 3배 이상 늘어났습니다.
 * 단어 등장 타이밍: "창의적인": 1955f, "아키텍처": 1990f, "설계와": 2031f, "비즈니스": 2056f, "로직": 2096f, "고민에": 2113f, "쏟는": 2142f, "시간은": 2164f, "3배": 2189f, "이상": 2224f, "늘어났습니다.": 2229f
 * 비주얼 컨셉: 반대로 작은 영역이었던 'Creative' 노드가 수직으로 솟구치며 3층으로 증폭되는 대칭적 연출을 보여줍니다. 노드가 상승할 때마다 주위에 데이터 파편들이 화려하게 퍼집니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Rising Creative Node and Amplification Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: AI 도입 전과 후를 비교해 볼까요?
 * 단어 등장 타이밍: "AI": 2298f, "도입": 2306f, "전과": 2332f, "후를": 2357f, "비교해": 2395f, "볼까요?": 2435f
 * 비주얼 컨셉: 화면 정중앙을 가로지르는 수직 스캔 라인이 왼쪽(Before)에서 오른쪽(After)으로 훑으며 배경 테마가 미세하게 변하는 'Before & After' 테마를 설정합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Centered Vertical Scan Line Animation */}
      {/* TODO: Implement Before/After Theme Shift */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 예전에는 공식 문서를 뒤지며 수동으로 타이핑하며 밤을 새우던 작업들이,
 * 단어 등장 타이밍: "예전에는": 2478f, "공식": 2517f, "문서를": 2535f, "뒤지며": 2566f, "수동으로": 2596f, "타이핑하며": 2635f, "밤을": 2684f, "새우던": 2703f, "작업들이,": 2732f
 * 비주얼 컨셉: 복잡한 텍스트 덩어리들이 정돈되지 않은 채 화면 구석구석에 산재해 있고, 구식의 로딩 프로그래스바가 느리게 채워지는 답답한 UI 연출을 보여줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Scattered Text Blocks and Slow Progress Bar Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 이제는 AI의 똑똑한 제안을 검토하고 승인하는 효율적인 프로세스로 전환되었습니다.
 * 단어 등장 타이밍: "이제는": 2779f, "AI의": 2801f, "똑똑한": 2818f, "제안을": 2846f, "검토하고": 2875f, "승인하는": 2914f, "효율적인": 2953f, "프로세스로": 2992f, "전환되었습니다.": 3041f
 * 비주얼 컨셉: 정돈되지 않았던 텍스트들이 일률적인 블록으로 깔끔하게 정렬됩니다. '승인(Approve)' 버튼을 상징하는 세련된 UI 위젯 위로 체크 마크 인터랙션이 발생하며 흐름이 완성됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Unified Block Alignment and Approve UI Interaction */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 버그 발생률 또한 눈에 띄게 줄었습니다.
 * 단어 등장 타이밍: "버그": 3138f, "발생률": 3163f, "또한": 3203f, "눈에": 3234f, "띄게": 3260f, "줄었습니다.": 3281f
 * 비주얼 컨셉: 화면 상단에 떠 있던 붉은색 경고(Warning) 아이콘들이 하나둘씩 화이트 컬러로 변하며 바닥으로 떨어져 사라지는 연출을 시도합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Warning Icon Fading and Dropping Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 실시간 정적 분석과 코드 리뷰를 통해 배포 전
 * 단어 등장 타이밍: "실시간": 3366f, "정적": 3398f, "분석과": 3435f, "코드": 3462f, "리뷰를": 3551f, "통해": 3576f, "배포": 3593f, "전": 3609f
 * 비주얼 컨셉: '실시간'이라는 텍스트 옆에 초단위로 흐르는 디지털 시계가 나타납니다. 코드 스니펫 위로 돋보기 레이저가 지나가며 오류를 필터링하는 듯한 직선 궤적을 연출합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Real-time Digital Clock and Laser Scan Filtering Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 치명적인 오류의 90% 이상을 사전에 차단하며 서비스의 안정성을 크게 높여주고 있습니다.
 * 단어 등장 타이밍: "치명적인": 3629f, "오류의": 3652f, "90%": 3677f, "이상을": 3697f, "사전에": 3723f, "차단하며": 3751f, "서비스의": 3782f, "안정성을": 3816f, "크게": 3850f, "높여주고": 3868f, "있습니다.": 3902f
 * 비주얼 컨셉: 화면 좌우에서 강철 관문이 닫히는 듯한 육중한 기하학적 모션을 연출하여 '차단'을 시각화합니다. 사각형의 '안정성' 지표(Bar)가 꽉 찬 상태로 유지되며 섹션이 신뢰감 있게 마무리됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Steel Gate Shutting Motion and Stability Bar Animation */}
    </AbsoluteFill>
  );
};

export const Body1Sequences: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={188}>
        <Scene1 />
      </Sequence>
      <Sequence from={188} durationInFrames={399}>
        <Scene2 />
      </Sequence>
      <Sequence from={587} durationInFrames={307}>
        <Scene3 />
      </Sequence>
      <Sequence from={894} durationInFrames={239}>
        <Scene4 />
      </Sequence>
      <Sequence from={1133} durationInFrames={297}>
        <Scene5 />
      </Sequence>
      <Sequence from={1430} durationInFrames={297}>
        <Scene6 />
      </Sequence>
      <Sequence from={1727} durationInFrames={228}>
        <Scene7 />
      </Sequence>
      <Sequence from={1955} durationInFrames={343}>
        <Scene8 />
      </Sequence>
      <Sequence from={2298} durationInFrames={180}>
        <Scene9 />
      </Sequence>
      <Sequence from={2478} durationInFrames={301}>
        <Scene10 />
      </Sequence>
      <Sequence from={2779} durationInFrames={359}>
        <Scene11 />
      </Sequence>
      <Sequence from={3138} durationInFrames={228}>
        <Scene12 />
      </Sequence>
      <Sequence from={3366} durationInFrames={263}>
        <Scene13 />
      </Sequence>
      <Sequence from={3629} durationInFrames={399}>
        <Scene14 />
      </Sequence>
    </>
  );
};
