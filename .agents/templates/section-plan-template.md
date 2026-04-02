# {Section} 애니메이션 기획서

## Section 주제 및 내용요약

- `public/{project_id}/{section}/{section}.txt` 파일의 내용을 바탕으로 section의 주제와 내용을 요약합니다.

주제: {주제}

내용요약: {내용요약}

## 섹션 개요

[총 길이]: {duration}ms ({frames} frames) <--- `public/{project_id}/{section}/{section}_final_timeline.json`의 totalDuration, totalFrames와 일치해야함.

## 시퀀스 별 애니메이션 기획

- 각 섹션 내의 `public/{project_id}/{section}/{section}_final_timeline.json` 파일을 읽어, sentence 단위로 시퀀스를 구성합니다. 반드시 자막(sentence) 1개당 Scene 1개로 일대일(1:1) 매칭되도록 구성해야 합니다.
- 주제와 내용에 맞는 영상을 연출해야합니다.
- `public/{project_id}/design-system.md`에 명시된 항목(색상 톤, 폰트, 무드 등)은 **반드시 준수**합니다.
- 명시되지 않은 영역은 AI가 **자유롭고 창의적으로 구성**합니다.

각 시퀀스를 다음과 같이 나열합니다.

```
Scene1:
    원본 텍스트: {timeline에서 읽은 sentence}
    타임라인: <--- final_timeline.json에서 읽은 객체 데이터와 100% 일치해야 합니다.
    - 시간: {startMs}ms ~ {endMs}ms
    - 프레임: {startFrame} 프레임부터 시작 (총 {durationInFrames} 프레임 지속)
    - 비주얼 컨셉:
    1. 당신은 트렌디한 IT 기업의 수석 UI/UX 모션 디자이너입니다.
    2. 단어를 일차원적으로 묘사하는 유치한 아이콘(가위, 전구, 돋보기 등) 사용을 엄격히 금지합니다.
    3. 데이터의 흐름, UI 컴포넌트의 배치 변화, 타이포그래피, 추상적인 기하학 도형을 활용하여 시각화하세요.
    4. 씬 전환(Cut)을 최소화하고, 하나의 씬 내부에서 요소들이 크기, 투명도, 위치를 바꾸며 유기적으로 움직이는 'In-Scene Animation'을 2~3단계로 상세히 기획하세요.
    5. 디자인 시스템의 EFFECTS(글로우, 그림자, 글래스모피즘 등)를 필요하다면 활용하여 깊이감을 부여하세요.
- Scene2:
    원본 텍스트:
    타임라인:
    비주얼 컨셉:

... (이하 루프)

```

총 Scene의 개수는 timeline의 개수와 일치합니다.
