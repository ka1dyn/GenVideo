---
description: Remotion 영상 제작 전체 파이프라인을 실행하는 통합 워크플로우
---

# /create-video {project_id}

대본 파일(`src/ref/{project_id}.txt`)로부터 Remotion 영상 프로젝트를 자동으로 생성하는
전체 파이프라인입니다.

## 전체 흐름

```
Phase 1: Scaffold     → 폴더 구조, TTS 음성, 타임스탬프, 컨텍스트 파일 생성
Phase 2: Plan          → 각 섹션별 애니메이션 기획서 작성
Phase 3: Implement     → 기획서 기반 Remotion 컴포넌트 순차 구현
Phase 4: Preview       → Remotion Studio에서 프리뷰 확인
```

Phase 1은 사용자가 직접 스크립트를 실행하므로, Phase 2부터 진행하면 됩니다.

## 프로젝트 구조

```
public/{project-id}/
    intro/
        intro.txt               <--- {project_id}.txt 대본의 첫번째 섹션, Scaffold 시 생성
        intro.wav               <--- {project_id}.txt 대본의 첫번째 섹션의 TTS 음성, Scaffold 시 생성
        intro_timestamp.json    <--- {project_id}.txt 대본의 첫번째 섹션의 타임스탬프, Scaffold 시 생성
        intro_context.md        <--- {project_id}.txt 대본의 첫번째 섹션의 컨텍스트, Scaffold 시 생성
        intro_plan.md           <--- {project_id}.txt 대본의 첫번째 섹션의 기획서, Plan 단계에서 생성필요
    body1/
        body1.txt
        body1.wav
        body1_timestamp.json
        body1_context.md
    body{N}/
        body{N}.txt
        body{N}.wav
        body{N}_timestamp.json
        body{N}_context.md
    outro/
        outro.txt
        outro.wav
        outro_timestamp.json
        outro_context.md

src/projects/{project-id}/
    intro/                      <--- intro_context.md파일을 기반으로 Implement 단계에서 구현
        intro.tsx
        seq1.tsx
        seq2.tsx
        ...
    body1/
        body1.tsx
        seq1.tsx
        seq2.tsx
        ...
    body{N}/
        body{N}.tsx
        seq1.tsx
        seq2.tsx
        ...
    outro/
        outro.tsx
        seq1.tsx
        seq2.tsx
        ...

src/
    ref/
        {project-id}.txt <--- 사용자가 입력하는 대본 파일
    Root.tsx <--- 프로젝트 등록

```

## Phase1: Scaffold

**주의**
해당 단계는 사전에 사용자가 직접 실행하기에, 맥락만 이해하면 됩니다. 실행할 필요 없습니다.

`src/ref/{project_id}.txt` 파일은 `---`로 섹션이 구분되어 있습니다.
각 섹션은 intro, body, outro로 구분되며, scaffold 스크립트를 실행하면
각 세션 별로 다음 내용이 실행됩니다.

1. `public/{project_id}/` 하위에 섹션별 폴더 + txt 파일 생성
2. 각 섹션의 TTS 음성(wav) 생성
3. Whisper로 타임스탬프(json) 생성
4. `src/projects/{project_id}/` 하위에 placeholder 컴포넌트 생성
5. Root.tsx에 프로젝트 등록
6. 각 섹션의 컨텍스트 파일(`_context.md`) 생성

## Phase2: Plan

`/plan-animations` 워크플로우를 실행합니다.

```
/plan-animations {project_id}
```

각 섹션에 대해:

- `{section}_context.md`를 읽어 대본과 타임스탬프를 파악
- 시퀀스 분할 및 애니메이션 기획서 작성
- `public/{project_id}/{section}/{section}_plan.md`에 저장

**사용자 검토**: 기획서를 검토하고 피드백을 반영한 뒤 다음 단계로 진행합니다.

## Phase 3: Implement

`/implement-scenes` 워크플로우를 실행합니다.

```
/implement-scenes {project_id}
```

각 섹션을 순차적으로:

- 기획서에 따라 `seq1.tsx`, `seq2.tsx`, ... 생성
- `{section}.tsx`에서 시퀀스를 합성
- Audio는 섹션 루트에서만 배치

## Phase 4: Preview

// turbo

```bash
npm run dev
```

Remotion Studio에서 전체 영상을 검토합니다.
