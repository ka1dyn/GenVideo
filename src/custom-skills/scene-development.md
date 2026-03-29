---
name: scene-development
description: 단일 Scene 컴포넌트 개발 가이드 — Scene 하나를 요청받았을 때 이 스킬을 참조합니다.
---

# Scene 개별 개발 가이드

이 스킬은 Remotion 영상 프로젝트에서 **Scene 하나를 독립적으로 개발**할 때 사용합니다.

## 사전 조건

Scene 개발을 시작하기 전에 아래 파일이 존재하는지 확인합니다:

- `src/projects/{project-id}/script.ts` — Scene별 대본
- `src/projects/{project-id}/config.ts` — 프로젝트 설정 (fps, 해상도 등)
- `public/projects/{project-id}/audio/scene{N}.wav` — 해당 Scene의 오디오

하나라도 없으면 사용자에게 알리고 대기합니다.

## 개발 절차

### 1. 대본 확인

`script.ts`에서 요청된 Scene의 대본 텍스트를 읽습니다.

```ts
// 예: script.ts에서 scene2의 대본을 확인
import { script } from "./script";
const scene2Script = script.find((s) => s.sceneId === "scene2");
```

### 2. 오디오 길이 확인

해당 Scene의 WAV 파일 길이를 확인하여, 애니메이션 타이밍의 기준으로 삼습니다.

```bash
# WAV 파일 길이 확인 (초)
ffprobe -v error -show_entries format=duration -of csv=p=0 public/projects/{project-id}/audio/scene{N}.wav
```

### 3. Scene 컴포넌트 작성

파일 위치: `src/projects/{project-id}/scenes/scene{N}/Scene{N}.tsx`

필요에 따라 서브컴포넌트를 같은 디렉토리에 생성합니다:
```
scenes/scene{N}/
├── Scene{N}.tsx          ← 메인 컴포넌트
├── TitleSection.tsx      ← (선택) 서브컴포넌트
└── DataVisualization.tsx ← (선택) 서브컴포넌트
```

### 4. index.tsx에 Scene 등록

`src/projects/{project-id}/index.tsx`의 SCENES 배열에 새 Scene을 추가합니다:

```tsx
import { Scene2 } from "./scenes/scene2/Scene2";

const SCENES: React.FC[] = [Scene1, Scene2]; // ← 추가
```

**주의**: SCENES 배열의 순서는 `script.ts`의 scene 순서와 반드시 일치해야 합니다.

### 5. 미리보기 확인

```bash
npm run dev
```

Remotion Studio에서 해당 Scene 구간을 확인합니다.

---

## 컴포넌트 작성 규칙

### 프레임 & 타이밍

- `useCurrentFrame()`은 Scene 내부의 **로컬 프레임** (0부터 시작)을 반환합니다.
- 시간 기반 계산은 항상 `fps`를 곱하세요: `fps * 초`
- Scene 컴포넌트 안에서 전체 Composition의 duration을 알 필요 없습니다.

### 애니메이션

- **모든 애니메이션은 `useCurrentFrame()` 기반**으로 작성합니다.
- CSS transition/animation, Tailwind 애니메이션 클래스는 **사용 금지** — 렌더링 시 정상 동작하지 않습니다.
- `interpolate()`와 `spring()`을 사용합니다.
- `extrapolateRight: "clamp"`를 적극 활용하세요.

```tsx
const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
  extrapolateRight: "clamp",
});

const scale = spring({
  frame,
  fps,
  config: { damping: 20, stiffness: 100 },
});
```

### 스타일 & 디자인 토큰

`src/shared/styles/global.css`에 정의된 디자인 토큰을 사용합니다:

| 토큰 | 값 | 용도 |
|------|----|------|
| `--color-bg-primary` | `#0a0a0f` | 배경 |
| `--color-bg-secondary` | `#12121a` | 보조 배경 |
| `--color-text-primary` | `#f0f0f5` | 주요 텍스트 |
| `--color-text-secondary` | `#a0a0b0` | 보조 텍스트 |
| `--color-accent` | `#6366f1` | 강조색 |
| `--color-accent-glow` | `rgba(99,102,241,0.3)` | 강조 글로우 |
| `--font-heading` | `Inter, Pretendard, sans-serif` | 제목 |
| `--font-body` | `Inter, Pretendard, sans-serif` | 본문 |
| `--font-mono` | `JetBrains Mono, monospace` | 코드 |

> Remotion에서는 CSS 변수를 `var()`로 사용하기보다 **값을 직접 인라인 스타일에 넣는 방식**이 안정적입니다.

### 컴포넌트 구조 템플릿

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolate, spring } from "remotion";

export const SceneN: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── 애니메이션 값 계산 ───
  const fadeIn = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ─── 렌더링 ───
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Scene 내용 */}
    </AbsoluteFill>
  );
};
```

### 자주 사용하는 Remotion API

| API | 용도 |
|-----|------|
| `<AbsoluteFill>` | 전체 화면 레이어 |
| `<Sequence from={frame}>` | Scene 내 타이밍 시퀀스 |
| `<Img src={staticFile("...")} />` | 이미지 표시 |
| `interpolate()` | 선형 보간 애니메이션 |
| `spring()` | 물리 기반 애니메이션 |

### 추가 규칙 참조

복잡한 기능이 필요할 때는 Remotion 스킬의 세부 규칙을 참조합니다:

- 자막/캡션 → `.agents/skills/remotion-best-practices/rules/subtitles.md`
- 텍스트 애니메이션 → `.agents/skills/remotion-best-practices/rules/text-animations.md`
- 트랜지션 → `.agents/skills/remotion-best-practices/rules/transitions.md`
- 오디오 시각화 → `.agents/skills/remotion-best-practices/rules/audio-visualization.md`
- 차트/데이터 시각화 → `.agents/skills/remotion-best-practices/rules/charts.md`
