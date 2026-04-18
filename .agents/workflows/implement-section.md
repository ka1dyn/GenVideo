---
description: Section 단위로 Remotion 씬을 순차적으로 기획 및 구현하는 워크플로우
---

# /implement-section {project_id} {section}

해당 섹션의 모든 Scene을 **1개씩 순차적으로** 기획→구현→QA하는 워크플로우입니다.
이 워크플로우는 `scripts/run-section.sh`에 의해 section 단위로 1회 실행됩니다.

## Phase 1: 컨텍스트 로드 (1회만 수행)

아래 파일들을 순서대로 읽고 숙지하세요. 이후 Phase에서 반복하여 읽을 필요는 없습니다.

1. **Remotion 지식**: `.agents/skills/remotion-best-practices/SKILL.md`를 읽습니다.
2. **프로젝트 가이드라인**: `src/projects/{project_id}/GEMINI.md`를 읽습니다.
3. **섹션 기획서**: `src/projects/{project_id}/{section}/make_video_plan.md`를 읽고 디자인 페르소나, 전체 흐름을 숙지합니다.
4. **Scene 목록 파악**: `src/projects/{project_id}/{section}/plans/` 디렉토리를 스캔하여 Scene 수와 순서를 확인합니다.

---

## Phase 2: Scene 단위 반복 (Scene1 → Scene2 → ... → SceneN)

`plans/` 디렉토리의 Scene을 번호 순서대로 **1개씩** 아래 3 Step을 수행합니다.

> [!CAUTION]
> **물리적 순서 엄수**
>
> 1. SceneX의 Step C(QA)가 완전히 끝나기 전까지, Scene{X+1}의 Step A(기획)를 **절대** 시작하지 마세요.
> 2. Step A(기획)와 Step B(구현)를 하나의 tool call로 묶지 마세요. **반드시 기획 파일 저장 → 구현 파일 저장** 순서로 분리합니다.

### Step A: 기획 작성

1. `plans/SceneX.md`를 엽니다.
2. Scene1이 아니라면, 직전 Scene 기획서(`plans/Scene{X-1}.md`)를 참고하여 연출 흐름의 연속성을 확보하세요.
3. Section 2의 빈칸(@narrative, @layout, @elements, @animation, @tokens)을 **구체적으로** 채워 저장합니다.
   - 각 항목에 1줄 이상 서술. 빈 값, "추후 결정" 등 모호한 기술은 금지입니다.
4. 이 Step에서는 `plans/SceneX.md`**만** 수정합니다. 코드 파일은 손대지 마세요.

### Step B: 코드 구현

작성한 기획을 바탕으로 `scenes/SceneX.tsx`를 구현합니다.

> [!WARNING]
> **파일 활동 범위 제한 (병렬 실행 안전)**
>
> 파일 생성·수정이 허용되는 경로는 아래 두 곳뿐입니다. 이 외의 경로는 **읽기만** 허용됩니다.
>
> - `src/projects/{project_id}/{section}/scenes/` — Scene 코드
> - `src/projects/{project_id}/{section}/components/` — 섹션 전용 컴포넌트
>
> 프로젝트 루트, 다른 섹션, `scripts/`, `src/constants/`, `src/shared-components/` 등에 파일을 생성하거나 수정하지 마세요.

- 필요시 `{section}/components/`에 SVG/UI 컴포넌트를 생성하세요.
- **기존 컴포넌트 파일은 수정 금지** (신규 생성만 허용).
- SVG 내부에 `<text>` 태그 등 글자를 직접 그리지 마세요. 텍스트는 부모 Scene에서 HTML + theme.ts 토큰으로 렌더링합니다.
- **모든 props에 기본값을 지정**하여 크래시를 방어하세요.

### Step C: 구현 후 QA

구현 완료 후, `plans/SceneX.md` 하단의 **Section 3 (구현 후 QA)** 체크리스트를 채웁니다.

- 단순 `[x]` 표기는 금지입니다. 괄호 안에 **구체적 결과를 한 줄**로 서술해야 합니다.
- 문제가 발견되면 즉시 코드를 수정한 후 QA를 다시 채우세요.
- QA가 모두 통과되면 다음 Scene으로 진행합니다.

---

## Phase 3: 최종 검증 (모든 Scene 완료 후)

해당 섹션의 모든 Scene 작업이 완료되었다면 다음 명령어를 수행합니다.

// turbo

```bash
export PATH=$PATH:/opt/homebrew/bin && npm run lint
```

다른 프로젝트에서 발생한 에러는 수정하지 않습니다. 현재 프로젝트 내의 에러만 수정하세요.

// turbo

```bash
python3 scripts/update-gallery.py {project_id}
```

최종적으로 사용자에게 작업 결과를 요약 보고하고, 영상 결과물을 갤러리에서 검토해 달라고 요청하세요.
