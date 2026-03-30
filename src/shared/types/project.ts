/**
 * 영상 프로젝트 공유 타입 정의
 */

/** Segment 단위 대본 (오디오 싱크의 최소 단위, 10-20초) */
export type SegmentScript = {
  /** Segment 식별자 (e.g. "scene1-seg1") */
  segmentId: string;
  /** staticFile() 경로 (e.g. "projects/my-topic/audio/scene1/seg1.wav") */
  audioFile: string;
  /** TTS 대본 텍스트 — 이 텍스트가 곧 화면 콘텐츠의 원천 */
  text: string;
};

/** Scene 단위 대본 (챕터 = 2분 내외) */
export type SceneScript = {
  /** Scene 식별자 (e.g. "scene1") */
  sceneId: string;
  /** 소제목 — 첫 번째 Segment에서 SectionLabel로 표시 */
  sectionTitle?: string;
  /** 10-20초짜리 Segment 배열 */
  segments: SegmentScript[];
};

/** 프로젝트 설정 */
export type ProjectConfig = {
  /** 고유 ID (Composition id로도 사용, kebab-case) */
  id: string;
  /** 영상 제목 */
  title: string;
  /** 초당 프레임 수 */
  fps: number;
  /** 영상 너비 */
  width: number;
  /** 영상 높이 */
  height: number;
};

/** calculateMetadata에서 주입되는 props */
export type ProjectProps = {
  /** 각 segment의 초(seconds) 단위 duration 2차원 배열 [sceneIdx][segIdx] */
  segmentDurations: number[][];
};
