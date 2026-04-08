import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  spring,
  interpolate,
  interpolateColors,
} from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme";
import { QuotePanel } from "../components/QuotePanel";
import { TypewriterText } from "../components/TypewriterText";
import { CounterText } from "../components/CounterText";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 자, 그럼 이게 실제로 뭘 하는 건지 볼게요.
 * 단어 등장 타이밍: "자,": 0f, "그럼": 30f, "이게": 33f, "실제로": 51f, "뭘": 79f, "하는": 91f, "건지": 106f, "볼게요.": 122f
 * 비주얼 컨셉: BG_BASE 배경에 "MAVEN SMART SYSTEM" 레이블이 TEXT_MUTED TRACKING_WIDER로 상단 중앙에 등장. 그 아래 수평 분리선이 좌→우 그려짐. "볼게요." 단어와 함께 세 개의 스텝 번호 [01] [02] [03]가 오른쪽 방향으로 STAGGER_MD 간격으로 순차 등장. 섹션 전체 구조를 예고하는 인트로 UI.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = spring({ frame, fps: 30, config: ANIMATION.SPRING_GENTLE });
  const titleY = interpolate(titleOpacity, [0, 1], [20, 0]);

  const lineProgress = spring({
    frame: frame - 15,
    fps: 30,
    config: ANIMATION.SPRING_SNAPPY,
  });

  const stepStartFrame = 122; // "볼게요."

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 200, display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
        <h2
          style={{
            color: COLORS.TEXT_MUTED,
            fontSize: FONTS.SIZE_LG,
            fontWeight: FONTS.WEIGHT_SEMIBOLD,
            letterSpacing: FONTS.TRACKING_WIDER,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: SPACING.PX_32,
          }}
        >
          MAVEN SMART SYSTEM
        </h2>
        <div style={{ width: `${lineProgress * 100}%`, height: 2, backgroundColor: COLORS.BORDER_STRONG }} />
        
        <div style={{ display: "flex", gap: SPACING.PX_96, marginTop: SPACING.PX_96 }}>
          {[1, 2, 3].map((num, i) => {
            const stepFrame = frame - (stepStartFrame + i * 10);
            const stepScale = spring({ frame: Math.max(0, stepFrame), fps: 30, config: ANIMATION.SPRING_SNAPPY });
            const stepOpacity = interpolate(stepFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

            return (
              <div
                key={num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  border: `2px solid ${COLORS.BORDER_STRONG}`,
                  borderRadius: num === 1 ? 0 : 4, // Straight edges, minimal border radius
                  color: COLORS.TEXT_MUTED,
                  fontSize: FONTS.SIZE_2XL,
                  fontWeight: FONTS.WEIGHT_BOLD,
                  opacity: stepOpacity,
                  transform: `scale(${stepScale})`,
                  backgroundColor: COLORS.BG_ELEVATED,
                }}
              >
                0{num}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 메이븐 안에 "메이븐 스마트 시스템" 이라는 AI가 있는데, 이 AI가 하는 일이 크게 세 가지예요.
 * 단어 등장 타이밍: "메이븐": 154f, "안에": 184f, "\"메이븐": 214f, "스마트": 234f, "시스템\"": 265f, "이라는": 326f, "AI가": 343f, "있는데,": 380f, "이": 389f, "AI가": 415f, "하는": 426f, "일이": 446f, "크게": 466f, "세": 479f, "가지예요.": 527f
 * 비주얼 컨셉: 화면 중앙에 BG_ELEVATED 배경의 시스템 카드가 등장. 상단에 "PROJECT MAVEN" → 내부에 화살표와 함께 "MAVEN SMART SYSTEM" 서브 레이블. "세 가지예요." 단어와 함께 하단에 세 개의 빈 항목 플레이스홀더 [——] [——] [——] stagger 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const cardProgress = spring({ frame, fps: 30, config: ANIMATION.SPRING_GENTLE });
  const cardScale = interpolate(cardProgress, [0, 1], [0.95, 1]);
  
  const placeholdersStartFrame = 373 - 527 + 527; // "세 가지예요."는 479f, offset from 154f is 479 - 154 = 325.
  const stepStartFrame = 479 - 154; // "세": 479f (Scene2 starts at 154)

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 800,
          backgroundColor: COLORS.BG_ELEVATED,
          border: `1px solid ${COLORS.BORDER_STRONG}`,
          boxShadow: EFFECTS.SHADOW_MD,
          padding: SPACING.PX_96,
          display: "flex",
          flexDirection: "column",
          opacity: cardProgress,
          transform: `scale(${cardScale})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: SPACING.PX_64 }}>
          <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
            PROJECT MAVEN
          </div>
          <div style={{ margin: `0 ${SPACING.PX_16}px`, color: COLORS.PRIMARY, fontSize: FONTS.SIZE_SM }}>→</div>
          <div style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
            MAVEN SMART SYSTEM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_32 }}>
          {[1, 2, 3].map((num, i) => {
            const rowFrame = frame - (stepStartFrame + i * 10);
            const rowOpacity = interpolate(rowFrame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const rowX = interpolate(rowFrame, [0, 15], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div
                key={num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: SPACING.PX_24,
                  backgroundColor: COLORS.BG_BASE,
                  border: `1px solid ${COLORS.BORDER}`,
                  opacity: rowOpacity,
                  transform: `translateX(${rowX}px)`,
                }}
              >
                <div style={{ color: COLORS.TEXT_DISABLED, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, marginRight: SPACING.PX_32 }}>
                  0{num}
                </div>
                <div style={{ color: COLORS.TEXT_DISABLED, fontSize: FONTS.SIZE_MD, letterSpacing: FONTS.TRACKING_WIDER }}>
                  ————————
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 첫째, 보는 거예요.
 * 단어 등장 타이밍: "첫째,": 527f, "보는": 575f, "거예요.": 580f
 * 비주얼 컨셉: [01] 플레이스홀더가 PRIMARY 색 채워지며 텍스트 "보기 (DETECT)" 등장. 숫자 "01" PRIMARY 색 SIZE_2XL로 좌측에 크게 배치, 우측에 기능명 텍스트. 나머지 [02][03]은 TEXT_DISABLED 유지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const highlightProgress = spring({ frame: frame - 15, fps: 30, config: ANIMATION.SPRING_SNAPPY }); // Delay slightly for transition
  const activeColor = interpolateColors(highlightProgress, [0, 1], [COLORS.TEXT_DISABLED, COLORS.PRIMARY]);
  const activeBg = interpolateColors(highlightProgress, [0, 1], [COLORS.BG_BASE, "rgba(0, 240, 255, 0.1)"]);
  const activeBorder = interpolateColors(highlightProgress, [0, 1], [COLORS.BORDER, COLORS.PRIMARY]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 800,
          backgroundColor: COLORS.BG_ELEVATED,
          border: `1px solid ${COLORS.BORDER_STRONG}`,
          boxShadow: EFFECTS.SHADOW_MD,
          padding: SPACING.PX_96,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: SPACING.PX_64 }}>
          <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
            PROJECT MAVEN
          </div>
          <div style={{ margin: `0 ${SPACING.PX_16}px`, color: COLORS.PRIMARY, fontSize: FONTS.SIZE_SM }}>→</div>
          <div style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
            MAVEN SMART SYSTEM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_32 }}>
          {[1, 2, 3].map((num) => {
            const isActive = num === 1;
            return (
              <div
                key={num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: SPACING.PX_24,
                  backgroundColor: isActive ? activeBg : COLORS.BG_BASE,
                  border: `1px solid ${isActive ? activeBorder : COLORS.BORDER}`,
                  boxShadow: isActive ? `0 0 10px ${activeBorder}` : "none",
                }}
              >
                <div style={{ color: isActive ? activeColor : COLORS.TEXT_DISABLED, fontSize: isActive ? FONTS.SIZE_2XL : FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, marginRight: SPACING.PX_32 }}>
                  0{num}
                </div>
                <div style={{ color: isActive ? activeColor : COLORS.TEXT_DISABLED, fontSize: isActive ? FONTS.SIZE_XL : FONTS.SIZE_MD, fontWeight: isActive ? FONTS.WEIGHT_BOLD : FONTS.WEIGHT_REGULAR, letterSpacing: FONTS.TRACKING_WIDER }}>
                  {isActive ? "보기 (DETECT)" : "————————"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 드론에서 오는 영상, 위성 사진, 레이더 데이터를 전부 받아서 분석해요.
 * 단어 등장 타이밍: "드론에서": 628f, "오는": 665f, "영상,": 702f, "위성": 710f, "사진,": 754f, "레이더": 784f, "데이터를": 820f, "전부": 839f, "받아서": 868f, "분석해요.": 926f
 * 비주얼 컨셉: 세 개의 INPUT 소스가 수직 열로 등장: [DRONE FEED] → [SATELLITE IMG] → [RADAR DATA]. 각각 단어 등장 시 STAGGER 순서로 나타남. 세 소스에서 중앙 AI 노드(원형, PRIMARY 테두리)로 수평 화살표 선이 집중되는 데이터 흐름 다이어그램.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  const inputs = [
    { label: "드론 영상", frameStart: 702 - 628, icon: "⌖" }, // "영상"
    { label: "위성 사진", frameStart: 754 - 628, icon: "✧" }, // "사진"
    { label: "레이더 데이터", frameStart: 784 - 628, icon: "⚲" }, // "레이더"
  ];

  const arrowProgressStart = 820 - 628; // "데이터를"
  const aiNodeStart = 868 - 628; // "받아서"
  const analysisStart = 926 - 628; // "분석해요"

  const aiNodeScale = spring({ frame: Math.max(0, frame - aiNodeStart), fps: 30, config: ANIMATION.SPRING_BOUNCY });
  const pulse = Math.sin((frame - analysisStart) * 0.2) * 0.5 + 0.5;
  const aiNodeGlow = frame > analysisStart ? `0 0 ${20 + pulse * 40}px ${COLORS.PRIMARY_GLOW}` : "none";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", width: "100%", maxWidth: 1000, justifyContent: "space-between", alignItems: "center" }}>
        
        {/* INPUT SOURCES */}
        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_48, zIndex: Z.CONTENT }}>
          {inputs.map((input, idx) => {
            const inputScale = spring({ frame: Math.max(0, frame - input.frameStart), fps: 30, config: ANIMATION.SPRING_SNAPPY });
            const inputOpacity = interpolate(frame - input.frameStart, [0, 10], [0, 1], { extrapolateRight: "clamp" });
            
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`,
                  backgroundColor: COLORS.BG_SURFACE,
                  border: `1px solid ${COLORS.BORDER_STRONG}`,
                  opacity: inputOpacity,
                  transform: `scale(${inputScale})`,
                }}
              >
                <span style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_MD, marginRight: SPACING.PX_16 }}>{input.icon}</span>
                <span style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
                  {input.label}
                </span>
                
                {/* Connecting Line Right */}
                <div style={{ position: "absolute", right: -200, top: "50%", width: 200, height: 1, overflow: "hidden" }}>
                   <div style={{ 
                     width: "100%", 
                     height: "100%", 
                     backgroundColor: COLORS.PRIMARY,
                     transform: `translateX(${-100 + interpolate(Math.max(0, frame - arrowProgressStart), [0, 15], [0, 100], { extrapolateRight: "clamp" })}%)`
                   }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI NODE */}
        <div
          style={{
            position: "relative",
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: `2px solid ${COLORS.PRIMARY}`,
            backgroundColor: COLORS.BG_ELEVATED,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${aiNodeScale})`,
            boxShadow: aiNodeGlow,
            zIndex: Z.CONTENT
          }}
        >
           <span style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
             AI 코어
           </span>
        </div>

      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: "저기 움직이는 거 차량이야, 사람이야?
 * 단어 등장 타이밍: "\"저기": 926f, "움직이는": 944f, "거": 977f, "차량이야,": 985f, "사람이야?": 1027f
 * 비주얼 컨셉: GLASS_BG 인용문 패널 등장. AI 분석 쿼리 형태의 UI: 패널 좌측에 "QUERY 1:" 레이블(TEXT_MUTED), 질문 텍스트가 타이핑 이펙트로 등장. 하단에 옵션 태그 [VEHICLE] vs [HUMAN]이 점멸 대기 상태.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();

  const optionsStartFrame = 1027 - 926; // "사람이야?"
  const optionsOpacity = spring({ frame: Math.max(0, frame - optionsStartFrame), fps: 30, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <QuotePanel startFrame={0}>
        <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_16 }}>
          질의 1:
        </div>
        <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_MEDIUM, lineHeight: FONTS.LEADING_LOOSE }}>
          <TypewriterText text="저기 움직이는 거 차량이야, 사람이야?" startFrame={0} framesPerChar={2} />
        </div>
        <div style={{ marginTop: SPACING.PX_32, display: "flex", gap: SPACING.PX_16, opacity: optionsOpacity }}>
           <div style={{ padding: `${SPACING.PX_8}px ${SPACING.PX_16}px`, border: `1px solid ${COLORS.BORDER_STRONG}`, color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_SM }}>[차량]</div>
           <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, display: "flex", alignItems: "center" }}>vs</div>
           <div style={{ padding: `${SPACING.PX_8}px ${SPACING.PX_16}px`, border: `1px solid ${COLORS.BORDER_STRONG}`, color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_SM }}>[사람]</div>
        </div>
      </QuotePanel>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: ", "저 건물에서 열 감지가 되는데 뭐가 있는 거지?
 * 단어 등장 타이밍: "\",": 1069f, "\"저": 1077f, "건물에서": 1110f, "열": 1144f, "감지가": 1169f, "되는데": 1186f, "뭐가": 1202f, "있는": 1232f, "거지?": 1232f
 * 비주얼 컨셉: 인용문 패널에 "QUERY 2:" 레이블과 함께 두 번째 질문 타이핑. "열" 단어 등장 시 패널 우측에 열감지 표시 (적색 → 오렌지 그라데이션의 수직 바, 추상적 ACCENT 색 표현). GLOW_ACCENT 효과로 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  
  const heatStartFrame = 1144 - 1069; // "열"
  const heatHeight = spring({ frame: Math.max(0, frame - heatStartFrame), fps: 30, config: ANIMATION.SPRING_BOUNCY });
  const pulse = Math.sin((frame - heatStartFrame) * 0.3) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <QuotePanel startFrame={0}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: SPACING.PX_32 }}>
          <div>
            <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_16 }}>
              질의 2:
            </div>
            <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_MEDIUM, lineHeight: FONTS.LEADING_LOOSE }}>
              <TypewriterText text="저 건물에서 열 감지가 되는데 뭐가 있는 거지?" startFrame={0} />
            </div>
          </div>
          
          {/* Heat signature bar */}
          <div style={{ 
            width: 8, 
            height: 120, 
            backgroundColor: COLORS.BG_SURFACE, 
            border: `1px solid ${COLORS.BORDER}`,
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: `${heatHeight * 100}%`,
              background: `linear-gradient(to top, ${COLORS.WARNING}, ${COLORS.NEGATIVE})`,
              boxShadow: EFFECTS.GLOW_ACCENT,
              opacity: 0.8 + pulse * 0.2
            }} />
          </div>
        </div>
      </QuotePanel>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 이런 걸 끊임없이 판단하는 겁니다.
 * 단어 등장 타이밍: "\"": 1232f, "이런": 1248f, "걸": 1258f, "끊임없이": 1292f, "판단하는": 1328f, "겁니다.": 1367f
 * 비주얼 컨셉: 인용문 패널 사라짐. 중앙에 타이머 스타일 UI: "처리 속도" 카운터가 빠르게 증가. "끊임없이" 단어 등장 시 카운터 무한 루프 스크롤 애니메이션으로 전환. TEXT_MUTED SIZE_SM "CONTINUOUS PROCESSING" 레이블 아래에 표시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  const loopStartFrame = 1292 - 1232; // "끊임없이"
  const isLooping = frame >= loopStartFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ 
          fontSize: FONTS.SIZE_4XL, 
          fontWeight: FONTS.WEIGHT_EXTRABOLD, 
          color: COLORS.PRIMARY, 
          fontFamily: FONTS.MONO,
          textShadow: EFFECTS.GLOW_LG
        }}>
          {isLooping ? (
             <div style={{ display: "flex", overflow: "hidden", height: 160 }}>
               <div style={{ transform: `translateY(${(frame * -10) % 100}px)` }}>
                 {(frame * 97 % 9999).toString().padStart(4, '0')}
               </div>
             </div>
          ) : (
            <CounterText from={0} to={8999} durationInFrames={60} />
          )}
        </div>
        <div style={{ 
          marginTop: SPACING.PX_16, 
          color: COLORS.TEXT_MUTED, 
          fontSize: FONTS.SIZE_SM, 
          letterSpacing: FONTS.TRACKING_WIDER,
          opacity: isLooping ? 1 : 0.5
        }}>
          연속 처리 중
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 둘째, 연결하는 거예요.
 * 단어 등장 타이밍: "둘째,": 1393f, "연결하는": 1420f, "거예요.": 1450f
 * 비주얼 컨셉: [02] 플레이스홀더가 PRIMARY 색 채워지며 텍스트 "연결 (CORRELATE)" 등장. "01" 은 SECONDARY 완료 상태로, "03"은 TEXT_DISABLED 유지. 기능 인덱스 전환 애니메이션.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  const activeBg = "rgba(0, 240, 255, 0.1)";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 800,
          backgroundColor: COLORS.BG_ELEVATED,
          border: `1px solid ${COLORS.BORDER_STRONG}`,
          boxShadow: EFFECTS.SHADOW_MD,
          padding: SPACING.PX_96,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: SPACING.PX_64 }}>
          <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
            PROJECT MAVEN
          </div>
          <div style={{ margin: `0 ${SPACING.PX_16}px`, color: COLORS.PRIMARY, fontSize: FONTS.SIZE_SM }}>→</div>
          <div style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
            MAVEN SMART SYSTEM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_32 }}>
          {[1, 2, 3].map((num) => {
            const isCompleted = num === 1;
            const isActive = num === 2;

            const iconScale = spring({ frame: Math.max(0, frame - 15), fps: 30, config: ANIMATION.SPRING_SNAPPY });
            
            return (
              <div
                key={num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: SPACING.PX_24,
                  backgroundColor: isActive ? activeBg : COLORS.BG_BASE,
                  border: `1px solid ${isActive ? COLORS.PRIMARY : COLORS.BORDER}`,
                  boxShadow: isActive ? `0 0 10px ${COLORS.PRIMARY}` : "none",
                }}
              >
                <div style={{ 
                  color: isActive ? COLORS.PRIMARY : (isCompleted ? COLORS.SECONDARY : COLORS.TEXT_DISABLED), 
                  fontSize: isActive ? FONTS.SIZE_2XL : FONTS.SIZE_LG, 
                  fontWeight: FONTS.WEIGHT_BOLD, 
                  marginRight: SPACING.PX_32,
                  transform: isActive ? `scale(${iconScale})` : "scale(1)",
                }}>
                  0{num}
                </div>
                <div style={{ 
                  color: isActive ? COLORS.PRIMARY : (isCompleted ? COLORS.SECONDARY : COLORS.TEXT_DISABLED), 
                  fontSize: isActive ? FONTS.SIZE_XL : FONTS.SIZE_MD, 
                  fontWeight: isActive ? FONTS.WEIGHT_BOLD : FONTS.WEIGHT_REGULAR, 
                  letterSpacing: FONTS.TRACKING_WIDER 
                }}>
                  {isActive ? "연결 (CORRELATE)" : (isCompleted ? "보기 (DETECT)" : "————————")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 영상만 보는 게 아니에요.
 * 단어 등장 타이밍: "영상만": 1484f, "보는": 1526f, "게": 1528f, "아니에요.": 1537f
 * 비주얼 컨셉: 화면 좌측에 "VIDEO ONLY" 레이블과 함께 단일 소스 박스. "아니에요." 단어 등장 시 박스 위에 NEGATIVE 색 사선(X)이 그어짐. 브릿지 씬으로 다음 다중소스 연결 씬 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();

  const crossStart = 1537 - 1484; // "아니에요." 
  const crossWidth = spring({ frame: Math.max(0, frame - crossStart), fps: 30, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", padding: SPACING.PX_48, border: `2px solid ${COLORS.BORDER_STRONG}`, backgroundColor: COLORS.BG_SURFACE, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
          영상 데이터
        </span>
        
        {/* Negative X mark */}
        <div style={{ 
          position: "absolute", 
          width: `${crossWidth * 120}%`, 
          height: 6, 
          backgroundColor: COLORS.NEGATIVE,
          transform: "rotate(15deg)",
          boxShadow: EFFECTS.GLOW_ACCENT,
        }} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: IP 주소, 소셜미디어 위치 태그, GPS 정보까지 전부 긁어와서 교차 분석해요.
 * 단어 등장 타이밍: "IP": 1588f, "주소,": 1594f, "소셜미디어": 1622f, "위치": 1675f, "태그,": 1693f, "GPS": 1721f, "정보까지": 1730f, "전부": 1771f, "긁어와서": 1792f, "교차": 1832f, "분석해요.": 1852f
 * 비주얼 컨셉: 다중 소스 노드 다이어그램: [IP ADDRESS] [SNS TAG] [GPS DATA] 세 노드가 각 단어 stagger로 등장하여 중앙 AI 노드에 연결선이 그려짐. 연결선들이 만나는 중앙 노드에서 교차 분석 pulse 애니메이션 발생.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  const ipStart = 1588 - 1588; // 0
  const snsStart = 1622 - 1588; // 34
  const gpsStart = 1721 - 1588; // 133
  const analyzeStart = 1852 - 1588; // 264

  const sources = [
    { label: "IP 주소", start: ipStart, y: -200 },
    { label: "SNS 태그", start: snsStart, y: 0 },
    { label: "GPS 데이터", start: gpsStart, y: 200 },
  ];

  const pulse = Math.sin((frame - analyzeStart) * 0.3) * 0.5 + 0.5;
  const centralGlow = frame > analyzeStart ? `0 0 ${30 + pulse * 40}px ${COLORS.PRIMARY_GLOW}` : "none";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: 800, height: 600, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_48, width: 250 }}>
          {sources.map((source, i) => {
            const appear = spring({ frame: Math.max(0, frame - source.start), fps: 30, config: ANIMATION.SPRING_SNAPPY });
            return (
              <div key={i} style={{ 
                position: "relative",
                padding: SPACING.PX_16, 
                backgroundColor: COLORS.BG_SURFACE, 
                border: `1px solid ${COLORS.BORDER}`,
                transform: `scale(${appear})`,
                opacity: appear,
                display: "flex", justifyContent: "center"
              }}>
                <span style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD }}>
                  {source.label}
                </span>

                {/* 연결선 */}
                <svg style={{ position: "absolute", left: "100%", top: "50%", width: 300, height: 2, overflow: "visible" }}>
                  <line 
                    x1="0" y1="0" 
                    x2={interpolate(frame - source.start - 10, [0, 20], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} 
                    y2={source.y === 0 ? 0 : -source.y} // 중앙 AI를 향하게
                    stroke={COLORS.PRIMARY} strokeWidth="2"
                    opacity={frame > source.start + 10 ? 1 : 0}
                  />
                </svg>
              </div>
            );
          })}
        </div>

        {/* AI 중앙 노드 */}
        <div style={{ 
          width: 150, height: 150, 
          borderRadius: "50%", 
          backgroundColor: COLORS.BG_ELEVATED,
          border: `2px solid ${COLORS.PRIMARY}`,
          display: "flex", justifyContent: "center", alignItems: "center",
          boxShadow: centralGlow,
          zIndex: Z.CONTENT
        }}>
           <span style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
             AI 코어
           </span>
        </div>

      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: "이 차량이 어제 이 SNS 계정 근처에 있었는데?
 * 단어 등장 타이밍: "\"이": 1920f, "차량이": 1929f, "어제": 1956f, "이": 1975f, "SNS": 1984f, "계정": 1993f, "근처에": 2011f, "있었는데?": 2037f
 * 비주얼 컨셉: GLASS_BG 패널에 상관관계 결과 UI: 상단 [VEHICLE ID: XX-7731] / 하단 [SNS ACCOUNT: @xxx]. 두 항목 사이에 "CORRELATION DETECTED" 레이블과 PRIMARY 색 연결선. "있었는데?" 단어에 GLOW_MD 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();

  const wordHighlight = 2037 - 1920; // "있었는데?"

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        padding: SPACING.PX_64, 
        backgroundColor: EFFECTS.GLASS_BG, 
        backdropFilter: EFFECTS.GLASS_BLUR,
        border: `1px solid ${EFFECTS.GLASS_BORDER}`,
        display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32
      }}>
        <div style={{ color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_MD, letterSpacing: FONTS.TRACKING_WIDER }}>
          차량 ID: <span style={{ color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>XX-7731</span>
        </div>
        
        <div style={{ 
          display: "flex", alignItems: "center", gap: SPACING.PX_16,
          transform: `scale(${spring({ frame: Math.max(0, frame - 30), fps: 30, config: ANIMATION.SPRING_BOUNCY })})`
        }}>
          <div style={{ width: 60, height: 2, backgroundColor: COLORS.PRIMARY }} />
          <div style={{ 
            color: COLORS.PRIMARY, fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD,
            textShadow: frame >= wordHighlight ? EFFECTS.GLOW_MD : "none"
          }}>
            상관관계 감지됨
          </div>
          <div style={{ width: 60, height: 2, backgroundColor: COLORS.PRIMARY }} />
        </div>

        <div style={{ color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_MD, letterSpacing: FONTS.TRACKING_WIDER }}>
          SNS 계정: <span style={{ color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>@xxx</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 이런 식으로 흩어진 점들을 연결하는 거거든요.
 * 단어 등장 타이밍: "\"": 2076f, "이런": 2093f, "식으로": 2121f, "흩어진": 2148f, "점들을": 2176f, "연결하는": 2212f, "거거든요.": 2266f
 * 비주얼 컨셉: 추상적인 노드-엣지 그래프 시각화. 여러 점(TEXT_DISABLED 색 원형)들이 흩어져 있다가 "연결하는" 단어에서 선들이 PRIMARY 색으로 빠르게 연결됨. "거거든요." 단어에 그래프 전체가 PRIMARY_DIM 배경으로 유지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();

  const connectStart = 2212 - 2076; // "연결하는"
  const endStart = 2266 - 2076; // "거거든요"

  const nodes = [
    { x: -200, y: -100 }, { x: 0, y: -150 }, { x: 200, y: -80 },
    { x: -150, y: 50 }, { x: 100, y: 100 }, { x: 250, y: 50 }
  ];

  return (
    <AbsoluteFill style={{ 
      backgroundColor: frame > endStart ? COLORS.PRIMARY_DIM : COLORS.BG_BASE,
      justifyContent: "center", alignItems: "center",
      transition: "background-color 0.5s" 
    }}>
      <div style={{ position: "relative", width: 600, height: 400 }}>
        {/* Edges */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
          {nodes.map((n1, i) => 
            nodes.slice(i + 1).map((n2, j) => {
              const lineFrames = Math.max(0, frame - connectStart - (i * 2 + j));
              const progress = interpolate(lineFrames, [0, 15], [0, 1], { extrapolateRight: "clamp" });
              return progress > 0 ? (
                <line 
                  key={`${i}-${j}`}
                  x1={300 + n1.x} y1={200 + n1.y}
                  x2={300 + n1.x + (n2.x - n1.x) * progress} 
                  y2={200 + n1.y + (n2.y - n1.y) * progress}
                  stroke={COLORS.PRIMARY} strokeWidth="2"
                  opacity={0.6}
                />
              ) : null;
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((n, i) => {
          const isConnected = frame > connectStart + i * 2;
          return (
            <div key={i} style={{
              position: "absolute",
              left: 300 + n.x - 10,
              top: 200 + n.y - 10,
              width: 20, height: 20,
              borderRadius: "50%",
              backgroundColor: isConnected ? COLORS.PRIMARY : COLORS.TEXT_DISABLED,
              boxShadow: isConnected ? EFFECTS.GLOW_SM : "none",
              transition: "all 0.3s"
            }} />
          )
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 셋째, 보고하는 거예요.
 * 단어 등장 타이밍: "셋째,": 2266f, "보고하는": 2309f, "거예요.": 2335f
 * 비주얼 컨셉: [03] 플레이스홀더 PRIMARY 채워짐, "보고 (REPORT)" 텍스트 등장. 세 번호 [01] [02] [03] 모두 완료 상태로 순차 SECONDARY 색 전환하며 체크 느낌.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const activeBg = "rgba(0, 240, 255, 0.1)";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: 800,
          backgroundColor: COLORS.BG_ELEVATED,
          border: `1px solid ${COLORS.BORDER_STRONG}`,
          boxShadow: EFFECTS.SHADOW_MD,
          padding: SPACING.PX_96,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: SPACING.PX_64 }}>
          <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
            PROJECT MAVEN
          </div>
          <div style={{ margin: `0 ${SPACING.PX_16}px`, color: COLORS.PRIMARY, fontSize: FONTS.SIZE_SM }}>→</div>
          <div style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
            MAVEN SMART SYSTEM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_32 }}>
          {[1, 2, 3].map((num) => {
            const isCompleted = num === 1 || num === 2;
            const isActive = num === 3;

            const iconScale = spring({ frame: Math.max(0, frame - 15), fps: 30, config: ANIMATION.SPRING_SNAPPY });
            
            return (
              <div
                key={num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: SPACING.PX_24,
                  backgroundColor: isActive ? activeBg : COLORS.BG_BASE,
                  border: `1px solid ${isActive ? COLORS.PRIMARY : COLORS.BORDER}`,
                  boxShadow: isActive ? `0 0 10px ${COLORS.PRIMARY}` : "none",
                }}
              >
                <div style={{ 
                  color: isActive ? COLORS.PRIMARY : (isCompleted ? COLORS.SECONDARY : COLORS.TEXT_DISABLED), 
                  fontSize: isActive ? FONTS.SIZE_2XL : FONTS.SIZE_LG, 
                  fontWeight: FONTS.WEIGHT_BOLD, 
                  marginRight: SPACING.PX_32,
                  transform: isActive ? `scale(${iconScale})` : "scale(1)",
                }}>
                  0{num}
                </div>
                <div style={{ 
                  color: isActive ? COLORS.PRIMARY : (isCompleted ? COLORS.SECONDARY : COLORS.TEXT_DISABLED), 
                  fontSize: isActive ? FONTS.SIZE_XL : FONTS.SIZE_MD, 
                  fontWeight: isActive ? FONTS.WEIGHT_BOLD : FONTS.WEIGHT_REGULAR, 
                  letterSpacing: FONTS.TRACKING_WIDER 
                }}>
                  {isActive ? "보고 (REPORT)" : (num === 1 ? "보기 (DETECT)" : "연결 (CORRELATE)")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: "이건 군사 시설일 확률 98%입니다, 사령관님 결정하세요.
 * 단어 등장 타이밍: "\"이건": 2377f, "군사": 2408f, "시설일": 2418f, "확률": 2451f, "98%입니다,": 2468f, "사령관님": 2542f, "결정하세요.": 2585f
 * 비주얼 컨셉: AI 보고서 UI 패널. 상단 "AI REPORT" 레이블, 내부: [CLASSIFICATION: MILITARY FACILITY] + [CONFIDENCE: 98%] 수치가 counter up으로 등장. "98%" 단어에 PRIMARY GLOW_LG 강조. 하단 "— DECISION REQUIRED" 레이블 ACCENT 색 blink.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  const frame = useCurrentFrame();

  const highlightFrame = 2468 - 2377; // "98%입니다"
  const showPercent = frame >= highlightFrame;
  const blink = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 700,
        backgroundColor: EFFECTS.GLASS_BG,
        backdropFilter: EFFECTS.GLASS_BLUR,
        border: `1px solid ${EFFECTS.GLASS_BORDER}`,
        padding: SPACING.PX_64,
        display: "flex", flexDirection: "column"
      }}>
        <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_32, borderBottom: `1px solid ${COLORS.BORDER_STRONG}`, paddingBottom: SPACING.PX_16 }}>
          AI 보고서
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: SPACING.PX_48 }}>
          <div>
            <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM }}>분류</div>
            <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>군사 시설</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM }}>확률</div>
            <div style={{ 
              color: showPercent ? COLORS.PRIMARY : COLORS.TEXT_BODY, 
              fontSize: FONTS.SIZE_3XL, 
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              textShadow: showPercent ? EFFECTS.GLOW_LG : "none",
              fontFamily: FONTS.MONO
            }}>
              <CounterText from={0} to={98} durationInFrames={30} suffix="%" />
            </div>
          </div>
        </div>

        <div style={{ 
          color: COLORS.ACCENT, 
          fontSize: FONTS.SIZE_SM, 
          fontWeight: FONTS.WEIGHT_BOLD, 
          letterSpacing: FONTS.TRACKING_WIDER,
          opacity: blink ? 1 : 0.3
        }}>
          — 결정 필요
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 15 기획안]
 * 원본 텍스트: 이렇게 우선순위 리스트를 뽑아서 사람한테 넘기는 거예요.
 * 단어 등장 타이밍: "\"": 2652f, "이렇게": 2681f, "우선순위": 2703f, "리스트를": 2732f, "뽑아서": 2756f, "사람한테": 2785f, "넘기는": 2807f, "거예요.": 2842f
 * 비주얼 컨셉: 리스트 UI: [#1 TARGET — 98% / #2 TARGET — 94% / #3 TARGET — 87%] 항목이 STAGGER_SM으로 등장. 리스트가 완성되면 우측으로 slide-out하며 "→ HUMAN COMMANDER" 화살표와 함께 수신자 레이블로 전달.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene15: React.FC = () => {
  const frame = useCurrentFrame();

  const slideOutStart = 2807 - 2652; // "넘기는"
  const slideX = interpolate(Math.max(0, frame - slideOutStart), [0, 20], [0, 400], { extrapolateRight: "clamp" });
  
  const targets = [
    { id: "#1 표적", conf: "98%" },
    { id: "#2 표적", conf: "94%" },
    { id: "#3 표적", conf: "87%" }
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        display: "flex", alignItems: "center", gap: SPACING.PX_64,
        transform: `translateX(${slideX}px)`
      }}>
        <div style={{
          width: 500,
          backgroundColor: EFFECTS.GLASS_BG,
          backdropFilter: EFFECTS.GLASS_BLUR,
          border: `1px solid ${EFFECTS.GLASS_BORDER}`,
          padding: SPACING.PX_40,
          display: "flex", flexDirection: "column", gap: SPACING.PX_16
        }}>
          {targets.map((t, i) => {
            const itemAppear = spring({ frame: Math.max(0, frame - i * 8), fps: 30, config: ANIMATION.SPRING_SNAPPY });
            return (
              <div key={i} style={{ 
                display: "flex", justifyContent: "space-between", 
                padding: SPACING.PX_16,
                backgroundColor: COLORS.BG_SURFACE,
                borderLeft: `4px solid ${i === 0 ? COLORS.PRIMARY : COLORS.BORDER_STRONG}`,
                opacity: interpolate(itemAppear, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(itemAppear, [0, 1], [-20, 0])}px)`
              }}>
                <span style={{ color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>{t.id}</span>
                <span style={{ color: COLORS.PRIMARY, fontFamily: FONTS.MONO }}>{t.conf}</span>
              </div>
            )
          })}
        </div>

        {frame > slideOutStart - 10 && (
          <div style={{ 
            color: COLORS.TEXT_MUTED, 
            fontSize: FONTS.SIZE_MD, 
            fontWeight: FONTS.WEIGHT_BOLD, 
            letterSpacing: FONTS.TRACKING_WIDER,
            opacity: spring({ frame: frame - slideOutStart + 10, fps: 30, config: ANIMATION.SPRING_GENTLE })
          }}>
            → 사령관 전달
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 16 기획안]
 * 원본 텍스트: 근데 이게 얼마나 빠른지 아세요?
 * 단어 등장 타이밍: "근데": 2842f, "이게": 2860f, "얼마나": 2893f, "빠른지": 2909f, "아세요?": 2939f
 * 비주얼 컨셉: 화면 중앙에 시계 타이머 UI가 등장. "00:00:00" 형식에서 초가 빠르게 카운트되기 시작. "빠른지" 단어에 타이머 속도가 2배로 증가. 하단에 "SPEED: ?" 레이블 대기 상태.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const speedUpStart = 2909 - 2842; // "빠른지" 
  
  let timeValue = 0;
  if (frame < speedUpStart) {
    timeValue = frame * 2;
  } else {
    timeValue = speedUpStart * 2 + (frame - speedUpStart) * 15;
  }

  const ms = Math.floor(timeValue * 10) % 1000;
  const s = Math.floor(timeValue / 100) % 60;
  const m = Math.floor(timeValue / 6000) % 60;

  const pad = (n: number, w: number) => n.toString().padStart(w, '0');

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32 }}>
        <div style={{ 
          fontSize: FONTS.SIZE_4XL, 
          fontFamily: FONTS.MONO, 
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          color: frame >= speedUpStart ? COLORS.WARNING : COLORS.PRIMARY,
          textShadow: frame >= speedUpStart ? EFFECTS.GLOW_ACCENT : EFFECTS.GLOW_LG,
          fontVariantNumeric: "tabular-nums"
        }}>
          {pad(m, 2)}:{pad(s, 2)}:{pad(ms, 3)}
        </div>
        <div style={{ 
          color: COLORS.TEXT_MUTED, 
          fontSize: FONTS.SIZE_MD, 
          letterSpacing: FONTS.TRACKING_WIDER,
          fontWeight: FONTS.WEIGHT_BOLD
        }}>
          속도: {frame >= speedUpStart ? <span style={{ color: COLORS.WARNING }}>!!!</span> : "?"}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 17 기획안]
 * 원본 텍스트: 미 육군 장교가 직접 밝힌 얘기예요.
 * 단어 등장 타이밍: "미": 2975f, "육군": 2985f, "장교가": 3007f, "직접": 3032f, "밝힌": 3052f, "얘기예요.": 3070f
 * 비주얼 컨셉: 인용문 패널 등장. 상단에 출처 레이블 "U.S. ARMY OFFICER — Official Statement". GLASS_BG 배경, BORDER_STRONG 테두리. 내부 텍스트 영역 대기 상태(cursor blink).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 800,
        backgroundColor: EFFECTS.GLASS_BG,
        backdropFilter: EFFECTS.GLASS_BLUR,
        border: `1px solid ${EFFECTS.GLASS_BORDER}`,
        padding: SPACING.PX_64,
        display: "flex", flexDirection: "column"
      }}>
        <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_32, display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
          <div style={{ width: 12, height: 12, backgroundColor: COLORS.PRIMARY, borderRadius: "50%" }} />
          미 육군 장교 — 공식 브리핑
        </div>
        
        <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_MD, minHeight: 60, display: "flex", alignItems: "center" }}>
          {blink && <div style={{ width: 15, height: 30, backgroundColor: COLORS.ACCENT }} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 18 기획안]
 * 원본 텍스트: 메이븐 AI 덕분에 1시간에 최대 80개의 표적을 포착할 수 있게 됐다고 합니다.
 * 단어 등장 타이밍: "메이븐": 3155f, "AI": 3179f, "덕분에": 3184f, "1시간에": 3211f, "최대": 3250f, "80개의": 3262f, "표적을": 3293f, "포착할": 3321f, "수": 3343f, "있게": 3352f, "됐다고": 3373f, "합니다.": 3394f
 * 비주얼 컨셉: 중앙에 대형 숫자 "80" SIZE_4XL WEIGHT_EXTRABOLD PRIMARY GLOW_LG 발광으로 counter up 등장. 아래에 "표적 / 1시간" TEXT_MUTED SIZE_SM 레이블. 배경에 PRIMARY_DIM 방사형 glow. "80개의" 단어에서 최종값 정지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const stopFrame = 3262 - 3155; // "80개의"

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        position: "absolute", inset: 0, 
        background: EFFECTS.RADIAL_PRIMARY, 
        opacity: interpolate(frame, [0, 30], [0, 0.5]) 
      }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: Z.CONTENT }}>
        <div style={{ 
          fontSize: FONTS.SIZE_4XL * 2, 
          fontWeight: FONTS.WEIGHT_EXTRABOLD, 
          color: COLORS.PRIMARY, 
          fontFamily: FONTS.MONO,
          textShadow: EFFECTS.GLOW_LG,
          lineHeight: 1
        }}>
          {frame < stopFrame ? (
            <CounterText from={0} to={80} durationInFrames={stopFrame} />
          ) : (
            "80"
          )}
        </div>
        <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_LG, letterSpacing: FONTS.TRACKING_WIDER, marginTop: SPACING.PX_16 }}>
          표적 / 1시간
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 19 기획안]
 * 원본 텍스트: 사람이 하루 종일 영상 붙잡고 하나씩 확인할 걸, AI는 한 시간에 80개를 처리하는 거예요.
 * 단어 등장 타이밍: "사람이": 3430f, "하루": 3476f, "종일": 3482f, "영상": 3494f, "붙잡고": 3514f, "하나씩": 3540f, "확인할": 3568f, "걸,": 3598f, "AI는": 3604f, "한": 3619f, "시간에": 3656f, "80개를": 3694f, "처리하는": 3730f, "거예요.": 3780f
 * 비주얼 컨셉: 좌우 분할 비교 UI. 좌: [HUMAN] 느린 프로그레스 바 + "~days" 레이블 / 우: [AI] 빠른 프로그레스 바 + "80/hr" 레이블. "AI는" 단어 등장 시 우측 바가 PRIMARY 색으로 급속 채워짐. 명확한 속도 대비.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const aiStart = 3604 - 3430; // "AI는"
  
  const humanProgress = interpolate(frame, [0, 200], [0, 15], { extrapolateRight: "clamp" });
  const aiProgress = interpolate(Math.max(0, frame - aiStart), [0, 20], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 800, display: "flex", flexDirection: "column", gap: SPACING.PX_64 }}>
        
        {/* HUMAN */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: SPACING.PX_16 }}>
            <span style={{ color: COLORS.TEXT_BODY, fontWeight: FONTS.WEIGHT_BOLD }}>사람</span>
            <span style={{ color: COLORS.TEXT_MUTED, fontFamily: FONTS.MONO }}>~수일</span>
          </div>
          <div style={{ width: "100%", height: 16, backgroundColor: COLORS.BG_SURFACE, border: `1px solid ${COLORS.BORDER_STRONG}`, overflow: "hidden" }}>
            <div style={{ width: `${humanProgress}%`, height: "100%", backgroundColor: COLORS.TEXT_DISABLED }} />
          </div>
        </div>

        {/* AI */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: SPACING.PX_16 }}>
            <span style={{ color: COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_BOLD }}>AI</span>
            <span style={{ color: COLORS.PRIMARY, fontFamily: FONTS.MONO }}>80개/시간</span>
          </div>
          <div style={{ width: "100%", height: 16, backgroundColor: COLORS.BG_SURFACE, border: `1px solid ${COLORS.BORDER_PRIMARY}`, overflow: "hidden", boxShadow: frame >= aiStart ? EFFECTS.GLOW_SM : "none" }}>
            <div style={{ width: `${aiProgress}%`, height: "100%", backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_MD }} />
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 20 기획안]
 * 원본 텍스트: 속도가 전쟁의 성격 자체를 바꿔버린 겁니다.
 * 단어 등장 타이밍: "속도가": 3780f, "전쟁의": 3811f, "성격": 3827f, "자체를": 3842f, "바꿔버린": 3867f, "겁니다.": 3900f
 * 비주얼 컨셉: 배경 전체에 대각선 방향(우상향) 화살표 그래픽이 PRIMARY 색으로 그려지며 상승 모멘텀 시각화. 중앙 텍스트 "속도 = 전쟁의 주도권" SIZE_LG WEIGHT_BOLD로 fade-in. "바꿔버린" 단어에 배경 brief flash.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const changeWordFrame = 3867 - 3780; // "바꿔버린"
  
  const flashOpacity = Math.max(0, 1 - (frame - changeWordFrame) / 10);
  const isFlashed = frame >= changeWordFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      {/* Background Graphic (Diagonal Arrows) */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.1, overflow: "hidden" }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{ 
            position: "absolute", 
            width: "200%", height: 2, 
            backgroundColor: COLORS.PRIMARY, 
            transform: `rotate(-45deg) translateY(${i * 100 - 400}px) translateX(${frame * 5}px)` 
          }} />
        ))}
      </div>

      <div style={{ zIndex: Z.CONTENT, color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
        속도 = <span style={{ color: isFlashed ? COLORS.WARNING : COLORS.PRIMARY, transition: "color 0.2s" }}>전쟁의 주도권</span>
      </div>

      {isFlashed && flashOpacity > 0 && (
        <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.WARNING, opacity: flashOpacity * 0.3, zIndex: Z.OVERLAY }} />
      )}
    </AbsoluteFill>
  );
};

/**
 * [Scene 21 기획안]
 * 원본 텍스트: 자, 여기까지 들으면 "AI가 다 하는 거잖아, 무섭다" 이런 생각 드실 수 있어요.
 * 단어 등장 타이밍: "자,": 3937f, "여기까지": 3975f, "들으면": 3986f, "\"AI가": 4012f, "다": 4025f, "하는": 4034f, "거잖아,": 4051f, "무섭다\"": 4085f, "이런": 4125f, "생각": 4142f, "드실": 4153f, "수": 4170f, "있어요.": 4180f
 * 비주얼 컨셉: 화면 중앙에 "AI가 다 하는 거잖아, 무섭다" 텍스트가 GLASS_BG 배경의 말풍선 UI로 등장. 배경에 WARNING_DIM 오버레이. "무섭다" 단어 등장 시 텍스트에 NEGATIVE 색 강조 밑줄 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene21: React.FC = () => {
  const frame = useCurrentFrame();

  const scaryFrame = 4085 - 3937; // "무섭다"
  const showLine = frame >= scaryFrame;
  const lineScale = spring({ frame: Math.max(0, frame - scaryFrame), fps: 30, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.WARNING, opacity: 0.05, zIndex: Z.BG }} />
      
      <div style={{ 
        padding: SPACING.PX_64,
        backgroundColor: EFFECTS.GLASS_BG,
        backdropFilter: EFFECTS.GLASS_BLUR,
        border: `1px solid ${EFFECTS.GLASS_BORDER}`,
        borderRadius: SPACING.RADIUS_XL,
        zIndex: Z.CONTENT
      }}>
        <div style={{ 
          color: COLORS.TEXT_MAIN, 
          fontSize: FONTS.SIZE_LG, 
          fontWeight: FONTS.WEIGHT_MEDIUM, 
          letterSpacing: FONTS.TRACKING_WIDER,
          position: "relative"
        }}>
          "AI가 다 하는 거잖아, <span style={{ position: "relative" }}>
            무섭다
            {showLine && (
              <div style={{ 
                position: "absolute", bottom: -5, left: 0, height: 4, 
                backgroundColor: COLORS.NEGATIVE, 
                width: `${lineScale * 100}%`,
                boxShadow: EFFECTS.GLOW_ACCENT
              }} />
            )}
          </span>"
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 22 기획안]
 * 원본 텍스트: 근데 중요한 포인트가 있어요.
 * 단어 등장 타이밍: "근데": 4222f, "중요한": 4258f, "포인트가": 4264f, "있어요.": 4297f
 * 비주얼 컨셉: 화면이 클리어. 중앙에 대형 강조점(•) PRIMARY 색 pulse 등장. 그 옆에 "중요한 포인트" TEXT_MAIN SIZE_XL fade-in. 다음 씬(핵심 원칙)으로의 전환 빌드업.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene22: React.FC = () => {
  const frame = useCurrentFrame();

  const dotScale = spring({ frame, fps: 30, config: ANIMATION.SPRING_BOUNCY });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  
  const pulse = Math.sin(frame * 0.2) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_32 }}>
        <div style={{ 
          width: 40, height: 40, 
          backgroundColor: COLORS.PRIMARY, 
          borderRadius: "50%",
          transform: `scale(${dotScale})`,
          boxShadow: `0 0 ${20 + pulse * 20}px ${COLORS.PRIMARY_GLOW}`
        }} />
        <div style={{ 
          color: COLORS.TEXT_MAIN, 
          fontSize: FONTS.SIZE_XL, 
          fontWeight: FONTS.WEIGHT_BOLD, 
          letterSpacing: FONTS.TRACKING_WIDER,
          opacity: textOpacity
        }}>
          중요한 포인트
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 23 기획안]
 * 원본 텍스트: AI는 추천하고, 결정은 사람이 합니다.
 * 단어 등장 타이밍: "AI는": 4332f, "추천하고,": 4366f, "결정은": 4386f, "사람이": 4415f, "합니다.": 4444f
 * 비주얼 컨셉: 화면이 두 영역으로 명확 분리: 좌 [AI RECOMMENDS] PRIMARY 배경 / 우 [HUMAN DECIDES] SECONDARY 배경. 각 영역이 단어 등장에 맞춰 등장. 분리선 중앙에 "≠" 또는 "+" 기호. 단순 명료한 원칙 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene23: React.FC = () => {
  const frame = useCurrentFrame();

  const aiStart = 4332 - 4332; // "AI는 추천하고" 0
  const humanStart = 4386 - 4332; // "결정은 사람이" 54
  
  const aiProgress = spring({ frame: Math.max(0, frame - aiStart), fps: 30, config: ANIMATION.SPRING_GENTLE });
  const humanProgress = spring({ frame: Math.max(0, frame - humanStart), fps: 30, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, flexDirection: "row" }}>
      
      {/* AI RECOMMENDS */}
      <div style={{ 
        flex: 1, height: "100%", backgroundColor: COLORS.BG_ELEVATED, 
        display: "flex", justifyContent: "center", alignItems: "center",
        borderRight: `2px solid ${COLORS.BORDER_STRONG}`,
        transform: `translateY(${interpolate(aiProgress, [0, 1], [100, 0])}px)`,
        opacity: aiProgress
      }}>
        <div style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_2XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
          AI 추천
        </div>
      </div>

      <div style={{ 
        position: "absolute", left: "50%", top: "50%", 
        transform: "translate(-50%, -50%)", zIndex: Z.UI,
        backgroundColor: COLORS.BG_BASE, padding: SPACING.PX_16, borderRadius: "50%",
        border: `2px solid ${COLORS.BORDER_STRONG}`,
        opacity: humanProgress
      }}>
        <span style={{ fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_MUTED, fontWeight: FONTS.WEIGHT_BOLD }}>+</span>
      </div>

      {/* HUMAN DECIDES */}
      <div style={{ 
        flex: 1, height: "100%", backgroundColor: COLORS.BG_SURFACE, 
        display: "flex", justifyContent: "center", alignItems: "center",
        transform: `translateY(${interpolate(humanProgress, [0, 1], [100, 0])}px)`,
        opacity: humanProgress
      }}>
        <div style={{ color: COLORS.SECONDARY, fontSize: FONTS.SIZE_2XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
          인간 결정
        </div>
      </div>

    </AbsoluteFill>
  );
};

/**
 * [Scene 24 기획안]
 * 원본 텍스트: "이게 표적 후보입니다" 하고 리스트를 올리면, 사령관이 검토하고 최종 공격 결정은 사람이 내리는 구조예요.
 * 단어 등장 타이밍: "\"이게": 4486f, "표적": 4500f, "후보입니다\"": 4519f, "하고": 4565f, "리스트를": 4581f, "올리면,": 4614f, "사령관이": 4638f, "검토하고": 4670f, "최종": 4706f, "공격": 4718f, "결정은": 4733f, "사람이": 4756f, "내리는": 4781f, "구조예요.": 4805f
 * 비주얼 컨셉: 수평 플로우 다이어그램: [AI] → (리스트) → [COMMANDER] → (검토) → [DECISION]. 각 단어 등장 타이밍에 맞춰 각 노드와 화살표가 순차적으로 그려짐. "결정은 사람이" 단계에서 COMMANDER 노드가 PRIMARY 색으로 pulse 강조. 절차적 흐름 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene24: React.FC = () => {
  const frame = useCurrentFrame();

  const flow = [
    { label: "AI 추천", time: 4486 - 4486 },
    { label: "우선순위 목록", time: 4581 - 4486 }, // "리스트를"
    { label: "사령관", time: 4638 - 4486 }, // "사령관이"
    { label: "문맥 검토", time: 4670 - 4486 }, // "검토하고"
    { label: "인간 결정", time: 4706 - 4486, primary: true } // "최종"
  ];
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {flow.map((step, i) => {
          const itemAppear = spring({ frame: Math.max(0, frame - step.time), fps: 30, config: ANIMATION.SPRING_SNAPPY });
          const pulse = step.primary ? Math.sin((frame - step.time) * 0.2) * 0.5 + 0.5 : 0;

          return (
            <React.Fragment key={i}>
              <div style={{
                padding: `${SPACING.PX_24}px ${SPACING.PX_40}px`,
                backgroundColor: step.primary ? COLORS.PRIMARY_DIM : COLORS.BG_SURFACE,
                border: `2px solid ${step.primary ? COLORS.PRIMARY : COLORS.BORDER_STRONG}`,
                borderRadius: SPACING.RADIUS_MD,
                opacity: itemAppear,
                transform: `scale(${interpolate(itemAppear, [0, 1], [0.8, 1])})`,
                boxShadow: step.primary ? `0 0 ${20 + pulse * 20}px ${COLORS.PRIMARY_GLOW}` : "none",
                zIndex: Z.CONTENT
              }}>
                <div style={{ color: step.primary ? COLORS.PRIMARY : COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
                  {step.label}
                </div>
              </div>

              {/* Arrow */}
              {i < flow.length - 1 && (
                <div style={{
                  width: 60, height: 2, 
                  backgroundColor: COLORS.BORDER_PRIMARY,
                  margin: `0 ${SPACING.PX_16}px`,
                  opacity: spring({ frame: Math.max(0, frame - flow[i + 1].time + 5), fps: 30, config: ANIMATION.SPRING_GENTLE }),
                  position: "relative"
                }}>
                  <div style={{ position: "absolute", right: -5, top: -4, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: `5px solid ${COLORS.BORDER_PRIMARY}` }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 25 기획안]
 * 원본 텍스트: 2023년에 미 국방부가 공식 명령으로도 못 박았어요.
 * 비주얼 컨셉: durationInFrames가 0이므로 렌더링 없음. 다음 씬으로 전환.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene25: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 26 기획안]
 * 원본 텍스트: "AI 시스템의 판단에 대해 인간이 반드시 감독하고 개입한다."
 * 비주얼 컨셉: 공식 문서 스타일의 인용 패널. 상단 "DOD DIRECTIVE 2023" 레이블, BORDER_STRONG 2px 테두리. 내용 텍스트 타이핑 이펙트 등장. "반드시" 단어에서 텍스트 아래에 PRIMARY 색 밑줄 강조. 하단에 공식 인감 도장 원형 그래픽(추상).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene26: React.FC = () => {
  const frame = useCurrentFrame();

  const mustKeywordStart = 5170 - 4916; // "반드시" 등 등장 시점 (가늠하여 애니메이션 강조 타이밍 적용)
  const isKeywordActive = frame > mustKeywordStart;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <QuotePanel startFrame={0} style={{ border: `2px solid ${COLORS.BORDER_STRONG}`, width: 900, maxWidth: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: SPACING.PX_32 }}>
          <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, letterSpacing: FONTS.TRACKING_WIDER, fontWeight: FONTS.WEIGHT_BOLD }}>
            미 국방부 공식 명령 2023
          </div>
          {/* 공식 도장 그래픽 */}
          <div style={{ 
            width: 80, height: 80, 
            border: `4px solid ${COLORS.NEGATIVE}`, borderRadius: "50%",
            display: "flex", justifyContent: "center", alignItems: "center",
            opacity: spring({ frame: frame - 20, fps: 30, config: ANIMATION.SPRING_BOUNCY }),
            transform: `rotate(-15deg) scale(${spring({ frame: frame - 20, fps: 30, config: ANIMATION.SPRING_BOUNCY })})`
          }}>
             <div style={{ color: COLORS.NEGATIVE, fontSize: 14, fontWeight: FONTS.WEIGHT_EXTRABOLD, letterSpacing: -1, textAlign: "center", lineHeight: 1.1 }}>
               DOD<br/>APPROVED
             </div>
          </div>
        </div>

        <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_SEMIBOLD, lineHeight: FONTS.LEADING_LOOSE }}>
          "AI 시스템의 판단에 대해 인간이 <span style={{ position: "relative" }}>
            반드시
            {isKeywordActive && (
              <div style={{ 
                position: "absolute", bottom: -8, left: 0, height: 6, 
                backgroundColor: COLORS.PRIMARY, 
                width: `${spring({ frame: frame - mustKeywordStart, fps: 30, config: ANIMATION.SPRING_SNAPPY }) * 100}%`,
                boxShadow: EFFECTS.GLOW_SM
              }} />
            )}
          </span> 감독하고 개입한다."
        </div>
      </QuotePanel>
    </AbsoluteFill>
  );
};

/**
 * [Scene 27 기획안]
 * 원본 텍스트: 지금은요.
 * 단어 등장 타이밍: "지금은요.": 5297f
 * 비주얼 컨셉: 화면 클리어. 중앙에 "지금은요." TEXT_BODY SIZE_XL 홀로 fade-in. 의도적 여백과 침묵. 긴장감 조성.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene27: React.FC = () => {
  const frame = useCurrentFrame();
  const textOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        color: COLORS.TEXT_MAIN, 
        fontSize: FONTS.SIZE_XL, 
        fontWeight: FONTS.WEIGHT_MEDIUM, 
        letterSpacing: FONTS.TRACKING_WIDER,
        opacity: textOpacity 
      }}>
        지금은요.
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 28 기획안]
 * 원본 텍스트: 아직은요.
 * 단어 등장 타이밍: "아직은요.": 5364f
 * 비주얼 컨셉: "지금은요." 텍스트 아래에 "아직은요." 가 TEXT_MUTED SIZE_LG으로 fade-in. 두 문장이 세로로 정렬하며 공존. 화면 우측에 WARNING 색 작은 점(·)이 pulse하며 불안한 여운으로 섹션 종료.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene28: React.FC = () => {
  const frame = useCurrentFrame();
  const textOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const pulse = Math.sin(frame * 0.2) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32 }}>
        <div style={{ 
          color: COLORS.TEXT_MAIN, 
          fontSize: FONTS.SIZE_XL, 
          fontWeight: FONTS.WEIGHT_MEDIUM, 
          letterSpacing: FONTS.TRACKING_WIDER,
          opacity: 1 
        }}>
          지금은요.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
          <div style={{ 
            color: COLORS.TEXT_MUTED, 
            fontSize: FONTS.SIZE_LG, 
            fontWeight: FONTS.WEIGHT_MEDIUM, 
            letterSpacing: FONTS.TRACKING_WIDER,
            opacity: textOpacity 
          }}>
            아직은요.
          </div>
          <div style={{ 
            width: 8, height: 8, 
            backgroundColor: COLORS.WARNING, 
            borderRadius: "50%",
            boxShadow: `0 0 ${10 + pulse * 15}px ${COLORS.WARNING}`,
            opacity: textOpacity
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={154}>
        <Scene1 />
      </Sequence>
      <Sequence from={154} durationInFrames={373}>
        <Scene2 />
      </Sequence>
      <Sequence from={527} durationInFrames={101}>
        <Scene3 />
      </Sequence>
      <Sequence from={628} durationInFrames={298}>
        <Scene4 />
      </Sequence>
      <Sequence from={926} durationInFrames={143}>
        <Scene5 />
      </Sequence>
      <Sequence from={1069} durationInFrames={163}>
        <Scene6 />
      </Sequence>
      <Sequence from={1232} durationInFrames={161}>
        <Scene7 />
      </Sequence>
      <Sequence from={1393} durationInFrames={91}>
        <Scene8 />
      </Sequence>
      <Sequence from={1484} durationInFrames={104}>
        <Scene9 />
      </Sequence>
      <Sequence from={1588} durationInFrames={332}>
        <Scene10 />
      </Sequence>
      <Sequence from={1920} durationInFrames={156}>
        <Scene11 />
      </Sequence>
      <Sequence from={2076} durationInFrames={190}>
        <Scene12 />
      </Sequence>
      <Sequence from={2266} durationInFrames={111}>
        <Scene13 />
      </Sequence>
      <Sequence from={2377} durationInFrames={275}>
        <Scene14 />
      </Sequence>
      <Sequence from={2652} durationInFrames={190}>
        <Scene15 />
      </Sequence>
      <Sequence from={2842} durationInFrames={133}>
        <Scene16 />
      </Sequence>
      <Sequence from={2975} durationInFrames={180}>
        <Scene17 />
      </Sequence>
      <Sequence from={3155} durationInFrames={275}>
        <Scene18 />
      </Sequence>
      <Sequence from={3430} durationInFrames={350}>
        <Scene19 />
      </Sequence>
      <Sequence from={3780} durationInFrames={157}>
        <Scene20 />
      </Sequence>
      <Sequence from={3937} durationInFrames={285}>
        <Scene21 />
      </Sequence>
      <Sequence from={4222} durationInFrames={110}>
        <Scene22 />
      </Sequence>
      <Sequence from={4332} durationInFrames={154}>
        <Scene23 />
      </Sequence>
      <Sequence from={4486} durationInFrames={370}>
        <Scene24 />
      </Sequence>
      <Sequence from={4856} durationInFrames={252}>
        <Scene25 />
      </Sequence>
      <Sequence from={4916} durationInFrames={381}>
        <Scene26 />
      </Sequence>
      <Sequence from={5297} durationInFrames={67}>
        <Scene27 />
      </Sequence>
      <Sequence from={5364} durationInFrames={66}>
        <Scene28 />
      </Sequence>
    </AbsoluteFill>
  );
};
