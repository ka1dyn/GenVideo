# {Section} 애니메이션 기획서

## 섹션 개요

[총 길이]: {duration}ms ({frames} frames) <--- final_timeline.json의 totalDuration, totalFrames와 일치해야함.

## 시퀀스 별 애니메이션 기획

- 각 섹션 내의`public/{project_id}/{section}/{section}_final_timeline.json` 파일을 읽어, sentence 단위로 시퀀스를 구성합니다. 반드시 일대일로 구성해야합니다.
- 할당된 각 시퀀스의 `durationInFrames` 는 `Math.ceil((endMs - startMs) / 1000 * {VIDEO_FPS})` (`src/constants/video-config.ts` 기준) 로 계산합니다.

각 시퀀스를 다음과같이 나열합니다.

```
- Scene1:
    원본 텍스트: {timeline에서 읽은 sentence}
    타임라인: {startMs}ms ~ {endMs}ms ({frames} frames) <--- timeline에서 읽은 sentence의 startMs와 endMs와 100% 일치해야합니다.
    비주얼 컨셉: {AI 본인이 세계적인 예술가, 연출가, 크리에이터가 된 것처럼, 사람들의 이목을 끌 수 있는 압도적인 연출을 기획하세요. 디자인 시스템의 내용을 기반으로 하되, 창의력을 마음껏 발휘하여 다양한 레이아웃 배치, 색상, 트랜지션, 애니메이션, 강조, 반전 효과를 시도하세요. 기존에 학습된 UI/UX 지식에 얽매이지 마세요.}
- Scene2:
    원본 텍스트:
    타임라인:
    비주얼 컨셉:

... (이하 루프)

```

총 Scene의 개수는 timeline의 개수와 일치합니다.
