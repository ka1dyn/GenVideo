---
description: remotion 기반 영상을 작성하기 전 영상을 기획, 준비하는 단계입니다.
---

# /plan-video {project_id}

대본 파일(`src/ref/{project_id}.txt`)로부터 Remotion 영상 프로젝트 기획서를 작성하는 전체 워크플로우입니다.

## 전체 흐름

- **Phase 1: Scaffold** → (사용자가 사전 실행 완료) 폴더 구조, TTS 음성, 타임스탬프, 컨텍스트 파일 생성
- **Phase 2: Set Timeline** → 원본 대본, 타임스탬프 값을 기반으로 최종 타임라인을 완성
- **Phase 3: Design System** → 디자인시스템 확인 또는 자체 생성
- **Phase 4: Plan** → 모델 기반으로 각 섹션별 애니메이션 기획서 작성

## 프로젝트 예상 구조

`public/{project_id}/` 와 `src/projects/{project_id}/` 하위에
대본(`---` 구분자)을 바탕으로 동적으로 n개의 섹션 디렉토리(예: intro, body1, outro 등)가 생성됩니다.

이 워크플로우 엔진이 각 파일의 맥락을 이해할 수 있도록 구성된 템플릿입니다:

```text
public/{project_id}/
    design-system.md                <--- (Phase 3에서 확인 또는 생성) 브랜드 디자인 규약
    {section}/
        {section}.txt               <--- 대본에서 추출된 해당 섹션 원본 텍스트
        {section}.wav               <--- 원본 텍스트를 바탕으로 생성된 TTS 오디오
        {section}_timestamp.json    <--- 오디오를 기반으로 생성된 단어 타임스탬프 (Whisper AI)
        {section}_context.md        <--- 원본 대본과 타임스탬프 간 매핑 가이드가 포함된 종합 컨텍스트 요약본
        {section}_final_timeline.json  <--- Phase 2에서 생성, 최종 타임라인
        {section}_plan.md           <--- (Phase 4에서 생성 예정) 애니메이션 및 시퀀스 기획서

src/constants/
    video-config.ts                 <--- 60fps 해상도 등 전체 프로젝트의 기준이 되는 동적 상수 설정 (읽기 전용 참조)

src/projects/{project_id}/
    theme.ts                        <--- 디자인 시스템의 상수 모음

```

## 프로젝트 구조 (분석 대상) 동적 파악

디렉토리 확인 도구(`list_dir` 등)를 이용해 `public/{project_id}/` 디렉토리 하위에 실제로 존재하는 모든 하위 폴더(section) 리스트를 수집합니다. 기본적으로 intro, body, outro로 구성되어 있습니다.
(섹션 이름이 반드시 intro, body로 되어있지 않을 수 있으니 실제 탐색된 폴더들을 기반으로 처리해주세요.)

---

## Phase 1: Scaffold

**주의**: 이 단계는 AI가 실행하지 않으며 사용자가 환경을 구성하기 위해 수행하는 준비 단계입니다. 해당 프로젝트 ID로 환경 구성이 누락되어있다면 작업을 멈추고 사용자에게 알려주세요.

## Phase 2: Set Timeline

`.agents/workflows/set-timeline.md` 경로의 워크플로우 문서를 읽고 지시사항을 따르세요.
해당 단계를 바탕으로 각 섹션의 `_final_timeline.json` 파일을 생성합니다.

만약 `public/{project_id}/{section}/{section}_final_timeline.json` 파일이 없다면 사용자에게 요청하고
대기합니다.

## Phase 3: Design System

`public/{project_id}/design-system.md` 파일 존재 여부를 확인합니다.

- **파일이 있으면**: 파일을 읽지 말고 이 단계를 건너뜁니다.
- **파일이 없으면**: 사용자에게 "새로운 디자인 시스템 생성을 위한 지시사항(원하는 테마, 색상, 분위기 등)을 입력해주세요. 특별히 원하시는 톤이 없다면 대본을 바탕으로 자동 생성하겠습니다." 라고 질문을 던집니다.
- **사용자의 답변을 받은 후**: `.agents/templates/design-system-template.md` 포맷과 사용자의 요구사항(또는 대본의 주제·톤)을 바탕으로 디자인시스템을 생성하고 `public/{project_id}/design-system.md`에 저장합니다.
- 사용자에게 생성된 디자인시스템을 검토받은 뒤 다음 Phase로 진행합니다.

> 다른 프로젝트의 design-system.md를 복사하여 재사용할 수도 있습니다.

## Phase 4: theme파일 생성

생성된 `public/{project_id}/design-system.md` 문서의 모든 상수(Constants) 블록을 추출하여 `src/projects/{project_id}/theme.ts` 파일로 통합 저장하세요.

## Phase 4: Plan

각 섹션별로 기획서를 작성하는 단계입니다.

탐색 된 각 섹션 폴더를 하나씩 돌면서 `.agents/templates/section-plan-template.md` 템플릿 가이드에 맞춰 `public/{project_id}/{section}/{section}_plan.md` 파일을 생성하고 내용을 적어주세요.

사용자에게 최종 검토를 받습니다.
