import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate , random } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, EASINGS } from "../theme";

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 180 frames): 좌우 스플릿 Slam In
  const slamLeft = spring({
    frame,
    fps,
    config: SPRINGS.PUNCH,
  });
  const slamRight = spring({
    frame: Math.max(0, frame - 5), // 약간의 엇박자
    fps,
    config: SPRINGS.PUNCH,
  });

  // SubSeq 2 (180 ~ 840 frames): 암전 & [TAB] 승인
  const sub2Frame = Math.max(0, frame - 180);
  const leftDim = interpolate(sub2Frame, [0, 60], [1, 0.2], { extrapolateRight: "clamp" });
  const rightExpand = interpolate(sub2Frame, [120, 180], [50, 100], { extrapolateRight: "clamp", easing: EASINGS.CINEMATIC }); // width % 확대

  const tabAcceptSpring = spring({
    frame: Math.max(0, sub2Frame - 150),
    fps,
    config: SPRINGS.SNAPPY,
  });
  const checkSpring = spring({
    frame: Math.max(0, sub2Frame - 210), // TAB 누르고 1초(60) 후 체크
    fps,
    config: SPRINGS.PUNCH,
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG,
      flexDirection: "row" // 스플릿 레이아웃
    }}>
      
      {/* Before 화면 (좌측) */}
      <Sequence durationInFrames={840}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: `${100 - rightExpand}%`,
          backgroundColor: COLORS.BG_SURFACE,
          borderRight: `4px solid ${COLORS.BORDER_STRONG}`,
          transform: `translateX(${interpolate(slamLeft, [0, 1], [-200, 0])}px)`,
          opacity: leftDim,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          overflow: "hidden"
        }}>
          <div style={{ color: COLORS.TEXT_MUTED, fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.MD, marginBottom: "40px" }}>수동 타이핑</div>
          {/* 가상의 잡다한 코드 / 문서 */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} style={{
              width: `${random(null) * 40 + 20}%`, height: "12px",
              backgroundColor: COLORS.BORDER, marginBottom: "12px",
              alignSelf: "flex-start", marginLeft: "20%"
            }} />
          ))}
        </div>
      </Sequence>

      {/* After 화면 (우측) */}
      <Sequence durationInFrames={840}>
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: `${rightExpand}%`,
          backgroundColor: COLORS.BG_ELEVATED,
          transform: `translateX(${interpolate(slamRight, [0, 1], [200, 0])}px)`,
          opacity: slamRight,
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          overflow: "hidden"
        }}>
          
          <div style={{ 
            color: COLORS.PRIMARY, fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG, 
            marginBottom: "40px", textShadow: `0 0 24px ${COLORS.PRIMARY_GLOW}`
          }}>
            AI 제안
          </div>

          <div style={{ position: "relative" }}>
            {/* 코드 자동완성 블록 */}
            <div style={{
              padding: "32px", border: `2px dashed ${COLORS.PRIMARY_GLOW}`, borderRadius: "16px",
              backgroundColor: COLORS.BG_SURFACE, color: COLORS.TEXT_MAIN, fontFamily: FONTS.MONO,
              display: "flex", flexDirection: "column", gap: "16px"
            }}>
              <div>function implementAI() {'{'}</div>
              <div style={{ paddingLeft: "32px", color: COLORS.SECONDARY }}>return <span style={{ opacity: 0.8 }}>...awesome code;</span></div>
              <div>{'}'}</div>
            </div>

            {/* TAB Accept 패널 */}
            <div style={{
              position: "absolute", bottom: "-30px", right: "-40px",
              padding: "16px 24px", backgroundColor: COLORS.TEXT_MAIN, borderRadius: "8px",
              fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.SM, color: COLORS.TEXT_INVERSE,
              boxShadow: `0 12px 24px rgba(0,0,0,0.5)`,
              transform: `scale(${tabAcceptSpring})`,
              display: "flex", alignItems: "center", gap: "12px"
            }}>
              <span>[TAB] 승인</span>
              {checkSpring > 0 && (
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  backgroundColor: COLORS.PRIMARY, display: "flex", justifyContent: "center", alignItems: "center",
                  color: COLORS.TEXT_INVERSE, fontSize: "16px", fontWeight: "bold",
                  transform: `scale(${checkSpring})`
                }}>✔</div>
              )}
            </div>
          </div>

        </div>
      </Sequence>

    </AbsoluteFill>
  );
};
