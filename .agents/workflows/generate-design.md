---
description: 영상을 제작하기 전 대본을 바탕으로 디자인 토큰을 설정하는 워크플로우입니다.
---

# /generate-design {project_id}

`src/ref/{project_id}.txt` 대본을 바탕으로 어울리는 디자인 토큰을 디자인 시스템 템플릿에 따라 생성해야합니다.

## Design System

`public/{project_id}/design-system.md` 파일 존재 여부를 확인합니다.

- **파일이 있으면**: 파일을 읽지 않고 사용자에게 "이미 디자인 시스템이 존재합니다" 문장을 출력하며 워크플로우를 종료합니다.
- **파일이 없으면**: 각 섹션의 원본 대본(`src/ref/{section}.txt`)을 읽고, 전체 영상의 주제·분위기·톤을 분석하여 `.agents/templates/design-system-template.md` 포맷에 맞게 디자인 시스템을 **자동 생성**합니다. `public/{project_id}/design-system.md`에 저장합니다.(**주석까지 전부 완벽하게 복사**하세요. AI가 읽고 어떤 때에 사용해야하는지 명시해야합니다.)
- 파일 작성 후 주석이 전부 명시되어 있는지 다시한번 검토합니다.

생성된 `public/{project_id}/design-system.md` 문서의 모든 상수(Constants) 블록을 추출하여 `src/projects/{project_id}/theme.ts` 파일로 통합 저장하세요. 이 때에는 주석은 없어도 됩니다. 값만 복사하세요

이 단계까지 끝났다면 사용자에게 계획 시작 승인을 요청하세요
