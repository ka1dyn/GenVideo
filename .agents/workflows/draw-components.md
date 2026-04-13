---
description: 기획서 기반으로 SVG/Canvas 그래픽 컴포넌트를 사전 구축하는 워크플로우. implement-scenes 전에 실행해야 합니다.
---

# /draw-components {project_id}

`implement-scenes` 전에 실행하는 그래픽 자산 사전 구축 단계입니다.

## 전체 흐름

```
/plan-video  →  generate-sequences.py  →  /draw-components  →  /implement-scenes
```

## 핵심 원칙

> **`sequences.tsx`의 JSDoc 주석이 단일 진실 원천(Single Source of Truth)입니다.**
>
> - 이 워크플로우는 단순화 결정·컴포넌트 정보를 **즉시 해당 씬의 JSDoc에 반영**합니다.
> - `/implement-scenes`는 오직 `sequences.tsx` 주석만 보고 구현합니다.

## 사전 조건

- `python3 scripts/generate-sequences.py {project_id}` 실행 완료
- `src/projects/{project_id}/` 하위에 섹션별 `sequences.tsx` 뼈대 존재

---

## Phase 1: 스캔 → 분류 → 공통 추출 → 단순화 확정

### 1-1. 모든 sequences.tsx 스캔

`src/projects/{project_id}/` 하위 전체 섹션의 `sequences.tsx`를 읽어,  
각 Scene JSDoc의 **"필요한 그림(svg, canvas) 컴포넌트"** 항목을 전부 수집합니다.

> 🚨 plan.md는 읽지 않습니다. sequences.tsx JSDoc에 이미 복사되어 있습니다.

### 1-2. 난이도 분류

| 등급      | 기준                              |
| --------- | --------------------------------- |
| 🟢 Easy   | 기하 도형, 3단 이하 SVG path      |
| 🟡 Medium | 단순 캐릭터, 건물 외형, 단순 지도 |
| 🔴 Hard   | 파티클, 유기체, Canvas 애니메이션 |

> 🔴 Hard 판단 기준: **2초 미만 등장 또는 배경 역할** → 단순화 권장 / **씬 전체 주인공** → 완성도 있게 구현

### 1-3. 공통 컴포넌트 자동 추출

수집한 컴포넌트 중 **2개 이상의 씬에서 동일하게 요청된 것**을 공통 컴포넌트로 그룹핑합니다.

> 공통 컴포넌트 목록은 하드코딩하지 않습니다. **반드시 스캔 결과에서 빈도 기반으로 도출**하세요.

### 1-4. 사용자 보고 및 확인

아래 형식으로 보고 후 **반드시 멈춥니다**: <--- 반드시 멈춤

```
[공통 컴포넌트 - N개] (2회 이상 등장)
- ComponentA: 등장 씬 목록, 등급
- ComponentB: 등장 씬 목록, 등급

[🔴 Hard - 단순화 검토]
- body4/Scene3 잉크 번짐: clip-path 확장 권장 (2초 배경 등장)
- body4/Scene14 물 오염: CSS 색상 전환 권장

[🟡 Medium - 구현 가능]
- intro/Scene1 세계 지도, body1/Scene9 네트워크망 ...

[🟢 Easy - 바로 구현]
...
```

### 1-5. 단순화 확정 → sequences.tsx JSDoc 즉시 업데이트

사용자 확인 후, 단순화가 확정된 씬의 JSDoc에 `SIMPLIFIED` 블록을 **즉시** 씁니다:

```tsx
/**
 * [Scene 3]
 * - 필요한 그림: 잉크 번짐 이펙트
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <ClipPathExpand progress={p} color={color} />
 * - 단순화 이유: 2초 배경 등장, clip-path circle 확장으로 동일 효과
 * ─────────────────────────────────────────────
 */
```

---

## Phase 2: Gallery 초기화

// turbo

```bash
python3 scripts/update-gallery.py {project_id}
```

이 스크립트가 자동으로 처리합니다:

- `src/projects/{project_id}/components/` 디렉토리 생성
- `ComponentGallery.tsx` 생성 (빈 상태)
- `src/Root.tsx`에 `{project_id}-component-gallery` Still 등록

---

## Phase 3: 공통 컴포넌트 구현

**저장 경로**: `src/projects/{project_id}/components/`

> **공유 인프라 컴포넌트**: `Wobble`, `DrawLine`, `PaperTexture`는 `src/shared-components/`에 이미 존재합니다.
> 이 3가지는 프로젝트별로 새로 만들지 않고, `sequences.tsx` 스켈레톤에 자동 import됩니다.

Phase 1-3에서 도출된 공통 컴포넌트를 먼저 구현합니다.

### 컴포넌트 일반 규칙

- **정적 SVG 배치 금지**: 모든 SVG는 `<Wobble>`로 감싸거나 `progress` 기반 드로잉 애니메이션을 적용하세요.
- 각 씬에 제한적인 포인트로 사용될 예정이므로 여러개를 한번에 작업하지 않고 각 이미지를 "하나씩" 사력을 다해 깔끔하게 구현

### 구현 규칙

1. **Props 중심**: 색상·크기 등 시각 속성은 모두 Props. 컴포넌트 내부에서 `theme.ts` import 금지.
2. **스케치 스타일**: `strokeLinecap="round"`, `strokeLinejoin="round"` 기본 적용.
3. **`useCurrentFrame` 금지**: `progress: number` (0~1) prop을 외부에서 주입받습니다.
4. **`@gallery` 주석 필수**: 파일마다 아래 주석을 추가해야 Gallery에 자동 등록됩니다.

```tsx
// @gallery: <SketchArrow progress={1} color="#E8A87C" strokeWidth={3} />
export const SketchArrow: React.FC<Props> = ({ progress, color, strokeWidth }) => { ... }
```

### progress prop 패턴

```tsx
// ✅ 컴포넌트: progress prop을 받는다
interface Props {
  progress: number;
  color?: string;
}

// ✅ 씬(sequences.tsx)에서: interpolate로 계산 후 전달
const frame = useCurrentFrame();
const p = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
<MyComponent progress={p} color={COLORS.PRIMARY} />;

// ❌ 컴포넌트 내부에서 useCurrentFrame() 직접 호출 금지
```

### ✅ 공통 컴포넌트 완성 후 확인 체크포인트

// turbo

```bash
python3 scripts/update-gallery.py {project_id}
```

```
✅ 공통 컴포넌트 완성 — Gallery에서 확인해주세요!
→ http://localhost:3000 → Still: {project_id}-component-gallery
문제 있으면 알려주세요.
```

**반드시 멈추고 사용자 확인을 기다립니다.** <--- 반드시 멈춤

---

## Phase 4: 섹션별 고유 컴포넌트 구현

`intro` → `body1` → ... → `outro` 순서로 진행합니다.

각 섹션마다:

1. 해당 섹션 `sequences.tsx` JSDoc의 **"필요한 그림"** 및 **`SIMPLIFIED` 블록**을 읽습니다.
2. 공통 컴포넌트로 커버되는 항목은 건너뜁니다.
3. 나머지를 구현합니다. `SIMPLIFIED` 블록이 있는 항목은 그 버전으로 구현합니다.
4. **각 컴포넌트에 `// @gallery: <...>` 주석을 반드시 추가**합니다.
5. 구현 완료 컴포넌트를 해당 씬 JSDoc에 `COMPONENTS` 블록으로 기록합니다:

```tsx
/**
 * [Scene 7]
 * - 필요한 그림: Bloomberg 신문, 말풍선
 * ─── COMPONENTS ───────────────────────────────
 * - <SketchNewspaper progress={p} />  → SketchNewspaper.tsx
 * - <PopupBubble progress={p} tail="bottom" />  → PopupBubble.tsx (공통)
 * ──────────────────────────────────────────────
 */
```

### ✅ 섹션 완료 후 확인 체크포인트

// turbo

```bash
python3 scripts/update-gallery.py {project_id}
```

```
✅ [{section}] 섹션 완성 — Gallery에서 확인해주세요!
→ http://localhost:3000 → Still: {project_id}-component-gallery
이번 섹션 신규 컴포넌트: [목록]
"다음 진행" 또는 "수정 필요: [컴포넌트명]" 을 알려주세요.
```

각 섹션 완료 시 **반드시 멈춥니다.** <--- 반드시 멈춤

---

## Phase 5: 인덱스 파일 생성 및 완료 보고

모든 섹션 완료 후 `src/projects/{project_id}/components/index.ts`를 생성합니다:

```ts
export { SketchArrow } from "./SketchArrow";
// ... 모든 컴포넌트
```

완료 보고 후 사용자 최종 확인을 요청합니다: <--- 반드시 멈춤

```
✅ draw-components 완료

[공통 N개] ...
[섹션별 N개] ...
[단순화 목록] ...

sequences.tsx COMPONENTS/SIMPLIFIED 블록 업데이트 완료.
→ /implement-scenes {project_id} 실행 준비 완료
```
