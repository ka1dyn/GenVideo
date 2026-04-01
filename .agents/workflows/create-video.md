---
description: Remotion 영상 제작 전체 파이프라인을 실행하는 통합 워크플로우
---

# /create-video {project_id}

대본 파일(`src/ref/{project_id}.txt`)로부터 Remotion 영상 프로젝트를 자동으로 생성하는 전체 파이프라인 워크플로우입니다.

## 전체 흐름

1. **Phase 1: Scaffold** → (사용자가 사전 실행 완료) 폴더 구조, TTS 음성, 타임스탬프, 컨텍스트 파일 생성
2. **Phase 1.5: Design System** → 디자인시스템 확인 또는 자체 생성
3. **Phase 2: Plan** → 모델 기반으로 각 섹션별 애니메이션 기획서 작성
4. **Phase 3: Implement** → 모델이 기획서를 기반으로 Remotion 컴포넌트 순차 구현
5. **Phase 4: Preview** → Remotion Studio에서 프리뷰 확인

## 프로젝트 예상 구조

`public/{project_id}/` 와 `src/projects/{project_id}/` 하위에
대본(`---` 구분자)을 바탕으로 동적으로 n개의 섹션 디렉토리(예: intro, body1, outro 등)가 생성됩니다.

이 워크플로우 엔진이 각 파일의 맥락을 이해할 수 있도록 구성된 템플릿입니다:

```text
public/{project-id}/
    design-system.md                <--- (Phase 1.5에서 확인 또는 생성) 브랜드 디자인 규약
    {section}/
        {section}.txt               <--- 대본에서 추출된 해당 섹션 원본 텍스트
        {section}.wav               <--- 원본 텍스트를 바탕으로 생성된 TTS 오디오
        {section}_timestamp.json    <--- 오디오를 기반으로 생성된 타임스탬프 (Whisper AI)
        {section}_context.md        <--- 원본 대본과 타임스탬프 간 매핑 가이드가 포함된 종합 컨텍스트 요약본
        {section}_plan.md           <--- (Phase 2에서 생성 예정) 애니메이션 및 시퀀스 기획서

src/constants/
    video-config.ts                 <--- 60fps 해상도 등 전체 프로젝트의 기준이 되는 동적 상수 설정 (읽기 전용 참조)

src/projects/{project-id}/
    theme.ts                        <--- (Phase 3 진입 시 최우선 생성) 디자인 시스템의 상수 모음
    {section}/                      <--- {section}_plan.md를 기반으로 Phase 3(Implement) 단계에서 구현할 영역
        {section}_subtitles.ts      <--- (Phase 3에서 생성 예정) 해당 섹션의 자막 타이밍 배열
        {section}.tsx               <--- 해당 섹션의 최상위 Series 래퍼 및 Audio 컴포넌트
        seq1.tsx                    <--- (Phase 3에서 생성 예정) 기획서에 명시된 시퀀스 단위 컴포넌트
        seq2.tsx                    <--- ...

src/shared-components/
    CaptionOverlay.tsx          <--- 미리 주어진 자막 렌더링용 컴포넌트
```

---

## Phase 1: Scaffold

**주의**: 이 단계는 AI가 실행하지 않으며 사용자가 환경을 구성하기 위해 수행하는 준비 단계입니다. 해당 프로젝트 ID로 환경 구성이 누락되어있다면 작업을 멈추고 사용자에게 알려주세요.

## Phase 1.5: Design System

`public/{project_id}/design-system.md` 파일 존재 여부를 확인합니다.

- **파일이 있으면**: 해당 디자인시스템을 이후 단계에서 적용합니다.
- **파일이 없으면**: 사용자에게 "새로운 디자인 시스템 생성을 위한 지시사항(원하는 테마, 색상, 분위기 등)을 입력해주세요. 특별히 원하시는 톤이 없다면 대본을 바탕으로 자동 생성하겠습니다." 라고 질문을 던집니다.
- **사용자의 답변을 받은 후**: `.agents/templates/design-system-template.md` 포맷과 사용자의 요구사항(또는 대본의 주제·톤)을 바탕으로 디자인시스템을 생성하고 `public/{project_id}/design-system.md`에 저장합니다.
- 사용자에게 생성된 디자인시스템을 검토받은 뒤 다음 Phase로 진행합니다.

> 다른 프로젝트의 design-system.md를 복사하여 재사용할 수도 있습니다.

## Phase 2: Plan

`.agents/workflows/plan-animations.md` 경로의 워크플로우 문서를 읽고 지시사항을 따르세요.

해당 워크플로우에서는 다음과 같은 동작을 합니다:

- `{section}_context.md` 파일들을 읽습니다.
- section 단위로 분할하여 `{section}_plan.md` 기획서를 작성합니다.

모든 파일을 생성하고 난 뒤 사용자에게 기획안이 괜찮은지 검토를 요청하세요.

## Phase 3: Implement

사용자가 기획안 (Phase 2) 을 승인했다면, 본격적인 프로젝트 구현을 시작합니다.

**가장 먼저**, `public/{project_id}/design-system.md` 문서의 모든 상수(Constants) 블록을 추출하여 `src/projects/{project_id}/theme.ts` 파일로 통합 저장하세요. (이후 모든 시퀀스 컴포넌트는 이 테마 파일을 `import` 하여 색상/폰트/애니메이션 등을 참조해야 합니다.)

이후 `.agents/workflows/implement-scenes.md` 경로의 워크플로우를 읽고 지시에 따라 나머지 씬 구현을 순차 진행합니다.

해당 워크플로우에서는 다음과 같은 동작을 합니다:

- 순차적으로 기획서에 따라 `{section}_subtitles.ts` 및 `seq{N}.tsx` 파일을 생성합니다.
- `{section}.tsx` 내부를 수정하여 합성합니다.

## Phase 4: Preview

// turbo

```bash
npm run dev
```

Remotion Studio가 띄워지면 전체 영상을 검토해 볼 수 있도록 사용자에게 안내하세요.
