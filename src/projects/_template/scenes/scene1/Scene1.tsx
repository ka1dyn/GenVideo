import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolate, spring } from "remotion";

/**
 * Scene 1 — 기본 템플릿
 *
 * useCurrentFrame()은 이 Scene 내부의 로컬 프레임(0부터 시작)을 반환합니다.
 * 전체 Composition 프레임이 아닌 Scene 단위로 애니메이션하세요.
 */
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "#f0f0f5",
          fontSize: 56,
          fontFamily: "Inter, Pretendard, sans-serif",
          fontWeight: 700,
          opacity: titleOpacity,
          transform: `translateY(${interpolate(titleY, [0, 1], [40, 0])}px)`,
        }}
      >
        Scene 1 Title
      </h1>
    </AbsoluteFill>
  );
};
