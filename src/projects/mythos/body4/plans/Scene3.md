# Scene 3

## 데이터 (수정 금지)
- 대본: 앤트로픽이 공식적으로 한 말이 있는데, opus4.7의 보안 관련 성능은 mythos보다 덜 강력하다고 합니다. (총 216f)
- 타이밍: "앤트로픽이" 0f | "공식적으로" 27f | "한" 54f | "말이" 60f | "있는데," 70f | "opus4.7의" 105f | "보안" 117f | "관련" 125f | "성능은" 136f | "mythos보다" 147f | "덜" 168f | "강력하다고" 172f | "합니다." 193f
- 이미지: 0개

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: 앤트로픽의 공식 발표 내용을 시각화합니다. Opus 4.7과 Mythos의 보안 성능을 진행 바를 사용하여 직관적으로 비교합니다.
레이아웃: B
이미지 활용: 없음
배경: 색상-COLORS.BG_BASE / 패턴-없음 / 변화-없음

요소:
1. [보조.②인용] / [앤트로픽 공식 발표] / [SIZE_LG] / [TEXT_MAIN] / [등장.①페이드인 delay=27f]
2. [텍스트] / [보안 성능] / [SIZE_MD] / [TEXT_SUB] / [등장.①페이드인 delay=117f]
3. [데이터.③진행바] / [Mythos: 100%] / [요소-소] / [PRIMARY] / [데이터.③진행바 delay=147f, value=1.0]
4. [데이터.③진행바] / [Opus 4.7: 70%] / [요소-소] / [SECONDARY] / [데이터.③진행바 delay=105f, value=0.7]

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → COLORS.BG_BASE, TEXT_MAIN, TEXT_SUB, PRIMARY, SECONDARY 및 FONTS.SIZE_LG, MD 사용 확인
- [x] 요소가 자막 영역(하단 150px) 침범 → 좌우 분할 레이아웃이며, padding: SPACING.PX_120으로 하단 여백 충분히 확보됨
- [x] 애니메이션 최대 3개 → Appear(QuoteCard), Appear(Text), ProgressBar 사용 (컴포넌트 종류 기준 3종류)
- [x] 이전 Scene과 레이아웃 차별화 여부 → Scene 2(B: 좌우)와 동일한 B 레이아웃이나, 구성 요소(카드 vs 바 그래프)로 시각적 차별화 도모
