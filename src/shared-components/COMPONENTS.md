# 공유 컴포넌트 레퍼런스

> ⚠️ 이 파일의 컴포넌트는 **읽기 전용**입니다. 수정하지 마세요.  
> import 경로: `../../../../shared-components/[이름]` (scenes 폴더 기준)

---

## Appear

요소 등장/퇴장 애니메이션 wrapper.

| prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|:----:|--------|------|
| delay | number | ❌ | 0 | 등장 시작 프레임 |
| exitAt | number | ❌ | — | 퇴장 시작 프레임 (생략 시 퇴장 없음) |
| type | string | ❌ | 'fadeUp' | fade / fadeUp / fadeDown / fadeLeft / fadeRight / scale / wipe / blur |
| children | ReactNode | ✅ | — | 감싸는 요소 |

```tsx
<Appear delay={41} type="scale">
  <span>핵심 키워드</span>
</Appear>

// 요소 교체: A가 퇴장하고 B가 등장
<Appear delay={0} exitAt={60}><span>첫 번째</span></Appear>
<Appear delay={60}><span>두 번째</span></Appear>
```

**타입 사용 빈도 가이드:**
- fadeUp: 기본. 특별한 이유 없으면 사용 (60%)
- scale: 핵심 강조 요소 (15%)
- fadeLeft/fadeRight: 좌우 분할 레이아웃 대비 효과 (15%)
- blur/wipe/fade/fadeDown: 변주 필요 시 (10%)

---

## Card

데이터 카드. 그림자/테두리를 토큰으로 캡슐화.

| prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|:----:|--------|------|
| variant | string | ❌ | 'surface' | surface / emphasis / outline |
| shadow | string | ❌ | variant별 기본값 | none / sm / md / lg |
| children | ReactNode | ✅ | — | 카드 내용 |

```tsx
<Card variant="emphasis" shadow="lg">
  <span>테스트 모드</span>
</Card>
```

---

## QuoteCard

인용구 스타일 카드. 좌측 액센트 바 포함.

| prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|:----:|--------|------|
| accentColor | string | ❌ | COLORS.PRIMARY | 좌측 바 색상 |
| children | ReactNode | ✅ | — | 인용 내용 |

```tsx
<QuoteCard accentColor={COLORS.STATE_ERROR_FG}>
  <span>"능력을 의도적으로 숨겼다"</span>
</QuoteCard>
```

---

## StepList

순차 등장 목록. 각 항목이 stagger 간격으로 fadeUp 진입.

| prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|:----:|--------|------|
| items | string[] | ✅ | — | 목록 항목 배열 |
| startFrame | number | ❌ | 0 | 첫 항목 등장 프레임 |
| stagger | number | ❌ | 16 | 항목 간 프레임 간격 |
| labelType | string | ❌ | 'number' | number / dot / korean |
| color | string | ❌ | TEXT_MAIN | 텍스트 색상 |
| labelColor | string | ❌ | PRIMARY | 번호/라벨 색상 |

```tsx
<StepList
  items={["테스트 인지", "능력 은폐", "신뢰 붕괴"]}
  startFrame={41}
  stagger={30}
  labelType="korean"
/>
```

---

## Counter

숫자 카운트업/다운.

| prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|:----:|--------|------|
| to | number | ✅ | — | 목표 숫자 |
| from | number | ❌ | 0 | 시작 숫자 |
| startFrame | number | ❌ | 0 | 카운트 시작 프레임 |
| duration | number | ❌ | 30 | 카운트 지속 프레임 |
| prefix | string | ❌ | '' | 접두어 (예: "정확도 ") |
| suffix | string | ❌ | '' | 접미어 (예: "%") |
| decimals | number | ❌ | 0 | 소수점 자릿수 |

```tsx
<Counter to={97.3} suffix="%" startFrame={30} decimals={1}
  style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_3XL }}
/>
```

---

## ProgressBar

수평 진행률 바.

| prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|:----:|--------|------|
| value | number | ❌ | 1 | 목표 비율 (0~1) |
| startFrame | number | ❌ | 0 | 시작 프레임 |
| duration | number | ❌ | 21 | 지속 프레임 |
| color | string | ❌ | PRIMARY | 바 색상 |
| trackColor | string | ❌ | BG_MUTED | 배경 트랙 색상 |
| direction | string | ❌ | 'ltr' | ltr / rtl / center |
| height | number | ❌ | 8 | 바 높이(px) |

```tsx
<ProgressBar value={0.73} startFrame={30} color={COLORS.PRIMARY} />
```

---

## UnderLine

텍스트 밑줄 draw 애니메이션.

| prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|:----:|--------|------|
| startFrame | number | ❌ | 0 | 시작 프레임 |
| color | string | ❌ | PRIMARY | 밑줄 색상 |
| height | number | ❌ | 4 | 두께(px) |
| width | number/string | ❌ | '100%' | 너비 |
| direction | string | ❌ | 'ltr' | ltr / rtl |

```tsx
<UnderLine startFrame={15} color={COLORS.PRIMARY} width={300} />
```

---

## TypeWriter

타이핑 효과 텍스트.

| prop | 타입 | 필수 | 기본값 | 설명 |
|------|------|:----:|--------|------|
| text | string | ✅ | — | 표시할 텍스트 |
| startFrame | number | ❌ | 0 | 타이핑 시작 프레임 |
| speed | number | ❌ | 2 | 글자당 프레임 수 (낮을수록 빠름) |
| showCursor | boolean | ❌ | false | 커서 표시 여부 |

```tsx
<TypeWriter
  text="능력 은폐 시도"
  startFrame={183}
  speed={3}
  style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_XL }}
/>
```
