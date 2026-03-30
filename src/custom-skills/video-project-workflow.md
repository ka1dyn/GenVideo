---
name: video-project-workflow
description: AI 유튜브 영상 프로젝트 생성 및 Scene 구성 워크플로우
metadata:
  tags: remotion, video, react, animation, composition, workflow
---

# 영상 프로젝트 워크플로우

이 가이드는 Remotion 기반 AI 유튜브 영상을 자동 생성하는 전체 워크플로우를 설명합니다.

## 프로젝트 구조

현재 프로젝트 구조를 이해한 뒤, 워크플로우를 실행합니다. 모든 파일을 읽어서 판단하지 않고
[./rules/structure.md](./rules/structure.md)를 참조해서 구조를 파악하세요.

## 영상 제작 워크플로우 단계

### 워크플로우 단계 요약

파일 준비 -> 프로젝트 등록 -> Scene 순차 생성 -> 테스트

### 1. 파일 준비 단계

AI는 다음 파일들이 사용자에 의해 생성 및 준비되었는지 확인합니다. (직접 실행할 필요 없음)

1. **프로젝트 폴더**: `src/projects/{project-id}/` 폴더가 생성됨.
2. **영상 대본**: `src/projects/{project-id}/script.ts` 파일 존재.
   - `sectionTitle`은 AI가 스크립트 기반으로 적절한 제목으로 수정/추가해야 합니다.
3. **오디오 파일**: `public/projects/{project-id}/audio/scene{N}/seg{M}.wav` 존재.
   - 모든 Segment에 대응하는 WAV 파일이 있어야 `calculateMetadata`가 정상 작동합니다.

> [!WARNING]
> 위 파일들이 없거나 `script.ts` 구조가 오디오 파일 개수와 매칭되지 않으면 사용자에게 보완을 요청하세요. 먼저 진행하지 마세요.

### 2. 프로젝트 등록

Scene을 만들기 전에 먼저 새 프로젝트를 `src/Root.tsx`에 등록합니다. 

```tsx
// src/Root.tsx
import {
  Composition as {ProjectName},
  calculateMetadata as {projectName}Meta,
} from "./projects/{project-id}";
import { config as {projectName}Config } from "./projects/{project-id}/config";

// <Folder name="Projects"> 컴포넌트 내부에 추가:
<Composition
  id={{projectName}Config.id}
  component={{ProjectName}}
  calculateMetadata={{projectName}Meta}
  durationInFrames={300} // calculateMetadata로 덮어씌워짐
  fps={{projectName}Config.fps}
  width={{projectName}Config.width}
  height={{projectName}Config.height}
  defaultProps={{ segmentDurations: [] } satisfies ProjectProps}
/>;
```

등록 후 `npm run dev` 명령어로 Remotion Studio에서 새로운 프로젝트 Composition이 보이는지 확인합니다.

### 3. Scene 컴포넌트 순차 생성 (Scene별 반복)

각 Scene은 독립적인 React 컴포넌트이며, **한 번에 하나씩** 별도의 대화에서 요청하여 개발합니다.
Root.tsx에 프로젝트가 이미 등록되어 있으므로, 각 Scene은 `index.tsx`의 `SCENES` 배열에 추가하는 것만으로 **즉시 미리보기가 가능**합니다.

**개발 절차:**

1. `src/projects/{project-id}/script.ts`에서 Scene 개수와 각 Scene의 Segment 수를 확인합니다.
2. Scene 1부터 순서대로, 각 Scene을 **별도의 대화**에서 요청합니다.
3. 각 요청 시 [rules/scene-development.md](./rules/scene-development.md) 스킬을 참조합니다.

### 4. 미리보기 및 렌더링

```bash
# Remotion Studio에서 미리보기
npm run dev

# 최종 렌더링
npx remotion render <composition-id>
```
