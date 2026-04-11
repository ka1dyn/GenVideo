---
description: remotion 기반 영상을 작성하기 전 영상을 기획, 준비하는 단계입니다.
---

# /plan-video {project_id}

Remotion 영상 프로젝트 기획서와 스켈레톤 코드(뼈대 코드)를 작성하는 워크플로우 입니다.

## 전체 흐름

- **Phase 1: Plan** → 각 섹션별 애니메이션 기획서 작성
- **Phase 2: Skeleton Code Generation** → 각 섹션별로 뼈대 코드 생성

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
        sequences.tsx               <--- (Phase 2에서 수정 예정) 해당 섹션의 씬 시퀀스 코드
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

// turbo-all
터미널 명령어 \`python3 scripts/generate-sequences.py {project_id}\` 를 실행합니다.

이 스크립트는 다음을 자동화합니다:

1. \`public/{project_id}/{section}/{section}\_final_timeline.json\` 의 정확한 \`startFrame\` 과 \`durationInFrames\` 값을 가져와 지연 없는 **절대 좌표 <Sequence>** 스켈레톤 코드를 구성합니다.
2. 각 Scene 컴포넌트 바로 위 JSDoc(\`/\*\* \*/\`)에, 방금 작성된 \`{section}\_plan.md\` 의 기획안과 텍스트를 정확하게 복사해 넣습니다.
3. 이를 통해 AI가 향후 코드를 구현할 때 타임라인 오차, 파일 이동으로 인한 컨텍스트 손실 등을 완벽하게 방지합니다.

> 스켈레톤 코드 생성이 완료되면, 이제 각 Scene별로 세부 애니메이션을 구현하는 \`/implement-scenes\` 워크플로우로 넘어갈 준비가 된 것입니다.
