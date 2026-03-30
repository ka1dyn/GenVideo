import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type { ProjectProps } from "../../shared/types/project";
import { getAudioDuration } from "../../shared/utils/audio";
import { TIMING } from "../../shared/constants/animations";
import { config } from "./config";
import { script } from "./script";
import { Scene1 } from "./scenes/scene1/Scene1";
import { Scene2 } from "./scenes/scene2/Scene2";
import { Scene3 } from "./scenes/scene3/Scene3";
import { Scene4 } from "./scenes/scene4/Scene4";

/**
 * Scene 컴포넌트 배열 — 새 Scene을 추가하면 여기에 등록
 * 각 Scene은 segmentDurations를 prop으로 받습니다.
 */
const SCENES: React.FC<{ segmentDurations: number[] }>[] = [Scene1, Scene2, Scene3, Scene4];

/**
 * WAV 파일에서 각 Segment의 duration을 동적으로 계산합니다.
 * Composition이 렌더링되기 전에 한 번 실행됩니다.
 */
export const calculateMetadata: CalculateMetadataFunction<
  ProjectProps
> = async () => {
  // 모든 Segment의 오디오 duration을 2차원 배열로 계산
  const segmentDurations = await Promise.all(
    script.map((scene) =>
      Promise.all(
        scene.segments.map((seg) =>
          getAudioDuration(staticFile(seg.audioFile)),
        ),
      ),
    ),
  );

  // Scene별 total duration (내부 Segment 트랜지션 겹침 차감)
  const sceneDurations = segmentDurations.map((segDurs) => {
    const total = segDurs.reduce((sum, d) => sum + d, 0);
    const internalOverlap =
      Math.max(0, segDurs.length - 1) * TIMING.SEGMENT_TRANSITION;
    return total - internalOverlap;
  });

  // 전체 duration (Scene 간 트랜지션 겹침 차감)
  const totalSeconds =
    sceneDurations.reduce((sum, d) => sum + d, 0) -
    Math.max(0, script.length - 1) * TIMING.SCENE_TRANSITION;

  return {
    durationInFrames: Math.ceil(totalSeconds * config.fps),
    props: { segmentDurations },
  };
};

/**
 * 프로젝트 메인 Composition
 */
export const Composition: React.FC<ProjectProps> = ({ segmentDurations }) => {
  const { fps } = config;
  const sceneTransitionFrames = Math.round(fps * TIMING.SCENE_TRANSITION);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <TransitionSeries>
        {SCENES.map((SceneComponent, i) => {
          const segDurs = segmentDurations[i];
          const internalOverlap =
            Math.max(0, segDurs.length - 1) * TIMING.SEGMENT_TRANSITION;
          const sceneDurationSec =
            segDurs.reduce((sum, d) => sum + d, 0) - internalOverlap;

          return (
            <React.Fragment key={script[i].sceneId}>
              {i > 0 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({
                    durationInFrames: sceneTransitionFrames,
                  })}
                />
              )}
              <TransitionSeries.Sequence
                durationInFrames={Math.ceil(sceneDurationSec * fps)}
              >
                <SceneComponent segmentDurations={segDurs} />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
