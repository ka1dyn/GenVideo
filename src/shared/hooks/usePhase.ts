import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Phase 정의
 * @property name — Phase 식별자 (e.g. "entrance", "develop", "emphasize")
 * @property start — Segment 전체 duration 대비 시작 비율 (0~1)
 * @property end — Segment 전체 duration 대비 끝 비율 (0~1)
 */
export type PhaseConfig = {
  name: string;
  start: number;
  end: number;
};

export type PhaseState = {
  /** 현재 활성 Phase 이름 */
  activePhase: string;
  /** 현재 Phase 내 진행률 (0~1) */
  phaseProgress: number;
  /** 특정 Phase의 진행률 — 미진입이면 0, 완료이면 1 */
  getPhaseProgress: (phaseName: string) => number;
  /** 특정 Phase에 진입했는지 (start 이상이면 true) */
  isPhaseActive: (phaseName: string) => boolean;
  /** 특정 Phase가 완료되었는지 (end 이상이면 true) */
  isPhaseComplete: (phaseName: string) => boolean;
  /** 특정 Phase의 절대 시작 시각 (초) */
  getPhaseStartSec: (phaseName: string) => number;
  /** 특정 Phase의 절대 종료 시각 (초) */
  getPhaseEndSec: (phaseName: string) => number;
  /** Segment 전체 진행률 (0~1) */
  segmentProgress: number;
  /** Segment 전체 프레임 수 */
  totalFrames: number;
};

/**
 * Segment 내 Phase 기반 타이밍 Hook
 *
 * 각 Phase는 비율(0~1)로 정의되므로 15초든 25초든 자동 스케일링됩니다.
 *
 * @example
 * ```tsx
 * const PHASES = [
 *   { name: "entrance", start: 0, end: 0.25 },
 *   { name: "develop",  start: 0.25, end: 0.70 },
 *   { name: "emphasize", start: 0.70, end: 1.0 },
 * ];
 *
 * const phase = usePhase(PHASES, duration);
 * // phase.getPhaseProgress("entrance") → 0~1 during entrance phase
 * // phase.isPhaseActive("develop") → true when past 25%
 * ```
 */
export function usePhase(
  phases: PhaseConfig[],
  segmentDurationSec: number,
): PhaseState {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = Math.ceil(segmentDurationSec * fps);
  const segmentProgress =
    totalFrames > 0 ? Math.min(1, frame / totalFrames) : 0;

  const findPhase = (name: string) => phases.find((p) => p.name === name);

  // ── 현재 활성 Phase 결정 ──
  let activePhase = phases[phases.length - 1].name;
  for (const phase of phases) {
    if (segmentProgress >= phase.start && segmentProgress < phase.end) {
      activePhase = phase.name;
      break;
    }
  }

  // ── Phase 진행률 계산 ──
  const getPhaseProgress = (phaseName: string): number => {
    const phase = findPhase(phaseName);
    if (!phase) return 0;
    if (segmentProgress >= phase.end) return 1;
    if (segmentProgress < phase.start) return 0;
    const range = phase.end - phase.start;
    return range > 0 ? (segmentProgress - phase.start) / range : 0;
  };

  const isPhaseActive = (phaseName: string): boolean => {
    const phase = findPhase(phaseName);
    if (!phase) return false;
    return segmentProgress >= phase.start;
  };

  const isPhaseComplete = (phaseName: string): boolean => {
    const phase = findPhase(phaseName);
    if (!phase) return false;
    return segmentProgress >= phase.end;
  };

  const getPhaseStartSec = (phaseName: string): number => {
    const phase = findPhase(phaseName);
    if (!phase) return 0;
    return phase.start * segmentDurationSec;
  };

  const getPhaseEndSec = (phaseName: string): number => {
    const phase = findPhase(phaseName);
    if (!phase) return 0;
    return phase.end * segmentDurationSec;
  };

  return {
    activePhase,
    phaseProgress: getPhaseProgress(activePhase),
    getPhaseProgress,
    isPhaseActive,
    isPhaseComplete,
    getPhaseStartSec,
    getPhaseEndSec,
    segmentProgress,
    totalFrames,
  };
}
