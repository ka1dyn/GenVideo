---
description: 기획서를 바탕으로 Remotion 씬을 순차적으로 구현하는 워크플로우
---

# /implement-scenes {project_id}

섹션별 Remotion 영상 계확서를 바탕으로 실제 코드로 영상을 구현하는 워크플로우입니다.

## 사전 조건

- 디자인 테마 파일 생성 완료 (`src/constants/theme.ts`)
- 시퀀스 파일 생성 완료 (`src/projects/{project_id}/{section}/sequences.tsx`)

## 워크플로우 단계

### 1. Remotion Best Practices 지식 습득

파일 열기 도구(`view_file`)를 사용해 `.agents/skills/remotion-best-practices/SKILL.md` 파일을 읽습니다.

특히 구현 전에 다음 문서 내용이 필요한 경우 적절히 읽어보세요:

- `rules/animations.md` — 애니메이션 패턴
- `rules/sequencing.md` — 시퀀스 패턴
- `rules/timing.md` — 보간 및 이징
- `rules/text-animations.md` — 텍스트 애니메이션
- `rules/transitions.md` — 전환 효과
- `rules/audio.md` — 오디오 처리
- `rules/assets.md` — 에셋 임포트

### 2. 섹션 순차 구현(Loop)

`src/projects/{project_id}/` 디렉토리 탐색(list_dir 등)의 파일 목록을 바탕으로, 순차적으로 구현을 진행합니다.

**정렬 규칙**: `intro` → `body1` → `body2` → ... → `outro` 순서로 처리합니다. `list_dir` 결과가 알파벳순이므로 반드시 이 논리적 순서로 재정렬하세요.

모든 섹션을 **하나씩** 완료한 후 다음 섹션으로 이동합니다 (예: intro → body1 → outro).

각 섹션 구현 완료 후 반드시 사용자에게 검토를 요청하세요 <--- 반드시 멈춤

각각의 독립된 `{section}`별로 다음을 수행합니다:

#### 2-1. 기획 컨텍스트 파악 (Inline Prompting)

- 별도의 외부 기획 문서(`plan.md` 등)나 타임라인 문서를 찾아 읽을 필요가 **전혀 없습니다.**
- `view_file` 도구로 `src/projects/{project_id}/{section}/sequences.tsx` 파일을 엽니다.
- 파일 최상단의 `[Section Global Context]` 주석을 반드시 먼저 읽고, 해당 섹션 전반에 적용할 테마와 페르소나를 파악합니다.
- `src/projects/{project_id}/components/index.ts` 파일을 열어, 해당 섹션에서 사용할 수 있는 이미지 컴포넌트들을 확인합니다.

#### 2-2. 공통 UI/애니메이션 컴포넌트 선행 생성 (Componentize)

본격적인 씬 구현에 앞서, 반복적으로 등장하는 UI 패턴이나 특수 애니메이션을 독립된 공용 컴포넌트로 먼저 추출하세요.

- **생성 경로:** `src/projects/{project_id}/components/`
- **설계 원칙 (Separation of Concerns):**
  1. **로직 중심 설계:** 컴포넌트는 `spring`, `interpolate`를 활용한 **'움직임의 로직'** 구현에 집중하세요.
  2. **스타일 주입 (Props):** `color`, `fontSize`, `fontWeight`, `delay` 등 시각적 속성은 내부에서 결정하지 말고 **반드시 Props를 통해 외부에서 주입**받도록 만드세요.
  3. **순수성 유지:** 컴포넌트 파일 자체에서 `theme.ts`를 직접 참조(Import)하는 것을 지양하고, **사용하는 쪽(Scene)에서 `theme.ts`의 상수를 Prop으로 넘겨주도록** 유도하여 재사용성을 극대화하세요.
- **중복 방지:** 이미 `components/` 폴더에 생성된 동일한 목적의 컴포넌트가 있다면 새로 만들지 말고 적극적으로 재사용하세요.

#### 2-3. 디테일 구현(Chunking & Iteration - 매우 중요)

- 🚨 AI 출력 제한 초과 및 기존 코드 삭제 빈발을 막기 위해, 전체 `sequences.tsx` 파일을 절대 한 번에 통째로 수정하지 마세요.
- **최대 2개의 씬(Chunk 단위)** 단위로 묶어서 하나씩 순차적으로 구현을 진행합니다. (예: "Scene1~Scene2 먼저 구현 -> 확인 -> Scene3~Scene4 구현")
- 파일을 통째로 덮어쓰지 말고, `multi_replace_file_content` 혹은 `replace_file_content` 도구를 사용하여 작업 중인 대상 Scene 함수 블록만 정밀하게 교체(Patch) 하세요.
- 다른 문서를 다시 열람할 필요 없이, 컴포넌트 바로 위에 적힌 기획 주석(JSDoc)에만 100% 의존하여 내부 UI와 애니메이션 로직을 채워 넣습니다.
- 🚨 **FILL 마커 가드**: 주석에 `{FILL_` 로 시작하는 미작성 마커가 남아있으면, 해당 Scene은 구현하지 말고 사용자에게 "이 Scene의 기획이 미완성입니다"라고 알리고 중단하세요.
- 모든 Scene의 `// TODO: 구현`이 완벽하게 채워질 때까지 이 작업을 반복 수행합니다.

### 3. 린트 (결함 점검)

// turbo

```bash
npm run lint
```
