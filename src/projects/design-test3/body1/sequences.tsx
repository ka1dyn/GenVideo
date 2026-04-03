import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, FONTS, ANIMATION, Z, EFFECTS, SPACING } from "../theme";
import { BackgroundGrid } from "../components/BackgroundGrid";
import { GlassCard } from "../components/GlassCard";
import { AISphere } from "../components/AISphere";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 그렇다면 실제 현장에서는 어떤 변화가 일어나고 있을까요?
 * 비주얼 컨셉: 흐릿한 오피스 배경(Abstract Geometry) 위에 커다란 의문문 텍스트 등장.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 40f): 배경의 기하학적 도형들이 BG_SURFACE 톤으로 부드럽게 움직이며 "어떤 변화?" 텍스트가 ANIMATION.SPRING_GENTLE로 진입.
 *  - 단계1 (40f ~ 150f): 텍스트 주변으로 옅은 파란색(PRIMARY_DIM) 동심원이 퍼져나가며 질문의 임팩트 전달.
 *  - 퇴장 (150f ~ 끝): 텍스트가 작아지며 화면 상단으로 이동하여 다음 씬의 헤더 역할 수행. (슬라이드 퇴장 없음)
 */
const Scene1: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 막연한 기대감이 아닌, 실제 데이터를 바탕으로 AI 도입의 극적인 효과를 살펴보겠습니다.
 * 비주얼 컨셉: 'Expectation'이라는 텍스트가 사라지고, 그 아래로 정갈한 데이터 테이블(Table)이 펼쳐짐.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): EFFECTS.GLASS_BG가 적용된 커다란 데이터 그리드가 ANIMATION.ENTER_Y_MD 위치에서 슬라이드 업.
 *  - 단계1 (60f ~ 350f): 그리드 내부에 FONTS.MONO 스타일의 숫자 데이터들이 빠르게 로딩되는 Stagger 애니메이션.
 *  - 퇴장 (350f ~ 끝): 그리드가 고정된 상태에서 내부의 특정 수치가 강조되며 전환.
 */
const Scene2: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 실제로 최근 한 연구에 따르면,
 * 비주얼 컨셉: 화면 우측 상단에 'RESEARCH REPORT 2024' 배지가 SPRING_BOUNCY로 등장.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 50f): 배지가 회전하며 등장(SCALE_ENTER->1).
 *  - 단계1 (50f ~ 150f): 배지에서 옅은 GLOW_SM이 반짝이며 신뢰성 부여.
 *  - 퇴장 (150f ~ 끝): 배지가 작아지며 구석으로 귀속.
 */
const Scene3: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: AI 코딩 어시스턴트를 도입한 조직의 개발 생산성은 무려 55%나 향상되었습니다.
 * 비주얼 컨셉: 거대한 게이지 차트(Gauge Chart)가 0에서 55%까지 역동적으로 차오르는 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 구부러진 프로그레스 바가 COLORS.PRIMARY 색상으로 밑그림이 그려짐.
 *  - 단계1 (60f ~ 250f): interpolate와 spring을 결합하여 숫자가 0에서 55까지 카운트업. 게이지 바도 이에 맞춰 부드럽게 충전됨.
 *  - 퇴장 (250f ~ 끝): 55% 숫자가 GLOW_TEXT_LG와 함께 커졌다가 고정.
 */
const Scene4: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 반복적인 보일러플레이트 작성 시간이 획기적으로 줄어든 덕분이죠.
 * 비주얼 컨셉: 모래시계 아이콘 또는 시간 막대 그래프가 급격히 줄어드는 시각화.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 50f): 'Boilerplate Time'이라 적힌 긴 막대 바(COLORS.DATA_3)가 화면 중앙에 수평으로 등장.
 *  - 단계1 (50f ~ 240f): 막대 바의 오른쪽 끝부분이 칼로 잘려나가듯 사라지며 길이가 1/5 수준으로 축소됨.
 *  - 퇴장 (240f ~ 끝): 정적인 상태 유지.
 */
const Scene5: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 개발자들의 업무 시간 분배도 완전히 달라졌습니다.
 * 비주얼 컨셉: 'Before'와 'After'를 비교하는 파이 차트(Pie Chart) 두 개가 나란히 배치됨.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 70f): 좌(Before), 우(After) 두 영역으로 화면이 분할되며 EFFECTS.FADE_RIGHT 레이어가 깔림.
 *  - 단계1 (70f ~ 250f): 'Before' 영역의 불균형한 파이 조각들이 'After' 영역에서 이상적인 비율로 재조합됨.
 *  - 퇴장 (250f ~ 끝): 정적 유지.
 */
const Scene6: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 단순 반복 작업에 쏟는 시간은 80% 감소한 반면,
 * 비주얼 컨셉: 'Repetitive Tasks' 영역이 붉은색(NEGATIVE)에서 회색(TEXT_DISABLED)으로 변하며 작게 쪼그라듦.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 40f): 큰 큐브 블록이 화면 중앙에 배치됨.
 *  - 단계1 (40f ~ 180f): 큐브의 Opacity가 1에서 0.3으로, Scale이 1에서 0.2로 SPRING_HEAVY하게 압축됨. "80% DOWN" 텍스트 레이블 부착.
 *  - 퇴장 (180f ~ 끝): 정적 유지.
 */
const Scene7: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 창의적인 아키텍처 설계와 비즈니스 로직 고민에 쏟는 시간은 3배 이상 늘어났습니다.
 * 비주얼 컨셉: 'Creative Work' 영역이 에메랄드(SECONDARY) 색상으로 수직으로 솟구쳐 오르는 바 그래프 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 바닥에서부터 ANIMATION.STAGGER_LG 패턴으로 3개의 블록이 위로 쌓임.
 *  - 단계1 (60f ~ 300f): 쌓인 블록들이 PRIMARY_GLOW 효과를 내며 "3X INCREASE" 문구 출력. 주변에 창의성을 상징하는 은은한 파티클 효과.
 *  - 퇴장 (300f ~ 끝): 정적 유지.
 */
const Scene8: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: AI 도입 전과 후를 비교해 볼까요?
 * 비주얼 컨셉: 화면 정중앙에 수직 절취선(Splitter)이 생기며 좌우 대비 준비.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 40f): 얇은 COLORS.BORDER_STRONG 선이 위에서 아래로 빠르게 그려짐.
 *  - 단계1 (40f ~ 140f): 좌측엔 'OLD', 우측엔 'NEW' 텍스트가 ANIMATION.ENTER_X_SM 간격으로 등장.
 *  - 퇴장 (140f ~ 끝): 정적 유지.
 */
const Scene9: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 예전에는 공식 문서를 뒤지며 수동으로 타이핑하며 밤을 새우던 작업들이,
 * 비주얼 컨셉: 좌측(OLD) 섹션에서 수많은 종이 문서가 흩날리고 어두운 남색(BG_VOID) 톤의 레이아웃.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 좌측 절반 공간이 BG_VOID로 어두워지며 무거운 분위기 연출.
 *  - 단계1 (60f ~ 260f): 아이콘 형식의 문서들이 어지럽게 떠다니고, 깜빡이는 타이핑 커서가 매우 느리게 이동함.
 *  - 퇴장 (260f ~ 끝): 정적 유지.
 */
const Scene10: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 이제는 AI의 똑똑한 제안을 검토하고 승인하는 효율적인 프로세스로 전환되었습니다.
 * 비주얼 컨셉: 우측(NEW) 섹션에서 깨끗한 AI 카드 UI가 등장하고 'Check' 아이콘이 기분 좋게 팝업됨.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 우측 절반 공간에 BG_BASE 위로 SHADOW_LG가 적용된 AI 추천 카드가 ANIMATION.SCALE_ENTER 진입.
 *  - 단계1 (60f ~ 300f): 카드 위에 녹색 체크 표시(COLORS.POSITIVE)가 SPRING_BOUNCY로 크게 나타났다 정착됨. "Ready to Merge" 툴팁 등장.
 *  - 퇴장 (300f ~ 끝): 정적 유지.
 */
const Scene11: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 버그 발생률 또한 눈에 띄게 줄었습니다.
 * 비주얼 컨셉: 하향 곡선(Line Chart)이 절벽처럼 떨어지며 버그 수치의 감소를 극적으로 표현.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 40f): x, y 축이 그려지고 ACCENT 색상의 포인트가 높은 곳에 위치.
 *  - 단계1 (40f ~ 180f): 포인트가 우측으로 가며 선이 그려지다 갑자기 바닥까지 급강하. 주변에 "Bug Reports: -92%" 텍스트 부상.
 *  - 퇴장 (180f ~ 끝): 정적 유지.
 */
const Scene12: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 실시간 정적 분석과 코드 리뷰를 통해 배포 전 치명적인 오류의 90% 이상을 사전에 차단하며
 * 비주얼 컨셉: 코드가 지나가는 통로에 촘촘한 '레이저 센서(Sensor)'가 배치되어 빨간색 오류들을 튕겨내는 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): COLORS.PRIMARY 광선이 화면을 위아래로 훑는 스캐닝 효과.
 *  - 단계1 (60f ~ 350f): 'Fatal Error'라 적힌 빨간색 카드들이 다가오다 센서에 막혀 뒤로 튕겨 나감. SECONDARY_DIM 색상의 방어막 효과 펄스 생성.
 *  - 퇴장 (350f ~ 끝): 정적 유지.
 */
const Scene13: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 서비스의 안정성을 크게 높여주고 있습니다.
 * 비주얼 컨셉: 'Stability'라는 단어를 단단하게 지탱하는 구조물 위에 성벽 아이콘이 완성되는 안심 연출.
 * In-Scene Animation 기획:
 *  - 진입 (0f ~ 60f): 하단에서 상단으로 무거운 블록들이 조립되며 "안정성" 텍스트를 받침.
 *  - 단계1 (60f ~ 200f): EFFECTS.GLOW_LG가 적용된 황금색 리본이나 배지가 중앙에 나타나고 주변에 은은한 오라 발산.
 *  - 퇴장 (200f ~ 끝): 정적 유지.
 */
const Scene14: React.FC = () => {
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      {/* Content implementation here */}
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={188}>
        <Scene1 />
      </Sequence>
      <Sequence from={188} durationInFrames={399}>
        <Scene2 />
      </Sequence>
      <Sequence from={587} durationInFrames={189}>
        <Scene3 />
      </Sequence>
      <Sequence from={776} durationInFrames={357}>
        <Scene4 />
      </Sequence>
      <Sequence from={1133} durationInFrames={297}>
        <Scene5 />
      </Sequence>
      <Sequence from={1430} durationInFrames={297}>
        <Scene6 />
      </Sequence>
      <Sequence from={1727} durationInFrames={228}>
        <Scene7 />
      </Sequence>
      <Sequence from={1955} durationInFrames={343}>
        <Scene8 />
      </Sequence>
      <Sequence from={2298} durationInFrames={180}>
        <Scene9 />
      </Sequence>
      <Sequence from={2478} durationInFrames={301}>
        <Scene10 />
      </Sequence>
      <Sequence from={2779} durationInFrames={359}>
        <Scene11 />
      </Sequence>
      <Sequence from={3138} durationInFrames={228}>
        <Scene12 />
      </Sequence>
      <Sequence from={3366} durationInFrames={416}>
        <Scene13 />
      </Sequence>
      <Sequence from={3782} durationInFrames={246}>
        <Scene14 />
      </Sequence>
    </AbsoluteFill>
  );
};
