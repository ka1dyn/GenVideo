import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONTS, ANIMATION, Z, EFFECTS, SPACING } from "../theme";
import { BackgroundGrid } from "../components/BackgroundGrid";
import { GlassCard } from "../components/GlassCard";
import { AISphere } from "../components/AISphere";
import { TextReveal } from "../components/TextReveal";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 웹 개발의 패러다임이 완전히 바뀌고 있습니다.
 * 비주얼 컨셉: 깨끗한 화이트 배경에 중앙 정렬된 타이포그래피 등장. 배경에는 옅은 BG_SURFACE 그리드 라인이 깔림.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 30f): 배경 그리드가 Opacity 0->1로 서서히 밝아지며, "웹 개발의 패러다임" 텍스트가 ANIMATION.ENTER_Y_MD 위치에서 위로 솟아오르며 등장.
 *  - 단계1 (30f ~ 110f): 텍스트에 미세한 ANIMATION.SCALE_EMPHASIS(1.04) 효과를 주어 생동감 부여. COLORS.PRIMARY 색상의 언더라인이 왼쪽에서 오른쪽으로 드로잉됨.
 *  - 퇴장 (110f ~ 끝): 텍스트와 그리드가 Opacity 1->0으로 페이드 아웃.
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const gridOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const entrySpr = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const yOffset = interpolate(entrySpr, [0, 1], [ANIMATION.ENTER_Y_MD, 0]);
  const textOpacity = interpolate(entrySpr, [0, 1], [0, 1]);

  const scalePulse = interpolate(
    frame,
    [30, 70, 110],
    [1, ANIMATION.SCALE_EMPHASIS, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const underlineWidth = interpolate(frame, [30, 60], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ transform: `translateY(${yOffset}px) scale(${scalePulse})`, opacity: textOpacity }}>
          <div style={{ 
            height: 8, 
            width: `${underlineWidth}px`, 
            backgroundColor: COLORS.PRIMARY, 
            borderRadius: SPACING.RADIUS_PILL,
            boxShadow: EFFECTS.GLOW_SM
          }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 과거에는 모든 컴포넌트를 바닥부터 직접 작성해야 했지만,
 * 비주얼 컨셉: 화면 왼쪽에 수많은 코드 라인(추상화된 코드 블록)이 쌓이는 연출. TEXT_MUTED 색상 사용.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 40f): 작은 사각형 코드 블록들이 ANIMATION.STAGGER_SM 간격으로 화면 왼쪽 하단에서 위로 무작위로 쌓임.
 *  - 단계1 (40f ~ 220f): 코드 블록들이 계속해서 복제되어 화면의 40%를 채움. 이때 "바닥부터 직접 작성" 텍스트가 강조됨.
 *  - 퇴장 (220f ~ 끝): 쌓인 코드 블록들이 아래로 빠르게 슬라이드하며 퇴장 (ANIMATION.ENTER_Y_LG).
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance code blocks
  const blocks = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    delay: i * ANIMATION.STAGGER_SM,
    x: (i % 10) * 40 + (Math.sin(i) * 20),
    y: Math.floor(i / 10) * 40 + (Math.cos(i) * 20),
    size: 20 + (i % 3) * 10
  }));

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      {/* Code Blocks Area */}
      <AbsoluteFill style={{ padding: SPACING.PX_64 }}>
        {blocks.map((block) => {
          const spr = spring({ frame: frame - block.delay, fps, config: ANIMATION.SPRING_GENTLE });
          const scale = interpolate(spr, [0, 1], [0, 1]);
          const opacity = interpolate(spr, [0, 1], [0, 0.4]);

          return (
            <div
              key={block.id}
              style={{
                position: 'absolute',
                left: block.x + 100,
                bottom: block.y + 200,
                width: block.size,
                height: block.size * 1.5,
                backgroundColor: COLORS.TEXT_DISABLED,
                borderRadius: SPACING.RADIUS_SM,
                opacity,
                transform: `scale(${scale})`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 이제는 AI가 우리의 가장 든든한 페어 프로그래머가 되었습니다.
 * 비주얼 컨셉: 화면 우측에 AI를 상징하는 빛나는 COLORS.PRIMARY 구체(Sphere) 등장. 복잡했던 코드 블록들이 정돈된 카드로 변함.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 50f): PRIMARY_GLOW 효과를 가진 구체가 중앙에서 팽창하며 등장. EFFECTS.GLOW_LG 적용.
 *  - 단계1 (50f ~ 220f): 구체 주변으로 FONTS.MONO 스타일의 'AI Suggestions' 텍스트 레이블이 궤도를 그리며 회전.
 *  - 퇴장 (220f ~ 끝): 구체가 화면 중앙으로 이동하며 다음 씬으로 연결되는 흰색 플래시 효과.
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpr = spring({ frame, fps, config: ANIMATION.SPRING_SNAPPY });
  const sphereScale = interpolate(entranceSpr, [0, 1], [0, 1]);
  
  const labels = ["AI Suggestions", "Smart Refactor", "Context Aware"];

  const flashOpacity = interpolate(frame, [durationInFrames - 10, durationInFrames], [0, 1], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ transform: `scale(${sphereScale})` }}>
          <AISphere size={300} />
          
          {labels.map((label, i) => {
            const angle = (frame * 0.02) + (i * (Math.PI * 2 / 3));
            const x = Math.cos(angle) * 220;
            const y = Math.sin(angle) * 220;
            const opacity = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp' });

            return (
              <GlassCard
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity,
                  whiteSpace: 'nowrap'
                }}
                padding={SPACING.PX_8}
              >
                <span style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_SM, color: COLORS.PRIMARY }}>
                  {label}
                </span>
              </GlassCard>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>

      {/* Transition Flash */}
      <AbsoluteFill style={{ backgroundColor: '#FFFFFF', opacity: flashOpacity, pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 디자인에서 개발로 넘어가는 과정의 병목현상도 눈에 띄게 사라졌습니다.
 * 비주얼 컨셉: 'Design' 섹션(Figma 아이콘 형태)과 'Dev' 섹션(VSCode 아이콘 형태) 사이의 흐릿한 막(병목)이 걷히는 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 'Design'과 'Dev' 아이콘이 양쪽 끝에서 중앙으로 접근. 둘 사이에 EFFECTS.GLASS_BLUR_HEAVY가 적용된 붉은색 막(ACCENT_DIM) 존재.
 *  - 단계1 (60f ~ 300f): 붉은색 막이 PRIMARY 색상으로 변하며 투명해짐. 두 아이콘 사이의 연결 선이 부드러운 펄스(ANIMATION.SPRING_GENTLE)와 함께 활성화됨.
 *  - 퇴장 (300f ~ 끝): 아이콘들이 화면 바깥으로 페이드 아웃.
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Icons approach
  const approachSpr = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const iconOffset = interpolate(approachSpr, [0, 1], [200, 50]);

  // Bottleneck barrier
  const barrierOpacity = interpolate(frame, [60, 100], [0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barrierColor = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barrierHex = barrierColor > 0.5 ? COLORS.PRIMARY : COLORS.ACCENT;

  const lineProgress = spring({ frame: frame - 80, fps, config: ANIMATION.SPRING_GENTLE });
  const lineOpacity = interpolate(lineProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        {/* Design Icon Placeholder */}
        <div style={{ transform: `translateX(-${iconOffset}px)`, opacity: approachSpr }}>
           <GlassCard padding={SPACING.PX_16} style={{ borderBottom: `4px solid ${COLORS.ACCENT}` }}>
             <span style={{ fontFamily: FONTS.DISPLAY, fontWeight: FONTS.WEIGHT_BOLD }}>Design</span>
           </GlassCard>
        </div>

        {/* Barrier */}
        <div style={{
          width: 4,
          height: 200,
          backgroundColor: barrierHex,
          boxShadow: barrierColor > 0.5 ? EFFECTS.GLOW_MD : EFFECTS.GLOW_ACCENT,
          opacity: barrierOpacity,
          margin: `0 ${SPACING.PX_32}px`,
          borderRadius: SPACING.RADIUS_PILL
        }} />

        {/* Dev Icon Placeholder */}
        <div style={{ transform: `translateX(${iconOffset}px)`, opacity: approachSpr }}>
           <GlassCard padding={SPACING.PX_16} style={{ borderBottom: `4px solid ${COLORS.PRIMARY}` }}>
             <span style={{ fontFamily: FONTS.DISPLAY, fontWeight: FONTS.WEIGHT_BOLD }}>Dev</span>
           </GlassCard>
        </div>

        {/* Connection Line */}
        <div style={{
          position: 'absolute',
          width: 300,
          height: 2,
          background: `linear-gradient(to right, ${COLORS.ACCENT}, ${COLORS.PRIMARY})`,
          opacity: lineOpacity,
          zIndex: -1
        }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 이제는 스케치 한 장이나 간단한 프롬프트만으로도 곧바로 작동하는 프로토타입이
 * 비주얼 컨셉: 빈 종이에 연필 스케치가 그려지고, 그 위로 COLORS.PRIMARY 색상의 프롬프트 창이 겹쳐지는 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 50f): 스케치 이미지(EFFECTS.SHADOW_MD)가 SCALE_ENTER에서 1로 커지며 등장.
 *  - 단계1 (50f ~ 320f): 프롬프트 입력창이 ANIMATION.STAGGER_MD를 따라 한 글자씩 타이핑됨. 입력이 완료되면 COLORS.POSITIVE 글로우가 한 번 번쩍임.
 *  - 퇴장 (320f ~ 끝): 스케치가 디지털 UI로 변모하며 다음 씬으로 전환.
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const sketchSpr = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const sketchScale = interpolate(sketchSpr, [0, 1], [ANIMATION.SCALE_ENTER, 1]);

  const promptText = "Build a modern dashboard with Next.js and Remotion...";
  const typedCount = Math.floor(interpolate(frame, [50, 300], [0, promptText.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const positiveGlow = interpolate(frame, [300, 310, 320], [0, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Sketch Image Placeholder */}
        <div style={{ 
          width: 600, 
          height: 400, 
          background: COLORS.BG_ELEVATED, 
          borderRadius: SPACING.RADIUS_LG,
          boxShadow: EFFECTS.SHADOW_MD,
          transform: `scale(${sketchScale})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}>
           <div style={{ color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_MD }}>Sketch Layout Area</div>
           
           {/* Prompt Input Over */}
           <AbsoluteFill style={{ justifyContent: 'flex-end', padding: SPACING.PX_32 }}>
             <GlassCard style={{ 
               width: '100%', 
               boxShadow: EFFECTS.GLOW_SM,
               border: positiveGlow > 0 ? `${SPACING.BORDER_NORMAL}px solid ${COLORS.POSITIVE}` : undefined
             }}>
                <div style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_SM, color: COLORS.PRIMARY }}>
                  {promptText.substring(0, typedCount)}
                  <span style={{ opacity: Math.floor(frame / 15) % 2 }}>|</span>
                </div>
             </GlassCard>
           </AbsoluteFill>
        </div>
        
        {/* Positive Glow Overlay */}
        <AbsoluteFill style={{ 
          backgroundColor: COLORS.POSITIVE, 
          opacity: positiveGlow * 0.2, 
          pointerEvents: 'none' 
        }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 생성되는 마법 같은 일이 일어납니다.
 * 비주얼 컨셉: 복잡한 코드 없이도 완성된 웹 페이지의 레이아웃이 순차적으로 조립되는 '마법' 효과.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 40f): PRIMARY 색상의 파티클들이 중앙으로 모여들며 UI 카드를 형성.
 *  - 단계1 (40f ~ 160f): 헤더, 히어로 섹션, 그리드 레이아웃이 위에서 아래로 ANIMATION.STAGGER_SM 속도로 스냅 인(SPRING_SNAPPY).
 *  - 퇴장 (160f ~ 끝): 조립된 UI가 흐릿해지며 배경으로 물러남.
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // UI Components assembly
  const sections = ["Header", "Hero", "Grid", "Footer"];
  
  const blurValue = interpolate(frame, [160, 198], [0, 20], { extrapolateLeft: 'clamp' });
  return (
    <AbsoluteFill style={{ filter: `blur(${blurValue}px)` }}>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ padding: SPACING.PX_64, gap: SPACING.PX_24, display: 'flex', flexDirection: 'column' }}>
        {sections.map((section, i) => {
          const spr = spring({ 
            frame: frame - (40 + i * ANIMATION.STAGGER_SM), 
            fps, 
            config: ANIMATION.SPRING_SNAPPY 
          });
          const y = interpolate(spr, [0, 1], [100, 0]);
          const op = interpolate(spr, [0, 1], [0, 1]);

          return (
            <GlassCard 
              key={section}
              style={{ 
                flex: section === 'Hero' ? 2 : 1,
                transform: `translateY(${y}px)`,
                opacity: op,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <span style={{ fontFamily: FONTS.DISPLAY, fontWeight: FONTS.WEIGHT_BOLD, color: COLORS.PRIMARY }}>
                {section} Component
              </span>
            </GlassCard>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 단순히 코드를 짜주는 것을 넘어, 시스템 아키텍처를 설계하고 최적화 포인트까지 제안합니다.
 * 비주얼 컨셉: 전체 시스템 구성도(Architecture Diagram)가 펼쳐지고, 특정 지점에 ACCENT 색상의 최적화 핀(Pin)이 꽂히는 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 둥근 사각형 노드들이 선으로 연결되며 다이어그램 구축. Opacity 0->1.
 *  - 단계1 (60f ~ 300f): 특정 노드 위에 Optimization 말풍선이 SPRING_BOUNCY 효과와 함께 팝업. 수치가 count-up 되며 최적화 지표 시각화.
 *  - 퇴장 (300f ~ 끝): 다이어그램이 우측으로 슬라이드하며 퇴장.
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpr = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  
  // Optimization Pin
  const pinSpr = spring({ frame: frame - 60, fps, config: ANIMATION.SPRING_BOUNCY });
  const pinScale = interpolate(pinSpr, [0, 1], [0, 1]);
  
  const optimizedValue = Math.floor(interpolate(pinSpr, [0, 1], [0, 42], { extrapolateRight: 'clamp' }));

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 600, height: 400, opacity: entranceSpr }}>
          {/* Architecture Nodes */}
          {[
            { x: 0, y: 0, label: "Frontend" },
            { x: 200, y: -100, label: "API Gateway" },
            { x: 200, y: 100, label: "Auth Service" },
            { x: 400, y: 0, label: "Database" }
          ].map((node, i) => (
            <GlassCard 
              key={i} 
              style={{ 
                position: 'absolute', 
                left: `calc(50% + ${node.x - 300}px)`, 
                top: `calc(50% + ${node.y - 50}px)`,
                width: 150,
                textAlign: 'center'
              }}
              padding={SPACING.PX_12}
            >
              <span style={{ fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD }}>{node.label}</span>
            </GlassCard>
          ))}
          
          {/* Optimization Pin */}
          <div style={{ 
            position: 'absolute', 
            left: 'calc(50% + 100px)', 
            top: 'calc(50% - 150px)',
            transform: `scale(${pinScale})`,
            zIndex: Z.UI
          }}>
            <GlassCard style={{ backgroundColor: COLORS.ACCENT, border: 'none' }} padding={SPACING.PX_12}>
               <div style={{ color: COLORS.TEXT_INVERSE, fontSize: FONTS.SIZE_SM, fontWeight: FONTS.WEIGHT_BOLD }}>
                 Optimization: +{optimizedValue}%
               </div>
            </GlassCard>
            <div style={{ 
              width: 0, 
              height: 0, 
              borderLeft: '10px solid transparent', 
              borderRight: '10px solid transparent', 
              borderTop: `15px solid ${COLORS.ACCENT}`,
              margin: '0 auto'
            }} />
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 마치 수십 년 경력의 시니어 개발자가 항상 내 옆에 앉아 코드를 리뷰해 주는 것과 같죠.
 * 비주얼 컨셉: 코드 에디터 옆에 PRIMARY 색상의 'Senior AI' 프로필 아이콘과 말풍선이 등장하여 따뜻한 신뢰감 형성.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 코드 에디터 창이 화면 좌측에 배치되고, 우측 공간에서 AI 어시스턴트 아이콘이 ANIMATION.ENTER_X_MD 위치에서 등장.
 *  - 단계1 (60f ~ 340f): 말풍선에 "Good catch! Check this pattern." 이라는 텍스트가 서서히 타이핑됨. TEXT_BODY의 부드러운 페이드.
 *  - 퇴장 (340f ~ 끝): 화면 전체가 부드러운 화이트로 전환.
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const assistantSpr = spring({ 
    frame, 
    fps, 
    config: ANIMATION.SPRING_GENTLE 
  });
  const assistantX = interpolate(assistantSpr, [0, 1], [ANIMATION.ENTER_X_MD, 0]);

  const message = "Good catch! Check this pattern.";
  const typedCount = Math.floor(interpolate(frame, [60, 150], [0, message.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'row', padding: SPACING.PX_64, alignItems: 'center', gap: SPACING.PX_48 }}>
        {/* Editor Placeholder */}
        <GlassCard style={{ flex: 1.5, height: '60%', backgroundColor: COLORS.BG_VOID }} padding={SPACING.PX_32}>
           <div style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_SM, color: COLORS.TEXT_MUTED }}>
             <div style={{ width: '80%', height: 10, backgroundColor: COLORS.BORDER, marginBottom: 8 }} />
             <div style={{ width: '60%', height: 10, backgroundColor: COLORS.BORDER, marginBottom: 8 }} />
             <div style={{ width: '70%', height: 10, backgroundColor: COLORS.PRIMARY_DIM, marginBottom: 8 }} />
             <div style={{ width: '90%', height: 10, backgroundColor: COLORS.BORDER, marginBottom: 8 }} />
           </div>
        </GlassCard>

        {/* Senior AI Assistant */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateX(${assistantX}px)`, opacity: assistantSpr }}>
          <AISphere size={120} glowSize={30} />
          <div style={{ marginTop: SPACING.PX_24 }}>
            <GlassCard style={{ borderLeft: `${SPACING.PX_4}px solid ${COLORS.PRIMARY}` }}>
              <span style={{ fontFamily: FONTS.PRIMARY, fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_BODY }}>
                {message.substring(0, typedCount)}
              </span>
            </GlassCard>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 이러한 변화는 단순히 개인의 코딩 속도를 높이는 것을 넘어,
 * 비주얼 컨셉: '개인'을 상징하는 단일 아이콘에서 수많은 연결선이 뻗어 나가는 확장 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 40f): 중앙의 단일 점이 ANIMATION.SPRING_GENTLE로 커짐.
 *  - 단계1 (40f ~ 220f): 점에서 수십 개의 선이 360도 방향으로 뻗어 나가며 화면을 가득 채움. 선들의 끝에는 TEXT_MUTED 아이콘들이 작게 배치됨.
 *  - 퇴장 (220f ~ 끝): 모든 선이 한 방향(오른쪽)으로 흐르며 사라짐.
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const coreSpr = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const coreScale = interpolate(coreSpr, [0, 1], [0, 1]);

  const expansionProgress = interpolate(frame, [40, 220], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Core Point */}
        <div style={{ 
          width: 40, 
          height: 40, 
          borderRadius: '50%', 
          backgroundColor: COLORS.PRIMARY, 
          transform: `scale(${coreScale})`,
          boxShadow: EFFECTS.GLOW_MD,
          zIndex: 2
        }} />

        {/* Expansion Lines */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const length = expansionProgress * 400;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: length,
                height: 2,
                backgroundColor: COLORS.PRIMARY_GLOW,
                transformOrigin: 'left center',
                transform: `rotate(${angle}deg)`,
                opacity: expansionProgress * 0.5
              }}
            >
              {/* Tip Icon */}
              <div style={{ 
                position: 'absolute', 
                right: -10, 
                top: -10, 
                width: 20, 
                height: 20, 
                borderRadius: '50%', 
                backgroundColor: COLORS.BG_ELEVATED,
                border: `1px solid ${COLORS.BORDER}`,
                opacity: expansionProgress
              }} />
            </div>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 팀 전체의 애자일한 협업 방식을 근본적으로 재정의하고 있습니다.
 * 비주얼 컨셉: 여러 명의 팀원 아이콘이 SECONDARY(Emerald) 색상의 원안에 모여 역동적인 순환 궤도를 그리는 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 50f): 팀원 아이콘 5개가 사방에서 중앙으로 모여들며 SPRING_BOUNCY 진입.
 *  - 단계1 (50f ~ 170f): 아이콘들이 SECONDARY_DIM 색상의 궤도를 따라 회전하며 서로 데이터를 주고받는 펄스 효과 발산.
 *  - 퇴장 (170f ~ 끝): 궤도가 커지며 페이드 아웃.
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const orbitRadius = interpolate(frame, [0, 50, 170, 213], [0, 150, 180, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Orbit Path */}
        <div style={{ 
          width: orbitRadius * 2, 
          height: orbitRadius * 2, 
          borderRadius: '50%', 
          border: `2px dashed ${COLORS.SECONDARY_DIM}`,
          position: 'absolute'
        }} />

        {/* Team Members */}
        {Array.from({ length: 5 }).map((_, i) => {
          const delay = i * ANIMATION.STAGGER_SM;
          const spr = spring({ frame: frame - delay, fps, config: ANIMATION.SPRING_BOUNCY });
          const angle = (frame * 0.05) + (i * (Math.PI * 2 / 5));
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: COLORS.BG_SURFACE,
                border: `2px solid ${COLORS.SECONDARY}`,
                transform: `translate(${x}px, ${y}px) scale(${spr})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: EFFECTS.SHADOW_SM
              }}
            >
               <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: COLORS.SECONDARY_DIM }} />
            </div>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 우리는 더 빠르게 실패하고, 더 빨리 혁신할 수 있게 되었습니다.
 * 비주얼 컨셉: 'Failure'(Red) 아이콘이 빠르게 사라진 후 그 자리에서 'Innovation'(Emerald) 불꽃이 피어오르는 강렬한 전환.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 좌측엔 NEGATIVE 색상의 'X' 표시, 우측엔 POSITIVE 색상의 번개 표시 등장.
 *  - 단계1 (60f ~ 230f): 'X' 표시가 깨지듯 파편화되며 사라지고, 번개 표시가 ANIMATION.SPRING_SNAPPY로 화면 전체로 확장. EFFECTS.GLOW_LG 적용.
 *  - 퇴장 (230f ~ 끝): 불꽃 잔상이 남으며 암전 없이 화이트 배경 유지.
 */
const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const shatterSpr = spring({ frame: frame - 60, fps, config: ANIMATION.SPRING_SNAPPY });
  const shatterScale = interpolate(shatterSpr, [0, 1], [1, 2]);
  const shatterOpacity = interpolate(shatterSpr, [0, 1], [1, 0]);

  const lightningSpr = spring({ frame: frame - 80, fps, config: ANIMATION.SPRING_SNAPPY });
  const lightningScale = interpolate(lightningSpr, [0, 1], [0.5, 4]);
  const lightningOpacity = interpolate(lightningSpr, [0.3, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 200 }}>
        {/* Failure 'X' */}
        <div style={{ 
          fontSize: 120, 
          color: COLORS.NEGATIVE, 
          fontWeight: '900',
          transform: `scale(${shatterScale})`,
          opacity: shatterOpacity,
          filter: `drop-shadow(${EFFECTS.GLOW_ACCENT})`
        }}>
          ✕
        </div>

        {/* Innovation Lightning */}
        <div style={{ 
          fontSize: 120, 
          color: COLORS.POSITIVE, 
          transform: `scale(${lightningScale})`,
          opacity: lightningOpacity,
          filter: `drop-shadow(${EFFECTS.GLOW_LG})`,
          zIndex: lightningSpr > 0.8 ? Z.TOP : Z.UI
        }}>
          ⚡
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 유명한 개발자는 이렇게 말했습니다.
 * 비주얼 컨셉: 화면 중앙에 커다란 따옴표(PRIMARY_MID)가 배치되고 인용을 예고하는 정숙한 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 40f): 큰 따옴표 아이콘이 ANIMATION.SCALE_ENTER에서 1로 커지며 중앙 등장.
 *  - 단계1 (40f ~ 130f): 배경이 아주 미묘하게 BG_VOID로 어두워지며 텍스트에만 시선 집중.
 *  - 퇴장 (130f ~ 끝): 따옴표가 상단으로 올라가며 본문 텍스트 공간 확보.
 */
const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const quoteSpr = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const quoteScale = interpolate(quoteSpr, [0, 1], [ANIMATION.SCALE_ENTER, 1]);
  
  const bgDim = interpolate(frame, [40, 100], [0, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, opacity: bgDim }} />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ 
          fontSize: 200, 
          fontFamily: FONTS.DISPLAY, 
          color: COLORS.PRIMARY_MID, 
          transform: `scale(${quoteScale})`,
          opacity: quoteSpr
        }}>
          “
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ bottom: 150, height: "auto", justifyContent: 'center', alignItems: 'center' }}>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 미래의 코딩은 타이핑이 아니라 대화가 될 것이다.
 * 비주얼 컨셉: 타이핑되는 커서 소리가 잦아들며 텍스트가 아닌 음성 파형(Waveform)이 역동적으로 움직이는 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 50f): 텍스트가 STATIC하게 먼저 나타나고, 그 아래로 PRIMARY 색상의 오디오 파형 등장.
 *  - 단계1 (50f ~ 180f): 파형이 SPRING_BOUNCY를 따라 출렁이며 "대화"라는 키워드에 맞춰 COLORS.PRIMARY로 색상 반전.
 *  - 퇴장 (180f ~ 끝): 파형이 직선으로 모이며 다음 결론 씬으로 연결.
 */
const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const waveProgress = interpolate(frame, [0, durationInFrames], [0, 1]);
  
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_48 }}>
           {/* Waveform Visualizer */}
           <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 100 }}>
             {Array.from({ length: 40 }).map((_, i) => {
               const offset = i * 0.2;
               const h = interpolate(
                 Math.sin(frame * 0.2 + offset),
                 [-1, 1],
                 [10, 80]
               ) * (frame > 180 ? interpolate(frame, [180, 220], [1, 0.1]) : 1);

               return (
                 <div
                   key={i}
                   style={{
                     width: 6,
                     height: h,
                     backgroundColor: COLORS.PRIMARY,
                     borderRadius: 3,
                     opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp' })
                   }}
                 />
               );
             })}
           </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 결국 우리에게 가장 필요한 역량은 타건 속도가 아니라, 문제를 정의하고 AI를 지휘하는 기획력이 될 것입니다.
 * 비주얼 컨셉: 키보드를 상징하는 그리드 위로 지휘봉(Conductor)의 궤적이 흐르며 전체 화면이 조화로운 오케스트라처럼 구성되는 피날레.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 80f): 하단에 흐릿한 키보드 레이아웃 유령 이미지가 생기고, 중앙에 "기획력" 텍스트가 EFFECTS.GLOW_LG와 함께 거대하게 등장.
 *  - 단계1 (80f ~ 450f): PRIMARY와 SECONDARY 파티클들이 "기획력" 단어 주변을 화려하게 맴돌며 상승. 텍스트가 ANIMATION.DUR_XL 동안 서서히 커짐.
 *  - 퇴장 (450f ~ 끝): 화면이 화이트 아웃되며 인트로 종료.
 */
const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpr = spring({ frame, fps, config: ANIMATION.SPRING_GENTLE });
  const textScale = interpolate(frame, [80, 450], [1, 1.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const whiteOut = interpolate(frame, [450, 532], [0, 1], { extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      {/* Ghost Keyboard */}
      <AbsoluteFill style={{ opacity: 0.1, justifyContent: 'flex-end', paddingBottom: 100 }}>
        <div style={{ 
          width: '80%', 
          height: 300, 
          margin: '0 auto', 
          border: `2px solid ${COLORS.BORDER}`,
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: 10,
          padding: 20
        }}>
          {Array.from({ length: 30 }).map((_, i) => <div key={i} style={{ backgroundColor: COLORS.BORDER, borderRadius: 4 }} />)}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ transform: `scale(${textScale})`, opacity: entranceSpr }}>
          <h1 style={{ 
            fontSize: FONTS.SIZE_4XL, 
            fontFamily: FONTS.DISPLAY, 
            color: COLORS.PRIMARY,
            textAlign: 'center',
            textShadow: EFFECTS.GLOW_TEXT_LG
          }}>
            기획력
          </h1>
          <p style={{ textAlign: 'center', color: COLORS.TEXT_MUTED, fontSize: FONTS.SIZE_MD, marginTop: SPACING.PX_16 }}>
            The New Core Competency
          </p>
        </div>

        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const moveY = interpolate(frame, [80, 450], [0, -800]);
          const driftX = Math.sin(frame * 0.02 + i) * 100;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: i % 2 === 0 ? COLORS.PRIMARY : COLORS.SECONDARY,
                bottom: 200,
                left: `calc(50% + ${Math.cos(i) * 300 + driftX}px)`,
                transform: `translateY(${moveY}px)`,
                opacity: 0.6,
                filter: `blur(2px)`
              }}
            />
          );
        })}
      </AbsoluteFill>
      
      <AbsoluteFill style={{ backgroundColor: '#FFFFFF', opacity: whiteOut, pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
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
      <Sequence from={1003} durationInFrames={372}>
        <Scene5 />
      </Sequence>
      <Sequence from={1375} durationInFrames={198}>
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
      <Sequence from={3448} durationInFrames={532}>
        <Scene14 />
      </Sequence>
    </AbsoluteFill>
  );
};
