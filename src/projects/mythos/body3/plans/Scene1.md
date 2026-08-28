# Scene 1

## 데이터 (수정 금지)
- 대본: 그렇다면 얼마나 능력이 뛰어나길래 위험하다고 판단했을까요? (총 108f)
- 타이밍: "그렇다면" 0f | "얼마나" 18f | "능력이" 32f | "뛰어나길래" 45f | "위험하다고" 69f | "판단했을까요?" 84f
- 이미지: 0개

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: 질문을 통해 시청자의 호기심을 자극합니다. '뛰어난 능력'과 그에 상반되는 '위험성'을 시각적으로 대비시켜 강조합니다.
레이아웃: A
이미지 활용: 없음
배경:
    색상-[COLORS.BG_BASE] / 패턴-[그리드] / 변화-[없음]

요소:
1. 텍스트 / "얼마나?" / SIZE_XL / TEXT_SUB / 등장.①페이드인 delay=18f
2. 키워드 / "뛰어난 능력" / SIZE_2XL / PRIMARY / 등장.①페이드인 delay=32f
3. 키워드 / "위험성" / SIZE_3XL / STATE_ERROR_FG / 등장.②스케일인 delay=69f
4. 밑줄 / 위험성 하단 / PX_8 / STATE_ERROR_FG / 강조.②밑줄 delay=84f

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → COLORS.BG_BASE, FONTS.SIZE_XL/2XL/3XL, SPACING.PX_48/32/16/8 등 모든 값에 토큰을 사용함
- [x] 요소가 자막 영역(하단 150px) 침범 → paddingBottom: 150을 설정하여 요소들이 하단 자막 영역에 침범하지 않도록 함
- [x] 애니메이션 최대 3개 → Appear(fadeUp), Appear(scale), UnderLine 총 3종의 애니메이션을 적절히 사용함
