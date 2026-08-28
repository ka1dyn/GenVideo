# Scene 4

## 데이터 (수정 금지)
- 대본: 대표적인 사례가 있는데, 보안이 뛰어나다고 알려진 한 운영체제에서, 27년간 아무도 발견하지 못했던 버그를 하루만에 찾아냈습니다. (총 288f)
- 타이밍: "대표적인" 0f | "사례가" 32f | "있는데," 44f | "보안이" 63f | "뛰어나다고" 82f | "알려진" 101f | "한" 115f | "운영체제에서," 120f | "27년간" 150f | "아무도" 170f | "발견하지" 179f | "못했던" 196f | "버그를" 208f | "하루만에" 223f | "찾아냈습니다." 229f
- 이미지: 1개
  - `public/mythos/body3/images/openbsd.png` 1954×1092 (1.79)

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: 구체적인 사례(OpenBSD)를 통해 Mythos의 압도적인 속도를 강조합니다. '27년'과 '하루'라는 극명한 시간 대비를 시각화합니다.
레이아웃: B
이미지 활용: 배경 / 전체 화면 배치, TINT_DARK 오버레이, 등장.①페이드인 delay=0f
배경:
    색상-[COLORS.BG_DARK] / 패턴-[없음] / 변화-[없음]

요소:
1. 보조.①카드 / "27년 동안 미발견" / SIZE_LG / TEXT_BODY / 등장.①페이드인 delay=150f
2. 보조.①카드(emphasis) / "단 1일 만에 발견" / SIZE_XL / PRIMARY / 등장.②스케일인 delay=223f
3. 카운터 / 27 (년) / SIZE_3XL / TEXT_ON_DARK / 데이터.②카운터 startFrame=150f duration=30f suffix="년"

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → COLORS.BG_DARK, EFFECTS.TINT_DARK, FONTS.MONO/PRIMARY, SPACING.PX_80/64/32/24/16 등 모든 값에 토큰을 사용함
- [x] 요소가 자막 영역(하단 150px) 침범 → paddingBottom: 230을 설정하여 하단 안전 영역을 확보함
- [x] 애니메이션 최대 3개 → Appear(fade/scale), Counter 총 2종의 애니메이션을 적절히 사용함
