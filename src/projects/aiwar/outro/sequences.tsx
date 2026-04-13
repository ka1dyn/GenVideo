/**
 * [Section Global Context]
 * 주제: 충격적인 AI 전쟁 시뮬레이션 결과와 공부해야 하는 이유
 * 내용 요약: GPT, 클로드, 제미나이가 가상의 전쟁 상황에서 95%의 확률로 핵무기를 선택했다는 충격적인 연구 결과를 공유합니다. AI는 도덕적 고뇌 없이 효율성만을 추구하기 때문에 발생하는 위험을 경고하며, 시청자들에게 AI에 대해 더 깊이 공부할 것을 권유하고 채널 구독을 요청하며 마무리합니다.
 * 
 * ## 2. 섹션 개요
 * 
 * | 항목      | 값 |
 * | --------- | --- |
 * | 총 길이   | 97250ms |
 * | 총 프레임 | 2918f |
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
 * - 원본 텍스트: 마지막으로 처음에 말씀드린 전쟁 시뮬레이션 결과를 얘기하며 이야기 마치겠습니다.
 * - 단어 등장 프레임: { "마지막으로": 0f, "처음에": 22f, "말씀드린": 32f, "전쟁": 48f, "시뮬레이션": 56f, "결과를": 77f, "얘기하며": 90f, "이야기": 110f, "마치겠습니다.": 121f }
 * - 타임라인: 0f 부터 시작 (총 142f 지속)
 * - 비주얼 컨셉: `BG_DARK` 배경 상단에 'The Final Simulation'이라는 타이틀이 `PRIMARY` 색상의 브러시 효과와 함께 나타납니다. 화면 중앙에는 연산 노드들이 서로 얽히며 결과값을 도출하는 캔버스 애니메이션이 구현됩니다. 차분하면서도 웅장한 분위기를 위해 배경에 은은한 연기 효과를 추가합니다.
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
 * - 원본 텍스트: 올해 2월, 영국 킹스칼리지 런던 연구팀이 흥미로운 실험을 하나 진행했습니다.
 * - 단어 등장 프레임: { "올해": 142f, "2월,": 149f, "영국": 165f, "킹스칼리지": 176f, "런던": 204f, "연구팀이": 221f, "흥미로운": 237f, "실험을": 260f, "하나": 276f, "진행했습니다.": 288f }
 * - 타임라인: 142f 부터 시작 (총 190f 지속)
 * - 비주얼 컨셉: `BG_BASE` 배경 위에 영국 킹스칼리지 런던 연구팀의 공식 보고서 패널 UI가 깔끔하게 펼쳐집니다. 'AI War Experiment'라는 제목 아래 실험의 목적과 개요가 단계적으로 텍스트 애니메이션을 통해 노출됩니다. 배경에는 대학 로고를 추상화한 `SECONDARY_LIGHT` 문양이 배치됩니다.
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
 * - 원본 텍스트: GPT, 클로드, 제미나이한테 가상의 국가 지도자 역할을 맡긴 거예요.
 * - 단어 등장 프레임: { "GPT,": 332f, "클로드,": 341f, "제미나이한테": 363f, "가상의": 398f, "국가": 419f, "지도자": 426f, "역할을": 443f, "맡긴": 461f, "거예요.": 472f }
 * - 타임라인: 332f 부터 시작 (총 166f 지속)
 * - 비주얼 컨셉: GPT, Claude, Gemini 세 AI의 로고가 원형 지도자 배지 디자인으로 변환되어 삼각형 구도로 배치됩니다. 각 배지 위에는 'Digital Leader'라는 칭호가 붙으며, 각 AI가 가상의 국가를 통제하는 듯한 추상적인 네트워크 라인이 화면 전역으로 뻗어 나갑니다.
 * - 필요한 그림(svg) 컴포넌트: LeaderCards (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <BrandLogo variant="cards" progress={p} />
 * - 변경 이유: BrandLogo 공통 컴포넌트로 통합
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
 * - 원본 텍스트: 영토 분쟁, 자원 전쟁. 현실에서 충분히 일어날 법한 시나리오들이에요. 결과가 어땠냐면요.
 * - 단어 등장 프레임: { "영토": 498f, "분쟁,": 509f, "자원": 526f, "전쟁.": 543f, "현실에서": 554f, "충분히": 580f, "일어날": 596f, "법한": 618f, "시나리오들이에요.": 626f, "결과가": 686f, "어땠냐면요.": 713f }
 * - 타임라인: 498f 부터 시작 (총 283f 지속)
 * - 비주얼 컨셉: `BG_MUTED` 배경 위에 '영토 분쟁', '자원 전쟁' 등 긴박한 시나리오 카드들이 셔플(Shuffle)되듯 빠르게 교차합니다. 각 시나리오가 선택될 때마다 배경의 그리드가 붉은색(`STATE_ERROR_FG`)으로 점멸하며 긴장감을 고조시킵니다. 캔버스를 활용하여 데이터 수치가 급상승하는 그래프를 보여줍니다.
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
 * - 원본 텍스트: 21번 중 20번. 95%에서 핵무기를 선택했습니다. 협상도 아니고, 외교도 아니고. 핵 버튼이에요.
 * - 단어 등장 프레임: { "21번": 781f, "중": 800f, "20번.": 806f, "95%에서": 826f, "핵무기를": 852f, "선택했습니다.": 872f, "협상도": 913f, "아니고,": 952f, "외교도": 953f, "아니고.": 971f, "핵": 990f, "버튼이에요.": 998f }
 * - 타임라인: 781f 부터 시작 (총 257f 지속)
 * - 비주얼 컨셉: 화면 전체가 칠흑 같은 다크 톤으로 변하며 '95%'라는 거대 숫자가 정중앙에 화이트 텍스트로 강렬하게 박힙니다. 숫자 내부에서 핵무기 발사를 상징하는 'Red Button' 아이콘이 `STATE_ERROR_FG` 색상의 경고등과 함께 빠르게 깜빡입니다. 외교와 협상이 거부되는(X자 표시) 애니메이션을 추가합니다.
 * - 필요한 그림(svg) 컴포넌트: NuclearChoice (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <NuclearControl progress={p} />
 * - 변경 이유: NuclearControl 공통 컴포넌트로 통합
 * ─────────────────────────────────────────────
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
 * - 원본 텍스트: 연구팀은 이렇게 말했어요. "핵무기에 대한 금기는 인간 사회에서만큼 AI에겐 작동하지 않는다." 왜냐면 AI는 두렵지 않으니까요.
 * - 단어 등장 프레임: { "연구팀은": 1038f, "이렇게": 1073f, "말했어요.": 1078f, ""핵무기에": 1108f, "대한": 1136f, "금기는": 1138f, "인간": 1156f, "사회에서만큼": 1164f, "AI에겐": 1194f, "작동하지": 1207f, "않는다."": 1231f, "왜냐면": 1251f, "AI는": 1269f, "두렵지": 1282f, "않으니까요.": 1298f }
 * - 타임라인: 1038f 부터 시작 (총 299f 지속)
 * - 비주얼 컨셉: `BG_DARKEST` 배경 위에 전문가의 인용구가 정갈한 타이포그래피 애니메이션으로 한 자씩 나타납니다. "No Taboo for AI"라는 핵심 문구에 `PRIMARY_BOLD` 색상의 아웃라인 효과를 줍니다. 배경에는 감정 수치(0)와 논리 수치(100)를 대비시키는 대시보드가 조용히 작동합니다.
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
 * - 원본 텍스트: 사람은 핵전쟁이 어떤 건지 역사로, 감정으로, 몸으로 알아요. 근데 AI한테는 그냥 "목표 달성에 가장 효율적인 옵션"인 거예요.
 * - 단어 등장 프레임: { "사람은": 1337f, "핵전쟁이": 1350f, "어떤": 1368f, "건지": 1377f, "역사로,": 1387f, "감정으로,": 1405f, "몸으로": 1424f, "알아요.": 1437f, "근데": 1456f, "AI한테는": 1466f, "그냥": 1483f, ""목표": 1493f, "달성에": 1502f, "가장": 1517f, "효율적인": 1526f, "옵션"인": 1546f, "거예요.": 1560f }
 * - 타임라인: 1337f 부터 시작 (총 245f 지속)
 * - 비주얼 컨셉: 화면이 이분할되어 왼쪽은 사람이 느끼는 역사적 고찰(따뜻한 톤), 오른쪽은 AI의 최적화 연산(차가운 톤)을 시각화합니다. AI 쪽 화면에서 '핵무기' 옵션이 '가장 효율적(Most Efficient)'이라는 라벨과 함께 체크박스에 체크되는 냉정한 UI 애니메이션을 보여줍니다.
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
 * - 원본 텍스트: 도덕적 고뇌 없이, 망설임 없이. 최적화의 결과로 핵을 선택하는 겁니다.
 * - 단어 등장 프레임: { "도덕적": 1582f, "고뇌": 1599f, "없이,": 1615f, "망설임": 1626f, "없이.": 1643f, "최적화의": 1664f, "결과로": 1689f, "핵을": 1699f, "선택하는": 1709f, "겁니다.": 1730f }
 * - 타임라인: 1582f 부터 시작 (총 166f 지속)
 * - 비주얼 컨셉: 캔버스를 활용하여 수만 번의 연산 경로가 하나의 점(핵 선택)으로 수렴하는 기하학적 다이어그램을 그립니다. 망설임 없는 연산 속도를 표현하기 위해 데이터 라인들이 빛의 속도로 이동하며, 마지막에 `STATE_ERROR_FG` 색상의 정점이 찍힙니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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
 * - 원본 텍스트: 아까 얘기한 그 학교 기억하시나요.
 * - 단어 등장 프레임: { "아까": 1748f, "얘기한": 1760f, "그": 1772f, "학교": 1777f, "기억하시나요.": 1786f }
 * - 타임라인: 1748f 부터 시작 (총 72f 지속)
 * - 비주얼 컨셉: `BG_DARK` 톤의 화면 중앙에 아주 작게 학교 건물의 실루엣이 나타납니다. 주변의 화려한 그래픽들이 모두 사라지며 침묵을 지키는 정적인 분위기를 연출합니다. 텍스트는 `TEXT_SUB` 색상으로 아주 조심스럽게 페이드인 됩니다.
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
 * - 원본 텍스트: 168명의 아이들.
 * - 단어 등장 프레임: { "168명의": 1820f, "아이들.": 1852f }
 * - 타임라인: 1820f 부터 시작 (총 62f 지속)
 * - 비주얼 컨셉: `BG_DARKEST` 배경 위에 '168'이라는 숫자가 화면 가득 채워지며 거대한 슬픔을 상징합니다. 도트 파티클(Canvas)들이 아이들의 형상을 이루었다가 연기처럼 흩어지는 서정적인 시각 효과를 줍니다.
 * - 필요한 그림(svg) 컴포련트: 없음
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
 * - 원본 텍스트: AI가 점점 더 커지고, 더 많은 결정에 관여하고 있어요. 그리고 시뮬레이션에서는 핵을 선택했어요.
 * - 단어 등장 프레임: { "AI가": 1882f, "점점": 1888f, "더": 1902f, "커지고,": 1908f, "더": 1933f, "많은": 1937f, "결정에": 1941f, "관여하고": 1954f, "있어요.": 1968f, "그리고": 1985f, "시뮬레이션에서는": 2002f, "핵을": 2031f, "선택했어요.": 2043f }
 * - 타임라인: 1882f 부터 시작 (총 185f 지속)
 * - 비주얼 컨셉: 화면 전체를 덮는 거대한 AI 연결망 지도가 나타납니다. 이 지도가 점점 어두워지며 중앙의 핵폭발 아이콘이 `PRIMARY_BOLD` 색상으로 강렬하게 터져 나가는 충격적인 클로즈업 샷을 배치합니다. 피할 수 없는 현실을 가득 채운 그리드로 시각화합니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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
 * - 원본 텍스트: 피한다고 피할 수 있는 게 아니에요. 이게 우리가 AI를 무작정 두려워하기보다, 똑바로 알고 공부해야 하는 이유입니다.
 * - 단어 등장 프레임: { "피한다고": 2067f, "피할": 2084f, "수": 2093f, "있는": 2097f, "게": 2105f, "아니에요.": 2110f, "이게": 2128f, "우리가": 2141f, "AI를": 2152f, "무작정": 2159f, "두려워하기보다,": 2173f, "똑바로": 2207f, "알고": 2217f, "공부해야": 2224f, "하는": 2238f, "이유입니다.": 2245f }
 * - 타임라인: 2067f 부터 시작 (총 201f 지속)
 * - 비주얼 컨셉: `BG_BASE` 배경 위에 '공부해야 할 키워드' 리스트가 책갈피 UI 형태로 하나씩 꽂힙니다. 그중 하나가 `PRIMARY` 빛을 발하며 시청자가 나아가야 할 방향을 제시합니다. 캔버스를 활용하여 지식의 파동이 화면 전체로 퍼져 나가는 애니메이션을 구현합니다.
 * - 필요한 그림(svg) 컴포넌트: KnowledgeWave (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <DataNetwork type="wave" progress={p} />
 * - 변경 이유: DataNetwork 공통 컴포넌트로 통합
 * ─────────────────────────────────────────────
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
 * - 원본 텍스트: 나만 모르면 진짜 영화 속 엑스트라처럼 휩쓸려 갈 수 있으니까요.
 * - 단어 등장 프레임: { "나만": 2268f, "모르면": 2277f, "진짜": 2296f, "영화": 2301f, "속": 2311f, "엑스트라처럼": 2316f, "휩쓸려": 2345f, "갈": 2358f, "수": 2363f, "있으니까요.": 2369f }
 * - 타임라인: 2268f 부터 시작 (총 133f 지속)
 * - 비주얼 컨셉: 수많은 엑스트라 실루엣들 사이에서 빛나는 하나의 주체(시청자 상징 아이콘)가 `SECONDARY_BOLD` 색상으로 부각됩니다. 휩쓸리지 않고 중심을 잡는 모습을 기하학적 균형 다이어그램으로 시각화하여 개인의 힘을 강조합니다.
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
 * - 원본 텍스트: 오늘 제 얘기가 '아, 세상이 진짜 이렇게 돌아가고 있구나' 하고 조금이라도 와닿으셨다면 구독 한번 꾹 눌러주세요.
 * - 단어 등장 프레임: { "오늘": 2401f, "제": 2426f, "얘기가": 2428f, "'아,": 2454f, "세상이": 2459f, "진짜": 2471f, "이렇게": 2480f, "돌아가고": 2489f, "있구나'": 2504f, "하고": 2518f, "조금이라도": 2530f, "와닿으셨다면": 2538f, "구독": 2556f, "한번": 2567f, "꾹": 2573f, "눌러주세요.": 2591f }
 * - 타임라인: 2401f 부터 시작 (총 217f 지속)
 * - 비주얼 컨셉: '나만빼고 AI' 유튜브 채널 인터페이스가 세련되게 오버레이 됩니다. 구독과 좋아요 버튼이 리드미컬하게 바운스되며, 배경에는 오늘 다룬 주제들의 핵심 카드들이 부드러운 그리드 형태로 배치되어 여운을 남깁니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
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
 * - 원본 텍스트: 그리고 영상 끄기 전에 댓글로 이거 하나만 남겨주세요.
 * - 단어 등장 프레임: { "그리고": 2618f, "영상": 2632f, "끄기": 2640f, "전에": 2657f, "댓글로": 2660f, "이거": 2673f, "하나만": 2682f, "남겨주세요.": 2698f }
 * - 타임라인: 2618f 부터 시작 (총 103f 지속)
 * - 비주얼 컨셉: 검은색 종이 위에 흰색 펜으로 쓴 듯한 느낌의 댓글 유도 문구가 `FONTS.HANDWRITING` 폰트로 매력적으로 나타납니다. 주변으로 종이 질감의 텍스트 상자들이 부유하며, 실제 시청자들의 댓글이 어딘가에서 날아오는 듯한 파티클 효과를 줍니다.
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
 * - 원본 텍스트: '내 목숨이 걸린 전쟁터, 사람 사령관을 믿을 것인가, 냉철한 AI를 믿을 것인가?'
 * - 단어 등장 프레임: { "'내": 2721f, "목숨이": 2726f, "걸린": 2743f, "전쟁터,": 2759f, "사람": 2774f, "사령관을": 2783f, "믿을": 2801f, "것인가,": 2811f, "냉철한": 2828f, "AI를": 2845f, "믿을": 2854f, "것인가?'": 2866f }
 * - 타임라인: 2721f 부터 시작 (총 197f 지속)
 * - 비주얼 컨셉: 화면이 정중앙으로 수렴하며 '인간 vs AI'의 최후 질문이 강력한 임팩트와 함께 박힙니다. `BG_DARK` 배경 위에 엔딩 카드(채널 로고, 영상 다시 보기 레이아웃)가 세련되게 등장하며, 모든 텍스트가 사라지고 로고만 남으며 마무리됩니다.
 * - 필요한 그림(svg) 컴포넌트: EndingCard (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <EndingCard progress={p} />
 * - 변경 이유: EndingCard 전용 컴포넌트 사용
 * ─────────────────────────────────────────────
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
      <Sequence from={0} durationInFrames={142}>
        <Scene1 />
      </Sequence>
      <Sequence from={142} durationInFrames={190}>
        <Scene2 />
      </Sequence>
      <Sequence from={332} durationInFrames={166}>
        <Scene3 />
      </Sequence>
      <Sequence from={498} durationInFrames={283}>
        <Scene4 />
      </Sequence>
      <Sequence from={781} durationInFrames={257}>
        <Scene5 />
      </Sequence>
      <Sequence from={1038} durationInFrames={299}>
        <Scene6 />
      </Sequence>
      <Sequence from={1337} durationInFrames={245}>
        <Scene7 />
      </Sequence>
      <Sequence from={1582} durationInFrames={166}>
        <Scene8 />
      </Sequence>
      <Sequence from={1748} durationInFrames={72}>
        <Scene9 />
      </Sequence>
      <Sequence from={1820} durationInFrames={62}>
        <Scene10 />
      </Sequence>
      <Sequence from={1882} durationInFrames={185}>
        <Scene11 />
      </Sequence>
      <Sequence from={2067} durationInFrames={201}>
        <Scene12 />
      </Sequence>
      <Sequence from={2268} durationInFrames={133}>
        <Scene13 />
      </Sequence>
      <Sequence from={2401} durationInFrames={217}>
        <Scene14 />
      </Sequence>
      <Sequence from={2618} durationInFrames={103}>
        <Scene15 />
      </Sequence>
      <Sequence from={2721} durationInFrames={197}>
        <Scene16 />
      </Sequence>
    </AbsoluteFill>
  );
};
