import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS } from "../theme";

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 356 frames): 병목현상 게이지가 터지는 연출
  const sub1Progress = spring({
    frame,
    fps,
    config: SPRINGS.SMOOTH,
    from: 0,
    to: 1,
    durationInFrames: 60,
  });
  
  const bottleneckExpand = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: SPRINGS.PUNCH,
    from: 0,
    to: 1,
    durationInFrames: 30,
  });

  // SubSeq 2 (356 ~ 852 frames): 거친 스케치 -> UI 변모
  const sub2Frame = Math.max(0, frame - 356);
  
  const drawWireframe = interpolate(sub2Frame, [0, 60], [0, 100], { extrapolateRight: "clamp" });
  
  const magicSpring = spring({
    frame: Math.max(0, sub2Frame - 100),
    fps,
    config: { damping: 14, stiffness: 180 },
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG }}>
      
      {/* SubSeq 1 */}
      <Sequence durationInFrames={356}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {/* 패널 배경 */}
          <div style={{
            width: "800px", height: "400px",
            backgroundColor: COLORS.BG_SURFACE,
            borderRadius: "24px",
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            boxShadow: `0 20px 40px rgba(0,0,0,0.8)`,
            transform: `translateY(${interpolate(sub1Progress, [0, 1], [50, 0])}px)`,
            opacity: sub1Progress,
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ fontSize: TEXT_SIZE.MD, fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MUTED, marginBottom: "40px" }}>
              개발 병목 현상
            </div>
            
            {/* 게이지 바 */}
            <div style={{ width: "80%", height: "24px", backgroundColor: COLORS.BG_ELEVATED, borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ 
                width: `${interpolate(frame, [60, 150], [10, 100], { extrapolateRight: "clamp" })}%`, 
                height: "100%", 
                backgroundColor: COLORS.ACCENT 
              }} />
            </div>

            {/* 터지는 효과 (게이지 폭발) */}
            {frame > 150 && (
              <div style={{
                position: "absolute",
                width: "100%", height: "100%",
                backgroundColor: COLORS.ACCENT,
                opacity: interpolate(bottleneckExpand, [0, 1], [0.8, 0]),
                transform: `scale(${interpolate(bottleneckExpand, [0, 1], [1, 1.5])})`
              }} />
            )}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2 */}
      <Sequence from={356} durationInFrames={496}>
        <AbsoluteFill style={{ 
          opacity: interpolate(sub2Frame, [0, 20], [0, 1]), // Fade In
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "80px"
        }}>
          
          {/* 거친 스케치 / 와이어프레임 박스 */}
          <div style={{
            width: "500px", height: "600px",
            border: `4px dashed ${COLORS.TEXT_MUTED}`,
            borderRadius: "16px",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            opacity: interpolate(magicSpring, [0, 0.5], [1, 0]), // 프로토타입 등장 시 사라짐
            clipPath: `inset(0 ${100 - drawWireframe}% 0 0)` // 좌에서 우로 그려지는 효과
          }}>
            <div style={{ color: COLORS.TEXT_MUTED, fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG }}>스케치</div>
          </div>

          {/* 중앙 화살표 / Magic */}
          <div style={{
            fontFamily: FONTS.DISPLAY,
            fontSize: TEXT_SIZE.XL,
            color: COLORS.PRIMARY,
            textShadow: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
            transform: `scale(${magicSpring})`,
            opacity: magicSpring
          }}>
            →
          </div>

          {/* 완성된 프로토타입 UI 박스 */}
          <div style={{
            width: "500px", height: "600px",
            backgroundColor: COLORS.BG_ELEVATED,
            borderRadius: "16px",
            border: `1px solid ${COLORS.BORDER_STRONG}`,
            boxShadow: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
            transform: `scale(${interpolate(magicSpring, [0, 1], [0.8, 1])})`,
            opacity: magicSpring,
            display: "flex", flexDirection: "column",
            overflow: "hidden"
          }}>
            {/* Mock Header */}
            <div style={{ height: "60px", backgroundColor: COLORS.PRIMARY_DIM, borderBottom: `1px solid ${COLORS.BORDER_STRONG}` }} />
            {/* Mock Content */}
            <div style={{ flex: 1, padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ width: "60%", height: "32px", backgroundColor: COLORS.PRIMARY, borderRadius: "4px" }} />
              <div style={{ width: "100%", height: "16px", backgroundColor: COLORS.TEXT_MUTED, borderRadius: "2px", opacity: 0.3 }} />
              <div style={{ width: "80%", height: "16px", backgroundColor: COLORS.TEXT_MUTED, borderRadius: "2px", opacity: 0.3 }} />
              
              <div style={{ marginTop: "auto", width: "100%", height: "200px", backgroundColor: COLORS.BG_SURFACE, borderRadius: "8px" }} />
            </div>
          </div>

        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
