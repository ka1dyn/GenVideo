import React from "react";
import { Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  SceneBackground,
  AnimatedTitle,
  AnimatedText,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { TIMING } from "../../../../shared/constants/animations";
import type { SegmentScript } from "../../../../shared/types/project";
import { script } from "../../script";

/**
 * Scene 1 — Segment 기반 템플릿
 *
 * 핵심 구조:
 * - SceneBackground가 전체 Scene을 감싸 배경 일관성 유지
 * - 내부 TransitionSeries로 Segment 간 fade 전환
 * - 각 Segment의 <Audio>가 해당 Sequence 안에 → 완벽한 싱크
 * - useCurrentFrame()이 Sequence마다 0으로 리셋 → 애니메이션 자동 재시작
 *
 * SectionLabel 규칙:
 * - Scene의 sectionTitle을 첫 번째 Segment에서만 표시
 *
 * Segment 렌더러 작성 규칙:
 * - 대본(text)을 해석하여 적절한 레이아웃·컴포넌트 조합
 * - 원시 HTML 금지 — shared/components에서 import
 * - 매직 넘버 금지 — shared/constants 상수 사용
 */

// ── Segment 렌더러 ──────────────────────────
// AI가 대본(text)을 해석하여 Segment별 비주얼을 설계합니다.

const Seg1: React.FC<{ text: string; sectionTitle?: string }> = ({
  text,
  sectionTitle,
}) => (
  <CenteredLayout sectionTitle={sectionTitle} gap={SPACING.LG}>
    <AnimatedTitle text="핵심 키워드" size="hero" animation="slideUp" />
    <AnimatedText text={text} variant="body" delay={0.3} />
  </CenteredLayout>
);

const Seg2: React.FC<{ text: string }> = ({ text }) => (
  <CenteredLayout gap={SPACING.LG}>
    <AnimatedText text={text} variant="body" animation="fadeIn" />
  </CenteredLayout>
);

// ── Scene 컴포넌트 ──────────────────────────

export const Scene1: React.FC<{ segmentDurations: number[] }> = ({
  segmentDurations,
}) => {
  const { fps } = useVideoConfig();
  const sceneData = script.find((s) => s.sceneId === "scene1");
  const segments = sceneData?.segments || [];
  const transitionFrames = Math.round(fps * TIMING.SEGMENT_TRANSITION);

  // Segment 렌더러 배열 — 순서가 segments 배열과 1:1 대응
  // 첫 번째 렌더러에만 sectionTitle을 전달합니다.
  const SEGMENT_RENDERERS = [
    (seg: SegmentScript) => (
      <Seg1 text={seg.text} sectionTitle={sceneData?.sectionTitle} />
    ),
    (seg: SegmentScript) => <Seg2 text={seg.text} />,
    // ... AI가 Segment 수만큼 추가
  ];

  return (
    <SceneBackground variant="gradient">
      <TransitionSeries>
        {segments.map((seg, i) => {
          const render = SEGMENT_RENDERERS[i];
          return (
            <React.Fragment key={seg.segmentId}>
              {i > 0 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({
                    durationInFrames: transitionFrames,
                  })}
                />
              )}
              <TransitionSeries.Sequence
                durationInFrames={Math.ceil(segmentDurations[i] * fps)}
              >
                {render(seg)}
                <Audio src={staticFile(seg.audioFile)} />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
    </SceneBackground>
  );
};
