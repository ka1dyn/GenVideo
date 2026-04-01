import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, EASINGS } from "../theme";

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 626 frames): 확장 (확장) 빛줄기 및 결합
  const introOp = interpolate(frame, [0, 30], [0, 1]);
  
  const textScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: SPRINGS.PUNCH,
  });

  const expandX = interpolate(frame, [100, 300], [0, 300], { extrapolateRight: "clamp", easing: EASINGS.CINEMATIC });

  // SubSeq 2 (626 ~ 780 frames): 대비되는 색에서 하나로 융화
  const sub2Frame = Math.max(0, frame - 626);
  // 양 사이드가 중앙으로 결속됨
  const converge = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.PUNCH,
  });

  // Cinematic Fade 전환
  const fadeOut = interpolate(sub2Frame, [100, 154], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, opacity: fadeOut }}>
      {/* 뿜어져 나오는 빛 효과 */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: "100%", height: "100%",
        marginLeft: "-50%", marginTop: "-50%",
        background: `radial-gradient(circle, ${COLORS.PRIMARY_GLOW} 0%, transparent 60%)`,
        opacity: introOp,
      }} />

      {/* SubSeq 1: 확장 확장 텍스트 중앙 -> 상단 */}
      <Sequence durationInFrames={780}>
        <div style={{
          position: "absolute", width: "100%", top: "15%", textAlign: "center",
          fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.XL, color: COLORS.PRIMARY,
          letterSpacing: "8px", transform: `scale(${interpolate(textScale, [0, 1], [1.5, 1])})`,
          opacity: introOp, textShadow: `0 0 32px ${COLORS.PRIMARY_GLOW}`
        }}>
          확장
        </div>
      </Sequence>

      {/* 실루엣 두 개의 확장 ও 결속 */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: "800px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          
          {/* Human 아이콘 (좌) */}
          <div style={{
            position: "absolute",
            width: "160px", height: "160px", borderRadius: "50%",
            backgroundColor: frame < 626 ? COLORS.TEXT_MAIN : COLORS.PRIMARY,
            transform: `translateX(-${expandX - (converge * expandX * 0.5)}px)`,
            display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2,
            boxShadow: `0 0 24px ${frame < 626 ? "rgba(255,255,255,0.2)" : COLORS.PRIMARY_GLOW}`,
            
          }}>
            <div style={{ fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.SM, color: COLORS.BG_DEEP, fontWeight: "bold" }}>인간</div>
          </div>

          {/* 중앙 연결선 띠 */}
          <div style={{
            position: "absolute",
            width: `${(expandX - (converge * expandX * 0.5)) * 2}px`,
            height: "8px", backgroundColor: COLORS.PRIMARY,
            opacity: interpolate(frame, [200, 250], [0, 1]), // 띠는 중반부터 등장
            boxShadow: `0 0 16px ${COLORS.PRIMARY_GLOW}`
          }} />

          {/* AI 아이콘 (우) */}
          <div style={{
            position: "absolute",
            width: "160px", height: "160px", borderRadius: "50%",
            backgroundColor: COLORS.PRIMARY,
            transform: `translateX(${expandX - (converge * expandX * 0.5)}px)`,
            display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2,
            boxShadow: `0 0 48px ${COLORS.PRIMARY_GLOW}`
          }}>
             <div style={{ fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.SM, color: COLORS.BG_DEEP, fontWeight: "bold" }}>AI</div>
          </div>

        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
