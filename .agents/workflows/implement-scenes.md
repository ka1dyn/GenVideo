---
description: 기획서를 바탕으로 Remotion 씬을 순차적으로 기획 및 구현하는 워크플로우
---

# /implement-scenes {project_id} {section}

특정 섹션의 Remotion 영상 씬(Scene)을 컴포넌트 주석에 직접 기획하고, 이를 바탕으로 실제 코드를 순차적으로 구현하는 워크플로우입니다.

## 0. 사전 조건 검사

작업을 시작하기 전, 다음 파일들이 존재하는지 확인하세요. 만약 하나라도 누락된 파일이나 경로가 있다면 즉시 실행을 중단하고 사용자에게 문제를 알립니다.

- `public/{project_id}/{section}/` 폴더
- `src/constants/theme.ts` 파일
- `src/projects/{project_id}/{section}/sequences.tsx` 파일

## 1. 전체 맥락 파악

본격적인 씬 구현에 앞서 아래 두 파일을 꼼꼼히 읽고, 해당 섹션의 전반적인 분위기와 대본의 맥락을 완벽히 파악하세요.

- `public/{project_id}/{section}/{section}.txt` (해당 섹션 원본 대본)
- `public/{project_id}/{section}/{section}_plan.md` (해당 섹션 애니메이션 기획서 개요)

## 2. 씬 단위 기획 및 구현 (Chunking Iteration)

맥락 파악이 끝났다면, `src/projects/{project_id}/{section}/sequences.tsx` 파일을 엽니다. 이 파일 내에 존재하는 각 Scene을 **최대 2개씩 묶어서(Chunk 단위)** 순차적으로 작업하며, 마지막 Scene이 끝날 때까지 다음 1~4번 과정을 반복 수행합니다.

[매우 중요]
각 Scene 순회 시 반드시 아래의 순서를 **전부 진행하여** 구현해야합니다. 절대로 미리 한번에 기획하고, 마지막에 한번에 검토하지 마세요.
페르소나 리마인드 -> 씬 기획 -> 지식 리마인드 -> 구현 -> 자체 검토 순서로 순차적으로 진행해야합니다.

### 2-1. 디자인 페르소나 및 공통 원칙 초집중 리마인드

직접 기획과 코드를 짜기 전, 다음 사실을 마음속에 강렬히 상기합니다:

- **역할**: "뼈대는 Vercel처럼 정교하게, 질감은 펜 스케치처럼 따뜻하게." 최고 수준의 구조적 깔끔함과 미니멀리즘을 추구하면서도 친근함을 잃지 않는 수석 모션 디자이너이자 Remotion 개발자입니다.
- **미니멀리즘과 구조적 레이아웃(정교한 뼈대와 배치)**: 뻔한 중앙 정렬이나 예술적인 기교보다는 타이포그래피, 넉넉한 여백, 정교한 Grid/Flexbox 정렬을 사용하여 세련된 정보 배치를 1순위로 두세요. 텍스트는 핵심 단어나 짧은 문구만 사용하세요.
- **스케치 느낌의 질감(친근함, 따뜻함)**: 너무 딱딱한 느낌이 들지 않도록 svg 그림을 포인트로 사용합니다. 펜으로 그린듯한 드로잉 그림 위주로 그리며, Wobble과 같은 효과로 손그림 느낌을 살리세요.
- **절대 금지**: `✅`, `💡` 등 시스템 이모지 삽입 절대 금지. 가위, 전구 등 유치한 아이콘 금지.
- **색상 원칙**: 차갑고 딱딱한 분위기를 막기 위해 따뜻한 라이트 모드 색상 위주로 전개. 임의 하드코딩 금지 (`theme.ts` 상수 필수).

### 2-2. Scene 기획 (비주얼 컨셉 기획서를 주석에 작성)

작업 대상인 Scene의 상단 JSDoc 주석(`/** [Scene X] ... */`) 영역을 자세히 읽습니다.

- 주석에 기재된 `원본 텍스트`, `단어 등장 프레임`, `타임라인` 정보를 분석하여 이 씬을 가장 깔끔하고 트렌디하게 연출할 수 있는 구체적인 방법을 고민합니다. 화려하지 않게, 정교하게 연출하는 것이 핵심입니다.
- 주석 내의 **`{FILL_S*_VISUAL: ...}`** 및 **`{FILL_S*_SVG: ...}`** 마커 부분을 **본인이 방금 구상한 명확한 기획 내용으로 교체**합니다.
- 해당 주석을 기반으로 구현을 진행합니다.

### 2-3. 구현 전 지식 리마인드

Remotion 구현 스킬이나 컨벤션(애니메이션, 시퀀싱, 에셋 등)이 헷갈린다면, 파일 열기 도구(`view_file`)를 사용해 **`.agents/skills/remotion-best-practices/SKILL.md`** 파일을 우선적으로 읽습니다.
특히 구현하려는 Scene의 특성에 맞춰 아래의 세부 문서들 중 필요한 것을 능동적으로 골라 읽고 패턴을 상기하세요:

- `.agents/skills/remotion-best-practices/rules/animations.md` — 애니메이션 분리 및 캡슐화 패턴
- `.agents/skills/remotion-best-practices/rules/sequencing.md` — 시퀀스 및 지연(Delay) 패턴
- `.agents/skills/remotion-best-practices/rules/timing.md` — 스프링(Spring), 보간(Interpolate) 등 타이밍 함수
- `.agents/skills/remotion-best-practices/rules/text-animations.md` — 텍스트 모션 기법
- `.agents/skills/remotion-best-practices/rules/transitions.md` — 화면 전환(Transition) 효과
- `.agents/skills/remotion-best-practices/rules/audio.md` — 오디오 및 효과음 처리
- `.agents/skills/remotion-best-practices/rules/assets.md` — 폰트/에셋 임포트 및 활용

### 2-4. 기획 내용 직접 구현

- 방금 2-2단계에서 본인이 주석으로 기획한 레이아웃, 컴포넌트 동작, 애니메이션 컨셉을 100% 반영하여 바로 아래의 `const Scene*: React.FC = () => { ... }` 함수 내부를 직접 구현합니다.
- 필요한 SVG 파일을 `src/projects/{project_id}/components/svg/`에 `.tsx` 확장자로 작성하세요.
- 만약 앞으로도 정말 많이 사용할, 광범위한 용도의 컴포넌트가 있다면(카드 레이아웃 등) 매우 신중하게 분리하여 `src/projects/{project_id}/components/ui/`에 구현하세요. 해당 씬에서만 사용한다면 내부적으로 구현하세요.
- **모든 props는 반드시 안전한 기본값(예: `({ startFrame = 0 }) => ...`)**을 지정하여 `NaN`이나 렌더링 크래시가 발생하지 않도록 방어 코드를 작성하세요.

### 2-5. 직후 자체 코드 검토 (Self-Correction)

코딩을 마친 직후, 다음 Chunk 단위로 넘어가기 전에 **반드시 본인이 방금 작성한 코드를 스스로 검열하고 위반 사항 발견 시 코드를 즉시 수정**하세요.

1. **자막 영역 오버레이 허용 확인**: 핵심 텍스트나 중요 도형이 하단 150px을 침범하지 않고 안전하게 배치되었는가? (배경 텍스처나 파티클 등 인테리어 오버레이는 침범 허용)
2. **z-index 레이어 꼬임 점검**: 오버레이나 배경 요소 때문에 핵심 요소가 가려지거나 안 보이는 꼬임 현상이 없는지 확인했는가? `theme.ts`에 정의된 z-index 토큰 논리에 맞게 올바르게 적층되었는가?
3. **디자인 토큰 엄수**: 하드코딩 된 색상값(예: `#FFFFFF`, `rgba(...)`)이나 기본 폰트가 남아있지 않고 모두 `theme.ts`를 사용했는가?
4. **한국어 점검**: 고유명사나 약어(AI, API 등)를 제외한 모든 시각화 텍스트가 영어 그대로 방치되지 않고 한국어로 작성되었는가?

---

### 3. 최종 검토 및 갤러리 등록 (Review)

해당 `{section}`의 마지막 Scene 작업까지 완료되었다면, 문법 에러가 없는지 점검합니다.

// turbo

```bash
export PATH=$PATH:/opt/homebrew/bin && npm run lint
```

이후 수정이 완료되었다면, 작성한 컴포넌트 및 그림을 시각적으로 확인할 수 있도록 다음 명령어를 실행합니다.

// turbo

```bash
python3 scripts/update-gallery.py {project_id}
```

모음 작업이 완전히 끝났다면 사용자에게 작업 결과를 요약적으로 보고하고, 영상 결과물을 갤러리(`{project_id}-component-gallery`)로 직접 눈으로 검토해 달라고 요청하세요.
