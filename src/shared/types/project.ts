/**
 * 영상 프로젝트 공유 타입 정의
 */

/** Scene 단위 대본 */
export type SceneScript = {
  /** Scene 식별자 (e.g. "scene1") */
  sceneId: string;
  /** staticFile() 경로 (e.g. "projects/my-topic/audio/scene1.wav") */
  audioFile: string;
  /** TTS에 전달할 대본 텍스트 */
  text: string;
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
  /** 각 scene의 초(seconds) 단위 duration 배열 */
  sceneDurations: number[];
};
