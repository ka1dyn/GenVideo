import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS } from "../theme";

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 594 frames): 보일러플레이트 코드 뭉텅이 삭제 / 축척
  const collapseOp = interpolate(frame, [0, 60], [0, 1]);
  const boilerplateScale = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: SPRINGS.PUNCH,
    from: 1,
    to: 0.2, // 축소 (80% 감소 반영)
  });

  // SubSeq 2 (594 ~ 1165 frames): 아키텍처 확장 및 "3X" 수치 상승
  const sub2Frame = Math.max(0, frame - 594);
  const archScale = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.SNAPPY,
    from: 0,
    to: 1,
  });

  const numberPunch = spring({
    frame: Math.max(0, sub2Frame - 150),
    fps,
    config: SPRINGS.PUNCH,
  });

  // 가로 방향 찢어지는 화면 전환 (스와이프를 위한 클리핑)
  const swipeOut = interpolate(Math.max(0, frame - 1100), [0, 30], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_DEEP, 
      zIndex: Z.BG,
      clipPath: `inset(0 0 0 ${swipeOut}%)` // 오른쪽으로 화면 열리며 새 씬 준비
    }}>
      
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        
        {/* Left Side: 단순 반복 작업 (Before / Muted) */}
        <div style={{
          flex: 1, backgroundColor: COLORS.BG_SURFACE,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          borderRight: `2px solid ${COLORS.BORDER}`
        }}>
          <div style={{ fontFamily: FONTS.PRIMARY, fontSize: TEXT_SIZE.MD, color: COLORS.TEXT_MUTED, marginBottom: "40px" }}>
            보일러플레이트
          </div>
          
          {/* 부피가 줄어드는 상자 모형 */}
          <div style={{
            width: "300px", height: "400px",
            backgroundColor: COLORS.BG_ELEVATED,
            border: `2px dashed ${COLORS.TEXT_MUTED}`,
            display: "flex", justifyContent: "center", alignItems: "center",
            opacity: collapseOp,
            transform: `scale(${boilerplateScale})`,
            transformOrigin: "bottom center"
          }}>
            <span style={{ color: COLORS.NEGATIVE, fontSize: TEXT_SIZE.LG, fontFamily: FONTS.MONO }}>-80%</span>
          </div>
        </div>

        {/* Right Side: 창의적 아키텍처/비즈니스 시간 (After / Elevated/Primary) */}
        <div style={{
          flex: 1, backgroundColor: COLORS.BG_DEEP,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          position: "relative"
        }}>
          {frame > 594 && (
            <>
              <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.MD, color: COLORS.TEXT_MAIN, marginBottom: "40px", transform: `scale(${archScale})` }}>
                창의적 아키텍처
              </div>
              
              <div style={{
                width: "400px", height: "500px",
                backgroundColor: COLORS.PRIMARY_DIM,
                border: `4px solid ${COLORS.PRIMARY}`,
                boxShadow: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
                display: "flex", justifyContent: "center", alignItems: "center",
                transform: `scale(${archScale})`, // 등장
                transformOrigin: "bottom center"
              }}>
                {sub2Frame > 150 && (
                  <div style={{
                    fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.HERO,
                    color: COLORS.TEXT_MAIN,
                    textShadow: `0 0 24px ${COLORS.PRIMARY_GLOW}`,
                    transform: `scale(${interpolate(numberPunch, [0, 1], [0.5, 1])})`
                  }}>
                    <span style={{ color: COLORS.PRIMARY }}>3</span>X
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
