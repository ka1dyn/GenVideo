/**
 * [Section Global Context]
 * 주제: 클로드 AI의 구체적인 전쟁터 데이터 분석 및 의사결정 보조 역할
 * 내용 요약: 클로드가 160개가 넘는 실시간 정보 채널을 분석하여 수상한 물체를 포착하고, 과거 데이터와 교차 검증하여 표적 후보를 생성하는 과정을 설명합니다. 또한 분석관과의 대화형 인터페이스를 통해 전술 브리핑을 제공하며, 인간의 결정을 돕는 100배 이상의 효율성을 시각화합니다.
 * 
 * ## 2. 섹션 개요
 * 
 * | 항목      | 값 |
 * | --------- | --- |
 * | 총 길이   | 75000ms |
 * | 총 프레임 | 2250f |
 * | Scene 수  | 9 |
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
 * - 원본 텍스트: 자, 그럼 이제 클로드가 거기서 뭘 하는 건지 한번 알아봅시다.
 * - 단어 등장 프레임: { "자,": 0f, "그럼": 5f, "이제": 12f, "클로드가": 20f, "거기서": 35f, "뭘": 46f, "하는": 50f, "건지": 58f, "한번": 65f, "알아봅시다.": 73f }
 * - 타임라인: 0f 부터 시작 (총 101f 지속)
 * - 비주얼 컨셉: `BG_DARK` 배경 상단에 'Claude's Role'이라는 타이틀이 `PRIMARY` 색상으로 나타납니다. 화면 중앙에는 클로드의 로고가 배치되고, 그 주변으로 데이터의 흐름을 상징하는 가느다란 `STROKE_SUBTLE` 선들이 리드미컬하게 요동치며 시스템의 활성화를 표현합니다.
 * - 필요한 그림(svg) 컴포넌트: ClaudeLogo (SVG)
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
 * - 원본 텍스트: 메이븐이 데이터를 끌어오면, 클로드가 그걸 일단 분석하고 봅니다.
 * - 단어 등장 프레임: { "메이븐이": 101f, "데이터를": 130f, "끌어오면,": 159f, "클로드가": 190f, "그걸": 207f, "일단": 215f, "분석하고": 224f, "봅니다.": 241f }
 * - 타임라인: 101f 부터 시작 (총 161f 지속)
 * - 비주얼 컨셉: `BG_BASE` 배경에 'MAVEN' 카드와 'CLAUDE' 카드가 좌우에 배치됩니다. 메이븐 카드에서 쏟아져 나온 수많은 데이터 파티클(캔버스)들이 클로드 카드로 빨려 들어가는 흡수 애니메이션을 구현합니다. 클로드 카드는 데이터를 받을수록 `SECONDARY_SOFT` 색상의 파동을 일으키며 분석 연산이 진행 중임을 보여줍니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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
 * - 원본 텍스트: 위성 사진, 드론 영상, 레이더, 신호 정보까지. 160개가 넘는 정보 채널이 실시간으로 들어오고, 그 데이터를 보면서 클로드는 이런 걸 해요.
 * - 단어 등장 프레임: { "위성": 262f, "사진,": 296f, "드론": 300f, "영상,": 304f, "레이더,": 320f, "신호": 344f, "정보까지.": 382f, "160개가": 397f, "넘는": 416f, "정보": 424f, "채널이": 436f, "실시간으로": 453f, "들어오고,": 483f, "그": 512f, "데이터를": 514f, "보면서": 527f, "클로드는": 539f, "이런": 554f, "걸": 562f, "해요.": 566f }
 * - 타임라인: 262f 부터 시작 (총 317f 지속)
 * - 비주얼 컨셉: 화면이 4분할 원형 대시보드 레이아웃으로 전환됩니다. 위성, 드론, 레이더, 신호 각 섹션의 데이터 게이지가 `PRIMARY_MID` 색상으로 실시간 상승하며 '160+ Channels'라는 텍스트가 중앙에서 회전합니다. 모든 정보가 중앙의 클로드 분석 노드로 집약되는 유기적인 연결망을 시각화합니다.
 * - 필요한 그림(svg) 컴포넌트: DataDashboard (SVG)
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
 * - 원본 텍스트: 수상한 차량 한 대를 드론이 포착했다고 해볼게요.
 * - 단어 등장 프레임: { "수상한": 579f, "차량": 596f, "한": 607f, "대를": 620f, "드론이": 624f, "포착했다고": 641f, "해볼게요.": 671f }
 * - 타임라인: 579f 부터 시작 (총 121f 지속)
 * - 비주얼 컨셉: 어두운 적외선 카메라 시점으로 화면이 바뀝니다. 화면 중앙의 타겟팅 십자선이 움직이는 차량 형상을 쫓으며 `STATE_WARN_FG` 색상의 'Tracking...' 상태 메시지를 출력합니다. 캔버스를 활용하여 화면에 미세한 전자 노이즈와 스캐닝 라인 효과를 주어 현장감을 살립니다.
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
 * - 원본 텍스트: 클로드가 그 차량의 이동 경로를 뒤지다가, 어제 특정 통신 신호가 잡힌 위치랑 겹친 거에요. 심지어 그 근처에서 올라온 소셜미디어 게시물도 있다? 이런 식으로 판단해서 표적 후보로 올려버리는겁니다.
 * - 단어 등장 프레임: { "클로드가": 700f, "그": 720f, "차량의": 732f, "이동": 740f, "경로를": 753f, "뒤지다가,": 766f, "어제": 786f, "특정": 797f, "통신": 812f, "신호가": 817f, "잡힌": 833f, "위치랑": 842f, "겹친": 858f, "거에요.": 868f, "심지어": 895f, "그": 914f, "근처에서": 920f, "올라온": 946f, "소셜미디어": 964f, "게시물도": 999f, "있다?": 1021f, "이런": 1040f, "식으로": 1058f, "판단해서": 1062f, "표적": 1079f, "후보로": 1087f, "올려버리는겁니다.": 1100f }
 * - 타임라인: 700f 부터 시작 (총 421f 지속)
 * - 비주얼 컨셉: 화면이 3단 레이어로 나뉘어 이동 경로, 통신 데이터, 소셜미디어가 각각 시각화됩니다. 세 데이터 레이어가 하나로 겹치는 순간 `PRIMARY_BOLD` 색상의 'MATCH' 경고음과 함께 붉은색 표적 카드가 생성됩니다. 캔버스의 연결 선들이 모든 정보를 표적으로 수렴시키는 과정을 속도감 있게 연출합니다.
 * - 필요한 그림(svg) 컴포넌트: IntelligenceCrossCheck (SVG)
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

/**
 * [Scene 6]
 * - 원본 텍스트: 그리고 이렇게 뽑힌 표적들에 대해서 리스트를 만들어요. GPS 좌표, 추천 무기, 그리고 심지어 법적 정당화 문서까지 자동으로요.
 * - 단어 등장 프레임: { "그리고": 1121f, "이렇게": 1157f, "뽑힌": 1173f, "표적들에": 1183f, "대해서": 1203f, "리스트를": 1221f, "만들어요.": 1239f, "GPS": 1267f, "좌표,": 1272f, "추천": 1297f, "무기,": 1299f, "그리고": 1314f, "심지어": 1331f, "법적": 1348f, "정당화": 1359f, "문서까지": 1378f, "자동으로요.": 1399f }
 * - 타임라인: 1121f 부터 시작 (총 316f 지속)
 * - 비주얼 컨셉: `BG_BASE` 위로 표적 분석 리스트 카드가 아래로 차례차례 펼쳐집니다. GPS 좌표, 무기 추천, 법적 근거 섹션에 `PRIMARY_SOFT` 색상의 하이라이트가 그어지며 내용이 채워집니다. 마지막에는 'Automatic Generated'라는 공식 승인 도장이 `STATE_ERROR_FG` 색상으로 찍히며 마무리됩니다.
 * - 필요한 그림(svg) 컴포넌트: TargetReport (SVG)
 */
const Scene6: React.FC = () => {
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
 * [Scene 7]
 * - 원본 텍스트: 분석관이 말로 "이 지역 위협 요소 요약해줘" 하면, 바로 전술 브리핑을 뽑아줘요. 전쟁터에서 AI한테 말로 보고서를 받는 겁니다.
 * - 단어 등장 프레임: { "분석관이": 1437f, "말로": 1464f, ""이": 1467f, "지역": 1472f, "위협": 1482f, "요소": 1492f, "요약해줘"": 1505f, "하면,": 1523f, "바로": 1533f, "전술": 1543f, "브리핑을": 1556f, "뽑아줘요.": 1573f, "전쟁터에서": 1602f, "AI한테": 1634f, "말로": 1646f, "보고서를": 1657f, "받는": 1679f, "겁니다.": 1691f }
 * - 타임라인: 1437f 부터 시작 (총 279f 지속)
 * - 비주얼 컨셉: 채팅 스테이션 UI가 전면에 나타납니다. 분석관의 음성 질문이 파형 애니메이션과 함께 나타나고, 클로드의 정밀 브리핑 리포트가 `FONTS.MONO` 폰트로 매끄럽게 출력됩니다. 주변에는 전술 지도 레이아웃이 `SECONDARY_LIGHT` 톤으로 부드럽게 깔려 관제 센터의 분위기를 조성합니다.
 * - 필요한 그림(svg) 컴포넌트: ChatBriefing (SVG)
 */
const Scene7: React.FC = () => {
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
 * [Scene 8]
 * - 원본 텍스트: 그래도 아직 마지막 결정은 사람이 내리고 AI는 그 직전 단계까지만 관여한다고 합니다.
 * - 단어 등장 프레임: { "그래도": 1716f, "아직": 1723f, "마지막": 1739f, "결정은": 1802f, "사람이": 1812f, "내리고": 1825f, "AI는": 1835f, "그": 1842f, "직전": 1847f, "단계까지만": 1853f, "관여한다고": 1873f, "합니다.": 1892f }
 * - 타임라인: 1716f 부터 시작 (총 196f 지속)
 * - 비주얼 컨셉: `BG_DARK` 배경 중앙에 'Human'과 'AI' 아이콘이 대비 구조로 놓입니다. 'Human' 아이콘에만 `PRIMARY` 색상의 빛나는 'DECISION' 배지가 부여되고, AI는 그 아래를 튼튼하게 받치는 다이어그램 구조를 보여줍니다. 인간의 최종 판단권을 강조하기 위해 화면 중앙으로 강력한 집중선 효과를 줍니다.
 * - 필요한 그림(svg) 컴포넌트: HumanCenteredAI (SVG)
 */
const Scene8: React.FC = () => {
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
 * [Scene 9]
 * - 원본 텍스트: 과거 전쟁에서는 이 작업에 분석관 2,000명이 필요했는데, 지금은 겨우 20명이에요. AI 덕분에 효율이 100배 뻥튀기 된거죠.
 * - 단어 등장 프레임: { "과거": 1912f, "전쟁에서는": 1922f, "이": 1952f, "작업에": 1962f, "분석관": 1975f, "2,000명이": 1992f, "필요했는데,": 2026f, "지금은": 2057f, "겨우": 2074f, "20명이에요.": 2081f, "AI": 2114f, "덕분에": 2119f, "효율이": 2138f, "100배": 2156f, "뻥튀기": 2182f, "된거죠.": 2201f }
 * - 타임라인: 1912f 부터 시작 (총 338f 지속)
 * - 비주얼 컨셉: 과거(2000명)와 현재(20명)의 인력 규모를 상징하는 도트 맵 비교 다이어그램이 나타납니다. 왼쪽의 빽빽한 도트들이 오른쪽으로 넘어가며 하나로 합쳐져 거대한 '100x Efficiency' 숫자로 변하는 모핑 애니메이션을 구현합니다. `SECONDARY_BOLD` 색상의 상승 화살표가 화면을 가득 채웁니다.
 * - 필요한 그림(svg) 컴포넌트: EfficiencyComparison (SVG)
 */
const Scene9: React.FC = () => {
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
      <Sequence from={0} durationInFrames={101}>
        <Scene1 />
      </Sequence>
      <Sequence from={101} durationInFrames={161}>
        <Scene2 />
      </Sequence>
      <Sequence from={262} durationInFrames={317}>
        <Scene3 />
      </Sequence>
      <Sequence from={579} durationInFrames={121}>
        <Scene4 />
      </Sequence>
      <Sequence from={700} durationInFrames={421}>
        <Scene5 />
      </Sequence>
      <Sequence from={1121} durationInFrames={316}>
        <Scene6 />
      </Sequence>
      <Sequence from={1437} durationInFrames={279}>
        <Scene7 />
      </Sequence>
      <Sequence from={1716} durationInFrames={196}>
        <Scene8 />
      </Sequence>
      <Sequence from={1912} durationInFrames={338}>
        <Scene9 />
      </Sequence>
    </AbsoluteFill>
  );
};
