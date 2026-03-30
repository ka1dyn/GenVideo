import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export type FadeWrapperProps = {
  children: React.ReactNode;
  /** 현재 Sequence의 총 프레임 수 */
  durationInFrames: number;
  /** 페이드 인 및 페이드 아웃에 소요될 프레임 수 */
  transitionFrames: number;
};

/**
 * Series 컴포넌트 내부에서, Sequence의 시작/끝 지점에 투명도 페이드 인/아웃을
 * 적용해주는 래퍼 컴포넌트입니다.
 */
export const FadeWrapper: React.FC<FadeWrapperProps> = ({
  children,
  durationInFrames,
  transitionFrames,
}) => {
  const frame = useCurrentFrame();

  // 시작할 때(Fade-In) 투명도 시뮬레이션
  const fadeIn = interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // 끝날 때(Fade-Out) 투명도
  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationInFrames - transitionFrames), durationInFrames],
    [1, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 둘 중 더 작은 값을 적용하여 인/아웃이 모두 부드럽게 적용되도록 함
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div style={{ opacity, width: "100%", height: "100%", position: "absolute", left: 0, top: 0 }}>
      {children}
    </div>
  );
};
