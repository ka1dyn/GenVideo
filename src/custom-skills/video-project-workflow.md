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
    │   ├── Scene1.tsx
    │   └── [Subcomponent].tsx
    └── scene2/
        └── Scene2.tsx

public/projects/{project-id}/
├── audio/             ← TTS로 생성된 WAV 파일들
│   ├── scene1.wav
│   └── scene2.wav
└── images/            ← Scene에서 사용할 이미지
```

## 워크플로우 단계

1~3단계는 사용자가 직접 실행하는 내용입니다. 따라서 내용만 이해하고 따로 실행할 필요는 없습니다.

---

### 1. 프로젝트 생성

프로젝트 생성 방법

```bash
./scripts/new-project.sh <project-id>
# 예: ./scripts/new-project.sh ai-future
```

이 스크립트는 `_template`을 복사하고 placeholder를 치환합니다.

### 2. 대본 파일 구조화 (`script.ts`)

구조화 방법

```bash
npx tsx scripts/parse-script.ts <project-id>
# 예: npx tsx scripts/parse-script.ts ai-future
```

`src/sources/{project-id}/script.txt`를 바탕으로
`src/projects/{project-id}/script.ts`에 Scene별 대본을 구조화합니다.

**주의**: `durationInSeconds`는 작성하지 않으며, WAV 파일에서 자동 계산됩니다.

### 3. WAV 생성

TTS 함수를 사용하여 대본에서 WAV를 생성합니다:

```bash
conda activate qwen3-tts
python3 scripts/generate-audio.py <project-id>
```

생성된 WAV는 `public/projects/{id}/audio/`에 저장됩니다.

---

`src/projects/{project-id}/script.ts`
`public/projects/{project-id}/audio/`

두 파일이 잘 생성되었는지 확인합니다. 문제가 있다면 사용자에게 요청하고 대기합니다.

### 4. Scene 컴포넌트 구성 (Scene별 반복)

각 Scene은 독립적인 React 컴포넌트이며, **한 번에 하나씩** 개별 요청하여 개발합니다.

**개발 절차:**

1. `script.ts`에서 Scene 개수를 확인합니다.
2. Scene 1부터 순서대로, 각 Scene을 **별도의 대화**에서 요청합니다.
3. 각 요청 시 `scene-development` 스킬을 참조합니다.

**Scene 요청 예시:**

> "Scene 2 만들어줘"  
> (컨텍스트: `@src/projects/{project-id}/script.ts`, `@src/custom-skills/scene-development.md`)

**Scene 개발 스킬:** `src/custom-skills/scene-development.md`에 아래 내용이 정리되어 있습니다:

- 대본 확인 → 오디오 길이 확인 → 컴포넌트 작성 → index.tsx 등록 → 미리보기
- 프레임/타이밍 규칙, 애니메이션 규칙, 디자인 토큰, 컴포넌트 템플릿
- 추가 Remotion 규칙 참조 경로

**핵심 규칙 요약:**

- `useCurrentFrame()`은 Scene 내부의 **로컬 프레임** (0부터 시작)을 반환
- Scene 컴포넌트 안에서 오디오 duration을 알 필요 없음 — `TransitionSeries`가 처리
- 새 Scene을 추가하면 `index.tsx`의 `SCENES` 배열에 등록
- `script.ts`의 scene 순서와 `SCENES` 배열의 순서가 반드시 일치해야 함

### 5. Root.tsx에 프로젝트 등록

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

## 공유 리소스

| 경로                           | 설명                                                |
| ------------------------------ | --------------------------------------------------- |
| `src/shared/types/project.ts`  | `SceneScript`, `ProjectConfig`, `ProjectProps` 타입 |
| `src/shared/utils/audio.ts`    | `getAudioDuration()` — mediabunny 래퍼              |
| `src/shared/styles/global.css` | 공통 CSS 변수 (색상, 폰트, 간격)                    |
