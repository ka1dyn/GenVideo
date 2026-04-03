import React from "react";
import { AbsoluteFill, Sequence, interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, EFFECTS, ANIMATION } from "../theme";
import { DataParticles } from "../components/DataParticles";
import { Gauge } from "../components/Gauge";
import { DynamicBarChart } from "../components/DynamicBarChart";
import { AnimatedPieChart } from "../components/AnimatedPieChart";
import { CodeSnippet } from "../components/CodeSnippet";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 그렇다면 실제 현장에서는 어떤 변화가 일어나고 있을까요?
 * 비주얼 컨셉: 배경에 미세한 입자들이 떠다니는 가운데, 질문을 던지듯 'FIELD CHANGES'라는 텍스트가 서서히 올라오고, 화면이 데이터를 수집하는 듯한 레이더 스캔 연출로 전환됩니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 배경에 원형 스캔 라인이 생성되며 텍스트가 중앙에서 확산(Scale & Fade) 진입합니다.
 * - 단계1 (40f ~ 150f): 스캔 라인을 따라 작은 데이터 큐브들이 랜덤하게 생성되며, 화면이 점진적으로 밝아집니다.
 * - 퇴장 (150f ~ 187f): 큐브들이 하나로 결합하며 다음 씬의 차트 베이스로 변합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Entry
  const entry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const entryScale = interpolate(entry, [0, 1], [0.8, 1]);
  const scanner = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });

  // 40-150f: Stage 1
  const brightness = interpolate(frame, [40, 150], [0.5, 1], { extrapolateRight: "clamp" });
  
  // 150-187f: Exit
  const exit = interpolate(frame, [150, 187], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, opacity: brightness }}>
      <DataParticles count={60} speed={0.8} color={COLORS.PRIMARY_DIM} />
      
      <AbsoluteFill style={{ bottom: 150, justifyContent: "center", alignItems: "center" }}>
        {/* Radar Scan Circle */}
        <div style={{
          position: "absolute",
          width: interpolate(scanner, [0, 1], [0, 800]),
          height: interpolate(scanner, [0, 1], [0, 800]),
          border: `2px solid ${COLORS.PRIMARY_MID}`,
          borderRadius: "50%",
          opacity: 1 - scanner,
          boxShadow: EFFECTS.GLOW_MD
        }} />

        {/* Text Layer */}
        <div style={{
          fontSize: 80,
          fontFamily: FONTS.DISPLAY,
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          color: COLORS.TEXT_MAIN,
          letterSpacing: 8,
          opacity: interpolate(exit, [0, 0.5], [entry, 0]),
          transform: `scale(${entryScale}) translateY(${exit * -50}px)`,
          textShadow: EFFECTS.GLOW_TEXT_LG
        }}>
          FIELD CHANGES
        </div>

        {/* Floating Data Cubes */}
        {frame > 20 && Array.from({ length: 16 }).map((_, i) => {
           const startTime = 20 + (i * 3);
           const cubeProgress = interpolate(frame, [startTime, startTime + 40], [0, 1], { extrapolateRight: "clamp" });
           
           // Exit: Consolidate to center-bottom
           const targetX = (i - 8) * 40;
           const targetY = 300;
           
           return (
             <div key={i} style={{
               position: "absolute",
               width: 12, height: 12,
               backgroundColor: COLORS.PRIMARY,
               left: `calc(50% + ${interpolate(exit, [0, 1], [(i * 73) % 800 - 400, targetX])}px)`,
               top: `calc(50% + ${interpolate(exit, [0, 1], [(i * 59) % 600 - 300, targetY])}px)`,
               opacity: interpolate(cubeProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) * (1 - exit * 0.5),
               transform: `scale(${cubeProgress}) rotate(${frame * 2 + i * 20}deg)`,
               boxShadow: EFFECTS.GLOW_SM,
               zIndex: 5
             }} />
           );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 막연한 기대감이 아닌, 실제 데이터를 바탕으로 AI 도입의 극적인 효과를 살펴보겠습니다.
 * 비주얼 컨셉: 모호한 구름 형태(기대감)가 순식간에 정교한 막대 그래프와 수치 데이터(실제 데이터)로 고체화되는 모습을 보여줍니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 50f): 화면 중앙에 흐릿한 입자들이 모여 중심을 잡습니다.
 * - 단계1 (50f ~ 250f): 입자들이 사각형 막대로 변하며 높낮이를 조절하고, 상단에 'REAL-WORLD DATA'라는 태그가 뱃지 스타일로 등장합니다.
 * - 단계2 (250f ~ 350f): 각 막대 상단에 구체적인 코딩 라인 수, 배포 주기 등의 가상 데이터가 흩어지듯 나타납니다.
 * - 퇴장 (350f ~ 399f): 막대들이 바닥으로 가라앉으며 90도 회전하여 다음 씬의 타임라인 그리드로 변환됩니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-50f: Cloud Morph
  const cloudCollapse = interpolate(frame, [0, 50], [1, 0], { extrapolateRight: "clamp" });
  
  // 50-250f: Stage 1 (Bars & Badge)
  const morph = spring({ frame: frame - 50, fps, config: ANIMATION.SPRING_GENTLE });
  
  // 250-350f: Stage 2 (Scatter Data)
  const dataReveal = spring({ frame: frame - 250, fps, config: ANIMATION.SPRING_SNAPPY });

  // 350-399f: Exit
  const exit = interpolate(frame, [350, 399], [0, 1], { extrapolateLeft: "clamp" });

  const chartData = [
    { label: "Deployment", value: 85 },
    { label: "Stability", value: 92 },
    { label: "Efficiency", value: 78 }
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill style={{ 
          bottom: 150, 
          justifyContent: "center", 
          alignItems: "center",
          transform: `perspective(1000px) rotateX(${exit * 90}deg) translateY(${exit * 500}px)`,
          opacity: 1 - exit
      }}>
        {/* Particle Cloud -> Morphing to Chart */}
        {frame < 80 && (
           <div style={{ opacity: cloudCollapse, transform: `scale(${1 + cloudCollapse * 2})` }}>
             <DataParticles count={150} speed={4} color={COLORS.SECONDARY} />
           </div>
        )}

        <div style={{ opacity: morph, transform: `scale(${interpolate(morph, [0, 1], [0.9, 1])})` }}>
           <DynamicBarChart data={chartData} title="REAL-WORLD DATA" color={COLORS.SECONDARY} />
        </div>

        {/* Scattered Labels */}
        <div style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
           {chartData.map((d, i) => (
             <div key={i} style={{
                position: "absolute",
                left: `calc(50% + ${(i - 1) * 300}px)`,
                top: "40%",
                color: COLORS.SECONDARY_DIM,
                fontSize: 24,
                fontFamily: FONTS.MONO,
                opacity: dataReveal * (1 - exit),
                transform: `translateY(${interpolate(dataReveal, [0, 1], [20, 0])}px)`
             }}>
                {d.label}_METRIC_ID: {((frame + i * 13) % 999).toString().padStart(3, "0")}
             </div>
           ))}
        </div>

        {/* Badge */}
        <div style={{
          position: "absolute",
          top: 100,
          right: 100,
          padding: "12px 24px",
          backgroundColor: "rgba(30, 30, 44, 0.8)",
          border: `1px solid ${COLORS.SECONDARY}`,
          borderRadius: 30,
          backdropFilter: EFFECTS.GLASS_BLUR,
          color: COLORS.SECONDARY,
          fontSize: FONTS.SIZE_MD,
          fontWeight: FONTS.WEIGHT_BOLD,
          opacity: morph * (1 - exit),
          transform: `translateX(${interpolate(morph, [0, 1], [100, 0])}px)`
        }}>
          VERIFIED METRICS
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 실제로 최근 한 연구에 따르면, AI 코딩 어시스턴트를 도입한 조직의 개발 생산성 은 무려 55%나 향상되었습니다.
 * 비주얼 컨셉: 거대한 원형 게이지(Gauge) 차트가 중앙에 배치되고, 바늘이 '55%' 영역까지 급격히 가속하며 광원을 내뿜는 임팩트 연출을 합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 60f): 원형 게이지의 테두리가 PRIMARY 색상으로 드로잉되듯 생성됩니다.
 * - 단계1 (60f ~ 300f): 게이지 내부의 수치가 0에서 55%까지 빠르게 카운트업 되며, 게이지가 점점 더 밝은 빛을 발산합니다.
 * - 단계2 (300f ~ 480f): '55% PRODUCTIVITY BOOST'라는 텍스트가 게이지 중앙에서 부드럽게 강조(Empahsis)됩니다.
 * - 퇴장 (480f ~ 546f): 게이지가 파열하듯 작아지며 배경의 파티클로 변합니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-60f: Border Draw Entry
  const borderProgress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  
  // 60-300f: Count Up & Glow
  const countUp = interpolate(frame, [60, 300], [0, 55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowIntensity = interpolate(frame, [60, 300], [0, 1]);

  // 300-480f: Emphasis
  const emphasis = spring({ frame: frame - 300, fps, config: ANIMATION.SPRING_BOUNCY });

  // 480-546f: Burst Exit
  const burst = interpolate(frame, [480, 546], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ 
          bottom: 150, 
          justifyContent: "center", 
          alignItems: "center",
          transform: `scale(${interpolate(burst, [0, 1], [1, 2])})`,
          opacity: 1 - burst
      }}>
         <div style={{ 
             transform: `scale(${interpolate(borderProgress, [0, 1], [0.8, 1])})`, 
             opacity: borderProgress,
             filter: `drop-shadow(0 0 ${glowIntensity * 40}px ${COLORS.PRIMARY_GLOW})`
         }}>
            <Gauge 
              targetValue={countUp} 
              label="DEVELOPMENT PRODUCTIVITY" 
              color={COLORS.PRIMARY} 
              entryDelay={0} 
            />
         </div>

         {emphasis > 0 && (
           <div style={{
             position: "absolute",
             top: "65%",
             fontSize: 72,
             fontFamily: FONTS.DISPLAY,
             fontWeight: FONTS.WEIGHT_EXTRABOLD,
             color: COLORS.TEXT_MAIN,
             textShadow: EFFECTS.GLOW_TEXT_LG,
             opacity: emphasis,
             transform: `translateY(${interpolate(emphasis, [0, 1], [60, 0])}px) scale(${interpolate(emphasis, [0, 1], [0.9, 1.1])})`
           }}>
             55% BOOST
           </div>
         )}
      </AbsoluteFill>
      
      {/* Burst Particles */}
      {frame > 480 && (
        <DataParticles count={200} speed={interpolate(burst, [0, 1], [2, 10])} color={COLORS.PRIMARY} />
      )}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 반복적인 보일러플레이트 작성 시간이 획기적으로 줄어든 덕분이죠.
 * 비주얼 컨셉: 수동으로 한 줄씩 타이핑되는 'Boilerplate Code'들이 거대한 가위나 삭제 툴 없이, AI 스캐너가 지나가자 한꺼번에 'Auto-Generated' 패널로 압축되는 효율적인 연출을 보여줍니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 배경이 회색조의 코드 더미로 가득 찹니다.
 * - 단계1 (40f ~ 200f): 왼쪽에서 오른쪽으로 투명한 레이저 면이 이동하며, 지저분한 코드들을 PRIMARY 색상의 깔끔한 함수 덩어리로 변하게 합니다.
 * - 퇴장 (200f ~ 297f): 완성된 함수 덩어리들이 작은 칩(Chip) 모양으로 축소되며 화면 하단으로 정렬됩니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // 0-40f: Entry (Grayscale Pile)
  const entry = spring({ frame, fps });
  
  // 40-200f: Stage 1 (Laser Scan)
  const scanProgress = interpolate(frame, [40, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  // 200-297f: Exit (Chip Shrink)
  const exit = interpolate(frame, [200, 297], [0, 1], { extrapolateLeft: "clamp" });
  const chipSpring = spring({ frame: frame - 200, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ 
          bottom: 150, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: 150,
          perspective: 1000
      }}>
        {/* Left: Boilerplate (Dissolving) */}
        <div style={{ 
            opacity: interpolate(scanProgress, [0, 0.9], [1, 0]), 
            transform: `scale(${1 - scanProgress * 0.1}) rotateY(${scanProgress * 20}deg)`,
            filter: `grayscale(1) blur(${scanProgress * 15}px)`
        }}>
           <CodeSnippet 
             lines={["function oldWay() {", "  // manual typing", "  // repetitive lines", "  // boilerplate logic", "}"]} 
             color={COLORS.TEXT_MUTED}
           />
        </div>

        {/* Laser Line */}
        <div style={{
            position: "absolute",
            left: `calc(${scanProgress * 100}% - 2px)`,
            width: 4,
            height: "80%",
            backgroundColor: COLORS.PRIMARY,
            boxShadow: `0 0 40px ${COLORS.PRIMARY}, 0 0 100px ${COLORS.PRIMARY_DIM}`,
            opacity: interpolate(scanProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
            zIndex: 10,
            borderRadius: 2
        }} />

        {/* Right: Optimized (Appearing) */}
        <div style={{ 
            opacity: scanProgress,
            transform: `
              scale(${interpolate(chipSpring, [0, 1], [1, 0.4])}) 
              translateY(${interpolate(chipSpring, [0, 1], [0, 400])}px)
              translateX(${interpolate(chipSpring, [0, 1], [0, -width / 4])}px)
            `,
            filter: chipSpring > 0.1 ? `blur(${chipSpring * 5}px)` : "none"
        }}>
           <CodeSnippet 
             lines={["const solution = () => {", "  return AI.generate();", "} // Auto-optimized"]} 
             color={COLORS.PRIMARY}
             style={{ boxShadow: EFFECTS.GLOW_MD }}
           />
        </div>

        {/* Small Data Chips (Appearing at bottom) */}
        {chipSpring > 0 && Array.from({ length: 8 }).map((_, i) => (
           <div key={i} style={{
              position: "absolute",
              bottom: -100,
              left: `calc(20% + ${i * 60}px)`,
              width: 50,
              height: 20,
              backgroundColor: COLORS.PRIMARY_DIM,
              border: `1px solid ${COLORS.PRIMARY}`,
              borderRadius: 4,
              opacity: chipSpring,
              transform: `translateY(${interpolate(chipSpring, [0, 1], [100, 0])}px)`
           }} />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 개발자들의 업무 시간 분배도 완전히 달라졌습니다.
 * 비주얼 컨셉: 하루 24시간을 나타내는 커다란 원이 나타나고, 그 내부의 '업무 섹션'들이 재배치되는 파이 차트(Pie Chart) 애니메이션을 시전합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 화면 중앙에 정적인 원이 나타나 'BEFORE' 상태를 보여줍니다.
 * - 단계1 (40f ~ 200f): 원 내부의 조각들이 유기적으로 움직이며 'AFTER' 상태로 크기가 조절됩니다. 특정 단편들이 작아지고 다른 단편들이 커집니다.
 * - 퇴장 (200f ~ 297f): 원의 경계선이 사라지고 색상 덩어리들만 남아 다음 씬으로 연결됩니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Entry
  const entry = spring({ frame, fps });

  // 40-200f: Stage 1 (Morph)
  const morph = interpolate(frame, [40, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  // 200-297f: Exit (Dissolve)
  const exit = interpolate(frame, [220, 297], [0, 1], { extrapolateLeft: "clamp" });

  const beforeData = [
    { label: "Boilerplate", value: 60, color: COLORS.SECONDARY_DIM },
    { label: "Logic", value: 40, color: COLORS.PRIMARY_DIM },
  ];

  const afterData = [
    { label: "Boilerplate", value: 10, color: "#4B3BBF" },
    { label: "Logic", value: 90, color: COLORS.PRIMARY },
  ];

  const currentData = beforeData.map((d, i) => ({
    ...d,
    value: interpolate(morph, [0, 1], [d.value, afterData[i].value]),
    color: d.color 
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill style={{ 
          bottom: 150, 
          justifyContent: "center", 
          alignItems: "center",
          opacity: 1 - exit,
          transform: `scale(${1 + exit * 0.5}) filter(blur(${exit * 20}px))`
      }}>
         <div style={{ 
             fontSize: FONTS.SIZE_LG, 
             position: "absolute", 
             top: 50, 
             color: COLORS.TEXT_MAIN,
             opacity: interpolate(morph, [0, 0.4, 0.6, 1], [0.5, 0, 0, 1]),
             transform: `translateY(${interpolate(entry, [0, 1], [-20, 0])}px)`
         }}>
             {morph < 0.5 ? "BEFORE AI: FRAGMENTED" : "AFTER AI: OPTIMIZED"}
         </div>
         
         <div style={{ 
             transform: `rotate(${morph * 180}deg)`,
             boxShadow: `0 0 ${20 + morph * 60}px ${COLORS.PRIMARY_DIM}`
         }}>
            <AnimatedPieChart data={currentData} size={500} entryDelay={0} />
         </div>

         {/* Drifting blobs on exit */}
         {exit > 0 && Array.from({ length: 6 }).map((_, i) => (
           <div key={i} style={{
              position: "absolute",
              width: 100, height: 100,
              borderRadius: "50%",
              backgroundColor: i % 2 ? COLORS.PRIMARY : COLORS.SECONDARY,
              opacity: exit * 0.3,
              filter: "blur(40px)",
              transform: `translate(${(i - 3) * 200 * exit}px, ${Math.sin(i) * 100 * exit}px)`
           }} />
         ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 단순 반복 작업에 쏟는 시간은 80% 감소한 반면, 창의적인 아키텍처 설계와 비즈니스 로직 고민에 쏟는 시간은 3배 이상 늘어났습니다.
 * 비주얼 컨셉: 화면 왼쪽에는 줄어드는 마이너스 그래프(-80%), 오른쪽에는 치솟는 플러스 그래프(x3)를 대비시켜 시각화합니다. 각각의 영역에는 'Repetition'과 'Creation'이라는 테마를 부여합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 50f): 화면 좌우가 SECONDARY 컬러로 분할됩니다.
 * - 단계1 (50f ~ 300f): 왼쪽 영역의 'Routine' 바가 바닥까지 수축하고, 오른쪽 영역의 'Architecture' 바가 천장을 뚫을 정도로 높이 솟아오릅니다.
 * - 단계2 (300f ~ 500f): 창의적 영역인 오른쪽에서 화려한 데이터 정육면체(Cube)들이 쌓이며 정교한 건물을 짓는 듯한 쉐이프를 생성합니다.
 * - 퇴장 (500f ~ 571f): 좌우 분할선이 무너지며 오른쪽의 화려한 색상이 화면 전체를 덮습니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-50f: Split Entry
  const split = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  
  // 50-300f: Stage 1 (Grow/Shrink)
  const grow = interpolate(frame, [50, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  // 300-500f: Stage 2 (Cube Stack)
  const stack = interpolate(frame, [300, 500], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 500-571f: Exit (Flood)
  const flood = spring({ frame: frame - 500, fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, display: "flex", flexDirection: "row" }}>
      {/* Left: Routine (Shrinking) */}
      <div style={{ 
          flex: interpolate(flood, [0, 1], [1, 0]), 
          backgroundColor: COLORS.BG_SURFACE, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          borderRight: `${interpolate(flood, [0, 1], [1, 0])}px solid ${COLORS.BORDER}`,
          transform: `translateX(${interpolate(split, [0, 1], [-100, 0])}%)`,
          opacity: 1 - flood
      }}>
         <div style={{ color: COLORS.NEGATIVE, fontSize: FONTS.SIZE_LG, marginBottom: 20 }}>ROUTINE</div>
         <div style={{ 
             width: 100, 
             height: interpolate(grow, [0, 1], [400, 80]), 
             backgroundColor: COLORS.NEGATIVE,
             boxShadow: `0 0 20px ${COLORS.NEGATIVE_DIM}`,
             borderRadius: 4
         }} />
         <div style={{ color: COLORS.NEGATIVE, marginTop: 20, fontSize: FONTS.SIZE_3XL, fontWeight: "bold" }}>-80%</div>
      </div>

      {/* Right: Architecture (Growing + Cube Stack) */}
      <div style={{ 
          flex: interpolate(flood, [0, 1], [1, 20]), 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          transform: `translateX(${interpolate(split, [0, 1], [100, 0])}%)`,
          backgroundColor: interpolateColors(flood, [0, 1], ["transparent", COLORS.PRIMARY]),
          position: "relative"
      }}>
         <div style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_LG, marginBottom: 20, opacity: 1 - flood }}>ARCHITECTURE & LOGIC</div>
         
         <div style={{ 
             width: 120, 
             height: interpolate(grow, [0, 1], [120, 450]), 
             backgroundColor: COLORS.PRIMARY,
             boxShadow: EFFECTS.GLOW_MD,
             borderRadius: 4,
             opacity: 1 - flood,
             zIndex: 2
         }} />

         {/* 3D Cubes Stacking */}
         {frame > 300 && Array.from({ length: 12 }).map((_, i) => {
            const cubeEntry = interpolate(stack, [i * 0.05, i * 0.05 + 0.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                position: "absolute",
                width: 60, height: 60,
                backgroundColor: COLORS.PRIMARY_GLOW,
                border: `1px solid ${COLORS.PRIMARY}`,
                left: `calc(50% + ${(i % 3 - 1) * 70}px)`,
                top: `calc(70% - ${Math.floor(i / 3) * 70}px)`,
                opacity: cubeEntry * (1 - flood),
                transform: `
                  perspective(500px) 
                  rotateX(45deg) rotateY(45deg) 
                  scale(${cubeEntry})
                  translateZ(${cubeEntry * 50}px)
                `,
                boxShadow: EFFECTS.GLOW_SM
              }} />
            );
         })}

         <div style={{ 
             color: COLORS.TEXT_MAIN, 
             marginTop: 20, 
             fontSize: FONTS.SIZE_3XL, 
             fontWeight: "bold",
             opacity: (1 - flood) * grow,
             textShadow: EFFECTS.GLOW_TEXT_LG
         }}>
           3X CAPACITY
         </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: AI 도입 전과 후를 비교해 볼까요?
 * 비주얼 컨셉: 'B/A'라는 커다란 타이포그래피 슬라이더가 화면을 가로지르며, 거칠고 파란 느낌의 'Before' 필터에서 매끄럽고 네온 빛의 'After' 필터로 화면의 무드가 전환됩니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 수직 분할선이 왼쪽에서 오른쪽으로 빠르게 지나갑니다.
 * - 단계1 (40f ~ 140f): 'BEFORE AI'와 'AFTER AI' 텍스트가 번갈아 가며 겹칩니다.
 * - 퇴장 (140f ~ 180f): 분할선이 사라지며 'After'의 밝은 세상을 보여줍니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-40f: Entry (Sweep)
  const sweep = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const slider = interpolate(sweep, [0, 1], [0, 1]);

  // 40-140f: Stage 1 (Flash Typography)
  const flash = interpolate(frame, [40, 140], [0, 10]);
  
  // 140-180f: Exit (Accelerate Out)
  const exit = spring({ frame: frame - 140, fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Before Layer */}
      <AbsoluteFill style={{ 
          backgroundColor: "#1a1a2e", 
          zIndex: 1, 
          filter: `grayscale(${interpolate(slider, [0, 1], [0, 1])}) contrast(1.2)`,
          clipPath: `inset(0 ${100 - slider * 100}% 0 0)`
      }}>
         <div style={{ 
             position: "absolute", 
             left: "25%", 
             top: "50%", 
             color: COLORS.TEXT_MUTED, 
             fontSize: 100, 
             fontFamily: FONTS.DISPLAY,
             transform: `scale(${1 - exit * 0.2})`
         }}>
             TRADITIONAL
         </div>
      </AbsoluteFill>

      {/* After Layer */}
      <AbsoluteFill style={{ 
          backgroundColor: COLORS.BG_VOID, 
          zIndex: 0 
      }}>
         <div style={{ 
             position: "absolute", 
             left: "25%", 
             top: "50%", 
             color: COLORS.PRIMARY, 
             fontSize: 100, 
             fontFamily: FONTS.DISPLAY, 
             textShadow: EFFECTS.GLOW_TEXT_LG,
             transform: `scale(${1 + exit * 0.1})`
         }}>
             AI-ASSISTED
         </div>
      </AbsoluteFill>

      {/* Split Line */}
      <div style={{
          position: "absolute",
          left: `${slider * 100}%`,
          width: 4,
          height: "100%",
          backgroundColor: COLORS.TEXT_MAIN,
          zIndex: 2,
          boxShadow: `0 0 30px ${COLORS.TEXT_MAIN}`,
          transform: `translateX(${exit * 2000}px)`
      }} />

      {/* Flash Label */}
      <div style={{
          position: "absolute",
          left: "50%",
          top: "80%",
          transform: "translate(-50%, -50%)",
          fontSize: 60,
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          color: COLORS.TEXT_MAIN,
          opacity: Math.floor(flash) % 2 === 0 ? 0.8 : 0,
          zIndex: 3,
          backgroundColor: COLORS.BG_ELEVATED,
          padding: "10px 40px",
          border: `1px solid ${COLORS.BORDER_STRONG}`
      }}>
          {flash < 5 ? "WAITING..." : "BOOSTING..."}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 예전에는 공식 문서를 뒤지며 수동으로 타이핑하며 밤을 새우던 작업들이, 이제는 AI의 똑똑한 제안을 검토하고 승인하는 효율적인 프로세스로 전환되었습니다.
 * 비주얼 컨셉: 수천 장의 'Documentation' 페이지들이 회오리처럼 돌며 정리되다가, 한 장의 심플한 'Verified Solution' 카드로 요약되는 'Summary' 연출을 사용합니다. 마우스 커서의 'Accept/Reject' 상호작용을 추상적으로 시각화합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 60f): 배경에 흐릿한 문서 텍스트들이 쏟아집니다.
 * - 단계1 (60f ~ 300f): 텍스트들이 소용돌이치며 중앙으로 빨려 들어갑니다.
 * - 단계2 (300f ~ 550f): 깔끔하게 정돈된 대시보드 UI가 나타나고, 'Best Practice' 추천 마크가 PRIMARY 색상으로 깜빡입니다. 'APPROVE' 버튼이 서서히 커지며 선택됩니다.
 * - 퇴장 (550f ~ 660f): 대시보드 창이 폴더링 되듯 사라집니다.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-60f: Entry
  const entry = spring({ frame, fps });

  // 60-300f: Vortex
  const vortex = interpolate(frame, [60, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  // 300-550f: Result Card
  const result = spring({ frame: frame - 300, fps, config: ANIMATION.SPRING_GENTLE });
  const pulse = Math.sin(frame / 10) * 0.05 + 1;

  // 550-660f: Exit (Fold)
  const exit = spring({ frame: frame - 550, fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ 
          bottom: 150, 
          justifyContent: "center", 
          alignItems: "center",
          transform: `perspective(1200px) rotateY(${exit * -90}deg) translateX(${exit * -1000}px)`,
          opacity: 1 - exit
      }}>
        {/* Document Vortex Spiral */}
        {vortex < 0.95 && Array.from({ length: 24 }).map((_, i) => (
           <div key={i} style={{
               position: "absolute",
               width: 120, height: 160,
               backgroundColor: COLORS.BG_SURFACE,
               border: `1px solid ${COLORS.BORDER_STRONG}`,
               opacity: (1 - vortex) * 0.7,
               transform: `
                 rotate(${vortex * 1080 + i * 15}deg) 
                 translate(${interpolate(vortex, [0, 1], [600 + i * 20, 0])}px) 
                 scale(${interpolate(vortex, [0, 0.8], [1, 0.2])})
                 perspective(500px) rotateX(${vortex * 360}deg)
               `,
               boxShadow: EFFECTS.SHADOW_LG
           }} />
        ))}

        {/* Verified Solution Glass Card */}
        <div style={{
            width: 500,
            height: 320,
            background: "rgba(20, 20, 35, 0.6)",
            border: `2px solid ${interpolateColors(result, [0, 1], [COLORS.BORDER, COLORS.PRIMARY])}`,
            borderRadius: 20,
            padding: 40,
            opacity: result,
            transform: `scale(${result * pulse}) translateY(${interpolate(result, [0, 1], [50, 0])}px)`,
            boxShadow: result > 0.8 ? EFFECTS.GLOW_LG : EFFECTS.SHADOW_XL,
            backdropFilter: EFFECTS.GLASS_BLUR,
            display: "flex", flexDirection: "column", gap: 30,
            zIndex: 10
        }}>
           <div style={{ color: COLORS.PRIMARY, fontWeight: "bold", fontSize: 24, letterSpacing: 2 }}>GEN-AI VERIFIED</div>
           <div style={{ height: 1, background: `linear-gradient(to right, ${COLORS.PRIMARY}, transparent)`, width: "80%" }} />
           
           <div style={{ color: COLORS.TEXT_BODY, fontSize: 18, lineHeight: 1.5 }}>
              Smart implementation suggested.<br />
              All dependency checks passed.
           </div>

           <div style={{ display: "flex", gap: 20, marginTop: "auto" }}>
              <div style={{ 
                  flex: 1, height: 45, borderRadius: 8, 
                  backgroundColor: COLORS.PRIMARY, color: COLORS.TEXT_INVERSE, 
                  fontSize: 16, fontWeight: "bold", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: EFFECTS.GLOW_SM
              }}>
                ACCEPT
              </div>
              <div style={{ 
                  width: 100, height: 45, borderRadius: 8, 
                  border: `1px solid ${COLORS.BORDER_STRONG}`, color: COLORS.TEXT_MUTED, 
                  fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" 
              }}>
                REJECT
              </div>
           </div>
        </div>

        {/* Hovering Micro-data */}
        {result > 0.5 && Array.from({ length: 5 }).map((_, i) => (
           <div key={i} style={{
              position: "absolute",
              color: COLORS.PRIMARY_MID,
              fontFamily: FONTS.MONO,
              fontSize: 12,
              left: "10%",
              top: `${20 + i * 15}%`,
              opacity: result * 0.5,
              transform: `translateX(${interpolate(result, [0.5, 1], [-20, 0])}px)`
           }}>
              Checking_ref_{i}... [SECURE]
           </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 버그 발생률 또한 눈에 띄게 줄었습니다.
 * 비주얼 컨셉: 배경에 떠다니던 붉은색 노이즈(Bug)들이 AI 필터 레이어를 통과하자마자 깨끗하게 사라지는 'De-noising' 연출을 합니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 40f): 화면 전체에 붉은색 글리치(Glitch) 효과가 나타납니다.
 * - 단계1 (40f ~ 180f): 화면 위에서 아래로 스캔 파동이 흐르며 글리치를 완벽하게 지워냅니다.
 * - 퇴장 (180f ~ 228f): 깨끗해진 화면 중앙에 POSITIVE 체크 마크가 새겨집니다.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 0-40f: Glitch Entry
  const glitch = interpolate(frame, [0, 40], [1, 0.5]);
  
  // 40-180f: Stage 1 (Scan Wash)
  const scan = interpolate(frame, [40, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  // 180-228f: Exit (Seal)
  const checkMark = spring({ frame: frame - 180, fps, config: ANIMATION.SPRING_BOUNCY });
  const exitScale = interpolate(frame, [210, 228], [1, 1.2]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, transform: `scale(${exitScale})` }}>
      {/* Dynamic Glitch Noise */}
      <AbsoluteFill style={{ opacity: interpolate(scan, [0, 0.8], [1, 0]) }}>
         {Array.from({ length: 60 }).map((_, i) => {
            const seed = (i * 123.45) % 1;
            return (
              <div key={i} style={{
                  position: "absolute",
                  width: interpolate(seed, [0, 1], [10, 150]),
                  height: 2,
                  backgroundColor: seed > 0.5 ? COLORS.NEGATIVE : COLORS.ACCENT,
                  left: `${(seed * 157 * frame) % 100}%`,
                  top: `${(seed * 233 * 7) % 100}%`,
                  boxShadow: `0 0 12px ${seed > 0.5 ? COLORS.NEGATIVE : COLORS.ACCENT}`,
                  opacity: 0.6
              }} />
            );
         })}
      </AbsoluteFill>

      {/* Plasma Scan Wave */}
      <div style={{
          position: "absolute",
          top: `calc(${scan * 100}% - 50px)`,
          width: "100%",
          height: 100,
          background: `linear-gradient(to bottom, transparent, ${COLORS.PRIMARY}, transparent)`,
          opacity: interpolate(scan, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
          boxShadow: `0 0 60px ${COLORS.PRIMARY_GLOW}`,
          zIndex: 5
      }} />

      <AbsoluteFill style={{ bottom: 150, justifyContent: "center", alignItems: "center" }}>
          <div style={{ 
              fontSize: 180, 
              color: COLORS.POSITIVE, 
              opacity: checkMark, 
              transform: `scale(${checkMark}) rotate(${interpolate(checkMark, [0, 1], [-20, 0])}deg)`,
              textShadow: EFFECTS.GLOW_TEXT_LG
          }}>
              ✓
          </div>
          <div style={{ 
              color: COLORS.POSITIVE, 
              fontSize: 40, 
              fontWeight: "bold",
              opacity: checkMark,
              letterSpacing: 4,
              transform: `translateY(${interpolate(checkMark, [0, 1], [20, 0])}px)`
          }}>
              99% STABILITY SECURED
          </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 실시간 정적 분석과 코드 리뷰를 통해 배포 전 치명적인 오류의 90% 이상을 사전에 차단하며 서비스의 안정성을 크게 높여주고 있습니다.
 * 비주얼 컨셉: 'Safety Net'을 형상화한 매끄러운 원형 구체(Sphere)가 화면 중앙에 자리 잡고, 외부에서 날아오는 위험 신호들을 튕겨내는 모습을 보여줍니다. 구체 내부에는 견고한 서버 랙(Server Rack) 디자인이 설계도처럼 보입니다.
 *
 * In-Scene Animation 기획:
 * - 진입 (0f ~ 60f): 화면 정중앙에 투명한 쉴드가 회전하며 형성됩니다.
 * - 단계1 (60f ~ 400f): 쉴드 표면에 'SCANNING 90%+ SECURE'라는 데이터 문구들이 빠르게 흐릅니다. 외부에서 들어오는 붉은 점들이 쉴드에 닿아 녹색으로 정화되는 연출을 반복합니다.
 * - 단계2 (400f ~ 550f): 쉴드 중앙에서 'STABILITY'라는 문구가 강력한 빛을 뿜으며 등장하여 화면을 안정시키고 로고와 함께 페이드 아웃됩니다.
 * - 퇴장 (550f ~ 662f): 전체 기하학 도형들이 중앙으로 모여들며 작아지고, 다음 섹션 예고와 함께 마무리됩니다.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0-60f: Shield Entry
  const entry = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  
  // 60-400f: Stage 1 (Scanning & Bounce)
  const scanning = interpolate(frame, [60, 400], [0, 1]);
  const pulse = Math.sin(frame / 5) * 0.02 + 1;

  // 400-550f: Stage 2 (Stability Glow)
  const stability = spring({ frame: frame - 400, fps, config: ANIMATION.SPRING_BOUNCY });

  // 550-662f: Exit (Converge)
  const exit = interpolate(frame, [550, 662], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <AbsoluteFill style={{ 
          bottom: 150, 
          justifyContent: "center", 
          alignItems: "center",
          transform: `scale(${interpolate(exit, [0, 1], [1, 0])}) rotate(${exit * 45}deg)`,
          opacity: 1 - exit
      }}>
        {/* Protective Shield Sphere */}
        <div style={{
            position: "relative",
            width: 450,
            height: 450,
            borderRadius: "50%",
            border: `2px solid ${interpolateColors(stability, [0, 1], [COLORS.PRIMARY_MID, COLORS.PRIMARY])}`,
            boxShadow: `
              inset 0 0 60px ${COLORS.PRIMARY_DIM}, 
              0 0 40px ${COLORS.PRIMARY_DIM},
              0 0 ${stability * 100}px ${COLORS.PRIMARY_GLOW}
            `,
            transform: `scale(${entry * pulse}) rotate(${frame / 2}deg)`,
            display: "flex", justifyContent: "center", alignItems: "center",
            overflow: "hidden"
        }}>
           {/* Internal Server Infrastructure */}
           <div style={{ 
               width: "70%", height: "70%", 
               border: `1px solid ${COLORS.BORDER_STRONG}`, 
               display: "flex", flexDirection: "column", 
               padding: 15, gap: 6,
               opacity: 0.6
           }}>
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} style={{ 
                    width: "100%", height: 3, 
                    backgroundColor: i % 3 === 0 ? COLORS.PRIMARY_DIM : COLORS.BORDER,
                    boxShadow: i % 3 === 0 ? EFFECTS.GLOW_SM : "none"
                }} />
              ))}
           </div>
           
           {/* Circular Data Ticker */}
           <div style={{ 
               position: "absolute", 
               width: "100%", height: "100%",
               animation: "rotate 10s linear infinite"
           }}>
              <div style={{ 
                  position: "absolute", width: "100%", textAlign: "center", 
                  top: 20, color: COLORS.PRIMARY, fontFamily: FONTS.MONO, fontSize: 14,
                  textShadow: EFFECTS.GLOW_TEXT_SM
              }}>
                [ ENCRYPTED_SECURE_LAYER_99.9% ]
              </div>
           </div>
        </div>

        {/* Incoming Threat Bounces */}
        {frame < 500 && Array.from({ length: 4 }).map((_, i) => {
           const bounceTime = (frame + i * 40) % 120;
           return (
             <div key={i} style={{
                position: "absolute",
                width: 10, height: 10,
                borderRadius: "50%",
                backgroundColor: bounceTime < 60 ? COLORS.NEGATIVE : COLORS.POSITIVE,
                transform: `
                  rotate(${i * 90 + frame}deg) 
                  translate(${interpolate(bounceTime, [0, 60, 120], [600, 225, 400])}px)
                `,
                opacity: interpolate(bounceTime, [0, 20, 100, 120], [0, 1, 1, 0])
             }} />
           );
        })}

        {/* Stability Title */}
        <div style={{
            position: "absolute",
            opacity: stability,
            transform: `scale(${interpolate(stability, [0, 1], [0.8, 1.2])})`,
            color: COLORS.TEXT_MAIN,
            fontSize: 100,
            fontFamily: FONTS.DISPLAY,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            textShadow: EFFECTS.GLOW_TEXT_LG,
            letterSpacing: 20,
            zIndex: 20
        }}>
            STABILITY
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={1} durationInFrames={187}><Scene1 /></Sequence>
      <Sequence from={188} durationInFrames={399}><Scene2 /></Sequence>
      <Sequence from={587} durationInFrames={546}><Scene3 /></Sequence>
      <Sequence from={1133} durationInFrames={297}><Scene4 /></Sequence>
      <Sequence from={1430} durationInFrames={297}><Scene5 /></Sequence>
      <Sequence from={1727} durationInFrames={571}><Scene6 /></Sequence>
      <Sequence from={2298} durationInFrames={180}><Scene7 /></Sequence>
      <Sequence from={2478} durationInFrames={660}><Scene8 /></Sequence>
      <Sequence from={3138} durationInFrames={228}><Scene9 /></Sequence>
      <Sequence from={3366} durationInFrames={662}><Scene10 /></Sequence>
    </AbsoluteFill>
  );
};
