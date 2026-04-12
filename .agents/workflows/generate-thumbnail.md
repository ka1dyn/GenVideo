---
description: 영상 주제에 맞는 썸네일 배경 이미지를 AI로 생성하고 Remotion 썸네일 컴포넌트에 적용하는 워크플로우
---

# /generate-thumbnail {project_id}

영상 프로젝트의 썸네일을 제작하는 워크플로우입니다.
AI 이미지 생성 + 일관된 후처리 오버레이 시스템으로, 매번 주제에 맞는 직관적인 배경을 만들면서도 채널 아이덴티티를 통일합니다.

## 일관성 원칙

> 일관성은 "같은 이미지"가 아니라 **"같은 스타일 프롬프트 + 같은 후처리 + 같은 텍스트 레이아웃"**으로 만들어집니다.

- **이미지 스타일**: 아래 공통 프롬프트 프리픽스로 통일 (스케치/아날로그 톤)
- **후처리**: `BackgroundLayer.tsx`의 브랜드 틴트(`SECONDARY_LIGHT`) + 종이 노이즈가 자동 적용
- **텍스트**: `minimal` 프리셋 고정 (테라코타 강조, 세이지 뱃지)

## 사전 조건

- 영상 제목과 주제가 확정되어 있어야 합니다.
- Remotion 개발 서버가 실행 중이어야 합니다 (`npm run dev`).

---

## Phase 1: 배경 이미지 프롬프트 작성

### 공통 스타일 프리픽스 (항상 고정)

아래 프리픽스를 **모든 썸네일 이미지 생성에 반드시 포함**합니다. 절대 수정하지 마세요.

```
A hand-drawn sketch illustration on cream-colored paper,
warm analog aesthetic, marker and pen drawing style,
soft sage green and terracotta color palette,
slightly rough ink outlines, watercolor wash accents,
no text, no UI elements, no letters, clean composition,
wide cinematic 16:9 aspect ratio
```

### 주제 서픽스 작성 규칙

영상 주제를 분석하여 **시각적으로 직관적인 장면 묘사**를 영어로 작성합니다.

**작성 원칙**:
1. **직관적 장면 묘사**: 영상 제목을 읽었을 때 떠오르는 핵심 이미지를 구체적으로 서술합니다.
   - ❌ 추상적: `AI and war concept`
   - ✅ 구체적: `an anthropomorphic AI robot standing on a battlefield, holding tactical equipment`
2. **구도 지시**: 텍스트가 좌하단에 배치되므로, 핵심 피사체는 **우측 또는 중앙~우측**에 배치합니다.
   - `the main subject positioned on the right third of the frame`
   - `wide shot with open space on the left side`
3. **금지 사항**:
   - ❌ 텍스트, 글자, 로고, UI 요소 포함 금지 (후처리로 추가됨)
   - ❌ 유치한 아이콘(전구, 가위, 돋보기 등) 사용 금지
   - ❌ 실사 사진 스타일 금지 (스케치/일러스트 톤 유지)
4. **맥락 표현**: AI 기술/서비스를 의인화하거나 메타포로 표현하면 효과적입니다.
   - Claude → 로봇 캐릭터, ChatGPT → 빛나는 대화 인터페이스 등

### 프롬프트 예시 모음

| 영상 제목 | 주제 서픽스 |
|---|---|
| 미국, 이란 전쟁 클로드 참전 | `an anthropomorphic AI robot standing confidently on a dramatic battlefield, holding tactical equipment, military atmosphere with distant smoke plumes and waving flags, the robot positioned on the right third` |
| GPT-5 출시 임박 | `a massive glowing door slowly opening with brilliant light pouring out, a small human figure watching in awe from below, epic sense of scale, the door on the right side of the frame` |
| AI로 유튜브 자동화 | `a whimsical factory conveyor belt producing video screens, robotic arms assembling content pieces, creative assembly line, factory scene filling the right half` |
| 클로드 vs GPT 비교 | `two distinct robot characters facing each other in a dramatic standoff, one warm-toned and one cool-toned, sparks between them, centered to right composition` |
| AI 코딩 시대 | `a robot hand and a human hand collaborating on building a structure together, construction scaffold in background, teamwork atmosphere, subjects on center-right` |

---

## Phase 2: 이미지 생성 및 저장

1. **이미지 생성**

   `generate_image` 도구를 사용하여 배경 이미지를 생성합니다.
   프롬프트는 반드시 **공통 프리픽스 + 주제 서픽스**를 합쳐서 사용합니다.

2. **이미지 저장**

   // turbo
   생성된 이미지를 프로젝트의 thumbnail 폴더에 복사합니다.
   ```bash
   cp {생성된_이미지_경로} public/thumbnail/{project_id}-bg.png
   ```

3. **프롬프트 기록**

   재생성을 위해 사용한 전체 프롬프트를 기록합니다.
   ```bash
   echo "{사용한 전체 프롬프트}" > public/thumbnail/{project_id}-bg-prompt.txt
   ```

---

## Phase 3: Root.tsx 적용

`src/Root.tsx`의 Thumbnail `defaultProps`를 업데이트합니다.

수정할 속성:
- `backgroundImage`: `staticFile("thumbnail/{project_id}-bg.png")`로 변경
- `badgeText`: 영상 카테고리에 맞게 설정
- `badgeIcon`: 적절한 이모지 설정
- `titleLine1`: 영상 제목 1줄
- `titleLine2`: 영상 제목 2줄 (선택)
- `highlightWords`: 강조할 핵심 키워드 배열
- `preset`: `"minimal"` (고정)

---

## Phase 4: 미리보기 확인

Remotion Studio(`http://localhost:3000`)에서 Thumbnails → thumbnail 컴포지션을 선택하여 결과를 확인합니다.

### 체크리스트
- [ ] 배경 이미지가 주제를 직관적으로 전달하는가?
- [ ] 세이지 톤 틴트가 자연스럽게 적용되었는가?
- [ ] 종이 노이즈 질감이 은은하게 느껴지는가?
- [ ] 좌하단 텍스트가 배경 위에서 잘 읽히는가?
- [ ] 전체 톤이 기존 썸네일과 통일감이 있는가?

문제가 있으면 Phase 1로 돌아가 프롬프트를 조정하고 이미지를 재생성합니다.

**확인 완료 후 사용자에게 최종 승인을 요청하세요.** <--- 반드시 멈춤
