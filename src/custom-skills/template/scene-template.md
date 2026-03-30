---
name: scene template
description: scene orchestrator template 작성 방법을 나타냅니다.
metadata:
  tags: scene, template, implementation
---

`Scene{N}.tsx`는 Seg 파일들을 import하고 Series로 시퀀싱하는 역할만 합니다.

**`Scene{N}.tsx` 템플릿:**

```tsx
import React from "react";
import { Audio, staticFile, useVideoConfig, Series } from "remotion";
import { SceneBackground, FadeWrapper } from "../../../../shared/components";
import { TIMING } from "../../../../shared/constants/animations";
import type { SegmentScript } from "../../../../shared/types/project";
import { script } from "../../script";
import { Seg1 } from "./Seg1";
import { Seg2 } from "./Seg2";
// import { Seg3 } from "./Seg3"; ...

export const Scene{N}: React.FC<{ segmentDurations: number[] }> = ({ segmentDurations }) => {
  const { fps } = useVideoConfig();
  const sceneData = script.find((s) => s.sceneId === "scene{N}");
  const segments = sceneData?.segments || [];
  const transitionFrames = Math.round(fps * TIMING.SEGMENT_TRANSITION);

  // Segment 수만큼 추가 — script.ts의 순서와 반드시 일치
  const SEGMENT_RENDERERS = [
    (seg: SegmentScript, dur: number) => (
      <Seg1 text={seg.text} duration={dur} sectionTitle={sceneData?.sectionTitle} />
    ),
    (seg: SegmentScript, dur: number) => (
      <Seg2 text={seg.text} duration={dur} />
    ),
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
```
