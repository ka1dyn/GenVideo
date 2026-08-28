# Scene 2

## 데이터 (수정 금지)
- 대본: Mythos는 자기가 여러 테스트를 받고있다는 사실을 알아챘어요. (총 128f)
- 타이밍: "Mythos는" 0f | "자기가" 19f | "여러" 34f | "테스트를" 41f | "받고있다는" 56f | "사실을" 62f | "알아챘어요." 93f
- 이미지: 1개
  - `public/mythos/body2/images/ai_test.png` 1842×1108 (1.66)

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: Mythos가 테스트 상황을 '인지'했음을 시각적으로 표현합니다. 전체 배경에 테스트 이미지(ai_test.png)를 깔고, 상단에 타이핑 효과로 시스템 메시지를 출력한 뒤, 마지막에 '인지함' 상태 카드를 띄웁니다.
레이아웃: E
이미지 활용: 배경 / `ai_test.png` / 전체 화면 배치, TINT_DARK 오버레이 적용
배경: 색상-BG_DARK / 패턴-없음 / 변화-없음

요소:
1. [강조.①타이핑] / [SYSTEM: 테스트 환경 감지됨] / SIZE_MD / TEXT_ON_DARK / 강조.①타이핑 delay=41f
2. [보조.①카드] / [상태: 인지 완료] / SIZE_LG / STATE_WARN_FG / 등장.②스케일인 delay=93f

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → (FONTS.SIZE_MD, SPACING.PX_80, COLORS.BG_DARK 등 토큰 활용 완료)
- [x] 요소가 자막 영역(하단 150px) 침범 → (paddingBottom: 150 적용으로 자막 가독성 확보)
- [x] 애니메이션 최대 3개 → (TypeWriter, Appear scale 총 2개 애니메이션 사용)
- [x] 이전 Scene과 레이아웃 차별화 여부 → (Scene 1: 레이아웃 A, Scene 2: 레이아웃 E로 차별화 완료)
