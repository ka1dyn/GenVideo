### Chunk 1 검토 (Scene 1~2)

- [x] 물리적 통제: 자막 하단 150px / 화면 밖으로 나간 요소 없음 (요약: Scene 1 텍스트 하단 100px 여백 및 중앙 배치, Scene 2 양측 여백 충분)
- [x] z-index 레이어 순서: (요약: PaperTexture가 가장 아래, 텍스트와 SVG가 그 위에 적절히 배치됨)
- [x] 색상, 폰트, 폰트사이즈(fontSize)를 하드코딩이 아닌 theme.ts에 명시된 디자인 토큰으로 작성 (요약: COLORS, FONTS, SPACING 토큰 전량 사용)
- [x] 한국어 단어, 문장 사용: (요약: 모든 텍스트 한국어 사용 완료)

### Chunk 2 검토 (Scene 3~4)

- [x] 물리적 통제: 자막 하단 150px / 화면 밖으로 나간 요소 없음 (요약: Scene 3 중앙 집중 레이아웃, Scene 4 카드들 상단 배치로 자막 영역 확보)
- [x] z-index 레이어 순서: (요약: PaperTexture 위로 AiCore, 카드 등이 순차적으로 잘 보임)
- [x] 색상, 폰트, 폰트사이즈(fontSize)를 하드코딩이 아닌 theme.ts에 명시된 디자인 토큰으로 작성 (요약: SECONDARY, STATE_ERROR_FG, BG_MUTED 등 토큰 적극 활용)
- [x] 한국어 단어, 문장 사용: (요약: Anthropic Claude 고유명사 제외 모든 텍스트 한국어)

### Chunk 3 검토 (Scene 5)

- [x] 물리적 통제: 자막 하단 150px / 화면 밖으로 나간 요소 없음 (요약: 전체 요소를 중앙 및 상단으로 밀어올려 자막 영역 250px 이상 확보)
- [x] z-index 레이어 순서: (요약: BG_DARKEST 배경 위로 AI 박스들과 텍스트가 선명하게 보임)
- [x] 색상, 폰트, 폰트사이즈(fontSize)를 하드코딩이 아닌 theme.ts에 명시된 디자인 토큰으로 작성 (요약: PRIMARY_BOLD, BG_DARKEST, TEXT_ON_DARK 등 테마 토큰 준수)
- [x] 한국어 단어, 문장 사용: (요약: GPT, Gemini, Claude 모델명 제외 모든 텍스트 한국어 사용)
