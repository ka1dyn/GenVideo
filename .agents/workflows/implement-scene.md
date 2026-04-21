---
description: 기획서를 바탕으로 Remotion 단일 씬(Scene)을 기획 및 구현하는 워크플로우
---

# /implement-scene {project_id} {section} {scene_name}

해당 섹션의 단일 씬({scene_name})에 집중하여 기획 및 코드를 구현하는 워크플로우입니다.
이 워크플로우는 `scripts/run-section.sh` 에 의해 씬 단위로 반복 실행되며, 다른 씬의 코드를 수정하거나 덮어쓰지 마세요.

## 1. 지침 및 전역 가이드 확인 (읽기)

1. 프로젝트 루트의 `GEMINI.md` 파일을 읽고 디자인 토큰, 컴포넌트 정책 등을 완벽히 숙지하세요.
2. `src/shared-components/COMPONENTS.md` 파일을 읽고 제공되는 공유 컴포넌트들의 정확한 Props(특히 `weight` 등 오타 금지)를 숙지하세요.
3. `src/projects/{project_id}/{section}/make_video_plan.md` 파일을 읽고 전체 섹션의 기획 의도를 파악하세요.

## 1.5 이전 Scene 참고 (연속성 확보)

1. 현재 Scene이 Scene1이 아니라면, 이전 Scene의 기획서 `plans/Scene{N-1}.md` 를 읽어 연출 흐름을 파악하세요.
2. 이전 Scene의 코드 `scenes/Scene{N-1}.tsx` 에서 재사용 가능한 컴포넌트나 스타일 패턴이 있는지 확인하세요.
3. 시각적 전환이 자연스럽도록 이전 Scene의 마지막 상태를 고려하여 현재 Scene의 진입 연출을 설계하세요.

## 2. 개별 씬 기획 작성

1. `src/projects/{project_id}/{section}/plans/{scene_name}.md` 를 엽니다.
2. 타임라인 데이터를 읽은 뒤, **디자인 및 연출 기획**(@narrative, @layout, @elements, @animation, @tokens)을 작성합니다.

## 3. 개별 씬 코드 구현

1. 작성된 기획을 바탕으로 `src/projects/{project_id}/{section}/scenes/{scene_name}.tsx` 를 구현합니다.
2. 컴포넌트 추가가 필요한 경우 오직 `src/projects/{project_id}/{section}/components/` 디렉터리에만 생성하세요.
3. 프로젝트 내에 기존에 생성된 컴포넌트들 중 활용 가능한 것이 있다면 재사용하고, 가이드라인에 맞지 않는 수정은 금지합니다.
4. 모든 스타일링은 `src/constants/theme.ts` 의 디자인 토큰만 사용해야 합니다.

작업이 완료되면 자신이 구현한 사항을 정리하여 보고하고 종료합니다.
