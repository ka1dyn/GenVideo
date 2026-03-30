---
name: video-project-workflow
description: AI 유튜브 영상 프로젝트 생성 및 Scene 구성 워크플로우
---

# 영상 프로젝트 워크플로우

이 가이드는 Remotion 기반 AI 유튜브 영상을 자동 생성하는 전체 워크플로우를 설명합니다.

## 프로젝트 구조

각 영상 프로젝트는 다음 구조를 따릅니다:

```
src/projects/{project-id}/
├── config.ts          ← 프로젝트 메타 (id, title, fps, 해상도)
├── script.ts          ← 대본 데이터 (scene별 텍스트 + 오디오 경로)
├── index.tsx          ← Composition (calculateMetadata + TransitionSeries)
└── scenes/
    ├── scene1/
    │   └── Scene1.tsx
    └── scene2/
        └── Scene2.tsx

public/projects/{project-id}/
├── audio/             ← TTS로 생성된 WAV 파일들
│   ├── scene1.wav
│   └── scene2.wav
└── images/            ← Scene에서 사용할 이미지
```

## 공유 리소스 (Assembler Architecture)

모든 Scene은 아래의 공유 리소스를 사용하여 **일관된 디자인**을 유지합니다:

| 경로 | 설명 |
| --- | --- |
| `src/shared/constants/design.ts` | Vercel Geist 기반 색상·폰트·간격·타이포 상수 |
| `src/shared/constants/animations.ts` | Spring·Timing·Easing 프리셋 |
| `src/shared/components/` | 21개 UI 컴포넌트 (Typography, Surfaces, Data, Visual, Media) |
| `src/shared/layouts/` | 6개 레이아웃 (Centered, Split, Stack, FullBleed, Grid, TopBottom) |
| `src/shared/types/project.ts` | `SceneScript`, `ProjectConfig`, `ProjectProps` 타입 |
| `src/shared/utils/audio.ts` | `getAudioDuration()` — mediabunny 래퍼 |
| `src/shared/styles/global.css` | 공통 CSS (Geist 폰트 로드 + 디자인 토큰) |

> **핵심 원칙**: AI는 원시 HTML, 매직 넘버, 자유 배치를 사용하지 않으며,
> 반드시 `shared/components`와 `shared/layouts`에서 import하여 조립합니다.

## 워크플로우 단계

1~3단계는 사용자가 직접 실행하는 내용입니다. 따라서 내용만 이해하고 따로 실행할 필요는 없습니다.

---

### 1. 프로젝트 생성

```bash
./scripts/new-project.sh <project-id>
# 예: ./scripts/new-project.sh ai-future
```

이 스크립트는 `_template`을 복사하고 placeholder를 치환합니다.

### 2. 대본 파일 구조화 (`script.ts`)

```bash
npx tsx scripts/parse-script.ts <project-id>
# 예: npx tsx scripts/parse-script.ts ai-future
```

`src/sources/{project-id}/script.txt`를 바탕으로
`src/projects/{project-id}/script.ts`에 Scene별 대본을 구조화합니다.

**주의**: `durationInSeconds`는 작성하지 않으며, WAV 파일에서 자동 계산됩니다.

### 3. WAV 생성

```bash
conda activate qwen3-tts
python3 scripts/generate-audio.py <project-id>
```

생성된 WAV는 `public/projects/{id}/audio/`에 저장됩니다.

---

`src/projects/{project-id}/script.ts`
`public/projects/{project-id}/audio/`

두 파일이 잘 생성되었는지 확인합니다. 문제가 있다면 사용자에게 요청하고 대기합니다.

### 4. Root.tsx에 프로젝트 등록

> **Scene을 만들기 전에 먼저 등록합니다.** Root.tsx에 프로젝트가 등록되어 있어야
> 이후 각 Scene을 `index.tsx`에 추가하는 것만으로 Remotion Studio에서 바로 테스트할 수 있습니다.

```tsx
// src/Root.tsx
import {
  Composition as AiFuture,
  calculateMetadata as aiFutureMeta,
} from "./projects/ai-future";
import { config as aiFutureConfig } from "./projects/ai-future/config";

// <Folder name="Projects"> 안에 추가:
<Composition
  id={aiFutureConfig.id}
  component={AiFuture}
  calculateMetadata={aiFutureMeta}
  durationInFrames={300}
  fps={aiFutureConfig.fps}
  width={aiFutureConfig.width}
  height={aiFutureConfig.height}
  defaultProps={{ sceneDurations: [] } satisfies ProjectProps}
/>;
```

등록 후 `npm run dev`로 Remotion Studio에서 프로젝트가 보이는지 확인합니다.

### 5. Scene 컴포넌트 구성 (Scene별 반복)

각 Scene은 독립적인 React 컴포넌트이며, **한 번에 하나씩** 개별 요청하여 개발합니다.
Root.tsx에 프로젝트가 이미 등록되어 있으므로, 각 Scene은 `index.tsx`의 `SCENES` 배열에 추가하는 것만으로 **즉시 미리보기가 가능**합니다.

**개발 절차:**

1. `script.ts`에서 Scene 개수를 확인합니다.
2. Scene 1부터 순서대로, 각 Scene을 **별도의 대화**에서 요청합니다.
3. 각 요청 시 `scene-development` 스킬을 참조합니다.

**Scene 요청 시 포함할 정보:**

> "Scene 2 만들어줘"
> - 이 씬이 소제목의 **첫 번째 씬**인지, **후속 씬**인지 명시
> - 첫 번째 씬이면 소제목 이름 포함 (예: `sectionTitle="핵심 원리"`)
> - (컨텍스트: `@src/projects/{project-id}/script.ts`, `@src/custom-skills/scene-development.md`)

**Scene 개발 스킬:** `src/custom-skills/scene-development.md`에 아래 내용이 정리되어 있습니다:

- 4대 금지 원칙 (원시 HTML, 매직 넘버, 자유 배치, Duration 관여)
- 디자인 규칙 (Vercel Geist 기반 색상·타이포·애니메이션)
- SectionLabel 규칙 (소제목 첫 씬만 필수)
- 컴포넌트 카탈로그 (21개) + 레이아웃 카탈로그 (6개)
- 컴포넌트 템플릿 + Import 경로

**핵심 규칙 요약:**

- `useCurrentFrame()`은 Scene 내부의 **로컬 프레임** (0부터 시작)을 반환
- Scene 컴포넌트 안에서 오디오 duration을 알 필요 없음 — `TransitionSeries`가 처리
- 새 Scene을 추가하면 `index.tsx`의 `SCENES` 배열에 등록
- `script.ts`의 scene 순서와 `SCENES` 배열의 순서가 반드시 일치해야 함
- **원시 HTML 금지** — 반드시 `shared/components`에서 import
- **SectionLabel**: 소제목 첫 씬이면 `sectionTitle` 필수, 후속 씬이면 생략

### 6. 미리보기 및 렌더링

```bash
# Remotion Studio에서 미리보기
npm run dev

# 최종 렌더링
npx remotion render <composition-id>
```

## Duration 계산 방식

`calculateMetadata`가 렌더 전에 실행되어:

1. 각 Scene의 WAV에서 `getAudioDuration()`으로 초 단위 길이를 가져옴
2. 트랜지션으로 겹치는 시간을 빼서 총 프레임 수 계산
3. `sceneDurations` 배열을 props으로 Composition에 전달
4. 각 `TransitionSeries.Sequence`가 해당 duration만큼 재생

## 영상 흐름 구조

```
intro → 소제목1 → 소제목2 → ... → 소제목N → outro
```

각 소제목은 1개 이상의 Scene으로 구성됩니다.
소제목의 **첫 번째 씬**에서만 `sectionTitle`을 지정하여 SectionLabel을 표시하고,
이후 부수 설명 씬에서는 생략하여 콘텐츠에 집중합니다.
