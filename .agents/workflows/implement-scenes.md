---
description: 기획서를 바탕으로 Remotion 씬을 순차적으로 구현하는 워크플로우
---

# /implement-scenes {project_id}

섹션별 Remotion 영상 계확서를 바탕으로 실제 코드로 영상을 구현하는 워크플로우입니다.

## 최종 프로젝트 구조

```
public/{project_id}/
    design-system.md
    {section}/
        {section}.txt
        {section}.wav
        {section}_timestamp.json
        {section}_context.md
        {section}_final_timeline.json
        {section}_plan.md

src/constants/
    video-config.ts

src/projects/{project_id}/
    theme.ts                        <--- 디자인 시스템의 상수 모음 (여기서 import 하여 사용)
    {section}/
        {section}_subtitles.ts      <--- 해당 섹션의 자막 타이밍 배열
        {section}.tsx               <--- 해당 섹션의 최상위 Series 래퍼 및 Audio 컴포넌트
        sequences.tsx               <--- 각 section의 시퀀스 컴포넌트 모음

src/shared-components/
    CaptionOverlay.tsx

```

## 사전 조건

- 각 섹션의 기획서 작성 완료 (`public/{project_id}/{section}/{section}_plan.md`)
- 디자인 테마 파일 생성 완료 (`src/projects/{project_id}/theme.ts`)

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

### 2. 섹션 순차 구현(Loop)

디렉토리 탐색(list_dir 등)의 파일 목록을 바탕으로, 순차적으로 구현을 진행합니다.
모든 섹션을 **하나씩** 완료한 후 다음 섹션으로 이동합니다 (예: intro → body1 → outro).

각각의 독립된 `{section}`별로 다음을 수행합니다:

#### 2-1. 자막 배열 하드코딩

- `public/{project_id}/{section}/{section}_final_timeline.json`에 기록된 sentence 타이밍을 기준으로 `src/projects/{project_id}/{section}/{section}_subtitles.ts` 파일에 자막 배열(Subtitle[])을 하드코딩합니다.

```typescript
import { Subtitle } from "../../../types/Subtitle";

export const introSubtitles: Subtitle[] = [
  {
    startMs: 0,
    endMs: 2900,
    text: "단어를 조합한 원본과 일치하는 문장",
  },
  {
    startMs: 2900,
    endMs: 5860,
    text: "문장이 30자 이상으로 길다면 가독성을 고려해 의미 단위로\n줄바꿈 문자를 추가해 2줄로 표시되도록 하세요",
  },
  // ... 이하 동일 구조
];
```

#### 2-2. 기획서 확인

각 섹션의 대본(`public/{project_id}/{section}/{section}.txt`)과 기획서(`public/{project_id}/{section}/{section}_plan.md`)를 확인하고 주제, 내용, 맥락을 이해합니다.

#### 2-3. 공통 UI/애니메이션 컴포넌트 선행 생성 (Componentize)

본격적인 씬 구현에 앞서, 기획서를 분석하여 반복적으로 등장하는 UI 패턴이나 특수 애니메이션을 독립된 공용 컴포넌트로 먼저 추출하세요.

- **생성 경로:** `src/projects/{project_id}/components/`
- **설계 원칙 (Separation of Concerns):**
  1. **로직 중심 설계:** 컴포넌트는 `spring`, `interpolate`를 활용한 **'움직임의 로직'** 구현에 집중하세요. (예: "글자가 튀어 오르는 물리 법칙")
  2. **스타일 주입 (Props):** `color`, `fontSize`, `fontWeight`, `delay` 등 시각적 속성은 내부에서 결정하지 말고 **반드시 Props를 통해 외부에서 주입**받도록 만드세요.
  3. **순수성 유지:** 컴포넌트 파일 자체에서 `theme.ts`를 직접 참조(Import)하는 것을 지양하고, **사용하는 쪽(Scene)에서 `theme.ts`의 상수를 Prop으로 넘겨주도록** 유도하여 재사용성을 극대화하세요.
- **중복 방지:** 이미 `components/` 폴더에 생성된 동일한 목적의 컴포넌트가 있다면 새로 만들지 말고 적극적으로 재사용하세요.

#### 2-4. 시퀀스 스켈레톤(껍데기) 선행 생성

`src/projects/{project_id}/{section}/sequences.tsx` 파일을 생성하고 아래와 같이 뼈대를 잡습니다.

- [매우중요] 각 Scene 컴포넌트 바로 위에 JSDoc(/\*\* \*/)을 열고, {section}\_plan.md에 있는 해당 씬의 '원본 텍스트'와 '비주얼 컨셉'을 그대로 복사하여 주석으로 삽입하세요.
- 최하단 Sequences 컴포넌트에는 <Series>를 절대 사용하지 말고, `public/{project_id}/{section}/{section}_final_timeline.json`에 명시된 startFrame과 durationInFrames 값을 가져와 **절대 좌표 <Sequence>**로 렌더링하세요.

```tsx
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
// import { COLORS, FONTS } from "../theme"; // 테마 임포트 예시

/**
 * [Scene 1 기획안]
 * 원본 텍스트: (plan.md의 해당 scene 텍스트를 그대로 복사하여 삽입)
 * 비주얼 컨셉: (plan.md의 내용을 그대로 복사하여 삽입)
 */
const Scene1: React.FC = () => {
  // TODO: Phase 2에서 구현
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트:
 * 비주얼 컨셉:
 */
const Scene2: React.FC = () => {
  // TODO: Phase 2에서 구현
  return <AbsoluteFill></AbsoluteFill>;
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* json의 startFrame과 durationInFrames 값을 하드코딩 매핑 */}
      <Sequence from={0} durationInFrames={94}>
        <Scene1 />
      </Sequence>
      <Sequence from={94} durationInFrames={178}>
        <Scene2 />
      </Sequence>
    </AbsoluteFill>
  );
};
```

#### 2-5. 구현 전 필수 준수 규칙 (수석 디자이너 페르소나 적용)

> 💡 뼈대가 완성되었습니다. 이제 빈 컴포넌트를 채워 넣을 차례입니다. 당신은 지금부터 Apple, Vercel, Toss와 같은 최고 수준의 IT 기업에서 일하는 수석 UI/UX 모션 디자이너입니다. 복잡하고 유치한 연출을 철저히 배제하고, 깔끔하고 구조적인 코드로 세련미를 극대화하세요.

- 미니멀리즘과 구조적 레이아웃: 뻔한 중앙 정렬이나 예술적인 기교보다는 타이포그래피, 여백, 정교한 Grid/Flexbox 정렬을 사용하여 전문적이고 신뢰감 있는 UI를 구성하세요.
- In-Scene Animation (1:1 대응): 잦은 화면 전환(Cut)을 금지합니다. 하나의 씬 내부에서 컴포넌트들이 spring과 interpolate를 통해 크기, 투명도, 위치를 물리적으로 쫀득하게 바꾸며 유기적으로 변형되도록 2~3단계 모션을 반드시 구현하세요.
- 클리셰 메타포 절대 금지 & 이모지 사용 금지: 가위, 전구, 돋보기 등 단어를 일차원적으로 표현하는 촌스러운 아이콘을 절대 사용하지 마세요. 또한 시스템 이모지(✅ 등) 사용을 엄격히 금지하며, 대신 순수 CSS나 SVG 패스를 활용해 직접 드로잉하세요.
- 디자인 시스템 강제: 색상, 그림자, 글로우 효과 등은 반드시 `src/projects/{project_id}/theme.ts`에 정의된 상수만 가져와서 사용해야 합니다.
- 언어 및 텍스트: 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.

#### 2-6. 디테일 구현(Chunking & Iteration)

- 규칙 숙지가 끝났다면, 스켈레톤 파일(`src/projects/{project_id}/{section}/sequences.tsx`)의 빈 컴포넌트를 최대 3개 단위(Chunk)로 묶어서 순차적으로 내부 UI와 애니메이션 로직을 채워 넣습니다.
- 다른 문서를 다시 열람할 필요 없이, 컴포넌트 바로 위에 적힌 기획 주석(JSDoc)에만 100% 의존하여 구현에 집중하세요.
- 모든 Scene의 TODO 코드를 완벽하게 채울 때까지 이 작업을 반복 수행합니다.

#### 2-7. 섹션 루트 컴포넌트 조립

최상위 섹션 파일(`src/projects/{project_id}/{section}/{section}.tsx`)을 수정하여 오디오, 화면(Sequences), 자막을 조립합니다.

```tsx
import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import { introSubtitles } from "./intro_subtitles";
import { Sequences } from "./sequences";

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile(`project_id/intro/intro.wav`)} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 화면 최상단 자막 오버레이 (whiteSpace: 'pre-line' 자동 처리됨) */}
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
