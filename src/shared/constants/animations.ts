import { Easing } from "remotion";

/**
 * Spring 물리 프리셋
 *
 * 영상의 톤: 부드럽고 자연스러운 흐름
 * - 기본 전환은 GENTLE로 유려하게
 * - 강조 포인트에서만 SNAPPY/POP으로 시선 집중
 */
export const SPRING_CONFIG = {
  /** 기본값 — 부드럽게 흘러들어오는 등장. 대부분의 요소에 사용. */
  GENTLE: { damping: 28, stiffness: 120 },
  /** 깔끔한 settling — 텍스트 블록, 카드 등장 */
  SMOOTH: { damping: 200 },
  /** 정밀한 반응 — 소제목 전환, 레이아웃 변경 시 */
  SNAPPY: { damping: 26, stiffness: 170, mass: 1 },
  /** 살짝 튀어오르는 등장 — 핵심 숫자, 강조 키워드 (절제해서 사용) */
  POP: { damping: 14, stiffness: 180, mass: 0.8 },
  /** 무게감 있는 등장 — 대형 제목, 히어로 텍스트 */
  HEAVY: { damping: 22, stiffness: 80, mass: 2 },
} as const;

/**
 * 시간 프리셋 (초 단위)
 *
 * 영상은 빠르게 소비되므로 전환은 경쾌하되,
 * 사라지는 것보다 나타나는 게 약간 더 느려야 자연스럽습니다.
 */
export const TIMING = {
  FADE_IN: 0.5,
  FADE_OUT: 0.3,
  FAST: 0.2,
  STAGGER: 0.12,
  STAGGER_FAST: 0.06,
  ENTRANCE_DELAY: 0.3,
  SECTION_GAP: 1.0,
  /** Scene 간 트랜지션 (초) — fade */
  SCENE_TRANSITION: 0.5,
  /** Segment 간 트랜지션 (초) — fade */
  SEGMENT_TRANSITION: 0.3,
} as const;

/** interpolate 기본 옵션 */
export const CLAMP = {
  extrapolateRight: "clamp",
  extrapolateLeft: "clamp",
} as const;

/**
 * Easing 프리셋
 *
 * SMOOTH_OUT이 기본 — 빠르게 시작하고 부드럽게 감속하는
 * Vercel 시그니처 커브. 영상에서 가장 자연스러운 느낌을 줍니다.
 */
export const EASING_PRESET = {
  /** 기본값 — 빠른 출발 + 우아한 감속. 거의 모든 등장에 사용. */
  SMOOTH_OUT: Easing.bezier(0.16, 1, 0.3, 1),
  /** 대칭 전환 — 중간 요소 교체 시 */
  SMOOTH_IN_OUT: Easing.bezier(0.65, 0, 0.35, 1),
  /** 감속 전용 */
  DECELERATE: Easing.out(Easing.cubic),
  /** 가속 전용 — 퇴장 애니메이션 */
  ACCELERATE: Easing.in(Easing.cubic),
} as const;
