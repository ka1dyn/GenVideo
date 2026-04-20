---
description: Section 단위로 Remotion 씬을 순차적으로 기획 및 구현하는 워크플로우
---

# /implement-section {project_id} {section}

해당 섹션의 모든 Scene을 **1개씩 순차적으로** 기획→구현→QA하는 워크플로우입니다.

## 프로젝트 구조

```
/public
   /{project_id}
      /{section}
         /images                 <--- 해당 섹션에서 사용할 이미지 에셋 파일
            image.png
            image.jpg
            ...
/src
   /projects
      /{project_id}
         GEMINI.md               <--- 프로젝트에서 반드시 지켜야 할 규칙
         /{section}
            make_video_plan.md   <--- 해당 섹션 개요, 작업 워크플로우
            Sequences.tsx        <--- 오디오, 자막 설정(미리 생성됨. 수정 금지)
            sequences.tsx        <--- Scene들을 순서대로 배치 및 시간 설정(미리 생성됨. 수정 금지)
            /plans
               /Scene{N}.md      <--- 해당 섹션에 포함된 각 Scene의 기획 파일
            /scenes
               /Scene{N}.tsx     <--- 해당 섹션에 포함된 각 Scene의 구현 파일
            /components          <--- 해당 섹션에서 사용되는 전용 컴포넌트(svg 파일, UI 컴포넌트)
   /shared-components            <--- 프로젝트 전체가 공유하는 컴포넌트(수정 불가)
   /constants                    <--- 프로젝트 전체가 공유하는 상수, 테마 등
      theme.ts                   <--- 테마 상수, 색상, 폰트 정보 (수정 불가)
```

## 워크플로우 실행 순서

### Phase 1: 컨텍스트 로드 (1회만 수행)

아래 파일들을 순서대로 읽고 숙지하세요. 이후 Phase에서 반복하여 읽을 필요는 없습니다.

1. **Remotion 지식(필독)**
   - 파일 열기 도구(`view_file`)를 사용해 **`.agents/skills/remotion-best-practices/SKILL.md`** 파일을 반드시 1회 미리 읽습니다.
   - 추가로 **`rules/animations.md`** 와 **`rules/timing.md`** 를 반드시 읽으세요.
2. **대본 맥락 파악**
   - `public/{project_id}/{section}/{section}.txt`(해당 섹션 원본 대본) 파일을 꼼꼼히 읽고, 해당 섹션의 전반적인 분위기와 대본의 맥락을 완벽히 파악하세요.
3. **프로젝트 절대규칙**: `src/projects/{project_id}/GEMINI.md`를 읽습니다.
4. **섹션 기획서**: `src/projects/{project_id}/{section}/make_video_plan.md`를 읽고 디자인 페르소나, 전체 흐름을 숙지합니다.

---

## Phase 2: Scene 단위 반복 (Scene1 → Scene2 → ... → SceneN)

`plans/` 디렉토리의 Scene을 번호 순서대로 **1개씩** 아래 3 Step을 수행합니다. 모든 Scene의 구현이 끝날 때 까지 기획 -> 구현 -> QA 를 반복합니다. 사용자에게 따로 요청하지 않고 전부 진행합니다.

> [!CAUTION]
> **물리적 순서 엄수**
>
> 1. SceneX의 Step C(QA)가 완전히 끝나기 전까지, Scene{X+1}의 Step A(기획)를 **절대** 시작하지 마세요.
> 2. Step A(기획)와 Step B(구현)를 하나의 tool call로 묶지 마세요. **반드시 기획 파일 저장 → 구현 파일 저장** 순서로 분리합니다.

### Step A: 기획 작성

1. `plans/SceneX.md`를 엽니다.
2. `make_video_plan.md`의 카탈로그(레이아웃 A~D, 애니메이션 ①~⑦, 이미지 활용)에서
   **선택**하여 기획 슬롯을 전부 채웁니다. 빈 값, "추후 결정" 등 모호한 기술은 금지입니다.
3. 이 Step에서는 `plans/SceneX.md`**만** 수정합니다. 코드 파일은 손대지 마세요.

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

- **기존 컴포넌트 파일은 수정 금지** (신규 생성만 허용).

### Step C: 구현 후 QA

구현 완료 후, `plans/SceneX.md` 하단의 **QA** 체크리스트를 채웁니다.

- 단순 `[x]` 표기는 금지입니다. 괄호 안에 **구체적 결과를 한 줄**로 서술해야 합니다.
- QA 항목:
  1. 토큰 위반 (하드코딩 색상/사이즈/여백)
  2. 자막 영역 (하단 150px 침범)
  3. 애니메이션 2종 이상 사용 여부
  4. 이전 Scene과 레이아웃 차별화 여부
- 문제가 발견되면 즉시 코드를 수정한 후 QA를 다시 채우세요.
- QA가 모두 통과되면 다음 Scene으로 진행합니다.

---

## Phase 3: 최종 검증 (모든 Scene 완료 후)

해당 섹션의 모든 Scene 작업이 완료되었다면 다음 명령어를 수행합니다.

// turbo

```bash
export PATH=$PATH:/opt/homebrew/bin && npx eslint src/projects/{project_id}/{section}
```

다른 프로젝트에서 발생한 에러는 신경쓰지 않고, 현재 섹션의 코드에서 발생한 린트 에러만 확인하여 수정하세요.

// turbo

```bash
python3 scripts/update-gallery.py {project_id}
```

최종적으로 사용자에게 작업 결과를 요약 보고하고, 영상 결과물을 갤러리에서 검토해 달라고 요청하세요.
