import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, EASINGS, STAGGER } from "../theme";

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 283 frames): 붉은 버그들이 테스트 캡슐 안에 갇혀 소멸
  const capsuleScale = spring({
    frame,
    fps,
    config: SPRINGS.SMOOTH,
  });

  const bugCount = 8;
  const destroyAnims = Array.from({ length: bugCount }).map((_, i) =>
    interpolate(Math.max(0, frame - 30 - i * 10), [0, 20], [1, 0], { extrapolateRight: "clamp" })
  );

  // SubSeq 2 (283 ~ 806 frames): 100% 커버리지 & V 체크 표시 타다닥
  const sub2Frame = Math.max(0, frame - 283);
  const shieldAura = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.PUNCH,
  });

  const percentValue = Math.floor(interpolate(sub2Frame, [30, 150], [0, 100], { extrapolateRight: "clamp", easing: EASINGS.DRAMATIC }));

  const vChecks = 12; // 사방에 체크 표시
  const checkAnims = Array.from({ length: vChecks }).map((_, i) =>
    spring({
      frame: Math.max(0, sub2Frame - 150 - i * STAGGER.TIGHT),
      fps,
      config: SPRINGS.SNAPPY,
    })
  );

  // Cinematic Fade-out
  const fadeOut = interpolate(frame, [746, 806], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, opacity: fadeOut }}>
      
      {/* SubSeq 1: 테스트 캡슐 & 버그 소멸 */}
      <Sequence durationInFrames={283}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          
          <div style={{
            width: "600px", height: "400px",
            border: `6px solid ${COLORS.BORDER_STRONG}`,
            borderRadius: "40px",
            backgroundColor: COLORS.BG_SURFACE,
            transform: `scale(${capsuleScale})`,
            display: "flex", justifyContent: "center", alignItems: "center",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: "24px", fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.MD, color: COLORS.TEXT_MUTED }}>
              테스트 환경 격리
            </div>

            {/* 내부 버그들 */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center", padding: "60px" }}>
              {destroyAnims.map((opacity, i) => (
                <div key={i} style={{
                  width: "48px", height: "48px",
                  backgroundColor: COLORS.ACCENT,
                  borderRadius: "8px",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  opacity,
                  transform: `scale(${interpolate(opacity, [0, 1], [0.5, 1])})`,
                  boxShadow: `0 0 24px ${COLORS.ACCENT}`
                }}>
                  <span style={{ color: COLORS.TEXT_INVERSE, fontFamily: FONTS.MONO, fontWeight: "bold" }}>!</span>
                </div>
              ))}
            </div>
            
            {/* 레이저 스캔 (버그 삭제 효과) */}
            <div style={{
              position: "absolute", top: 0, bottom: 0, width: "10px",
              backgroundColor: COLORS.PRIMARY,
              boxShadow: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
              left: `${interpolate(frame, [30, 200], [0, 100], { extrapolateRight: "clamp" })}%`
            }} />
          </div>

        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2: 100% 커버리지 & V 체크 */}
      <Sequence from={283} durationInFrames={523}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            
            {/* 중심에 100% 커버리지 */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2
            }}>
              <div style={{
                fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.HERO,
                color: percentValue === 100 ? COLORS.POSITIVE : COLORS.TEXT_MAIN,
                textShadow: percentValue === 100 ? `0 0 48px ${COLORS.PRIMARY_GLOW}` : "none",
                transform: percentValue === 100 ? `scale(${spring({ frame: Math.max(0, sub2Frame - 150), fps, config: SPRINGS.PUNCH })})` : "none"
              }}>
                {percentValue}%
              </div>
              <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG, color: COLORS.TEXT_MUTED }}>커버리지</div>
            </div>

            {/* 배경 쉴드 아우라 */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: "800px", height: "800px", marginLeft: "-400px", marginTop: "-400px",
              borderRadius: "50%",
              border: `8px solid ${COLORS.POSITIVE}`,
              boxShadow: `inset 0 0 120px ${COLORS.POSITIVE}, 0 0 120px ${COLORS.POSITIVE}`,
              opacity: interpolate(shieldAura, [0, 1], [0, 0.6]),
              transform: `scale(${interpolate(shieldAura, [0, 1], [0.5, 1.2])})`,
              zIndex: 1
            }} />

            {/* 사방의 V 체크 마크들 */}
            {checkAnims.map((anim, i) => {
              const angle = (i * 360) / vChecks;
              const radius = 500;
              const rX = Math.cos((angle * Math.PI) / 180) * radius;
              const rY = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div key={i} style={{
                  position: "absolute",
                  left: "50%", top: "50%",
                  marginLeft: rX - 32, marginTop: rY - 32,
                  width: "64px", height: "64px",
                  borderRadius: "50%",
                  backgroundColor: COLORS.POSITIVE,
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.MD, color: COLORS.BG_DEEP,
                  fontWeight: "bold",
                  transform: `scale(${anim})`,
                  boxShadow: `0 0 24px ${COLORS.POSITIVE}`
                }}>
                  ✔
                </div>
              );
            })}

          </div>

        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
