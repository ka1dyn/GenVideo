# {Section} 애니메이션 기획서

## 섹션 개요

[총 길이]: {duration}ms ({frames} frames) <--- final_timeline.json의 totalDuration, totalFrames와 일치해야함.

## 자막 개요

- 자막을 구성할 때, `public/{project_id}/{section}/{section}_final_timeline.json` 파일의 **sentences 배열 내 문장들을 기반**으로 자막을 구성한다.
- 문장 하나가 너무 길다면 적절하게 분할한다.
- 자막의 startMs와 endMs는 `final_timeline.json` 파일의 `sentences` 배열 내 문장, 혹은 단어의 startMs와 endMs와 100% 일치해야합니다.

**반드시 계획에 표기해야 할 사항**
자막 타임라인 구성은 다음과 같다.

```
- 자막 1:
    원본 텍스트: {추출된 실제 타겟 기준 원본 문장}
    타임스탬프: {startMs}ms ~ {endMs}ms ({frames} frames) <--- 이 부분은 타임스탬프를 기반으로 계산된 값과 완벽하게 일치해야함
- 자막 2:
    원본 텍스트: {추출된 실제 타겟 기준 원본 문장}
    타임스탬프: ...
... (이하 루프)

```

## 시퀀스 개요

### 시퀀스 개수 설정

- `final_timeline.json` 파일의 단어들을 적절히 묶어서 한 section을 구성할 시퀀스 개수를 설정합니다.
- 시퀀스 하나는 5초 이내로 구성해야합니다.(60fps기준 300frames 30fps기준 150frames) 섹션이 80초라면 시퀀스는 최소 14개 이상이 되어야합니다.
- 시퀀스를 나누고, 포함되는 단어를 묶어서 함께 표시하세요. 꼭 문장 단위가 아니여도 됩니다.
- 타임스탬프에서 얻은 타이밍 정보를 바탕으로, 각 시퀀스의 startMs와 endMs를 설정합니다.
- [매우중요] 이전 시퀀스의 endMs와 다음 시퀀스의 startMs가 다르다면, 이전 시퀀스의 endMs를 다음 시퀀스의 startMs로 설정하고 프레임을 재계산해야합니다. 또한 마지막 시퀀스의 endMs는 섹션의 전체 '총 길이(duration)'와 일치시켜 영상 끝부분의 묵음 여백(Tail)까지 포함시켜야 합니다. 만약 시퀀스 사이나 끝에 공백 프레임이 생기면 시각 시퀀스와 오디오/자막 재생 시점이 어긋나게 됩니다.
- 할당된 각 시퀀스의 `durationInFrames` 는 `Math.ceil((endMs - startMs) / 1000 * {VIDEO_FPS})` (`src/constants/video-config.ts` 기준) 로 계산하여 기획서에 반영합니다.

## 시퀀스 기획

**핵심 가치**

- 시청자가 지루하지 않도록 영상에 다채로움, 리듬감, 속도감, 강조, 재미를 부여하세요.

시퀀스 구성은 다음과 같다.

```
- Scene1:
    words_combined: {포함되는 단어들을 묶어서 표시}
    timeline: {startMs}ms ~ {endMs}ms ({frames} frames)
    visual_concept: {어떤 그래픽을 사용할 지 간단히 묘사}
- Scene2:
    words_combined: {포함되는 단어들을 묶어서 표시}
    timeline: {startMs}ms ~ {endMs}ms ({frames} frames)
    visual_concept: {어떤 그래픽을 사용할 지 간단히 묘사}

... (이하 루프)

```
