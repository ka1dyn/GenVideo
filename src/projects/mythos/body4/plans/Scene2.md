# Scene 2

## 데이터 (수정 금지)
- 대본: 4월 16일에 출시된 것은 다름아닌 opus4.7이었습니다. (총 128f)
- 타이밍: "4월" 0f | "16일에" 5f | "출시된" 27f | "것은" 41f | "다름아닌" 50f | "opus4.7이었습니다." 59f
- 이미지: 1개
  - `public/mythos/body4/images/opus4_7.png` 1516×840 (1.80)

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: 예상 밖의 Opus 4.7 출시를 강조합니다. 좌측에는 출시 날짜와 이름을 배치하고, 우측에는 제품 이미지를 배치하여 정보를 명확히 전달합니다.
레이아웃: B
이미지 활용: [요소-대] / [우측 배치, 등장.①페이드인 delay=27f]
배경: 색상-COLORS.BG_MUTED / 패턴-없음 / 변화-없음

요소:
1. [텍스트] / [4월 16일] / [SIZE_LG] / [TEXT_SUB] / [등장.③방향 type=fadeRight delay=5f]
2. [이미지] / [opus4_7.png] / [요소-대] / [-] / [등장.①페이드인 delay=27f]
3. [텍스트] / [Opus 4.7] / [SIZE_2XL] / [PRIMARY_BOLD] / [등장.②스케일인 delay=59f]

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → COLORS.BG_MUTED, TEXT_SUB, PRIMARY_BOLD 및 FONTS.SIZE_LG, 2XL, SPACING.PX_120 등 토큰 사용 확인
- [x] 요소가 자막 영역(하단 150px) 침범 → 좌우 분할 레이아웃이며, padding: SPACING.PX_120으로 하단 여백 확보됨
- [x] 애니메이션 최대 3개 → fadeRight(1회), scale(1회), fade(1회) 사용 (컴포넌트 종류 기준 3종류)
- [x] 이전 Scene과 레이아웃 차별화 여부 → Scene 1(A: 중앙) -> Scene 2(B: 좌우 분할)로 차별화됨
