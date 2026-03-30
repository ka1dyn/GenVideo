---
name: video-project-workflow
description: AI 유튜브 영상 프로젝트 생성 및 Scene 구성 워크플로우
---

# 영상 프로젝트 워크플로우

이 가이드는 Remotion 기반 AI 유튜브 영상을 자동 생성하는 전체 워크플로우를 설명합니다.

## 핵심 구조

| 단위 | 역할 | 길이 | 오디오 |
|------|------|------|--------|
| **Scene** | 챕터 (소제목 단위) | ~2분 | Segment WAV의 합산 |
| **Segment** | 오디오 싱크 최소 단위 | 10-20초 | 개별 WAV |

## 프로젝트 구조

```
src/projects/{project-id}/
├── config.ts          ← 프로젝트 메타 (id, title, fps, 해상도)
├── script.ts          ← 대본 데이터 (Scene → Segment별 텍스트 + 오디오 경로)
├── index.tsx          ← Composition (calculateMetadata + TransitionSeries)
└── scenes/
    ├── scene1/
    │   └── Scene1.tsx  ← 내부에 Segment 렌더러 + nested TransitionSeries
    └── scene2/
        └── Scene2.tsx

public/projects/{project-id}/
├── audio/
│   ├── scene1/        ← Scene별 디렉토리
│   │   ├── seg1.wav   ← Segment 단위 오디오
│   │   ├── seg2.wav
│   │   └── seg3.wav
│   └── scene2/
│       ├── seg1.wav
│       └── seg2.wav
└── images/            ← Scene에서 사용할 이미지
```

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
`src/projects/{project-id}/script.ts`에 Scene·Segment별 대본을 구조화합니다.

**`script.txt` 형식:**

```
[Scene1 start]
첫 번째 세그먼트 대본 텍스트
---
두 번째 세그먼트 대본 텍스트
---
세 번째 세그먼트 대본 텍스트
[Scene1 end]

[Scene2 start]
첫 번째 세그먼트
---
두 번째 세그먼트
[Scene2 end]
```

- `[SceneN start]`/`[SceneN end]`로 Scene 구분
- Scene 내부에서 `---`로 Segment 구분
- `sectionTitle`은 파서가 자동 추출하지 않으며, 이후 AI가 `script.ts`에서 직접 추가

### 3. WAV 생성

```bash
conda activate qwen3-tts
python3 scripts/generate-audio.py <project-id>
```

생성된 WAV는 `public/projects/{id}/audio/scene{N}/seg{M}.wav`에 저장됩니다.

---

**확인 사항:**
- `src/projects/{project-id}/script.ts` — Segment 구조가 올바른지
- `public/projects/{project-id}/audio/scene{N}/` — 모든 WAV 파일 존재하는지

문제가 있다면 사용자에게 요청하고 대기합니다.

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
  defaultProps={{ segmentDurations: [] } satisfies ProjectProps}
/>;
```

등록 후 `npm run dev`로 Remotion Studio에서 프로젝트가 보이는지 확인합니다.

### 5. Scene 컴포넌트 구성 (Scene별 반복)

각 Scene은 독립적인 React 컴포넌트이며, **한 번에 하나씩** 별도의 대화에서 요청하여 개발합니다.
Root.tsx에 프로젝트가 이미 등록되어 있으므로, 각 Scene은 `index.tsx`의 `SCENES` 배열에 추가하는 것만으로 **즉시 미리보기가 가능**합니다.

**개발 절차:**

1. `script.ts`에서 Scene 개수와 각 Scene의 Segment 수를 확인합니다.
2. Scene 1부터 순서대로, 각 Scene을 **별도의 대화**에서 요청합니다.
3. 각 요청 시 `scene-development` 스킬을 참조합니다.

**Scene 요청 시 포함할 정보:**

> "Scene 2 만들어줘"
>
> - (컨텍스트: `@src/projects/{project-id}/script.ts`, `@src/projects/{project-id}/index.tsx`, `@src/custom-skills/scene-development.md`)

**Scene 개발 상세 가이드:** `src/custom-skills/scene-development.md`를 참조합니다.

### 6. 미리보기 및 렌더링

```bash
# Remotion Studio에서 미리보기
npm run dev

# 최종 렌더링
npx remotion render <composition-id>
```

## 공유 리소스 (Assembler Architecture)

모든 Scene은 아래의 공유 리소스를 사용하여 **일관된 디자인**을 유지합니다:

| 경로                                 | 설명                                                              |
| ------------------------------------ | ----------------------------------------------------------------- |
| `src/shared/constants/design.ts`     | Vercel Geist 기반 색상·폰트·간격·타이포 상수                      |
| `src/shared/constants/animations.ts` | Spring·Timing·Easing 프리셋 + 트랜지션 타이밍 상수                |
| `src/shared/components/`             | 21개 UI 컴포넌트 (Typography, Surfaces, Data, Visual, Media)      |
| `src/shared/layouts/`                | 6개 레이아웃 (Centered, Split, Stack, FullBleed, Grid, TopBottom) |
| `src/shared/types/project.ts`        | `SegmentScript`, `SceneScript`, `ProjectConfig`, `ProjectProps`   |
| `src/shared/utils/audio.ts`          | `getAudioDuration()` — mediabunny 래퍼                            |
| `src/shared/styles/global.css`       | 공통 CSS (Geist 폰트 로드 + 디자인 토큰)                          |

> **핵심 원칙**: AI는 원시 HTML, 매직 넘버, 자유 배치를 사용하지 않으며,
> 반드시 `shared/components`와 `shared/layouts`에서 import하여 조립합니다.

## Duration 계산 방식

`calculateMetadata`가 렌더 전에 실행되어:

1. 각 Segment의 WAV에서 `getAudioDuration()`으로 초 단위 길이를 가져옴
2. Scene별 total = sum(Segment durations) - 내부 트랜지션 겹침
3. 전체 total = sum(Scene durations) - Scene 간 트랜지션 겹침
4. `segmentDurations: number[][]`를 props으로 Composition에 전달
5. 각 Scene 컴포넌트가 `segmentDurations[i]`를 받아 내부 `TransitionSeries`로 시퀀싱

## 영상 흐름 구조

```
Scene1 (소제목1)                    Scene2 (소제목2)
┌─────────────────────────────┐    ┌─────────────────────────────┐
│ Seg1 → Seg2 → Seg3 → ...   │ ── │ Seg1 → Seg2 → ...           │ ── ...
│   ↑ sectionTitle 표시       │    │   ↑ sectionTitle 표시       │
└─────────────────────────────┘    └─────────────────────────────┘
      내부: fade (0.3s)                   내부: fade (0.3s)
                        Scene 간: fade (0.5s)
```

각 Scene은 `sectionTitle`을 가지며, 첫 번째 Segment에서만 SectionLabel을 표시합니다.
