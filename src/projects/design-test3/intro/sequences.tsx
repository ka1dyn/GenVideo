import React from "react";
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate, interpolateColors } from "remotion";
import { COLORS, FONTS, EFFECTS, ANIMATION } from "../theme";
import { GridBackground } from "../components/GridBackground";
import { DataParticles } from "../components/DataParticles";
import { GlassPanel } from "../components/GlassPanel";
import { CodeSnippet } from "../components/CodeSnippet";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 웹 개발의 패러다임이 완전히 바뀌고 있습니다.
 * 비주얼 컨셉: 어두운 공간에서 PRIMARY 색상의 미세한 그리드 라인이 바닥에 깔리며, 중앙에 타이포그래피가 나타납니다. 글자 주변에 데이터 입자들이 흐르며 동적인 에너지를 표현합니다.
 * 
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 30f): 배경 그리드가 서서히 밝아지며, 텍스트가 Y축 아래에서 위로 부드럽게 spring() 진입합니다.
 * - 단계1 (30f ~ 100f): 텍스트 뒤에 PRIMARY_GLOW 효과가 은은하게 맥동(Pulse)하며, 배경의 그리드 라인이 중앙으로 수렴하는 모션을 취합니다.
 * - 퇴장 (100f ~ 135f): 텍스트가 좌우로 갈라지며 다음 씬의 배경으로 자연스럽게 전환됩니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const pulse = Math.sin(frame / 20) * 0.5 + 0.5;
  const exit = spring({ frame: frame - 100, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground borderColor={COLORS.PRIMARY_DIM} pulse />
      <DataParticles color={COLORS.PRIMARY} count={30} speed={0.5} />
      
      <AbsoluteFill style={{ bottom: 150, justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontSize: FONTS.SIZE_XL,
          fontFamily: FONTS.DISPLAY,
          fontWeight: FONTS.WEIGHT_BOLD,
          color: COLORS.TEXT_MAIN,
          textShadow: EFFECTS.GLOW_TEXT_SM,
          transform: `translateY(${interpolate(entry, [0, 1], [50, 0])}px) scale(${1 + pulse * 0.05})`,
          opacity: interpolate(entry, [0, 1], [0, 1]),
          display: "flex",
          gap: 20
        }}>
          <div style={{ transform: `translateX(${interpolate(exit, [0, 1], [0, -100])}px)`, opacity: 1 - exit }}>웹 개발의</div>
          <div style={{ transform: `translateX(${interpolate(exit, [0, 1], [0, 100])}px)`, opacity: 1 - exit }}>패러다임이</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 과거에는 모든 컴포넌트를 바닥부터 직접 작성해야 했지만, 이제는 AI가 우리의 가장 든든한 페어 프로그래머가 되었습니다.
 * 비주얼 컨셉: 화면 왼쪽에 복잡하게 얽힌 코드 라인들이 수동으로 하나씩 채워지는 레이아웃에서, 오른쪽에서 AI 로직 노드(Node)가 나타나 코드들과 연결되는 시각화를 보여줍니다. '페어 프로그래밍'을 상징하는 두 개의 빛나는 아바타 노드가 중앙에서 결합합니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const manualEntry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const aiEntry = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_SNAPPY });
  const connection = spring({ frame: frame - 100, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <GridBackground borderColor={COLORS.BORDER} />
      
      {/* Manual Code Layer */}
      <div style={{
        position: "absolute",
        left: 100,
        top: "20%",
        opacity: manualEntry,
        transform: `translateX(${interpolate(manualEntry, [0, 1], [-50, 0])}px)`
      }}>
        <div style={{ color: COLORS.TEXT_MUTED, fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_SM, marginBottom: 20 }}>// Manual Components</div>
        <CodeSnippet 
          lines={["function Legacy() {", "  return (", "    <div>", "      Legacy Code", "    </div>", "  );", "}"]} 
          typingSpeed={1}
        />
      </div>

      {/* AI Assistant Node */}
      <div style={{
        position: "absolute",
        right: 150,
        top: "30%",
        opacity: aiEntry,
        transform: `scale(${interpolate(aiEntry, [0, 1], [0.5, 1])})`
      }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: COLORS.BG_SURFACE,
          border: `2px solid ${COLORS.PRIMARY}`,
          boxShadow: EFFECTS.GLOW_MD,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: COLORS.PRIMARY,
          fontSize: FONTS.SIZE_LG,
          fontWeight: FONTS.WEIGHT_BOLD
        }}>
          AI
        </div>
      </div>

      {/* Connection Lines (Abstract) */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
        <line 
          x1={400} y1={400} x2={width - 270} y2={400} 
          stroke={COLORS.PRIMARY} 
          strokeWidth="2" 
          strokeDasharray="10 5"
          strokeDashoffset={-frame * 2}
          opacity={connection}
        />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 디자인에서 개발로 넘어가는 과정의 병목현상도 눈에 띄게 사라졌습니다.
 * 비주얼 컨셉: 'Design' 섹터와 'Development' 섹터 사이를 가로막던 붉은색(NEGATIVE) 장벽이 부드럽게 녹아 없어지며, 두 영역이 하나의 유기적인 파이프라인으로 연결되는 모습을 보여줍니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const entry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const resolved = spring({ frame: frame - 150, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 150,
        width: 4,
        backgroundColor: interpolateColors(resolved, [0, 1], [COLORS.NEGATIVE, COLORS.SECONDARY]),
        transform: `translateX(-50%) scaleY(${entry})`,
        boxShadow: resolved > 0.1 ? EFFECTS.GLOW_SECONDARY : EFFECTS.GLOW_ACCENT,
        borderRadius: 2
      }} />

      <AbsoluteFill style={{ left: 100, right: 100, bottom: 150, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG, fontFamily: FONTS.DISPLAY }}>DESIGN</div>
        <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG, fontFamily: FONTS.DISPLAY }}>DEVELOPMENT</div>
      </AbsoluteFill>

      {/* Ripple Effect */}
      {resolved > 0 && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          width: interpolate(resolved, [0, 1], [0, 800]),
          height: interpolate(resolved, [0, 1], [0, 800]),
          borderRadius: "50%",
          border: `2px solid ${COLORS.SECONDARY_DIM}`,
          transform: "translate(-50%, -50%)",
          opacity: 1 - resolved
        }} />
      )}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 이제는 스케치 한 장이나 간단한 프롬프트만으로도 곧바로 작동하는 프로토타입이 생성되는 마법 같은 일이 일어납니다.
 * 비주얼 컨셉: 러프한 스케치 라인(Drawing 스타일)이 순식간에 정교한 UI 컴포넌트(Glassmorphism 스타일)로 변하는 'The Morph' 연출을 시도합니다. 프롬프트 타이핑 효과가 배경에 흐릅니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sketchProgress = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const morphProgress = spring({ frame: frame - 200, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <DataParticles count={20} speed={0.2} opacityRange={[0.05, 0.2]} />
      
      <AbsoluteFill style={{ display: "flex", justifyContent: "center", alignItems: "center", bottom: 150 }}>
        {/* Sketch Layer */}
        <div style={{
          width: 600,
          height: 400,
          border: `2px dashed ${COLORS.TEXT_MUTED}`,
          borderRadius: 8,
          opacity: (1 - morphProgress) * sketchProgress,
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: FONTS.SIZE_MD,
          color: COLORS.TEXT_MUTED
        }}>
          [ Rough Sketch ]
        </div>

        {/* Prototype Layer */}
        <GlassPanel 
          width={700} 
          height={450} 
          entryDelay={200}
          style={{
            transform: `scale(${interpolate(morphProgress, [0, 1], [0.8, 1])})`,
            opacity: morphProgress
          }}
        >
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ height: 40, width: "60%", backgroundColor: COLORS.PRIMARY_DIM, borderRadius: 4 }} />
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ height: 150, flex: 1, backgroundColor: COLORS.BG_ELEVATED, borderRadius: 8, border: `1px solid ${COLORS.BORDER}` }} />
              <div style={{ height: 150, flex: 1, backgroundColor: COLORS.BG_ELEVATED, borderRadius: 8, border: `1px solid ${COLORS.BORDER}` }} />
            </div>
            <div style={{ height: 80, width: "100%", backgroundColor: COLORS.SECONDARY_DIM, borderRadius: 8 }} />
          </div>
        </GlassPanel>

        {/* Prompt Text */}
        <div style={{
          position: "absolute",
          top: 100,
          fontFamily: FONTS.MONO,
          color: COLORS.PRIMARY,
          fontSize: FONTS.SIZE_SM,
          opacity: interpolate(frame, [40, 60, 200, 220], [0, 1, 1, 0])
        }}>
          Prompt: Generate professional dashboard with glassmorphism...
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 단순히 코드를 짜주는 것을 넘어, 시스템 아키텍처를 설계하고 최적화 포인트까지 제안합니다.
 * 비주얼 컨셉: 3D 레이어 아키텍처 다이어그램이 층층이 쌓이는 모습을 위에서 내려다보는 시점으로 연출합니다. 각 레이어 사이에 'Optimization Points'를 상징하는 빛나는 코어들이 배치됩니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const layer1 = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const layer2 = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_GENTLE });
  const layer3 = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_GENTLE });
  const optimization = spring({ frame: frame - 150, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill style={{ bottom: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ transform: "rotateX(20deg) rotateZ(-5deg)", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Layer 3 */}
          <div style={{
            width: 400, height: 100, backgroundColor: COLORS.BG_ELEVATED, border: `2px solid ${COLORS.PRIMARY}`,
            opacity: layer3, transform: `translateY(${interpolate(layer3, [0, 1], [50, 0])}px)`,
            display: "flex", justifyContent: "center", alignItems: "center", color: COLORS.PRIMARY, fontWeight: "bold",
            boxShadow: optimization > 0.5 ? EFFECTS.GLOW_MD : "none",
            borderRadius: 8
          }}>SERVICE LAYER</div>
          
          {/* Layer 2 */}
          <div style={{
            width: 400, height: 100, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.SECONDARY}`,
            opacity: layer2, transform: `translateY(${interpolate(layer2, [0, 1], [50, 0])}px)`,
            display: "flex", justifyContent: "center", alignItems: "center", color: COLORS.SECONDARY, fontWeight: "bold",
            borderRadius: 8
          }}>BUSINESS LOGIC</div>

          {/* Layer 1 */}
          <div style={{
            width: 400, height: 100, backgroundColor: COLORS.BG_VOID, border: `2px solid ${COLORS.BORDER_STRONG}`,
            opacity: layer1, transform: `translateY(${interpolate(layer1, [0, 1], [50, 0])}px)`,
            display: "flex", justifyContent: "center", alignItems: "center", color: COLORS.TEXT_MUTED, fontWeight: "bold",
            borderRadius: 8
          }}>INFRASTRUCTURE</div>
        </div>

        {/* Optimization Points */}
        {optimization > 0 && (
          <div style={{
            position: "absolute",
            top: "30%",
            left: "40%",
            width: 20, height: 20, borderRadius: "50%",
            backgroundColor: COLORS.PRIMARY,
            boxShadow: EFFECTS.GLOW_LG,
            transform: `scale(${optimization})`
          }} />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 마치 수십 년 경력의 시니어 개발자가 항상 내 옆에 앉아 코드를 리뷰해 주는 것과 같죠.
 * 비주얼 컨셉: 화면 중앙을 가르는 두 개의 코드 에디터 창이 나타나고, 한쪽에서 작성한 코드가 다른 쪽(AI/Senior)으로 넘어가며 녹색 체크 표시(POSITIVE)와 함께 깔끔하게 수정되는 비교 연출을 보여줍니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const refactor = spring({ frame: frame - 100, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ bottom: 150, display: "flex", gap: 40, padding: 60, alignItems: "center" }}>
        <div style={{ flex: 1, opacity: entry, transform: `translateX(${interpolate(entry, [0, 1], [-50, 0])}px)` }}>
          <div style={{ color: COLORS.TEXT_MUTED, marginBottom: 10, fontSize: FONTS.SIZE_SM }}>// Raw Code</div>
          <CodeSnippet 
            lines={["const data = fetch('/api')", "data.then(res => {", "  setState(res.json())", "})"]}
            color={COLORS.TEXT_BODY}
          />
        </div>

        <div style={{ width: 60, display: "flex", justifyContent: "center", opacity: refactor }}>
           <div style={{ fontSize: 40, color: COLORS.PRIMARY }}>→</div>
        </div>

        <div style={{ flex: 1, opacity: refactor, transform: `translateX(${interpolate(refactor, [0, 1], [50, 0])}px)` }}>
          <div style={{ color: COLORS.PRIMARY, marginBottom: 10, fontSize: FONTS.SIZE_SM }}>// AI Refactored (Senior Level)</div>
          <CodeSnippet 
            lines={["const { data, error } = useSWR(", "  '/api',", "  fetcher", ")"]}
            color={COLORS.PRIMARY}
            style={{ border: `1px solid ${COLORS.PRIMARY_MID}` }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 이러한 변화는 단순히 개인의 코딩 속도를 높이는 것을 넘어, 팀 전체의 애자일한 협업 방식을 근본적으로 재정의하고 있습니다.
 * 비주얼 컨셉: 여러 개의 노드(팀원)들이 거미줄처럼 복잡하게 연결되어 소통하는 'Collaborative Network' 맵을 보여줍니다. 중앙의 AI 허브를 통해 데이터 교환이 극도로 효율적으로 변하는 모습을 강조합니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const entry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const agile = spring({ frame: frame - 300, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <DataParticles count={40} speed={1.5} color={COLORS.SECONDARY} />
      
      <AbsoluteFill style={{ bottom: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          position: "relative",
          width: 600,
          height: 600,
          opacity: entry
        }}>
          {/* Central Hub */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: COLORS.BG_VOID,
            border: `2px solid ${COLORS.PRIMARY}`,
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: COLORS.PRIMARY,
            fontWeight: "bold",
            boxShadow: EFFECTS.GLOW_MD,
            zIndex: 2
          }}>AI HUB</div>

          {/* Team Nodes */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x = Math.cos(rad) * 200;
            const y = Math.sin(rad) * 200;

            return (
              <React.Fragment key={i}>
                <div style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: COLORS.BG_SURFACE,
                  border: `1px solid ${COLORS.BORDER_STRONG}`,
                  transform: "translate(-50%, -50%)",
                }} />
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                  <line 
                    x1="300" y1="300" 
                    x2={300 + x} y2={300 + y} 
                    stroke={COLORS.PRIMARY_DIM} 
                    strokeWidth="1" 
                  />
                </svg>
              </React.Fragment>
            );
          })}

          {/* Agile Text Overlay */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${interpolate(agile, [0, 1], [0.5, 1.5])})`,
            fontSize: 80,
            fontFamily: FONTS.DISPLAY,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            color: COLORS.TEXT_MAIN,
            opacity: agile,
            textShadow: EFFECTS.GLOW_TEXT_LG,
            zIndex: 3
          }}>
            AGILE
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 우리는 더 빠르게 실패하고, 더 빨리 혁신할 수 있게 되었습니다.
 * 비주얼 컨셉: 'Fail Fast'와 'Innovate Faster'를 상징하는 역동적인 프로그레스 바와 그래프 연출. 실패(Negative) 구간은 짧고, 혁신(Positive) 구간은 가파르게 상승하는 차트를 시각화합니다.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartProgress = interpolate(frame, [0, 150], [0, 1], { extrapolateRight: "clamp" });
  const innovation = spring({ frame: frame - 150, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ bottom: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: 800, height: 400, position: "relative", borderBottom: `2px solid ${COLORS.BORDER}`, borderLeft: `2px solid ${COLORS.BORDER}` }}>
          <svg width="800" height="400" viewBox="0 0 800 400" fill="none">
            {/* Failure curve */}
            <path 
              d={`M 0 300 Q 100 ${interpolate(chartProgress, [0, 0.5], [300, 350])} 200 300`} 
              stroke={COLORS.NEGATIVE} 
              strokeWidth="4" 
              opacity={interpolate(chartProgress, [0, 0.3], [1, 0.2])}
            />
            {/* Innovation curve */}
            <path 
              d={`M 200 300 Q 400 100 800 ${interpolate(chartProgress, [0.4, 1], [300, 50])}`} 
              stroke={COLORS.PRIMARY} 
              strokeWidth="6" 
              style={{ filter: `drop-shadow(${EFFECTS.GLOW_SM})` }}
              strokeDasharray="1000"
              strokeDashoffset={interpolate(chartProgress, [0.4, 1], [1000, 0])}
            />
          </svg>
          {innovation > 0 && (
            <div style={{
              position: "absolute",
              right: 50,
              top: 50,
              color: COLORS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              fontWeight: FONTS.WEIGHT_BOLD,
              opacity: innovation,
              transform: `translateY(${interpolate(innovation, [0, 1], [20, 0])}px)`,
              textShadow: EFFECTS.GLOW_TEXT_SM
            }}>
              INNOVATION
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 유명한 개발자는 이렇게 말했습니다.
 * 비주얼 컨셉: 명언을 소개하기 위해 화면이 차분해지며, 중앙에 위엄 있는 따옴표 기호와 함께 'Thought Leader'를 상징하는 실루엣 형상이 추상적으로 나타납니다.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ bottom: 150, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div style={{ fontSize: 120, color: COLORS.PRIMARY_DIM, opacity: entry * 0.3, marginBottom: -40 }}>“</div>
        <div style={{ 
          width: 200, height: 300, backgroundColor: COLORS.BG_SURFACE, 
          borderRadius: "40% 40% 20% 20%", border: `1px solid ${COLORS.BORDER}`,
          opacity: entry * 0.5,
          transform: `scale(${interpolate(entry, [0, 1], [0.8, 1])})`
        }} />
        <div style={{ marginTop: 20, color: COLORS.TEXT_MUTED, fontFamily: FONTS.DISPLAY }}>THOUGHT LEADER</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: "미래의 코딩은 타이핑이 아니라 대화가 될 것이다.
 * 비주얼 컨셉: 음성 파형(Waveform)이 코드 라인으로 실시간 변환되는 오디오 시각화 연출. 키보드 타이핑 소리보다는 부드러운 파동의 흐름을 강조합니다.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [0, 180], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ bottom: 150, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 40 }}>
        {/* Waveform */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, height: 100 }}>
          {Array.from({ length: 40 }).map((_, i) => {
            const h = interpolate(Math.sin(frame / 5 + i), [-1, 1], [10, 80]) * (1 - Math.abs(20 - i) / 20);
            return (
              <div key={i} style={{ 
                width: 4, height: h, backgroundColor: COLORS.PRIMARY, 
                borderRadius: 2, boxShadow: EFFECTS.GLOW_SM 
              }} />
            );
          })}
        </div>

        {/* Morphing Text */}
        <div style={{ 
          color: COLORS.PRIMARY, fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_MD,
          opacity: progress, transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`
        }}>
          {"> "} future_coding = "conversation"
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: " 결국 우리에게 가장 필요한 역량은 타건 속도가 아니라, 문제를 정의하고 AI를 지휘하는 기휘력이 될 것입니다.
 * 비주얼 컨셉: 오케스트라 지휘자의 손동작을 형상화한 추상적인 광원 궤적이 화면을 휘감으며, 흩어져 있던 복잡한 데이터 조각들을 하나의 완벽한 시스템으로 정렬시키는 'The Mastermind' 엔딩을 연출합니다.
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const system = spring({ frame: frame - 100, fps, config: ANIMATION.SPRING_SNAPPY });
  const mastery = spring({ frame: frame - 300, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ bottom: 150, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Light Orbits */}
        <div style={{ position: "relative", width: 400, height: 400 }}>
          {[0, 120, 240].map((deg, i) => (
            <div key={i} style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: `1px solid ${COLORS.PRIMARY_DIM}`,
              borderRadius: "50%",
              transform: `rotateX(60deg) rotateY(${deg}deg) rotateZ(${frame}deg)`,
              opacity: entry
            }} />
          ))}
          
          {/* Master Text */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "150%",
            opacity: mastery
          }}>
            <div style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, textShadow: EFFECTS.GLOW_TEXT_SM }}>
              PROBLEM DEFINITION
            </div>
            <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG }}>
              & AI ORCHESTRATION
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Final Logo */}
      <div style={{
        position: "absolute",
        bottom: 200,
        width: "100%",
        textAlign: "center",
        opacity: interpolate(frame, [450, 500], [0, 1], { extrapolateLeft: "clamp" }),
        color: COLORS.PRIMARY,
        fontFamily: FONTS.DISPLAY,
        fontSize: FONTS.SIZE_MD,
        letterSpacing: 4
      }}>
        DESIGN-TEST3
      </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={1} durationInFrames={135}>
        <Scene1 />
      </Sequence>
      <Sequence from={136} durationInFrames={511}>
        <Scene2 />
      </Sequence>
      <Sequence from={647} durationInFrames={356}>
        <Scene3 />
      </Sequence>
      <Sequence from={1003} durationInFrames={570}>
        <Scene4 />
      </Sequence>
      <Sequence from={1573} durationInFrames={348}>
        <Scene5 />
      </Sequence>
      <Sequence from={1921} durationInFrames={393}>
        <Scene6 />
      </Sequence>
      <Sequence from={2314} durationInFrames={478}>
        <Scene7 />
      </Sequence>
      <Sequence from={2792} durationInFrames={270}>
        <Scene8 />
      </Sequence>
      <Sequence from={3062} durationInFrames={166}>
        <Scene9 />
      </Sequence>
      <Sequence from={3228} durationInFrames={220}>
        <Scene10 />
      </Sequence>
      <Sequence from={3448} durationInFrames={532}>
        <Scene11 />
      </Sequence>
    </AbsoluteFill>
  );
};
