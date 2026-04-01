---
description: 섹션별 애니메이션 기획서를 생성하는 워크플로우
---

# /plan-animations {project_id}

scaffold가 완료된 프로젝트를 바탕으로, 각 섹션(예: intro, body1 ... outro)들의 원본 대본과 타임스탬프를 종합하여 최상의 결과물이 담길 애니메이션 "기획서"를 체계화합니다.

## 사전 조건

- 해당 프로젝트 `public/{project_id}/` 경로 내부에 각각의 섹션 파일 트리 구조가 정상적으로 생성되어 있어야 합니다 (`.txt`, `.wav`, `_timestamp.json`, `_final_timeline.json`, `_context.md`)

## 워크플로우 단계

### 1. 프로젝트 구조 (분석 대상) 동적 파악

디렉토리 확인 도구(`list_dir` 등)를 이용해 `public/{project_id}/` 디렉토리 하위에 실제로 존재하는 모든 하위 폴더(섹션) 리스트를 수집합니다.
(섹션 이름이 반드시 intro, body로 되어있지 않을 수 있으니 실제 탐색된 폴더들을 기반으로 처리해주세요.)

### 2. 디자인 시스템 숙지

`public/{project_id}/design-system.md`를 읽고 브랜드 규약을 숙지합니다.
(색상 톤, 폰트, 자막 규격, 톤앤매너, 애니메이션 아이디어 등)

- 디자인시스템에 **명시된 항목**(색상 톤, 폰트, 무드 등)은 **반드시 준수**합니다.
- **명시되지 않은 영역**(레이아웃, 애니메이션, 비주얼 컨셉, 트랜지션 등)은 AI가 **자유롭고 창의적으로 구성**합니다.
- 디자인시스템 파일이 없다면 이 단계를 건너뜁니다 (create-video 워크플로우에서 사전 생성됨).

### 3. 각 섹션별 기획서 작성

탐색 된 각 섹션 폴더를 하나씩 돌면서 `.agents/templates/section-plan-template.md` 템플릿 가이드에 맞춰 `public/{project_id}/{section}/{section}_plan.md` 파일을 생성하고 내용을 적어주세요.

### 4. 승인 (User Review)

전 섹션에 대해 기획(Plan) 문서 발행이 완료되면 사용자에게 승인을 구하세요.
사용자의 피드백을 반영해 기획서를 수정한 뒤 다음 스텝(Implement workflow)으로 넘어가야 합니다.
