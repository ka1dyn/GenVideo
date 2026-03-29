import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

/**
 * 오디오 파일의 duration을 초 단위로 반환합니다.
 * staticFile()로 감싼 URL을 전달하세요.
 *
 * @example
 * ```ts
 * import { staticFile } from "remotion";
 * const duration = await getAudioDuration(staticFile("projects/my-topic/audio/scene1.wav"));
 * ```
 */
export const getAudioDuration = async (src: string): Promise<number> => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  const durationInSeconds = await input.computeDuration();
  return durationInSeconds;
};
