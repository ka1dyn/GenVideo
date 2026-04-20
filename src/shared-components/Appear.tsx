import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { ANIMATION } from '../constants/theme';

type AppearType = 'fade' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'wipe' | 'blur';

interface AppearProps {
  children: React.ReactNode;
  /** 등장 시작 프레임 (default: 0) */
  delay?: number;
  /** 퇴장 시작 프레임. 생략 시 퇴장 없음 */
  exitAt?: number;
  /** 등장 방식 (default: 'fadeUp') */
  type?: AppearType;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

/**
 * 요소 등장/퇴장 애니메이션 wrapper.
 * word_timings의 프레임 값을 delay에 넣어 내레이션과 동기화합니다.
 *
 * @example
 * <Appear delay={41} type="fadeUp">
 *   <span>테스트를 인지함</span>
 * </Appear>
 *
 * @example 요소 교체 (A 퇴장 후 B 등장)
 * <Appear delay={0} exitAt={60}><span>첫 번째</span></Appear>
 * <Appear delay={60}><span>두 번째</span></Appear>
 */
export const Appear: React.FC<AppearProps> = ({
  children,
  delay = 0,
  exitAt,
  type = 'fadeUp',
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // — Entrance —
  const enterProgress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: ANIMATION.SPRING_GENTLE,
    durationInFrames: ANIMATION.DUR_MD,
  });

  // — Exit (optional) —
  let exitOpacity = 1;
  if (exitAt !== undefined) {
    exitOpacity = interpolate(
      frame,
      [exitAt, exitAt + ANIMATION.DUR_SM],
      [1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );
  }

  // — Type-specific transforms —
  let transform = '';
  let filter: string | undefined;
  const opacity = enterProgress * exitOpacity;

  switch (type) {
    case 'fade':
      break;

    case 'fadeUp':
      transform = `translateY(${interpolate(enterProgress, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`;
      break;

    case 'fadeDown':
      transform = `translateY(${interpolate(enterProgress, [0, 1], [-ANIMATION.ENTER_Y_MD, 0])}px)`;
      break;

    case 'fadeLeft':
      transform = `translateX(${interpolate(enterProgress, [0, 1], [ANIMATION.ENTER_X_MD, 0])}px)`;
      break;

    case 'fadeRight':
      transform = `translateX(${interpolate(enterProgress, [0, 1], [-ANIMATION.ENTER_X_MD, 0])}px)`;
      break;

    case 'scale':
      transform = `scale(${interpolate(enterProgress, [0, 1], [ANIMATION.SCALE_ENTER, 1])})`;
      break;

    case 'wipe':
      // clipPath로 좌→우 reveal
      break;

    case 'blur':
      filter = `blur(${interpolate(enterProgress, [0, 1], [8, 0])}px)`;
      break;
  }

  // wipe는 clipPath 기반
  const clipPath = type === 'wipe'
    ? `inset(0 ${interpolate(enterProgress, [0, 1], [100, 0])}% 0 0)`
    : undefined;

  return (
    <div
      style={{
        opacity,
        transform: transform || undefined,
        filter,
        clipPath,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
