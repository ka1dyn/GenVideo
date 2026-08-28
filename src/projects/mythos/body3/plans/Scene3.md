# Scene 3

## 데이터 (수정 금지)
- 대본: Mythos는 이런 취약점을 대량으로 찾아내고 공격할 수 있을 정도의 뛰어난 모습을 보였습니다. (총 176f)
- 타이밍: "Mythos는" 0f | "이런" 22f | "취약점을" 33f | "대량으로" 54f | "찾아내고" 76f | "공격할" 100f | "수" 110f | "있을" 114f | "정도의" 122f | "뛰어난" 132f | "모습을" 142f | "보였습니다." 152f
- 이미지: 1개
  - `public/mythos/body3/images/hacker.png` 1874×1240 (1.51)

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: Mythos의 강력하고 위험한 성능을 시각화합니다. 해커 이미지를 활용해 '공격'의 이미지를 전달하고, '대량 공격' 키워드를 강조합니다.
레이아웃: B
이미지 활용: 요소-대 / 우측 배치, 등장.①페이드인 delay=22f
배경:
    색상-[COLORS.BG_DARK] / 패턴-[없음] / 변화-[없음]

요소:
1. 키워드 / "Mythos의 성능" / SIZE_XL / PRIMARY / 등장.①페이드인 delay=0f
2. 키워드 / "대량 공격" / SIZE_2XL / STATE_ERROR_FG / 등장.①페이드인 delay=54f
3. 밑줄 / 대량 공격 하단 / PX_8 / STATE_ERROR_FG / 강조.②밑줄 delay=76f
4. 이미지 / hacker.png / 요소-대 / - / 등장.①페이드인 delay=22f

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → COLORS.BG_DARK, EFFECTS.SHADOW_LG, SPACING.PX_80/48/8 등 모든 값에 토큰을 사용함
- [x] 요소가 자막 영역(하단 150px) 침범 → paddingBottom: 230을 설정하여 하단 안전 영역을 충분히 확보함
- [x] 애니메이션 최대 3개 → Appear(fade/fadeRight), UnderLine 총 2종의 애니메이션을 효과적으로 사용함
