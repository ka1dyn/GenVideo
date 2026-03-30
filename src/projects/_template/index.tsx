import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import type { ProjectProps } from "../../shared/types/project";
import { getAudioDuration } from "../../shared/utils/audio";
import { config } from "./config";
import { script } from "./script";
import { Scene1 } from "./scenes/scene1/Scene1";

/**
 * Scene 컴포넌트 배열 — 새 Scene을 추가하면 여기에 등록
 */
const SCENES: React.FC[] = [Scene1];

/**
 * WAV 파일에서 각 Scene의 duration을 동적으로 계산합니다.
 * Composition이 렌더링되기 전에 한 번 실행됩니다.
 */
export const calculateMetadata: CalculateMetadataFunction<
  ProjectProps
> = async () => {
  const durations = await Promise.all(
    script.map((s) => getAudioDuration(staticFile(s.audioFile))),
  );

  const transitionDuration = 0.5; // 트랜지션 시간 (초)
  const transitionCount = Math.max(0, script.length - 1);
  const totalSeconds =
    durations.reduce((sum, d) => sum + d, 0) -
    transitionCount * transitionDuration;

  return {
    durationInFrames: Math.ceil(totalSeconds * config.fps),
    props: { sceneDurations: durations },
  };
};

/**
 * 프로젝트 메인 Composition
 */
export const Composition: React.FC<ProjectProps> = ({ sceneDurations }) => {
  const { fps } = config;
  const transitionFrames = Math.round(fps * 0.5);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <TransitionSeries>
        {SCENES.map((SceneComponent, i) => (
          <React.Fragment key={script[i].sceneId}>
            {i > 0 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: transitionFrames })}
              />
            )}
            <TransitionSeries.Sequence
              durationInFrames={Math.ceil(sceneDurations[i] * fps)}
            >
              <SceneComponent />
              <Audio src={staticFile(script[i].audioFile)} />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
