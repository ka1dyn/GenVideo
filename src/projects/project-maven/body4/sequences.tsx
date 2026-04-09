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

const VBar: React.FC<{ label: string; value: number; color: string; delay: number; frame: number; isCracked?: boolean; crackFrame?: number }> = ({ label, value, color, delay, frame, isCracked = false, crackFrame = 0 }) => {
  const fps = 60;
  const progress = spring({ frame: frame - delay, fps, config: ANIMATION.SPRING_SNAPPY });
  const currentHeight = interpolate(progress, [0, 1], [0, value]);
  
  const crackProgress = isCracked ? spring({ frame: frame - crackFrame, fps, config: ANIMATION.SPRING_BOUNCY }) : 0;
  const finalHeight = isCracked ? interpolate(crackProgress, [0, 1], [value, 60]) : currentHeight;
  
  const barColor = isCracked ? interpolateColors(crackProgress, [0, 1], [color, COLORS.STATE_ERROR_FG]) : color;
  const shadow = isCracked ? (crackProgress > 0 ? EFFECTS.SHADOW_PRIMARY : "none") : "none";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_16 }}>
      <div style={{ height: 240, width: 48, backgroundColor: COLORS.BG_MUTED, borderRadius: SPACING.RADIUS_MD, display: "flex", alignItems: "flex-end", overflow: "hidden", position: "relative", border: `2px solid ${COLORS.STROKE_DEFAULT}` }}>
        <div style={{ width: "100%", height: `${finalHeight}%`, backgroundColor: barColor }} />
        {isCracked && crackProgress > 0 && (
          <div style={{ position: "absolute", bottom: `${finalHeight}%`, left: 0, width: "100%", height: 3, backgroundColor: COLORS.STATE_ERROR_FG, zIndex: 10, opacity: crackProgress }} />
        )}
      </div>
      <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_SEMIBOLD }}>{label}</div>
    </div>
  );
};

const HBar: React.FC<{ label: string; value: number; color: string; delay: number; frame: number; showValue?: boolean; pulsingQuestion?: boolean }> = ({ label, value, color, delay, frame, showValue = true, pulsingQuestion = false }) => {
  const fps = 60;
  const progress = spring({ frame: frame - delay, fps, config: ANIMATION.SPRING_SNAPPY });
  const currentWidth = interpolate(progress, [0, 1], [0, value]);
  
  const pulse = Math.sin(frame / 5) * 0.5 + 0.5;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_32, width: 800 }}>
      <div style={{ width: 140, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD, textAlign: "right", letterSpacing: FONTS.TRACKING_WIDER }}>
        [{label}]
      </div>
      <div style={{ flex: 1, height: 24, backgroundColor: COLORS.BG_MUTED, borderRadius: SPACING.RADIUS_MD, overflow: "hidden", border: `2px solid ${COLORS.STROKE_DEFAULT}` }}>
        <div style={{ width: `${currentWidth}%`, height: "100%", backgroundColor: color }} />
      </div>
      <div style={{ width: 100, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: showValue ? color : COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_BOLD }}>
        {showValue ? `${Math.round(currentWidth)}%` : pulsingQuestion ? <span style={{ opacity: pulse }}>?</span> : ""}
      </div>
    </div>
  );
};

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 자, 그런데 여기서 솔직한 얘기 하나 하고 넘어갈게요.
 * 단어 등장 타이밍: "자,": 0f, "그런데": 22f, "여기서": 36f, "솔직한": 53f, "얘기": 75f, "하나": 91f, "하고": 105f, "넘어갈게요.": 120f
 * 비주얼 컨셉: BG_BASE 배경. 화면 상단에 "BUT..." 레이블이 TEXT_MUTED TRACKING_WIDER로 fade-in. 중앙에 수평선 한 줄(BORDER 색)이 left→right로 draw되며 "전환점"을 시각화. "솔직한 얘기" 단어부터 수평선에 WARNING 색 dot이 등장하며 주의 환기.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const butOpacity = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const lineWidth = spring({ frame: frame - 22, fps, config: ANIMATION.SPRING_SNAPPY });
  const dotOpacity = spring({ frame: frame - 53, fps, config: ANIMATION.SPRING_BOUNCY });
  const dotScale = interpolate(dotOpacity, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 120, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, opacity: butOpacity, fontWeight: FONTS.WEIGHT_BOLD }}>
        하지만...
      </div>
      <div style={{ width: "60%", height: 4, backgroundColor: COLORS.STROKE_STRONG, display: "flex", alignItems: "center", justifyContent: "center", transform: `scaleX(${lineWidth})` }}>
        <div style={{ width: 24, height: 24, backgroundColor: COLORS.STATE_WARN_FG, borderRadius: "50%", opacity: dotOpacity, transform: `scale(${dotScale})`, boxShadow: EFFECTS.SHADOW_PRIMARY }} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 메이븐이 엄청 대단해 보이죠?
 * 단어 등장 타이밍: "메이븐이": 170f, "엄청": 222f, "대단해": 231f, "보이죠?": 262f
 * 비주얼 컨셉: 중앙에 "PROJECT MAVEN" 텍스트가 PRIMARY GLOW_MD 효과로 등장. 아래에 별점 형태 대신 수직 프로그레스 바 3개(속도/정확도/범위)가 높게 채워진 상태로 stagger 등장. 인상적인 시스템 느낌.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const textOpacity = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const textY = interpolate(textOpacity, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_64, top: -40, position: "relative" }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 120, fontWeight: FONTS.WEIGHT_EXTRABOLD, color: COLORS.PRIMARY, opacity: textOpacity, transform: `translateY(${textY}px)`}}>
          프로젝트 메이븐
        </div>
        <div style={{ display: "flex", gap: SPACING.PX_80 }}>
          <VBar label="속도" value={95} color={COLORS.PRIMARY} delay={30} frame={frame} />
          <VBar label="정확도" value={90} color={COLORS.PRIMARY} delay={45} frame={frame} />
          <VBar label="범위" value={85} color={COLORS.PRIMARY} delay={60} frame={frame} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 근데 허점도 있습니다.
 * 단어 등장 타이밍: "근데": 306f, "허점도": 337f, "있습니다.": 358f
 * 비주얼 컨셉: 프로그레스 바 중 "정확도" 막대에 빨간 crack 선이 생기며 내부 값이 낮아짐. "허점도" 단어에서 NEGATIVE 색 [FLAW DETECTED] 레이블이 우측에 fade-in. 균열 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const labelOpacity = spring({ frame: frame - 31, fps, config: ANIMATION.SPRING_GENTLE });
  const labelX = interpolate(labelOpacity, [0, 1], [-20, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_64, top: -40, position: "relative" }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 120, fontWeight: FONTS.WEIGHT_EXTRABOLD, color: COLORS.PRIMARY }}>
          프로젝트 메이븐
        </div>
        <div style={{ display: "flex", gap: SPACING.PX_80, position: "relative" }}>
          <VBar label="속도" value={95} color={COLORS.PRIMARY} delay={0} frame={999} />
          <VBar label="정확도" value={90} color={COLORS.PRIMARY} delay={0} frame={frame} isCracked crackFrame={31} />
          <VBar label="범위" value={85} color={COLORS.PRIMARY} delay={0} frame={999} />
          
          <div style={{ position: "absolute", top: 100, right: -240, display: "flex", alignItems: "center", gap: SPACING.PX_12, opacity: labelOpacity, transform: `translateX(${labelX}px)` }}>
             <div style={{ width: 16, height: 16, backgroundColor: COLORS.STATE_ERROR_FG, borderRadius: "50%", boxShadow: EFFECTS.SHADOW_PRIMARY }} />
             <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_BOLD }}>
               [결함 감지]
             </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 중동 사막 환경에서 실험했을 때예요.
 * 단어 등장 타이밍: "중동": 412f, "사막": 459f, "환경에서": 491f, "실험했을": 526f, "때예요.": 568f
 * 비주얼 컨셉: 화면 상단에 지역 레이블 "MIDDLE EAST · DESERT ENV." 가 TEXT_MUTED TRACKING_WIDE로 등장. 배경에 BG_ELEVATED 색의 거친 수평 줄무늬 패턴(사막 모래 추상). "실험했을" 단어에 "TEST CONDITIONS" 배지 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  const topTextOpacity = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const bgOpacity = spring({ frame: frame - 15, fps, config: ANIMATION.SPRING_GENTLE });
  const badgeOpacity = spring({ frame: frame - 114, fps, config: ANIMATION.SPRING_SNAPPY });
  const badgeScale = interpolate(badgeOpacity, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, opacity: bgOpacity, background: `repeating-linear-gradient(0deg, transparent, transparent 10px, ${COLORS.BG_MUTED} 10px, ${COLORS.BG_MUTED} 12px)` }} />
      
      <div style={{ position: "absolute", top: 120, fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, opacity: topTextOpacity }}>
        중동 · 사막 환경
      </div>
      
      <div style={{ 
        opacity: badgeOpacity, 
        transform: `scale(${badgeScale})`, 
        padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`, 
        border: `2px solid ${COLORS.STROKE_STRONG}`, 
        borderRadius: SPACING.RADIUS_MD, 
        backgroundColor: COLORS.BG_SURFACE,
        fontFamily: FONTS.DISPLAY, 
        fontSize: FONTS.SIZE_LG, 
        color: COLORS.TEXT_MAIN, 
        fontWeight: FONTS.WEIGHT_BOLD 
      }}>
        실험 조건
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 사람은 84% 확률로 맞는 판단을 했는데, 메이븐은요?
 * 단어 등장 타이밍: "사람은": 568f, "84%": 611f, "확률로": 628f, "맞는": 661f, "판단을": 684f, "했는데,": 718f, "메이븐은요?": 755f
 * 비주얼 컨셉: 좌우 비교 UI. 좌: [HUMAN] 가로 프로그레스 바 84% 채워짐(SECONDARY 색). 우: [MAVEN] 텍스트 레이블만 있고 프로그레스 바 비어있는 상태 + "?" pulse 애니메이션. "84%" 숫자 등장 시 좌측 바 최종값 정지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const uiOpacity = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_48, opacity: uiOpacity }}>
        <HBar label="사람" value={84} color={COLORS.PRIMARY} delay={43} frame={frame} />
        <HBar label="메이븐" value={0} color={COLORS.STATE_WARN_FG} delay={0} frame={frame} showValue={false} pulsingQuestion={true} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 60% 였어요.
 * 단어 등장 타이밍: "60%": 825f, "였어요.": 854f
 * 비주얼 컨셉: 우측 [MAVEN] 프로그레스 바가 60%까지만 채워지며 정지(NEGATIVE 색). 84% 기준선과의 갭이 시각적으로 명확하게 대비. 갭 영역에 NEGATIVE_DIM 오버레이. 수치 임팩트.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const gapOpacity = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_48 }}>
        <HBar label="사람" value={84} color={COLORS.PRIMARY} delay={-999} frame={999} />
        <div style={{ position: "relative" }}>
          <HBar label="메이븐" value={60} color={COLORS.STATE_ERROR_FG} delay={0} frame={frame} />
          
          <div style={{ position: "absolute", left: 140 + 32 + 516 * 0.6, width: 516 * 0.24, height: 28, top: -2, backgroundColor: COLORS.STATE_ERROR_BG, border: `2px dashed ${COLORS.STATE_ERROR_FG}`, opacity: gapOpacity, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ position: "absolute", top: -36, fontFamily: FONTS.DISPLAY, fontSize: 24, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_BOLD }}>격차</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 왜냐면 AI가 트럭이랑 나무를, 계곡이랑 장갑차를 혼동했거든요.
 * 단어 등장 타이밍: "왜냐면": 905f, "AI가": 947f, "트럭이랑": 967f, "나무를,": 1019f, "계곡이랑": 1067f, "장갑차를": 1099f, "혼동했거든요.": 1133f
 * 비주얼 컨셉: 화면을 2행 구조로: 상행 [A] vs [B] 쌍 / 하행 [C] vs [D] 쌍. "트럭이랑 나무" 단어에 상행 두 레이블 텍스트 박스 등장, 사이에 "≈ ?" 혼동 기호. "계곡이랑 장갑차" 단어에 하행 두 박스 등장. "혼동했거든요." 단어에 각 쌍 사이에 NEGATIVE 색 "≈" 등호 pulse.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const PairBox: React.FC<{ left: string; right: string; delay: number; pulseDelay: number; frame: number }> = ({ left, right, delay, pulseDelay, frame }) => {
  const fps = 60;
  const enter = spring({ frame: frame - delay, fps, config: ANIMATION.SPRING_SNAPPY });
  const pulseScale = spring({ frame: frame - pulseDelay, fps, config: ANIMATION.SPRING_BOUNCY });
  const isPulsing = frame >= pulseDelay;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_40, opacity: enter, transform: `translateY(${(1-enter)*20}px)` }}>
      <div style={{ width: 200, height: 100, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_MAIN, borderRadius: SPACING.RADIUS_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
        {left}
      </div>
      <div style={{ width: 80, textAlign: "center", fontFamily: FONTS.DISPLAY, fontSize: 64, color: isPulsing ? COLORS.STATE_ERROR_FG : COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_BOLD, transform: `scale(${isPulsing ? 1 + pulseScale * 0.2 : 1})`, textShadow: isPulsing ? EFFECTS.SHADOW_PRIMARY : "none" }}>
        {isPulsing ? "≈" : "≈ ?"}
      </div>
      <div style={{ width: 200, height: 100, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_MAIN, borderRadius: SPACING.RADIUS_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
        {right}
      </div>
    </div>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 왜냐면 AI가 트럭이랑 나무를, 계곡이랑 장갑차를 혼동했거든요.
 * 단어 등장 타이밍: "왜냐면": 905f, "AI가": 947f, "트럭이랑": 967f, "나무를,": 1019f, "계곡이랑": 1067f, "장갑차를": 1099f, "혼동했거든요.": 1133f
 * 비주얼 컨셉: 화면을 2행 구조로: 상행 [A] vs [B] 쌍 / 하행 [C] vs [D] 쌍. "트럭이랑 나무" 단어에 상행 두 레이블 텍스트 박스 등장, 사이에 "≈ ?" 혼동 기호. "계곡이랑 장갑차" 단어에 하행 두 박스 등장. "혼동했거든요." 단어에 각 쌍 사이에 NEGATIVE 색 "≈" 등호 pulse.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_64 }}>
        <PairBox left="트럭" right="나무" delay={62} pulseDelay={228} frame={frame} />
        <PairBox left="계곡" right="장갑차" delay={162} pulseDelay={228} frame={frame} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 사람 눈엔 당연히 다른데, AI한테는 "비슷하게 생긴 물체"인 거예요.
 * 단어 등장 타이밍: "사람": 1189f, "눈엔": 1211f, "당연히": 1241f, "다른데,": 1274f, "AI한테는": 1314f, "\"비슷하게": 1349f, "생긴": 1387f, "물체\"인": 1406f, "거예요.": 1435f
 * 비주얼 컨셉: 화면 좌우 분할: 좌 [HUMAN PERCEPTION] 영역에서 두 물체 박스 → "≠" 기호 (명확한 구분). 우 [AI PERCEPTION] 영역에서 같은 두 물체 박스 → "≈" 기호 (유사 인식). "다른데," 단어에 좌측 ≠ PRIMARY 색 강조, "비슷하게" 단어에 우측 ≈ WARNING 색 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const leftPulse = spring({ frame: frame - 85, fps, config: ANIMATION.SPRING_BOUNCY });
  const rightPulse = spring({ frame: frame - 160, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 120 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32 }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>사람의 인식</div>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_24 }}>
             <div style={{ width: 120, height: 120, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD }} />
             <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 64, color: leftPulse > 0 ? COLORS.PRIMARY : COLORS.TEXT_SUB, transform: `scale(${1 + leftPulse * 0.2})`, textShadow: leftPulse > 0 ? EFFECTS.SHADOW_PRIMARY : "none", fontWeight: FONTS.WEIGHT_BOLD }}>≠</div>
             <div style={{ width: 120, height: 120, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: "50%" }} />
          </div>
        </div>
        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32 }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.STATE_WARN_FG, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>AI의 인식</div>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_24 }}>
             <div style={{ width: 120, height: 120, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD }} />
             <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 64, color: rightPulse > 0 ? COLORS.STATE_WARN_FG : COLORS.TEXT_SUB, transform: `scale(${1 + rightPulse * 0.2})`, textShadow: rightPulse > 0 ? EFFECTS.SHADOW_PRIMARY : "none", fontWeight: FONTS.WEIGHT_BOLD }}>≈</div>
             <div style={{ width: 120, height: 120, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: "50%" }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 군 관계자도 인정했어요.
 * 단어 등장 타이밍: "군": 1476f, "관계자도": 1486f, "인정했어요.": 1530f
 * 비주얼 컨셉: 인용 패널 등장 준비. 상단 레이블 "U.S. MILITARY OFFICIAL — Acknowledged". 패널 내부 cursor blink 대기. 공식 인정 출처 UI.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  const enter = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const cursorOpacity = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 800, padding: SPACING.PX_40, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_LG, opacity: enter, transform: `translateY(${(1-enter)*40}px)` }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_32, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, backgroundColor: COLORS.STROKE_STRONG, borderRadius: "50%" }} />
          미군 관계자 — 공식 인정
        </div>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_MAIN, lineHeight: FONTS.LEADING_NORMAL }}>
          <span style={{ opacity: cursorOpacity, color: COLORS.PRIMARY }}>|</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 메이븐의 장점은 어디까지나 속도다.
 * 단어 등장 타이밍: "\"메이븐의": 1600f, "장점은": 1633f, "어디까지나": 1658f, "속도다.": 1699f
 * 비주얼 컨셉: 인용 패널 내부에 타이핑 등장. "속도다." 단어에서 "SPEED" 단어가 PRIMARY 색 강조. 오른쪽에 프로그레스 바 "속도" 부분만 PRIMARY 색 100% 채워진 상태.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const text1 = "메이븐의 장점은 어디까지나 ";
  const text2 = "속도다.";
  const showText1Length = Math.max(0, Math.min(text1.length, Math.floor(frame / 2)));
  const showText2 = frame >= 99;
  
  const barProgress = spring({ frame: frame - 15, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: SPACING.PX_80, alignItems: "center" }}>
        <div style={{ width: 600, padding: SPACING.PX_40, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_LG }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_32, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 12, height: 12, backgroundColor: COLORS.STROKE_STRONG, borderRadius: "50%" }} />
            미군 관계자 — 공식 인정
          </div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_MAIN, lineHeight: FONTS.LEADING_NORMAL }}>
            {text1.substring(0, showText1Length)}
            {showText2 ? <span style={{ color: COLORS.PRIMARY, textShadow: EFFECTS.SHADOW_PRIMARY }}>{text2}</span> : null}
            <span style={{ opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0, color: COLORS.PRIMARY }}>|</span>
          </div>
        </div>
        
        {/* Right Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_32, opacity: barProgress, transform: `translateX(${(1-barProgress)*20}px)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_24 }}>
             <div style={{ width: 120, textAlign: "right", fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_BOLD }}>속도</div>
             <div style={{ width: 300, height: 16, backgroundColor: COLORS.BG_MUTED, borderRadius: 8, position: "relative", overflow: "hidden", border: `2px solid ${COLORS.STROKE_DEFAULT}` }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100%", backgroundColor: COLORS.PRIMARY }} />
             </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 전술적 판단 수준엔 아직 못 미친다.
 * 단어 등장 타이밍: "전술적": 1764f, "판단": 1804f, "수준엔": 1815f, "아직": 1846f, "못": 1866f, "미친다.\"": 1876f
 * 비주얼 컨셉: 인용 패널 하단에 두 번째 문장 타이핑. "TACTICAL JUDGMENT" 항목은 프로그레스 바가 60%에서 멈춘 상태(NEGATIVE 색)와 경계선 표시. "못" 단어에서 해당 바에 X 마킹.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const text3 = "전술적 판단 수준엔 아직 ";
  const text4 = "못 미친다.";
  const showText3Length = Math.max(0, Math.min(text3.length, Math.floor(frame / 2)));
  const showText4 = frame >= 102;

  const bar2Enter = spring({ frame: frame - 15, fps, config: ANIMATION.SPRING_SNAPPY });
  const bar2Width = interpolate(bar2Enter, [0, 1], [0, 60]);
  
  const xScale = spring({ frame: frame - 102, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: SPACING.PX_80, alignItems: "center" }}>
        <div style={{ width: 600, padding: SPACING.PX_40, backgroundColor: COLORS.BG_SURFACE, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_LG }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_32, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 12, height: 12, backgroundColor: COLORS.STROKE_STRONG, borderRadius: "50%" }} />
            미군 관계자 — 공식 인정
          </div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_MAIN, lineHeight: FONTS.LEADING_NORMAL }}>
            메이븐의 장점은 어디까지나 <span style={{ color: COLORS.PRIMARY, textShadow: EFFECTS.SHADOW_PRIMARY }}>속도다.</span>
            <br/><br/>
            {text3.substring(0, showText3Length)}
            {showText4 ? <span style={{ color: COLORS.STATE_ERROR_FG, textShadow: EFFECTS.SHADOW_PRIMARY }}>{text4}</span> : null}
            <span style={{ opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0, color: COLORS.PRIMARY }}>|</span>
          </div>
        </div>
        
        {/* Right Bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_24 }}>
             <div style={{ width: 120, textAlign: "right", fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_BOLD }}>속도</div>
             <div style={{ width: 300, height: 16, backgroundColor: COLORS.BG_MUTED, borderRadius: 8, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100%", backgroundColor: COLORS.BG_EMPHASIS }} />
             </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_24, opacity: bar2Enter, transform: `translateY(${(1-bar2Enter)*10}px)` }}>
             <div style={{ width: 120, textAlign: "right", fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_BOLD }}>전술적 판단</div>
             <div style={{ width: 300, height: 16, backgroundColor: COLORS.BG_MUTED, borderRadius: 8, position: "relative", overflow: "visible", border: `2px solid ${COLORS.STATE_ERROR_FG}` }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${bar2Width}%`, backgroundColor: COLORS.STATE_ERROR_FG }} />
                {frame >= 102 && (
                  <div style={{ position: "absolute", right: -40, top: -12, fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_BOLD, transform: `scale(${xScale})`, textShadow: EFFECTS.SHADOW_PRIMARY }}>
                    ✕
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
 * [Scene 12 기획안]
 * 원본 텍스트: 그러니까 이번 이란 공격에서 AI가 1,000개 표적을 추려냈다고 해도
 * 단어 등장 타이밍: "그러니까": 1918f, "이번": 1970f, "이란": 2006f, "공격에서": 2052f, "AI가": 2064f, "1,000개": 2102f, "표적을": 2123f, "추려냈다고": 2160f, "해도,": 2182f
 * 비주얼 컨셉: 화면 중앙에 "1,000" 숫자(이전 body3에서 등장한 임팩트 수치)가 재등장. 그런데 이번에는 WARNING 색으로, 그 위에 반투명 "?" 오버레이. "해도," 단어에서 숫자 주변에 점선 테두리 등장하며 불확실성 암시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const textScale = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const qOpacity = spring({ frame: frame - 30, fps, config: ANIMATION.SPRING_GENTLE });
  const borderDash = frame >= 240 ? spring({ frame: frame - 240, fps, config: ANIMATION.SPRING_BOUNCY }) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ 
          position: "absolute", 
          inset: -40, 
          border: `4px dashed ${COLORS.STATE_WARN_FG}`, 
          borderRadius: SPACING.RADIUS_MD,
          opacity: borderDash,
          transform: `scale(${1 + (1 - borderDash) * 0.1})` 
        }} />
        
        <div style={{ 
          fontFamily: FONTS.DISPLAY, 
          fontSize: 180, 
          fontWeight: FONTS.WEIGHT_EXTRABOLD, 
          color: COLORS.STATE_WARN_FG, 
          textShadow: EFFECTS.SHADOW_PRIMARY,
          transform: `scale(${textScale})`
        }}>
          1,000
        </div>
        
        <div style={{ 
          position: "absolute", 
          right: -100, 
          top: -60, 
          fontFamily: FONTS.DISPLAY, 
          fontSize: 100, 
          fontWeight: FONTS.WEIGHT_BOLD, 
          color: COLORS.STATE_WARN_FG, 
          opacity: qOpacity * 0.5,
          textShadow: EFFECTS.SHADOW_PRIMARY
        }}>
          ?
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 그게 전부 정확했다는 보장은 없는 거예요.
 * 단어 등장 타이밍: "그게": 2182f, "전부": 2195f, "정확했다는": 2218f, "보장은": 2259f, "없는": 2284f, "거예요.": 2301f
 * 비주얼 컨셉: 1,000 숫자 옆에 "× 60%" 곱셈이 등장하며 실제 정확 타격 = "600?" 으로 변환. NEGATIVE 색. 갭 400개는 WARNING_DIM 영역으로 시각화(오차 구간 표시).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const mulSlide = spring({ frame: frame - 36, fps, config: ANIMATION.SPRING_SNAPPY });
  const eqSlide = spring({ frame: frame - 77, fps, config: ANIMATION.SPRING_SNAPPY });
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_40, fontFamily: FONTS.DISPLAY, fontSize: 100, fontWeight: FONTS.WEIGHT_EXTRABOLD }}>
        <div style={{ color: COLORS.STATE_WARN_FG, textShadow: EFFECTS.SHADOW_PRIMARY }}>
          1,000
        </div>
        
        <div style={{ color: COLORS.TEXT_SUB, opacity: mulSlide, transform: `translateX(${(1-mulSlide)*-20}px)` }}>
          ×
        </div>
        
        <div style={{ color: COLORS.TEXT_MAIN, opacity: mulSlide, transform: `translateX(${(1-mulSlide)*-20}px)` }}>
          60%
        </div>
        
        <div style={{ color: COLORS.STATE_ERROR_FG, opacity: eqSlide, transform: `translateY(${(1-eqSlide)*20}px) scale(${1 + (1-eqSlide)*0.5})`, marginLeft: SPACING.PX_40, textShadow: EFFECTS.SHADOW_PRIMARY }}>
          = 600?
        </div>
      </div>
      
      <div style={{ position: "absolute", bottom: 200, display: "flex", gap: 12, opacity: eqSlide }}>
        <div style={{ padding: "10px 24px", backgroundColor: COLORS.STATE_ERROR_BG, border: `2px solid ${COLORS.STATE_ERROR_FG}`, borderRadius: SPACING.RADIUS_SM, color: COLORS.STATE_ERROR_FG, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>
          오차범위 400개
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 실제로 공습 과정에서 민간인 피해가 발생했다는 보도도 있었고요.
 * 단어 등장 타이밍: "실제로": 2340f, "공습": 2376f, "과정에서": 2389f, "민간인": 2425f, "피해가": 2450f, "발생했다는": 2477f, "보도도": 2523f, "있었고요.": 2550f
 * 비주얼 컨셉: 화면 중앙에 NEGATIVE_DIM 배경 패널. 상단 레이블 "CIVILIAN CASUALTIES REPORTED". "민간인" 단어 등장 시 패널 테두리가 NEGATIVE 색으로 강조 pulse. 하단 소형 TEXT_DISABLED SOURCE 레이블. 감정적 충격을 최소한의 UI 언어로 전달.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enter = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const pulse = spring({ frame: frame - 85, fps, config: ANIMATION.SPRING_BOUNCY });
  const borderColor = interpolateColors(pulse, [0, 1], [COLORS.STROKE_STRONG, COLORS.STATE_ERROR_FG]);
  const glow = pulse > 0 ? EFFECTS.TINT_PRIMARY : "none";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 600, padding: SPACING.PX_48, backgroundColor: COLORS.STATE_ERROR_BG, border: `3px solid ${borderColor}`, borderRadius: SPACING.RADIUS_MD, opacity: enter, transform: `scale(${1 + (1-enter)*0.1})`, boxShadow: pulse > 0 ? EFFECTS.SHADOW_PRIMARY : "none", display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32 }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: pulse > 0 ? COLORS.STATE_ERROR_FG : COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD, textShadow: glow, transform: `scale(${1 + pulse * 0.05})` }}>
          민간인 피해 보도
        </div>
        <div style={{ width: 60, height: 4, backgroundColor: COLORS.STATE_ERROR_FG, opacity: pulse }} />
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER }}>
          출처: 복수의 언론 보도
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 15 기획안]
 * 원본 텍스트: AI의 판단이 완벽하지 않다는 게 전쟁터에서는 전혀 다른 무게를 가지는 겁니다.
 * 단어 등장 타이밍: "AI의": 2604f, "판단이": 2624f, "완벽하지": 2660f, "않다는": 2708f, "게": 2745f, "전쟁터에서는": 2761f, "전혀": 2808f, "다른": 2824f, "무게를": 2839f, "가지는": 2863f, "겁니다.": 2886f
 * 비주얼 컨셉: 화면 좌측에 [AI ERROR] WARNING 박스 / 우측에 [CONSEQUENCE] NEGATIVE 박스. 두 박스 사이에 "×" 곱하기 기호 대신 "→" 화살표(완전한 인과관계). "전쟁터에서는" 단어에 우측 CONSEQUENCE 박스가 더 크게 확대. 오류의 무게감 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enterL = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_SNAPPY });
  const enterM = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_SNAPPY });
  const enterR = spring({ frame: frame - 60, fps, config: ANIMATION.SPRING_SNAPPY });
  
  const impactR = spring({ frame: frame - 157, fps, config: ANIMATION.SPRING_BOUNCY });
  const scaleR = interpolate(impactR, [0, 1], [1, 1.2]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_64 }}>
        <div style={{ width: 280, height: 180, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: COLORS.BG_SURFACE, border: `3px solid ${COLORS.STATE_WARN_FG}`, borderRadius: SPACING.RADIUS_MD, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, color: COLORS.STATE_WARN_FG, opacity: enterL, transform: `translateY(${(1-enterL)*20}px)`, boxShadow: EFFECTS.SHADOW_PRIMARY }}>
          AI 오류
        </div>
        
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 64, color: COLORS.TEXT_SUB, opacity: enterM }}>
          →
        </div>
        
        <div style={{ width: 280, height: 180, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: impactR > 0 ? COLORS.STATE_ERROR_BG : COLORS.BG_SURFACE, border: `3px solid ${COLORS.STATE_ERROR_FG}`, borderRadius: SPACING.RADIUS_MD, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, fontWeight: FONTS.WEIGHT_BOLD, color: COLORS.STATE_ERROR_FG, opacity: enterR, transform: `translateY(${(1-enterR)*20}px) scale(${scaleR})`, boxShadow: impactR > 0 ? EFFECTS.SHADOW_PRIMARY : "none", transition: "all 0.3s" }}>
          치명적 결과
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PipeNode: React.FC<{ label: string; highlightedState?: "none" | "pulse" | "solid"; pulseFrame?: number; delay?: number; frame: number; children?: React.ReactNode }> = ({ label, highlightedState = "none", pulseFrame = 0, delay = 0, frame, children }) => {
  const fps = 60;
  const enter = spring({ frame: frame - delay, fps, config: ANIMATION.SPRING_SNAPPY });
  let pulse = 0;
  if (highlightedState === "pulse") {
    pulse = spring({ frame: frame - pulseFrame, fps, config: ANIMATION.SPRING_BOUNCY });
  } else if (highlightedState === "solid") {
    pulse = 1;
  }
  
  const isHighlighted = highlightedState === "solid" || (highlightedState === "pulse" && frame >= pulseFrame);

  return (
    <div style={{ position: "relative", padding: "24px 40px", backgroundColor: COLORS.BG_SURFACE, border: `3px solid ${isHighlighted ? COLORS.PRIMARY : COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD, fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD, opacity: enter, transform: `translateY(${(1-enter)*20}px) scale(${1 + pulse * 0.05})`, boxShadow: isHighlighted ? EFFECTS.SHADOW_PRIMARY : "none", transition: "all 0.3s" }}>
      {label}
      {children}
    </div>
  );
};

const FlowArrow: React.FC<{ delay: number; frame: number }> = ({ delay, frame }) => {
  const fps = 60;
  const enter = spring({ frame: frame - delay, fps, config: ANIMATION.SPRING_GENTLE });
  const offset = -(frame % 30);
  
  return (
    <div style={{ width: 60, height: 2, background: `repeating-linear-gradient(90deg, ${COLORS.PRIMARY}, ${COLORS.PRIMARY} 6px, transparent 6px, transparent 12px)`, opacity: enter, backgroundPositionX: offset }} />
  );
};

/**
 * [Scene 16 기획안]
 * 원본 텍스트: 그리고 또 하나 더 있어요.
 * 단어 등장 타이밍: "그리고": 2918f, "또": 2955f, "하나": 2958f, "더": 2977f, "있어요.": 2983f
 * 비주얼 컨셉: 화면 중앙에 "+" 기호가 PRIMARY 색 SIZE_3XL로 pulse 등장 후 사라짐. 그 자리에 "THREAT #2" 레이블 TEXT_MUTED SIZE_SM 등장. 다음 위협 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const plusPulse = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_BOUNCY });
  const showText = frame >= 80;
  const textOpacity = spring({ frame: frame - 80, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {frame < 90 && (
          <div style={{ position: "absolute", fontFamily: FONTS.DISPLAY, fontSize: 160, color: COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_EXTRABOLD, transform: `scale(${1 + plusPulse * 0.2})`, textShadow: EFFECTS.SHADOW_PRIMARY, opacity: 1 - Math.max(0, (frame - 70) / 20) }}>
            +
          </div>
        )}
        {showText && (
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, fontWeight: FONTS.WEIGHT_BOLD, opacity: textOpacity }}>
            두 번째 위협
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 17 기획안]
 * 원본 텍스트: 메이븐 같은 AI 시스템은 학습 데이터에 의존해요.
 * 단어 등장 타이밍: "메이븐": 3022f, "같은": 3076f, "AI": 3078f, "시스템은": 3083f, "학습": 3126f, "데이터에": 3148f, "의존해요.": 3191f
 * 비주얼 컨셉: 파이프라인 다이어그램: [TRAINING DATA] → [AI MODEL] → [OUTPUT]. 화살표는 데이터 흐름(PRIMARY 색 점선 이동 애니메이션). "학습 데이터에" 단어에 [TRAINING DATA] 노드 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene17: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_32 }}>
        <PipeNode label="학습 데이터" highlightedState="pulse" pulseFrame={104} delay={0} frame={frame} />
        <FlowArrow delay={20} frame={frame} />
        <PipeNode label="AI 모델" delay={40} frame={frame} />
        <FlowArrow delay={60} frame={frame} />
        <PipeNode label="결과" delay={80} frame={frame} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 18 기획안]
 * 원본 텍스트: 근데 만약 적대국이 그 학습 데이터에 슬쩍 오류를 심어놓으면 어떻게 될까요?
 * 단어 등장 타이밍: "근데": 3246f, "만약": 3288f, "적대국이": 3290f, "그": 3334f, "학습": 3344f, "데이터에": 3366f, "슬쩍": 3415f, "오류를": 3428f, "심어놓으면": 3477f, "될까요?": 3499f
 * 비주얼 컨셉: [TRAINING DATA] 노드 내부에 "ADVERSARY" 레이블의 외부 화살표가 은밀하게(점선, 두께 얇음) 침투하는 모습. "슬쩍" 단어에서 침투 화살표가 WARNING 색으로 변경. 데이터 내부에 "ERROR" 박스 하나가 삽입됨. 사이버 공격의 추상적 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const attackActive = frame >= 169;
  const errorBoxEnter = spring({ frame: frame - 180, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_32, position: "relative" }}>
        
        <div style={{ position: "absolute", top: -100, left: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 24, color: attackActive ? COLORS.STATE_WARN_FG : COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_BOLD, transition: "color 0.3s" }}>
            적대국
          </div>
          <div style={{ width: 4, height: 60, background: `repeating-linear-gradient(180deg, ${attackActive ? COLORS.STATE_WARN_FG : COLORS.TEXT_SUB}, ${attackActive ? COLORS.STATE_WARN_FG : COLORS.TEXT_SUB} 4px, transparent 4px, transparent 8px)`, backgroundPositionY: frame % 20 }} />
          <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `10px solid ${attackActive ? COLORS.STATE_WARN_FG : COLORS.TEXT_SUB}` }} />
        </div>

        <PipeNode label="학습 데이터" highlightedState="solid" delay={-999} frame={999}>
          {errorBoxEnter > 0 && (
            <div style={{ position: "absolute", bottom: -24, right: -24, padding: "8px 16px", backgroundColor: COLORS.STATE_ERROR_FG, borderRadius: SPACING.RADIUS_SM, fontFamily: FONTS.DISPLAY, fontSize: 20, fontWeight: FONTS.WEIGHT_BOLD, color: COLORS.BG_BASE, transform: `scale(${errorBoxEnter})`, boxShadow: EFFECTS.SHADOW_PRIMARY }}>
              오류
            </div>
          )}
        </PipeNode>
        <FlowArrow delay={-999} frame={999} />
        <PipeNode label="AI 모델" delay={-999} frame={999} />
        <FlowArrow delay={-999} frame={999} />
        <PipeNode label="결과" delay={-999} frame={999} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 19 기획안]
 * 원본 텍스트: AI가 잘못된 표적을 "확률 98%"라고 추천할 수 있어요.
 * 단어 등장 타이밍: "AI가": 3528f, "잘못된": 3573f, "표적을": 3601f, "\"확률": 3652f, "98%\"라고": 3670f, "추천할": 3709f, "수": 3740f, "있어요.": 3745f
 * 비주얼 컨셉: AI 보고서 패널 재등장. 내용: [CLASSIFICATION: CIVILIAN AREA → 잘못된 분류] + [CONFIDENCE: 98%] 수치는 PRIMARY GLOW 발광이지만 테두리는 WARNING 색 크랙 효과. "98%" 단어에서 수치 강조, 하단에 [INCORRECT] 오버레이. 자신감 있는 오류의 아이러니.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enter = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const highlight = spring({ frame: frame - 142, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ padding: SPACING.PX_40, backgroundColor: COLORS.BG_SURFACE, border: `3px solid ${highlight > 0 ? COLORS.STATE_WARN_FG : COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD, opacity: enter, transform: `translateY(${(1-enter)*40}px) scale(${1 + highlight * 0.05})`, boxShadow: highlight > 0 ? EFFECTS.SHADOW_PRIMARY : "none", display: "flex", flexDirection: "column", gap: SPACING.PX_32 }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER }}>
          AI 분석 보고서
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_16 }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_MAIN }}>
            분류: 민간인 구역 <span style={{ color: COLORS.STATE_WARN_FG }}>→ 잘못된 분류</span>
          </div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 100, color: COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_EXTRABOLD, textShadow: EFFECTS.SHADOW_PRIMARY, display: "flex", alignItems: "center", gap: SPACING.PX_24 }}>
            신뢰도: 98%
            {highlight > 0 && (
              <span style={{ fontSize: 32, color: COLORS.STATE_ERROR_FG, backgroundColor: COLORS.STATE_ERROR_BG, padding: "8px 24px", borderRadius: 8, transform: `scale(${highlight})` }}>
                오답
              </span>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 20 기획안]
 * 원본 텍스트: 미 국방부도 이 가능성을 공개적으로 우려하고 있고, 특히 중국이 이 방향으로 연구하고 있다고 해요.
 * 단어 등장 타이밍: "미": 3784f, "국방부도": 3793f, "이": 3831f, "가능성을": 3841f, "공개적으로": 3879f, "우려하고": 3927f, "있고,": 3965f, "특히": 3989f, "중국이": 4020f, "이": 4031f, "방향으로": 4039f, "연구하고": 4073f, "있다고": 4106f, "해요.": 4133f
 * 비주얼 컨셉: 좌측 [DOD CONCERN] WARNING 배지 → 우측 [CHINA RESEARCH] NEGATIVE 배지. 두 배지 사이에 "→ RACE" 화살표. "중국이" 단어 등장 시 우측 배지 pulse 강조. 글로벌 AI 경쟁 구도 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enterL = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_SNAPPY });
  const enterM = spring({ frame: frame - 100, fps, config: ANIMATION.SPRING_GENTLE });
  const enterR = spring({ frame: frame - 200, fps, config: ANIMATION.SPRING_SNAPPY });
  const pulseR = spring({ frame: frame - 236, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_64 }}>
        <div style={{ padding: "32px 48px", backgroundColor: COLORS.STATE_WARN_BG, border: `2px solid ${COLORS.STATE_WARN_FG}`, borderRadius: SPACING.RADIUS_MD, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.STATE_WARN_FG, fontWeight: FONTS.WEIGHT_BOLD, opacity: enterL, transform: `translateY(${(1-enterL)*20}px)` }}>
          미 국방부 우려
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: enterM }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 24, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER }}>경쟁</div>
          <div style={{ width: 100, height: 4, background: `repeating-linear-gradient(90deg, ${COLORS.TEXT_SUB}, ${COLORS.TEXT_SUB} 4px, transparent 4px, transparent 12px)`, backgroundPositionX: -(frame % 30) }} />
        </div>
        
        <div style={{ padding: "32px 48px", backgroundColor: COLORS.STATE_ERROR_BG, border: `2px solid ${COLORS.STATE_ERROR_FG}`, borderRadius: SPACING.RADIUS_MD, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_BOLD, opacity: enterR, transform: `translateY(${(1-enterR)*20}px) scale(${1 + pulseR * 0.1})`, boxShadow: pulseR > 0 ? EFFECTS.SHADOW_PRIMARY : "none" }}>
          중국 연구 진행
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 21 기획안]
 * 원본 텍스트: AI를 무력화하는 게 아니라, AI를 틀리게 만드는 거예요.
 * 단어 등장 타이밍: "AI를": 4158f, "무력화하는": 4177f, "게": 4235f, "아니라,": 4248f, "AI를": 4284f, "틀리게": 4306f, "만드는": 4328f, "거예요.": 4356f
 * 비주얼 컨셉: 화면 좌측 [무력화 (OFF)] 방법에 X 표시. 우측 [틀리게 만들기 (CORRUPT)] 방법에 CHECK. 두 접근법 사이에 "vs" 기호. "틀리게" 단어에서 우측 [CORRUPT] 박스가 WARNING 색 강조 pulse. 새로운 개념 제시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enterL = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_SNAPPY });
  const enterR = spring({ frame: frame - 100, fps, config: ANIMATION.SPRING_SNAPPY });
  const pulseR = spring({ frame: frame - 148, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 120 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32, opacity: enterL, transform: `translateX(${(1-enterL)*-20}px)` }}>
          <div style={{ width: 200, height: 200, backgroundColor: COLORS.BG_MUTED, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_BOLD, textDecoration: "line-through" }}>
            무력화
          </div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_EXTRABOLD, opacity: 0.5 }}>
            ✕
          </div>
        </div>
        
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.TEXT_SUB, fontStyle: "italic" }}>
          vs
        </div>
        
        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32, opacity: enterR, transform: `translateX(${(1-enterR)*20}px) scale(${1 + pulseR * 0.05})` }}>
          <div style={{ width: 260, height: 200, backgroundColor: pulseR > 0 ? COLORS.STATE_WARN_BG : COLORS.BG_SURFACE, border: `3px solid ${pulseR > 0 ? COLORS.STATE_WARN_FG : COLORS.PRIMARY}`, borderRadius: SPACING.RADIUS_MD, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: pulseR > 0 ? COLORS.STATE_WARN_FG : COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_BOLD, boxShadow: pulseR > 0 ? EFFECTS.SHADOW_PRIMARY : "none", transition: "all 0.3s" }}>
            오류 유도
          </div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: pulseR > 0 ? COLORS.STATE_WARN_FG : COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_EXTRABOLD }}>
            ✓
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 22 기획안]
 * 원본 텍스트: 이게 새로운 형태의 전쟁입니다.
 * 단어 등장 타이밍: "이게": 4397f, "새로운": 4425f, "형태의": 4441f, "전쟁입니다.": 4460f
 * 비주얼 컨셉: 화면 중앙에 "NEW WAR TYPE" TEXT_MAIN SIZE_XL WEIGHT_EXTRABOLD fade-in. 아래에 수평선 PRIMARY 색 2px draw. 배경 brief flash (BG_ELEVATED 순간 밝아짐). 전쟁 패러다임 전환 선언.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene22: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const textOpacity = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const lineEnter = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_SNAPPY });
  const flash = spring({ frame, fps, config: { damping: 10, stiffness: 400, mass: 0.5 } });

  return (
    <AbsoluteFill style={{ backgroundColor: interpolateColors(flash, [0, 0.5, 1], [COLORS.BG_BASE, COLORS.BG_MUTED, COLORS.BG_BASE]), justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32 }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_EXTRABOLD, opacity: textOpacity, letterSpacing: FONTS.TRACKING_WIDER }}>
          새로운 형태의 전쟁
        </div>
        <div style={{ width: 600, height: 4, backgroundColor: COLORS.PRIMARY, transform: `scaleX(${lineEnter})`, boxShadow: EFFECTS.SHADOW_PRIMARY }} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 23 기획안]
 * 원본 텍스트: 여기서 더 무서운 사실이 있습니다.
 * 단어 등장 타이밍: "여기서": 4511f, "더": 4544f, "무서운": 4549f, "사실이": 4572f, "있습니다.": 4595f
 * 비주얼 컨셉: 배경이 BG_VOID로 서서히 전환되며 어두워짐. "무서운" 단어에 NEGATIVE_DIM 배경 오버레이. 중앙에 "CRITICAL FINDING" 레이블이 TRACKING_WIDER TEXT_MUTED로 등장. 강렬한 빌드업.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene23: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const bgTransition = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const overlayOpacity = spring({ frame: frame - 38, fps, config: ANIMATION.SPRING_GENTLE });
  const textOpacity = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: interpolateColors(bgTransition, [0, 1], [COLORS.BG_BASE, COLORS.BG_DARKEST]), justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ backgroundColor: COLORS.STATE_ERROR_BG, opacity: overlayOpacity * 0.3 }} />
      
      <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, fontWeight: FONTS.WEIGHT_BOLD, opacity: textOpacity }}>
        결정적 사실
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 24 기획안]
 * 원본 텍스트: 올해 2월에 연구 결과 하나가 나왔어요.
 * 단어 등장 타이밍: "올해": 4638f, "2월에": 4655f, "연구": 4680f, "결과": 4697f, "하나가": 4714f, "나왔어요.": 4739f
 * 비주얼 컨셉: 날짜 레이블 "2025.02" TEXT_MUTED 등장. 그 아래 "RESEARCH PUBLISHED" 타임라인 노드. 다음 씬 연구 기관 공개 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene24: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enter1 = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_SNAPPY });
  const enter2 = spring({ frame: frame - 60, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_24 }}>
        <div style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_BOLD, opacity: enter1, transform: `translateY(${(1-enter1)*20}px)` }}>
          2025.02
        </div>
        <div style={{ width: 2, height: 40, backgroundColor: COLORS.STROKE_DEFAULT, opacity: enter2, transform: `scaleY(${enter2})`, transformOrigin: "top" }} />
        <div style={{ padding: "16px 32px", backgroundColor: COLORS.BG_SURFACE, border: `1px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD, fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD, opacity: enter2, transform: `translateY(${(1-enter2)*20}px)` }}>
          연구 논문 발표
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 25 기획안]
 * 원본 텍스트: 영국 킹스칼리지 런던에서요.
 * 단어 등장 타이밍: "영국": 4783f, "킹스칼리지": 4808f, "런던에서요.": 4850f
 * 비주얼 컨셉: 학술 기관 카드 등장: [King's College London] SECONDARY 테두리, 내부 "UK · Academic Research" 레이블. GLASS_BG 배경. 신뢰성 있는 출처 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene25: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enter = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        padding: "48px 64px", 
        backgroundColor: COLORS.BG_SURFACE, 
        border: `3px solid ${COLORS.SECONDARY}`, 
        borderRadius: SPACING.RADIUS_MD, 
        opacity: enter, 
        transform: `translateY(${(1-enter)*40}px)`,
        boxShadow: EFFECTS.SHADOW_PRIMARY,
        display: "flex", flexDirection: "column", gap: SPACING.PX_16, alignItems: "center"
      }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.SECONDARY, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
          King's College London
        </div>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 24, color: COLORS.TEXT_SUB }}>
          UK · Academic Research
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 26 기획안]
 * 원본 텍스트: GPT, 클로드, 제미나이.
 * 단어 등장 타이밍: "GPT,": 4908f, "클로드,": 4934f, "제미나이.": 4979f
 * 비주얼 컨셉: 세 AI 레이블 박스가 STAGGER_SM 간격으로 순차 등장: [GPT] [Claude] [Gemini]. 각 박스 PRIMARY_DIM 배경, TEXT_MAIN 텍스트. 수평 정렬. 친숙한 AI 브랜드들의 나열.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene26: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enter1 = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const enter2 = spring({ frame: frame - 15, fps, config: ANIMATION.SPRING_SNAPPY });
  const enter3 = spring({ frame: frame - 30, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: SPACING.PX_40 }}>
        {[
          { name: "GPT", enter: enter1 },
          { name: "Claude", enter: enter2 },
          { name: "Gemini", enter: enter3 }
        ].map((ai, i) => (
          <div key={i} style={{ 
            padding: "24px 48px", 
            backgroundColor: COLORS.BG_SURFACE, 
            border: `3px solid ${COLORS.PRIMARY}`, 
            borderRadius: SPACING.RADIUS_MD, 
            fontFamily: FONTS.DISPLAY, 
            fontSize: FONTS.SIZE_LG, 
            color: COLORS.TEXT_MAIN, 
            fontWeight: FONTS.WEIGHT_BOLD, 
            opacity: ai.enter, 
            transform: `translateY(${(1-ai.enter)*20}px)`,
            boxShadow: EFFECTS.SHADOW_PRIMARY
          }}>
            {ai.name}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 27 기획안]
 * 원본 텍스트: 이 세 AI한테 전쟁 시뮬레이션을 시킨 거예요.
 * 단어 등장 타이밍: "이": 5036f, "세": 5054f, "AI한테": 5059f, "전쟁": 5078f, "시뮬레이션을": 5095f, "시킨": 5146f, "거예요.": 5165f
 * 비주얼 컨셉: 세 AI 박스 주변으로 NEGATIVE_DIM 오버레이가 서서히 등장. "전쟁" 단어에서 세 박스 테두리가 NEGATIVE 색으로 전환. "시뮬레이션을" 단어에서 [WAR GAME] 레이블이 배경에 대형 TEXT_DISABLED 색으로 등장. 충격적 전환.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene27: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const bgOverlay = interpolate(frame, [0, 60], [0, 0.6], { extrapolateRight: "clamp" });
  const isWar = frame >= 42;
  const warGameScale = spring({ frame: frame - 59, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.STATE_ERROR_FG, opacity: bgOverlay, mixBlendMode: "overlay" }} />
      
      {warGameScale > 0 && (
         <div style={{ position: "absolute", fontFamily: FONTS.DISPLAY, fontSize: 240, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_EXTRABOLD, opacity: 0.1, transform: `scale(${warGameScale})` }}>
            WAR GAME
         </div>
      )}

      <div style={{ display: "flex", gap: SPACING.PX_40, zIndex: 1 }}>
        {["GPT", "Claude", "Gemini"].map((ai, index) => (
          <div key={index} style={{ 
            padding: "24px 48px", 
            backgroundColor: isWar ? COLORS.STATE_ERROR_BG : COLORS.BG_SURFACE, 
            border: `3px solid ${isWar ? COLORS.STATE_ERROR_FG : COLORS.PRIMARY}`, 
            borderRadius: SPACING.RADIUS_MD, 
            fontFamily: FONTS.DISPLAY, 
            fontSize: FONTS.SIZE_LG, 
            color: isWar ? COLORS.STATE_ERROR_FG : COLORS.TEXT_MAIN, 
            fontWeight: FONTS.WEIGHT_BOLD,
            transition: "all 0.2s",
            boxShadow: isWar ? EFFECTS.SHADOW_PRIMARY : "none"
          }}>
            {ai}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 28 기획안]
 * 원본 텍스트: 가상의 국가 지도자 역할을 맡기고, 영토 분쟁이나 자원 경쟁 같은 시나리오를 줬어요.
 * 단어 등장 타이밍: "가상의": 5204f, "국가": 5239f, "지도자": 5249f, "역할을": 5276f, "맡기고,": 5303f, "영토": 5324f, "분쟁이나": 5350f, "자원": 5375f, "경쟁": 5401f, "같은": 5417f, "시나리오를": 5434f, "줬어요.": 5451f
 * 비주얼 컨셉: 시뮬레이션 환경 UI: 상단 "SIMULATION MODE" 레이블 GLASS_BG. 내부: [ROLE: 국가 지도자] 입력 필드. 아래 시나리오 태그 [영토 분쟁] [자원 경쟁] STAGGER 등장. AI에게 국가 권력을 시뮬레이션 맡기는 장면의 긴장감.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene28: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enter = spring({ frame: frame - 20, fps, config: ANIMATION.SPRING_SNAPPY });
  const roleEnter = spring({ frame: frame - 40, fps, config: ANIMATION.SPRING_SNAPPY });
  const tag1Enter = spring({ frame: frame - 120, fps, config: ANIMATION.SPRING_BOUNCY });
  const tag2Enter = spring({ frame: frame - 170, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 800, padding: SPACING.PX_64, backgroundColor: COLORS.BG_SURFACE, border: `3px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_LG, opacity: enter, transform: `translateY(${(1-enter)*40}px)`, boxShadow: EFFECTS.SHADOW_PRIMARY }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.PRIMARY, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_48, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, backgroundColor: COLORS.PRIMARY, borderRadius: "50%", boxShadow: EFFECTS.SHADOW_PRIMARY }} />
          시뮬레이션 모드
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_48 }}>
           <div style={{ padding: "24px 32px", backgroundColor: COLORS.BG_MUTED, border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD, fontFamily: FONTS.DISPLAY, fontSize: 40, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD, opacity: roleEnter, transform: `translateX(${(1-roleEnter)*-20}px)` }}>
             <span style={{ color: COLORS.TEXT_SUB, marginRight: 24 }}>역할:</span> 국가 지도자
           </div>
           
           <div style={{ display: "flex", gap: SPACING.PX_32 }}>
             <div style={{ padding: "16px 32px", backgroundColor: COLORS.STATE_WARN_BG, border: `2px solid ${COLORS.STATE_WARN_FG}`, borderRadius: SPACING.RADIUS_SM, fontFamily: FONTS.DISPLAY, fontSize: 24, color: COLORS.STATE_WARN_FG, fontWeight: FONTS.WEIGHT_BOLD, opacity: tag1Enter, transform: `scale(${tag1Enter})` }}>
               # 영토 분쟁
             </div>
             <div style={{ padding: "16px 32px", backgroundColor: COLORS.STATE_ERROR_BG, border: `2px solid ${COLORS.STATE_ERROR_FG}`, borderRadius: SPACING.RADIUS_SM, fontFamily: FONTS.DISPLAY, fontSize: 24, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_BOLD, opacity: tag2Enter, transform: `scale(${tag2Enter})` }}>
               # 자원 경쟁
             </div>
           </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 29 기획안]
 * 원본 텍스트: 결과가 어땠냐면요.
 * 단어 등장 타이밍: "결과가": 5532f, "어땠냐면요.": 5561f
 * 비주얼 컨셉: 시뮬레이션 화면이 "CALCULATING..." 로딩 상태. 결과 대기 화면. "결과가" 단어에 로딩 스피너 대신 수평 점선이 이동. 긴장감 빌드업.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene29: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const textOpacity = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const resultMark = spring({ frame: frame - 29, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_32, opacity: textOpacity }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 64, color: COLORS.TEXT_SUB, letterSpacing: 10, fontWeight: FONTS.WEIGHT_EXTRABOLD }}>
          계산 중...
        </div>
        <div style={{ display: "flex", gap: 24 }}>
           {[0, 10, 20].map((t) => (
             <div key={t} style={{ width: 16, height: 16, backgroundColor: COLORS.PRIMARY, borderRadius: "50%", opacity: (frame + t) % 30 < 15 ? 1 : 0.2, boxShadow: (frame + t) % 30 < 15 ? EFFECTS.SHADOW_PRIMARY : "none" }} />
           ))}
        </div>
        
        {resultMark > 0 && (
           <div style={{ position: "absolute", bottom: -80, width: 800, height: 6, backgroundColor: COLORS.STATE_WARN_FG, transform: `scaleX(${resultMark})`, boxShadow: EFFECTS.SHADOW_PRIMARY }} />
        )}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 30 기획안]
 * 원본 텍스트: 21번 중 20번.
 * 단어 등장 타이밍: "21번": 5623f, "중": 5653f, "20번.": 5662f
 * 비주얼 컨셉: 화면 중앙에 "20/21" 분수 형태로 SIZE_3XL WEIGHT_EXTRABOLD NEGATIVE 색 가운데 정렬 등장. 분모 21은 TEXT_MUTED, 분자 20은 NEGATIVE 색 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene30: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const scaleIn = spring({ frame, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 24, transform: `scale(${scaleIn})` }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 320, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_EXTRABOLD, textShadow: EFFECTS.SHADOW_PRIMARY }}>
          20
        </div>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 160, color: COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_BOLD }}>
          /21
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 31 기획안]
 * 원본 텍스트: 95%에서 핵무기를 선택했습니다.
 * 단어 등장 타이밍: "95%에서": 5699f, "핵무기를": 5741f, "선택했습니다.": 5780f
 * 비주얼 컨셉: "20/21" 변환 → "95%" 숫자로 전환(counter up). NEGATIVE GLOW_LG 효과, 화면 절반 이상을 차지하는 임팩트. "핵무기를" 단어에서 배경이 NEGATIVE_DIM으로 전체 플래시. 역대 최강 충격 비주얼.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene31: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  // count up from 20 -> 95
  const count = Math.floor(interpolate(frame, [0, 20], [20, 95], { extrapolateRight: "clamp" }));
  const flash = spring({ frame: frame - 42, fps, config: { damping: 10, mass: 0.5, stiffness: 400 } });

  return (
    <AbsoluteFill style={{ backgroundColor: interpolateColors(flash, [0, 0.5, 1], [COLORS.BG_DARKEST, COLORS.STATE_ERROR_BG, COLORS.BG_DARKEST]), justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_48, transform: `scale(${1 + flash * 0.1})` }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 320, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_EXTRABOLD, textShadow: EFFECTS.SHADOW_PRIMARY }}>
          {count}%
        </div>
        {frame >= 42 && (
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_BOLD, letterSpacing: FONTS.TRACKING_WIDER }}>
            핵무기 공격 선택
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 32 기획안]
 * 원본 텍스트: 협상도 아니고, 외교도 아니고, 핵 버튼이에요.
 * 단어 등장 타이밍: "협상도": 5852f, "아니고,": 5889f, "외교도": 5903f, "아니고,": 5929f, "핵": 5954f, "버튼이에요.": 6019f
 * 비주얼 컨셉: 세 옵션 목록 순차 등장: [협상 →  X] [외교  → X] [핵  → ✓]. 각 항목 단어 등장에 맞춰 stagger. 앞 두 옵션은 TEXT_DISABLED 취소선, 핵 옵션은 NEGATIVE 색 강조. 차갑고 단순한 AI의 의사결정 프로세스 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene32: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const item1 = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const item2 = spring({ frame: frame - 51, fps, config: ANIMATION.SPRING_SNAPPY });
  const item3 = spring({ frame: frame - 102, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_48, opacity: item1, transform: `translateX(${(1-item1)*-20}px)` }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_SUB, textDecoration: "line-through", fontWeight: FONTS.WEIGHT_BOLD }}>협상</div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.TEXT_SUB }}>→</div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_EXTRABOLD }}>✕</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_48, opacity: item2, transform: `translateX(${(1-item2)*-20}px)` }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_SUB, textDecoration: "line-through", fontWeight: FONTS.WEIGHT_BOLD }}>외교</div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.TEXT_SUB }}>→</div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_SUB, fontWeight: FONTS.WEIGHT_EXTRABOLD }}>✕</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_48, opacity: item3, transform: `translateX(${(1-item3)*-20}px) scale(${1 + item3 * 0.1})` }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 100, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_EXTRABOLD, textShadow: EFFECTS.SHADOW_PRIMARY }}>핵 버튼</div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.TEXT_SUB }}>→</div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 100, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_EXTRABOLD, textShadow: EFFECTS.SHADOW_PRIMARY }}>✓</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 33 기획안]
 * 원본 텍스트: 연구팀이 이렇게 말했어요.
 * 단어 등장 타이밍: "연구팀이": 6019f, "이렇게": 6055f, "말했어요.": 6082f
 * 비주얼 컨셉: GLASS_BG 인용문 패널 등장 준비. 상단 레이블 "King's College London Research Team". 내부 cursor blink 대기. 권위 있는 출처 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene33: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enter = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 1000, padding: SPACING.PX_64, backgroundColor: COLORS.BG_SURFACE, border: `3px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_LG, opacity: enter, transform: `translateY(${(1-enter)*40}px)`, boxShadow: EFFECTS.SHADOW_PRIMARY }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_48, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, backgroundColor: COLORS.PRIMARY, borderRadius: "50%" }} />
          킹스칼리지 런던 연구팀
        </div>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.TEXT_MAIN, lineHeight: 1.4, minHeight: 120 }}>
          <span style={{ opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0, color: COLORS.PRIMARY }}>|</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 34 기획안]
 * 원본 텍스트: "핵무기에 대한 금기는 인간 사회에서만큼 AI에겐 작동하지 않는다."
 * 단어 등장 타이밍: "\"핵무기에": 6128f, "대한": 6164f, "금기는": 6182f, "인간": 6209f, "사회에서만큼": 6227f, "AI에겐": 6281f, "작동하지": 6305f, "않는다.\"": 6343f
 * 비주얼 컨셉: 인용문 패널 내부 타이핑 등장. "금기는" 단어에서 SECONDARY 색(인간 사회의 금기). "AI에겐" 단어에서 색상이 NEGATIVE로 전환. "작동하지 않는다." 단어에서 텍스트 전체가 NEGATIVE GLOW_TEXT_SM 효과. 인간-AI의 윤리 차이를 색으로 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene34: React.FC = () => {
  const frame = useCurrentFrame();
  
  const text = `"핵무기에 대한 금기는 인간 사회에서만큼 AI에겐 작동하지 않는다."`;
  const showTextLength = Math.max(0, Math.min(text.length, Math.floor(frame / 3)));
  
  const isAiPart = frame >= 153;
  const isGlitch = frame >= 215; // "작동하지 않는다"
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ 
        width: 1000, 
        padding: SPACING.PX_64, 
        backgroundColor: COLORS.BG_SURFACE, 
        border: `3px solid ${isGlitch ? COLORS.STATE_ERROR_FG : COLORS.STROKE_DEFAULT}`, 
        borderRadius: SPACING.RADIUS_LG,
        boxShadow: isGlitch ? EFFECTS.SHADOW_PRIMARY : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: SPACING.PX_48, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, backgroundColor: isGlitch ? COLORS.STATE_ERROR_FG : COLORS.PRIMARY, borderRadius: "50%" }} />
          킹스칼리지 런던 연구팀
        </div>
        <div style={{ 
          fontFamily: FONTS.DISPLAY, 
          fontSize: 48, 
          color: isGlitch ? COLORS.STATE_ERROR_FG : (isAiPart ? COLORS.STATE_ERROR_FG : COLORS.SECONDARY), 
          lineHeight: 1.4,
          transition: "all 0.3s",
          minHeight: 120
        }}>
          {text.substring(0, showTextLength)}
          <span style={{ opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0, color: COLORS.PRIMARY }}>|</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 35 기획안]
 * 원본 텍스트: 왜일까요.
 * 단어 등장 타이밍: "왜일까요.": 6382f
 * 비주얼 컨셉: 화면 클리어. 중앙에 "왜일까요." TEXT_BODY SIZE_XL 홀로 fade-in. 의도적 여백, 감상 유도.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene35: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const textOpacity = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD, opacity: textOpacity, letterSpacing: FONTS.TRACKING_WIDE }}>
        왜일까요.
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 36 기획안]
 * 원본 텍스트: AI는 두렵지 않으니까요.
 * 단어 등장 타이밍: "AI는": 6432f, "두렵지": 6461f, "않으니까요.": 6479f
 * 비주얼 컨셉: "왜일까요." 가 페이드아웃 후 중앙에 "AI는 두렵지 않으니까요." TEXT_MAIN SIZE_XL WEIGHT_BOLD 등장. "두렵지 않으니까요." 부분에 WARNING 색 강조 밑줄 1px.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene36: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  const enter = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD, opacity: enter, transform: `translateY(${(1-enter)*20}px)` }}>
        AI는 <span style={{ borderBottom: `4px solid ${COLORS.STATE_WARN_FG}` }}>두렵지 않으니까요.</span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 37 기획안]
 * 원본 텍스트: 사람은 핵전쟁이 어떤 건지 역사로, 감정으로, 몸으로 알아요.
 * 단어 등장 타이밍: "사람은": 6542f, "핵전쟁이": 6571f, "어떤": 6603f, "건지": 6619f, "역사로,": 6635f, "감정으로,": 6666f, "몸으로": 6706f, "알아요.": 6731f
 * 비주얼 컨셉: 수직 정렬 세 항목 [역사] [감정] [몸] STAGGER_MD 순서로 왼→오른 slide-in. 각 항목 앞에 SECONDARY 색 dot(인간 속성 표현). "알아요." 단어에 세 항목 전체 약해지는 fade(인간의 한계 암시).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene37: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const item1 = spring({ frame: frame - 93, fps, config: ANIMATION.SPRING_SNAPPY });
  const item2 = spring({ frame: frame - 124, fps, config: ANIMATION.SPRING_SNAPPY });
  const item3 = spring({ frame: frame - 164, fps, config: ANIMATION.SPRING_SNAPPY });
  
  const fadeOut = spring({ frame: frame - 189, fps, config: ANIMATION.SPRING_GENTLE });
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_48, opacity: 1 - fadeOut * 0.7 }}>
        {[
          { text: "역사", enter: item1 },
          { text: "감정", enter: item2 },
          { text: "몸", enter: item3 }
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 32, opacity: item.enter, transform: `translateX(${(1-item.enter)*-40}px)` }}>
            <div style={{ width: 20, height: 20, backgroundColor: COLORS.SECONDARY, borderRadius: "50%", boxShadow: EFFECTS.SHADOW_PRIMARY }} />
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>{item.text}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 38 기획안]
 * 원본 텍스트: 근데 AI한테는 그냥 "목표 달성에 가장 효율적인 옵션"인 거거든요.
 * 단어 등장 타이밍: "근데": 6776f, "AI한테는": 6803f, "그냥": 6832f, "\"목표": 6852f, "달성에": 6876f, "가장": 6907f, "효율적인": 6920f, "옵션\"인": 6959f, "거거든요.": 6988f
 * 비주얼 컨셉: 좌측 인간 항목들이 사라지고 우측에 AI 관점 UI 등장. 단순한 수치 비교: [OPTION A: 외교 — 효율 32%] [OPTION B: 핵 — 효율 98%]. "효율적인" 단어에서 OPTION B가 PRIMARY 색으로 선택됨. 감정 없는 최적화 알고리즘의 냉정함 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene38: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const enter = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const selectOptB = spring({ frame: frame - 144, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_48, opacity: enter, transform: `translateX(${(1-enter)*40}px)` }}>
        <div style={{ width: 600, padding: "32px 48px", backgroundColor: COLORS.BG_SURFACE, border: `3px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD, opacity: 1 - selectOptB * 0.5, transition: "opacity 0.3s" }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 24, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER }}>옵션 A</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: SPACING.PX_40, marginTop: 12 }}>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>외교</div>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB }}>효율 32%</div>
          </div>
        </div>
        
        <div style={{ width: 600, padding: "32px 48px", backgroundColor: selectOptB > 0 ? COLORS.STATE_WARN_BG : COLORS.BG_SURFACE, border: `3px solid ${selectOptB > 0 ? COLORS.PRIMARY : COLORS.STROKE_DEFAULT}`, borderRadius: SPACING.RADIUS_MD, transform: `scale(${1 + selectOptB * 0.05})`, boxShadow: selectOptB > 0 ? EFFECTS.SHADOW_PRIMARY : "none" }}>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 24, color: selectOptB > 0 ? COLORS.PRIMARY : COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER }}>옵션 B</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: SPACING.PX_40, marginTop: 12 }}>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 48, color: selectOptB > 0 ? COLORS.PRIMARY : COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>핵</div>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: selectOptB > 0 ? COLORS.PRIMARY : COLORS.STATE_WARN_FG }}>효율 98%</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 39 기획안]
 * 원본 텍스트: 도덕적 고뇌 없이, 망설임 없이, 그냥 최적화의 결과로 핵을 선택하는 겁니다.
 * 단어 등장 타이밍: "도덕적": 7043f, "고뇌": 7071f, "없이,": 7090f, "망설임": 7139f, "없이,": 7175f, "그냥": 7213f, "최적화의": 7223f, "결과로": 7258f, "핵을": 7278f, "선택하는": 7302f, "겁니다.": 7321f
 * 비주얼 컨셉: 배경 전체 BG_VOID로 전환. 중앙에 [NUCLEAR: SELECTED] 텍스트 박스가 NEGATIVE 색 테두리, NEGATIVE_DIM 배경으로 등장. "도덕적 고뇌 없이" "망설임 없이" 텍스트가 TEXT_DISABLED 색으로 취소선과 함께 위에서 차례로 fade-in 후 사라짐. "겁니다." 마지막 단어에서 NEGATIVE 색 전체 오버레이 flash 후 섹션 종료.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene39: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 60;
  
  const text1 = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const text2 = spring({ frame: frame - 96, fps, config: ANIMATION.SPRING_SNAPPY });
  const mainBox = spring({ frame: frame - 180, fps, config: ANIMATION.SPRING_BOUNCY });
  const flash = frame >= 278 ? 1 : 0;
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 200, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 40, color: COLORS.TEXT_SUB, textDecoration: "line-through", opacity: text1, transform: `translateY(${(1-text1)*-20}px)` }}>도덕적 고뇌 없이</div>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 40, color: COLORS.TEXT_SUB, textDecoration: "line-through", opacity: text2, transform: `translateY(${(1-text2)*-20}px)` }}>망설임 없이</div>
      </div>
      
      <div style={{ 
        padding: "48px 96px", 
        backgroundColor: COLORS.STATE_ERROR_BG, 
        border: `4px solid ${COLORS.STATE_ERROR_FG}`, 
        borderRadius: SPACING.RADIUS_LG, 
        opacity: mainBox, 
        transform: `scale(${mainBox})`,
        boxShadow: EFFECTS.SHADOW_PRIMARY
      }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.STATE_ERROR_FG, letterSpacing: FONTS.TRACKING_WIDER, marginBottom: 16, textAlign: "center" }}>상태</div>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.STATE_ERROR_FG, fontWeight: FONTS.WEIGHT_EXTRABOLD, letterSpacing: FONTS.TRACKING_WIDE }}>핵무기: 선택됨</div>
      </div>
      
      {flash > 0 && (
         <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.STATE_ERROR_FG, opacity: 0.6, mixBlendMode: "overlay" }} />
      )}
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={170}>
        <Scene1 />
      </Sequence>
      <Sequence from={170} durationInFrames={136}>
        <Scene2 />
      </Sequence>
      <Sequence from={306} durationInFrames={106}>
        <Scene3 />
      </Sequence>
      <Sequence from={412} durationInFrames={156}>
        <Scene4 />
      </Sequence>
      <Sequence from={568} durationInFrames={257}>
        <Scene5 />
      </Sequence>
      <Sequence from={825} durationInFrames={80}>
        <Scene6 />
      </Sequence>
      <Sequence from={905} durationInFrames={284}>
        <Scene7 />
      </Sequence>
      <Sequence from={1189} durationInFrames={287}>
        <Scene8 />
      </Sequence>
      <Sequence from={1476} durationInFrames={124}>
        <Scene9 />
      </Sequence>
      <Sequence from={1600} durationInFrames={164}>
        <Scene10 />
      </Sequence>
      <Sequence from={1764} durationInFrames={154}>
        <Scene11 />
      </Sequence>
      <Sequence from={1918} durationInFrames={264}>
        <Scene12 />
      </Sequence>
      <Sequence from={2182} durationInFrames={158}>
        <Scene13 />
      </Sequence>
      <Sequence from={2340} durationInFrames={264}>
        <Scene14 />
      </Sequence>
      <Sequence from={2604} durationInFrames={314}>
        <Scene15 />
      </Sequence>
      <Sequence from={2918} durationInFrames={104}>
        <Scene16 />
      </Sequence>
      <Sequence from={3022} durationInFrames={224}>
        <Scene17 />
      </Sequence>
      <Sequence from={3246} durationInFrames={282}>
        <Scene18 />
      </Sequence>
      <Sequence from={3528} durationInFrames={256}>
        <Scene19 />
      </Sequence>
      <Sequence from={3784} durationInFrames={374}>
        <Scene20 />
      </Sequence>
      <Sequence from={4158} durationInFrames={239}>
        <Scene21 />
      </Sequence>
      <Sequence from={4397} durationInFrames={114}>
        <Scene22 />
      </Sequence>
      <Sequence from={4511} durationInFrames={127}>
        <Scene23 />
      </Sequence>
      <Sequence from={4638} durationInFrames={145}>
        <Scene24 />
      </Sequence>
      <Sequence from={4783} durationInFrames={125}>
        <Scene25 />
      </Sequence>
      <Sequence from={4908} durationInFrames={128}>
        <Scene26 />
      </Sequence>
      <Sequence from={5036} durationInFrames={168}>
        <Scene27 />
      </Sequence>
      <Sequence from={5204} durationInFrames={328}>
        <Scene28 />
      </Sequence>
      <Sequence from={5532} durationInFrames={91}>
        <Scene29 />
      </Sequence>
      <Sequence from={5623} durationInFrames={76}>
        <Scene30 />
      </Sequence>
      <Sequence from={5699} durationInFrames={153}>
        <Scene31 />
      </Sequence>
      <Sequence from={5852} durationInFrames={167}>
        <Scene32 />
      </Sequence>
      <Sequence from={6019} durationInFrames={109}>
        <Scene33 />
      </Sequence>
      <Sequence from={6128} durationInFrames={254}>
        <Scene34 />
      </Sequence>
      <Sequence from={6382} durationInFrames={50}>
        <Scene35 />
      </Sequence>
      <Sequence from={6432} durationInFrames={110}>
        <Scene36 />
      </Sequence>
      <Sequence from={6542} durationInFrames={234}>
        <Scene37 />
      </Sequence>
      <Sequence from={6776} durationInFrames={267}>
        <Scene38 />
      </Sequence>
      <Sequence from={7043} durationInFrames={326}>
        <Scene39 />
      </Sequence>
    </AbsoluteFill>
  );
};
