---
description: Remotion 영상 제작 전체 파이프라인을 실행하는 통합 워크플로우
---

# /create-video {project_id}

대본 파일(`src/ref/{project_id}.txt`)로부터 Remotion 영상 프로젝트를 자동으로 생성하는 전체 파이프라인 워크플로우입니다.

## 전체 흐름

1. **Phase 1: Scaffold** → (사용자가 사전 실행 완료) 폴더 구조, TTS 음성, 타임스탬프, 컨텍스트 파일 생성
2. **Phase 2: Plan** → 모델 기반으로 각 섹션별 애니메이션 기획서 작성
3. **Phase 3: Implement** → 모델이 기획서를 기반으로 Remotion 컴포넌트 순차 구현
4. **Phase 4: Preview** → Remotion Studio에서 프리뷰 확인

## 프로젝트 예상 구조

`public/{project_id}/` 와 `src/projects/{project_id}/` 하위에 
대본(`---` 구분자)을 바탕으로 동적으로 n개의 섹션 디렉토리(예: intro, body1, outro 등)가 생성됩니다.

이 워크플로우 엔진이 각 파일의 맥락을 이해할 수 있도록 구성된 템플릿입니다:

```text
public/{project-id}/
    {section}/
        {section}.txt               <--- 대본에서 추출된 해당 섹션 원본 텍스트
        {section}.wav               <--- 원본 텍스트를 바탕으로 생성된 TTS 오디오
        {section}_timestamp.json    <--- 오디오를 기반으로 생성된 타임스탬프 (Whisper AI)
        {section}_context.md        <--- 원본 대본과 타임스탬프 간 매핑 가이드가 포함된 종합 컨텍스트 요약본
        {section}_plan.md           <--- (Phase 2에서 생성 예정) 애니메이션 및 시퀀스 기획서

src/projects/{project-id}/
    {section}/                      <--- {section}_plan.md를 기반으로 Phase 3(Implement) 단계에서 구현할 영역
        {section}.tsx               <--- 해당 섹션의 최상위 Series 래퍼 및 Audio 컴포넌트
        seq1.tsx                    <--- (Phase 3에서 생성 예정) 기획서에 명시된 시퀀스 단위 컴포넌트
        seq2.tsx                    <--- ...
```

---

## Phase 1: Scaffold

**주의**: 이 단계는 AI가 실행하지 않으며 사용자가 환경을 구성하기 위해 수행하는 준비 단계입니다. 해당 프로젝트 ID로 환경 구성이 누락되어있다면 작업을 멈추고 사용자에게 알려주세요.

## Phase 2: Plan

`.agents/workflows/plan-animations.md` 경로의 워크플로우 문서를 읽고 지시사항을 따르세요.

해당 워크플로우에서는 다음과 같은 동작을 합니다:
- `{section}_context.md` 파일들을 읽습니다.
- 시퀀스 단위로 분할하여 `{section}_plan.md` 기획서를 작성합니다.

모든 파일을 생성하고 난 뒤 사용자에게 기획안이 괜찮은지 검토를 요청하세요.

## Phase 3: Implement

사용자가 기획안 (Phase 2) 을 승인했다면, `.agents/workflows/implement-scenes.md` 경로의 워크플로우를 읽고 지시에 따릅니다.

해당 워크플로우에서는 다음과 같은 동작을 합니다:
- 순차적으로 기획서에 따라 `seq{N}.tsx` 파일을 생성합니다.
- `{section}.tsx` 내부를 수정하여 합성합니다.

## Phase 4: Preview

// turbo

```bash
npm run dev
```

Remotion Studio가 띄워지면 전체 영상을 검토해 볼 수 있도록 사용자에게 안내하세요.
