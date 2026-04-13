/**
 * [Section Global Context]
 * 주제: 앤트로픽과 미국 정부 사이의 갈등과 아이러니한 공생 관계
 * 내용 요약: 앤트로픽의 군사적 사용 반대 및 제한 조건 제시와 그에 따른 미국 정부의 '공급망 위험 기업' 지정 및 소송 사태를 다룹니다. 하지만 이러한 법적, 정치적 분쟁 중에도 대체 불가능한 클로드의 성능 때문에 전쟁터에서 계속 사용되고 있는 모순적인 상황을 시각화합니다.
 * 
 * ## 2. 섹션 개요
 * 
 * | 항목      | 값 |
 * | --------- | --- |
 * | 총 길이   | 43125ms |
 * | 총 프레임 | 1294f |
 * | Scene 수  | 5 |
 * 
 * - 반드시 `src/constants/theme.ts`에 명시된 디자인 토큰을 확인하고 색상을 파악하세요.
 *
 * ### 🚨 페르소나 및 디자인 가이드
 * [역할] 당신은 유튜브 채널을 운영하는 트렌디한 IT 기업의 수석 UI/UX 모션그래픽 전문가이자 'React Remotion 개발자'입니다.
 * [채널명] 나만빼고 AI
 * [채널설명] AI 트렌드를 따라가고 싶은 일반인들을 위해 친근하게 스케치 느낌의 영상으로 이해하기 쉽게 설명하는 채널
 * [영상 분위기]
 * 매우중요: 이미 import된 컴포넌트(Wobble, DrawLine, PaperTexture 등)를 적극 활용해 스케치 느낌을 내지만, 주석 설명에 따라 깔끔하게 구현합니다.
 */
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { Wobble } from '../../../shared-components/Wobble';
import { DrawLine } from '../../../shared-components/DrawLine';
import { PaperTexture } from '../../../shared-components/PaperTexture';

/**
 * [Scene 1]
 * - 원본 텍스트: 근데 여기서 반전이 있어요. 사실 클로드를 만든 앤트로픽은 미국이 클로드를 군사적 목적으로 쓰는걸 원하지 않았습니다.
 * - 단어 등장 프레임: { "근데": 0f, "여기서": 8f, "반전이": 19f, "있어요.": 31f, "사실": 47f, "클로드를": 59f, "만든": 83f, "앤트로픽은": 95f, "미국이": 128f, "클로드를": 145f, "군사적": 160f, "목적으로": 171f, "쓰는걸": 185f, "원하지": 194f, "않았습니다.": 207f }
 * - 타임라인: 0f 부터 시작 (총 230f 지속)
 * - 비주얼 컨셉: `BG_DARK` 배경 중앙을 기준으로 앤트로픽 로고와 미국 국방부 로고가 대립하는 레이아웃을 구성합니다. 앤트로픽 로고 옆에 'No Military Use'라는 텍스트가 `PRIMARY_BOLD` 색상의 엑스표(`X`)와 함께 강하게 나타나며 화면에 긴장감 있는 진동 효과를 줍니다.
 * - 필요한 그림(svg) 컴포넌트: AnthropicVsPentagon (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <BrandLogo type="AnthropicVsPentagon" progress={p} />
 * - 변경 이유: BrandLogo 공통 컴포넌트로 통합
 * ─────────────────────────────────────────────
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2]
 * - 원본 텍스트: 앤트로픽은 펜타곤에 클로드 사용 조건을 달았는데 이런 거에요. "클로드를 자율 무기에 쓰는 건 안 됩니다. 미국인 대량 감시에도 안 됩니다."
 * - 단어 등장 프레임: { "앤트로픽은": 230f, "펜타곤에": 250f, "클로드": 266f, "사용": 279f, "조건을": 289f, "달았는데": 300f, "이런": 318f, "거에요.": 326f, ""클로드를": 350f, "자율": 371f, "무기에": 384f, "쓰는": 396f, "건": 407f, "안": 412f, "됩니다.": 417f, "미국인": 439f, "대량": 453f, "감시에도": 467f, "안": 484f, "됩니다."": 490f }
 * - 타임라인: 230f 부터 시작 (총 281f 지속)
 * - 비주얼 컨셉: `BG_BASE` 배경 위에 정갈한 '사용 조건 계약서' UI가 스크롤되듯 나타납니다. '자율 무기 사용 금지', '대량 감시 금지' 두 조항에 `SECONDARY` 색상의 굵은 하이라이트가 그어지며 강조됩니다. 계약서 주변으로 `STROKE_INK`로 그려진 법적 보호막 아이콘이 리드미컬하게 회전합니다.
 * - 필요한 그림(svg) 컴포넌트: TermsOfUse (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <StatedDocument type="terms" progress={p} />
 * - 변경 이유: StatedDocument 공통 컴포넌트로 통합
 * ─────────────────────────────────────────────
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3]
 * - 원본 텍스트: 그러자 트럼프 행정부가 앤트로픽을 공급망 위험 기업으로 지정해버렸어요. 이 지정은 보통 외국 적대국 기업한테나 쓰는 표현인데 말이 안되는거죠. 당연히 앤트로픽은 즉각 소송을 냈습니다.
 * - 단어 등장 프레임: { "그러자": 511f, "트럼프": 520f, "행정부가": 538f, "앤트로픽을": 558f, "공급망": 579f, "위험": 592f, "기업으로": 601f, "지정해버렸어요.": 619f, "이": 659f, "지정은": 664f, "보통": 688f, "외국": 689f, "적대국": 701f, "기업한테나": 716f, "쓰는": 744f, "표현인데": 750f, "말이": 770f, "안되는거죠.": 780f, "당연히": 794f, "앤트로픽은": 865f, "즉각": 881f, "소송을": 887f, "냈습니다.": 897f }
 * - 타임라인: 511f 부터 시작 (총 406f 지속)
 * - 비주얼 컨셉: `BG_MUTED` 배경으로 전환되며 빨간색(`STATE_ERROR_FG`) 'RISK' 도장이 화면 중앙을 강하게 타격합니다. 앤트로픽 로고를 향해 공격적인 붉은색 화살표들이 마구 쏟아지는 배경 속에서, 화면 하단에는 법원을 상징하는 망치 아이콘이 나타나며 소송의 시작을 알리는 집중선 효과를 줍니다.
 * - 필요한 그림(svg) 컴포넌트: LawsuitImpact (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <StatedDocument type="lawsuit" progress={p} />
 * - 변경 이유: StatedDocument 공통 컴포넌트로 통합
 * ─────────────────────────────────────────────
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4]
 * - 원본 텍스트: 근데 진짜 아이러니한 게 있어요. 그 싸움이 한창인 와중에도, 클로드를 전쟁터에서 계속 돌리고 있었습니다.
 * - 단어 등장 프레임: { "근데": 917f, "진짜": 937f, "아이러니한": 939f, "게": 961f, "있어요.": 966f, "그": 987f, "싸움이": 991f, "한창인": 1006f, "와중에도,": 1022f, "클로드를": 1040f, "전쟁터에서": 1058f, "계속": 1082f, "돌리고": 1092f, "있었습니다.": 1107f }
 * - 타임라인: 917f 부터 시작 (총 222f 지속)
 * - 비주얼 컨셉: 화면이 상하로 이중 노출됩니다. 상단에서는 여전히 분쟁 중인 법정 다이어그램이 빨간색 톤으로 깜빡이고, 하단에서는 실제 연산이 이루어지는 관제 UI가 `SECONDARY` 톤으로 평온하게 작동합니다. 두 공간을 가로지르는 아이러니한 데이터 라인들을 캔버스로 화려하게 수놓습니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5]
 * - 원본 텍스트: 쫓아내고 싶은데 당장 대체할 게 없으니까, 일단 쓰고 보는 거에요.
 * - 단어 등장 프레임: { "쫓아내고": 1139f, "싶은데": 1169f, "당장": 1174f, "대체할": 1183f, "게": 1197f, "없으니까,": 1202f, "일단": 1222f, "쓰고": 1233f, "보는": 1243f, "거에요.": 1253f }
 * - 타임라인: 1139f 부터 시작 (총 155f 지속)
 * - 비주얼 컨셉: `BG_BASE` 배경 중앙에 'No Alternative' 문구가 거대하게 부각됩니다. 주변의 회색빛 데이터 후보들이 부서져 사라지는 동안, 클로드를 상징하는 `SECONDARY_BOLD` 빛의 구체가 시스템 엔진의 핵심부로 꽉 끼워 맞춰지는 무게감 있는 애니메이션을 보여줍니다.
 * - 필요한 그림(svg) 컴포넌트: UniquePosition (SVG)
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={230}>
        <Scene1 />
      </Sequence>
      <Sequence from={230} durationInFrames={281}>
        <Scene2 />
      </Sequence>
      <Sequence from={511} durationInFrames={406}>
        <Scene3 />
      </Sequence>
      <Sequence from={917} durationInFrames={222}>
        <Scene4 />
      </Sequence>
      <Sequence from={1139} durationInFrames={155}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
