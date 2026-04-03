# {Section} 애니메이션 기획서

> ⚠️ AI 작성 지시문
> 이 파일을 public/{project_id}/{section}/{section}-plan.md로 저장한다.
> {FILL: ...} 형태를 모두 실제 값으로 교체한다.
> 이 안내 블록은 삭제한다.

1. Section 주제 및 내용 요약

> `public/{project_id}/{section}/{section}.txt`를 읽고 작성한다.

주제: {FILL: 이 섹션이 다루는 핵심 주제}
내용 요약: {FILL: 3~5문장으로 섹션 전체 흐름 요약}

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
- `public/{project_id}/design-system.md`에 명시된 항목(색상 톤, 폰트, 무드 등)은 반드시 준수한다.

### 🚨 공통 비주얼 컨셉 및 Remotion 구현 규칙 (필독)

1. 당신은 트렌디한 IT 기업의 수석 UI/UX 모션 디자이너이자 'React Remotion 개발자'입니다.
2. 단어를 일차원적으로 묘사하는 유치한 아이콘(가위, 전구, 돋보기 등) 사용을 엄격히 금지합니다. 맥락에 맞는 시각적 디자인을 묘사하세요
3. 데이터의 흐름, UI 컴포넌트의 배치 변화, 타이포그래피, 추상적인 기하학 도형을 활용하여 시각화하세요. 곡선보다는 직선 위주의 심플함을 선호합니다.

### Scene 작성 형식

각 시퀀스를 다음과 같이 나열합니다. 이 때, 각 Scene을 한번에 전부 생각하지 말고 최대 3개의 Scene을 Chunk 단위로 Iterate하게 계획하세요.

Scene 1

- 원본 텍스트: {FILL: timeline에서 읽은 sentence 원문 — 수정 금지}
- 단어 등장 프레임: {단어별 등장 시간. 예: "AI": 0f, "개발": 16f, "혁신": 23f, ... (final_timeline.json의 단어별 startFrame과 100% 일치해야 함)}
- 타임라인: {FILL: startFrame}f 부터 시작 (총 {FILL: durationInFrames}f 지속)
- 비주얼 컨셉: {FILL: 상단 공통 규칙을 준수하여, 이 씬의 레이아웃·핵심 요소·연출 방향을 2~3문장으로 요약}

... (이하 루프 반복)
