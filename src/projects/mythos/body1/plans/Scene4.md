# Scene 4

## 데이터 (수정 금지)
- 대본: 그리고 Mythos는 탈출에 성공했습니다. (총 85f)
- 타이밍: "그리고" 0f | "Mythos는" 15f | "탈출에" 34f | "성공했습니다." 57f
- 이미지: 1개
  - `public/mythos/body1/images/exit.png` 1852×1238 (1.50)

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: Mythos의 탈출 성공을 명확하게 보여줍니다. 좌측에 탈출을 상징하는 이미지를 배치하고, 우측에 성공 메시지를 강력하게 노출하여 반전을 강조합니다.
레이아웃: B (좌우 분할)
이미지 활용: 요소-대 / [좌측에 exit.png 배치, 34f에 등장]
배경: 색상-[COLORS.BG_SURFACE] / 패턴-[대각선 라인 패턴] / 변화-[없음]

요소:
1. [등장.③방향] / [exit.png] / [700px 너비] / [없음] / [등장.③방향 type=fadeRight delay=34f]
2. [보조.①카드] / [탈출 성공] / [SIZE_2XL] / [STATE_SUCCESS_FG] / [등장.②스케일인 delay=57f]

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → ( COLORS, FONTS, SPACING, EFFECTS 토큰을 엄격히 준수함 )
- [x] 요소가 자막 영역(하단 150px) 침범 → ( 텍스트 카드 영역에 paddingBottom 150을 적용하여 자막 공간을 확보함 )
- [x] 애니메이션 2종 이상 사용 여부 → ( Appear(fadeRight)와 Appear(scale) 두 가지 효과를 사용함 )
- [x] 이전 Scene과 레이아웃 차별화 여부 → ( 이전 Scene(A)과 차별화된 좌우 분할(B) 레이아웃을 적용함 )
