---
description: 기획서를 바탕으로 Remotion 씬을 순차적으로 구현하는 워크플로우
---

# /implement-scenes {project_id}

각 섹션의 기획서(`{section}_plan.md`)를 바탕으로 실제 Remotion 컴포넌트를 순차 구현합니다.

## 사전 조건

- scaffold 완료 상태여야 합니다.
- 각 섹션의 기획서 작성 완료 (`public/{project_id}/{section}/{section}_plan.md`)

## 워크플로우 단계

### 1. Remotion Best Practices 지식 습득

파일 열기 도구(`view_file`)를 사용해 `.agents/skills/remotion-best-practices/SKILL.md` 파일을 읽습니다.
(과거 대화 맥락에서 이미 규칙을 숙지했다면 다시 읽지 않아도 됩니다. 기억이 안날 때만 재참조하세요.)

특히 구현 전에 다음 문서 내용이 필요한 경우 적절히 읽어보세요:

- `rules/animations.md` — 애니메이션 패턴
- `rules/sequencing.md` — 시퀀스 패턴
- `rules/timing.md` — 보간 및 이징
- `rules/text-animations.md` — 텍스트 애니메이션
- `rules/transitions.md` — 전환 효과
- `rules/audio.md` — 오디오 처리
- `rules/assets.md` — 에셋 임포트

### 2. 섹션 순차 구현

디렉토리 탐색(list_dir 등)의 파일 목록을 바탕으로, 순차적으로 구현을 진행합니다.
모든 섹션을 **하나씩** 완료한 후 다음 섹션으로 이동합니다 (예: intro → body1 → outro).

각각의 독립된 `{section}`별로 다음을 수행합니다:

#### 2-1. 기획서 및 컨텍스트 확인

- 먼저 `public/{project_id}/{section}/{section}_plan.md`를 읽으세요.
- 이후 `public/{project_id}/{section}/{section}_context.md` 를 읽어 원본 대본과 타임스탬프 타이밍을 더블체크합니다.
- `public/{project_id}/design-system.md`가 존재하면 읽고, 구현 시 브랜드 규약(색상 톤, 폰트, 하단 자막 규격, 캐릭터 등)을 반영합니다.

#### 2-2. 자막 배열 생성

**매우 중요한 부분이므로 집중하세요**

- 정확한 자막 타이밍을 기준으로 파일(`{section}_subtitles.ts`)에 자막 배열(`Subtitle[]`)을 하드코딩합니다. 자막의 타이밍은 `startMs`/`endMs`(밀리초 단위)를 사용하며, 해당 섹션 오디오 파일의 실제 재생 시간(ms)과 정확히 일치하게 작성해야 합니다.
- **원본 대본 100% 준수**: Whisper 타임스탬프에서 추출된 텍스트(환각 오류 방지)는 무시하고, 필수적으로 기획서(`{section}_plan.md`)의 원본 대본을 요약/생략 없이 그대로 사용하세요.

```typescript
import { Subtitle } from "../../../types/subtitle";

export const introSubtitles: Subtitle[] = [
  {
    startMs: 0,
    endMs: 2260,
    text: {원본과 완전히 동일한 텍스트를 입력하세요},
  },
  {
    startMs: 2260,
    endMs: 4520,
    text: "문장이 30자 이상으로 길다면 가독성을 고려해 의미 단위로\n줄바꿈 문자를 추가해 2줄로 표시되도록 하세요",
  },

  // ... 이하 동일 구조
];
```

#### 2-3. 시퀀스 파일 생성

기획서의 각 시퀀스(Seq)에 대응하는 `seq{N}.tsx` 파일을 생성합니다.
(배치 경로: `src/projects/{project_id}/{section}/seq{N}.tsx`)

**세부 시퀀스 분할을 적용한 시퀀스 파일 구현 예시:**

기획서에 `세부 시퀀스 (Sub-sequences) 분할 계획`이 명시되어 있거나, 구현 시 시퀀스 내부 애니메이션이 복잡해질 경우 `seq{N}.tsx` 내부에서 Remotion의 `<Sequence>` 컴포넌트를 활용하여 구간별로 장면을 촘촘하게 나누어 구현하세요.
**[주의]** 내부 `<Sequence>`들의 `from`과 `durationInFrames`의 합산 프레임이 상위 루트 컴포넌트(`{section}.tsx`)에서 할당해 준 Seq{N} 전체 시퀀스 길이를 절대 초과하지 않아야 합니다. 프레임이 초과하면 애니메이션이 중간에 잘리게 됩니다.

```typescript
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Seq1: React.FC = () => {
  // 전체 컴포넌트에서 공통으로 쓰이는 컨텍스트나 변수 선언

  return (
    <AbsoluteFill style={{ /* design-system 공통 배경 등 스타일 적용 */ }}>
      {/* SubSeq 1: 0~60 프레임 구간 */}
      <Sequence from={0} durationInFrames={60}>
         {/* 해당 구간만의 시각 요소 및 애니메이션 (예: 텍스트 등장) */}
      </Sequence>

      {/* SubSeq 2: 60~180 프레임 구간 */}
      <Sequence from={60} durationInFrames={120}>
         {/* 다음 구간만의 시각 요소 및 애니메이션 (예: 메인 그래픽 연출) */}
      </Sequence>
    </AbsoluteFill>
  );
};
```

#### 2-4. 섹션 루트 컴포넌트 업데이트

최상위 섹션 루트 파일인 `src/projects/{project_id}/{section}/{section}.tsx`를 수정합니다.

- 작성했던 모든 시퀀스를 `Series` 객체로 합성합니다.
- **Audio 컴포넌트는 섹션 루트에서 한 번만** 배치합니다.
- 단일 `Series.Sequence`의 `durationInFrames` 수치를 기획서에 명시된 기간으로 맞춰 설정합니다.
- [중요] 프레임 패딩: 오디오 파일에는 마지막 대사 이후 묵음 여백(Tail)이 존재하므로, 각 seq의 `durationInFrames`를 합산했을 때 해당 섹션의 전체 오디오/자막 재생 시간(프레임 환산)과 정확히 일치해야 합니다. 계획 단계에서 한번 수정하긴 했지만, 최종적으로 검토해서 이전 seq와 다음 seq 사이에 빈틈이 있다면 이전 seq의 `durationInFrames`에 그 여백을 더해서 채워주세요.

##### 자막 처리 가이드

- 섹션 루트 컴포넌트(`{section}.tsx`)의 최상위 `AbsoluteFill` 가장 하단에 `src/shared-components/CaptionOverlay.tsx`를 배치하여 자막이 모든 영상 시각 요소 위에 오버레이 되도록 합니다.
- 위에서 생성한 `{section}_subtitles` 배열을 `captions` props로 전달합니다. (`CaptionOverlay`가 내부적으로 `whiteSpace: 'pre-line'` 기법 및 애니메이션을 모두 처리하므로 별도의 스타일링은 불필요합니다.)

```tsx
import React from "react";
import { AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import { introSubtitles } from "./intro_subtitles";
import { Seq1 } from "./seq1";

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* 1. 오디오는 루트 컴포넌트에서만 단 한 번 선언 및 렌더링 */}
      <Audio src={staticFile("project_id/intro/intro.wav")} />

      {/* 2. 각 시퀀스(화면)들을 Series로 연결 */}
      <Series>
        <Series.Sequence durationInFrames={120}>
          <Seq1 />
        </Series.Sequence>
        {/* ... 추가 시퀀스들 */}
      </Series>

      {/* 3. 화면 최상단에 렌더링되도록 문서 제일 마지막에 자막 오버레이 컴포넌트 배치 */}
      <CaptionOverlay captions={introSubtitles} />
    </AbsoluteFill>
  );
};
```

### 3. 필수 준수 규칙 (프로젝트 고유 제약사항)

> 💡 Remotion 기초 문법(`interpolate`, `spring`, `staticFile`, `extrapolate: 'clamp'` 등)은 반복 명시하지 않으며 `remotion-best-practices` 스킬을 따릅니다. 워크플로우 실행 시 다음의 프로젝트 핵심 원칙을 우선 준수합니다.

- **오디오 스코프 격리 (중요):** 절대 개별 시퀀스 파일(`seq{N}.tsx`) 내부에 `<Audio>` 컴포넌트를 배치하거나 렌더링하지 마세요. 오디오는 오직 최상위 `{section}.tsx` 컴포넌트에서만 단일 재생되며, 개별 시퀀스는 화면 요소만 시점에 맞게 렌더링해 오디오 드리프트를 방지합니다.
- **다채로운 레이아웃과 CSS 기법 (의무):** 뻔한 중앙 정렬(Center align)과 단순 페이드 인을 남발하는 것을 금지합니다. 매 씬마다 기획서를 바탕으로 **단순하지 않은 창의적인 구도**를 구현해야 합니다.
  - 다양한 화면 분할(Flexbox, Grid), 비대칭 배치, 대각선 구도를 적극 활용하세요.
  - 3D 효과(`perspective`), 클리핑 마스크(`clipPath`), SVG 패스 애니메이션, 엇박자 타이밍 등 **고급 CSS/Remotion 기법**을 최소 하나 이상 적용하여 역동성을 부여하세요.
- **디자인 시스템 및 색상 활용:** `design-system.md`에 명시된 기본 색상을 우선적으로 준수하되, 영상의 **전체적인 톤앤매너(무드)**를 해치지 않는 범위 내에서는 텍스트 강조, 타이포그래피 모션, 그라데이션 등을 위해 팔레트 외의 다채로운 색상을 자유롭게 활용하세요. 단조로운 색상 배합보다는 시각적 풍부함을 우선시합니다.
- **언어 및 텍스트 (현지화):**
  - 화면에 노출되는 UI 텍스트는 고유명사나 영어 약어를 제외하고 대본과 동일한 언어(예: 한국어)로 작성하세요.

### 4. 린트 (결함 점검)

// turbo

```bash
npm run lint
```
