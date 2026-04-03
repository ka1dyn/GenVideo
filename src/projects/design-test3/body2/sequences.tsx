import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, EFFECTS, ANIMATION } from "../theme";
import { DataParticles } from "../components/DataParticles";
import { GlassPanel } from "../components/GlassPanel";
import { GridBackground } from "../components/GridBackground";
import { CodeSnippet } from "../components/CodeSnippet";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 이렇게 강력한 AI 툴을 우리 팀에 성공적으로 도입하려면 어떻게 해야 할까요?
 * 비주얼 컨셉: 배경에 커다란 'HOW TO' 타이포그래피가 반투명하게 깔리고, 여러 개의 AI 툴 로고들이 유기적인 원자 궤도처럼 회전하는 모습을 보여줍니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 배경에 중앙에서 퍼져나가는 원형 그리드 파동이 생성됩니다.
 * - 단계1 (40f ~ 200f): 3~4개의 테크 아이콘 노드들이 중앙을 중심으로 회전하며 'IMPLEMENTATION' 텍스트 박스가 서서히 구체화됩니다.
 * - 퇴장 (200f ~ 279f): 노드들이 일렬로 정렬되며 다음 씬의 3단계 리스트 베이스로 변합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Entry
  const entry = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const pulse = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });

  // 40-200f: Rotation (Staccato)
  const rotation = interpolate(frame, [40, 200], [0, 360], { extrapolateRight: "clamp" });
  const staccatoRotation = Math.floor(rotation / 45) * 45; // 45도씩 딱딱 끊어짐

  // 200-279f: Exit (Align)
  const align = spring({ frame: frame - 200, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <GridBackground opacity={0.2} />
      
      {/* Background HOW TO */}
      <div style={{
          position: "absolute",
          fontSize: 300,
          fontFamily: FONTS.DISPLAY,
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          color: COLORS.TEXT_MAIN,
          opacity: 0.05,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${1 + entry * 0.1})`
      }}>
          HOW TO
      </div>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {/* Central Implementation Box */}
          <div style={{
              padding: "20px 60px",
              border: `2px solid ${COLORS.PRIMARY}`,
              backgroundColor: "rgba(10, 10, 30, 0.8)",
              color: COLORS.PRIMARY,
              fontSize: 60,
              fontFamily: FONTS.DISPLAY,
              fontWeight: FONTS.WEIGHT_BOLD,
              opacity: entry,
              transform: `scale(${entry})`,
              boxShadow: EFFECTS.GLOW_MD,
              zIndex: 10
          }}>
              IMPLEMENTATION
          </div>

          {/* Orbiting Nodes */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{
                position: "absolute",
                width: 40, height: 40,
                backgroundColor: COLORS.SECONDARY,
                borderRadius: "50%",
                transform: `
                  rotate(${staccatoRotation + i * 90}deg) 
                  translate(${interpolate(align, [0, 1], [300, (i - 1.5) * 120])}px)
                  translateY(${interpolate(align, [0, 1], [0, 400])}px)
                  scale(${entry})
                `,
                opacity: entry * (1 - align * 0.5),
                boxShadow: EFFECTS.GLOW_SM
            }} />
          ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 체계적이고 효율적인 3단계 실전 워크플로우를 제안합니다.
 * 비주얼 컨셉: 화면 상단에 '3-STEP WORKFLOW'라는 헤드라인이 나타나고, 그 아래에 1, 2, 3 숫자가 박스 형태로 순차적으로 강조됩니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Entry
  const headlineEntry = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });

  // 40-150f: Stage 1 (Stagger Boxes)
  const box1 = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_SNAPPY });
  const box2 = spring({ frame: frame - 60, fps, config: ANIMATION.SPRING_SNAPPY });
  const box3 = spring({ frame: frame - 80, fps, config: ANIMATION.SPRING_SNAPPY });

  // 150-230f: Stage 2 (Beam Sweep)
  const beam = interpolate(frame, [150, 230], [-100, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 230-278f: Exit
  const exit = spring({ frame: frame - 230, fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          fontSize: 80,
          fontFamily: FONTS.DISPLAY,
          color: COLORS.TEXT_MAIN,
          opacity: headlineEntry,
          transform: `translateY(${interpolate(headlineEntry, [0, 1], [-50, 0])}px)`
      }}>
          3-STEP WORKFLOW
      </div>

      <AbsoluteFill style={{ 
          display: "flex", 
          flexDirection: "row", 
          justifyContent: "center", 
          alignItems: "center", 
          gap: 60,
          transform: `translateY(${exit * 600}px)` 
      }}>
          {[box1, box2, box3].map((s, i) => (
            <div key={i} style={{
                width: 200,
                height: 200,
                backgroundColor: COLORS.BG_ELEVATED,
                border: `2px solid ${s > 0.5 ? COLORS.PRIMARY : COLORS.BORDER}`,
                borderRadius: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 100,
                color: s > 0.5 ? COLORS.PRIMARY : COLORS.TEXT_MUTED,
                fontFamily: FONTS.DISPLAY,
                opacity: s,
                transform: `scale(${s}) translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
                boxShadow: s > 0.8 ? EFFECTS.GLOW_MD : "none",
                position: "relative",
                overflow: "hidden"
            }}>
                {i + 1}
                {/* Beam Effect */}
                <div style={{
                    position: "absolute",
                    left: `${beam}%`,
                    width: "20%",
                    height: "100%",
                    backgroundColor: "white",
                    opacity: 0.1,
                    transform: "skewX(-30deg)"
                }} />
            </div>
          ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: AI와 함께하는 개발 워크플로우는 보통 다음 세 단계로 진행됩니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const progress = interpolate(frame, [40, 250], [0, 0.33], { extrapolateRight: "clamp" });
  const exit = spring({ frame: frame - 250, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
       <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 - exit }}>
          <div style={{ color: COLORS.TEXT_MAIN, fontSize: 50, marginBottom: 100, opacity: entry }}>
             WORKFLOW PIPELINE
          </div>
          
          {/* Progress Bar Body */}
          <div style={{
              width: "80%",
              height: 12,
              backgroundColor: COLORS.BG_SURFACE,
              borderRadius: 6,
              position: "relative",
              overflow: "hidden"
          }}>
              <div style={{
                  position: "absolute",
                  width: `${progress * 100}%`,
                  height: "100%",
                  backgroundColor: COLORS.PRIMARY,
                  boxShadow: EFFECTS.GLOW_SM
              }} />
          </div>

          <div style={{ display: "flex", width: "80%", justifyContent: "space-between", marginTop: 20 }}>
             {["ARCHITECTURE", "DRAFTING", "REFACTORING"].map((label, i) => (
                <div key={i} style={{ 
                    color: i === 0 ? COLORS.PRIMARY : COLORS.TEXT_MUTED, 
                    fontSize: 20, 
                    fontWeight: i === 0 ? "bold" : "normal",
                    opacity: entry
                }}>
                   {label}
                </div>
             ))}
          </div>
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 첫째, 전체적인 아키텍처 설계.
 * 비주얼 컨셉: 화면 전체에 거대한 'ARCHITECTURE DESIGN' 텍스트와 함께, 배경에 복잡한 시스템 설계도(BluePrint) 라인들이 촘촘하게 그려집니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 30f): 설계도 라인들이 중앙에서 바깥쪽으로 빠르게 드로잉 됩니다.
 * - 단계1 (30f ~ 150f): 시스템 구성 요소(Server, DB, Client)를 상징하는 육각형 박스들이 유기적으로 연결됩니다.
 * - 퇴장 (150f ~ 196f): 설계도가 흐릿해지며 다음 씬의 'Draft' 컨셉으로 페이드 오버됩니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-30f: Entry (Blueprint Draw)
  const draw = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  
  // 30-150f: Stage 1 (Hex Nodes Snapping)
  const nodes = spring({ frame: frame - 30, fps, config: ANIMATION.SPRING_SNAPPY });
  const nodeConnections = interpolate(frame, [60, 150], [0, 1], { extrapolateRight: "clamp" });

  // 150-196f: Exit
  const exit = spring({ frame: frame - 150, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Blueprint Grid Lines */}
      <AbsoluteFill style={{ opacity: draw * (1 - exit) }}>
         {Array.from({ length: 20 }).map((_, i) => (
           <div key={i} style={{
              position: "absolute",
              left: 0, top: `${i * 5}%`,
              width: `${draw * 100}%`, height: 1,
              backgroundColor: COLORS.BORDER,
              opacity: 0.3
           }} />
         ))}
         {Array.from({ length: 20 }).map((_, i) => (
           <div key={i} style={{
              position: "absolute",
              top: 0, left: `${i * 5}%`,
              height: `${draw * 100}%`, width: 1,
              backgroundColor: COLORS.BORDER,
              opacity: 0.3
           }} />
         ))}
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${1 + exit * 0.2})` }}>
          <div style={{
              fontSize: 120,
              fontFamily: FONTS.DISPLAY,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              color: COLORS.TEXT_MAIN,
              opacity: draw * (1 - exit),
              transform: `scale(${interpolate(draw, [0, 1], [0.8, 1])})`,
              textShadow: EFFECTS.GLOW_TEXT_LG,
              zIndex: 10
          }}>
              ARCHITECTURE
          </div>

          {/* Hexagonal Nodes */}
          <div style={{ position: "absolute", width: "100%", height: "100%", opacity: nodes * (1 - exit) }}>
             {[ {x: -300, y: -200, label: "SERVER"}, {x: 300, y: -200, label: "CLIENT"}, {x: 0, y: 200, label: "DATABASE"} ].map((node, i) => (
               <div key={i} style={{
                  position: "absolute",
                  left: `calc(50% + ${node.x}px)`,
                  top: `calc(50% + ${node.y}px)`,
                  width: 150, height: 170,
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  backgroundColor: COLORS.BG_SURFACE,
                  border: `2px solid ${COLORS.PRIMARY}`,
                  display: "flex", justifyContent: "center", alignItems: "center",
                  color: COLORS.PRIMARY,
                  fontSize: 18,
                  fontWeight: "bold",
                  transform: `scale(${nodes}) translate(-50%, -50%)`,
                  boxShadow: EFFECTS.GLOW_SM
               }}>
                  {node.label}
               </div>
             ))}
             
             {/* Connection Lines */}
             <svg style={{ position: "absolute", width: "100%", height: "100%", stroke: COLORS.PRIMARY, strokeWidth: 2, opacity: nodeConnections }}>
                <line x1="50%" y1="50%" x2="calc(50% - 300px)" y2="calc(50% - 200px)" strokeDasharray="10" />
                <line x1="50%" y1="50%" x2="calc(50% + 300px)" y2="calc(50% - 200px)" strokeDasharray="10" />
                <line x1="50%" y1="50%" x2="50%" y2="calc(50% + 200px)" strokeDasharray="10" />
             </svg>
          </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 둘째, AI를 활용한 빠른 초안 작성.
 * 비주얼 컨셉: 설계도 위에 'AI DRAFTING' 레이어가 얹혀지고, 수많은 코드 조각들이 비처럼 쏟아지며 빈 곳을 채워나가는 속도감 있는 연출을 보여줍니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 상단에서 코드 형태의 파티클들이 아래로 쏟아집니다.
 * - 단계1 (40f ~ 180f): 파티클들이 설계도 위의 육각형 박스들 내부로 빨려 들어가는 'Assembly' 모션이 일어납니다.
 * - 퇴장 (180f ~ 240f): 화면이 오른쪽으로 밀리며 'Refactoring' 씬으로 전환됩니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Entry
  const rain = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  
  // 40-180f: Assembly (Move to center boxes)
  const assembly = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_SNAPPY });

  // 180-240f: Exit (Push Right)
  const exit = spring({ frame: frame - 180, fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ 
        backgroundColor: COLORS.BG_VOID,
        transform: `translateX(${exit * 100}%)`
    }}>
       <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{
              fontSize: 80,
              fontFamily: FONTS.DISPLAY,
              color: COLORS.TEXT_MAIN,
              opacity: rain * (1 - exit),
              letterSpacing: 10,
              textShadow: EFFECTS.GLOW_TEXT_LG
          }}>
              AI DRAFTING
          </div>

          {/* Falling Code Fragments */}
          {Array.from({ length: 30 }).map((_, i) => {
             const startTime = i * 2;
             const fall = interpolate(frame, [startTime, startTime + 40], [-200, height / 2 + (i % 5) * 50], { extrapolateRight: "clamp" });
             const pull = interpolate(assembly, [0, 1], [0, 1]);

             return (
               <div key={i} style={{
                  position: "absolute",
                  left: `${(i * 13) % 100}%`,
                  top: interpolate(pull, [0, 1], [fall, height / 2 + (i % 2 === 0 ? -150 : 150)]),
                  opacity: rain * (1 - pull * 0.8),
                  transform: `scale(${interpolate(pull, [0, 1], [1, 0.2])})`,
                  color: COLORS.PRIMARY_DIM,
                  fontFamily: FONTS.MONO,
                  fontSize: 14,
                  whiteSpace: "nowrap"
               }}>
                  {i % 2 === 0 ? "const data = await fetch()" : "export default Component"}
               </div>
             );
          })}

          {/* Target Containers */}
          <div style={{ display: "flex", gap: 100, opacity: assembly }}>
             {[1, 2].map(i => (
                <div key={i} style={{
                    width: 300, height: 400,
                    border: `1px solid ${COLORS.PRIMARY}`,
                    backgroundColor: "rgba(100, 255, 218, 0.05)",
                    borderRadius: 8,
                    display: "flex", flexDirection: "column", padding: 20, gap: 15
                }}>
                   {Array.from({ length: 12 }).map((_, j) => (
                     <div key={j} style={{ width: `${(j * 31) % 50 + 40}%`, height: 4, backgroundColor: COLORS.PRIMARY_DIM, opacity: 0.3 }} />
                   ))}
                </div>
             ))}
          </div>
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

const height = 1080; // Placeholder for logic inside components

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 셋째, 개발자의 디테일한 리팩토링 및 최적화입니다.
 * 비주얼 컨셉: 조립된 컴포넌트들을 핀셋으로 정교하게 만지는 듯한 렌즈 포커스 효과와 함께, 거친 부분들이 매끄럽게 연마되는 'Polishing' 효과를 시각화합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 화면 중앙의 오브젝트가 줌인되며 포커스가 잡힙니다.
 * - 단계1 (40f ~ 180f): 오브젝트의 테두리가 PRIMARY 광원으로 덮이며 금속성 광택이 흐르는 매끄러운 텍스처로 변합니다.
 * - 퇴장 (180f ~ 241f): 광택이 전체 화면으로 번지며 페이드 아웃됩니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Focus / Zoom
  const zoom = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const blur = interpolate(zoom, [0, 1], [20, 0]);

  // 40-180f: Polishing Sweep
  const polish = interpolate(frame, [40, 180], [-1, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 180-241f: Exit
  const exit = spring({ frame: frame - 180, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
       <AbsoluteFill style={{ 
           justifyContent: "center", 
           alignItems: "center",
           filter: `blur(${blur}px)`,
           transform: `scale(${interpolate(zoom, [0, 1], [0.8, 1.2])})`,
           opacity: 1 - exit
       }}>
          {/* Main Object (Code Block) */}
          <div style={{
              width: 600, height: 400,
              backgroundColor: COLORS.BG_VOID,
              border: `2px solid ${COLORS.PRIMARY_DIM}`,
              borderRadius: 12,
              position: "relative",
              overflow: "hidden",
              display: "flex", flexDirection: "column", padding: 40, gap: 20
          }}>
             <CodeSnippet lines={["function optimize() {", "  // before: manual loop", "  return data.map(x => x * 2);", "}", "// AFTER: Vectorized Operation"]} color={COLORS.TEXT_MAIN} />
             
             {/* Metallic Sweep / Polish */}
             <div style={{
                 position: "absolute",
                 top: 0, bottom: 0,
                 width: "50%",
                 background: `linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.4), transparent)`,
                 left: `${polish * 100}%`,
                 transform: "skewX(-20deg)",
                 zIndex: 5
             }} />
          </div>

          <div style={{
              marginTop: 60,
              fontSize: 40,
              fontFamily: FONTS.DISPLAY,
              fontWeight: "bold",
              color: COLORS.PRIMARY,
              opacity: zoom,
              textShadow: EFFECTS.GLOW_TEXT_SM
          }}>
              REFACTORING & OPTIMIZATION
          </div>
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 단순한 마크업을 넘어 복잡한 로직도 문제없습니다.
 * 비주얼 컨셉: 'Markup'이라는 단순한 선 형태의 텍스트가 뒤집히며, 그 이면에 복잡한 신경망(Neural Network) 연산 그래프인 'Complex Logic'이 입체적으로 나타납니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 30f): 화면 중앙에 'MARKUP' 텍스트 박스가 회전하며 나타납니다.
 * - 단계1 (30f ~ 150f): 텍스트 박스가 분해되며 그 안에서 수천 개의 논리 회로 선들이 동시다발적으로 뻗어 나갑니다.
 * - 퇴장 (150f ~ 233f): 선들이 하나로 모여 'NEXT.JS' 로고 쉐이프로 변환을 준비합니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-30f: Entry
  const entry = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  
  // 30-150f: Logic Explosion
  const explosion = spring({ frame: frame - 30, fps, config: ANIMATION.SPRING_SNAPPY });

  // 150-233f: Exit (Shrink to center)
  const exit = spring({ frame: frame - 150, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
       <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {/* Card Flip Transition */}
          <div style={{
              width: 500, height: 200,
              transform: `perspective(1000px) rotateY(${explosion * 180}deg) scale(${entry * (1 - exit)})`,
              position: "relative"
          }}>
             {/* Front: Markup */}
             <div style={{
                 position: "absolute", width: "100%", height: "100%",
                 backgroundColor: COLORS.BG_BASE,
                 border: `2px solid ${COLORS.SECONDARY}`,
                 borderRadius: 20,
                 display: "flex", justifyContent: "center", alignItems: "center",
                 color: COLORS.SECONDARY, fontSize: 60, fontWeight: "bold",
                 backfaceVisibility: "hidden",
                 opacity: 1 - explosion
             }}>
                 MARKUP
             </div>

             {/* Back: Complex Logic */}
             <div style={{
                 position: "absolute", width: "100%", height: "100%",
                 backgroundColor: COLORS.BG_VOID,
                 border: `2px solid ${COLORS.PRIMARY}`,
                 borderRadius: 20,
                 display: "flex", justifyContent: "center", alignItems: "center",
                 color: COLORS.PRIMARY, fontSize: 40, fontWeight: "bold",
                 transform: "rotateY(180deg)",
                 backfaceVisibility: "hidden",
                 boxShadow: EFFECTS.GLOW_MD
             }}>
                 COMPLEX LOGIC
             </div>
          </div>

          {/* Neural Network Lines */}
          {explosion > 0.5 && Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{
                position: "absolute",
                width: interpolate(explosion, [0.5, 1], [0, 400]),
                height: 1,
                backgroundColor: COLORS.PRIMARY_DIM,
                opacity: (1 - exit) * 0.3,
                transform: `rotate(${i * 9}deg) translateX(${interpolate(explosion, [0.5, 1], [0, 300])}px)`
            }} />
          ))}
       </AbsoluteFill>
    </AbsoluteFill>
  );
};
/**
 * [Scene 8 기획안]
 * 원본 텍스트: 프롬프트 몇 줄만 입력하면, API 연동부터 상태 관리까지 갖춘 완벽한 Next.
 * 비주얼 컨셉: 'PROMPT INPUT' 영역에 타이핑이 시작되면, 아래쪽으로 'API'와 'STATE'라는 두 개의 거대한 기어(Gear)가 맞물려 돌아가며 에너지를 생성하는 모습을 시각화합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 배경에 타이핑을 상징하는 커서가 깜빡입니다.
 * - 단계1 (40f ~ 250f): 'connectAPI()'와 'useGlobalState()' 같은 코드 문구들이 기어 회전에 맞춰 팝업 됩니다.
 * - 퇴장 (250f ~ 343f): 기어들이 빠르게 회전하며 강한 스파크를 일으킵니다.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Entry
  const entry = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const cursor = Math.floor(frame / 10) % 2 === 0;

  // 40-250f: Gears & Energy
  const rotation = interpolate(frame, [40, 250], [0, 720], { extrapolateRight: "clamp" });
  const energy = interpolate(frame, [200, 250], [0, 1], { extrapolateLeft: "clamp" });

  // 250-343f: Exit (Spark)
  const spark = interpolate(frame, [250, 343], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
       <AbsoluteFill style={{ padding: 100, opacity: 1 - spark }}>
          {/* Prompt Input Line */}
          <div style={{
              fontSize: 40,
              fontFamily: FONTS.MONO,
              color: COLORS.PRIMARY,
              height: 60,
              display: "flex", alignItems: "center"
          }}>
              {"> "} PROMPT: Generate Next.js App with API {cursor ? "_" : ""}
          </div>

          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
             {/* Gears */}
             <div style={{ position: "relative", width: 600, height: 600 }}>
                {/* Gear 1 (API) */}
                <div style={{
                    position: "absolute",
                    left: 0, top: 100,
                    width: 300, height: 300,
                    border: `10px dashed ${COLORS.PRIMARY_DIM}`,
                    borderRadius: "50%",
                    transform: `rotate(${rotation}deg)`,
                    display: "flex", justifyContent: "center", alignItems: "center",
                    boxShadow: energy > 0 ? EFFECTS.GLOW_MD : "none"
                }}>
                   <div style={{ color: COLORS.PRIMARY, fontWeight: "bold" }}>API</div>
                </div>

                {/* Gear 2 (STATE) */}
                <div style={{
                    position: "absolute",
                    right: 0, bottom: 100,
                    width: 300, height: 300,
                    border: `10px dashed ${COLORS.SECONDARY_DIM}`,
                    borderRadius: "50%",
                    transform: `rotate(${-rotation}deg)`,
                    display: "flex", justifyContent: "center", alignItems: "center",
                    boxShadow: energy > 0 ? EFFECTS.GLOW_MD : "none"
                }}>
                   <div style={{ color: COLORS.SECONDARY, fontWeight: "bold" }}>STATE</div>
                </div>

                {/* Sparkling Energy */}
                {energy > 0 && Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} style={{
                      position: "absolute",
                      width: 4, height: 4,
                      backgroundColor: "white",
                      left: "50%", top: "50%",
                      transform: `rotate(${i * 18 + frame * 10}deg) translateX(${energy * 300}px)`,
                      opacity: energy * (1 - spark)
                  }} />
                ))}
             </div>
          </AbsoluteFill>
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: js 컴포넌트 코드가 순식간에 작성됩니다.
 * 비주얼 컨셉: 스파크 속에서 'NEXT.JS COMPONENT'라는 완제품 카드가 완성되어 튀어나옵니다. 카드에는 소스 코드가 비치는 투명한 글래스모피즘 효과가 적용됩니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 중앙에서 'Next.js' 로고가 강력하게 팝업(SNAPPY) 됩니다.
 * - 단계1 (40f ~ 140f): 로고 주변으로 코드 블록들이 껍질처럼 감싸며 완제품 카드를 형성합니다.
 * - 퇴장 (140f ~ 189f): 카드가 위로 솟구치며 화면이 상단으로 스크롤 됩니다.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Logo Popup
  const popup = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  
  // 40-140f: Card Formation
  const formation = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_SNAPPY });

  // 140-189f: Exit (Scroll Up)
  const exit = spring({ frame: frame - 140, fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
       <AbsoluteFill style={{ 
           justifyContent: "center", 
           alignItems: "center",
           transform: `translateY(${exit * -1200}px)` 
       }}>
          {/* Next.js Logo (Conceptual) */}
          <div style={{
              fontSize: 120,
              fontFamily: FONTS.DISPLAY,
              fontWeight: "900",
              color: COLORS.TEXT_MAIN,
              opacity: popup,
              transform: `scale(${popup})`,
              zIndex: 10,
              textShadow: EFFECTS.GLOW_TEXT_LG
          }}>
              NEXT.JS
          </div>

          <div style={{ position: "absolute", opacity: formation }}>
             <GlassPanel width={600} height={400}>
                <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 15 }}>
                   <div style={{ color: COLORS.PRIMARY, fontWeight: "bold" }}>Component.tsx</div>
                   {Array.from({ length: 8 }).map((_, i) => (
                     <div key={i} style={{ 
                         width: `${(i * 47) % 60 + 30}%`, 
                         height: 6, 
                         backgroundColor: COLORS.TEXT_MUTED, 
                         opacity: 0.3,
                         transform: `translateX(${interpolate(formation, [0, 1], [100, 0])}px)`
                      }} />
                   ))}
                </div>
             </GlassPanel>
          </div>
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 이때 가장 중요한 핵심 기술은 바로 '프롬프트 엔지니어링'입니다.
 * 비주얼 컨셉: 화면 전체가 다크 블루 톤으로 변하며 'PROMPT ENGINEERING'이 중앙에 금색(ACCENT) 광휘와 함께 나타납니다. 글자 주변에 엄격한 규칙(Rules) 라인들이 가둠틀처럼 배치됩니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 50f): 정적이고 무게감 있는 배경음과 함께 텍스트가 거대하게 진입(HEAVY) 합니다.
 * - 단계1 (50f ~ 250f): 텍스트 주변을 맴도는 고리들이 'Precision'과 'Context'라는 레이블을 달고 회전합니다.
 * - 퇴장 (250f ~ 315f): 고리들이 수평으로 펼쳐지며 다음 씬의 컨텍스트 리스트가 됩니다.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-50f: Heavy Entry
  const entry = spring({ frame, fps, config: ANIMATION.SPRING_HEAVY });
  
  // 50-250f: Rule Rings
  const rotation = interpolate(frame, [50, 250], [0, 180], { extrapolateRight: "clamp" });
  const mechanicalRotation = Math.floor(rotation / 30) * 30;

  // 250-315f: Exit (Flatten)
  const exit = spring({ frame: frame - 250, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020210" }}>
       <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {/* Accent Glow */}
          <div style={{
              position: "absolute",
              width: 800, height: 800,
              background: `radial-gradient(circle, ${COLORS.ACCENT_DIM} 0%, transparent 70%)`,
              opacity: entry * 0.3 * (1 - exit)
          }} />

          <div style={{
              fontSize: 100,
              fontFamily: FONTS.DISPLAY,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              color: COLORS.ACCENT,
              textAlign: "center",
              lineHeight: 1.1,
              opacity: entry,
              transform: `scale(${interpolate(entry, [0, 1], [1.5, 1])}) translateY(${exit * -200}px)`,
              textShadow: EFFECTS.GLOW_TEXT_LG,
              zIndex: 10
          }}>
              PROMPT<br />ENGINEERING
          </div>

          {/* Rule Rings */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} style={{
                position: "absolute",
                width: 600 + i * 150,
                height: 600 + i * 150,
                border: `2px solid ${COLORS.ACCENT_DIM}`,
                borderRadius: "50%",
                transform: `rotateX(75deg) rotateY(${mechanicalRotation * (i === 0 ? 1 : -0.5)}deg) scaleY(${1 - exit})`,
                opacity: entry * 0.4
            }} />
          ))}

          {/* Floating Labels */}
          {["PRECISION", "CONTEXT"].map((txt, i) => (
             <div key={i} style={{
                 position: "absolute",
                 top: "15%",
                 left: i === 0 ? "15%" : "85%",
                 color: COLORS.ACCENT,
                 fontFamily: FONTS.MONO,
                 fontSize: 24,
                 opacity: interpolate(frame, [100 + i * 20, 120 + i * 20], [0, 1], { extrapolateRight: "clamp" }) * (1 - exit),
                 transform: `translateX(${i === 0 ? 50 : -50}px)`
             }}>
                 [{txt}]
             </div>
          ))}
       </AbsoluteFill>
    </AbsoluteFill>
  );
};
/**
 * [Scene 11 기획안]
 * 원본 텍스트: 명확한 컨텍스트와 엄격한 제약 조건을 제공할수록, AI는 우리가 정확히 원하는 형태의 코드를 오차 없이 생성해 냅니다.
 * 비주얼 컨셉: 'CONTEXT' 박스와 'CONSTRAINTS' 박스가 AI 코어(Core)로 투입되어 정밀한 필터를 통과하는 과정을 보여줍니다. 필터를 통과한 반대편에서는 반짝이는 다이아몬드 형태의 'Pure Code'가 배출됩니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 60f): 입구와 출구가 명확한 기계 장치 데모가 화면에 배치됩니다.
 * - 단계1 (60f ~ 400f): 데이터 뭉치들이 필터를 지날 때마다 복잡도가 낮아지고 형태가 정교해지는 다단계 정류 과정을 시각화합니다.
 * - 퇴장 (400f ~ 505f): 결과물인 다이아몬드 코드 조각이 화면 가득 확대되어 다음 씬의 프리즘 효과를 줍니다.
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-60f: Machine Entry
  const entry = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  
  // 60-400f: Processing (Conveyor Belt loop)
  const processing = interpolate(frame, [60, 400], [0, 1], { extrapolateRight: "clamp" });
  
  // 400-505f: Result (Diamond Expansion)
  const resultExpansion = spring({ frame: frame - 400, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
       <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {/* Refinery Machine Case */}
          <div style={{
              width: 800, height: 400,
              border: `2px solid ${COLORS.BORDER_STRONG}`,
              borderRadius: 30,
              backgroundColor: COLORS.BG_SURFACE,
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0 60px",
              opacity: entry,
              transform: `scale(${entry})`,
              boxShadow: EFFECTS.SHADOW_XL,
              position: "relative"
          }}>
             {/* Left: Input (Context/Constraints) */}
             <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {["CONTEXT", "LIMITS"].map((txt, i) => (
                   <div key={i} style={{ 
                       padding: "10px 20px", border: `1px solid ${COLORS.SECONDARY}`, 
                       color: COLORS.SECONDARY, fontSize: 18, fontFamily: FONTS.MONO,
                       transform: `translateX(${interpolate(processing, [0, 0.2, 0.8, 1], [-100, 0, 0, 100])}px)`,
                       opacity: interpolate(processing, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
                   }}>
                       {txt}
                   </div>
                ))}
             </div>

             {/* Middle: Filter Core */}
             <div style={{
                 width: 100, height: 200,
                 backgroundColor: COLORS.BG_VOID,
                 border: `4px double ${COLORS.PRIMARY}`,
                 display: "flex", flexDirection: "column", justifyContent: "space-around",
                 opacity: 0.8
             }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} style={{ width: "100%", height: 2, backgroundColor: COLORS.PRIMARY, opacity: Math.sin(frame / 5 + i) * 0.5 + 0.5 }} />
                ))}
             </div>

             {/* Right: Output (Diamond Pure Code) */}
             <div style={{
                 width: 100, height: 100,
                 backgroundColor: COLORS.PRIMARY,
                 clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                 transform: `rotate(${frame * 2}deg) scale(${interpolate(processing, [0.5, 1], [0, 1.2])})`,
                 boxShadow: EFFECTS.GLOW_MD,
                 display: "flex", justifyContent: "center", alignItems: "center"
             }}>
                <div style={{ width: 40, height: 40, backgroundColor: "white", opacity: 0.3 }} />
             </div>
          </div>

          {/* Full Screen Diamond Expansion */}
          {resultExpansion > 0 && (
            <div style={{
                position: "absolute",
                width: 2000, height: 2000,
                backgroundColor: COLORS.PRIMARY,
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                transform: `rotate(${resultExpansion * 90}deg) scale(${resultExpansion * 2})`,
                opacity: resultExpansion,
                zIndex: 100
            }} />
          )}
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 까다로웠던 테스트 코드 작성도 더 이상 고통스러운 작업이 아닙니다.
 * 비주얼 컨셉: 'TEST CODE'라는 문구가 쇠사슬(고통)에 묶여 있다가, AI의 빛이 닿자 사슬이 가루가 되어 흩어지는 'Emancipation' 연출을 합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 배경에 무겁고 어두운 질감이 깔리고 텍스트가 쇠사슬에 감겨 등장합니다.
 * - 단계1 (40f ~ 200f): PRIMARY 광선이 위에서 쏟아지며 사슬을 투명하게 녹이고, 텍스트가 자유롭게 화면을 유영합니다.
 * - 퇴장 (200f ~ 283f): 텍스트가 흩어지며 작은 체크 마크(V)들이 되어 화면을 가득 채웁니다.
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Entry
  const entry = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  
  // 40-200f: Emancipation (Ray)
  const lightRay = interpolate(frame, [40, 100], [0, 1], { extrapolateRight: "clamp" });
  const chainShatter = interpolate(frame, [60, 150], [0, 1], { extrapolateRight: "clamp" });

  // 200-283f: Exit (V dots)
  const exit = spring({ frame: frame - 200, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050510" }}>
       <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {/* Light Ray from Above */}
          <div style={{
              position: "absolute",
              top: 0, width: 400, height: 1000,
              background: `linear-gradient(to bottom, ${COLORS.PRIMARY_GLOW}, transparent)`,
              opacity: lightRay * (1 - exit),
              filter: "blur(40px)",
              transform: `translateY(${interpolate(lightRay, [0, 1], [-500, 0])}px)`
          }} />

          {/* Main Text */}
          <div style={{
              fontSize: 120,
              fontFamily: FONTS.DISPLAY,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              color: COLORS.TEXT_MAIN,
              opacity: entry * (1 - exit),
              transform: `scale(${entry}) translateY(${Math.sin(frame / 20) * 20}px)`,
              zIndex: 10
          }}>
              TEST CODE
          </div>

          {/* Chains (Concept: Brackets as chains) */}
          {chainShatter < 1 && [ -100, 100 ].map(x => (
             <div key={x} style={{
                 position: "absolute",
                 fontSize: 300,
                 color: COLORS.TEXT_DISABLED,
                 left: `calc(50% + ${x}px)`,
                 opacity: (1 - chainShatter) * entry,
                 transform: `translateX(${chainShatter * x}px) rotate(${chainShatter * 45}deg)`,
                 fontWeight: 100
             }}>
                 {x < 0 ? "{" : "}"}
             </div>
          ))}

          {/* Shatter Particles (Checkmarks) */}
          {exit > 0 && Array.from({ length: 40 }).map((_, i) => (
             <div key={i} style={{
                 position: "absolute",
                 fontSize: 30,
                 color: COLORS.POSITIVE,
                 left: `${(i * 17) % 100}%`,
                 top: `${(i * 23) % 100}%`,
                 opacity: exit,
                 transform: `scale(${exit}) translate(${(i - 20) * 50 * exit}px, ${Math.sin(i) * 500 * exit}px)`
             }}>
                 ✓
             </div>
          ))}
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 핵심 비즈니스 로직만 주어지면 엣지 케이스까지 꼼꼼하게 고려한 완벽한 테스트 스위트를 자동으로 구성해 줍니다.
 * 비주얼 컨셉: 하나의 'Logic Core'를 중심으로 수백 개의 테스트 케이스(Node)들이 구 모양으로 완벽하게 감싸며 방어막을 형성하는 'Shield Formation' 연출을 보여줍니다. 'EDGE CASES COVERED'라는 상징적 텍스트가 회전합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 60f): 중앙 코어 노드가 강력하게 동기화됩니다.
 * - 단계1 (60f ~ 350f): 코어 주변에 투명한 구체 장막이 형성되고, 그 위에 무수히 많은 테스트 체크포인트들이 도트 형태로 순차 점등(STAGGER) 됩니다.
 * - 단계2 (350f ~ 450f): 전체 구체가 POSITIVE 색상으로 한 번 강하게 박동(Pulse)하며 완벽함을 증명합니다.
 * - 퇴장 (450f ~ 522f): 구체가 안개처럼 흩어지며 화면이 암전 되고, 'design-test3' 로고가 노출되며 종료됩니다.
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-60f: Core Entry
  const coreEntry = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  
  // 60-350f: Shield Stagger
  const shield = interpolate(frame, [60, 350], [0, 1], { extrapolateRight: "clamp" });
  
  // 350-450f: Pulse
  const pulse = Math.sin(frame / 5) * interpolate(frame, [350, 450], [0, 0.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 450-522f: Exit
  const exit = spring({ frame: frame - 450, fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
       <AbsoluteFill style={{ 
           justifyContent: "center", 
           alignItems: "center",
           transform: `scale(${1 + exit * 0.5})`,
           opacity: 1 - exit
       }}>
          {/* Logic Core */}
          <div style={{
              width: 200, height: 200,
              backgroundColor: COLORS.BG_SURFACE,
              border: `4px solid ${COLORS.PRIMARY}`,
              borderRadius: "50%",
              display: "flex", justifyContent: "center", alignItems: "center",
              transform: `scale(${coreEntry + pulse})`,
              boxShadow: EFFECTS.GLOW_LG,
              zIndex: 10
          }}>
             <div style={{ color: COLORS.PRIMARY, fontWeight: "bold", fontSize: 24 }}>CORE</div>
          </div>

          {/* Shield checkpoints (Orbital Dots) */}
          {Array.from({ length: 60 }).map((_, i) => {
             const dotEntry = interpolate(shield, [i * 0.015, i * 0.015 + 0.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
             return (
               <div key={i} style={{
                  position: "absolute",
                  width: 8, height: 8,
                  backgroundColor: COLORS.POSITIVE,
                  borderRadius: "50%",
                  transform: `rotate(${i * 12 + frame * 0.5}deg) translate(300px) scale(${dotEntry})`,
                  opacity: dotEntry,
                  boxShadow: EFFECTS.GLOW_SM
               }} />
             );
          })}

          {/* Rotating Text */}
          <div style={{
              position: "absolute",
              width: 800, height: 800,
              display: "flex", justifyContent: "center", alignItems: "center",
              animation: "rotate 20s linear infinite"
          }}>
             <div style={{
                 position: "absolute", top: 40,
                 color: COLORS.POSITIVE, fontFamily: FONTS.MONO, fontSize: 18,
                 letterSpacing: 8, opacity: shield
             }}>
                 EDGE CASES COVERED [VERIFIED]
             </div>
          </div>
       </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={1} durationInFrames={279}><Scene1 /></Sequence>
      <Sequence from={280} durationInFrames={278}><Scene2 /></Sequence>
      <Sequence from={558} durationInFrames={330}><Scene3 /></Sequence>
      <Sequence from={888} durationInFrames={196}><Scene4 /></Sequence>
      <Sequence from={1084} durationInFrames={240}><Scene5 /></Sequence>
      <Sequence from={1324} durationInFrames={241}><Scene6 /></Sequence>
      <Sequence from={1565} durationInFrames={233}><Scene7 /></Sequence>
      <Sequence from={1798} durationInFrames={343}><Scene8 /></Sequence>
      <Sequence from={2141} durationInFrames={189}><Scene9 /></Sequence>
      <Sequence from={2330} durationInFrames={315}><Scene10 /></Sequence>
      <Sequence from={2645} durationInFrames={505}><Scene11 /></Sequence>
      <Sequence from={3150} durationInFrames={283}><Scene12 /></Sequence>
      <Sequence from={3433} durationInFrames={522}><Scene13 /></Sequence>
    </AbsoluteFill>
  );
};
