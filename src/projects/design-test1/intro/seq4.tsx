import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, STAGGER } from "../theme";

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 479 frames): 팀 네트워크(Floating panels)
  
  
  // SubSeq 2 (479 ~ 749 frames): "빠른 실패, 빠른 혁신" 
  const sub2Frame = Math.max(0, frame - 479);
  const words = ["빠른 실패,", "빠른 혁신"];
  const wordAnims = words.map((_, i) =>
    spring({
      frame: Math.max(0, sub2Frame - i * STAGGER.NORMAL),
      fps,
      config: SPRINGS.PUNCH,
    })
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, perspective: 1200 }}>
      
      {/* SubSeq 1 */}
      <Sequence durationInFrames={479}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          
          <div style={{ position: "relative", width: "800px", height: "600px", transformStyle: "preserve-3d", transform: `rotateX(45deg) rotateZ(30deg) translateZ(${interpolate(frame, [0, 479], [0, 800])}px)` }}>
            {/* 연결된 다중 플로팅 노드들 */}
            {[0, 1, 2, 3].map((idx) => {
              const panelOp = interpolate(frame, [0, 30], [0, 1]);
              const pX = idx % 2 === 0 ? "10%" : "70%";
              const pY = idx < 2 ? "10%" : "70%";
              return (
                <div key={idx} style={{
                  position: "absolute",
                  left: pX, top: pY,
                  width: "150px", height: "150px",
                  backgroundColor: COLORS.BG_ELEVATED,
                  opacity: panelOp,
                  border: `2px solid ${COLORS.PRIMARY_DIM}`,
                  boxShadow: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
                  transform: `translateY(${Math.sin((frame * Math.PI) / 60 + idx) * 20}px)`,
                  display: "flex", justifyContent: "center", alignItems: "center",
                }}>
                  <div style={{ width: "40%", height: "40%", backgroundColor: COLORS.PRIMARY, borderRadius: "50%", boxShadow: `0 0 24px ${COLORS.PRIMARY}` }} />
                </div>
              );
            })}
          </div>

        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2 */}
      <Sequence from={479} durationInFrames={270}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: COLORS.BG_VOID }}>
          <div style={{ 
            display: "flex", flexDirection: "column", gap: "24px", 
            textAlign: "center"
          }}>
            {words.map((word, i) => (
              <h2 key={i} style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: TEXT_SIZE.XL,
                color: i === 0 ? COLORS.TEXT_MAIN : COLORS.PRIMARY,
                margin: 0,
                textShadow: i === 1 ? `0 0 64px ${COLORS.PRIMARY_GLOW}` : "none",
                transform: `scale(${wordAnims[i]})`
              }}>
                {word}
              </h2>
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
