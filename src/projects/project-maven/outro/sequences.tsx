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
import { VIDEO_FPS } from "../../../constants/video-config";
import { SubscribeButton } from "../components/SubscribeButton";
import { CommentInput } from "../components/CommentInput";
import { GridOverlay } from "../components/GridOverlay";
import { ScanLine } from "../components/ScanLine";
import { StatusTag } from "../components/StatusTag";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 망설임 없이 핵 버튼을 누르는 AI.
 * 단어 등장 타이밍: "망설임": 0f, "없이": 33f, "핵": 55f, "버튼을": 97f, "누르는": 130f, "AI.": 139f
 * 비주얼 컨셉: BG_VOID 배경. 화면 중앙에 TEXT_MAIN SIZE_2XL WEIGHT_BOLD 텍스트가 단어별 타이핑 이펙트로 등장. "핵" 단어 등장 시 배경 전체에 NEGATIVE_DIM 순간 flash. "AI." 마지막 단어에서 텍스트 전체가 NEGATIVE TINT_TEXT_SM 효과. 인트로 레벨의 강렬한 첫 줄.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  const words = [
    { text: "망설임", start: 0 },
    { text: "없이", start: 33 },
    { text: "핵", start: 55 },
    { text: "버튼을", start: 97 },
    { text: "누르는", start: 130 },
  ];

  // Flash at 55f for "핵"
  const flashFade = interpolate(frame, [55, 65], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, paddingBottom: 150, justifyContent: "center", alignItems: "center" }}>
      {frame >= 55 && (
        <AbsoluteFill style={{ backgroundColor: COLORS.NEGATIVE, opacity: flashFade * 0.3 }} />
      )}
      
      <div style={{ display: "flex", gap: SPACING.PX_24 }}>
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              opacity: frame >= w.start ? 1 : 0,
              color: w.text === "핵" ? COLORS.NEGATIVE : COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              textShadow: w.text === "핵" ? EFFECTS.TINT_TEXT_LG : "none",
            }}
          >
            {w.text}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 진짜 영화가 아니라 현실입니다.
 * 단어 등장 타이밍: "진짜": 139f, "영화가": 160f, "아니라": 190f, "현실입니다.": 216f
 * 비주얼 컨셉: Scene 1 텍스트가 상단으로 이동하며 축소. 하단에 "진짜 영화가 아니라 현실입니다." 텍스트가 TEXT_BODY SIZE_LG로 fade-in. "현실입니다." 단어 등장 시 PRIMARY 색 수평선 2px가 텍스트 아래에 좌→우로 draw. 선언의 무게감.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const moveUp = spring({
    frame,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_GENTLE,
  });

  const translateY = interpolate(moveUp, [0, 1], [0, -120]);
  const scale = interpolate(moveUp, [0, 1], [1, 0.65]);

  const scene2Words = [
    { text: "진짜", start: 0 },
    { text: "영화가", start: 21 }, // 160 - 139 = 21
    { text: "아니라", start: 51 }, // 190 - 139 = 51
    { text: "현실입니다.", start: 77 }, // 216 - 139 = 77
  ];

  const drawLine = spring({
    frame: frame - 77,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_SNAPPY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, paddingBottom: 150, justifyContent: "center", alignItems: "center" }}>
      
      {/* Scene 1 Text Block */}
      <div style={{
        position: "absolute",
        top: "50%",
        display: "flex",
        gap: SPACING.PX_24,
        transform: `translateY(-50%) translateY(${translateY}px) scale(${scale})`,
      }}>
        {["망설임", "없이", "핵", "버튼을", "누르는", "AI."].map((w, i) => (
          <span
            key={i}
            style={{
              color: COLORS.NEGATIVE,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              textShadow: EFFECTS.TINT_TEXT_SM,
            }}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Scene 2 Text Block */}
      <div style={{
        position: "absolute",
        bottom: "35%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: SPACING.PX_8,
      }}>
        <div style={{ display: "flex", gap: SPACING.PX_16 }}>
          {scene2Words.map((w, i) => {
            const wordOpacity = spring({
              frame: frame - w.start,
              fps: VIDEO_FPS,
              config: ANIMATION.SPRING_SNAPPY,
            });
            const wordY = interpolate(wordOpacity, [0, 1], [10, 0]);
            return (
              <span
                key={i}
                style={{
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px)`,
                  color: COLORS.TEXT_BODY,
                  fontFamily: FONTS.PRIMARY,
                  fontSize: FONTS.SIZE_LG,
                  fontWeight: FONTS.WEIGHT_MEDIUM,
                }}
              >
                {w.text}
              </span>
            );
          })}
        </div>
        {frame >= 77 && (
          <div style={{
            width: `${drawLine * 100}%`,
            height: SPACING.BORDER_THICK,
            backgroundColor: COLORS.PRIMARY,
            boxShadow: EFFECTS.TINT_SM,
          }} />
        )}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 무섭고 섬뜩하죠?
 * 단어 등장 타이밍: "무섭고": 275f, "섬뜩하죠?": 312f
 * 비주얼 컨셉: 위의 두 텍스트가 유지된 채, 화면 중앙 하단에 "무섭고 섬뜩하죠?" 텍스트가 WARNING 색 SIZE_XL 으로 강조 등장. 배경에 NEGATIVE_DIM 오버레이가 서서히 짙어짐. 공감 유도.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const words = [
    { text: "무섭고", start: 0 }, // 275 - 275 = 0
    { text: "섬뜩하죠?", start: 37 }, // 312 - 275 = 37
  ];

  const overlayOpacity = spring({
    frame,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, paddingBottom: 150, justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ backgroundColor: COLORS.NEGATIVE_DIM, opacity: overlayOpacity }} />

      {/* Scene 1 Text Block */}
      <div style={{
        position: "absolute",
        top: "50%",
        display: "flex",
        gap: SPACING.PX_24,
        transform: `translateY(-50%) translateY(-120px) scale(0.65)`,
      }}>
        {["망설임", "없이", "핵", "버튼을", "누르는", "AI."].map((w, i) => (
          <span
            key={i}
            style={{
              color: COLORS.NEGATIVE,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              textShadow: EFFECTS.TINT_TEXT_SM,
            }}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Scene 2 Text Block */}
      <div style={{
        position: "absolute",
        bottom: "35%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: SPACING.PX_8,
      }}>
        <div style={{ display: "flex", gap: SPACING.PX_16 }}>
          {["진짜", "영화가", "아니라", "현실입니다."].map((w, i) => (
            <span
              key={i}
              style={{
                color: COLORS.TEXT_BODY,
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_LG,
                fontWeight: FONTS.WEIGHT_MEDIUM,
              }}
            >
              {w}
            </span>
          ))}
        </div>
        <div style={{
          width: `100%`,
          height: SPACING.BORDER_THICK,
          backgroundColor: COLORS.PRIMARY,
          boxShadow: EFFECTS.TINT_SM,
        }} />
      </div>

      {/* Scene 3 Text */}
      <div style={{
        position: "absolute",
        bottom: "15%",
        display: "flex",
        gap: SPACING.PX_16,
      }}>
        {words.map((w, i) => {
          const wordScale = spring({
            frame: frame - w.start,
            fps: VIDEO_FPS,
            config: ANIMATION.SPRING_BOUNCY,
          });
          return (
            <span
              key={i}
              style={{
                opacity: frame >= w.start ? 1 : 0,
                transform: `scale(${interpolate(wordScale, [0, 1], [0.8, 1])})`,
                color: COLORS.WARNING,
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_XL,
                fontWeight: FONTS.WEIGHT_BOLD,
                textShadow: EFFECTS.TINT_ACCENT,
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 하지만 피한다고 피할 수 있는 게 아니에요.
 * 단어 등장 타이밍: "하지만": 367f, "피한다고": 390f, "피할": 427f, "수": 445f, "있는": 452f, "게": 475f, "아니에요.": 478f
 * 비주얼 컨셉: NEGATIVE_DIM 오버레이 유지된 채, 화면에 "피한다고" 텍스트 등장 시 우측에서 좌측으로 화살표가 그려졌다가 "아니에요." 단어에서 차단선(X)으로 변경. 회피 불가 시각화. "하지만" 단어에서 PRIMARY TINT_SM 빛 등장 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  const words = [
    { text: "하지만", start: 0 },
    { text: "피한다고", start: 23 }, // 390 - 367 = 23
    { text: "피할", start: 60 }, // 427 - 367 = 60
    { text: "수", start: 78 }, // 445 - 367 = 78
    { text: "있는", start: 85 }, // 452 - 367 = 85
    { text: "게", start: 108 }, // 475 - 367 = 108
    { text: "아니에요.", start: 111 }, // 478 - 367 = 111
  ];

  const arrowProgress = spring({
    frame: frame - 23,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_GENTLE,
  });

  const crossProgress = spring({
    frame: frame - 111,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_SNAPPY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, paddingBottom: 150, justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ backgroundColor: COLORS.NEGATIVE_DIM, opacity: 1 }} />
      
      {/* Arrow/Cross Graphic */}
      <div style={{ position: "relative", width: 400, height: 200, marginBottom: SPACING.PX_64 }}>
        {/* Arrow Line */}
        <div style={{
          position: "absolute",
          right: 0,
          top: "50%",
          width: `${arrowProgress * 100}%`,
          height: SPACING.BORDER_THICK,
          backgroundColor: COLORS.TEXT_BODY,
          transform: "translateY(-50%)",
        }} />
        {/* Arrow Tip */}
        <div style={{
          position: "absolute",
          left: `${100 - arrowProgress * 100}%`,
          top: "50%",
          width: 20,
          height: 20,
          borderLeft: `${SPACING.BORDER_THICK}px solid ${COLORS.TEXT_BODY}`,
          borderTop: `${SPACING.BORDER_THICK}px solid ${COLORS.TEXT_BODY}`,
          transform: "translateY(-50%) rotate(-45deg)",
          opacity: arrowProgress > 0.1 ? 1 : 0,
        }} />

        {/* Cross (X) */}
        {frame >= 111 && (
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <div style={{
              width: 150,
              height: SPACING.BORDER_THICK * 2,
              backgroundColor: COLORS.NEGATIVE,
              transform: `rotate(45deg) scaleX(${crossProgress})`,
              boxShadow: EFFECTS.TINT_SM,
            }} />
            <div style={{
              width: 150,
              height: SPACING.BORDER_THICK * 2,
              backgroundColor: COLORS.NEGATIVE,
              transform: `rotate(-45deg) scaleX(${crossProgress})`,
              position: "absolute",
              top: 0,
              boxShadow: EFFECTS.TINT_SM,
            }} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: SPACING.PX_16, maxWidth: 800 }}>
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              opacity: frame >= w.start ? 1 : 0,
              color: w.text === "하지만" ? COLORS.PRIMARY : COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_LG,
              fontWeight: w.text === "하지만" ? FONTS.WEIGHT_BOLD : FONTS.WEIGHT_MEDIUM,
              textShadow: w.text === "하지만" ? EFFECTS.TINT_TEXT_SM : "none",
            }}
          >
            {w.text}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 이게 우리가 AI를 무작정 두려워하기보다, 똑바로 알고 공부해야 하는 이유입니다.
 * 단어 등장 타이밍: "이게": 526f, "우리가": 565f, "AI를": 589f, "무작정": 601f, "두려워하기보다,": 635f, "똑바로": 716f, "알고": 738f, "공부해야": 753f, "하는": 782f, "이유입니다.": 797f
 * 비주얼 컨셉: 화면 배경이 BG_VOID → BG_BASE로 전환하며 밝아짐. 중앙에 대비 그래픽: [두려워하기 — X (NEGATIVE)] vs [알고 공부해야 — ✓ (SECONDARY)]. "똑바로" 단어에서 SECONDARY 색 [알고 공부해야] 아이템 크게 강조. 행동 촉구 UI.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();

  // Timing: "두려워하기보다" appears at ~109f, "알고 공부해야" appears at ~190f
  const FEAR_APPEAR_FRAME = 109;
  const STUDY_APPEAR_FRAME = 190;

  const bgTransition = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const fearOpacity = spring({ frame: frame - FEAR_APPEAR_FRAME, fps: VIDEO_FPS, config: ANIMATION.SPRING_GENTLE });
  const studyOpacity = spring({ frame: frame - STUDY_APPEAR_FRAME, fps: VIDEO_FPS, config: ANIMATION.SPRING_GENTLE });
  const studyEmphasis = spring({ frame: frame - STUDY_APPEAR_FRAME, fps: VIDEO_FPS, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: interpolateColors(frame, [0, 30], [COLORS.BG_VOID, COLORS.BG_BASE]),
      paddingBottom: 150, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      {/* Contrast UI */}
      <div style={{ display: "flex", gap: SPACING.PX_80 }}>
        {/* Left: Fear */}
        <div style={{ 
          opacity: fearOpacity,
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: SPACING.PX_16,
          filter: frame >= STUDY_APPEAR_FRAME ? "grayscale(1) opacity(0.4)" : "none"
        }}>
          <div style={{ 
            width: 120, height: 120, 
            border: `${SPACING.BORDER_THICK}px solid ${COLORS.NEGATIVE}`,
            display: "flex", justifyContent: "center", alignItems: "center",
            position: "relative"
          }}>
             <div style={{ width: 60, height: 4, backgroundColor: COLORS.NEGATIVE, transform: "rotate(45deg)", position: "absolute" }} />
             <div style={{ width: 60, height: 4, backgroundColor: COLORS.NEGATIVE, transform: "rotate(-45deg)", position: "absolute" }} />
          </div>
          <span style={{ color: COLORS.NEGATIVE, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>두려워하기</span>
        </div>

        {/* Center: VS (Optional but adds structure) */}
        <div style={{ 
          display: "flex", alignItems: "center", 
          opacity: interpolate(frame, [STUDY_APPEAR_FRAME, STUDY_APPEAR_FRAME+10], [0, 1], { extrapolateLeft: "clamp" }) 
        }}>
          <span style={{ color: COLORS.TEXT_DISABLED, fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_SM }}>VS</span>
        </div>

        {/* Right: Study */}
        <div style={{ 
          opacity: studyOpacity,
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: SPACING.PX_16,
          transform: `scale(${interpolate(studyEmphasis, [0, 1], [0.9, 1.1])})`
        }}>
          <div style={{ 
            width: 120, height: 120, 
            border: `${SPACING.BORDER_THICK}px solid ${COLORS.SECONDARY}`,
            display: "flex", justifyContent: "center", alignItems: "center",
            position: "relative",
            boxShadow: studyEmphasis > 0.8 ? EFFECTS.TINT_SECONDARY : "none"
          }}>
             <span style={{ 
               color: COLORS.SECONDARY, 
               fontSize: 80, 
               fontWeight: FONTS.WEIGHT_BOLD,
               textShadow: EFFECTS.TINT_SECONDARY,
               marginTop: -10 // Optical alignment for ✓
             }}>
               ✓
             </span>
          </div>
          <span style={{ color: COLORS.SECONDARY, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>알고 공부하기</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 나만 모르면 진짜 영화 속 엑스트라처럼 휩쓸려 갈 수도 있으니까요.
 * 단어 등장 타이밍: "나만": 845f, "모르면": 886f, "진짜": 908f, "영화": 934f, "속": 958f, "엑스트라처럼": 977f, "휩쓸려": 1016f, "갈": 1042f, "수도": 1057f, "있으니까요.": 1099f
 * 비주얼 컨셉: 화면 좌측에 군중 은유: 여러 작은 점들(TEXT_DISABLED)이 규칙 없이 흐르는 파티클 애니메이션(엑스트라/군중). "엑스트라처럼" 단어에서 하나의 점만 PRIMARY 색으로 강조되며 정지 — 나머지는 휩쓸려 사라짐. 시청자가 특별한 존재가 될 수 있음을 암시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  const HERO_HIGHLIGHT_FRAME = 132; 
  const SWEEP_START_FRAME = 171;    

  const particles = React.useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const seed = Math.sin(i * 123.456) * 10000;
      const rand = seed - Math.floor(seed);
      return {
        id: i,
        initialX: rand * 1920,
        initialY: ((rand * 17) % 1) * 800 + 100,
        size: 2 + rand * 6,
        speed: 0.8 + rand * 1.2,
        drift: rand * Math.PI * 2,
        sweepDelay: rand * 30,
      };
    });
  }, []);

  const heroSpring = spring({
    frame: frame - HERO_HIGHLIGHT_FRAME,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_SNAPPY,
  });

  const sweepIn = spring({
    frame: frame - SWEEP_START_FRAME,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_GENTLE,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, overflow: "hidden" }}>
      <GridOverlay cellSize={100} opacity={0.08} />
      
      {/* Background Radial TINT focused on Hero target center */}
      <div style={{
        position: "absolute",
        left: 960 - 600,
        top: 440 - 600,
        width: 1200,
        height: 1200,
        background: EFFECTS.RADIAL_PRIMARY,
        opacity: heroSpring * 0.2,
        filter: "blur(60px)",
      }} />

      {particles.map((p) => {
        const isHero = p.id === 0;
        
        const timeFactor = frame * p.speed * 0.04;
        const driftX = Math.sin(timeFactor + p.drift) * 12;
        const driftY = Math.cos(timeFactor + p.drift) * 10;

        const pSweepSpring = spring({
          frame: frame - (SWEEP_START_FRAME + p.sweepDelay),
          fps: VIDEO_FPS,
          config: ANIMATION.SPRING_GENTLE,
        });
        
        const sweepOpacity = isHero ? 1 : interpolate(pSweepSpring, [0, 0.4, 1], [0.6, 0.3, 0], { extrapolateRight: "clamp" });
        const sweepX = isHero ? 0 : pSweepSpring * 1800; 
        const sweepBlur = isHero ? 0 : pSweepSpring * 15;

        const finalX = isHero ? interpolate(heroSpring, [0, 1], [p.initialX, 960]) : p.initialX + sweepX;
        const finalY = isHero ? interpolate(heroSpring, [0, 1], [p.initialY, 440]) : p.initialY;
        
        if (sweepOpacity <= 0 && !isHero) return null;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: finalX + driftX,
              top: finalY + driftY,
              width: isHero ? 24 : p.size,
              height: isHero ? 24 : p.size,
              backgroundColor: isHero ? interpolateColors(heroSpring, [0, 1], [COLORS.TEXT_DISABLED, COLORS.PRIMARY]) : COLORS.TEXT_DISABLED,
              borderRadius: isHero ? "2px" : "50%", 
              opacity: sweepOpacity,
              filter: `blur(${sweepBlur}px)`,
              transform: `translate(-50%, -50%) rotate(${isHero ? 45 + (frame * 1) : 0}deg) scale(${isHero ? 1 + heroSpring * 1.5 : 1})`,
              boxShadow: isHero ? `0 0 ${20 + heroSpring * 30}px ${COLORS.PRIMARY_GLOW}` : "none",
              zIndex: isHero ? Z.CONTENT : Z.BG,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: isHero ? `1px solid ${COLORS.BG_BASE}` : "none"
            }}
          >
             {isHero && (
               <>
                 {/* Inner core deco */}
                 <div style={{ 
                   width: "40%", height: "40%", 
                   backgroundColor: COLORS.BG_BASE, 
                   borderRadius: "1px",
                   opacity: heroSpring 
                 }} />
               </>
             )}
          </div>
        );
      })}

      {/* Hero Central UI Rings (Abstract gan-ji) */}
      {frame >= HERO_HIGHLIGHT_FRAME && (
        <div style={{ position: "absolute", left: 960, top: 440, transform: "translate(-50%, -50%)", width: 400, height: 400 }}>
           {/* Ring 1 */}
           <div style={{
             position: "absolute", inset: 0,
             border: `1px solid ${COLORS.PRIMARY_MID}`,
             borderRadius: "50%",
             opacity: heroSpring * 0.3,
             transform: `scale(${interpolate(heroSpring, [0, 1], [0.5, 1])})`
           }} />
           
           {/* Ring 2 (Dashed) */}
           <div style={{
             position: "absolute", inset: 40,
             border: `1px dashed ${COLORS.PRIMARY}`,
             borderRadius: "50%",
             opacity: heroSpring * 0.2,
             transform: `scale(${interpolate(heroSpring, [0, 1], [0.8, 1])}) rotate(${-frame * 0.5}deg)`
           }} />

           {/* ScanLine within the UI area */}
           {frame >= SWEEP_START_FRAME && (
             <div style={{ position: "absolute", inset: 0, opacity: sweepIn * 0.5 }}>
                <ScanLine sweepDuration={150} loop color={COLORS.PRIMARY_MID} />
             </div>
           )}
           
           {/* Coordinate Crosshair elements */}
           {[0, 90, 180, 270].map(rot => (
             <div key={rot} style={{
               position: "absolute",
               left: "50%", top: "50%",
               width: 30, height: 1,
               backgroundColor: COLORS.PRIMARY,
               transformOrigin: "left center",
               transform: `rotate(${rot}deg) translateX(${160 + heroSpring * 40}px)`,
               opacity: heroSpring * 0.6
             }} />
           ))}
        </div>
      )}
    </AbsoluteFill>
  );
};



/**
 * [Scene 7 기획안]
 * 원본 텍스트: 오늘 제 얘기가 '아, 세상이 진짜 이렇게 돌아가고 있구나' 하고 조금이라도 와닿으셨다면
 * 단어 등장 타이밍: "오늘": 1099f, "제": 1135f, "얘기가": 1137f, "'아,": 1176f, "세상이": 1183f, "진짜": 1213f, "이렇게": 1231f, "돌아가고": 1259f, "있구나'": 1295f, "하고": 1326f, "조금이라도": 1360f, "와닿으셨다면": 1390f
 * 비주얼 컨셉: BG_BASE 배경에 RADIAL_PRIMARY 방사형 TINT가 화면 중앙에서 서서히 등장. 텍스트가 TEXT_BODY SIZE_MD로 중앙에 부드럽게 fade-in. 인용구("아, 세상이...") 부분은 TEXT_MAIN SIZE_LG WEIGHT_SEMIBOLD 강조. 온기 있는 직접 소통 느낌.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const TINTOpacity = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, paddingBottom: 150, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        position: "absolute",
        width: 800,
        height: 800,
        background: EFFECTS.RADIAL_PRIMARY,
        opacity: TINTOpacity * 0.5,
        filter: "blur(40px)",
      }} />

      <div style={{ 
        display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_16,
        zIndex: Z.CONTENT, opacity: textOpacity
      }}>
        <span style={{ color: COLORS.TEXT_BODY, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD }}>
          세상이 진짜 이렇게 돌아가고 있구나
        </span>
        <span style={{ 
          color: COLORS.TEXT_MAIN, 
          fontFamily: FONTS.PRIMARY, 
          fontSize: FONTS.SIZE_LG, 
          fontWeight: FONTS.WEIGHT_SEMIBOLD,
          textShadow: EFFECTS.TINT_TEXT_SM
        }}>
          조금이라도 와닿으셨다면
        </span>
      </div>
    </AbsoluteFill>
  );
};

const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  const showFrame = 0;
  const clickFrame = 42; // "꾹" word timing

  const enterSpring = spring({
    frame: frame - showFrame,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, paddingBottom: 150, justifyContent: "center", alignItems: "center" }}>
      <SubscribeButton 
        scale={enterSpring} 
        isClicked={frame >= clickFrame} 
      />
    </AbsoluteFill>
  );
};

const Scene9: React.FC = () => {
  const frame = useCurrentFrame();

  const moveUp = spring({
    frame,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_GENTLE,
  });

  const buttonY = interpolate(moveUp, [0, 1], [0, -200]);
  const buttonScale = interpolate(moveUp, [0, 1], [1, 0.6]);

  const inputEnter = spring({
    frame: frame - 20,
    fps: VIDEO_FPS,
    config: ANIMATION.SPRING_SNAPPY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, paddingBottom: 150, justifyContent: "center", alignItems: "center" }}>
      <SubscribeButton 
        style={{ position: "absolute", top: "50%", transform: `translateY(-50%) translateY(${buttonY}px) scale(${buttonScale})` }} 
      />

      <CommentInput 
        style={{ 
          marginTop: 100, 
          opacity: inputEnter, 
          transform: `translateY(${interpolate(inputEnter, [0, 1], [20, 0])}px)` 
        }} 
        isActive={frame >= 149} 
      />
    </AbsoluteFill>
  );
};

const Scene10: React.FC = () => {
  const frame = useCurrentFrame();

  const words = [
     { text: "'내", start: 0 },
     { text: "목숨이", start: 18 },
     { text: "걸린", start: 79 },
     { text: "전쟁터,", start: 99 },
     { text: "사람", start: 151 },
     { text: "사령관을", start: 181 },
     { text: "믿을", start: 208 },
     { text: "것인가,", start: 228 },
     { text: "냉철한", start: 259 },
     { text: "AI를", start: 299 },
     { text: "믿을", start: 321 },
     { text: "것인가?'", start: 348 },
  ];

  const leftActive = frame >= 151 && frame < 259;
  const rightActive = frame >= 259;
  const bothActive = frame >= 348;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Two Panes */}
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {/* Left: Human */}
        <div style={{ 
          flex: 1, 
          backgroundColor: COLORS.SECONDARY_DIM, 
          opacity: leftActive || bothActive ? 1 : 0.3, 
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          borderRight: `${SPACING.BORDER_NORMAL}px solid ${COLORS.BORDER}`
        }}>
          <span style={{ color: COLORS.SECONDARY, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD }}>사람 사령관</span>
        </div>

        {/* Right: AI */}
        <div style={{ 
          flex: 1, 
          backgroundColor: COLORS.PRIMARY_DIM, 
          opacity: rightActive || bothActive ? 1 : 0.3, 
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
        }}>
          <span style={{ color: COLORS.PRIMARY, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD }}>냉철한 AI</span>
        </div>
      </div>

      {/* VS & Prompt Overlay */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: Z.UI }}>
        <span style={{ color: COLORS.TEXT_MUTED, fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_BOLD }}>VS</span>
      </div>

      <div style={{ position: "absolute", bottom: 250, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_16 }}>
         {frame >= 348 && (
           <span style={{ color: COLORS.TEXT_MUTED, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, textShadow: EFFECTS.TINT_TEXT_SM }}>당신의 선택은?</span>
         )}
      </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={139}>
        <Scene1 />
      </Sequence>
      <Sequence from={139} durationInFrames={136}>
        <Scene2 />
      </Sequence>
      <Sequence from={275} durationInFrames={92}>
        <Scene3 />
      </Sequence>
      <Sequence from={367} durationInFrames={159}>
        <Scene4 />
      </Sequence>
      <Sequence from={526} durationInFrames={319}>
        <Scene5 />
      </Sequence>
      <Sequence from={845} durationInFrames={254}>
        <Scene6 />
      </Sequence>
      <Sequence from={1099} durationInFrames={348}>
        <Scene7 />
      </Sequence>
      <Sequence from={1447} durationInFrames={153}>
        <Scene8 />
      </Sequence>
      <Sequence from={1600} durationInFrames={207}>
        <Scene9 />
      </Sequence>
      <Sequence from={1807} durationInFrames={409}>
        <Scene10 />
      </Sequence>
    </AbsoluteFill>
  );
};
