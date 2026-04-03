---
description: remotion 기반 영상을 작성하기 전 영상을 기획, 준비하는 단계입니다.
---

# /plan-video {project_id}

대본 파일(`src/ref/{project_id}.txt`)로부터 Remotion 영상 프로젝트 기획서를 작성하는 전체 워크플로우입니다.

## 전체 흐름

- **Phase 1: Scaffold** → (사용자가 사전 실행 완료) 폴더 구조, TTS 음성, 타임스탬프, 컨텍스트 파일 생성
- **Phase 2: Set Timeline** → 원본 대본, 타임스탬프 값을 기반으로 최종 타임라인을 완성
- **Phase 3: Plan** → 모델 기반으로 각 섹션별 애니메이션 기획서 작성

## 프로젝트 예상 구조

`public/{project_id}/` 와 `src/projects/{project_id}/` 하위에
대본(`---` 구분자)을 바탕으로 동적으로 n개의 섹션 디렉토리(예: intro, body1, outro 등)가 생성됩니다.

이 워크플로우 엔진이 각 파일의 맥락을 이해할 수 있도록 구성된 템플릿입니다:

```text
public/{project_id}/
    design-system.md                <--- 브랜드 디자인 규약
    {section}/
        {section}.txt               <--- 대본에서 추출된 해당 섹션 원본 텍스트
        {section}.wav               <--- 원본 텍스트를 바탕으로 생성된 TTS 오디오
        {section}_timestamp.json    <--- 오디오를 기반으로 생성된 단어 타임스탬프 (Whisper AI)
        {section}_context.md        <--- 원본 대본과 타임스탬프 간 매핑 가이드가 포함된 종합 컨텍스트 요약본
        {section}_final_timeline.json  <--- (Phase 2에서 생성 예정), 최종 타임라인
        {section}_plan.md           <--- (Phase 3에서 생성 예정) 애니메이션 및 시퀀스 기획서

src/constants/
    video-config.ts                 <--- 60fps 해상도 등 전체 프로젝트의 기준이 되는 동적 상수 설정 (읽기 전용 참조)

src/projects/{project_id}/
    theme.ts                        <--- 디자인 시스템의 상수 모음

```

## 프로젝트 구조 (분석 대상) 동적 파악

디렉토리 확인 도구(list_dir 등)를 이용해 `public/{project_id}/` 디렉토리 하위에 실제로 존재하는 모든 하위 폴더(section) 리스트를 수집합니다. (섹션 이름이 반드시 intro, body로 되어있지 않을 수 있으니 탐색된 폴더들을 기반으로 유연하게 처리하세요.)

---

## Phase 1: Scaffold

**주의**: 이 단계는 AI가 실행하지 않으며 사용자가 환경을 구성하기 위해 수행하는 준비 단계입니다. 탐색 결과 해당 프로젝트 ID의 파일 구조가 누락되어 있다면 즉시 작업을 멈추고 사용자에게 알려주세요.

## Phase 2: Set Timeline

`.agents/workflows/set-timeline.md` 경로의 워크플로우 문서를 읽고 지시사항에 따라 타임라인을 구성하세요.
해당 단계를 바탕으로 탐색된 모든 섹션의 `_final_timeline.json` 파일을 자동 생성합니다.

## Phase 4: Plan

각 섹션별로 기획서를 작성하는 단계입니다.

탐색 된 각 섹션 폴더를 하나씩 돌면서 `.agents/templates/section-plan-template.md` 템플릿 가이드에 맞춰 `public/{project_id}/{section}/{section}_plan.md` 파일을 생성하고 내용을 적어주세요.

**계획 승인 요청**: 모든 기획서 작성이 완료되면 사용자에게 최종 검토 및 승인을 요청하세요. <--- 반드시 멈춤

## Phase 5: Skeleton Code Generation

각 section을 loop로 돌면서 아래 사항을 수정합니다.

`src/projects/{project_id}/{section}/sequences.tsx` 파일을 생성하고 아래와 같이 뼈대를 잡습니다.

- [매우중요] 각 Scene 컴포넌트 바로 위에 JSDoc(/\*\* \*/)을 열고, {section}\_plan.md에 있는 해당 씬의 '원본 텍스트'와 '단어 등장 시간', '비주얼 컨셉'을 그대로 복사하여 주석으로 삽입하세요.
- 최하단 Sequences 컴포넌트에는 <Series>를 절대 사용하지 말고, `public/{project_id}/{section}/{section}_final_timeline.json`에 명시된 startFrame과 durationInFrames 값을 가져와 **절대 좌표 <Sequence>**로 렌더링하세요.
- 아래 예시 스켈레톤 코드를 적극 참고하세요

```tsx
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
// import { COLORS, FONTS } from "../theme"; // 테마 임포트 예시

/**
 * [Scene 1 기획안]
 * 원본 텍스트: (plan.md의 해당 scene 텍스트를 그대로 복사하여 삽입)
 * 단어 등장 시간: (plan.md의 해당 scene 텍스트를 그대로 복사하여 삽입)
 * 비주얼 컨셉: (plan.md의 내용을 그대로 복사하여 삽입)
 */
const Scene1: React.FC = () => {
  // TODO: 주석 내용에 맞게 구현
  return (
    <AbsoluteFill>
      {/* 1. 배경 레이어: 화면 전체 사용. (자막 영역 하단 150px을 침범해도 되는 배경색, 배경 이미지, 파티클 등) */}
      <AbsoluteFill>{/* 배경 요소는 이 곳에 */}</AbsoluteFill>

      {/* 2. 메인 콘텐츠 안전 레이어: 자막과 겹치지 않도록 bottom: 150으로 하단이 격리된 도화지 */}
      <AbsoluteFill style={{ bottom: 150, height: "auto" }}>
        {/* 텍스트와 핵심 그래픽(주제 아이콘, 차트 등)은 묶음이므로, 반드시 모두 이 안에서 Flexbox 등으로 정렬하세요. */}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: (plan.md의 해당 scene 텍스트를 그대로 복사하여 삽입)
 * 비주얼 컨셉: (plan.md의 내용을 그대로 복사하여 삽입)
 */
const Scene2: React.FC = () => {
  // TODO: 주석 내용에 맞게 구현
  return (
    <AbsoluteFill>
      {/* 1. 배경 레이어: 화면 전체 사용. (자막 영역 하단 150px을 침범해도 되는 배경색, 배경 이미지, 파티클 등) */}
      <AbsoluteFill>{/* 배경 요소는 이 곳에 */}</AbsoluteFill>

      {/* 2. 메인 콘텐츠 안전 레이어: 자막과 겹치지 않도록 bottom: 150으로 하단이 격리된 도화지 */}
      <AbsoluteFill style={{ bottom: 150, height: "auto" }}>
        {/* 텍스트와 핵심 그래픽(주제 아이콘, 차트 등)은 묶음이므로, 반드시 모두 이 안에서 Flexbox 등으로 정렬하세요. */}
      </AbsoluteFill>
    </AbsoluteFill>
  );
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
