---
description: remotion 기반 영상을 작성하기 전 영상을 기획, 준비하는 단계입니다.
---

# /plan-video {project_id}

Remotion 영상 프로젝트 기획서와 스켈레톤 코드(뼈대 코드)를 작성하는 워크플로우 입니다.

## 전체 흐름

- **Phase 1: Plan** → 각 섹션별 애니메이션 기획서 작성
- **Phase 2: Skeleton Code Generation** → 각 섹션별로 뼈대 코드 생성
- **Phase 3: Root Component Assembly** → 각 섹션별로 루트 컴포넌트 조립

## 프로젝트 예상 구조

이 워크플로우 엔진이 각 파일의 맥락을 이해할 수 있도록 구성된 템플릿입니다:

```text
public/{project_id}/
    {section}/
        {section}.txt               <--- 대본에서 추출된 해당 섹션 원본 텍스트
        {section}_final_timeline.json  <--- 오디오를 기반으로 생성된 최종 타임라인
        {section}_plan.md           <--- (Phase 1에서 생성 예정) 애니메이션 및 시퀀스 기획서

src/constants/
    video-config.ts                 <--- 30fps 해상도 등 전체 프로젝트의 기준이 되는 동적 상수 설정 (읽기 전용 참조)
    theme.ts                        <--- 디자인 시스템의 상수 모음 (읽기 전용 참조)

src/projects/{project_id}/
    {section}/
        sequences.tsx               <--- (Phase 2에서 생성 예정) 해당 섹션의 씬 시퀀스 코드
        {section}.tsx               <--- (Phase 2에서 수정 예정) 해당 섹션의 최상위 래퍼 및 Audio 컴포넌트
    {project_id}.tsx                <--- 해당 프로젝트의 루트 컴포넌트
```

## 프로젝트 구조 (분석 대상) 동적 파악

디렉토리 확인 도구(list_dir 등)를 이용해 `public/{project_id}/` 디렉토리 하위에 실제로 존재하는 모든 하위 폴더(section) 리스트를 수집합니다. (섹션 이름이 반드시 intro, body로 되어있지 않을 수 있으니 탐색된 폴더들을 기반으로 유연하게 처리하세요.)

---

## Phase 1: Plan

각 섹션별로 기획서를 작성하는 단계입니다.

1. **기획서 뼈대 자동 생성**
   // turbo
   터미널 명령어 `python3 scripts/generate-plan.py {project_id}` 를 실행합니다.
   이 스크립트는 `json` 타임라인 파일을 기반으로 정확한 프레임과 Scene 개수 등이 기록된 `_plan.md` 초안을 각 섹션 폴더에 일괄 자동 생성합니다.

2. **비주얼 기획 및 디자인 도출**
   탐색된 각 섹션 폴더를 하나씩 돌면서, 방금 파이썬이 생성한 `public/{project_id}/{section}/{section}_plan.md` 파일을 엽니다.
   파일의 형태는 절대로 건드리지 말고, 내부의 `{FILL: ...}`로 비워진 부분(주제, 비주얼 컨셉, 필요한 그림 컴포넌트 등)만 AI가 맥락을 분석하여 창의적으로 채워 넣어 주세요.

**계획 승인 요청**: 모든 기획서 작성이 완료되면 사용자에게 최종 검토 및 승인을 요청하세요. <--- 반드시 멈춤

## Phase 2: Skeleton Code Generation

각 section을 loop로 돌면서 아래 사항을 수정합니다.

`src/projects/{project_id}/{section}/sequences.tsx` 파일을 생성하고 아래와 같이 뼈대를 잡습니다.

- [매우중요] 각 Scene 컴포넌트 바로 위에 JSDoc(/\*\* \*/)을 열고, {section}\_plan.md에 있는 해당 씬의 '원본 텍스트'와 '단어 등장 프레임', '비주얼 컨셉'을 그대로 복사하여 주석으로 삽입하세요.
- 최하단 Sequences 컴포넌트에는 <Series>를 절대 사용하지 말고, `public/{project_id}/{section}/{section}_final_timeline.json`에 명시된 startFrame과 durationInFrames 값을 가져와 **절대 좌표 <Sequence>**로 렌더링하세요.
- 아래 예시 스켈레톤 코드를 적극 참고하고, 모든 주석을 각 씬에 추가해서 맥락을 잃지 않도록 합니다.

```tsx
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme"; // 테마 임포트

/**
 * [Scene 1 기획안]
 * 원본 텍스트: (plan.md의 해당 scene 텍스트를 그대로 복사하여 삽입) <--- 주석 반드시 추가
 * 단어 등장 타이밍: (plan.md의 해당 scene 텍스트를 그대로 복사하여 삽입) <--- 주석 반드시 추가
 * 비주얼 컨셉: (plan.md의 내용을 그대로 복사하여 삽입) <--- 주석 반드시 추가
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요. <--- 이 내용도 컨텍스트 유지를 위해 완벽하게 복사해서 각 Scene에 주석으로 넣어야함.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다. <--- 이 내용도 컨텍스트 유지를 위해 완벽하게 복사해서 각 Scene에 주석으로 넣어야함.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다. <--- 이 내용도 컨텍스트 유지를 위해 완벽하게 복사해서 각 Scene에 주석으로 넣어야함.
 */
const Scene1: React.FC = () => {
  // TODO: 주석 내용에 맞게 구현
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: (plan.md의 해당 scene 텍스트를 그대로 복사하여 삽입)
 * 단어 등장 타이밍: (plan.md의 해당 scene 텍스트를 그대로 복사하여 삽입)
 * 비주얼 컨셉: (plan.md의 내용을 그대로 복사하여 삽입)
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  // TODO: 주석 내용에 맞게 구현
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

#### Phase 3. Root Component Assembly

- 최상위 섹션 파일(`src/projects/{project_id}/{section}/{section}.tsx`)을 수정하여 오디오, 화면(Sequences), 자막을 조립합니다.
- `_final_timeline.json`을 직접 import하여 `CaptionOverlay`에 전달합니다.

```tsx
import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import introTimeline from "../../../../public/{project_id}/intro/intro_final_timeline.json";
import { Sequences } from "./sequences";

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile(`{project_id}/intro/intro.wav`)} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 화면 최상단 자막 오버레이 — JSON을 직접 소비 */}
      <CaptionOverlay captions={introTimeline.sentences} />
    </AbsoluteFill>
  );
};
```
