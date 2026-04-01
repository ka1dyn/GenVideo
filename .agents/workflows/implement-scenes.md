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

#### 2-1. 자막 배열 생성

**매우 중요한 부분이므로 집중하세요**

- `public/{project_id}/{section}/{section}_final_timeline.json`에 기록된 sentence 타이밍을 기준으로 파일(`{section}_subtitles.ts`)에 자막 배열(`Subtitle[]`)을 하드코딩합니다. 자막의 타이밍은 `startMs`/`endMs`(밀리초 단위)를 사용합니다.

```typescript
import { Subtitle } from "../../../types/Subtitle";

export const introSubtitles: Subtitle[] = [
  {
    startMs: 0,
    endMs: 2900,
    text: {sentence 텍스트 입력},
  },
  {
    startMs: 2900,
    endMs: 5860,
    text: "문장이 30자 이상으로 길다면 가독성을 고려해 의미 단위로\n줄바꿈 문자를 추가해 2줄로 표시되도록 하세요",
  },

  // ... 이하 동일 구조
];
```

#### 2-2. 필수 준수 규칙 (프로젝트 고유 제약사항)

> 💡 Remotion 기초 문법(`interpolate`, `spring`, `staticFile`, `extrapolate: 'clamp'` 등)은 반복 명시하지 않으며 `remotion-best-practices` 스킬을 따릅니다. 워크플로우 실행 시 다음의 프로젝트 핵심 원칙을 우선 준수합니다.

- AI 본인이 세계적인 예술가, 연출가, 크리에이터가 된 것처럼, 사람들의 이목을 끌 수 있는 압도적인 연출을 구현해내세요.
- 기존의 UI/UX 지식에 절대 얽매이지 않습니다.
- **다채로운 레이아웃과 CSS 기법 (의무):** 뻔한 중앙 정렬(Center align)과 단순 페이드 인을 남발하는 것을 금지합니다. 매 씬마다 기획서를 바탕으로 **단순하지 않은 창의적인 구도**를 구현해야 합니다.
  - 다양한 화면 분할(Flexbox, Grid), 비대칭 배치, 대각선 구도를 적극 활용하세요.
  - 3D 효과(`perspective`), 클리핑 마스크(`clipPath`), SVG 패스 애니메이션, 엇박자 타이밍 등 **고급 CSS/Remotion 기법**을 최소 하나 이상 적용하여 역동성을 부여하세요.
- **언어 및 텍스트 (중요! 반드시 지키기):**
  - 화면에 노출되는 UI 텍스트는 회사명, 약어 등 영어로만 나타낼 수 있는 부분을 제외하고 전부 한국어 단어로 작성합니다.

#### 2-3. 기획서 및 컨텍스트 확인

- 먼저 `public/{project_id}/{section}/{section}_plan.md`를 읽으세요.
- 이후 `public/{project_id}/{section}/{section}_final_timeline.json` 를 읽어 원본 대본과 시퀀스 타임스탬프 타이밍을 더블체크합니다.
- [중요]`public/{project_id}/design-system.md`가 존재하면 다시 읽고, 구현 시 브랜드 규약(색상 톤, 폰트, 무드 등)을 반영합니다.

#### 2-4. 시퀀스 컴포넌트 파일 생성

기획서의 각 시퀀스들을 나열할 시퀀스 컴포넌트 파일을 생성합니다.
(배치 경로: `src/projects/{project_id}/{section}/sequences.tsx`)

```tsx
import React from "react";
import { AbsoluteFill, Series } from "remotion";

// 하위 시퀀스(씬)들을 단일 파일 내에 컴포넌트로 분리하여 정의합니다.
const Scene1: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 
        - 기획서에 써 있는 내용을 기반으로 창의적이고 독창적이며, 대본 맥락에
        잘 맞아서 시청자들이 이해하기 쉬운 방식으로 구현합니다. 
        - 각 Scene 내부에서 Sequence를 또 나눠서 사용해도 좋습니다 판단대로 진행하세요.
        - 시퀀스 길이에 맞게, 후반부까지 애니메이션이 다양하게 이어지도록 합니다.
        - 만약 단어 단위의 애니메이션이 필요하다면, final_timeline.json에 기록된
        **현재 sentence**의 단어 타임스탬프을 참고해서 구현합니다.
      */}
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  return <AbsoluteFill>{/* 씬 2 구현 내용 */}</AbsoluteFill>;
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      {/* Series 내부에 Series.Sequence를 사용하여 각 씬을 타임라인에 순차적으로 배치합니다. */}
      {/* durationInFrames는 기획서에 명시된 해당 씬의 프레임 길이에 맞게 설정합니다. */}
      <Series.Sequence durationInFrames={120}>
        <Scene1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <Scene2 />
      </Series.Sequence>
    </Series>
  ); // return
};
```

#### 2-5. 섹션 루트 컴포넌트 업데이트

최상위 섹션 루트 파일인 `src/projects/{project_id}/{section}/{section}.tsx`를 수정합니다.

##### 자막 처리 가이드

- 섹션 루트 컴포넌트(`{section}.tsx`)의 최상위 `AbsoluteFill` 가장 하단에 `src/shared-components/CaptionOverlay.tsx`를 배치하여 자막이 모든 영상 시각 요소 위에 오버레이 되도록 합니다.
- 위에서 생성한 `{section}_subtitles` 배열을 `captions` props로 전달합니다. (`CaptionOverlay`가 내부적으로 `whiteSpace: 'pre-line'` 기법 및 애니메이션을 모두 처리하므로 별도의 스타일링은 불필요합니다.)

```tsx
import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import { introSubtitles } from "./intro_subtitles";
import { Sequences } from "./sequences";

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 1. 오디오는 루트 컴포넌트에서만 단 한 번 선언 및 렌더링 */}
      <Audio src={staticFile("project_id/intro/intro.wav")} />

      {/* 2. 하위 씬들의 묶음인 Sequences 렌더링 (단일 파일에서 모든 자식 씬 조립됨) */}
      <Sequences />

      {/* 3. 화면 최상단에 렌더링되도록 문서 제일 마지막에 자막 오버레이 컴포넌트 배치 */}
      <CaptionOverlay captions={introSubtitles} />
    </AbsoluteFill>
  );
};
```

### 3. 린트 (결함 점검)

// turbo

```bash
npm run lint
```
