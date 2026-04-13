---
description: remotion 기반 영상을 작성하기 전 영상을 기획, 준비하는 단계입니다.
---

# /plan-video {project_id}

Remotion 영상 프로젝트 기획서와 스켈레톤 코드(뼈대 코드)를 작성하는 워크플로우 입니다.

## 사전 조건

- `public/{project_id}/{section}/{section}_final_timeline.json` 파일이 존재해야 합니다.

## Plan

각 섹션별로 기획서를 작성하는 단계입니다.

1. **기획서 뼈대 자동 생성**
   // turbo
   터미널 명령어 `python3 scripts/generate-plan.py {project_id}` 를 실행합니다.
   이 스크립트는 `json` 타임라인 파일을 기반으로 정확한 프레임과 Scene 개수 등이 기록된 `_plan.md` 초안을 각 섹션 폴더에 일괄 자동 생성합니다.

2. **비주얼 기획 및 디자인 도출**

   각 섹션 폴더를 하나씩 돌면서, `public/{project_id}/{section}/{section}_plan.md` 파일을 엽니다.

   **FILL 마커 형식**: 이 파일에는 아래와 같은 인덱싱된 마커가 있습니다.
   - `{FILL_TOPIC: ...}` — 섹션 주제
   - `{FILL_SUMMARY: ...}` — 섹션 내용 요약
   - `{FILL_S1_VISUAL: ...}` — Scene 1 비주얼 컨셉
   - `{FILL_S1_COMPONENT: ...}` — Scene 1 필요한 그림 컴포넌트
   - (Scene 번호별로 반복)

   **작업 규칙**:
   - 🚨 **반드시 `replace_file_content` 또는 `multi_replace_file_content` 도구만 사용**하세요. `write_to_file`로 파일 전체를 덮어쓰면 타임라인 수치가 훼손됩니다.
   - 섹션의 원본 텍스트(`./{section}.txt`)를 먼저 읽어 맥락을 파악한 뒤, 각 FILL 마커를 채웁니다.
   - **최대 5개의 FILL 마커를 한 번의 `multi_replace_file_content` 호출로 처리**합니다. 나머지가 있으면 반복합니다.
   - 타임라인 수치(`startFrame`, `durationInFrames`, 단어 등장 프레임)와 마크다운 구조(Scene 헤더 `###` 등)는 **절대 수정하지 마세요.**

   **작업 순서** (섹션당):
   1. `view_file`로 `{section}_plan.md` 열기
   2. `view_file`로 `{section}.txt` (원본 대본) 열기
   3. `FILL_TOPIC`과 `FILL_SUMMARY` 먼저 채우기 (섹션 전체 맥락 파악 후)
   4. Scene을 최대 3개씩 Chunk로 묶어 `FILL_S{i}_VISUAL`과 `FILL_S{i}_COMPONENT` 채우기
   5. 다음 Chunk로 이동, 모든 FILL 마커가 채워질 때까지 반복

**계획 승인 요청**: 모든 기획서 작성이 완료되면 사용자에게 최종 검토 및 승인을 요청하고, 확인이 완료되면 세션을 종료합니다.
