---
description: 기획서를 바탕으로 Remotion 씬을 순차적으로 구현하는 워크플로우
---

# /implement-scenes {project_id}

섹션별 Remotion 영상 계확서를 바탕으로 실제 코드로 영상을 구현하는 워크플로우입니다.

## 최종 프로젝트 구조

```
public/{project_id}/
    design-system.md
    {section}/
        {section}.txt
        {section}.wav
        {section}_timestamp.json
        {section}_context.md
        {section}_final_timeline.json
        {section}_plan.md

src/constants/
    video-config.ts

src/projects/{project_id}/
    theme.ts                        <--- 디자인 시스템의 상수 모음 (여기서 import 하여 사용)
    {section}/
        {section}.tsx               <--- 해당 섹션의 최상위 Series 래퍼 및 Audio 컴포넌트
        sequences.tsx               <--- 각 section의 시퀀스 컴포넌트 모음

src/shared-components/
    CaptionOverlay.tsx

```

## 사전 조건

- 각 섹션의 기획서 작성 완료 (`public/{project_id}/{section}/{section}_plan.md`)
- 디자인 테마 파일 생성 완료 (`src/projects/{project_id}/theme.ts`)

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

디렉토리 탐색(list_dir 등)의 파일 목록을 바탕으로, 순차적으로 구현을 진행합니다.
모든 섹션을 **하나씩** 완료한 후 다음 섹션으로 이동합니다 (예: intro → body1 → outro).

각 섹션 구현 완료 후 반드시 사용자에게 검토를 요청하세요 <--- 반드시 멈춤

각각의 독립된 `{section}`별로 다음을 수행합니다:

#### 2-1. 기획서 확인

- 각 섹션의 대본(`public/{project_id}/{section}/{section}.txt`)과 기획서(`public/{project_id}/{section}/{section}_plan.md`)를 확인하고 주제, 내용, 맥락을 이해합니다.

- `src/projects/{project_id}/{section}/sequences.tsx` 파일을 확인하고 구현할 부분을 파악합니다.

#### 2-2. 구현 전 필수 준수 규칙

> 당신은 지금부터 Apple, Vercel, Toss와 같은 최고 수준의 IT 기업에서 일하는 수석 UI/UX 모션 디자이너이자 'React Remotion 개발자'입니다. 복잡하고 유치한 연출을 철저히 배제하고, 깔끔하고 구조적인 코드로 세련미를 극대화하세요.

- 미니멀리즘과 구조적 레이아웃: 뻔한 중앙 정렬이나 예술적인 기교보다는 타이포그래피, 여백, 정교한 Grid/Flexbox 정렬을 사용하여 전문적이고 신뢰감 있는 UI를 구성하세요.
- 클리셰 메타포 절대 금지 & 이모지 사용 금지: 가위, 전구, 돋보기 등 단어를 일차원적으로 표현하는 촌스러운 아이콘을 절대 사용하지 마세요. 또한 시스템 이모지(✅ 등) 사용을 엄격히 금지하며, 대신 순수 CSS나 SVG 패스를 활용해 직접 드로잉하세요. 화려함보다는 깔끔함, 트렌디함을 중시합니다.
- 그래픽 요소를 구현할 때, 곡선을 지양하고 직선적인 느낌으로 깔끔함과 트렌디함을 추구합니다. round를 과하게 사용하지 마세요.
- 디자인 시스템 강제: 색상, 그림자, 글로우 효과 등은 반드시 `src/projects/{project_id}/theme.ts`에 정의된 상수만 가져와서 사용해야 합니다.

#### 2-3. 공통 UI/애니메이션 컴포넌트 선행 생성 (Componentize)

본격적인 씬 구현에 앞서, 기획서를 분석하여 반복적으로 등장하는 UI 패턴이나 특수 애니메이션을 독립된 공용 컴포넌트로 먼저 추출하세요.

- **생성 경로:** `src/projects/{project_id}/components/`
- **설계 원칙 (Separation of Concerns):**
  1. **로직 중심 설계:** 컴포넌트는 `spring`, `interpolate`를 활용한 **'움직임의 로직'** 구현에 집중하세요.
  2. **스타일 주입 (Props):** `color`, `fontSize`, `fontWeight`, `delay` 등 시각적 속성은 내부에서 결정하지 말고 **반드시 Props를 통해 외부에서 주입**받도록 만드세요.
  3. **순수성 유지:** 컴포넌트 파일 자체에서 `theme.ts`를 직접 참조(Import)하는 것을 지양하고, **사용하는 쪽(Scene)에서 `theme.ts`의 상수를 Prop으로 넘겨주도록** 유도하여 재사용성을 극대화하세요.
- **중복 방지:** 이미 `components/` 폴더에 생성된 동일한 목적의 컴포넌트가 있다면 새로 만들지 말고 적극적으로 재사용하세요.

#### 2-4. 디테일 구현(Chunking & Iteration)

- 규칙 숙지가 끝났다면, 스켈레톤 파일(`src/projects/{project_id}/{section}/sequences.tsx`)의 빈 컴포넌트를 최대 3개 단위(Chunk)로 묶어서 순차적으로 내부 UI와 애니메이션 로직을 채워 넣습니다.
- 다른 문서를 다시 열람할 필요 없이, 컴포넌트 바로 위에 적힌 기획 주석(JSDoc)에만 100% 의존하여 구현에 집중하세요.
- 모든 Scene의 TODO 코드를 완벽하게 채울 때까지 이 작업을 반복 수행합니다.

### 3. 린트 (결함 점검)

// turbo

```bash
npm run lint
```
