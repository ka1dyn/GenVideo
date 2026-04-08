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
import { DrawLine } from "../components/DrawLine";
import { QuotePanel } from "../components/QuotePanel";
import { CounterText } from "../components/CounterText";
import { StatusTag } from "../components/StatusTag";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 때는 2017년이에요.
 * 단어 등장 타이밍: "때는": 0f, "2017년이에요.": 18f
 * 비주얼 컨셉: BG_VOID 배경에서 BG_BASE로 fade-in. 중앙에 "2017" 숫자가 SIZE_4XL WEIGHT_EXTRABOLD TEXT_MAIN으로 하단→중앙 spring 진입. 그 위에 TEXT_MUTED SIZE_SM "ORIGIN POINT" 레이블이 TRACKING_WIDER 자간으로 위에서 등장. 직선 수평 분리선(PRIMARY 색 1px)이 숫자 아래에 그어짐.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgFade = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bgColor = `rgba(10, 14, 26, ${bgFade})`;

  const numEntrance = spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_HEAVY });
  const labelEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: bgColor }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ opacity: labelEntrance, transform: `translateY(${interpolate(labelEntrance, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`, color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, marginBottom: SPACING.PX_16 }}>
          시작점
        </div>
        <div style={{ opacity: numEntrance, transform: `translateY(${interpolate(numEntrance, [0, 1], [40, 0])}px)`, color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_4XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY, lineHeight: FONTS.LEADING_TIGHT }}>
          2017
        </div>
        <div style={{ marginTop: SPACING.PX_16, width: 200 }}>
          <DrawLine startFrame={30} durationInFrames={ANIMATION.DUR_LG} color={COLORS.PRIMARY} thickness={1} width={200} direction="ltr" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 미국 국방부가 심각한 고민에 빠졌습니다.
 * 단어 등장 타이밍: "미국": 117f, "국방부가": 121f, "심각한": 151f, "고민에": 178f, "빠졌습니다.": 202f
 * 비주얼 컨셉: 화면 상단에 "U.S. DEPARTMENT OF DEFENSE" 레이블이 TRACKING_WIDE TEXT_MUTED로 slide-in. 중앙에 경고 삼각형 대신, 가로로 긴 BORDER 테두리의 패널이 등장하며 내부에 "PROBLEM IDENTIFIED" 텍스트가 타이핑. "고민에" 단어 등장 시 패널 테두리가 WARNING 색으로 전환.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const WORRY_FRAME = 61; // "고민에" at 178-117
  const labelSlide = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const panelIn = spring({ frame: Math.max(0, frame - 15), fps, config: ANIMATION.SPRING_SNAPPY });
  const borderColor = frame >= WORRY_FRAME ? COLORS.WARNING : COLORS.BORDER;
  const borderGlow = frame >= WORRY_FRAME ? `0 0 16px ${COLORS.WARNING_DIM}` : "none";
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: SPACING.PX_96, left: 0, right: 0, textAlign: "center", zIndex: Z.UI, opacity: labelSlide, transform: `translateY(${interpolate(labelSlide, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)` }}>
        <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDE}em` }}>U.S. DEPARTMENT OF DEFENSE</span>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ opacity: panelIn, transform: `translateY(${interpolate(panelIn, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`, width: 620, padding: `${SPACING.PX_32}px ${SPACING.PX_40}px`, border: `${SPACING.BORDER_NORMAL}px solid ${borderColor}`, backgroundColor: COLORS.BG_SURFACE, boxShadow: borderGlow, transition: "border-color 0.3s" }}>
          <TypewriterText text="문제 식별 완료" startFrame={20} framesPerChar={3} color={COLORS.TEXT_MAIN} fontSize={FONTS.SIZE_LG} fontWeight={FONTS.WEIGHT_BOLD} fontFamily={FONTS.MONO} cursorColor={COLORS.ACCENT} showCursor={true} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: "드론이 찍어오는 영상이 너무 많아.
 * 단어 등장 타이밍: "\"드론이": 259f, "찍어오는": 289f, "영상이": 326f, "너무": 354f, "많아.": 373f
 * 비주얼 컨셉: 화면 좌측 GLASS_BG 패널에 따옴표 UI 스타일의 인용문 컴포넌트 등장. 상단에 PRIMARY 3px 수직 바, 내부에 인용 텍스트가 단어별로 순차 등장. 배경 우측에 여러 개의 소형 직사각형(영상 썸네일 추상)이 grid 형태로 순차 fade-in하며 "과부하" 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const words = [
    { text: "드론이 찍어오는", f: 0 },
    { text: "영상이", f: 67 },
    { text: "너무 많아.", f: 95 },
  ];
  const thumbs = Array.from({ length: 48 }, (_, i) => i);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Background grid of thumbnails - OVERLOAD FOCUS */}
      <div style={{ 
        position: "absolute", 
        top: 80, 
        right: 40, 
        display: "grid", 
        gridTemplateColumns: "repeat(6, 140px)", 
        gap: 12, 
        zIndex: Z.BG 
      }}>
        {thumbs.map((i) => {
          const delay = 10 + i * 2; // Faster staggering
          const o = interpolate(frame, [delay, delay + 10], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          
          // Jitter/Vibration effect for stress
          const jitterX = Math.sin(frame * 1.2 + i * 5) * 1.5;
          const jitterY = Math.cos(frame * 1.2 + i * 3) * 1.5;

          return (
            <div 
              key={i} 
              style={{ 
                width: 140, 
                height: 90, 
                backgroundColor: COLORS.BG_ELEVATED, 
                border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.BORDER_STRONG}`, 
                opacity: o,
                transform: `translate(${jitterX}px, ${jitterY}px)`,
                boxShadow: o > 0.3 ? `0 0 10px ${COLORS.BORDER}` : "none"
              }} 
            />
          );
        })}
      </div>
      {/* Quote panel */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", zIndex: Z.CONTENT }}>
        <div style={{ marginLeft: SPACING.PX_96 }}>
          <QuotePanel startFrame={10}>
            {/* Smooth line transition */}
            <div style={{ 
              opacity: spring({ frame: Math.max(0, frame - 15), fps, config: ANIMATION.SPRING_GENTLE }),
              transform: `translateY(${interpolate(spring({ frame: Math.max(0, frame - 15), fps, config: ANIMATION.SPRING_GENTLE }), [0, 1], [10, 0])}px)`,
              color: COLORS.TEXT_MAIN, 
              fontSize: FONTS.SIZE_MD, 
              fontFamily: FONTS.PRIMARY, 
              fontWeight: FONTS.WEIGHT_MEDIUM, 
              lineHeight: FONTS.LEADING_NORMAL 
            }}>
              드론이 찍어오는 영상이 너무 많아.
            </div>
          </QuotePanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 사람이 다 볼 수가 없어."
 * 단어 등장 타이밍: "사람이": 401f, "다": 441f, "볼": 442f, "수가": 451f, "없어.\"": 470f
 * 비주얼 컨셉: 기존 인용문 패널에 두번째 문장이 이어서 타이핑. "없어." 단어 등장 시 배경 직사각형들의 opacity가 낮아지며(overload 표현) NEGATIVE_DIM 오버레이가 순간적으로 깔림. 인용문 패널 우측 하단에 "— DOD Official" SOURCE 레이블 fade-in.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const CANT_FRAME = 69; // "없어" at 470-401
  const negFlash = interpolate(frame, [CANT_FRAME, CANT_FRAME + 8, CANT_FRAME + 20], [0, 0.15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sourceIn = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const thumbDim = interpolate(frame, [CANT_FRAME, CANT_FRAME + 15], [0.25, 0.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const thumbs = Array.from({ length: 48 }, (_, i) => i);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.NEGATIVE, opacity: negFlash, zIndex: Z.OVERLAY, pointerEvents: "none" }} />
      
      {/* Persist the dense grid from Scene 3 */}
      <div style={{ 
        position: "absolute", 
        top: 80, 
        right: 40, 
        display: "grid", 
        gridTemplateColumns: "repeat(6, 140px)", 
        gap: 12, 
        zIndex: Z.BG 
      }}>
        {thumbs.map((i) => {
          // At peak (CANT_FRAME), some items turn slightly negative/red
          const isStressed = frame >= CANT_FRAME && (i % 7 === 0);
          const jitterX = Math.sin(frame * 2 + i) * 2; // More intense jitter in Scene 4
          const jitterY = Math.cos(frame * 2.2 + i) * 2;

          return (
            <div 
              key={i} 
              style={{ 
                width: 140, 
                height: 90, 
                backgroundColor: isStressed ? COLORS.NEGATIVE_DIM : COLORS.BG_ELEVATED, 
                border: `${SPACING.BORDER_NORMAL}px solid ${isStressed ? COLORS.NEGATIVE : COLORS.BORDER_STRONG}`, 
                opacity: thumbDim * 1.6, // maintain higher visibility
                transform: `translate(${jitterX}px, ${jitterY}px)`,
                boxShadow: isStressed ? `0 0 15px ${COLORS.NEGATIVE_DIM}` : "none"
              }} 
            />
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", zIndex: Z.CONTENT }}>
        <div style={{ marginLeft: SPACING.PX_96 }}>
          <QuotePanel startFrame={-100} source="— 국방부 관계자" sourceOpacity={sourceIn}>
            <div style={{ 
              color: COLORS.TEXT_MAIN, 
              fontSize: FONTS.SIZE_MD, 
              fontFamily: FONTS.PRIMARY, 
              fontWeight: FONTS.WEIGHT_MEDIUM, 
              lineHeight: FONTS.LEADING_NORMAL 
            }}>
              드론이 찍어오는 영상이 너무 많아.
            </div>
            <div style={{ 
              opacity: spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_GENTLE }),
              transform: `translateY(${interpolate(spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_GENTLE }), [0, 1], [10, 0])}px)`,
              color: COLORS.TEXT_MAIN, 
              fontSize: FONTS.SIZE_MD, 
              fontFamily: FONTS.PRIMARY, 
              fontWeight: FONTS.WEIGHT_MEDIUM, 
              lineHeight: FONTS.LEADING_NORMAL 
            }}>
              사람이 다 볼 수가 없어."
            </div>
          </QuotePanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 생각해보세요.
 * 단어 등장 타이밍: "생각해보세요.": 496f
 * 비주얼 컨셉: 화면이 클리어되며 중앙에 "생각해보세요." 텍스트만 SIZE_XL TEXT_BODY 색으로 fade-in. 배경은 BG_BASE 단색 단순화. 시청자 몰입 유도를 위한 intentional 여백.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const textIn = spring({ frame: Math.max(0, frame - 5), fps, config: ANIMATION.SPRING_GENTLE });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`, color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_MEDIUM, fontFamily: FONTS.PRIMARY }}>
          생각해보세요.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 전 세계에 깔린 군사 드론이 하루 24시간 영상을 찍어서 쏟아붓는 거예요.
 * 단어 등장 타이밍: "전": 574f, "세계에": 580f, "깔린": 613f, "군사": 632f, "드론이": 681f, "하루": 701f, "24시간": 740f, "영상을": 770f, "찍어서": 800f, "쏟아붓는": 838f, "거예요.": 886f
 * 비주얼 컨셉: 화면 상단에 "GLOBAL DRONE NETWORK" 레이블. 그 아래 가로 막대 타임라인이 왼→오른으로 차오르며 "24H" 숫자가 증가. "쏟아붓는" 단어 등장 시 막대의 끝에서 화살표가 여러개로 분기하며 쏟아지는 이미지를 직선 애니메이션으로 표현. 데이터 흐름 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const POUR_FRAME = 264; // "쏟아붓는" at 838-574
  const barProgress = interpolate(frame, [20, 200], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  const hourCount = interpolate(frame, [20, 200], [0, 24], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const arrowsActive = frame >= POUR_FRAME;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: SPACING.PX_96, left: SPACING.PX_96, zIndex: Z.UI, opacity: labelIn }}>
        <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>글로벌 드론 네트워크</span>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_24, zIndex: Z.CONTENT }}>
        <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_3XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY }}>{Math.round(hourCount)}H</div>
        <div style={{ width: 600, height: 6, backgroundColor: COLORS.BG_ELEVATED }}>
          <div style={{ height: "100%", width: `${barProgress}%`, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 그걸 사람이 한 명 한 명 앉아서 들여다보고 있으면 어느 세월에 다 보겠어요.
 * 단어 등장 타이밍: "그걸": 886f, "사람이": 928f, "한": 932f, "명": 937f, "한": 952f, "명": 954f, "앉아서": 962f, "들여다보고": 988f, "있으면": 1031f, "어느": 1057f, "세월에": 1074f, "다": 1099f, "보겠어요.": 1108f
 * 비주얼 컨셉: 화면이 좌우 분할. 좌측 라벨: "HUMAN ANALYST" / 우측 라벨: "VIDEO QUEUE". 좌측에는 프로그레스 바가 극히 느리게(1% 진행)진행, 우측에는 영상 수가 counter로 빠르게 증가. 비율 불균형 시각화. "어느 세월에" 단어 등장 시 좌측 프로그레스 바에 빨간 X 표시(NEGATIVE 색 가로선).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const WHEN_FRAME = 171; // "어느 세월에" at 1057-886

  const leftIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const rightIn = spring({ frame: Math.max(0, frame - 8), fps, config: ANIMATION.SPRING_SNAPPY });

  // Human progress: crawls to 1%
  const humanProgress = interpolate(frame, [20, 250], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Video queue counter: fast increase
  const videoCount = interpolate(frame, [20, 200], [0, 14829], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });

  // X mark on human progress at WHEN_FRAME
  const xMarkIn = spring({ frame: Math.max(0, frame - WHEN_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", zIndex: Z.CONTENT }}>
        {/* Left: Human Analyst */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_24, opacity: leftIn, transform: `translateX(${interpolate(leftIn, [0, 1], [ANIMATION.ENTER_X_MD, 0])}px)`, borderRight: `1px solid ${COLORS.BORDER}` }}>
          <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>인간 분석관</span>
          <div style={{ width: 240, position: "relative" }}>
            <div style={{ width: "100%", height: 6, backgroundColor: COLORS.BG_ELEVATED }}>
              <div style={{ height: "100%", width: `${humanProgress}%`, backgroundColor: COLORS.SECONDARY }} />
            </div>
            <div style={{ marginTop: SPACING.PX_12, color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_MD, fontFamily: FONTS.DISPLAY, fontWeight: FONTS.WEIGHT_BOLD, textAlign: "center" }}>
              {humanProgress.toFixed(1)}%
            </div>
            {/* X mark */}
            {frame >= WHEN_FRAME && (
              <div style={{ position: "absolute", top: -24, left: "50%", transform: "translateX(-50%)", opacity: xMarkIn }}>
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <line x1="10" y1="10" x2="50" y2="50" stroke={COLORS.NEGATIVE} strokeWidth="3" strokeLinecap="square" style={{ strokeDasharray: 58, strokeDashoffset: interpolate(xMarkIn, [0, 1], [58, 0]) }} />
                  <line x1="50" y1="10" x2="10" y2="50" stroke={COLORS.NEGATIVE} strokeWidth="3" strokeLinecap="square" style={{ strokeDasharray: 58, strokeDashoffset: interpolate(xMarkIn, [0, 1], [58, 0]) }} />
                </svg>
              </div>
            )}
          </div>
        </div>
        {/* Right: Video Queue */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_24, opacity: rightIn, transform: `translateX(${interpolate(rightIn, [0, 1], [-ANIMATION.ENTER_X_MD, 0])}px)` }}>
          <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>영상 대기열</span>
          <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_3XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY, fontVariantNumeric: "tabular-nums" }}>
            {Math.round(videoCount).toLocaleString()}
          </div>
          <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO }}>PENDING FILES</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: "이거 군사 차량이야, 민간 차량이야?"
 * 단어 등장 타이밍: "\"이거": 1157f, "군사": 1175f, "차량이야,": 1195f, "민간": 1243f, "차량이야?\"": 1262f
 * 비주얼 컨셉: GLASS_BG 인용문 패널 재등장. 내부에 "VEHICLE TYPE?" 라벨과 두 개의 옵션 태그가 나란히: [MILITARY] (NEGATIVE 색) vs [CIVILIAN] (SECONDARY 색). 두 태그 사이에 "?" 표시가 pulse 애니메이션.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const CIVILIAN_FRAME = 86; // "민간" at 1243-1157

  const panelIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const labelIn = spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_SNAPPY });
  const tag1In = spring({ frame: Math.max(0, frame - 18), fps, config: ANIMATION.SPRING_SNAPPY });
  const tag2In = spring({ frame: Math.max(0, frame - CIVILIAN_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });

  // Pulse ? mark
  const qPulse = interpolate(Math.sin((frame / 20) * Math.PI * 2), [-1, 1], [0.3, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_32, zIndex: Z.CONTENT }}>
        {/* Label */}
        <div style={{ opacity: labelIn, transform: `translateY(${interpolate(labelIn, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`, color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>
          차량 유형 식별
        </div>
        {/* Panel */}
        <div style={{ opacity: panelIn, transform: `translateY(${interpolate(panelIn, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`, backgroundColor: EFFECTS.GLASS_BG, padding: `${SPACING.PX_40}px ${SPACING.PX_64}px`, display: "flex", alignItems: "center", gap: SPACING.PX_32 }}>
          {/* Military tag */}
          <div style={{ opacity: tag1In, transform: `translateX(${interpolate(tag1In, [0, 1], [ANIMATION.ENTER_X_SM, 0])}px)`, padding: `${SPACING.PX_12}px ${SPACING.PX_24}px`, border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.NEGATIVE}`, backgroundColor: COLORS.NEGATIVE_DIM }}>
            <span style={{ color: COLORS.NEGATIVE, fontSize: FONTS.SIZE_MD, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_SEMIBOLD }}>군사 차량</span>
          </div>
          {/* Pulse ? */}
          <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY, opacity: qPulse }}>
            ?
          </div>
          {/* Civilian tag */}
          <div style={{ opacity: tag2In, transform: `translateX(${interpolate(tag2In, [0, 1], [-ANIMATION.ENTER_X_SM, 0])}px)`, padding: `${SPACING.PX_12}px ${SPACING.PX_24}px`, border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.SECONDARY}`, backgroundColor: COLORS.SECONDARY_DIM }}>
            <span style={{ color: COLORS.SECONDARY, fontSize: FONTS.SIZE_MD, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_SEMIBOLD }}>민간 차량</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 이러다가 전쟁이 먼저 끝나는 거죠.
 * 단어 등장 타이밍: "이러다가": 1309f, "전쟁이": 1357f, "먼저": 1376f, "끝나는": 1396f, "거죠.": 1427f
 * 비주얼 컨셉: 화면 중앙에 타임라인 바가 등장. 좌측은 "분석 완료" 색(SECONDARY), 우측의 더 짧은 부분은 "전쟁 종료" 색(NEGATIVE)로 표시. 두 개의 레이블이 각각 단어 등장 시 stagger로 붙음. 아이러니한 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const WAR_FRAME = 48; // "전쟁이" at 1357-1309
  const END_FRAME = 87; // "끝나는" at 1396-1309

  const barIn = spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_SNAPPY });
  // Analysis bar grows very slowly
  const analysisWidth = interpolate(frame, [20, 150], [0, 75], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  // War end bar appears at WAR_FRAME
  const warWidth = interpolate(frame, [WAR_FRAME, WAR_FRAME + 30], [0, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const label1In = spring({ frame: Math.max(0, frame - 30), fps, config: ANIMATION.SPRING_GENTLE });
  const label2In = spring({ frame: Math.max(0, frame - WAR_FRAME - 10), fps, config: ANIMATION.SPRING_GENTLE });
  // "끝나는" emphasis
  const endFlash = frame >= END_FRAME ? interpolate(frame, [END_FRAME, END_FRAME + 8, END_FRAME + 20], [0, 0.12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.NEGATIVE, opacity: endFlash, zIndex: Z.OVERLAY, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_40, zIndex: Z.CONTENT }}>
        {/* Timeline bar container */}
        <div style={{ opacity: barIn, width: 700 }}>
          <div style={{ display: "flex", height: 8, backgroundColor: COLORS.BG_ELEVATED, width: "100%" }}>
            {/* Analysis portion */}
            <div style={{ height: "100%", width: `${analysisWidth}%`, backgroundColor: COLORS.SECONDARY, boxShadow: EFFECTS.GLOW_SECONDARY }} />
            {/* Gap */}
            <div style={{ flex: 1 }} />
            {/* War end portion */}
            <div style={{ height: "100%", width: `${warWidth}%`, backgroundColor: COLORS.NEGATIVE, boxShadow: `0 0 12px ${COLORS.NEGATIVE_DIM}` }} />
          </div>
          {/* Labels */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: SPACING.PX_16 }}>
            <div style={{ opacity: label1In, transform: `translateY(${interpolate(label1In, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)` }}>
              <div style={{ color: COLORS.SECONDARY, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_SEMIBOLD }}>분석 완료</div>
              <div style={{ color: COLORS.TEXT_DISABLED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, marginTop: SPACING.PX_4 }}>예상 소요: 수년</div>
            </div>
            <div style={{ opacity: label2In, transform: `translateY(${interpolate(label2In, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`, textAlign: "right" }}>
              <div style={{ color: COLORS.NEGATIVE, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_SEMIBOLD }}>전쟁 종료</div>
              <div style={{ color: COLORS.TEXT_DISABLED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, marginTop: SPACING.PX_4 }}>이미 끝남</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 그래서 만든 게 프로젝트 메이븐이에요.
 * 단어 등장 타이밍: "그래서": 1474f, "만든": 1514f, "게": 1515f, "프로젝트": 1523f, "메이븐이에요.": 1558f
 * 비주얼 컨셉: 화면 중앙에 "PROJECT MAVEN" 텍스트가 GLOW_MD 속성으로 발광하며 등장. "프로젝트" 단어 등장 프레임과 동기화. 텍스트 아래 얇은 PRIMARY 2px 수평선이 좌→우로 그려짐. 배경은 BG_VOID로 전환하며 미래지향적 분위기.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PROJECT_FRAME = 49; // "프로젝트" at 1523-1474

  const bgFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textIn = spring({ frame: Math.max(0, frame - PROJECT_FRAME), fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.BG_VOID, opacity: bgFade }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_24, zIndex: Z.CONTENT }}>
        <div style={{ opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [ANIMATION.ENTER_Y_LG, 0])}px)`, color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_3XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY, letterSpacing: `${FONTS.TRACKING_WIDE}em`, textShadow: EFFECTS.GLOW_TEXT_LG }}>
          PROJECT MAVEN
        </div>
        <div style={{ width: 320, marginTop: SPACING.PX_8 }}>
          <DrawLine startFrame={PROJECT_FRAME + 15} durationInFrames={ANIMATION.DUR_LG} color={COLORS.PRIMARY} thickness={2} width={320} direction="ltr" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 비유하자면요
 * 단어 등장 타이밍: "비유하자면요,": 1619f
 * 비주얼 컨셉: "PROJECT MAVEN" 텍스트가 상단으로 작아지며(SIZE_SM) 이동. 중앙에 "비유하자면" SIZE_LG TEXT_MUTED색으로 italics 스타일 fade-in. 극적 전환을 위한 브리지 씬.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topTextIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const centerTextIn = spring({ frame: Math.max(0, frame - 12), fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, zIndex: Z.CONTENT }}>
        {/* PROJECT MAVEN shrunk to top */}
        <div style={{ position: "absolute", top: SPACING.PX_64, left: 0, right: 0, textAlign: "center", opacity: topTextIn * 0.6 }}>
          <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>PROJECT MAVEN</span>
        </div>
        {/* Center bridge text */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ opacity: centerTextIn, transform: `translateY(${interpolate(centerTextIn, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`, color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_MEDIUM, fontFamily: FONTS.PRIMARY, fontStyle: "italic" }}>
            비유하자면
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: "전쟁터의 유튜브 알고리즘" 이에요.
 * 단어 등장 타이밍: "\"전쟁터의": 1687f, "유튜브": 1748f, "알고리즘\"": 1756f, "이에요.": 1843f
 * 비주얼 컨셉: 화면 중앙에 두 개의 레이블 태그가 "+" 기호로 연결: [전쟁터] (NEGATIVE_DIM 배경) + [유튜브 알고리즘] (PRIMARY_DIM 배경). 두 태그가 각 단어 등장 시 stagger로 나타나며 결합. 하단에 ACCENT 색 "= PROJECT MAVEN" 수식 텍스트 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const YT_FRAME = 61; // "유튜브" at 1748-1687
  const ALGO_FRAME = 69; // "알고리즘" at 1756-1687
  const RESULT_FRAME = 156; // "이에요." at 1843-1687

  const tag1In = spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_SNAPPY });
  const plusIn = spring({ frame: Math.max(0, frame - YT_FRAME - 5), fps, config: ANIMATION.SPRING_SNAPPY });
  const tag2In = spring({ frame: Math.max(0, frame - YT_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });
  const resultIn = spring({ frame: Math.max(0, frame - RESULT_FRAME), fps, config: ANIMATION.SPRING_HEAVY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_40, zIndex: Z.CONTENT }}>
        {/* Formula row */}
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_24 }}>
          {/* War tag */}
          <div style={{ opacity: tag1In, transform: `translateX(${interpolate(tag1In, [0, 1], [ANIMATION.ENTER_X_MD, 0])}px)`, padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`, backgroundColor: COLORS.NEGATIVE_DIM, border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.NEGATIVE}` }}>
            <span style={{ color: COLORS.NEGATIVE, fontSize: FONTS.SIZE_MD, fontFamily: FONTS.DISPLAY, fontWeight: FONTS.WEIGHT_BOLD }}>전쟁터</span>
          </div>
          {/* Plus */}
          <div style={{ opacity: plusIn, color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY }}>+</div>
          {/* YouTube Algorithm tag */}
          <div style={{ opacity: tag2In, transform: `translateX(${interpolate(tag2In, [0, 1], [-ANIMATION.ENTER_X_MD, 0])}px)`, padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`, backgroundColor: COLORS.PRIMARY_DIM, border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.PRIMARY}` }}>
            <span style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_MD, fontFamily: FONTS.DISPLAY, fontWeight: FONTS.WEIGHT_BOLD }}>유튜브 알고리즘</span>
          </div>
        </div>
        {/* Result */}
        <div style={{ opacity: resultIn, transform: `translateY(${interpolate(resultIn, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`, display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
          <span style={{ color: COLORS.ACCENT, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY }}>= PROJECT MAVEN</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 유튜브가 영상 수백만 개 중에서 내 취향에 맞는 걸 골라주잖아요.
 * 단어 등장 타이밍: "유튜브가": 1843f, "영상": 1889f, "수백만": 1901f, "개": 1920f, "중에서": 1928f, "내": 1954f, "취향에": 1963f, "맞는": 1988f, "걸": 2007f, "골라주잖아요.": 2014f
 * 비주얼 컨셉: 좌측 영역에 여러 직사각형 항목들이 나열(수백만 영상 추상). 우측에 필터 아이콘 대신 수직 수평선 교차 필터 패턴이 등장하며 왼→오른으로 scan. 필터 통과 후 오른쪽에 1개의 highlighted 항목만 남음. "골라주잖아요." 단어와 동기화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PICK_FRAME = 171; // "골라주잖아요" at 2014-1843
  const items = Array.from({ length: 18 }, (_, i) => i);

  // Scan line sweeps from left to right
  const scanProgress = interpolate(frame, [40, 160], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  const labelIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", zIndex: Z.CONTENT }}>
        {/* Left: items grid */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_16 }}>
          <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, opacity: labelIn, marginBottom: SPACING.PX_8 }}>수백만 영상</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 80px)", gap: 6 }}>
            {items.map((i) => {
              const itemDelay = 10 + i * 3;
              const itemIn = interpolate(frame, [itemDelay, itemDelay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              // Dim items that scan line has passed
              const dimmed = scanProgress > (i / items.length) * 100;
              const finalOpacity = dimmed && frame >= PICK_FRAME ? 0.15 : itemIn * 0.8;
              return <div key={i} style={{ width: 80, height: 48, backgroundColor: COLORS.PRIMARY_DIM, border: `1px solid ${COLORS.BORDER_PRIMARY}`, opacity: finalOpacity }} />;
            })}
          </div>
        </div>
        {/* Center: scan line (vertical) */}
        <div style={{ width: 2, height: 400, position: "relative", marginLeft: -1, marginRight: -1 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: `${scanProgress}%`, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
        </div>
        {/* Right: filtered result */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_16 }}>
          <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, opacity: labelIn, marginBottom: SPACING.PX_8 }}>추천 결과</span>
          {frame >= PICK_FRAME && (() => {
            const resultIn = spring({ frame: Math.max(0, frame - PICK_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });
            return (
              <div style={{ opacity: resultIn, transform: `scale(${interpolate(resultIn, [0, 1], [ANIMATION.SCALE_ENTER, 1])})`, width: 120, height: 72, backgroundColor: COLORS.BG_ELEVATED, border: `2px solid ${COLORS.PRIMARY}`, boxShadow: EFFECTS.GLOW_SM, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_BOLD }}>MATCHED</span>
              </div>
            );
          })()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 메이븐은 드론 영상 수천 시간 중에서 "위험한 것"만 걸러내는 거예요.
 * 단어 등장 타이밍: "메이븐은": 2082f, "드론": 2126f, "영상": 2138f, "수천": 2158f, "시간": 2177f, "중에서": 2199f, "\"위험한": 2225f, "것\"만": 2253f, "걸러내는": 2275f, "거예요.": 2311f
 * 비주얼 컨셉: Scene 13의 필터 UI 재활용. 이번에는 레이블이 "DRONE FEED: 수천 시간"으로 변경. 필터 후 남은 항목이 NEGATIVE 색 [THREAT DETECTED] 태그로 마킹. "위험한" 단어 등장 시 해당 항목이 pulse 강조 효과.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const THREAT_FRAME = 143; // "위험한" at 2225-2082
  const items = Array.from({ length: 18 }, (_, i) => i);

  const scanProgress = interpolate(frame, [30, 150], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  const labelIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  // Threat pulse
  const threatPulse = frame >= THREAT_FRAME ? interpolate(Math.sin(((frame - THREAT_FRAME) / 15) * Math.PI * 2), [-1, 1], [0.6, 1]) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", zIndex: Z.CONTENT }}>
        {/* Left: drone feed items */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_16 }}>
          <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, opacity: labelIn, marginBottom: SPACING.PX_8 }}>드론 영상: 수천 시간</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 80px)", gap: 6 }}>
            {items.map((i) => {
              const itemDelay = 8 + i * 2;
              const itemIn = interpolate(frame, [itemDelay, itemDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const dimmed = scanProgress > (i / items.length) * 100;
              const finalOpacity = dimmed && frame >= THREAT_FRAME ? 0.1 : itemIn * 0.8;
              return <div key={i} style={{ width: 80, height: 48, backgroundColor: COLORS.PRIMARY_DIM, border: `1px solid ${COLORS.BORDER_PRIMARY}`, opacity: finalOpacity }} />;
            })}
          </div>
        </div>
        {/* Center scan line */}
        <div style={{ width: 2, height: 400, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: `${scanProgress}%`, backgroundColor: COLORS.NEGATIVE, boxShadow: `0 0 12px ${COLORS.NEGATIVE_DIM}` }} />
        </div>
        {/* Right: threat result */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_16 }}>
          <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, opacity: labelIn, marginBottom: SPACING.PX_8 }}>필터 결과</span>
          {frame >= THREAT_FRAME && (() => {
            const resultIn = spring({ frame: Math.max(0, frame - THREAT_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });
            return (
              <div style={{ opacity: resultIn, transform: `scale(${interpolate(resultIn, [0, 1], [ANIMATION.SCALE_ENTER, 1])})` }}>
                <div style={{ width: 160, height: 72, backgroundColor: COLORS.NEGATIVE_DIM, border: `2px solid ${COLORS.NEGATIVE}`, boxShadow: `0 0 ${16 * threatPulse}px ${COLORS.NEGATIVE_DIM}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: COLORS.NEGATIVE, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: `${FONTS.TRACKING_WIDE}em` }}>위협 감지</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 16 기획안]
 * 원본 텍스트: 근데 이게 처음부터 잘 된 건 아니에요.
 * 단어 등장 타이밍: "근데": 2358f, "이게": 2375f, "처음부터": 2403f, "잘": 2430f, "된": 2439f, "건": 2448f, "아니에요.": 2457f
 * 비주얼 컨셉: 화면 전환 후 TIMELINE 형태의 수직 라인이 등장. 상단 "2017" 노드는 PRIMARY 색, 그 아래로 내려가는 라인이 "..." 점선으로 표시되며 "아직 진행 중"임을 암시. "처음부터" 단어에 "INITIAL PHASE" 레이블 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const INITIAL_FRAME = 45; // "처음부터" at 2403-2358

  const nodeIn = spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_SNAPPY });
  const lineGrow = interpolate(frame, [20, 120], [0, 280], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  const labelIn = spring({ frame: Math.max(0, frame - INITIAL_FRAME), fps, config: ANIMATION.SPRING_GENTLE });

  // Dotted segments
  const dotCount = 6;
  const dots = Array.from({ length: dotCount }, (_, i) => i);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ position: "relative", marginTop: 120 }}>
          {/* 2017 Node */}
          <div style={{ opacity: nodeIn, display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
            <div style={{ width: 12, height: 12, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
            <span style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY }}>2017</span>
          </div>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 5, top: 28, width: 2, height: lineGrow, backgroundColor: COLORS.BORDER_STRONG }} />
          {/* Dotted continuation */}
          <div style={{ position: "absolute", left: 2, top: 28 + lineGrow }}>
            {dots.map((i) => {
              const dotDelay = 100 + i * 8;
              const dotOp = interpolate(frame, [dotDelay, dotDelay + 15], [0, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return <div key={i} style={{ width: 8, height: 8, backgroundColor: COLORS.TEXT_DISABLED, opacity: dotOp, marginTop: 12 }} />;
            })}
          </div>
          {/* INITIAL PHASE label */}
          <div style={{ position: "absolute", left: 36, top: 100, opacity: labelIn, transform: `translateX(${interpolate(labelIn, [0, 1], [ANIMATION.ENTER_X_SM, 0])}px)` }}>
            <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>초기 단계</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 17 기획안]
 * 원본 텍스트: 처음엔 구글이 기술을 제공했어요.
 * 단어 등장 타이밍: "처음엔": 2503f, "구글이": 2530f, "기술을": 2560f, "제공했어요.": 2589f
 * 비주얼 컨셉: 수직 타임라인에 "2017" 노드 오른쪽으로 "Google" 텍스트 레이블이 연결 선과 함께 등장. BG_SURFACE 배경의 파트너사 카드 형태로 "TECHNOLOGY PROVIDER: Google" 표시. SECONDARY 색 테두리.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const GOOGLE_FRAME = 27; // "구글이" at 2530-2503

  const nodeIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const lineGrow = interpolate(frame, [10, 60], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  const cardIn = spring({ frame: Math.max(0, frame - GOOGLE_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ position: "relative", marginTop: 200 }}>
          {/* 2017 Node */}
          <div style={{ opacity: nodeIn, display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
            <div style={{ width: 12, height: 12, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
            <span style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY }}>2017</span>
          </div>
          {/* Horizontal connector */}
          <div style={{ position: "absolute", left: 210, top: 38, width: lineGrow, height: 2, backgroundColor: COLORS.SECONDARY }} />
          {/* Google card */}
          <div style={{ position: "absolute", left: 410, top: -40, opacity: cardIn, transform: `translateX(${interpolate(cardIn, [0, 1], [ANIMATION.ENTER_X_MD, 0])}px)` }}>
            <div style={{ padding: `${SPACING.PX_24}px ${SPACING.PX_32}px`, backgroundColor: COLORS.BG_SURFACE, border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.SECONDARY}`, minWidth: 280 }}>
              <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, marginBottom: SPACING.PX_12 }}>기술 제공사</div>
              <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, fontFamily: FONTS.DISPLAY }}>Google</div>
              <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, marginTop: SPACING.PX_8 }}>AI / Machine Learning</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 18 기획안]
 * 원본 텍스트: 근데 구글 직원들이 들고 일어났거든요.
 * 단어 등장 타이밍: "근데": 2651f, "구글": 2680f, "직원들이": 2690f, "들고": 2729f, "일어났거든요.": 2749f
 * 비주얼 컨셉: Google 파트너 카드 위에 WARNING 색 오버레이 flash. 카드 우측 상단에 "PROTEST" 상태 태그가 등장. 카드 테두리가 SECONDARY → WARNING 색으로 transition. 직원 반발을 프로세스 상태 변경으로 표현.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PROTEST_FRAME = 78; // "들고" at 2729-2651

  const cardIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  // Border color transition: SECONDARY -> WARNING
  const borderTransition = interpolate(frame, [PROTEST_FRAME, PROTEST_FRAME + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const warningFlash = interpolate(frame, [PROTEST_FRAME, PROTEST_FRAME + 6, PROTEST_FRAME + 18], [0, 0.15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagIn = spring({ frame: Math.max(0, frame - PROTEST_FRAME - 5), fps, config: ANIMATION.SPRING_SNAPPY });

  const borderColor = borderTransition > 0.5 ? COLORS.WARNING : COLORS.SECONDARY;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.WARNING, opacity: warningFlash, zIndex: Z.OVERLAY, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ opacity: cardIn, transform: `translateY(${interpolate(cardIn, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`, position: "relative" }}>
          <div style={{ padding: `${SPACING.PX_32}px ${SPACING.PX_40}px`, backgroundColor: COLORS.BG_SURFACE, border: `${SPACING.BORDER_THICK}px solid ${borderColor}`, minWidth: 340 }}>
            <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, marginBottom: SPACING.PX_12 }}>기술 제공사</div>
            <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, fontFamily: FONTS.DISPLAY }}>Google</div>
            <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, marginTop: SPACING.PX_8 }}>AI / Machine Learning</div>
          </div>
          {/* PROTEST tag */}
          {frame >= PROTEST_FRAME && (
            <div style={{ position: "absolute", top: -14, right: -10, opacity: tagIn, transform: `translateY(${interpolate(tagIn, [0, 1], [-8, 0])}px)`, padding: `${SPACING.PX_4}px ${SPACING.PX_16}px`, backgroundColor: COLORS.WARNING_DIM, border: `1px solid ${COLORS.WARNING}` }}>
              <span style={{ color: COLORS.WARNING, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>항의</span>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 19 기획안]
 * 원본 텍스트: "우리 AI를 전쟁에 쓴다고?
 * 단어 등장 타이밍: "\"우리": 2822f, "AI를": 2837f, "전쟁에": 2853f, "쓴다고?": 2882f
 * 비주얼 컨셉: GLASS_BG 인용문 패널 등장. 상단 PRIMARY 수직 바, 텍스트는 TEXT_MAIN, 따옴표 장식은 ACCENT 색. 인용문 배경에 WARNING_DIM 오버레이로 긴장감.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelIn = spring({ frame: Math.max(0, frame - 5), fps, config: ANIMATION.SPRING_SNAPPY });
  const warOverlay = interpolate(frame, [15, 40], [0, 0.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const words = [
    { text: "우리 AI를", f: 0 },
    { text: "전쟁에 쓴다고?", f: 31 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", zIndex: Z.CONTENT }}>
        <div style={{ marginLeft: SPACING.PX_96 }}>
          <QuotePanel startFrame={5} overlayOpacity={warOverlay}>
            <div style={{ 
              opacity: spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_GENTLE }),
              transform: `translateY(${interpolate(spring({ frame: Math.max(0, frame - 10), fps, config: ANIMATION.SPRING_GENTLE }), [0, 1], [10, 0])}px)`,
              color: COLORS.TEXT_MAIN, 
              fontSize: FONTS.SIZE_MD, 
              fontFamily: FONTS.PRIMARY, 
              fontWeight: FONTS.WEIGHT_MEDIUM, 
              lineHeight: FONTS.LEADING_NORMAL 
            }}>
              "우리 AI를 전쟁에 쓴다고?
            </div>
          </QuotePanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 20 기획안]
 * 원본 텍스트: 우리는 그거 동의 못 해."
 * 단어 등장 타이밍: "우리는": 2920f, "그거": 2958f, "동의": 2970f, "못": 2992f, "해.\"": 3018f
 * 비주얼 컨셉: 인용문 2행 추가 타이핑. "못" 단어 등장 시 하단에 강조 밑줄(NEGATIVE 색) 등장. 패널 하단에 "— Google Employees, 2018" 출처 레이블.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const CANT_FRAME = 72; // "못" at 2992-2920

  const sourceIn = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const underlineIn = spring({ frame: Math.max(0, frame - CANT_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", zIndex: Z.CONTENT }}>
        <div style={{ marginLeft: SPACING.PX_96 }}>
          <QuotePanel startFrame={-100} source="— Google 직원들, 2018" sourceOpacity={sourceIn}>
            <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_MD, fontFamily: FONTS.PRIMARY, fontWeight: FONTS.WEIGHT_MEDIUM, lineHeight: FONTS.LEADING_NORMAL }}>
              "우리 AI를 전쟁에 쓴다고?
            </div>
            <div style={{ position: "relative" }}>
              <span style={{ 
                opacity: spring({ frame: Math.max(0, frame - 15), fps, config: ANIMATION.SPRING_GENTLE }),
                transform: `translateY(${interpolate(spring({ frame: Math.max(0, frame - 15), fps, config: ANIMATION.SPRING_GENTLE }), [0, 1], [10, 0])}px)`,
                color: COLORS.TEXT_MAIN, 
                fontSize: FONTS.SIZE_MD, 
                fontFamily: FONTS.PRIMARY, 
                fontWeight: FONTS.WEIGHT_MEDIUM, 
                lineHeight: FONTS.LEADING_NORMAL,
                display: "inline-block"
              }}>
                우리는 그거 동의 못 해."
              </span>
              {/* Emphasis Underline */}
              <div style={{ 
                position: "absolute", 
                bottom: -4, 
                left: 0, 
                height: 4, 
                backgroundColor: COLORS.NEGATIVE, 
                width: `${underlineIn * 100}%`, 
                opacity: interpolate(underlineIn, [0, 0.2], [0, 1]) 
              }} />
            </div>
          </QuotePanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 21 기획안]
 * 원본 텍스트: 결국 구글은 2019년에 손을 떼고 나왔어요.
 * 단어 등장 타이밍: "결국": 3018f, "구글은": 3037f, "2019년에": 3067f, "손을": 3128f, "떼고": 3148f, "나왔어요.": 3164f
 * 비주얼 컨셉: 타임라인 수직 라인에 "2019" 노드 추가. "Google" 카드가 NEGATIVE_DIM 오버레이와 함께 fade-out 슬라이드 퇴장. "CONTRACT ENDED" 상태 태그가 카드 위에 남았다가 사라짐. 타임라인 노드에 빈 원형 표시(비참여 상태).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const YEAR_FRAME = 49; // "2019년에" at 3067-3018
  const EXIT_FRAME = 110; // "떼고" at 3148-3018

  const topNodeIn = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const lineGrow = interpolate(frame, [10, 80], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  const bottomNodeIn = spring({ frame: Math.max(0, frame - YEAR_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });
  // Card fade out
  const cardOpacity = interpolate(frame, [EXIT_FRAME, EXIT_FRAME + 40], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardSlide = interpolate(frame, [EXIT_FRAME, EXIT_FRAME + 40], [0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagIn = spring({ frame: Math.max(0, frame - EXIT_FRAME + 5), fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ position: "relative", marginTop: 120 }}>
          {/* 2017 Node */}
          <div style={{ opacity: topNodeIn, display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
            <div style={{ width: 12, height: 12, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
            <span style={{ color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD, fontFamily: FONTS.DISPLAY }}>2017</span>
          </div>
          {/* Vertical line mapping to 2019 */}
          <div style={{ position: "absolute", left: 5, top: 28, width: 2, height: lineGrow, backgroundColor: COLORS.BORDER_STRONG }} />
          {/* 2019 Node (Current focus point for exit) */}
          <div style={{ position: "absolute", left: 0, top: 28 + lineGrow, opacity: bottomNodeIn, display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
            <div style={{ width: 12, height: 12, border: `2px solid ${COLORS.PRIMARY}`, backgroundColor: "transparent", boxShadow: EFFECTS.GLOW_SM }} />
            <span style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY }}>2019</span>
          </div>
          {/* Horizontal connector from 2019 node to EXITING partner */}
          <div style={{ position: "absolute", left: 210, top: 28 + lineGrow + (64 / 2) - 1, width: 60, height: 2, backgroundColor: COLORS.NEGATIVE, opacity: bottomNodeIn }} />
          {/* Google card (fading out from 2019 node area) */}
          <div style={{ position: "absolute", left: 310, top: 28 + lineGrow - 20, opacity: cardOpacity, transform: `translateX(${cardSlide}px)` }}>
            <div style={{ padding: `${SPACING.PX_16}px ${SPACING.PX_24}px`, backgroundColor: COLORS.BG_SURFACE, border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.NEGATIVE}`, minWidth: 240, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.NEGATIVE_DIM, opacity: 0.2 }} />
              <div style={{ color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_XS, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, marginBottom: SPACING.PX_8, position: "relative" }}>제공사 명단</div>
              <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD, fontFamily: FONTS.DISPLAY, position: "relative" }}>Google</div>
              {/* CONTRACT ENDED tag */}
              <div style={{ opacity: tagIn, position: "relative", marginTop: SPACING.PX_12 }}>
                <span style={{ color: COLORS.NEGATIVE, fontSize: FONTS.SIZE_XS, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: `${FONTS.TRACKING_WIDE}em` }}>계약 종료</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 22 기획안]
 * 원본 텍스트: 그래도 프로젝트 메이븐은 멈추지 않았습니다.
 * 단어 등장 타이밍: "그래도": 3274f, "프로젝트": 3296f, "메이븐은": 3328f, "멈추지": 3359f, "않았습니다.": 3382f
 * 비주얼 컨셉: 타임라인 라인이 계속 아래로 연장되는 애니메이션. "PROJECT MAVEN" 텍스트가 우측에 유지되며 PRIMARY GLOW_SM 발광. "ACTIVE" 그린(SECONDARY) 상태 dot이 pulse.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene22: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineGrow = interpolate(frame, [0, 140], [200, 420], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  const textIn = spring({ frame: Math.max(0, frame - 20), fps, config: ANIMATION.SPRING_SNAPPY });
  // Pulsing active dot
  const dotPulse = interpolate(Math.sin((frame / 30) * Math.PI * 2), [-1, 1], [0.4, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ position: "relative", marginTop: 80 }}>
          {/* Timeline line extending */}
          <div style={{ position: "absolute", left: 5, top: 0, width: 2, height: lineGrow, backgroundColor: COLORS.BORDER_STRONG }} />
          {/* Active node at bottom */}
          <div style={{ position: "absolute", left: 0, top: lineGrow, display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
            <div style={{ width: 12, height: 12, backgroundColor: COLORS.SECONDARY, boxShadow: `0 0 ${12 * dotPulse}px ${COLORS.SECONDARY}`, opacity: dotPulse }} />
          </div>
          {/* PROJECT MAVEN label on right */}
          <div style={{ position: "absolute", left: 40, top: lineGrow - 8, opacity: textIn, transform: `translateX(${interpolate(textIn, [0, 1], [ANIMATION.ENTER_X_SM, 0])}px)` }}>
            <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, fontFamily: FONTS.DISPLAY, textShadow: EFFECTS.GLOW_TEXT_SM }}>PROJECT MAVEN</div>
            <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_8, marginTop: SPACING.PX_8 }}>
              <div style={{ width: 6, height: 6, backgroundColor: COLORS.SECONDARY, opacity: dotPulse }} />
              <span style={{ color: COLORS.SECONDARY, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>활성</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 23 기획안]
 * 원본 텍스트: 지금은 팔란티어라는 데이터 분석 회사가 핵심을 맡고 있어요.
 * 단어 등장 타이밍: "지금은": 3437f, "팔란티어라는": 3457f, "데이터": 3497f, "분석": 3518f, "회사가": 3530f, "핵심을": 3550f, "맡고": 3569f, "있어요.": 3583f
 * 비주얼 컨셉: 구글 카드가 사라진 자리에 "Palantir" 카드가 PRIMARY 테두리(BORDER_PRIMARY)로 등장. 카드 내부: "CORE PROVIDER", "DATA ANALYTICS" 레이블. 카드 우측에 "ACTIVE" 상태 배지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene23: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PALANTIR_FRAME = 20; // "팔란티어라는" at 3457-3437

  const cardIn = spring({ frame: Math.max(0, frame - PALANTIR_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });
  const dotPulse = interpolate(Math.sin((frame / 30) * Math.PI * 2), [-1, 1], [0.4, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", justifyContent: "center", zIndex: Z.CONTENT }}>
        <div style={{ opacity: cardIn, transform: `translateY(${interpolate(cardIn, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`, display: "flex", alignItems: "center", gap: SPACING.PX_24 }}>
          <div style={{ padding: `${SPACING.PX_32}px ${SPACING.PX_40}px`, backgroundColor: COLORS.BG_SURFACE, border: `${SPACING.BORDER_THICK}px solid ${COLORS.BORDER_PRIMARY}`, minWidth: 340 }}>
            <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, marginBottom: SPACING.PX_12 }}>핵심 제공사</div>
            <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_BOLD, fontFamily: FONTS.DISPLAY }}>Palantir</div>
            <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, marginTop: SPACING.PX_8 }}>데이터 분석</div>
          </div>
          {/* ACTIVE badge */}
          <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_8, padding: `${SPACING.PX_8}px ${SPACING.PX_16}px`, border: `1px solid ${COLORS.SECONDARY}`, backgroundColor: COLORS.SECONDARY_DIM }}>
            <div style={{ width: 6, height: 6, backgroundColor: COLORS.SECONDARY, opacity: dotPulse, boxShadow: `0 0 8px ${COLORS.SECONDARY}` }} />
            <span style={{ color: COLORS.SECONDARY, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>활성</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 24 기획안]
 * 원본 텍스트: AWS, 마이크로소프트 포함해서 10개 회사가 같이 붙어 있고요.
 * 단어 등장 타이밍: "AWS,": 3620f, "마이크로소프트": 3635f, "포함해서": 3706f, "10개": 3741f, "회사가": 3770f, "같이": 3799f, "붙어": 3818f, "있고요.": 3880f
 * 비주얼 컨셉: Palantir 카드 주변으로 "AWS", "Microsoft" 레이블 소형 카드가 STAGGER_MD 간격으로 순차 등장. "10개" 단어 등장 시 카운터 ["1", "2", ... "10"] 회사가 grid 배열로 표시. 나머지는 점 placeholder로 표현.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene24: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const TEN_FRAME = 121; // "10개" at 3741-3620

  const companies = [
    { name: "Palantir", color: COLORS.BORDER_PRIMARY },
    { name: "AWS", color: COLORS.BORDER },
    { name: "Microsoft", color: COLORS.BORDER },
    { name: "", color: COLORS.BORDER },
    { name: "", color: COLORS.BORDER },
    { name: "", color: COLORS.BORDER },
    { name: "", color: COLORS.BORDER },
    { name: "", color: COLORS.BORDER },
    { name: "", color: COLORS.BORDER },
    { name: "", color: COLORS.BORDER },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_32, zIndex: Z.CONTENT }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: SPACING.PX_12, marginBottom: 20 }}>
          {companies.map((c, i) => {
            const delay = i < 3 ? i * ANIMATION.STAGGER_MD : TEN_FRAME + (i - 3) * ANIMATION.STAGGER_SM;
            const itemIn = spring({ frame: Math.max(0, frame - delay), fps, config: ANIMATION.SPRING_SNAPPY });
            return (
              <div key={i} style={{ opacity: itemIn, transform: `scale(${interpolate(itemIn, [0, 1], [ANIMATION.SCALE_ENTER, 1])})`, width: 180, height: 80, backgroundColor: COLORS.BG_HOVER, border: `1px solid ${c.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {c.name ? (
                  <span style={{ color: i === 0 ? COLORS.PRIMARY : COLORS.TEXT_BODY, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, fontWeight: i === 0 ? FONTS.WEIGHT_BOLD : FONTS.WEIGHT_MEDIUM }}>{c.name}</span>
                ) : (
                  <div style={{ width: 6, height: 6, backgroundColor: COLORS.TEXT_DISABLED }} />
                )}
              </div>
            );
          })}
        </div>
        <span style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em` }}>10개 협력사</span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 25 기획안]
 * 원본 텍스트: 규모가 어느 정도냐면요
 * 단어 등장 타이밍: "규모가": 3880f, "어느": 3928f, "정도냐면요,": 3931f
 * 비주얼 컨셉: 화면 전환 + "SCALE" 레이블 TEXT_MUTED SIZE_SM으로 왼→오른 slide-in. 배경에 수직 스케일 눈금선이 서서히 등장하며 다음 씬(계약 규모 공개)의 빌드업.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene25: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelIn = spring({ frame: Math.max(0, frame - 5), fps, config: ANIMATION.SPRING_SNAPPY });
  // Vertical ruler marks
  const marks = Array.from({ length: 8 }, (_, i) => i);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Background ruler lines */}
      <div style={{ position: "absolute", right: 160, top: 120, bottom: 230, zIndex: Z.BG }}>
        {marks.map((i) => {
          const markDelay = 15 + i * 8;
          const markOp = interpolate(frame, [markDelay, markDelay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = i * 80;
          return (
            <div key={i} style={{ position: "absolute", right: 0, top: y, display: "flex", alignItems: "center", gap: 12, opacity: markOp }}>
              <span style={{ color: COLORS.TEXT_MUTED, fontSize: 16, fontFamily: FONTS.MONO, fontWeight: FONTS.WEIGHT_BOLD }}>{(i + 1) * 10}</span>
              <div style={{ width: 32, height: 2, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
            </div>
          );
        })}
        {/* Vertical line with growth animation */}
        <div style={{ position: "absolute", right: 0, top: 0, width: 2, height: interpolate(frame, [10, 100], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), backgroundColor: COLORS.PRIMARY, opacity: 0.8, boxShadow: EFFECTS.GLOW_SM }} />
      </div>
      {/* SCALE label */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", alignItems: "center", zIndex: Z.CONTENT }}>
        <div style={{ marginLeft: SPACING.PX_96, opacity: labelIn, transform: `translateX(${interpolate(labelIn, [0, 1], [ANIMATION.ENTER_X_MD, 0])}px)` }}>
          <div style={{ color: COLORS.PRIMARY, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY, letterSpacing: `${FONTS.TRACKING_WIDER}em`, textShadow: EFFECTS.GLOW_TEXT_SM }}>규모</div>
          <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, marginTop: SPACING.PX_8 }}>SCALE BUILDUP</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 26 기획안]
 * 원본 텍스트: 팔란티어 혼자 미 국방부와 맺은 계약 규모가 최대 100억 달러
 * 단어 등장 타이밍: "팔란티어": 3997f, "혼자": 4029f, "미": 4045f, "국방부와": 4053f, "맺은": 4088f, "계약": 4100f, "규모가": 4115f, "최대": 4139f, "100억": 4156f, "달러,": 4191f
 * 비주얼 컨셉: 중앙에 "$10B" 숫자가 SIZE_4XL WEIGHT_EXTRABOLD GLOW_LG 효과로 counter up 애니메이션으로 등장. "100억" 단어 등장 시 최종값 정지. 배경에 PRIMARY_DIM 방사형 glow. 아래에 "MAX CONTRACT VALUE — Palantir × DOD" 소형 레이블.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene26: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const HUNDRED_FRAME = 159; // "100억" at 4156-3997

  const bgGlow = interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const counterValue = interpolate(frame, [30, HUNDRED_FRAME], [0, 10], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(...ANIMATION.EASE_OUT) });
  const numIn = spring({ frame: Math.max(0, frame - 20), fps, config: ANIMATION.SPRING_HEAVY });
  const labelIn = spring({ frame: Math.max(0, frame - 60), fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      {/* Radial glow */}
      <div style={{ position: "absolute", inset: 0, background: EFFECTS.RADIAL_PRIMARY, opacity: bgGlow * 0.6, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_24, zIndex: Z.CONTENT }}>
        <div style={{ opacity: numIn, transform: `scale(${interpolate(numIn, [0, 1], [ANIMATION.SCALE_ENTER, 1])})`, color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_4XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY, textShadow: EFFECTS.GLOW_TEXT_LG, fontVariantNumeric: "tabular-nums" }}>
          ${counterValue.toFixed(0)}B
        </div>
        <div style={{ opacity: labelIn, color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, textAlign: "center" }}>
          최대 계약 규모 — Palantir × DOD
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 27 기획안]
 * 원본 텍스트: 우리 돈으로 약 13조 원 수준이에요.
 * 단어 등장 타이밍: "우리": 4220f, "돈으로": 4246f, "약": 4264f, "13조": 4272f, "원": 4302f, "수준이에요.": 4306f
 * 비주얼 컨셉: "$10B" 숫자 아래에 "≈ ₩13조" 환산값이 TEXT_MUTED SIZE_LG로 slide-in. 좌측에 환율 변환 방향 화살표(→) 라인. 단순하고 임팩트 있는 숫자 대비 표현.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene27: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const KRW_FRAME = 52; // "13조" at 4272-4220

  const bgGlow = 0.5;
  const krwIn = spring({ frame: Math.max(0, frame - KRW_FRAME), fps, config: ANIMATION.SPRING_SNAPPY });
  const arrowIn = spring({ frame: Math.max(0, frame - KRW_FRAME - 10), fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <div style={{ position: "absolute", inset: 0, background: EFFECTS.RADIAL_PRIMARY, opacity: bgGlow, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: SPACING.PX_16, zIndex: Z.CONTENT }}>
        {/* $10B maintained */}
        <div style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_4XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY, textShadow: EFFECTS.GLOW_TEXT_LG }}>$10B</div>
        {/* Arrow + KRW conversion
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_16, opacity: arrowIn }}>
          <div style={{ width: 40, height: 2, backgroundColor: COLORS.TEXT_DISABLED }} />
          <span style={{ color: COLORS.TEXT_DISABLED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO }}>→</span>
        </div> */}
        <div style={{ opacity: krwIn, transform: `translateY(${interpolate(krwIn, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`, color: COLORS.TEXT_BODY, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_BOLD, fontFamily: FONTS.DISPLAY }}>
          ≈ ₩13조
        </div>
        <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_SM, fontFamily: FONTS.MONO, letterSpacing: `${FONTS.TRACKING_WIDER}em`, marginTop: SPACING.PX_8 }}>
          최대 계약 규모 — Palantir × DOD
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 28 기획안]
 * 원본 텍스트: 이게 장난이 아닌 거죠.
 * 단어 등장 타이밍: "이게": 4358f, "장난이": 4390f, "아닌": 4402f, "거죠.": 4418f
 * 비주얼 컨셉: 숫자들이 유지되며 배경 전체에 PRIMARY_DIM 오버레이가 서서히 밝아짐. "이게 장난이 아닌 거죠." 텍스트가 화면 하단 1/3 영역에 SIZE_XL WEIGHT_BOLD TEXT_MAIN으로 fade-in. 마지막 단어에서 화면 우측 하단에 PRIMARY 색 점(dot)이 3회 pulse 후 정지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene28: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const FINAL_FRAME = 60; // "거죀" at 4418-4358

  const bgBrighten = interpolate(frame, [0, 80], [0, 0.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textIn = spring({ frame: Math.max(0, frame - 15), fps, config: ANIMATION.SPRING_GENTLE });
  // 3 pulses then stop
  const dotPulseRaw = frame >= FINAL_FRAME ? Math.sin(((frame - FINAL_FRAME) / 12) * Math.PI * 2) : 0;
  const dotPulse = frame >= FINAL_FRAME && frame < FINAL_FRAME + 72 ? interpolate(dotPulseRaw, [-1, 1], [0.2, 1]) : frame >= FINAL_FRAME + 72 ? 1 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.PRIMARY_DIM, opacity: bgBrighten, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 150, zIndex: Z.CONTENT }}>
        {/* Numbers faded in background */}
        <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: 0.15 }}>
          <span style={{ color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_3XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY }}>$10B</span>
        </div>
        {/* Statement text lower third */}
        <div style={{ position: "absolute", bottom: 80, left: SPACING.PX_96, right: SPACING.PX_96, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [ANIMATION.ENTER_Y_SM, 0])}px)`, color: COLORS.TEXT_MAIN, fontSize: FONTS.SIZE_XL, fontWeight: FONTS.WEIGHT_BOLD, fontFamily: FONTS.PRIMARY }}>
            이게 장난이 아닌 거죠.
          </div>
          {/* Pulsing dot */}
          <div style={{ width: 10, height: 10, backgroundColor: COLORS.PRIMARY, opacity: dotPulse, boxShadow: `0 0 ${16 * dotPulse}px ${COLORS.PRIMARY_GLOW}` }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={117}>
        <Scene1 />
      </Sequence>
      <Sequence from={117} durationInFrames={142}>
        <Scene2 />
      </Sequence>
      <Sequence from={259} durationInFrames={142}>
        <Scene3 />
      </Sequence>
      <Sequence from={401} durationInFrames={95}>
        <Scene4 />
      </Sequence>
      <Sequence from={496} durationInFrames={78}>
        <Scene5 />
      </Sequence>
      <Sequence from={574} durationInFrames={312}>
        <Scene6 />
      </Sequence>
      <Sequence from={886} durationInFrames={271}>
        <Scene7 />
      </Sequence>
      <Sequence from={1157} durationInFrames={152}>
        <Scene8 />
      </Sequence>
      <Sequence from={1309} durationInFrames={165}>
        <Scene9 />
      </Sequence>
      <Sequence from={1474} durationInFrames={145}>
        <Scene10 />
      </Sequence>
      <Sequence from={1619} durationInFrames={68}>
        <Scene11 />
      </Sequence>
      <Sequence from={1687} durationInFrames={156}>
        <Scene12 />
      </Sequence>
      <Sequence from={1843} durationInFrames={239}>
        <Scene13 />
      </Sequence>
      <Sequence from={2082} durationInFrames={276}>
        <Scene14 />
      </Sequence>
      <Sequence from={2358} durationInFrames={145}>
        <Scene16 />
      </Sequence>
      <Sequence from={2503} durationInFrames={148}>
        <Scene17 />
      </Sequence>
      <Sequence from={2651} durationInFrames={171}>
        <Scene18 />
      </Sequence>
      <Sequence from={2822} durationInFrames={98}>
        <Scene19 />
      </Sequence>
      <Sequence from={2920} durationInFrames={98}>
        <Scene20 />
      </Sequence>
      <Sequence from={3018} durationInFrames={256}>
        <Scene21 />
      </Sequence>
      <Sequence from={3274} durationInFrames={163}>
        <Scene22 />
      </Sequence>
      <Sequence from={3437} durationInFrames={183}>
        <Scene23 />
      </Sequence>
      <Sequence from={3620} durationInFrames={377}>
        <Scene24 />
      </Sequence>
      {/* <Sequence from={3880} durationInFrames={117}>
        <Scene25 />
      </Sequence> */}
      <Sequence from={3997} durationInFrames={223}>
        <Scene26 />
      </Sequence>
      <Sequence from={4220} durationInFrames={256}>
        <Scene27 />
      </Sequence>
      {/* <Sequence from={4358} durationInFrames={118}>
        <Scene28 />
      </Sequence> */}
    </AbsoluteFill>
  );
};
