import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS } from "../theme";

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 136 frames): "패러다임 SHIFT" 텍스트 Slam In.
  const shiftSlam = spring({
    frame,
    fps,
    config: SPRINGS.PUNCH,
    durationInFrames: 30, // 0.5초
  });
  
  const glitchOpacity = frame % 4 < 2 && frame < 15 ? 1 : 0;
  
  // SubSeq 2 (136 ~ 393 frames): 코딩 화면(IDE) 애니메이션 & TEXT_MUTED
  // 여기서 frame - 136 활용
  const ideFrame = Math.max(0, frame - 136);
  const ideFadeIn = interpolate(ideFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  
  // IDE 라인 Stagger
  const codeLines = [
    '<Component id="legacy" />',
    'function build() {',
    '  return "Manual process"',
    '}',
  ];

  // SubSeq 3 (393 ~ 647 frames): 화면 가득 PRIMARY_GLOW & AI 페어 프로그래머
  const aiFrame = Math.max(0, frame - 393);
  const glowScale = spring({
    frame: aiFrame,
    fps,
    config: SPRINGS.PUNCH,
    from: 0.1,
    to: 1,
    durationInFrames: 45,
  });
  const textScale = spring({
    frame: aiFrame,
    fps,
    config: SPRINGS.PUNCH,
    from: 0.8,
    to: 1,
  });
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, zIndex: Z.BG }}>
      
      {/* SubSeq 1 */}
      <Sequence durationInFrames={136}>
        <AbsoluteFill style={{ 
          justifyContent: "center", 
          alignItems: "center",
          opacity: frame < 10 ? glitchOpacity : 1,
          transform: `scale(${interpolate(shiftSlam, [0, 1], [1.5, 1])})`
        }}>
          <h1 style={{ 
            fontFamily: FONTS.DISPLAY, 
            fontSize: TEXT_SIZE.HERO, 
            color: COLORS.TEXT_MAIN, 
            textAlign: "center",
            textShadow: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
            margin: 0,
            lineHeight: 0.9,
          }}>
            패러다임<br />
            <span style={{ color: COLORS.PRIMARY }}>전환</span>
          </h1>
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2 */}
      <Sequence from={136} durationInFrames={257}>
        <AbsoluteFill style={{ opacity: ideFadeIn, justifyContent: "center", paddingLeft: "15%", backgroundColor: COLORS.BG_DEEP }}>
          <div style={{ 
            display: 'flex', flexDirection: 'column', gap: '24px',
            fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.MD, color: COLORS.TEXT_MUTED
          }}>
            {codeLines.map((line, idx) => {
              const lineOp = interpolate(ideFrame - idx * 10, [0, 5], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
              return (
                <div key={idx} style={{ opacity: lineOp }}>
                  {line}
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 3 */}
      <Sequence from={393} durationInFrames={254}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: COLORS.BG_VOID }}>
          {/* Radial Glow */}
          <div style={{
            position: "absolute",
            width: "120vh", height: "120vh",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.PRIMARY_GLOW} 0%, transparent 70%)`,
            transform: `scale(${glowScale})`,
            opacity: interpolate(aiFrame, [200, 254], [1, 0]) // Fade out at the end
          }} />
          
          <div style={{ 
            fontFamily: FONTS.DISPLAY, 
            fontSize: TEXT_SIZE.XXL, 
            lineHeight: 1.1,
            color: COLORS.TEXT_MAIN, 
            textAlign: "center",
            transform: `scale(${textScale})`
          }}>
            AI 페어<br />
            <span style={{ color: COLORS.PRIMARY }}>프로그래머</span>
          </div>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
