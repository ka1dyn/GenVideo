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
- `public/{project_id}/design-system.md`에 명시된 항목(색상 톤, 폰트, 무드 등)은 반드시 준수한다.

### 🚨 공통 비주얼 컨셉 및 Remotion 구현 규칙 (필독)

1. 당신은 트렌디한 IT 기업의 수석 UI/UX 모션 디자이너이자 'React Remotion 개발자'입니다.
2. 모든 애니메이션은 Remotion의 `interpolate`, `spring` 함수와 CSS 속성(transform, opacity, color 등)으로 실제 구현 가능한 수준으로 기획해야 합니다.
3. [선택사항: R3F를 쓸 경우] 3D 파티클이나 복잡한 도형 연출은 React Three Fiber(<Canvas>) 영역으로 배정하고, 텍스트나 단순 UI는 2D DOM 영역으로 분리하여 기획하세요.
4. 두루뭉술한 표현("화려하게 등장한다", "마법처럼 변한다")을 금지하고, 애니메이션의 Target Property와 변화량(예: Scale 0 -> 1)을 명확히 기재하세요.

### Scene 작성 형식

각 시퀀스를 다음과 같이 나열합니다. 이 때, 각 Scene을 한번에 전부 생각하지 말고 최대 3개의 Scene을 Chunk 단위로 Iterate하게 계획하세요.

Scene 1

- 원본 텍스트: {FILL: timeline에서 읽은 sentence 원문 — 수정 금지}
- 타임라인: {FILL: startFrame}f 부터 시작 (총 {FILL: durationInFrames}f 지속)
- 비주얼 컨셉: {FILL: 이 씬의 전반적인 레이아웃과 핵심 연출 방향}
- 필요 컴포넌트: {FILL: 이 씬을 구현하기 위해 분리해야 할 React 컴포넌트 목록. 예: <BackgroundParticles />, <GaugeChart />}
- In-Scene Animation 기획 (※ 씬 내부 프레임(0 기준 상대값)으로 작성, 합계가 durationInFrames를 초과할 수 없음, 몇 단계로 나눠야할지 직접 판단하고 단계별로 프레임과 설명을 작성하기, `public/{project_id}/design-system.md`에 명시된 상수만 사용 가능. 다른 값 임의사용 절대금지)
  - 진입 (0f ~ {FILL}f): [어떤 요소가] [어떤 속성으로 어떻게 변하는지]. 예: Title Text가 Opacity 0->1, TranslateY 50px->0px로 spring 애니메이션 진입.
  - 단계1 ({FILL}f ~ {FILL}f): {FILL: 핵심 로직 설명. 예: interpolate를 사용해 0f~100f 동안 progress 값을 0에서 55로 카운트업}
  - 단계2 ({FILL}f ~ {FILL}f): {FILL}
  - ... (여러 단계)
  - 퇴장 ({FILL}f ~ 끝): {FILL: 허용 전환 - Fade, Slide, 금지 전환 - rotate, wipe, zoom burst}

... (이하 루프 반복)
