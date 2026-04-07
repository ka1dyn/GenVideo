import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme";
import { TypewriterText } from "../components/TypewriterText";
import { ScanLine } from "../components/ScanLine";
import { GridOverlay } from "../components/GridOverlay";
import { FlashOverlay } from "../components/FlashOverlay";
import { DrawLine } from "../components/DrawLine";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 드론이 하늘에서 날아다닙니다.
 * 단어 등장 타이밍: "드론이": 0f, "하늘에서": 20f, "날아다닙니다.": 46f
 * 비주얼 컨셉: BG_BASE 배경 위, 화면 중앙에 모노스페이스 폰트로 [DRONE FEED ACTIVE] 레이블이 타이핑 이펙트로 등장. 우측 상단에 00:00:00 형식의 실시간 타임코드 카운터가 깜빡이며 동작. 하단 스캔라인 패턴(얇은 수평선 반복)이 약한 opacity로 깔리며 군사 드론 영상 UI 느낌을 만듦.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Background fade-in (0-12f)
  const bgOpacity = interpolate(frame, [0, ANIMATION.DUR_XS], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 2: Label typewriter starts at 8f
  const labelStartFrame = 8;

  // Phase 3: Timecode counter — starts at 20f
  const timecodeOpacity = interpolate(frame, [20, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const timecodeSeconds = Math.floor(Math.max(0, frame - 20) / fps);
  const timecodeFrames = Math.max(0, frame - 20) % fps;
  const timecodeStr = `00:00:${String(timecodeSeconds).padStart(2, "0")}:${String(timecodeFrames).padStart(2, "0")}`;
  const timecodeBlink = Math.floor(frame / 30) % 2 === 0;

  // Phase 4: Status indicator — appears at 40f
  const statusOpacity = interpolate(frame, [40, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scanline pattern (static horizontal lines at low opacity)
  const scanlineRows = Array.from({ length: 18 }, (_, i) => i);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, opacity: bgOpacity }}>
      {/* Scanline pattern background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          bottom: 150,
          zIndex: Z.BG,
          overflow: "hidden",
        }}
      >
        {scanlineRows.map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${(i + 1) * 5}%`,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: COLORS.PRIMARY,
              opacity: 0.04,
            }}
          />
        ))}
      </div>

      {/* Center: DRONE FEED ACTIVE label */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: SPACING.PX_12,
          }}
        >
          {/* Status dot */}
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: COLORS.POSITIVE,
              opacity: statusOpacity * (timecodeBlink ? 1 : 0.3),
            }}
          />
          <TypewriterText
            text="DRONE FEED ACTIVE"
            startFrame={labelStartFrame}
            framesPerChar={2}
            color={COLORS.PRIMARY}
            fontSize={FONTS.SIZE_LG}
            fontWeight={FONTS.WEIGHT_SEMIBOLD}
            fontFamily={FONTS.MONO}
            letterSpacing={`${FONTS.TRACKING_WIDER}em`}
            cursorColor={COLORS.PRIMARY}
            showCursor={true}
          />
        </div>

        {/* Sub-label */}
        <div
          style={{
            marginTop: SPACING.PX_16,
            opacity: statusOpacity,
            color: COLORS.TEXT_MUTED,
            fontSize: FONTS.SIZE_SM,
            fontFamily: FONTS.MONO,
            letterSpacing: `${FONTS.TRACKING_WIDE}em`,
          }}
        >
          FEED_01 // MQ-9 REAPER // 1080p60
        </div>
      </div>

      {/* Top-right: Timecode counter */}
      <div
        style={{
          position: "absolute",
          top: SPACING.PX_40,
          right: SPACING.PX_48,
          opacity: timecodeOpacity,
          zIndex: Z.UI,
        }}
      >
        <div
          style={{
            color: timecodeBlink ? COLORS.TEXT_BODY : COLORS.TEXT_DISABLED,
            fontSize: FONTS.SIZE_SM,
            fontFamily: FONTS.MONO,
            fontWeight: FONTS.WEIGHT_MEDIUM,
            letterSpacing: `${FONTS.TRACKING_WIDE}em`,
          }}
        >
          TC {timecodeStr}
        </div>
      </div>

      {/* Top-left: Classification label */}
      <div
        style={{
          position: "absolute",
          top: SPACING.PX_40,
          left: SPACING.PX_48,
          opacity: statusOpacity,
          zIndex: Z.UI,
        }}
      >
        <div
          style={{
            color: COLORS.NEGATIVE,
            fontSize: FONTS.SIZE_XS,
            fontFamily: FONTS.MONO,
            fontWeight: FONTS.WEIGHT_SEMIBOLD,
            letterSpacing: `${FONTS.TRACKING_WIDER}em`,
            border: `1px solid ${COLORS.NEGATIVE_DIM}`,
            padding: `${SPACING.PX_4}px ${SPACING.PX_12}px`,
          }}
        >
          기밀
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 지금 이 순간에도요.
 * 단어 등장 타이밍: "지금": 96f, "이": 122f, "순간에도요.": 140f
 * 비주얼 컨셉: Scene 1 UI 위에 PRIMARY(#378ADD) 수평 Scan Line이 화면을 위→아래로 빠르게 훑는 애니메이션. "지금 이 순간에도요" 텍스트가 중앙에 TEXT_MAIN 색으로 크게(SIZE_2XL) fade-in. 배경은 미세한 파티클 흐름이 감지 시스템 느낌 연출.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scan line sweep: starts immediately, sweeps in ~40 frames
  // Main text fade-in: starts at ~15f
  const textEntrance = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);
  const textY = interpolate(textEntrance, [0, 1], [ANIMATION.ENTER_Y_MD, 0]);

  // Subtle radial glow background — fades in with text
  const glowOpacity = interpolate(frame, [10, 40], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particle dots (static positions, subtle drift via frame)
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: ((i * 137 + 50) % 1800) + 60,
    y: ((i * 89 + 30) % 780) + 60,
    size: (i % 3) + 1,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Particle background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          bottom: 150,
          zIndex: Z.BG,
        }}
      >
        {particles.map((p) => {
          const drift = Math.sin((frame + p.id * 40) / 60) * 8;
          const pOpacity = interpolate(frame, [5, 30], [0, 0.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: p.x + drift,
                top: p.y + drift * 0.5,
                width: p.size,
                height: p.size,
                backgroundColor: COLORS.PRIMARY,
                opacity: pOpacity,
              }}
            />
          );
        })}
      </div>

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: EFFECTS.RADIAL_PRIMARY,
          opacity: glowOpacity,
          zIndex: Z.BG,
        }}
      />

      {/* Scan line sweep */}
      <ScanLine
        startFrame={0}
        sweepDuration={50}
        color={COLORS.PRIMARY}
        opacity={0.5}
        thickness={2}
        loop={false}
      />

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            color: COLORS.TEXT_MAIN,
            fontSize: FONTS.SIZE_2XL,
            fontWeight: FONTS.WEIGHT_BOLD,
            fontFamily: FONTS.DISPLAY,
            lineHeight: FONTS.LEADING_TIGHT,
            textShadow: EFFECTS.GLOW_TEXT_SM,
          }}
        >
          지금 이 순간에도요.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 그리고 그 드론이 찍은 영상을 AI가 실시간으로 봅니다.
 * 단어 등장 타이밍: "그리고": 203f, "그": 233f, "드론이": 244f, "찍은": 274f, "영상을": 295f, "AI가": 328f, "실시간으로": 341f, "봅니다.": 381f
 * 비주얼 컨셉: 화면이 2분할(좌: DRONE INPUT / 우: AI PROCESSING). 좌측에 격자 오버레이가 있는 사각형 영역, 우측에 [ANALYZING...] + 진행 중인 바 형태의 분석 UI. AI가 등장하는 단어 순간에 우측 패널이 PRIMARY_DIM 색으로 활성화되며 blink.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Local word timings (relative to scene start at 203f)
  const AI_WORD_FRAME = 125; // "AI가" appears at local frame 125

  // Panel entrance springs
  const leftPanelIn = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_SNAPPY,
    durationInFrames: ANIMATION.DUR_MD,
  });

  const rightPanelIn = spring({
    frame: Math.max(0, frame - ANIMATION.STAGGER_LG),
    fps,
    config: ANIMATION.SPRING_SNAPPY,
    durationInFrames: ANIMATION.DUR_MD,
  });

  // AI activation — blink effect after AI_WORD_FRAME
  const aiActivated = frame >= AI_WORD_FRAME;
  const aiBlinkPhase = aiActivated ? Math.floor((frame - AI_WORD_FRAME) / 8) % 2 : 0;
  const aiBgColor = aiActivated
    ? aiBlinkPhase === 0
      ? COLORS.PRIMARY_DIM
      : "transparent"
    : "transparent";

  // Progress bar fills from 0 to ~92% over the scene
  const progressWidth = interpolate(frame, [30, 180], [0, 92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ANIMATION.EASE_OUT),
  });

  // Analyzing dots animation
  const dotCount = (Math.floor(frame / 20) % 3) + 1;
  const analyzingText = `분석 중${".".repeat(dotCount)}`;

  // Labels that appear sequentially
  const labels = [
    { text: "차량 탐지", frame: 71 },
    { text: "시설 탐지", frame: 92 },
    { text: "위협 평가", frame: 138 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Two-panel layout */}
      <div
        style={{
          position: "absolute",
          top: SPACING.PX_64,
          left: SPACING.PX_64,
          right: SPACING.PX_64,
          bottom: 150 + SPACING.PX_32,
          display: "flex",
          gap: SPACING.PX_24,
          zIndex: Z.CONTENT,
        }}
      >
        {/* Left panel: DRONE INPUT */}
        <div
          style={{
            flex: 1,
            border: `${SPACING.BORDER_THIN}px solid ${COLORS.BORDER}`,
            position: "relative",
            overflow: "hidden",
            opacity: leftPanelIn,
            transform: `translateX(${interpolate(leftPanelIn, [0, 1], [ANIMATION.ENTER_X_MD, 0])}px)`,
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: `${SPACING.PX_12}px ${SPACING.PX_16}px`,
              borderBottom: `${SPACING.BORDER_THIN}px solid ${COLORS.BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: COLORS.TEXT_MUTED,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
                fontWeight: FONTS.WEIGHT_MEDIUM,
                letterSpacing: `${FONTS.TRACKING_WIDER}em`,
              }}
            >
              드론 입력
            </span>
            <div
              style={{
                width: 6,
                height: 6,
                backgroundColor: COLORS.POSITIVE,
                opacity: Math.floor(frame / 30) % 2 === 0 ? 1 : 0.3,
              }}
            />
          </div>

          {/* Grid overlay content area */}
          <div style={{ position: "relative", flex: 1, height: "100%" }}>
            <GridOverlay
              cellSize={48}
              color={COLORS.PRIMARY_DIM}
              opacity={0.5}
            />
            {/* Crosshair center */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Horizontal crosshair */}
              <div
                style={{
                  position: "absolute",
                  width: 40,
                  height: 1,
                  backgroundColor: COLORS.PRIMARY,
                  opacity: 0.6,
                  top: 0,
                  left: -20,
                }}
              />
              {/* Vertical crosshair */}
              <div
                style={{
                  position: "absolute",
                  width: 1,
                  height: 40,
                  backgroundColor: COLORS.PRIMARY,
                  opacity: 0.6,
                  top: -20,
                  left: 0,
                }}
              />
            </div>

            {/* Corner brackets */}
            {[
              { top: "20%", left: "15%" },
              { top: "20%", right: "15%" },
              { bottom: "25%", left: "15%" },
              { bottom: "25%", right: "15%" },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...pos,
                  width: 16,
                  height: 16,
                  borderColor: COLORS.PRIMARY,
                  borderStyle: "solid",
                  borderWidth: 0,
                  ...(i === 0
                    ? { borderTopWidth: 1, borderLeftWidth: 1 }
                    : i === 1
                      ? { borderTopWidth: 1, borderRightWidth: 1 }
                      : i === 2
                        ? { borderBottomWidth: 1, borderLeftWidth: 1 }
                        : { borderBottomWidth: 1, borderRightWidth: 1 }),
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right panel: AI PROCESSING */}
        <div
          style={{
            flex: 1,
            border: `${SPACING.BORDER_THIN}px solid ${aiActivated ? COLORS.BORDER_PRIMARY : COLORS.BORDER}`,
            position: "relative",
            overflow: "hidden",
            opacity: rightPanelIn,
            transform: `translateX(${interpolate(rightPanelIn, [0, 1], [-ANIMATION.ENTER_X_MD, 0])}px)`,
            backgroundColor: aiBgColor,
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: `${SPACING.PX_12}px ${SPACING.PX_16}px`,
              borderBottom: `${SPACING.BORDER_THIN}px solid ${COLORS.BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: aiActivated ? COLORS.PRIMARY : COLORS.TEXT_MUTED,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
                fontWeight: FONTS.WEIGHT_MEDIUM,
                letterSpacing: `${FONTS.TRACKING_WIDER}em`,
              }}
            >
              AI 처리
            </span>
            <span
              style={{
                color: COLORS.TEXT_DISABLED,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
              }}
            >
              v3.1.7
            </span>
          </div>

          {/* Analysis content */}
          <div style={{ padding: SPACING.PX_24 }}>
            {/* Analyzing text */}
            <div
              style={{
                color: COLORS.PRIMARY,
                fontSize: FONTS.SIZE_SM,
                fontFamily: FONTS.MONO,
                fontWeight: FONTS.WEIGHT_MEDIUM,
                letterSpacing: `${FONTS.TRACKING_WIDE}em`,
                marginBottom: SPACING.PX_24,
              }}
            >
              {analyzingText}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: SPACING.PX_32 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: SPACING.PX_8,
                }}
              >
                <span
                  style={{
                    color: COLORS.TEXT_MUTED,
                    fontSize: FONTS.SIZE_XS,
                    fontFamily: FONTS.MONO,
                  }}
                >
                  프레임 분석
                </span>
                <span
                  style={{
                    color: COLORS.TEXT_BODY,
                    fontSize: FONTS.SIZE_XS,
                    fontFamily: FONTS.MONO,
                  }}
                >
                  {Math.round(progressWidth)}%
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  backgroundColor: COLORS.BG_ELEVATED,
                  width: "100%",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressWidth}%`,
                    backgroundColor: COLORS.PRIMARY,
                    boxShadow: EFFECTS.GLOW_SM,
                  }}
                />
              </div>
            </div>

            {/* Detection labels appearing sequentially */}
            {labels.map((label, i) => {
              const labelOpacity = interpolate(
                frame,
                [label.frame, label.frame + ANIMATION.DUR_XS],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: SPACING.PX_8,
                    marginBottom: SPACING.PX_12,
                    opacity: labelOpacity,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      backgroundColor:
                        i === 2 ? COLORS.WARNING : COLORS.PRIMARY,
                    }}
                  />
                  <span
                    style={{
                      color: COLORS.TEXT_BODY,
                      fontSize: FONTS.SIZE_XS,
                      fontFamily: FONTS.MONO,
                      letterSpacing: `${FONTS.TRACKING_WIDE}em`,
                    }}
                  >
                    {label.text}
                  </span>
                  <span
                    style={{
                      color: COLORS.TEXT_DISABLED,
                      fontSize: FONTS.SIZE_XS,
                      fontFamily: FONTS.MONO,
                      marginLeft: "auto",
                    }}
                  >
                    대기 중
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 그리고 이렇게 말하는 거예요.
 * 단어 등장 타이밍: "그리고": 416f, "이렇게": 448f, "말하는": 464f, "거예요.": 487f
 * 비주얼 컨셉: 화면 중앙에 AI OUTPUT 터미널 박스가 렌더링되기 시작. BORDER_PRIMARY 테두리의 패널이 위→아래 slide-down으로 등장. 내부는 빈 상태로 대기. ACCENT(#EF9F27) 색 cursor blink.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Terminal box slide-down entrance (0-30f)
  const boxEntrance = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_SNAPPY,
    durationInFrames: ANIMATION.DUR_MD,
  });

  const boxY = interpolate(boxEntrance, [0, 1], [ANIMATION.ENTER_Y_LG, 0]);
  const boxOpacity = interpolate(boxEntrance, [0, 1], [0, 1]);

  // Header label fades in at 10f
  const headerOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blink
  const cursorVisible = Math.floor(frame / 20) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Terminal box — centered */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            width: 720,
            minHeight: 320,
            border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.BORDER_PRIMARY}`,
            backgroundColor: COLORS.BG_SURFACE,
            opacity: boxOpacity,
            transform: `translateY(${boxY}px)`,
            boxShadow: EFFECTS.GLOW_MD,
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              padding: `${SPACING.PX_12}px ${SPACING.PX_24}px`,
              borderBottom: `${SPACING.BORDER_THIN}px solid ${COLORS.BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: headerOpacity,
            }}
          >
            <span
              style={{
                color: COLORS.PRIMARY,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
                fontWeight: FONTS.WEIGHT_SEMIBOLD,
                letterSpacing: `${FONTS.TRACKING_WIDER}em`,
              }}
            >
              AI 출력
            </span>
            <span
              style={{
                color: COLORS.TEXT_DISABLED,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
              }}
            >
              STDOUT
            </span>
          </div>

          {/* Terminal body — empty with blinking cursor */}
          <div style={{ padding: SPACING.PX_24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: SPACING.PX_8,
              }}
            >
              <span
                style={{
                  color: COLORS.TEXT_DISABLED,
                  fontSize: FONTS.SIZE_SM,
                  fontFamily: FONTS.MONO,
                }}
              >
                {">"}
              </span>
              {cursorVisible && (
                <div
                  style={{
                    width: 2,
                    height: FONTS.SIZE_SM * 0.85,
                    backgroundColor: COLORS.ACCENT,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 저 차량, 군사 차량입니다.
 * 단어 등장 타이밍: "저": 521f, "차량,": 554f, "군사": 576f, "차량입니다.": 601f
 * 비주얼 컨셉: Scene 4의 AI OUTPUT 박스 안에 텍스트가 타이핑 이펙트로 등장: `VEHICLE_TYPE: MILITARY`. 단어 "군사" 등장 시 텍스트 옆에 NEGATIVE 색 태그 [THREAT] 가 flash-in. 격자 오버레이가 깜빡이며 타깃 포착 느낌.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "군사" appears at local frame 55 (576-521)
  const THREAT_FRAME = 55;

  // Typewriter for "VEHICLE_TYPE: MILITARY" — starts at frame 10
  const typewriterStart = 10;

  // THREAT tag flash-in at THREAT_FRAME
  const threatEntrance = spring({
    frame: Math.max(0, frame - THREAT_FRAME),
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  // Grid overlay blink after THREAT_FRAME
  const gridBlink = frame >= THREAT_FRAME
    ? (Math.floor((frame - THREAT_FRAME) / 10) % 2 === 0 ? 0.15 : 0.05)
    : 0.08;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Grid overlay background */}
      <GridOverlay cellSize={80} color={COLORS.PRIMARY} opacity={gridBlink} />

      {/* Terminal box — same structure as Scene4 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            width: 720,
            minHeight: 320,
            border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.BORDER_PRIMARY}`,
            backgroundColor: COLORS.BG_SURFACE,
            boxShadow: EFFECTS.GLOW_MD,
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              padding: `${SPACING.PX_12}px ${SPACING.PX_24}px`,
              borderBottom: `${SPACING.BORDER_THIN}px solid ${COLORS.BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: COLORS.PRIMARY,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
                fontWeight: FONTS.WEIGHT_SEMIBOLD,
                letterSpacing: `${FONTS.TRACKING_WIDER}em`,
              }}
            >
              AI 출력
            </span>
            <span
              style={{
                color: COLORS.TEXT_DISABLED,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
              }}
            >
              STDOUT
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: SPACING.PX_24 }}>
            {/* Line 1: VEHICLE_TYPE output */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: SPACING.PX_12,
                marginBottom: SPACING.PX_16,
              }}
            >
              <span
                style={{
                  color: COLORS.TEXT_DISABLED,
                  fontSize: FONTS.SIZE_SM,
                  fontFamily: FONTS.MONO,
                }}
              >
                {">"}
              </span>
              <TypewriterText
                text="VEHICLE_TYPE: MILITARY"
                startFrame={typewriterStart}
                framesPerChar={2}
                color={COLORS.TEXT_MAIN}
                fontSize={FONTS.SIZE_MD}
                fontWeight={FONTS.WEIGHT_MEDIUM}
                fontFamily={FONTS.MONO}
                cursorColor={COLORS.ACCENT}
                showCursor={frame < THREAT_FRAME + 20}
              />

              {/* THREAT tag */}
              {frame >= THREAT_FRAME && (
                <div
                  style={{
                    opacity: threatEntrance,
                    transform: `scale(${interpolate(threatEntrance, [0, 1], [ANIMATION.SCALE_ENTER, 1])})`,
                    padding: `${SPACING.PX_4}px ${SPACING.PX_12}px`,
                    backgroundColor: COLORS.NEGATIVE_DIM,
                    border: `1px solid ${COLORS.NEGATIVE}`,
                  }}
                >
                  <span
                    style={{
                      color: COLORS.NEGATIVE,
                      fontSize: FONTS.SIZE_XS,
                      fontFamily: FONTS.MONO,
                      fontWeight: FONTS.WEIGHT_BOLD,
                      letterSpacing: `${FONTS.TRACKING_WIDER}em`,
                    }}
                  >
                    위협
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 저 건물, 무기 시설로 추정됩니다.
 * 단어 등장 타이밍: "저": 689f, "건물,": 701f, "무기": 740f, "시설로": 776f, "추정됩니다.": 805f
 * 비주얼 컨셉: AI OUTPUT 박스에 두 번째 항목 추가 타이핑: `STRUCTURE: WEAPONS FACILITY (est.)`. 텍스트 컬러는 WARNING(#EF9F27). 우측에 신뢰도 게이지 바가 왼→오른 채워지며 "CONFIDENCE: 91%" 표시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "무기" at local frame 51 (740-689), "추정됩니다." at 116 (805-689)
  const WEAPON_FRAME = 51;

  // Confidence gauge fills starting at WEAPON_FRAME
  const gaugeProgress = interpolate(
    frame,
    [WEAPON_FRAME, WEAPON_FRAME + ANIMATION.DUR_XL],
    [0, 91],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(...ANIMATION.EASE_OUT),
    }
  );

  // Confidence label appears at ~80f
  const confLabelOpacity = interpolate(frame, [80, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Terminal box */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            width: 720,
            minHeight: 320,
            border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.BORDER_PRIMARY}`,
            backgroundColor: COLORS.BG_SURFACE,
            boxShadow: EFFECTS.GLOW_MD,
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              padding: `${SPACING.PX_12}px ${SPACING.PX_24}px`,
              borderBottom: `${SPACING.BORDER_THIN}px solid ${COLORS.BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: COLORS.PRIMARY,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
                fontWeight: FONTS.WEIGHT_SEMIBOLD,
                letterSpacing: `${FONTS.TRACKING_WIDER}em`,
              }}
            >
              AI 출력
            </span>
            <span
              style={{
                color: COLORS.TEXT_DISABLED,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
              }}
            >
              STDOUT
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: SPACING.PX_24 }}>
            {/* Line 1: Previous (already completed) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: SPACING.PX_12,
                marginBottom: SPACING.PX_16,
              }}
            >
              <span
                style={{
                  color: COLORS.TEXT_DISABLED,
                  fontSize: FONTS.SIZE_SM,
                  fontFamily: FONTS.MONO,
                }}
              >
                {">"}
              </span>
              <span
                style={{
                  color: COLORS.TEXT_MAIN,
                  fontSize: FONTS.SIZE_MD,
                  fontFamily: FONTS.MONO,
                  fontWeight: FONTS.WEIGHT_MEDIUM,
                }}
              >
                VEHICLE_TYPE: MILITARY
              </span>
              <div
                style={{
                  padding: `${SPACING.PX_4}px ${SPACING.PX_12}px`,
                  backgroundColor: COLORS.NEGATIVE_DIM,
                  border: `1px solid ${COLORS.NEGATIVE}`,
                }}
              >
                <span
                  style={{
                    color: COLORS.NEGATIVE,
                    fontSize: FONTS.SIZE_XS,
                    fontFamily: FONTS.MONO,
                    fontWeight: FONTS.WEIGHT_BOLD,
                    letterSpacing: `${FONTS.TRACKING_WIDER}em`,
                  }}
                >
                  위협
                </span>
              </div>
            </div>

            {/* Line 2: STRUCTURE output — new typewriter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: SPACING.PX_12,
                marginBottom: SPACING.PX_24,
              }}
            >
              <span
                style={{
                  color: COLORS.TEXT_DISABLED,
                  fontSize: FONTS.SIZE_SM,
                  fontFamily: FONTS.MONO,
                }}
              >
                {">"}
              </span>
              <TypewriterText
                text="STRUCTURE: WEAPONS FACILITY (est.)"
                startFrame={8}
                framesPerChar={2}
                color={COLORS.WARNING}
                fontSize={FONTS.SIZE_MD}
                fontWeight={FONTS.WEIGHT_MEDIUM}
                fontFamily={FONTS.MONO}
                cursorColor={COLORS.ACCENT}
                showCursor={true}
              />
            </div>

            {/* Confidence gauge */}
            <div style={{ marginTop: SPACING.PX_16, opacity: confLabelOpacity }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: SPACING.PX_8,
                }}
              >
                <span
                  style={{
                    color: COLORS.TEXT_MUTED,
                    fontSize: FONTS.SIZE_XS,
                    fontFamily: FONTS.MONO,
                    letterSpacing: `${FONTS.TRACKING_WIDE}em`,
                  }}
                >
                  신뢰도
                </span>
                <span
                  style={{
                    color: COLORS.WARNING,
                    fontSize: FONTS.SIZE_SM,
                    fontFamily: FONTS.MONO,
                    fontWeight: FONTS.WEIGHT_BOLD,
                  }}
                >
                  {Math.round(gaugeProgress)}%
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  backgroundColor: COLORS.BG_ELEVATED,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${gaugeProgress}%`,
                    backgroundColor: COLORS.WARNING,
                    boxShadow: EFFECTS.GLOW_ACCENT,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 근데요.
 * 단어 등장 타이밍: "근데요,": 889f
 * 비주얼 컨셉: 화면 전체가 짧게 darkening flash(BG_VOID로 순간 fade). "근데요." 텍스트만 중앙에 SIZE_LG, TEXT_MUTED 컬러로 홀로 등장. 여백과 침묵을 강조하는 미니멀 composition.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Darkening flash at start (0-15f)
  const flashOpacity = interpolate(frame, [0, 6, 12], [0.8, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text fade-in (5-20f) — very subtle since scene is only 37 frames
  const textOpacity = interpolate(frame, [5, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      {/* Darkening flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.BG_VOID,
          opacity: flashOpacity,
          zIndex: Z.TOP,
        }}
      />

      {/* Minimal centered text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            color: COLORS.TEXT_MUTED,
            fontSize: FONTS.SIZE_LG,
            fontWeight: FONTS.WEIGHT_MEDIUM,
            fontFamily: FONTS.PRIMARY,
            letterSpacing: `${FONTS.TRACKING_WIDE}em`,
          }}
        >
          근데요.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 이게 영화 얘기가 아니에요.
 * 단어 등장 타이밍: "이게": 926f, "영화": 947f, "얘기가": 952f, "아니에요.": 998f
 * 비주얼 컨셉: 배경 좌측에 반투명(opacity 0.15) 필름 프레임 직사각형이 등장했다가 사라짐(crossed out 효과). 중앙 텍스트 "이게 영화 얘기가 아니에요." 가 TEXT_MAIN SIZE_XL로 강하게 등장. "아니에요." 단어 등장 순간 아래 빨간 밑줄(NEGATIVE 색) 1px 수평선이 슥 그어짐.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "아니에요." arrives at local frame 72 (998-926)
  const DENY_FRAME = 72;

  // Film frame rectangle — appears at 5f, fades out and gets crossed at ~40f
  const filmFrameOpacity = interpolate(frame, [5, 20, 40, 55], [0, 0.15, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Cross-out line progress on the film frame
  const crossOutProgress = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ANIMATION.EASE_OUT),
  });

  // Main text entrance
  const textEntrance = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  // Red underline draws at DENY_FRAME
  const underlineProgress = spring({
    frame: Math.max(0, frame - DENY_FRAME),
    fps,
    config: ANIMATION.SPRING_SNAPPY,
    durationInFrames: ANIMATION.DUR_SM,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Film frame rectangle — left side */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 140,
          width: 280,
          height: 200,
          border: `1px solid ${COLORS.TEXT_DISABLED}`,
          opacity: filmFrameOpacity,
          zIndex: Z.BG,
        }}
      >
        {/* Inner frame lines */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            border: `1px solid ${COLORS.TEXT_DISABLED}`,
            opacity: 0.5,
          }}
        />
        {/* Cross-out diagonal line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "141%",
            height: 1,
            backgroundColor: COLORS.NEGATIVE,
            opacity: 0.6,
            transform: `rotate(35deg) scaleX(${crossOutProgress})`,
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              opacity: interpolate(textEntrance, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(textEntrance, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`,
              color: COLORS.TEXT_MAIN,
              fontSize: FONTS.SIZE_XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              fontFamily: FONTS.DISPLAY,
              lineHeight: FONTS.LEADING_TIGHT,
            }}
          >
            이게 영화 얘기가 아니에요.
          </div>
          {/* Red underline under "아니에요" */}
          <div
            style={{
              position: "absolute",
              bottom: -8,
              right: 0,
              width: 200,
              height: 1,
              backgroundColor: COLORS.NEGATIVE,
              transform: `scaleX(${underlineProgress})`,
              transformOrigin: "right center",
              boxShadow: `0 0 8px ${COLORS.NEGATIVE}`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 올해 실제로 일어난 일입니다.
 * 단어 등장 타이밍: "올해": 1050f, "실제로": 1098f, "일어난": 1101f, "일입니다.": 1127f
 * 비주얼 컨셉: 상단에 ACCENT 배경의 [BREAKING] 속보 레이블이 좌→우 slide-in. 그 아래에 "2025 · REAL EVENT" 텍스트가 TRACKING_WIDER 자간으로 등장. 미세한 horizontal ticker line(TEXT_DISABLED 컬러)이 화면 하단을 흐름.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Breaking label slide-in from left (0-20f)
  const breakingSlide = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_SNAPPY,
    durationInFrames: ANIMATION.DUR_SM,
  });
  const breakingX = interpolate(breakingSlide, [0, 1], [-300, 0]);

  // Year text appears staggered after label
  const yearTextEntrance = spring({
    frame: Math.max(0, frame - ANIMATION.STAGGER_LG),
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  // Ticker line — horizontal scroll from right to left
  const tickerOffset = (frame * 2) % 1920;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Breaking label — top area */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: SPACING.PX_96,
          transform: `translateX(${breakingX}px)`,
          opacity: breakingSlide,
          zIndex: Z.UI,
          display: "flex",
          alignItems: "center",
          gap: SPACING.PX_16,
        }}
      >
        {/* BREAKING badge */}
        <div
          style={{
            backgroundColor: COLORS.ACCENT,
            padding: `${SPACING.PX_8}px ${SPACING.PX_24}px`,
          }}
        >
          <span
            style={{
              color: COLORS.BG_BASE,
              fontSize: FONTS.SIZE_SM,
              fontWeight: FONTS.WEIGHT_BOLD,
              fontFamily: FONTS.MONO,
              letterSpacing: `${FONTS.TRACKING_WIDER}em`,
            }}
          >
            속보
          </span>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: 40,
            height: 1,
            backgroundColor: COLORS.ACCENT,
            opacity: 0.5,
          }}
        />
      </div>

      {/* Year + event text */}
      <div
        style={{
          position: "absolute",
          top: 270,
          left: SPACING.PX_96,
          opacity: yearTextEntrance,
          transform: `translateY(${interpolate(yearTextEntrance, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`,
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            color: COLORS.TEXT_MAIN,
            fontSize: FONTS.SIZE_XL,
            fontWeight: FONTS.WEIGHT_BOLD,
            fontFamily: FONTS.DISPLAY,
            letterSpacing: `${FONTS.TRACKING_WIDER}em`,
            lineHeight: FONTS.LEADING_TIGHT,
          }}
        >
          2025 · 실제 사건
        </div>
        <div
          style={{
            marginTop: SPACING.PX_16,
            color: COLORS.TEXT_MUTED,
            fontSize: FONTS.SIZE_SM,
            fontFamily: FONTS.MONO,
            letterSpacing: `${FONTS.TRACKING_WIDE}em`,
          }}
        >
          올해 실제로 일어난 일입니다.
        </div>
      </div>

      {/* Horizontal ticker line — bottom (above caption area) */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          width: "100%",
          height: 1,
          overflow: "hidden",
          zIndex: Z.BG,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -tickerOffset,
            width: 3840,
            height: 1,
            background: `repeating-linear-gradient(90deg, ${COLORS.TEXT_DISABLED} 0px, ${COLORS.TEXT_DISABLED} 40px, transparent 40px, transparent 80px)`,
            opacity: 0.3,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 미국이 이란을 공격했을 때, 그 작전에 핵심의 AI가 있었어요.
 * 단어 등장 타이밍: "미국이": 1177f, "이란을": 1216f, "공격했을": 1243f, "때": 1286f, "그": 1300f, "작전에": 1309f, "핵심의": 1341f, "AI가": 1371f, "있었어요.": 1388f
 * 비주얼 컨셉: 지도 격자(추상적인 좌표선 그리드, 실제 지도가 아닌 군사 HUD 스타일)가 배경에 등장. 좌측에 "US" 레이블 노드, 우측에 "IR" 레이블 노드, 두 점 사이를 잇는 선이 왼→오른으로 그려짐. "AI가" 단어 등장 시 선 중앙에 PRIMARY 색 원형 마커 pulse.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Local word timings: "AI가" at local 194 (1371-1177)
  const AI_MARKER_FRAME = 194;

  // Grid background entrance
  const gridOpacity = interpolate(frame, [0, ANIMATION.DUR_MD], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // US node appears at ~10f
  const usNodeIn = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  // IR node appears at ~39f (aligned with "이란을" local frame)
  const irNodeIn = spring({
    frame: Math.max(0, frame - 39),
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  // Connection line draws from left to right (starts after both nodes appear)
  const lineProgress = interpolate(frame, [50, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...ANIMATION.EASE_OUT),
  });

  // AI marker pulse at center of line
  const aiMarkerActive = frame >= AI_MARKER_FRAME;
  const aiPulse = aiMarkerActive
    ? spring({
        frame: frame - AI_MARKER_FRAME,
        fps,
        config: ANIMATION.SPRING_BOUNCY,
      })
    : 0;

  // Pulse ring
  const pulseRingScale = aiMarkerActive
    ? 1 + Math.sin((frame - AI_MARKER_FRAME) / 8) * 0.3
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Military grid background */}
      <GridOverlay cellSize={60} color={COLORS.PRIMARY} opacity={gridOpacity} />

      {/* Main content — centered, above captions */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            width: 900,
            height: 300,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* US node — left */}
          <div
            style={{
              opacity: usNodeIn,
              transform: `scale(${interpolate(usNodeIn, [0, 1], [ANIMATION.SCALE_ENTER, 1])})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: SPACING.PX_12,
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.PRIMARY}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.BG_SURFACE,
              }}
            >
              <span
                style={{
                  color: COLORS.PRIMARY,
                  fontSize: FONTS.SIZE_MD,
                  fontFamily: FONTS.MONO,
                  fontWeight: FONTS.WEIGHT_BOLD,
                }}
              >
                US
              </span>
            </div>
            <span
              style={{
                color: COLORS.TEXT_MUTED,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
                letterSpacing: `${FONTS.TRACKING_WIDE}em`,
              }}
            >
              미국
            </span>
          </div>

          {/* Connection line — between nodes */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 80,
              right: 80,
              height: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.PRIMARY,
                opacity: 0.6,
                transform: `scaleX(${lineProgress})`,
                transformOrigin: "left center",
                boxShadow: EFFECTS.GLOW_SM,
              }}
            />

            {/* AI marker — center of line */}
            {aiMarkerActive && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: SPACING.PX_8,
                }}
              >
                {/* Pulse ring */}
                <div
                  style={{
                    position: "absolute",
                    width: 40,
                    height: 40,
                    border: `1px solid ${COLORS.PRIMARY}`,
                    opacity: 0.3,
                    transform: `scale(${pulseRingScale})`,
                  }}
                />
                {/* Center dot */}
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: COLORS.PRIMARY,
                    opacity: aiPulse,
                    boxShadow: EFFECTS.GLOW_MD,
                  }}
                />
                {/* AI label */}
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    color: COLORS.PRIMARY,
                    fontSize: FONTS.SIZE_XS,
                    fontFamily: FONTS.MONO,
                    fontWeight: FONTS.WEIGHT_BOLD,
                    letterSpacing: `${FONTS.TRACKING_WIDER}em`,
                    whiteSpace: "nowrap",
                    opacity: aiPulse,
                  }}
                >
                  AI 핵심
                </div>
              </div>
            )}
          </div>

          {/* IR node — right */}
          <div
            style={{
              opacity: irNodeIn,
              transform: `scale(${interpolate(irNodeIn, [0, 1], [ANIMATION.SCALE_ENTER, 1])})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: SPACING.PX_12,
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.NEGATIVE}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.BG_SURFACE,
              }}
            >
              <span
                style={{
                  color: COLORS.NEGATIVE,
                  fontSize: FONTS.SIZE_MD,
                  fontFamily: FONTS.MONO,
                  fontWeight: FONTS.WEIGHT_BOLD,
                }}
              >
                IR
              </span>
            </div>
            <span
              style={{
                color: COLORS.TEXT_MUTED,
                fontSize: FONTS.SIZE_XS,
                fontFamily: FONTS.MONO,
                letterSpacing: `${FONTS.TRACKING_WIDE}em`,
              }}
            >
              이란
            </span>
          </div>
        </div>
      </div>

      {/* Top-left: operation label */}
      <div
        style={{
          position: "absolute",
          top: SPACING.PX_40,
          left: SPACING.PX_48,
          zIndex: Z.UI,
        }}
      >
        <div
          style={{
            color: COLORS.TEXT_DISABLED,
            fontSize: FONTS.SIZE_XS,
            fontFamily: FONTS.MONO,
            letterSpacing: `${FONTS.TRACKING_WIDER}em`,
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          작전 경로 // 2025
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 프로젝트 메이븐.
 * 단어 등장 타이밍: "프로젝트": 1444f, "메이븐.": 1494f
 * 비주얼 컨셉: 화면 암전 후 중앙에 "PROJECT MAVEN" 텍스트가 SIZE_3XL, WEIGHT_EXTRABOLD, TEXT_MAIN 색으로 강렬하게 등장. 텍스트 아래에 PRIMARY 색 얇은 수평선(2px)이 좌→우로 drawing. letterSpacing wide 적용으로 기술적 위엄감 표현.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance — spring from scale + opacity
  const titleEntrance = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: ANIMATION.SPRING_HEAVY,
  });

  // Underline draws starting at ~30f
  const underlineStart = 30;

  // Subtle background radial glow
  const glowOpacity = interpolate(frame, [10, 50], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: EFFECTS.RADIAL_PRIMARY,
          opacity: glowOpacity,
          zIndex: Z.BG,
        }}
      />

      {/* Center: PROJECT MAVEN */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            opacity: interpolate(titleEntrance, [0, 1], [0, 1]),
            transform: `scale(${interpolate(titleEntrance, [0, 1], [ANIMATION.SCALE_ENTER, 1])})`,
            color: COLORS.TEXT_MAIN,
            fontSize: FONTS.SIZE_3XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            fontFamily: FONTS.DISPLAY,
            letterSpacing: `${FONTS.TRACKING_WIDER}em`,
            lineHeight: FONTS.LEADING_TIGHT,
            textShadow: EFFECTS.GLOW_TEXT_LG,
          }}
        >
          PROJECT MAVEN
        </div>

        {/* Underline */}
        <div style={{ marginTop: SPACING.PX_16, width: 400 }}>
          <DrawLine
            startFrame={underlineStart}
            durationInFrames={ANIMATION.DUR_LG}
            color={COLORS.PRIMARY}
            thickness={2}
            width={400}
            direction="ltr"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 오늘은 이게 뭔지, 어떻게 작동하는지,
 * 단어 등장 타이밍: "오늘은": 1546f, "이게": 1573f, "뭔지,": 1592f, "어떻게": 1616f, "작동하는지,": 1643f
 * 비주얼 컨셉: "PROJECT MAVEN" 텍스트는 유지된 채 좌측으로 이동. 우측에 투명 패널 배경(GLASS_BG)이 등장하며 3개의 항목 텍스트가 순차적으로 위→아래 stagger 등장: [01. 정의], [02. 작동 방식], [03. 논쟁]. "오늘은" 단어에 동기화하여 시작.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title moves left
  const titleShift = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
    durationInFrames: ANIMATION.DUR_LG,
  });
  const titleX = interpolate(titleShift, [0, 1], [0, -280]);

  // Panel entrance — appears staggered after title moves
  const panelIn = spring({
    frame: Math.max(0, frame - ANIMATION.STAGGER_LG),
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  // Agenda items with stagger
  const agendaItems = [
    { num: "01", label: "정의" },
    { num: "02", label: "작동 방식" },
    { num: "03", label: "논쟁" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      {/* Radial glow (persistent) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: EFFECTS.RADIAL_PRIMARY,
          opacity: 0.3,
          zIndex: Z.BG,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: SPACING.PX_80,
          zIndex: Z.CONTENT,
        }}
      >
        {/* Left: PROJECT MAVEN title (shifts left) */}
        <div
          style={{
            transform: `translateX(${titleX}px)`,
            color: COLORS.TEXT_MAIN,
            fontSize: FONTS.SIZE_2XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            fontFamily: FONTS.DISPLAY,
            letterSpacing: `${FONTS.TRACKING_WIDER}em`,
            lineHeight: FONTS.LEADING_TIGHT,
            textShadow: EFFECTS.GLOW_TEXT_SM,
            flexShrink: 0,
          }}
        >
          PROJECT
          <br />
          MAVEN
        </div>

        {/* Right: Agenda panel */}
        <div
          style={{
            opacity: panelIn,
            transform: `translateX(${interpolate(panelIn, [0, 1], [40, 0])}px)`,
            backgroundColor: EFFECTS.GLASS_BG,
            border: `1px solid ${EFFECTS.GLASS_BORDER}`,
            padding: `${SPACING.PX_32}px ${SPACING.PX_40}px`,
            minWidth: 320,
          }}
        >
          {agendaItems.map((item, i) => {
            const itemEntrance = spring({
              frame: Math.max(0, frame - ANIMATION.STAGGER_LG - (i + 1) * ANIMATION.STAGGER_MD),
              fps,
              config: ANIMATION.SPRING_SNAPPY,
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: SPACING.PX_16,
                  marginBottom: i < agendaItems.length - 1 ? SPACING.PX_24 : 0,
                  opacity: itemEntrance,
                  transform: `translateY(${interpolate(itemEntrance, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`,
                }}
              >
                <span
                  style={{
                    color: COLORS.PRIMARY,
                    fontSize: FONTS.SIZE_XS,
                    fontFamily: FONTS.MONO,
                    fontWeight: FONTS.WEIGHT_BOLD,
                    letterSpacing: `${FONTS.TRACKING_WIDER}em`,
                  }}
                >
                  {item.num}
                </span>
                <div
                  style={{
                    width: 24,
                    height: 1,
                    backgroundColor: COLORS.BORDER_STRONG,
                  }}
                />
                <span
                  style={{
                    color: COLORS.TEXT_MAIN,
                    fontSize: FONTS.SIZE_MD,
                    fontFamily: FONTS.PRIMARY,
                    fontWeight: FONTS.WEIGHT_MEDIUM,
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 그리고 솔직히 좀 무섭기도 한 얘기까지 전부 털어놓을게요.
 * 단어 등장 타이밍: "그리고": 1721f, "솔직히": 1740f, "좀": 1760f, "무섭기도": 1767f, "한": 1793f, "얘기까지": 1800f, "전부": 1831f, "털어놓을게요.": 1844f
 * 비주얼 컨셉: "무섭기도" 단어 등장 시 배경 전체에 NEGATIVE_DIM(rgba(226,75,74,0.15)) 오버레이가 짧게 flash. 중앙에 TEXT_BODY 색 SIZE_MD 텍스트가 부드럽게 fade-in. "털어놓을게요." 마지막 단어에서 화면 우측 하단에 ">> PLAY" 화살표 아이콘 대신 "→ START" 마커가 등장하며 섹션 종료 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "무섭기도" at local 46 (1767-1721), "털어놓을게요." at local 123 (1844-1721)
  const FEAR_FRAME = 46;
  const END_FRAME = 123;

  // Text fade-in
  const textEntrance = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  // Warning flash at FEAR_FRAME
  const warningFlashOpacity = interpolate(
    frame,
    [FEAR_FRAME, FEAR_FRAME + 8, FEAR_FRAME + 20],
    [0, 0.15, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Start marker appears at END_FRAME
  const startMarkerIn = spring({
    frame: Math.max(0, frame - END_FRAME),
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Warning flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: COLORS.NEGATIVE,
          opacity: warningFlashOpacity,
          zIndex: Z.OVERLAY,
          pointerEvents: "none",
        }}
      />

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: SPACING.PX_96,
          paddingRight: SPACING.PX_96,
          zIndex: Z.CONTENT,
        }}
      >
        <div
          style={{
            opacity: interpolate(textEntrance, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textEntrance, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`,
            color: COLORS.TEXT_BODY,
            fontSize: FONTS.SIZE_MD,
            fontWeight: FONTS.WEIGHT_MEDIUM,
            fontFamily: FONTS.PRIMARY,
            lineHeight: FONTS.LEADING_NORMAL,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          그리고 솔직히 좀 무섭기도 한 얘기까지
          <br />
          전부 털어놓을게요.
        </div>
      </div>

      {/* Bottom-right: START marker */}
      <div
        style={{
          position: "absolute",
          bottom: 150 + SPACING.PX_32,
          right: SPACING.PX_64,
          opacity: startMarkerIn,
          transform: `translateX(${interpolate(startMarkerIn, [0, 1], [20, 0])}px)`,
          zIndex: Z.UI,
          display: "flex",
          alignItems: "center",
          gap: SPACING.PX_8,
        }}
      >
        <div
          style={{
            width: 24,
            height: 1,
            backgroundColor: COLORS.PRIMARY,
          }}
        />
        <span
          style={{
            color: COLORS.PRIMARY,
            fontSize: FONTS.SIZE_XS,
            fontFamily: FONTS.MONO,
            fontWeight: FONTS.WEIGHT_SEMIBOLD,
            letterSpacing: `${FONTS.TRACKING_WIDER}em`,
          }}
        >
          시작
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={96}>
        <Scene1 />
      </Sequence>
      <Sequence from={96} durationInFrames={107}>
        <Scene2 />
      </Sequence>
      <Sequence from={203} durationInFrames={213}>
        <Scene3 />
      </Sequence>
      <Sequence from={416} durationInFrames={105}>
        <Scene4 />
      </Sequence>
      <Sequence from={521} durationInFrames={168}>
        <Scene5 />
      </Sequence>
      <Sequence from={689} durationInFrames={200}>
        <Scene6 />
      </Sequence>
      <Sequence from={889} durationInFrames={37}>
        <Scene7 />
      </Sequence>
      <Sequence from={926} durationInFrames={124}>
        <Scene8 />
      </Sequence>
      <Sequence from={1050} durationInFrames={127}>
        <Scene9 />
      </Sequence>
      <Sequence from={1177} durationInFrames={267}>
        <Scene10 />
      </Sequence>
      <Sequence from={1444} durationInFrames={102}>
        <Scene11 />
      </Sequence>
      <Sequence from={1546} durationInFrames={175}>
        <Scene12 />
      </Sequence>
      <Sequence from={1721} durationInFrames={200}>
        <Scene13 />
      </Sequence>
    </AbsoluteFill>
  );
};
