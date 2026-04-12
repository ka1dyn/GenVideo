---
description: remotion 기반 영상을 작성하기 전 영상을 기획, 준비하는 단계입니다.
---

# /plan-video {project_id}

Remotion 영상 프로젝트 기획서와 스켈레톤 코드(뼈대 코드)를 작성하는 워크플로우 입니다.

## 전체 흐름

- **Phase 1: Plan** → 각 섹션별 애니메이션 기획서 작성
- **Phase 2: Skeleton Code Generation** → 각 섹션별로 뼈대 코드 생성

## 사전 조건

- `public/{project_id}/{section}/{section}_final_timeline.json` 파일이 존재해야 합니다.

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
터미널 명령어 `python3 scripts/generate-sequences.py {project_id}` 를 실행합니다.
