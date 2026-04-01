import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS } from "../theme";

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 228 frames): 버그 아이콘 팝업 & 쉴드 차단
  const bugCount = 5;
  const bugAnims = Array.from({ length: bugCount }).map((_, i) =>
    spring({
      frame: Math.max(0, frame - i * 5),
      fps,
      config: SPRINGS.SNAPPY,
    })
  );

  const shieldActiveFrame = 100;
  const shieldScale = spring({
    frame: Math.max(0, frame - shieldActiveFrame),
    fps,
    config: SPRINGS.PUNCH,
  });

  // 쉴드가 켜지면 버그들이 튕겨 나가는 효과
  const bugBounce = interpolate(Math.max(0, frame - shieldActiveFrame), [0, 30], [0, 200], { extrapolateRight: "clamp" });

  // SubSeq 2 (228 ~ 890 frames): "-90%" 에러율 Slam In, "STABLE"
  const sub2Frame = Math.max(0, frame - 228);
  const ninetyScale = spring({
    frame: Math.max(0, sub2Frame - 30),
    fps,
    config: SPRINGS.DRAMATIC,
  });

  const stableSpring = spring({
    frame: Math.max(0, sub2Frame - 150),
    fps,
    config: SPRINGS.PUNCH,
  });
  
  // Cinematic Fade Out 마지막
  const finalDim = interpolate(frame, [800, 890], [1, 0.1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, opacity: finalDim }}>
      
      {/* SubSeq 1 */}
      <Sequence durationInFrames={228}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* 버그 아이콘들 (랜덤하게 날아오는 것처럼 배치) */}
            {bugAnims.map((anim, i) => {
              const sign = i % 2 === 0 ? 1 : -1;
              const yOffset = frame > shieldActiveFrame ? bugBounce * sign : 0;
              return (
                <div key={i} style={{
                  position: "absolute",
                  left: `${20 + i * 15}%`, top: "30%",
                  width: "120px", height: "60px",
                  backgroundColor: COLORS.NEGATIVE,
                  borderRadius: "8px",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontFamily: FONTS.MONO, color: COLORS.TEXT_INVERSE, fontWeight: "bold",
                  transform: `scale(${anim}) translateY(${yOffset}px)`,
                  opacity: frame > shieldActiveFrame + 30 ? 0 : 1, // 튕겨나간 후 사라짐
                  boxShadow: `0 4px 12px ${COLORS.NEGATIVE}`
                }}>
                  버그 {i+1}
                </div>
              );
            })}

            {/* Shield 차단선 */}
            {frame > shieldActiveFrame && (
              <div style={{
                position: "absolute", left: "10%", right: "10%", top: "45%", height: "12px",
                backgroundColor: COLORS.POSITIVE,
                borderRadius: "6px",
                boxShadow: `0 0 48px ${COLORS.POSITIVE}`,
                transform: `scaleX(${shieldScale})`,
                transformOrigin: "center"
              }} />
            )}
            
            {/* 보안 레이더 / 가상 보호막 (원형) */}
            {frame > shieldActiveFrame + 10 && (
              <div style={{
                position: "absolute", left: "50%", top: "50%",
                width: "800px", height: "800px",
                marginLeft: "-400px", marginTop: "-400px",
                borderRadius: "50%",
                border: `4px solid ${COLORS.PRIMARY_GLOW}`,
                transform: `scale(${spring({ frame: Math.max(0, frame - shieldActiveFrame - 10), fps, config: { damping: 100 } })})`
              }} />
            )}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2 */}
      <Sequence from={228} durationInFrames={662}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "24px"
          }}>
            {/* 빨간색 강조 -90% (극적인 수치 하락) */}
            <div style={{
              fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.HERO,
              color: COLORS.ACCENT, textShadow: `0 0 48px ${COLORS.ACCENT}`,
              transform: `scale(${interpolate(ninetyScale, [0, 1], [3, 1])})`, // 3배에서 슬램 인
              opacity: ninetyScale,
              lineHeight: 1
            }}>
              -90%
            </div>
            <div style={{
              fontFamily: FONTS.PRIMARY, fontSize: TEXT_SIZE.MD, color: COLORS.TEXT_MAIN,
              opacity: ninetyScale
            }}>
              치명적 오류 제거
            </div>
            
            {/* STABLE 문구 (형광펜 HIGHLIGHT) */}
            <div style={{
              marginTop: "40px",
              padding: "8px 24px",
              backgroundColor: COLORS.HIGHLIGHT,
              border: `2px solid ${COLORS.POSITIVE}`,
              borderRadius: "8px",
              fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.LG, color: COLORS.POSITIVE,
              transform: `scale(${stableSpring})`,
              boxShadow: `0 0 32px ${COLORS.POSITIVE}`
            }}>
              시스템 안정화
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
