# {Section} 애니메이션 기획서

> ⚠️ AI 작성 지시문

> 이 파일을 public/{project_id}/{section}/{section}-plan.md로 저장한다.
> {FILL: ...} 형태를 모두 실제 값으로 교체한다.
> 이 안내 블록은 삭제한다.

1. Section 주제 및 내용 요약

> `public/{project_id}/{section}/{section}.txt`를 읽고 작성한다.

주제: {FILL: 이 섹션이 다루는 핵심 주제}
내용 요약: {FILL: 3~5문장으로 섹션 전체 흐름 요약}
감정 톤: {FILL: 예 — 신뢰감 있는 설명체 / 긴장감 있는 임팩트 / 따뜻하고 공감적인 마무리}

2. 섹션 개요

`{section}_final_timeline.json`의 totalDuration, totalFrames를 그대로 기입한다.

| 항목      | 값                      |
| --------- | ----------------------- |
| 총 길이   | {FILL: totalDuration}ms |
| 총 프레임 | {FILL: totalFrames}f    |
| Scene 수  | {FILL: sentence 개수}   |

## 시퀀스 별 애니메이션 기획

- 타임라인 수치는 `public/{project_id}/{section}/{section}_final_timeline.json`과 100% 일치해야 하며, 임의로 수정하지 않는다.
- Scene 수는 timeline의 sentence 수와 반드시 일치해야 한다. (sentence 1개 = Scene 1개)
- 주제와 내용에 맞는 영상을 연출해야 한다.
- `public/{project_id}/design-system.md`에 명시된 항목(색상 톤, 폰트, 무드 등)은 **반드시 준수**한다.
- **명시되지 않은 영역은 AI가 **자유롭고 창의적으로 구성\*\*한다.

각 시퀀스를 다음과 같이 나열합니다.

```
Scene 1
    원본 텍스트: {FILL: timeline에서 읽은 sentence 원문 — 수정 금지}
    타임라인: {FILL: startFrame}f 부터 시작 (총 {FILL: durationInFrames}f 지속) / ({FILL: startMs}ms ~ {FILL: endMs}ms)
    비주얼 컨셉:
    [레이아웃 및 요소] {FILL: 예 — 화면 중앙에 핵심 단어 'AI'를 거대하게 배치하고, 그 아래 보조 텍스트를 작게 배치. 다크 모드 기반에 메인 강조색 활용.}

    [애니메이션 흐름] (※ 씬 내부 프레임(0 기준 상대값)으로 작성하며, 합계가 durationInFrames를 초과할 수 없음)

    진입 (0f ~ {FILL}f): {FILL: 예 — 'AI' 텍스트가 화면 밖에서 튀어나오듯(스케일 업+강한 텐션) 타격감 있게 등장.}

    강조 ({FILL}f ~ {FILL}f): {FILL: 예 — 단어 주변으로 글로우 효과가 퍼지며 시선을 집중시킴.}

    퇴장 ({FILL}f ~ 끝): {FILL: 예 — 부드럽게 위로 페이드아웃 되며 사라짐.}

Scene1:
    - 원본 텍스트: {FILL: timeline에서 읽은 sentence 원문 — 수정 금지}
    - 타임라인: {FILL: startFrame}f 부터 시작 (총 {FILL: durationInFrames}f 지속) / ({FILL: startMs}ms ~ {FILL: endMs}ms)
    - 비주얼 컨셉:
    1. 당신은 트렌디한 IT 기업의 수석 UI/UX 모션 디자이너입니다.
    2. 단어를 일차원적으로 묘사하는 유치한 아이콘(가위, 전구, 돋보기 등) 사용을 엄격히 금지합니다.
    3. 데이터의 흐름, UI 컴포넌트의 배치 변화, 타이포그래피, 추상적인 기하학 도형을 활용하여 시각화하세요.
    4. 씬 전환(Cut)을 최소화하고, 하나의 씬 내부에서 요소들이 크기, 투명도, 위치를 바꾸며 유기적으로 움직이는 'In-Scene Animation'을 2~3단계로 상세히 기획하세요.

    요약: {FILL: 1~4번까지의 내용으로 전체적인 비주얼의 흐름 및 연출을 2~3문장으로 요약}

    In-Scene Animation 기획 (※ 씬 내부 프레임(0 기준 상대값)으로 작성하며, 합계가 durationInFrames를 초과할 수 없음)
    1. 몇 단계로 나눌 지 직접 판단.
    2. 각 단계별로 프레임과 설명을 작성.

    - 진입 (0f ~ {FILL}f): {FILL}
    - 단계1 ({FILL}f ~ {FILL}f): {FILL}
    - 단계2 ({FILL}f ~ {FILL}f): {FILL}
    - ... (이하 루프)
    - 퇴장 ({FILL}f ~ 끝): {FILL}

- Scene2:
    - 원본 텍스트:
    - 타임라인:
    - 비주얼 컨셉:

    요약: {FILL: 1~4번까지의 내용으로 전체적인 비주얼의 흐름 및 연출을 2~3문장으로 요약}

    - 진입 (0f ~ {FILL}f): {FILL}
    - 단계1 ({FILL}f ~ {FILL}f): {FILL}
    - 단계2 ({FILL}f ~ {FILL}f): {FILL}
    - ... (이하 루프)
    - 퇴장 ({FILL}f ~ 끝): {FILL}

... (이하 루프)

```

총 Scene의 개수는 timeline의 개수와 일치합니다.
