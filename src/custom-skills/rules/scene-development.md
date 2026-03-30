---
name: scene-development
description: 단일 Scene 컴포넌트 개발 가이드 — Scene 하나를 요청받았을 때 이 스킬을 참조합니다.
metadata:
  tags: scene, development, segment, orchestrator, design
---

# Scene 개별 개발 가이드

이 스킬은 Remotion 영상 프로젝트에서 **Scene 하나를 독립적으로 개발**할 때 사용합니다.

## 디자인 시스템

각 Scene은 일관된 디자인 시스템을 바탕으로 생성합니다.
[./design-system.md](./design-system.md) 파일을 자세히 분석하고 적용하세요.

## 파일 구조

Segment 하나당 파일 하나를 생성합니다. `Scene{N}.tsx`는 얇은 오케스트레이터 역할만 합니다.

```
src/projects/{project-id}/scenes/scene{N}/
├── Scene{N}.tsx   ← Scene 오케스트레이터 (import + Series만)
├── Seg1.tsx       ← Segment 1 컴포넌트
├── Seg2.tsx       ← Segment 2 컴포넌트
└── Seg3.tsx       ← Segment 3 컴포넌트 ...
```

## 개발 절차

### 1. 대본 확인

```ts
import { script } from "../../script";
const sceneData = script.find((s) => s.sceneId === "scene{N}");
const segments = sceneData?.segments || [];
```

### 2. Segment 파일 작성

다음은 Segment 개발 시 따라야 할 절차입니다.

**매우 중요**

- [./segment-create.md](./segment-create.md) 파일을 자세히 분석하여 사용할 phase preset, layout, 컴포넌트 조합을 한 번에 설계합니다.

이 때, 모든 Segment가 동일한 형태가 되지 않도록 다양한 레이아웃 구조(Split, Grid 등)와 컴포넌트를 조합하여 영상이 지루하지 않게 구성해야 합니다.

- 선택된 layout의 사용법 및 예제 코드는 `segment-create.md` 문서 내 "레이아웃 선택" 표에 걸린 템플릿 경로를 찾아 참조하세요.

### 3. Scene 오케스트레이터 작성

Scene은 **Series**와 **FadeWrapper**를 사용하여 여러 Segment를 겹침 없이 순차 시퀀싱합니다.

작성 방법은 [./template/scene-template.md](./template/scene-template.md)를 참조하여 파일을 생성/수정합니다.

### 4. index.tsx에 Scene 등록

`src/projects/{project-id}/index.tsx` 파일에 Scene을 등록합니다.

```tsx
import { Scene{N} } from "./scenes/scene{N}/Scene{N}";

const SCENES = [Scene1, ..., Scene{N}]; // script.ts의 scene 순서와 반드시 일치
```

## 추가 규칙 참조

더 복잡한 기능이 필요하다고 판단될 때는 Remotion 스킬의 세부 규칙을 참조합니다:

- 자막/캡션 → `.agents/skills/remotion-best-practices/rules/subtitles.md`
- 텍스트 애니메이션 → `.agents/skills/remotion-best-practices/rules/text-animations.md`
- 트랜지션 → `.agents/skills/remotion-best-practices/rules/transitions.md`
- 오디오 시각화 → `.agents/skills/remotion-best-practices/rules/audio-visualization.md`
- 차트/데이터 시각화 → `.agents/skills/remotion-best-practices/rules/charts.md`
