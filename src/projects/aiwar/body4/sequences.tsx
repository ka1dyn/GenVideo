/**
 * [Section Global Context]
 * 주제: AI 전쟁 시스템의 정확도 한계와 비극적인 오작동 사례, 그리고 데이터 오염의 위험성
 * 내용 요약: 프로젝트 메이븐의 실질 정확도가 사람보다 현저히 낮은 60%에 불과함을 지적하고, 이란 초등학교 오폭 사건이라는 비극적인 사례를 통해 AI 개입 가능성을 탐구합니다. 또한 학습 데이터 오염(Data Poisoning)을 통한 새로운 형태의 전쟁 위협을 경고합니다.
 * 
 * ## 2. 섹션 개요
 * 
 * | 항목      | 값 |
 * | --------- | --- |
 * | 총 길이   | 110500ms |
 * | 총 프레임 | 3315f |
 * | Scene 수  | 16 |
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
 * - 원본 텍스트: 자, 일단 AI를 쓰는건 알겠는데, 과연 이 AI를 어디까지 믿을 수 있을까요? 한번 테스트를 해봤습니다.
 * - 단어 등장 프레임: { "자,": 0f, "일단": 8f, "AI를": 17f, "쓰는건": 26f, "알겠는데,": 37f, "과연": 66f, "이": 76f, "AI를": 85f, "어디까지": 90f, "믿을": 111f, "수": 121f, "있을까요?": 127f, "한번": 155f, "테스트를": 166f, "해봤습니다.": 188f }
 * - 타임라인: 0f 부터 시작 (총 221f 지속)
 * - 비주얼 컨셉: `BG_DARK` 배경 중앙에 'Reliability Test'라는 타이틀이 `PRIMARY` 색상으로 깜빡이며 나타납니다. 화면 하단에는 '믿을 수 있는가?'라는 텍스트가 `TEXT_ON_DARK` 색상으로 부드럽게 페이드인 됩니다. 배경에는 캔버스를 활용하여 연산 중임을 나타내는 추상적인 기하학적 파티클들이 흐릅니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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
 * - 원본 텍스트: 메이븐의 정확도는 어느정도일까요? 약 60%예요. 사람이 분석했을 때는 같은 조건에서 84%고요. 생각보다는 정확하다고요?
 * - 단어 등장 프레임: { "메이븐의": 221f, "정확도는": 250f, "어느정도일까요?": 260f, "약": 302f, "60%예요.": 320f, "사람이": 352f, "분석했을": 374f, "때는": 391f, "같은": 402f, "조건에서": 413f, "84%고요.": 435f, "생각보다는": 467f, "정확하다고요?": 491f }
 * - 타임라인: 221f 부터 시작 (총 306f 지속)
 * - 비주얼 컨셉: '60% (AI)'와 '84% (Human)'라는 두 숫자가 화면 좌우에 거대하게 배치되어 대비를 이룹니다. 60% 숫자는 `STATE_WARN_FG` 색상으로 불안정하게 흔들리고, 84% 숫자는 `SECONDARY_BOLD` 색상으로 견고하게 유지됩니다. 두 수치를 비교하는 막대 그래프 다이어그램이 중앙에서 생성됩니다.
 * - 필요한 그림(svg) 컴포넌트: AccuracyComparison (SVG)
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
 * - 원본 텍스트: 이 얘기를 듣고도 그렇게 생각할 수는 없을 겁니다.
 * - 단어 등장 프레임: { "이": 527f, "얘기를": 532f, "듣고도": 551f, "그렇게": 561f, "생각할": 575f, "수는": 591f, "없을": 599f, "겁니다.": 609f }
 * - 타임라인: 527f 부터 시작 (총 102f 지속)
 * - 비주얼 컨셉: `BG_DARKEST` 배경 위로 '60%'라는 수치 데이터들이 무수히 쏟아지며 화면이 어두워집니다. 텍스트는 `TEXT_DISABLED` 색상으로 흐릿해지며, 시청자에게 생각의 여지를 남기는 고요하고 웅장한 분위기를 연출합니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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
 * - 원본 텍스트: 그 날은 이란 전쟁이 시작된 첫날, 2월 28일 아침이었습니다.
 * - 단어 등장 프레임: { "그": 629f, "날은": 650f, "이란": 657f, "전쟁이": 664f, "시작된": 685f, "첫날,": 707f, "2월": 721f, "28일": 732f, "아침이었습니다.": 748f }
 * - 타임라인: 629f 부터 시작 (총 164f 지속)
 * - 비주얼 컨셉: `BG_MUTED` 배경 위에 '2월 28일 아침'이라는 텍스트가 `FONTS.HANDWRITING` 스타일로 천천히 기록됩니다. 화면 한편에는 떠오르는 태양을 상징하는 부드러운 `PRIMARY_LIGHT` 원형 광원이 페이드인 되며 평화로운 일상을 시사합니다.
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
 * - 원본 텍스트: 이란 남부 미납이라는 도시의 한 초등학교 앞, 학부모들이 평소처럼 아이들을 학교에 데려다주고 있을 때였어요.
 * - 단어 등장 프레임: { "이란": 793f, "남부": 803f, "미납이라는": 814f, "도시의": 839f, "한": 854f, "초등학교": 859f, "앞,": 879f, "학부모들이": 887f, "평소처럼": 908f, "아이들을": 925f, "학교에": 942f, "데려다주고": 958f, "있을": 976f, "때였어요.": 984f }
 * - 타임라인: 793f 부터 시작 (총 215f 지속)
 * - 비주얼 컨셉: 도시의 평화로운 등굣길 풍경을 상징하는 기하학적 도형(집, 학교 모양)들이 `SECONDARY_LIGHT` 색상으로 단정하게 배치됩니다. 아이들을 학교에 데려다주는 부모와 아이들을 상징하는 페어(Pair) 아이콘들이 리드미컬하게 움직이며 평범한 아침의 활기를 표현합니다.
 * - 필요한 그림(svg) 컴포넌트: TragedyTimeline (SVG)
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
 * - 원본 텍스트: 갑자기 미군 토마호크 미사일이 그 학교를 타격했습니다. 이 공격으로 168명이 사망했는데, 대부분이 7살에서 12살 사이의 아이들이었어요.
 * - 단어 등장 프레임: { "갑자기": 1008f, "미군": 1027f, "토마호크": 1033f, "미사일이": 1051f, "그": 1070f, "학교를": 1076f, "타격했습니다.": 1089f, "이": 1124f, "공격으로": 1131f, "168명이": 1160f, "사망했는데,": 1193f, "대부분이": 1228f, "7살에서": 1248f, "12살": 1265f, "사이의": 1279f, "아이들이었어요.": 1292f }
 * - 타임라인: 1008f 부터 시작 (총 323f 지속)
 * - 비주얼 컨셉: 화면 상단에서 강렬한 `STATE_ERROR_FG` 색상의 미사일 궤적(Canvas)이 학교 건물 아이콘을 향해 급격히 떨어집니다. 충돌하는 순간 화면 전체가 붉게 점멸하며 '168 Victims' 숫자가 캔버스의 확산 효과와 함께 웅장하고 무겁게 나타납니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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
 * - 원본 텍스트: 왜 이런 비극같은 일이 생겼을까요. 그 학교 바로 옆에 이란 혁명수비대 시설이 있었어요.
 * - 단어 등장 프레임: { "왜": 1331f, "이런": 1343f, "비극같은": 1347f, "일이": 1354f, "생겼을까요.": 1373f, "그": 1399f, "학교": 1403f, "바로": 1421f, "옆에": 1422f, "이란": 1431f, "혁명수비대": 1440f, "시설이": 1463f, "있었어요.": 1477f }
 * - 타임라인: 1331f 부터 시작 (총 173f 지속)
 * - 비주얼 컨셉: 화면에 두 개의 인접한 공간이 배치됩니다. 하나는 '학교', 하나는 '군사 시설'로 라벨링되며, 두 공간 사이의 모호한 경계를 `STROKE_STRONG` 색상의 점선으로 표현합니다. 왜 이런 일이 일어났는지에 대한 질문이 중앙에서 확대됩니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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
 * - 원본 텍스트: 근데 2013년에서 2016년 사이에 담장이 하나 세워지면서, 학교와 군사 시설이 분리됐거든요.
 * - 단어 등장 프레임: { "근데": 1504f, "2013년에서": 1520f, "2016년": 1546f, "사이에": 1569f, "담장이": 1584f, "하나": 1597f, "세워지면서,": 1606f, "학교와": 1631f, "군사": 1647f, "시설이": 1665f, "분리됐거든요.": 1672f }
 * - 타임라인: 1504f 부터 시작 (총 182f 지속)
 * - 비주얼 컨셉: 시간의 흐름에 따른 지도 변화를 보여줍니다. 2013년에서 2016년 사이, 두 공간을 완전히 분리하는 굵은 '담장' 라인이 `STROKE_INK` 색상으로 명확하게 그어집니다. 캔버스를 활용하여 연도 슬라이더가 움직임에 따라 분리되는 과정을 역동적으로 보여줍니다.
 * - 필요한 그림(svg) 컴포넌트: DataMismatch (SVG)
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
 * - 원본 텍스트: 미군 예비 조사 결과, 이 타격이 오래된 정보에 기반했을 가능성이 높은 것으로 나타났어요.
 * - 단어 등장 프레임: { "미군": 1686f, "예비": 1702f, "조사": 1727f, "결과,": 1739f, "이": 1758f, "타격이": 1774f, "오래된": 1791f, "정보에": 1803f, "기반했을": 1819f, "가능성이": 1831f, "높은": 1846f, "것으로": 1853f, "나타났어요.": 1864f }
 * - 타임라인: 1686f 부터 시작 (총 200f 지속)
 * - 비주얼 컨셉: 오래된 서류 뭉치 더미가 화면에 쏟아지고, 그중 하나의 문서에 'Old Information'이라는 경고 택이 붙습니다. 배경으로는 분리되기 전의 옛날 지도 레이어가 `OVERLAY_MED`로 겹쳐지며, 누락된 실재 정보를 시각화합니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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

/**
 * [Scene 10]
 * - 원본 텍스트: AI가 이 타격에 관여했는지는 지금도 조사 중이라 명확히 밝혀진 것은 아니지만, 솔직히 사람이 직접 판단해서 초등학교를 공격했을까요? 개인적으로는 AI가 개입했을 확률이 상당히 높다고 생각합니다.
 * - 단어 등장 프레임: { "AI가": 1886f, "이": 1899f, "타격에": 1901f, "관여했는지는": 1915f, "지금도": 1945f, "조사": 1961f, "중이라": 1971f, "명확히": 1989f, "밝혀진": 2003f, "것은": 2016f, "아니지만,": 2025f, "솔직히": 2044f, "사람이": 2066f, "직접": 2071f, "판단해서": 2080f, "초등학교를": 2098f, "공격했을까요?": 2121f, "개인적으로는": 2153f, "AI가": 2183f, "개입했을": 2191f, "확률이": 2210f, "상당히": 2227f, "높다고": 2239f, "생각합니다.": 2254f }
 * - 타임라인: 1886f 부터 시작 (총 401f 지속)
 * - 비주얼 컨셉: `BG_DARK` 배경 중앙에 'AI Intervention?'이라는 거대 물음표가 나타납니다. 사람이 직접 판단하는 실루엣과 AI 연산 노드가 대치하며, AI 쪽 확률 게이지가 점차 상승하는 캔버스 애니메이션을 구현합니다. 의심과 판단의 불투명성을 강조합니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene10: React.FC = () => {
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
 * [Scene 11]
 * - 원본 텍스트: 하원 의원 120명 이상이 국방부 장관에게 서한을 보낸 상태예요. "AI가 그 학교를 표적으로 선정했습니까?"
 * - 단어 등장 프레임: { "하원": 2287f, "의원": 2305f, "120명": 2311f, "이상이": 2323f, "국방부": 2337f, "장관에게": 2351f, "서한을": 2369f, "보낸": 2383f, "상태예요.": 2392f, ""AI가": 2420f, "그": 2428f, "학교를": 2438f, "표적으로": 2448f, "선정했습니까?"": 2469f }
 * - 타임라인: 2287f 부터 시작 (총 218f 지속)
 * - 비주얼 컨셉: 미국 의사당 건물을 연상시키는 추상적인 건물 아이콘 위에 '120+ Letters' 텍스트 카드가 리드미컬하게 배치됩니다. 화면 중앙에는 질문이 적힌 서한이 펼쳐지며, "Did AI target the school?" 문구가 강하게 부각됩니다.
 * - 필요한 그림(svg) 컴포넌트: CongressionalLetter (SVG)
 */
const Scene11: React.FC = () => {
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
 * [Scene 12]
 * - 원본 텍스트: 60%짜리 AI가 전쟁터에서 어떤 의미인지. 충분히 이해하셨을 겁니다.
 * - 단어 등장 프레임: { "60%짜리": 2505f, "AI가": 2527f, "전쟁터에서": 2535f, "어떤": 2610f, "의미인지.": 2616f, "충분히": 2633f, "이해하셨을": 2643f, "겁니다.": 2663f }
 * - 타임라인: 2505f 부터 시작 (총 182f 지속)
 * - 비주얼 컨셉: 화면 전체에 거대한 '60%' 숫자가 배경 노이즈 효과와 함께 배치됩니다. 전쟁터의 고요한 관제 센터 UI가 `BG_DARK` 톤으로 깔리고, 그 수치가 주는 무거운 책임감을 타이포그래피로 시각화합니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene12: React.FC = () => {
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
 * [Scene 13]
 * - 원본 텍스트: 그리고 사실, 이보다 더 근본적인 문제가 있어요. AI를 일부러 틀리게 만들 수도 있습니다.
 * - 단어 등장 프레임: { "그리고": 2687f, "사실,": 2703f, "이보다": 2718f, "더": 2726f, "근본적인": 2731f, "문제가": 2750f, "있어요.": 2765f, "AI를": 2786f, "일부러": 2794f, "틀리게": 2808f, "만들": 2823f, "수도": 2834f, "있습니다.": 2843f }
 * - 타임라인: 2687f 부터 시작 (총 178f 지속)
 * - 비주얼 컨셉: `BG_DARKEST` 배경으로 전환되며, 깨끗하던 시스템 창에 미세한 글리치들이 발생하기 시작합니다. '일부러 틀리게'라는 텍스트가 `STATE_WARN_FG` 색상의 잔상을 남기며 나타나고, 시스템의 무결성이 훼손되는 과정을 상징적으로 보여줍니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene13: React.FC = () => {
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
 * [Scene 14]
 * - 원본 텍스트: 메이븐은 학습 데이터에 의존해요. 그 데이터가 오염되면, AI 판단 자체가 오염돼요.
 * - 단어 등장 프레임: { "메이븐은": 2865f, "학습": 2885f, "데이터에": 2894f, "의존해요.": 2911f, "그": 2932f, "데이터가": 2937f, "오염되면,": 2958f, "AI": 2978f, "판단": 2983f, "자체가": 2992f, "오염돼요.": 3006f }
 * - 타임라인: 2865f 부터 시작 (총 163f 지속)
 * - 비주얼 컨셉: 'Training Data' 패키지 박스들이 컨베이어 벨트 위를 지나가는 듯한 데이터 흐름도를 보여줍니다. 그중 일부 박스에 보라색(`STATE_WARN_FG`) 독극물 표시가 나타나며, 데이터가 주입됨에 따라 시스템 전체 색상이 오염되는 캔버스 효과를 구현합니다.
 * - 필요한 그림(svg) 컴포넌트: DataPoisoning (SVG)
 */
const Scene14: React.FC = () => {
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
 * [Scene 15]
 * - 원본 텍스트: 만약 적대국이 그 데이터에 슬쩍 오류를 심어놓으면 어떻게 될까요. AI가 민간 시설을 군사 시설로 추천할 수도 있게 됩니다.
 * - 단어 등장 프레임: { "만약": 3028f, "적대국이": 3037f, "그": 3055f, "데이터에": 3062f, "슬쩍": 3080f, "오류를": 3087f, "심어놓으면": 3101f, "어떻게": 3109f, "될까요.": 3136f, "AI가": 3152f, "민간": 3159f, "시설을": 3183f, "군사": 3204f, "시설로": 3208f, "추천할": 3213f, "수도": 3218f, "있게": 3227f, "됩니다.": 3237f }
 * - 타임라인: 3028f 부터 시작 (총 231f 지속)
 * - 비주얼 컨셉: '민간 시설' 아이콘이 적대국의 조작에 의해 '군사 시설' 아이콘으로 강제 변환되는 과정을 보여줍니다. AI의 추천 로직(Canvas Line)이 뒤틀리며 잘못된 타겟팅으로 향하는 네트워크 구조의 붕괴를 시각화하여 위험성을 경고합니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene15: React.FC = () => {
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
 * [Scene 16]
 * - 원본 텍스트: 이게 새로운 형태의 전쟁이에요.
 * - 단어 등장 프레임: { "이게": 3259f, "새로운": 3266f, "형태의": 3278f, "전쟁이에요.": 3290f }
 * - 타임라인: 3259f 부터 시작 (총 56f 지속)
 * - 비주얼 컨셉: `BG_DARK` 배경에 'New Form Of War'이라는 텍스트가 굵직한 `PRIMARY_BOLD` 색상으로 상단에서 강하게 떨어지며 박힙니다. 화면 전체가 디지털 군사 패턴으로 뒤덮이며 강렬하게 마무리됩니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene16: React.FC = () => {
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
      <Sequence from={0} durationInFrames={221}>
        <Scene1 />
      </Sequence>
      <Sequence from={221} durationInFrames={306}>
        <Scene2 />
      </Sequence>
      <Sequence from={527} durationInFrames={102}>
        <Scene3 />
      </Sequence>
      <Sequence from={629} durationInFrames={164}>
        <Scene4 />
      </Sequence>
      <Sequence from={793} durationInFrames={215}>
        <Scene5 />
      </Sequence>
      <Sequence from={1008} durationInFrames={323}>
        <Scene6 />
      </Sequence>
      <Sequence from={1331} durationInFrames={173}>
        <Scene7 />
      </Sequence>
      <Sequence from={1504} durationInFrames={182}>
        <Scene8 />
      </Sequence>
      <Sequence from={1686} durationInFrames={200}>
        <Scene9 />
      </Sequence>
      <Sequence from={1886} durationInFrames={401}>
        <Scene10 />
      </Sequence>
      <Sequence from={2287} durationInFrames={218}>
        <Scene11 />
      </Sequence>
      <Sequence from={2505} durationInFrames={182}>
        <Scene12 />
      </Sequence>
      <Sequence from={2687} durationInFrames={178}>
        <Scene13 />
      </Sequence>
      <Sequence from={2865} durationInFrames={163}>
        <Scene14 />
      </Sequence>
      <Sequence from={3028} durationInFrames={231}>
        <Scene15 />
      </Sequence>
      <Sequence from={3259} durationInFrames={56}>
        <Scene16 />
      </Sequence>
    </AbsoluteFill>
  );
};
