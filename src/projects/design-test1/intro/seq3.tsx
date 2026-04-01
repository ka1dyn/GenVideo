import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, STAGGER } from "../theme";

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 422 frames): 아키텍처 다이어그램 플로우
  const nodeCount = 5;
  const nodeAnimations = Array.from({ length: nodeCount }).map((_, i) =>
    spring({
      frame: Math.max(0, frame - i * STAGGER.LOOSE),
      fps,
      config: SPRINGS.SNAPPY,
    })
  );

  // SubSeq 2 (422 ~ 815 frames): "시니어 개발자" (Scale Punch)
  const sub2Frame = Math.max(0, frame - 422);
  const heroScale = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.PUNCH,
  });
  
  const radarRotation = (sub2Frame * 4) % 360;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG }}>
      
      {/* SubSeq 1 */}
      <Sequence durationInFrames={422}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: interpolate(frame, [400, 422], [1, 0]) }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            width: "1200px", height: "100%", position: "relative"
          }}>
            {/* 노드 연결선 */}
            <div style={{
              position: "absolute", top: "50%", left: "100px", right: "100px",
              height: "4px", backgroundColor: COLORS.BORDER_STRONG,
              transform: "translateY(-50%)", zIndex: 0,
              transformOrigin: "left",
              transformStyle: "preserve-3d",
              // 선이 그려지는 애니메이션
              clipPath: `inset(0 ${100 - interpolate(frame, [10, 60], [0, 100], { extrapolateRight: "clamp" })}% 0 0)`
            }} />

            {/* 노드들 컴포넌트 */}
            {nodeAnimations.map((anim, i) => (
              <div key={i} style={{
                width: "140px", height: "140px",
                backgroundColor: COLORS.BG_ELEVATED,
                border: `2px solid ${COLORS.PRIMARY}`,
                borderRadius: "50%",
                display: "flex", justifyContent: "center", alignItems: "center",
                zIndex: 1,
                transform: `scale(${anim})`,
                boxShadow: `0 0 24px ${COLORS.PRIMARY_GLOW}`,
                fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.SM, color: COLORS.PRIMARY
              }}>
                노드 {i + 1}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2 */}
      <Sequence from={422} durationInFrames={393}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          
          <div style={{ position: "relative", transform: `scale(${heroScale})` }}>
            {/* 방패 / 톱니바퀴 모형 (레이더) */}
            <div style={{
              width: "400px", height: "400px",
              borderRadius: "50%",
              border: `8px solid ${COLORS.PRIMARY}`,
              boxShadow: `0 0 96px ${COLORS.PRIMARY_GLOW}`,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* 레이더 스캔 선 */}
              <div style={{
                position: "absolute", top: 0, left: "50%",
                width: "50%", height: "50%",
                backgroundColor: COLORS.PRIMARY_GLOW,
                transformOrigin: "bottom left",
                transform: `rotate(${radarRotation}deg)`
              }} />
              
              {/* 글자 덮어쓰기 */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                display: "flex", justifyContent: "center", alignItems: "center",
                backgroundColor: "transparent",
                zIndex: 2,
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG, color: COLORS.TEXT_MAIN, textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>시니어</div>
                  <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG, color: COLORS.PRIMARY, textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>개발자</div>
                </div>
              </div>
            </div>
          </div>

        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
