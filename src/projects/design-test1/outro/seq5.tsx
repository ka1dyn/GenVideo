import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, EASINGS, STAGGER } from "../theme";

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 324 frames): 뻗어나가는 방사형 라인 & 역동적 아이디어 불꽃
  const coreScale = spring({
    frame,
    fps,
    config: SPRINGS.PUNCH,
  });

  const rayCount = 16;
  const rayAnims = Array.from({ length: rayCount }).map((_, i) =>
    spring({
      frame: Math.max(0, frame - 15 - i * STAGGER.TIGHT),
      fps,
      config: SPRINGS.SNAPPY,
    })
  );

  // SubSeq 2 (324 ~ 756 frames): 엔딩 카드 등장 및 잔상
  const sub2Frame = Math.max(0, frame - 324);
  const cardOp = interpolate(sub2Frame, [0, 60], [0, 1], { extrapolateRight: "clamp", easing: EASINGS.CINEMATIC });
  const cardScale = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.SMOOTH,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, overflow: "hidden" }}>
      
      {/* 백그라운드 빛무리 잔상 (점점 넓어짐) */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: "1500px", height: "1500px",
        marginLeft: "-750px", marginTop: "-750px",
        background: `radial-gradient(circle, ${COLORS.PRIMARY_GLOW} 0%, transparent ${interpolate(frame, [0, 756], [30, 80])}%)`,
        opacity: interpolate(frame, [600, 756], [1, 0.2]) // 끝으로 갈수록 빛이 약해짐
      }} />

      {/* SubSeq 1: 방사형 컴파일 (초반) */}
      <Sequence durationInFrames={324}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: interpolate(frame, [250, 324], [1, 0]) }}>
          
          <div style={{ position: "relative" }}>
            {/* 코어(뇌/아이디어) */}
            <div style={{
              width: "120px", height: "120px", borderRadius: "50%",
              backgroundColor: COLORS.TEXT_MAIN,
              boxShadow: `0 0 64px ${COLORS.PRIMARY_GLOW}`,
              transform: `scale(${interpolate(coreScale, [0, 1], [0.5, 1])})`,
              zIndex: 2,
            }} />

            {/* 방사형 라인들 (파이프/코드 연결) */}
            {rayAnims.map((anim, i) => {
              const angle = (i * 360) / rayCount;
              return (
                <div key={i} style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: `${interpolate(anim, [0, 1], [0, 600])}px`, // 선이 뻗어나감
                  height: "2px",
                  backgroundColor: i % 3 === 0 ? COLORS.SECONDARY : COLORS.PRIMARY,
                  transformOrigin: "left center",
                  transform: `rotate(${angle}deg)`,
                  zIndex: 1,
                  boxShadow: `0 0 16px ${COLORS.PRIMARY_GLOW}`
                }} />
              );
            })}
          </div>

        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2: 엔딩 썸네일/로고 카드 (중후반) */}
      {frame >= 324 && (
        <Sequence from={324} durationInFrames={432}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <div style={{
              width: "800px", height: "450px",
              backgroundColor: COLORS.BG_SURFACE,
              border: `4px solid ${COLORS.BORDER_STRONG}`,
              boxShadow: `0 0 96px rgba(0,0,0,0.8)`,
              borderRadius: "24px",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "24px",
              opacity: cardOp,
              transform: `scale(${interpolate(cardScale, [0, 1], [0.9, 1])})`
            }}>
              {/* 채널명 타이포 */}
              <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.XL, color: COLORS.TEXT_MAIN, letterSpacing: "4px" }}>
                NVIDIA <span style={{ color: COLORS.PRIMARY }}>테크 채널</span>
              </div>
              <div style={{ fontFamily: FONTS.PRIMARY, fontSize: TEXT_SIZE.SM, color: COLORS.TEXT_MUTED }}>
                좋아요 & 구독
              </div>
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

    </AbsoluteFill>
  );
};
