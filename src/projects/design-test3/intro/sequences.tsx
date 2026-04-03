import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig, interpolate, spring, useCurrentFrame } from 'remotion';
import { COLORS, ANIMATION, EFFECTS, FONTS, Z } from '../theme';
import { GridBackground } from '../components/GridBackground';
import { DataNode } from '../components/DataNode';
import { ConnectionLine } from '../components/ConnectionLine';
import { HighTechCodeBlock } from '../components/HighTechCodeBlock';

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 웹 개발의 패러다임이 완전히 바뀌고 있습니다.
 * 단어 등장 타이밍: "웹": 1f, "개발의": 13f, "패러다임이": 25f, "완전히": 57f, "바뀌고": 77f, "있습니다.": 97f
 * 비주얼 컨셉: 어두운 터미널 배경 위로 네온 블루 컬러의 그리드가 빠르게 흐르며 하이테크 분위기를 조성합니다. 중앙에 타이포그래피가 순차적으로 등장하며, 배경의 그리드 간격이 조절되면서 '패러다임의 변화'를 기하학적으로 시각화합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 60], [0, 0.15], {
    extrapolateRight: 'clamp',
  });
  const gridSpacing = interpolate(frame, [0, 136], [120, 60], {
    extrapolateRight: 'clamp',
  });

  const textEntry = spring({
    frame,
    fps: 60,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={gridOpacity} spacing={gridSpacing} speed={2} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: Z.CONTENT,
          transform: `translateY(${interpolate(textEntry, [0, 1], [20, 0])}px)`,
          opacity: textEntry,
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_2XL,
            color: COLORS.TEXT_MAIN,
            fontWeight: FONTS.WEIGHT_BOLD,
            textAlign: 'center',
            textShadow: EFFECTS.GLOW_TEXT_LG,
            letterSpacing: FONTS.TRACKING_TIGHT,
          }}
        >
          웹 개발의 패러다임이
          <br />
          <span style={{ color: COLORS.PRIMARY }}>완전히 바뀌고 있습니다</span>
        </h1>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 과거에는 모든 컴포넌트를 바닥부터 직접 작성해야 했지만,
 * 단어 등장 타이밍: "과거에는": 136f, "모든": 190f, "컴포넌트를": 204f, "바닥부터": 259f, "직접": 310f, "작성해야": 328f, "했지만,": 364f
 * 비주얼 컨셉: 수많은 코드 라인들이 복잡하게 얽혀 있는 추상적인 레이아웃을 보여줍니다. '바닥부터' 텍스트 등장 시 빈 캔버스에 아주 작은 사각형들이 격자 형태로 배치되는 연출을 통해 고전적인 개발 방식을 표현합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  
  // "바닥부터" trigger at 259f (relative 123f)
  const foundationStartTime = 123;

  // Clean, reduced code lines
  const codeBlocks = Array.from({ length: 8 }).map((_, i) => ({
    width: 120 + ((i * 61) % 200),
    indent: i % 3 === 0 ? 0 : 32,
    color: i % 4 === 0 ? COLORS.PRIMARY_MID : COLORS.TEXT_DISABLED,
    delay: i * 3,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.03} />

      {/* Abstract Code Cluster - Simplified */}
      <div style={{ padding: 80, opacity: 0.3 }}>
        {codeBlocks.map((block, i) => {
          const entry = spring({
            frame: frame - block.delay,
            fps: 60,
            config: ANIMATION.SPRING_GENTLE,
          });
          return (
            <div
              key={i}
              style={{
                height: 10,
                width: block.width,
                marginLeft: block.indent,
                backgroundColor: block.color,
                marginBottom: 10,
                borderRadius: 2,
                opacity: entry,
                transform: `translateX(${interpolate(entry, [0, 1], [-10, 0])}px)`,
              }}
            />
          );
        })}
      </div>

      {/* "Foundation" Grid - Minimal (8x4) */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: '10%',
          width: '80%',
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          gap: 12,
        }}
      >
        {Array.from({ length: 32 }).map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const stagger = col * 3 + (3 - row) * 8;
          const pop = spring({
            frame: frame - foundationStartTime - stagger,
            fps: 60,
            config: ANIMATION.SPRING_GENTLE,
          });

          if (pop <= 0) return null;

          return (
            <div
              key={i}
              style={{
                height: 20,
                backgroundColor: COLORS.PRIMARY_DIM,
                border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                borderRadius: 2,
                opacity: pop * 0.8,
                transform: `translateY(${interpolate(pop, [0, 1], [10, 0])}px)`,
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          top: '35%',
          right: 200,
          opacity: interpolate(frame, [foundationStartTime, foundationStartTime + 20], [0, 1]),
          textAlign: 'right',
        }}
      >
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_MAIN, fontWeight: 700 }}>
          바닥부터 직접 구현
        </div>
        <div style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_SM, color: COLORS.PRIMARY, marginTop: 8 }}>
          [ MANUAL_PROCESS ]
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 이제는 AI가 우리의 가장 든든한 페어 프로그래머가 되었습니다.
 * 단어 등장 타이밍: "이제는": 392f, "AI가": 420f, "우리의": 437f, "가장": 463f, "든든한": 481f, "페어": 508f, "프로그래머가": 526f, "되었습니다.": 585f
 * 비주얼 컨셉: 두 개의 사각형 레이아웃이 서로 연결되며 '페어' 계약을 맺는 듯한 로직 라인을 시각화합니다. 한쪽 사각형(AI)에서 반대쪽(개발자)으로 데이터 펄스가 끊임없이 흐르며 협업의 역동성을 보여줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const entry = spring({
    frame,
    fps: 60,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.05} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 150,
          opacity: entry,
        }}
      >
        <DataNode type="rhombus" size={120} color={COLORS.PRIMARY} label="AI" />
        <ConnectionLine
          points={[
            [880, 540],
            [1040, 540],
          ]}
          color={COLORS.PRIMARY}
          isFlowing
          strokeWidth={4}
        />
        <DataNode type="square" size={120} color={COLORS.SECONDARY} label="DEV" />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '65%',
          width: '100%',
          textAlign: 'center',
          fontFamily: FONTS.DISPLAY,
          fontSize: FONTS.SIZE_LG,
          color: COLORS.TEXT_MAIN,
          fontWeight: FONTS.WEIGHT_SEMIBOLD,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp' }),
        }}
      >
        든든한 페어 프로그래머
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 디자인에서 개발로 넘어가는 과정의 병목현상도 눈에 띄게 사라졌습니다.
 * 단어 등장 타이밍: "디자인에서": 647f, "개발로": 714f, "넘어가는": 757f, "과정의": 808f, "병목현상도": 847f, "눈에": 926f, "띄게": 934f, "사라졌습니다.": 949f
 * 비주얼 컨셉: 좁은 통로를 통과하던 데이터 구슬들이 넓은 공간으로 쏟아져 나오는 애니메이션을 통해 '병목현상 해소'를 은유합니다. 피그마 레이어 같은 UI 노드들이 순식간에 코드 블록으로 변환되는 찰나를 기하학적으로 연출합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  const expansionTrigger = 150;
  const expansion = spring({
    frame: frame - expansionTrigger,
    fps: 60,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.03} />

      {/* SVG Container Lines - Simplified */}
      <svg
        width="1920"
        height="1080"
        style={{ position: 'absolute', inset: 0, opacity: 0.3 }}
      >
        <line
          x1="0"
          y1={interpolate(expansion, [0, 1], [480, 200])}
          x2="1920"
          y2={interpolate(expansion, [0, 1], [480, 200])}
          stroke={COLORS.BORDER_PRIMARY}
          strokeWidth={1}
        />
        <line
          x1="0"
          y1={interpolate(expansion, [0, 1], [600, 880])}
          x2="1920"
          y2={interpolate(expansion, [0, 1], [600, 880])}
          stroke={COLORS.BORDER_PRIMARY}
          strokeWidth={1}
        />
      </svg>

      {/* Minimal Flowing Elements (reduced from 12 to 6) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const delay = i * 40;
        const speed = frame > expansionTrigger ? 10 : 4;
        const progress = (frame - delay) * speed;
        const x = progress % 2000;
        
        const yRange = x < 400 ? 80 : interpolate(expansion, [0, 1], [80, 600]);
        const yPos = 540 + (i - 2.5) * (yRange / 6);

        const isTransformed = x > 800;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: yPos,
              transform: 'translate(-50%, -50%)',
              opacity: x > 1800 ? 1 - (x - 1800) / 200 : 1,
            }}
          >
            {isTransformed ? (
              <div
                style={{
                  width: 50,
                  height: 24,
                  backgroundColor: COLORS.BG_ELEVATED,
                  border: `1.5px solid ${COLORS.PRIMARY_MID}`,
                  borderRadius: 1,
                  opacity: interpolate(expansion, [0, 1], [0.4, 0.9]),
                }}
              />
            ) : (
              <DataNode
                type="circle"
                size={20}
                color={COLORS.SECONDARY_DIM}
                isGlowing={false}
              />
            )}
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          top: '20%',
          width: '100%',
          textAlign: 'center',
          fontFamily: FONTS.DISPLAY,
          fontSize: FONTS.SIZE_LG,
          color: COLORS.PRIMARY,
          fontWeight: 800,
          opacity: expansion,
          letterSpacing: 8,
        }}
      >
        Frictionless Flow
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 이제는 스케치 한 장이나 간단한 프롬프트만으로도
 * 단어 등장 타이밍: "이제는": 1003f, "스케치": 1043f, "한": 1091f, "장이나": 1096f, "간단한": 1137f, "프롬프트만으로도": 1175f
 * 비주얼 컨셉: 거친 스케치 라인이 투명한 블록으로 변하며 정교한 UI 컴포넌트의 뼈대를 형성합니다. 프롬프트 타이핑 효과가 나타나며 명령어 라인이 빛의 줄기로 변해 블록들을 채웁니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();

  const transitionTrigger = 100;
  const transition = spring({
    frame: frame - transitionTrigger,
    fps: 60,
    config: ANIMATION.SPRING_GENTLE,
  });

  const codeContent = [
    'const App: React.FC = () => {',
    '  return (',
    '    <Layout>',
    '      <Header />',
    '      <Content />',
    '    </Layout>',
    '  );',
    '};',
  ];

  const width = 800;
  const height = 500;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.03} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'none',
        }}
      >
        {/* Blueprint Sketch (Hidden after transition) */}
        <div
          style={{
            position: 'absolute',
            width,
            height,
            opacity: 1 - transition,
            pointerEvents: transition > 0.5 ? 'none' : 'auto',
          }}
        >
          <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <rect
              width={width}
              height={height}
              fill="none"
              stroke={COLORS.TEXT_DISABLED}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            {/* Skeletal wireframe lines */}
            <line x1="0" y1="40" x2={width} y2="40" stroke={COLORS.TEXT_DISABLED} strokeWidth={1} />
            <line x1="200" y1="40" x2="200" y2={height} stroke={COLORS.TEXT_DISABLED} strokeWidth={1} />
            <rect x="230" y="70" width="540" height="400" stroke={COLORS.TEXT_MUTED} strokeWidth={1} fill="none" rx={4} />
            <rect x="30" y="70" width="140" height="20" stroke={COLORS.TEXT_MUTED} strokeWidth={1} fill="none" rx={2} />
            <rect x="30" y="110" width="140" height="20" stroke={COLORS.TEXT_MUTED} strokeWidth={1} fill="none" rx={2} />
            
            {/* Technical corner marks */}
            {[ [0,0], [width,0], [0,height], [width,height] ].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r={4} fill={COLORS.PRIMARY_DIM} />
            ))}
          </svg>
          <div style={{ position: 'absolute', bottom: -24, left: 0, fontFamily: FONTS.MONO, fontSize: 12, color: COLORS.TEXT_MUTED }}>
            WFT_VER: 0.82-BETA // WIREFRAME_TRANSITION
          </div>
        </div>

        {/* HighTechCodeBlock with BUILT-IN Typing & Cursor */}
        <div style={{ opacity: transition, transform: `translateY(${interpolate(transition, [0, 1], [10, 0])}px)` }}>
          <HighTechCodeBlock
            width={width}
            height={height}
            color={COLORS.PRIMARY}
            title="COMPONENT_FACTORY.TSX"
            content={codeContent}
            startFrame={transitionTrigger}
            typingSpeed={1.5}
            scale={1}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 곧바로 작동하는 프로토타입이 생성되는 마법 같은 일이 일어납니다.
 * 단어 등장 타이밍: "곧바로": 1282f, "작동하는": 1303f, "프로토타입이": 1332f, "생성되는": 1375f, "마법": 1404f, "같은": 1418f, "일이": 1433f, "일어나갑니다.": 1447f
 * 비주얼 컨셉: 정적인 UI 블록에 'Run' 상태를 뜻하는 상태바가 로딩되자마자, 요소들이 실시간으로 상호작용(Hover, Click)하는 듯한 마이크로 애니메이션 피드백을 보여줍니다. 빛나는 파티클이 전체 레이아웃을 휩쓸며 완성되는 과정을 연출합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  const runProgress = spring({
    frame,
    fps: 60,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.05} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 400,
            height: 10,
            backgroundColor: COLORS.BG_ELEVATED,
            borderRadius: 5,
            overflow: 'hidden',
            marginBottom: 40,
            border: `1px solid ${COLORS.BORDER}`,
          }}
        >
          <div
            style={{
              width: `${runProgress * 100}%`,
              height: '100%',
              backgroundColor: COLORS.PRIMARY,
              boxShadow: EFFECTS.GLOW_SM,
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 30 }}>
          {Array.from({ length: 3 }).map((_, i) => {
            const isActive = frame > 100 + i * 20;
            return (
              <DataNode
                key={i}
                type="rhombus"
                size={80}
                color={isActive ? COLORS.PRIMARY : COLORS.TEXT_DISABLED}
                isGlowing={isActive}
                label={isActive ? 'ACTIVE' : 'IDLE'}
              />
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 단순히 코드를 짜주는 것을 넘어, 시스템 아키텍처를 설계하고 최적화 포인트까지 제안합니다.
 * 단어 등장 타이밍: "단순히": 1573f, "코드를": 1606f, "짜주는": 1635f, "것을": 1666f, "넘어,": 1687f, "시스템": 1718f, "아키텍처를": 1735f, "설계하고": 1774f, "최적화": 1811f, "포인트까지": 1834f, "제안합니다.": 1878f
 * 비주얼 컨셉: 평면적인 코드 리스트 위로 입체적(3D feel)인 아키텍처 다이어그램이 떠오릅니다. 데이터 흐름의 비효율적인 구간을 강조(Highlight)하고, AI가 이를 최적화된 경로로 재배치하는 로직 시퀀스를 보여줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  const optimizationTrigger = 150;
  const optimization = spring({
    frame: frame - optimizationTrigger,
    fps: 60,
    config: ANIMATION.SPRING_SNAPPY,
  });

  const entryNode = { x: 960, y: 250, label: 'API_GATEWAY', type: 'rhombus' as const };
  const serviceNodes = [
    { x: 660, y: 450, label: 'AUTH_SVC', type: 'hexagon' as const },
    { x: 960, y: 450, label: 'PAYMENT_SVC', type: 'hexagon' as const },
    { x: 1260, y: 450, label: 'USER_SVC', type: 'hexagon' as const },
  ];
  const dataNodes = [
    { x: 500, y: 700, label: 'REDIS', type: 'circle' as const },
    { x: 820, y: 700, label: 'MONGO_DB', type: 'circle' as const },
    { x: 1100, y: 700, label: 'POSTGRE_SQL', type: 'circle' as const },
    { x: 1420, y: 700, label: 'ELASTIC', type: 'circle' as const },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.03} />

      {/* Connection Lines (Gateway -> Services) */}
      {serviceNodes.map((node, i) => {
        // Jitter before optimization
        const jitterX = Math.sin(frame * 0.1 + i) * 15 * (1 - optimization);
        return (
          <ConnectionLine
            key={`ls-${i}`}
            points={[
              [entryNode.x, entryNode.y],
              [node.x + jitterX, node.y],
            ]}
            color={optimization > 0.5 ? COLORS.PRIMARY : COLORS.SECONDARY_DIM}
            isFlowing
            strokeWidth={2}
            opacity={0.4}
          />
        );
      })}

      {/* Connection Lines (Services -> Data) */}
      {dataNodes.map((dnode, i) => {
        const parentIdx = i % 3;
        const pnode = serviceNodes[parentIdx];
        const jitterX = Math.cos(frame * 0.1 + i) * 20 * (1 - optimization);
        return (
          <ConnectionLine
            key={`sd-${i}`}
            points={[
              [pnode.x + Math.sin(frame * 0.1 + parentIdx) * 15 * (1 - optimization), pnode.y],
              [dnode.x + jitterX, dnode.y],
            ]}
            color={optimization > 0.5 ? COLORS.POSITIVE : COLORS.ACCENT_DIM}
            isFlowing
            strokeWidth={1.5}
            opacity={0.3}
          />
        );
      })}

      {/* Render Entry Node */}
      <div style={{ position: 'absolute', left: entryNode.x, top: entryNode.y, transform: 'translate(-50%, -50%)' }}>
        <DataNode type={entryNode.type} size={100} color={COLORS.PRIMARY} label={entryNode.label} isGlowing />
      </div>

      {/* Render Service Nodes */}
      {serviceNodes.map((node, i) => {
        const jitterX = Math.sin(frame * 0.1 + i) * 15 * (1 - optimization);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: node.x + jitterX,
              top: node.y,
              transform: 'translate(-50%, -50%)',
              opacity: interpolate(frame, [i * 20, i * 20 + 40], [0, 1]),
            }}
          >
            <DataNode type={node.type} size={80} color={COLORS.SECONDARY} label={node.label} />
          </div>
        );
      })}

      {/* Render Data Nodes */}
      {dataNodes.map((node, i) => {
        const jitterX = Math.cos(frame * 0.1 + i) * 20 * (1 - optimization);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: node.x + jitterX,
              top: node.y,
              transform: 'translate(-50%, -50%)',
              opacity: interpolate(frame, [40 + i * 15, 80 + i * 15], [0, 1]),
            }}
          >
            <DataNode type={node.type} size={50} color={COLORS.ACCENT_DIM} label={node.label} />
          </div>
        );
      })}

      {/* Optimization Indicator */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          right: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          opacity: optimization,
        }}
      >
        <div style={{ fontFamily: FONTS.MONO, fontSize: 14, color: COLORS.POSITIVE }}>SYSTEM_STABLE: OK</div>
        <div style={{ fontFamily: FONTS.MONO, fontSize: 14, color: COLORS.PRIMARY }}>LATENCY: 14ms (OPTIMIZED)</div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 마치 수십 년 경력의 시니어 개발자가 항상 내 옆에 앉아 코드를 리뷰해 주는 것과 같죠.
 * 단어 등장 타이밍: "마치": 1921f, "수십": 1946f, "년": 1980f, "경력의": 1984f, "시니어": 2022f, "개발자가": 2065f, "항상": 2112f, "내": 2131f, "옆에": 2149f, "앉아": 2161f, "코드를": 2185f, "리뷰해": 2213f, "주는": 2240f, "것과": 2258f, "같죠.": 2279f
 * 비주얼 컨셉: 코드 에디터 옆에 정교한 '리뷰 위젯' 패널이 슬라이드되어 나타납니다. 시니어의 통찰력을 상징하는 화이트 컬러의 가이드 라인들이 코드의 핵심 로직을 연결하며 신뢰감을 주는 모션을 연출합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.05} />
      <div
        style={{
          padding: 80,
          display: 'flex',
          gap: 40,
        }}
      >
        <HighTechCodeBlock
          width={1200}
          height={700}
          color={COLORS.PRIMARY}
          title="MAIN_MODULE.TSX"
          content={[
            'function main() {',
            '  // Logic review required',
            '  if (input === null) {',
            '    return error;',
            '  }',
            '}',
          ]}
        />
        <div
          style={{
            width: 400,
            backgroundColor: COLORS.BG_SURFACE,
            border: `1.5px solid ${COLORS.BORDER_PRIMARY}`,
            borderRadius: 8,
            padding: 24,
            boxShadow: EFFECTS.SHADOW_LG,
            transform: `translateX(${interpolate(frame, [0, 30], [100, 0], {
              extrapolateRight: 'clamp',
            })}px)`,
            opacity: interpolate(frame, [0, 30], [0, 1]),
          }}
        >
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_MD,
              color: COLORS.POSITIVE,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            AI REVIEW
          </div>
          <p style={{ color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_SM, lineHeight: 1.6 }}>
            이 구간의 중첩된 조건문을
            <br />
            배열 메서드로 최적화할 것을 제안합니다.
          </p>
          <div
            style={{
              marginTop: 20,
              height: 2,
              backgroundColor: COLORS.POSITIVE,
              width: interpolate(frame, [40, 80], [0, 100], { extrapolateRight: 'clamp' }) + '%',
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 이러한 변화는 단순히 개인의 코딩 속도를 높이는 것을 넘어,
 * 단어 등장 타이밍: "이러한": 2314f, "변화는": 2350f, "단순히": 2378f, "개인의": 2411f, "코딩": 2443f, "속도를": 2465f, "높이는": 2497f, "것을": 2530f, "넘어,": 2551f
 * 비주얼 컨셉: 단일 스레드였던 작업 라인이 여러 갈래로 확장되며 전광판의 숫자(속도 데이터)가 급격히 상승하는 UI를 보여줍니다. 스피드감 있는 배경 모션이 적용됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();

  const speedValue = interpolate(frame, [0, 265], [10, 840]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground angle={45} color={COLORS.PRIMARY} opacity={0.05} speed={10} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: FONTS.MONO,
            fontSize: 180,
            color: COLORS.TEXT_MAIN,
            fontWeight: 800,
            fontVariantNumeric: 'tabular-nums',
            textShadow: EFFECTS.GLOW_TEXT_LG,
          }}
        >
          {Math.floor(speedValue)}
          <span style={{ fontSize: 40, color: COLORS.PRIMARY, marginLeft: 20 }}>TPS</span>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 40 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 40,
                backgroundColor: i < (frame / 265) * 20 ? COLORS.PRIMARY : COLORS.BG_ELEVATED,
                boxShadow: i < (frame / 265) * 20 ? EFFECTS.GLOW_SM : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 팀 전체의 애자일한 협업 방식을 근본적으로 재정의하고 있습니다.
 * 단어 등장 타이밍: "팀": 2579f, "전체의": 2587f, "애자일한": 2612f, "협업": 2636f, "방식을": 2651f, "근본적으로": 2673f, "재정의하고": 2710f, "있습니다.": 2746f
 * 비주얼 컨셉: 흩어져 있던 노드들이 '애자일' 루프(Loop)를 형성하며 중앙으로 집결합니다. 팀 전체가 하나의 유기체처럼 움직이는 흐름을 기하학적인 원형 모션으로 시각화합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.05} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative', width: 500, height: 500 }}>
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * (360 / 6) + frame * 0.5) % 360;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 200 + 250;
            const y = Math.sin(rad) * 200 + 250;

            return (
              <DataNode
                key={i}
                type="hexagon"
                size={60}
                color={COLORS.PRIMARY}
                isGlowing={i === 0}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
          <svg width="500" height="500" style={{ position: 'absolute', inset: 0 }}>
            <circle
              cx="250"
              cy="250"
              r="200"
              fill="none"
              stroke={COLORS.PRIMARY_DIM}
              strokeWidth={2}
              strokeDasharray="10 10"
            />
          </svg>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          width: '100%',
          textAlign: 'center',
          fontFamily: FONTS.DISPLAY,
          fontSize: FONTS.SIZE_LG,
          color: COLORS.TEXT_MAIN,
          transform: 'translateY(-50%)',
          letterSpacing: 10,
          fontWeight: 800,
        }}
      >
        AGILE COLLABORATION
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 우리는 더 빠르게 실패하고, 더 빨리 혁신할 수 있게 되었습니다.
 * 단어 등장 타이밍: "우리는": 2792f, "더": 2830f, "빠르게": 2853f, "실패하고,": 2885f, "더": 2938f, "빨리": 2962f, "혁신할": 2965f, "수": 2985f, "있게": 2993f, "되었습니다.": 3009f
 * 비주얼 컨셉: 오류 발생(Red Pulse) 직후 순식간에 보정(Green Pulse)되는 과정을 시각화하여 '빠른 실패와 혁신'의 사이클을 표현합니다. 사이클이 반복될수록 중앙의 코어 오브젝트가 더욱 정교해집니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();

  const isError = frame % 60 < 30;
  const pulseColor = isError ? COLORS.NEGATIVE : COLORS.POSITIVE;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.03} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative' }}>
          <DataNode 
            type="hexagon" 
            size={180} 
            color={pulseColor} 
            isGlowing={!isError} 
            label={isError ? 'STALLING' : 'OPTIMIZING'}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          width: '100%',
          textAlign: 'center',
          fontFamily: FONTS.DISPLAY,
          fontSize: FONTS.SIZE_LG,
          color: pulseColor,
          fontWeight: 800,
          textShadow: `0 0 20px ${pulseColor}`,
        }}
      >
        {isError ? 'FAIL FAST' : 'INNOVATE FASTER'}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 유명한 개발자는 이렇게 말했습니다.
 * 단어 등장 타이밍: "유명한": 3062f, "개발자는": 3092f, "이렇게": 3134f, "말했습니다.": 3167f
 * 비주얼 컨셉: 무대 조명이 켜지는 듯한 연출과 함께 화면 상단에 인용구(Quote) 마크가 로드됩니다. 집중도를 높이기 위해 배경 그리드 노이즈를 잠시 정지시킵니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();

  const spotlightEntry = spring({
    frame,
    fps: 60,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000',
          opacity: interpolate(spotlightEntry, [0, 1], [0, 0.4]),
        }}
      />
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: spotlightEntry,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.DISPLAY,
            fontSize: 120,
            color: COLORS.PRIMARY,
            marginBottom: 20,
            textShadow: EFFECTS.GLOW_MD,
          }}
        >
          &quot;
        </div>
        <div
          style={{
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_XL,
            color: COLORS.TEXT_MAIN,
            fontWeight: 700,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          유명한 개발자는
          <br />
          이렇게 말했습니다.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: "미래의 코딩은 타이핑이 아니라 대화가 될 것이다."
 * 단어 등장 타이밍: "미래의": 3228f, "코딩은": 3253f, "타이핑이": 3284f, "아니라": 3384f, "대화가": 3401f, "될": 3418f, "것이다.": 3422f
 * 비주얼 컨셉: 키보드 입력 애니메이션이 소리 파동(Voice Waveform)의 형태로 변이되는 모핑 기법을 사용합니다. 기계적인 타이핑 사운드 비주얼이 부드러운 유기적 파동으로 바뀌며 '대화'의 의미를 강조합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();

  const points = Array.from({ length: 50 }).map((_, i) => {
    const x = (i / 49) * 1920;
    const y = 540 + Math.sin(frame * 0.2 + i * 0.5) * 100 * Math.sin(frame * 0.05);
    return [x, y] as [number, number];
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.05} />
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ConnectionLine points={points} color={COLORS.PRIMARY} strokeWidth={4} glowintensity={1} />
        <div
          style={{
            marginTop: 200,
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.TEXT_MAIN,
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: 1.5,
            textShadow: EFFECTS.GLOW_TEXT_SM,
          }}
        >
          &quot;미래의 코딩은 타이핑이 아니라
          <br />
          <span style={{ color: COLORS.PRIMARY, fontWeight: 800 }}>대화가 될 것이다.</span>&quot;
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 결국 우리에게 가장 필요한 역량은 타건 속도가 아니라,
 * 단어 등장 타이밍: "결국": 3448f, "우리에게": 3491f, "가장": 3519f, "필요한": 3548f, "역량은": 3578f, "타건": 3621f, "속도가": 3630f, "아니라,": 3652f
 * 비주얼 컨셉: 모니터를 가득 채웠던 데이터 텍스트들이 사라지고, 사용자(개발자)를 상징하는 단일 노드가 화려하게 빛나기 시작합니다. '속도'보다는 '방향'을 상징하는 벡터 화살표가 등장합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  const frame = useCurrentFrame();

  const arrowProgress = spring({
    frame,
    fps: 60,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.03} />
      
      {/* Vertical Content Flow */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 120,
        }}
      >
        {/* Top: Goal Node & Text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_LG,
              color: COLORS.TEXT_MAIN,
              fontWeight: 800,
              opacity: interpolate(frame, [40, 70], [0, 1]),
              textShadow: EFFECTS.GLOW_TEXT_SM,
            }}
          >
            방향을 결정하는 기획력
          </div>
          <DataNode type="hexagon" size={60} color={COLORS.SECONDARY} isGlowing={false} />
        </div>

        {/* Middle: Vertical Directional Arrow */}
        <div style={{ height: 300, position: 'relative' }}>
          <svg width="60" height="300" style={{ overflow: 'visible' }}>
            <path
              d="M 30 300 L 30 20"
              stroke={COLORS.PRIMARY}
              strokeWidth={3}
              strokeDasharray="300"
              strokeDashoffset={interpolate(arrowProgress, [0, 1], [300, 0])}
              markerEnd="url(#arrow-head)"
            />
            <defs>
              <marker
                id="arrow-head"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.PRIMARY} />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Bottom: User Node */}
        <DataNode type="rhombus" size={100} color={COLORS.PRIMARY} isGlowing label="ORCHESTRATOR" />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 15 기획안]
 * 원본 텍스트: 문제를 정의하고 AI를 지휘하는 기획력이 될 것입니다.
 * 단어 등장 타이밍: "문제를": 3676f, "정의하고": 3715f, "AI를": 3744f, "지휘하는": 3799f, "기획력이": 3838f, "될": 3838f, "것입니다.": 3848f
 * 비주얼 컨셉: 지휘자의 지휘봉이 지나가는 궤적을 따라 AI 노드들이 일제히 정렬하며 거대한 시스템 지도를 완성합니다. '기획력' 텍스트가 대미를 장식하며 강렬한 빛을 내뿜으며 씬이 마무리됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene15: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground color={COLORS.PRIMARY} opacity={0.1} spacing={40} speed={4} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: 20,
            opacity: interpolate(frame, [0, 60], [0, 1]),
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <DataNode
              key={i}
              type="circle"
              size={20}
              color={COLORS.PRIMARY}
              isGlowing={Math.random() > 0.8}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 100,
            fontFamily: FONTS.DISPLAY,
            fontSize: 100,
            color: COLORS.TEXT_MAIN,
            fontWeight: 900,
            letterSpacing: 20,
            textShadow: EFFECTS.GLOW_TEXT_LG,
            transform: 'none',
            opacity: interpolate(frame, [100, 120], [0, 1]),
          }}
        >
          기획력의 시대
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const IntroSequences: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={136}>
        <Scene1 />
      </Sequence>
      <Sequence from={136} durationInFrames={256}>
        <Scene2 />
      </Sequence>
      <Sequence from={392} durationInFrames={255}>
        <Scene3 />
      </Sequence>
      <Sequence from={647} durationInFrames={356}>
        <Scene4 />
      </Sequence>
      <Sequence from={1003} durationInFrames={279}>
        <Scene5 />
      </Sequence>
      <Sequence from={1282} durationInFrames={291}>
        <Scene6 />
      </Sequence>
      <Sequence from={1573} durationInFrames={348}>
        <Scene7 />
      </Sequence>
      <Sequence from={1921} durationInFrames={393}>
        <Scene8 />
      </Sequence>
      <Sequence from={2314} durationInFrames={265}>
        <Scene9 />
      </Sequence>
      <Sequence from={2579} durationInFrames={213}>
        <Scene10 />
      </Sequence>
      <Sequence from={2792} durationInFrames={270}>
        <Scene11 />
      </Sequence>
      <Sequence from={3062} durationInFrames={166}>
        <Scene12 />
      </Sequence>
      <Sequence from={3228} durationInFrames={220}>
        <Scene13 />
      </Sequence>
      <Sequence from={3448} durationInFrames={228}>
        <Scene14 />
      </Sequence>
      <Sequence from={3676} durationInFrames={304}>
        <Scene15 />
      </Sequence>
    </>
  );
};
