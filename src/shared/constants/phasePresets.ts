import type { PhaseConfig } from "../hooks/usePhase";

// ────────────────────────────────────────────────
// Phase 배분 프리셋
//
// 모든 값은 비율(0~1)이므로 Segment 길이와 무관하게 동작합니다.
// Segment 렌더러에서 내용에 맞는 프리셋을 선택하세요.
// ────────────────────────────────────────────────

/**
 * 3-Phase 기본 (등장 → 전개 → 강조)
 *
 * 범용 — 핵심 개념 설명, 일반 내러티브에 적합
 */
export const PHASE_3_STANDARD: PhaseConfig[] = [
  { name: "entrance", start: 0, end: 0.25 },
  { name: "develop", start: 0.25, end: 0.70 },
  { name: "emphasize", start: 0.70, end: 1.0 },
];

/**
 * 4-Phase 확장 (등장 → 전개A → 전개B → 강조)
 *
 * 긴 Segment(20초+)에서 전개를 2단계로 나누고 싶을 때
 */
export const PHASE_4_EXTENDED: PhaseConfig[] = [
  { name: "entrance", start: 0, end: 0.20 },
  { name: "developA", start: 0.20, end: 0.50 },
  { name: "developB", start: 0.50, end: 0.75 },
  { name: "emphasize", start: 0.75, end: 1.0 },
];

/**
 * 3-Phase 데이터 중심 (등장 → 빌드업 → 결과 공개)
 *
 * 숫자/통계/차트 — 빌드업 구간에서 카운터·차트가 채워지고, 마지막에 요약
 */
export const PHASE_3_DATA: PhaseConfig[] = [
  { name: "entrance", start: 0, end: 0.20 },
  { name: "buildup", start: 0.20, end: 0.65 },
  { name: "reveal", start: 0.65, end: 1.0 },
];

/**
 * 3-Phase 비교형 (등장 → Before → After 강조)
 *
 * Before/After, 과거 vs 현재 비교에 적합
 */
export const PHASE_3_COMPARISON: PhaseConfig[] = [
  { name: "entrance", start: 0, end: 0.20 },
  { name: "before", start: 0.20, end: 0.55 },
  { name: "after", start: 0.55, end: 1.0 },
];

/**
 * 3-Phase 인용형 (등장 → 타이핑 → 귀속/강조)
 *
 * 인용문, 타자기 효과 후 저자 표시에 적합
 */
export const PHASE_3_QUOTE: PhaseConfig[] = [
  { name: "entrance", start: 0, end: 0.15 },
  { name: "typing", start: 0.15, end: 0.70 },
  { name: "attribution", start: 0.70, end: 1.0 },
];

/**
 * 3-Phase 단계형 (등장 → 단계 나열 → 요약)
 *
 * 단계별 설명, 프로세스 설명에 적합
 */
export const PHASE_3_STEPS: PhaseConfig[] = [
  { name: "entrance", start: 0, end: 0.20 },
  { name: "steps", start: 0.20, end: 0.80 },
  { name: "summary", start: 0.80, end: 1.0 },
];
