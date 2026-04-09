import React from "react";
import { AbsoluteFill, Sequence, spring, interpolateColors, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme";
import { FlowBox } from "../components/FlowBox";
import { DrawLine } from "../components/DrawLine";
import { FlashOverlay } from "../components/FlashOverlay";
import { StatusTag } from "../components/StatusTag";
import { CounterText } from "../components/CounterText";
import { TimelineBar } from "../components/TimelineBar";
import { QuotePanel } from "../components/QuotePanel";

/**
 * [Scene 1 기획안]
 * ...
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgInterpolation = interpolateColors(
    frame,
    [0, 20],
    [COLORS.BG_DARKEST, COLORS.BG_BASE]
  );

  const breakingEnter = spring({ frame: frame - 0, fps, config: ANIMATION.SPRING_SNAPPY });
  const dateEnter = spring({ frame: frame - 31, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: bgInterpolation }}>
      {/* Top Section */}
      <div style={{ position: "absolute", top: 100, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_16 }}>
        <div style={{ transform: `translateX(${(1 - breakingEnter) * -100}px)`, opacity: breakingEnter }}>
          <StatusTag label="속보" bgColor={COLORS.PRIMARY} textColor={COLORS.BG_DARKEST} borderColor={COLORS.PRIMARY} showDot dotColor={COLORS.BG_DARKEST} startFrame={0} />
        </div>
        <div style={{ transform: `translateY(${(1 - dateEnter) * 10}px)`, opacity: dateEnter, fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER }}>
          2025.02
        </div>
      </div>

      {/* Center Flow */}
      <div style={{ position: "absolute", top: "40%", left: 0, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 0 }}>
        <div style={{ zIndex: Z.CONTENT + 1 }}>
          <FlowBox title="미국" subtitle="US" borderColor={COLORS.PRIMARY} isActive={false} delay={47} />
        </div>
        <div style={{ width: 250, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           <DrawLine startFrame={47} durationInFrames={36} color={COLORS.STROKE_DEFAULT} thickness={SPACING.BORDER_THICK} direction="ltr" />
        </div>
        <div style={{ zIndex: Z.CONTENT + 1 }}>
          <FlowBox title="이란" subtitle="IR" borderColor={COLORS.STATE_ERROR_FG} isActive={frame >= 109} delay={83} glowColor={COLORS.STATE_ERROR_BG} />
        </div>
      </div>

      {frame >= 109 && <FlashOverlay startFrame={109} durationInFrames={15} color={COLORS.STATE_ERROR_FG} maxOpacity={0.15} />}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * ...
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timerEnter = spring({ frame: frame - 0, fps, config: ANIMATION.SPRING_GENTLE });
  const counterEnter = spring({ frame: frame - 117, fps, config: ANIMATION.SPRING_SNAPPY });
  const labelEnter = spring({ frame: frame - 205, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Top Timer Bar */}
      <div style={{ position: "absolute", top: 60, width: "100%", display: "flex", justifyContent: "center", transform: `translateY(${(1 - timerEnter) * -20}px)`, opacity: timerEnter }}>
         <StatusTag label="1H 카운트다운" borderColor={COLORS.STATE_ERROR_FG} textColor={COLORS.STATE_ERROR_FG} showDot dotColor={COLORS.STATE_ERROR_FG} bgColor={COLORS.STATE_ERROR_BG} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", transform: `translateY(-30px)` }}>
        <div style={{ transform: `scale(${counterEnter})`, opacity: counterEnter, boxShadow: EFFECTS.SHADOW_PRIMARY }}>
          <CounterText from={0} to={1000} startFrame={117} durationInFrames={88} suffix="+" color={COLORS.STATE_ERROR_FG} fontSize={FONTS.SIZE_4XL} fontWeight={FONTS.WEIGHT_EXTRABOLD} />
        </div>
        
        <div style={{ transform: `translateY(${(1 - counterEnter) * 10}px)`, opacity: counterEnter, fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER, marginTop: SPACING.PX_16 }}>
          타격된 표적
        </div>
      </div>

      {/* Source */}
      <div style={{ position: "absolute", bottom: 180, right: 60, opacity: labelEnter }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 24, color: COLORS.TEXT_SUB }}>
          출처: 외신 보도
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * ...
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const divisionEnter = spring({ frame: frame - 11, fps, config: ANIMATION.SPRING_SNAPPY });
  const resultEnter = spring({ frame: frame - 51, fps, config: ANIMATION.SPRING_BOUNCY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", transform: `translateY(-30px)` }}>
        <div style={{ boxShadow: EFFECTS.SHADOW_PRIMARY, color: COLORS.STATE_ERROR_FG, fontSize: FONTS.SIZE_4XL, fontWeight: FONTS.WEIGHT_EXTRABOLD, fontFamily: FONTS.DISPLAY }}>
          1000+
        </div>
        <div style={{ transform: `translateY(${(1 - divisionEnter) * 10}px)`, opacity: divisionEnter, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_SUB, marginTop: SPACING.PX_16 }}>
          ÷ 24H
        </div>
        <div style={{ transform: `translateY(${(1 - resultEnter) * 10}px) scale(${resultEnter})`, opacity: resultEnter, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_XL, color: COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_BOLD, marginTop: SPACING.PX_24, textShadow: EFFECTS.SHADOW_PRIMARY }}>
          = 41+ / hr
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * ...
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textEnter = spring({ frame: frame - 0, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_MUTED, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity: textEnter, transform: `translateY(${(1 - textEnter) * 10}px)`, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_XL, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_MEDIUM }}>
        예전이라면요?
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * ...
 */
const Scene5: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", transform: "translateY(-30px)" }}>
        <TimelineBar
          label="과거"
          delay={0}
          expandDelay={91}
          duration={27}
          color={COLORS.STATE_WARN_FG}
          maxWidth={700}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * ...
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 0, transform: "translateY(-30px)" }}>
        {/* 데이터 검토 (35f) */}
        <div style={{ zIndex: Z.CONTENT + 1 }}>
          <FlowBox title="데이터 검토" borderColor={COLORS.BG_MUTED} isActive={false} delay={35} />
        </div>
        
        {/* 연결 지연 */}
        <div style={{ width: 140, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           <DrawLine startFrame={72} durationInFrames={25} color={COLORS.STROKE_DEFAULT} thickness={2} direction="ltr" />
        </div>

        {/* 회의 (97f) */}
        <div style={{ zIndex: Z.CONTENT + 1 }}>
          <FlowBox title="회의" borderColor={COLORS.BG_MUTED} isActive={false} delay={97} />
        </div>

        {/* 연결 지연 */}
        <div style={{ width: 140, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           <DrawLine startFrame={120} durationInFrames={24} color={COLORS.STROKE_DEFAULT} thickness={2} direction="ltr" />
        </div>

        {/* 결재 (144f) */}
        <div style={{ zIndex: Z.CONTENT + 1 }}>
          <FlowBox title="결재" borderColor={COLORS.BG_MUTED} isActive={false} delay={144} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * ...
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgTINT = spring({ frame: frame - 47, fps, config: ANIMATION.SPRING_GENTLE });
  const textEnter = spring({ frame: frame - 47, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.PRIMARY, opacity: bgTINT * 0.1 }} />
      <div style={{ zIndex: 1, opacity: textEnter, transform: `scale(${textEnter})`, fontFamily: FONTS.DISPLAY, fontSize: 48, color: COLORS.PRIMARY, fontWeight: FONTS.WEIGHT_BOLD, boxShadow: EFFECTS.SHADOW_PRIMARY }}>
        달랐다는 거예요.
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * ...
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sourceEnter = spring({ frame: frame - 0, fps, config: ANIMATION.SPRING_GENTLE });
  const reutersEnter = spring({ frame: frame - 21, fps, config: ANIMATION.SPRING_SNAPPY });
  const apEnter = spring({ frame: frame - 35, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", top: 100, left: 100, backgroundColor: COLORS.BG_SURFACE, padding: SPACING.PX_24, borderRadius: SPACING.RADIUS_MD, border: `2px solid ${COLORS.STROKE_DEFAULT}`, display: "flex", flexDirection: "column", gap: SPACING.PX_16, opacity: sourceEnter, transform: `translateX(${(1 - sourceEnter) * -20}px)` }}>
        <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 32, color: COLORS.TEXT_SUB, letterSpacing: FONTS.TRACKING_WIDER }}>
          출처
        </div>
        <div style={{ display: "flex", gap: SPACING.PX_12 }}>
          <div style={{ opacity: reutersEnter, transform: `scale(${reutersEnter})` }}>
            <StatusTag label="REUTERS" bgColor={COLORS.BG_MUTED} textColor={COLORS.TEXT_MAIN} />
          </div>
          <div style={{ opacity: apEnter, transform: `scale(${apEnter})` }}>
            <StatusTag label="AP NEWS" bgColor={COLORS.BG_MUTED} textColor={COLORS.TEXT_MAIN} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * ...
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const aiTINT = spring({ frame: frame - 185, fps, config: ANIMATION.SPRING_GENTLE });
  const aiTag = spring({ frame: frame - 185, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.PRIMARY_LIGHT, opacity: aiTINT * 0.3 }} />

      <div style={{ position: "absolute", top: 80, width: "100%", display: "flex", justifyContent: "center", opacity: aiTag, transform: `translateY(${(1 - aiTag) * -20}px)` }}>
         <StatusTag label="AI-DRIVEN" bgColor={COLORS.PRIMARY_LIGHT} textColor={COLORS.PRIMARY} borderColor={COLORS.PRIMARY} showDot dotColor={COLORS.PRIMARY} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 0, transform: "translateY(-30px)" }}>
        <div style={{ zIndex: Z.CONTENT + 1 }}>
          <FlowBox title="정보 수집" borderColor={COLORS.PRIMARY} isActive={true} delay={0} glowColor={COLORS.PRIMARY} />
        </div>
        
        <div style={{ width: 140, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           <DrawLine startFrame={20} durationInFrames={30} color={COLORS.PRIMARY} thickness={SPACING.BORDER_THICK} direction="ltr" />
        </div>

        {frame >= 66 && (
          <div style={{ zIndex: Z.CONTENT + 1 }}>
            <FlowBox title="표적 선정" borderColor={COLORS.PRIMARY} isActive={true} delay={66} glowColor={COLORS.PRIMARY} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * ...
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const droneDataEnter = frame >= 58;
  const priorityEnter = frame >= 161;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 0, transform: "translateY(-30px)" }}>
        
        {/* Left: Input */}
        <div style={{ width: 140, display: "flex", alignItems: "center", justifyContent: "flex-end", zIndex: Z.CONTENT }}>
          {droneDataEnter && (
            <div style={{ marginRight: SPACING.PX_16 }}>
              <StatusTag label="드론 데이터" bgColor={COLORS.BG_MUTED} />
            </div>
          )}
        </div>
        <div style={{ width: 100, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           {frame >= 78 && <DrawLine startFrame={78} durationInFrames={20} color={COLORS.PRIMARY} thickness={SPACING.BORDER_NORMAL} direction="ltr" />}
        </div>

        {/* Center: Palantir */}
        <div style={{ zIndex: Z.CONTENT + 1 }}>
          <FlowBox title="Palantir" borderColor={COLORS.PRIMARY} isActive={true} delay={0} glowColor={frame >= 119 ? COLORS.PRIMARY : "transparent"} />
        </div>
        
        {/* Right: Output */}
        <div style={{ width: 100, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           {frame >= 161 && <DrawLine startFrame={161} durationInFrames={20} color={COLORS.PRIMARY} thickness={SPACING.BORDER_NORMAL} direction="ltr" />}
        </div>
        <div style={{ width: 200, display: "flex", alignItems: "center", justifyContent: "flex-start", zIndex: Z.CONTENT, paddingLeft: SPACING.PX_16 }}>
          {priorityEnter && (
             <div style={{ display: "flex", flexDirection: "column", gap: SPACING.PX_8 }}>
                <StatusTag label="#1 우선순위 목록" borderColor={COLORS.SECONDARY} textColor={COLORS.SECONDARY} startFrame={161} />
                {frame >= 180 && <StatusTag label="#2 표적 데이터" borderColor={COLORS.STROKE_DEFAULT} textColor={COLORS.TEXT_MAIN} startFrame={180} />}
             </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * ...
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const claudeEnter = spring({ frame: frame - 0, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Same Palantir flow from Scene 10 but dimmed/moved up */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, position: "absolute", top: "30%", width: "100%", opacity: 0.4 }}>
        <div style={{ width: 140, display: "flex", justifyContent: "flex-end", marginRight: SPACING.PX_16 }}><StatusTag label="드론 데이터" bgColor={COLORS.BG_MUTED} /></div>
        <div style={{ width: 100, margin: "0 -20px" }}><DrawLine color={COLORS.PRIMARY} /></div>
        <div style={{ zIndex: Z.CONTENT + 1 }}><FlowBox title="Palantir" borderColor={COLORS.PRIMARY} isActive={false} /></div>
        <div style={{ width: 100, margin: "0 -20px" }}><DrawLine color={COLORS.PRIMARY} /></div>
        <div style={{ width: 200, paddingLeft: SPACING.PX_16 }}><StatusTag label="#1 우선순위 목록" borderColor={COLORS.SECONDARY} textColor={COLORS.SECONDARY} /></div>
      </div>

      {/* Claude flow below */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, position: "absolute", top: "55%", width: "100%", transform: `translateY(${(1 - claudeEnter) * 20}px)`, opacity: claudeEnter }}>
        {/* Left: Input */}
        <div style={{ width: 140, display: "flex", alignItems: "center", justifyContent: "flex-end", zIndex: Z.CONTENT }}>
          {frame >= 53 && (
            <div style={{ marginRight: SPACING.PX_16, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: SPACING.PX_4 }}>
              <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 14, color: COLORS.TEXT_SUB }}>시나리오</div>
              <CounterText from={0} to={50000} startFrame={53} durationInFrames={40} suffix="+" color={COLORS.TEXT_MAIN} fontSize={FONTS.SIZE_MD} fontWeight={FONTS.WEIGHT_BOLD} />
            </div>
          )}
        </div>
        <div style={{ width: 100, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           {frame >= 85 && <DrawLine startFrame={85} durationInFrames={20} color={COLORS.SECONDARY} thickness={SPACING.BORDER_NORMAL} direction="ltr" />}
        </div>

        {/* Center: Claude */}
        <div style={{ zIndex: Z.CONTENT + 1 }}>
          <FlowBox title="Claude" borderColor={COLORS.SECONDARY} isActive={true} delay={0} glowColor={frame >= 181 ? COLORS.SECONDARY : "transparent"} />
        </div>
        
        {/* Right: Output */}
        <div style={{ width: 100, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           {frame >= 213 && <DrawLine startFrame={213} durationInFrames={20} color={COLORS.SECONDARY} thickness={SPACING.BORDER_NORMAL} direction="ltr" />}
        </div>
        <div style={{ width: 200, display: "flex", alignItems: "center", justifyContent: "flex-start", zIndex: Z.CONTENT, paddingLeft: SPACING.PX_16 }}>
          {frame >= 213 && (
             <StatusTag label="최적의 시나리오" borderColor={COLORS.SECONDARY} textColor={COLORS.SECONDARY} startFrame={213} bgColor={COLORS.PRIMARY_LIGHT} />
          )}
        </div>
      </div>
      
      {/* Target 지휘부 */}
      {frame >= 213 && (
         <div style={{ position: "absolute", top: "50%", right: "8%", transform: "translateY(-50%)" }}>
           <FlowBox title="지휘부" subtitle="COMMAND" borderColor={COLORS.STROKE_DEFAULT} isActive={false} delay={213} />
         </div>
      )}
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * ...
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flashEnter = spring({ frame: frame - 0, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* Background frozen from previous - just a dim overlay over it */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.BG_DARKEST, opacity: 0.8 }} />
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <div style={{ 
          transform: `scale(${flashEnter})`,
          opacity: flashEnter,
          border: `2px solid ${COLORS.STATE_WARN_FG}`,
          backgroundColor: COLORS.BG_SURFACE,
          padding: `${SPACING.PX_32}px ${SPACING.PX_64}px`,
          borderRadius: SPACING.RADIUS_MD,
          boxShadow: EFFECTS.SHADOW_PRIMARY,
          fontFamily: FONTS.DISPLAY, 
          fontSize: FONTS.SIZE_XL, 
          color: COLORS.TEXT_MAIN, 
          fontWeight: FONTS.WEIGHT_BOLD 
        }}>
          잠깐, {frame >= 42 ? "클로드요?" : ""}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * ...
 */
const Scene13: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_2XL, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_EXTRABOLD }}>
        네.
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * ...
 */
const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftEnter = spring({ frame: frame - 0, fps, config: ANIMATION.SPRING_SNAPPY });
  const rightEnter = spring({ frame: frame - 52, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 0 }}>
        
        {/* Left */}
        <div style={{ transform: `scale(${leftEnter})`, opacity: leftEnter, zIndex: Z.CONTENT + 1, position: "relative" }}>
          <div style={{ position: "absolute", top: -40, width: "100%", textAlign: "center" }}>
            <StatusTag label="일상 AI" bgColor={COLORS.PRIMARY_LIGHT} textColor={COLORS.PRIMARY} borderColor="transparent" />
          </div>
          <FlowBox title="Claude" borderColor={COLORS.PRIMARY} isActive={false} />
        </div>

        {/* Line connection */}
        <div style={{ width: 150, display: "flex", alignItems: "center", margin: "0 -20px", zIndex: Z.CONTENT }}>
           {frame >= 134 && <DrawLine startFrame={134} durationInFrames={16} color={COLORS.PRIMARY} thickness={SPACING.BORDER_THICK} direction="ltr" />}
        </div>

        {/* Right */}
        <div style={{ transform: `scale(${rightEnter})`, opacity: rightEnter, zIndex: Z.CONTENT + 1, position: "relative" }}>
           <div style={{ position: "absolute", top: -40, width: "100%", textAlign: "center" }}>
             <StatusTag label="군사 AI" bgColor={COLORS.STATE_ERROR_BG} textColor={COLORS.STATE_ERROR_FG} borderColor="transparent" />
          </div>
          <FlowBox title="Claude" borderColor={COLORS.STATE_ERROR_FG} isActive={false} />
        </div>

      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 15 기획안]
 * ...
 */
const Scene15: React.FC = () => {
  const frame = useCurrentFrame();

  const bgInterp = interpolateColors(
    frame,
    [0, 73],
    [COLORS.BG_BASE, COLORS.BG_DARKEST]
  );
  
  const opacityInterp = interpolate(frame, [0, 73], [1, 0], { extrapolateRight: "clamp" });
  
  // Blinking cursor every 30 frames
  const cursorOpacity = Math.floor(frame / 30) % 2 === 0 ? 1 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: bgInterp, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 0, opacity: opacityInterp }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: -40, width: "100%", textAlign: "center" }}><StatusTag label="일상 AI" bgColor={COLORS.PRIMARY_LIGHT} textColor={COLORS.PRIMARY} borderColor="transparent" /></div>
          <FlowBox title="Claude" borderColor={COLORS.PRIMARY} isActive={false} />
        </div>
        <div style={{ width: 150, margin: "0 -20px" }}><DrawLine color={COLORS.PRIMARY} thickness={SPACING.BORDER_THICK} /></div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: -40, width: "100%", textAlign: "center" }}><StatusTag label="군사 AI" bgColor={COLORS.STATE_ERROR_BG} textColor={COLORS.STATE_ERROR_FG} borderColor="transparent" /></div>
          <FlowBox title="Claude" borderColor={COLORS.STATE_ERROR_FG} isActive={false} />
        </div>
      </div>

      <div style={{ position: "absolute", opacity: cursorOpacity, fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_2XL, color: COLORS.TEXT_MAIN, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        |
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 16 기획안]
 * ...
 */
const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftEnter = spring({ frame: frame - 29, fps, config: ANIMATION.SPRING_GENTLE });
  const rightEnter = spring({ frame: frame - 108, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, display: "flex", flexDirection: "row" }}>
      {/* Left: 일상 */}
      <div style={{ flex: 1, height: "100%", backgroundColor: COLORS.PRIMARY_LIGHT, opacity: leftEnter, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <StatusTag label="일상" bgColor="transparent" textColor={COLORS.PRIMARY} borderColor="transparent" fontSize={FONTS.SIZE_LG} />
      </div>

      {/* Right: 전쟁 */}
      <div style={{ 
        flex: 1, 
        height: "100%", 
        backgroundColor: COLORS.STATE_ERROR_BG, 
        opacity: rightEnter, 
        boxShadow: frame >= 108 ? `inset 0 0 0 6px ${COLORS.STATE_WARN_FG}` : "none",
        borderLeft: `2px solid ${COLORS.STROKE_DEFAULT}`,
        display: "flex", justifyContent: "center", alignItems: "center" 
      }}>
        <StatusTag label="전쟁" bgColor="transparent" textColor={COLORS.STATE_ERROR_FG} borderColor="transparent" fontSize={FONTS.SIZE_LG} />
      </div>

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: Z.CONTENT }}>
         <FlowBox title="Claude" borderColor={COLORS.BG_SURFACE} isActive={false} />
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 17 기획안]
 * ...
 */
const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelEnter = spring({ frame: frame - 66, fps, config: ANIMATION.SPRING_SNAPPY });
  const textEnter = spring({ frame: frame - 163, fps, config: ANIMATION.SPRING_GENTLE });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: SPACING.PX_32 }}>
        <div style={{ 
          transform: `scale(${labelEnter})`, 
          opacity: labelEnter, 
          border: `2px solid ${COLORS.STATE_WARN_FG}`, 
          backgroundColor: COLORS.BG_SURFACE,
          padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`,
          fontFamily: FONTS.DISPLAY,
          fontSize: 48,
          color: COLORS.TEXT_MAIN,
          letterSpacing: FONTS.TRACKING_WIDER,
          textTransform: "uppercase"
        }}>
          기밀 작전
        </div>
        <div style={{ 
          transform: `translateY(${(1 - textEnter) * 10}px)`, 
          opacity: textEnter, 
          fontFamily: FONTS.DISPLAY,
          fontSize: 32,
          color: COLORS.TEXT_SUB
        }}>
          공식 확인되지 않은 정보입니다
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 18 기획안]
 * ...
 */
const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textEnter = spring({ frame: frame - 133, fps, config: ANIMATION.SPRING_GENTLE });
  const disclaimerEnter = spring({ frame: frame - 0, fps, config: ANIMATION.SPRING_SNAPPY });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <QuotePanel startFrame={0} showQuoteMark={true}>
          <div style={{ display: "flex", alignItems: "center", gap: SPACING.PX_16 }}>
             <div style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG, color: COLORS.TEXT_MAIN, fontWeight: FONTS.WEIGHT_BOLD }}>
               외신 보도에 따르면
             </div>
          </div>
        </QuotePanel>
      </div>
    </AbsoluteFill>
  );
};

/**
 * [Scene 19 기획안]
 * ...
 */
const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const asIsEnter = spring({ frame: frame - 46, fps, config: ANIMATION.SPRING_GENTLE });
  const conveyEnter = spring({ frame: frame - 122, fps, config: ANIMATION.SPRING_GENTLE });
  const bgTINT = spring({ frame: frame - 46, fps, config: { damping: 200, stiffness: 20, mass: 1 } });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.PRIMARY, opacity: bgTINT * 0.1 }} />
      
      <div style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: SPACING.PX_16 }}>
        <div style={{ 
          opacity: asIsEnter, 
          transform: `translateY(${(1 - asIsEnter) * 10}px)`, 
          fontFamily: FONTS.DISPLAY, 
          fontSize: FONTS.SIZE_XL, 
          color: COLORS.TEXT_MAIN, 
          fontWeight: FONTS.WEIGHT_BOLD 
        }}>
          있는 그대로
        </div>
        <div style={{ 
          opacity: conveyEnter, 
          transform: `translateY(${(1 - conveyEnter) * 10}px)`, 
          fontFamily: FONTS.DISPLAY, 
          fontSize: FONTS.SIZE_MD, 
          color: COLORS.TEXT_MAIN 
        }}>
          전달드리는 거예요.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={164}>
        <Scene1 />
      </Sequence>
      <Sequence from={164} durationInFrames={324}>
        <Scene2 />
      </Sequence>
      <Sequence from={488} durationInFrames={107}>
        <Scene3 />
      </Sequence>
      <Sequence from={595} durationInFrames={60}>
        <Scene4 />
      </Sequence>
      <Sequence from={655} durationInFrames={191}>
        <Scene5 />
      </Sequence>
      <Sequence from={846} durationInFrames={194}>
        <Scene6 />
      </Sequence>
      <Sequence from={1040} durationInFrames={207}>
        <Scene7 />
      </Sequence>
      {/* <Sequence from={1159} durationInFrames={88}>
        <Scene8 />
      </Sequence> */}
      <Sequence from={1247} durationInFrames={363}>
        <Scene9 />
      </Sequence>
      <Sequence from={1610} durationInFrames={299}>
        <Scene10 />
      </Sequence>
      <Sequence from={1909} durationInFrames={306}>
        <Scene11 />
      </Sequence>
      <Sequence from={2215} durationInFrames={103}>
        <Scene12 />
      </Sequence>
      <Sequence from={2318} durationInFrames={20}>
        <Scene13 />
      </Sequence>
      <Sequence from={2338} durationInFrames={192}>
        <Scene14 />
      </Sequence>
      <Sequence from={2530} durationInFrames={150}>
        <Scene15 />
      </Sequence>
      <Sequence from={2680} durationInFrames={276}>
        <Scene16 />
      </Sequence>
      <Sequence from={2956} durationInFrames={282}>
        <Scene17 />
      </Sequence>
      <Sequence from={3238} durationInFrames={200}>
        <Scene18 />
      </Sequence>
      <Sequence from={3438} durationInFrames={217}>
        <Scene19 />
      </Sequence>
    </AbsoluteFill>
  );
};
