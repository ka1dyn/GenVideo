import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS } from "../theme";

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 280 frames): 어떻게? 점멸
  const glitchHow = Math.floor(frame / 4) % 2 === 0 ? 1 : 0; // 빠른 점멸
  const howFadeOut = interpolate(frame, [250, 280], [1, 0]);

  // SubSeq 2 (280 ~ 888 frames): 3단계 워크플로우 거대 자막 슬램 인, 격자 패턴 무빙
  const sub2Frame = Math.max(0, frame - 280);
  const textSlam = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.PUNCH,
  });

  // 격자무늬(Grid) 전진 효과
  const gridTranslateZ = interpolate(frame, [0, 888], [0, 1000]);

  // Smash Cut 전환
  const transformZ = Math.max(0, frame - 860);
  const scaleOut = spring({
    frame: transformZ,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, perspective: "800px", overflow: "hidden" }}>
      
      {/* 바닥 격자 패턴 */}
      <div style={{
        position: "absolute", left: "-50%", right: "-50%", top: "40%", height: "200%",
        backgroundImage: `linear-gradient(transparent 95%, ${COLORS.PRIMARY_DIM} 100%), linear-gradient(90deg, transparent 95%, ${COLORS.PRIMARY_DIM} 100%)`,
        backgroundSize: "80px 80px",
        transform: `rotateX(60deg) translateZ(${gridTranslateZ}px)`,
        transformOrigin: "top"
      }} />

      {/* 내부 요소 컨테이너 (시퀀스 끝에서 카메라를 뚫고 나감) */}
      <div style={{
        width: "100%", height: "100%", position: "absolute",
        display: "flex", justifyContent: "center", alignItems: "center",
        transform: transformZ > 0 ? `scale(${interpolate(scaleOut, [0, 1], [1, 5])})` : "none"
      }}>
        
        {/* SubSeq 1 */}
        <Sequence durationInFrames={280}>
          <div style={{
            fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.HERO,
            color: COLORS.ACCENT, textShadow: `0 0 48px ${COLORS.ACCENT}`,
            opacity: frame < 30 ? glitchHow : howFadeOut
          }}>
            어떻게?
          </div>
        </Sequence>

        {/* SubSeq 2 */}
        <Sequence from={280} durationInFrames={608}>
          <div style={{
            display: "flex", flexDirection: "column",
            transform: `scale(${interpolate(textSlam, [0, 1], [2, 1])})`, // 크게 시작해서 Slam!
            opacity: interpolate(textSlam, [0, 1], [0, 1]),
            textAlign: "center"
          }}>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.XXL, color: COLORS.PRIMARY, textShadow: `0 0 64px ${COLORS.PRIMARY_GLOW}`, lineHeight: 1 }}>
              3단계
            </div>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.XL, color: COLORS.TEXT_MAIN }}>
              워크플로우
            </div>
          </div>
        </Sequence>

      </div>
    </AbsoluteFill>
  );
};
