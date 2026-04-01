import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS } from "../theme";

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 385 frames): 타이핑 이펙트 -> 채팅 텍스트 슬램 인
  const textToType = "미래의 코딩은 대화";
  const charsToShow = Math.floor(interpolate(frame, [0, 60], [0, textToType.length], { extrapolateRight: "clamp" }));
  const typedText = textToType.slice(0, charsToShow);

  const chatSlam = spring({
    frame: Math.max(0, frame - 180),
    fps,
    config: SPRINGS.PUNCH,
    durationInFrames: 30,
  });

  // SubSeq 2 (385 ~ 917 frames): AI 디렉터 문구 
  const sub2Frame = Math.max(0, frame - 385);
  const directorScale = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.PUNCH,
  });

  // 화면 암전/종료 페이드 아웃 효과
  const finalFadeOut = interpolate(sub2Frame, [400, 532], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, zIndex: Z.BG }}>
      
      {/* SubSeq 1 */}
      <Sequence durationInFrames={385}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          
          {/* 타이핑 효과 */}
          <div style={{
            fontFamily: FONTS.MONO,
            fontSize: TEXT_SIZE.MD,
            color: COLORS.TEXT_MUTED,
            opacity: interpolate(frame, [150, 180], [1, 0], { extrapolateRight: "clamp" }) // 채팅 등장 시 페이드 아웃
          }}>
            &gt; {typedText}_
          </div>

          {/* 채팅 강렬한 슬램 인 */}
          {frame >= 180 && (
            <div style={{
              position: "absolute",
              fontFamily: FONTS.DISPLAY,
              fontSize: TEXT_SIZE.HERO,
              color: COLORS.PRIMARY,
              transform: `scale(${interpolate(chatSlam, [0, 1], [3, 1])})`, // 3배에서 시작하여 터지듯 작아짐
              opacity: interpolate(chatSlam, [0, 1], [0, 1]),
              textShadow: `0 0 120px ${COLORS.PRIMARY_GLOW}`,
            }}>
              채팅
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2 */}
      <Sequence from={385} durationInFrames={532}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: finalFadeOut }}>
          
          {/* 등불/아우라 배경 */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            background: `radial-gradient(circle, ${COLORS.PRIMARY_GLOW} 0%, transparent 60%)`,
            opacity: interpolate(sub2Frame, [0, 60], [0, 1])
          }} />

          {/* AI 디렉터 */}
          <h2 style={{
            fontFamily: FONTS.DISPLAY,
            fontSize: TEXT_SIZE.XXL,
            color: COLORS.TEXT_MAIN,
            transform: `scale(${directorScale})`,
            margin: 0,
            textAlign: "center",
            textShadow: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
            zIndex: 1
          }}>
            AI<br />
            <span style={{ color: COLORS.SECONDARY }}>디렉터</span>
          </h2>

        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
