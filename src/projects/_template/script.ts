import type { SceneScript } from "../../shared/types/project";

export const script: SceneScript[] = [
  {
    sceneId: "scene1",
    sectionTitle: "소제목",
    segments: [
      {
        segmentId: "scene1-seg1",
        audioFile: "projects/__PROJECT_ID__/audio/scene1/seg1.wav",
        text: "여기에 첫 번째 세그먼트 대본을 작성하세요.",
      },
      {
        segmentId: "scene1-seg2",
        audioFile: "projects/__PROJECT_ID__/audio/scene1/seg2.wav",
        text: "여기에 두 번째 세그먼트 대본을 작성하세요.",
      },
    ],
  },
];
