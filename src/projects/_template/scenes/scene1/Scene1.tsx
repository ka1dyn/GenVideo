import React from "react";
import { Audio, staticFile, useVideoConfig, Series } from "remotion";
import {
  SceneBackground,
  AnimatedTitle,
  AnimatedText,
  FadeWrapper,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { TIMING } from "../../../../shared/constants/animations";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";
import type { SegmentScript } from "../../../../shared/types/project";
import { script } from "../../script";

/**
 * Scene 1 — Segment 기반 템플릿
 *
 * 핵심 구조:
 * - SceneBackground가 전체 Scene을 감싸 배경 일관성 유지
 * - 내부 Series로 Segment 간 순차(Sequential) 연결
 * - FadeWrapper를 통해 각 Segment 시작/끝단에 부드러운 교차 효과 부여
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
 * - 모든 Seg는 duration을 파라미터로 받아 usePhase 등에 전달해야 합니다.
 */

// ── Segment 렌더러 (실제 프로젝트에서는 개별 파일로 분리 권장) ─────────

const Seg1: React.FC<{ text: string; duration: number; sectionTitle?: string }> = ({
  text,
  duration,
  sectionTitle,
}) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);
  
  return (
    <CenteredLayout sectionTitle={sectionTitle} gap={SPACING.LG}>
      <AnimatedTitle text="핵심 키워드" size="hero" animation="slideUp" />
      {phase.isPhaseActive("develop") && (
        <AnimatedText text={text} variant="body" delay={0.3} />
      )}
    </CenteredLayout>
  );
};

const Seg2: React.FC<{ text: string; duration: number }> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);
  
  return (
    <CenteredLayout gap={SPACING.LG}>
      {phase.isPhaseActive("develop") && (
        <AnimatedText text={text} variant="body" animation="fadeIn" />
      )}
    </CenteredLayout>
  );
};

// ── Scene 컴포넌트 ──────────────────────────

export const Scene1: React.FC<{ segmentDurations: number[] }> = ({
  segmentDurations,
}) => {
  const { fps } = useVideoConfig();
  const sceneData = script.find((s) => s.sceneId === "scene1");
  const segments = sceneData?.segments || [];
  const transitionFrames = Math.round(fps * TIMING.SEGMENT_TRANSITION);

  // Segment 렌더러 배열 — 순서가 segments 배열과 1:1 대응
  const SEGMENT_RENDERERS = [
    (seg: SegmentScript, dur: number) => (
      <Seg1 text={seg.text} duration={dur} sectionTitle={sceneData?.sectionTitle} />
    ),
    (seg: SegmentScript, dur: number) => <Seg2 text={seg.text} duration={dur} />,
    // ... AI가 Segment 수만큼 추가
  ];

  return (
    <SceneBackground variant="gradient">
      <Series>
        {segments.map((seg, i) => {
          const render = SEGMENT_RENDERERS[i];
          const durationInFrames = Math.ceil(segmentDurations[i] * fps);
          
          return (
            <Series.Sequence 
              key={seg.segmentId} 
              durationInFrames={durationInFrames}
            >
              <FadeWrapper 
                durationInFrames={durationInFrames} 
                transitionFrames={transitionFrames}
              >
                {render(seg, segmentDurations[i])}
              </FadeWrapper>
              
              <Audio src={staticFile(seg.audioFile)} />
            </Series.Sequence>
          );
        })}
      </Series>
    </SceneBackground>
  );
};
