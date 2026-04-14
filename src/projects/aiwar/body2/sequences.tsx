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
 * - 비주얼 컨셉: {FILL_S1_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S1_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2]
 * - 원본 텍스트: 메이븐이 데이터를 끌어오면, 클로드가 그걸 일단 분석하고 봅니다.
 * - 단어 등장 프레임: { "메이븐이": 101f, "데이터를": 130f, "끌어오면,": 159f, "클로드가": 190f, "그걸": 207f, "일단": 215f, "분석하고": 224f, "봅니다.": 241f }
 * - 타임라인: 101f 부터 시작 (총 161f 지속)
 * - 비주얼 컨셉: {FILL_S2_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S2_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3]
 * - 원본 텍스트: 위성 사진, 드론 영상, 레이더, 신호 정보까지. 160개가 넘는 정보 채널이 실시간으로 들어오고, 그 데이터를 보면서 클로드는 이런 걸 해요.
 * - 단어 등장 프레임: { "위성": 262f, "사진,": 296f, "드론": 300f, "영상,": 304f, "레이더,": 320f, "신호": 344f, "정보까지.": 382f, "160개가": 397f, "넘는": 416f, "정보": 424f, "채널이": 436f, "실시간으로": 453f, "들어오고,": 483f, "그": 512f, "데이터를": 514f, "보면서": 527f, "클로드는": 539f, "이런": 554f, "걸": 562f, "해요.": 566f }
 * - 타임라인: 262f 부터 시작 (총 317f 지속)
 * - 비주얼 컨셉: {FILL_S3_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S3_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4]
 * - 원본 텍스트: 수상한 차량 한 대를 드론이 포착했다고 해볼게요.
 * - 단어 등장 프레임: { "수상한": 579f, "차량": 596f, "한": 607f, "대를": 620f, "드론이": 624f, "포착했다고": 641f, "해볼게요.": 671f }
 * - 타임라인: 579f 부터 시작 (총 121f 지속)
 * - 비주얼 컨셉: {FILL_S4_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S4_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5]
 * - 원본 텍스트: 클로드가 그 차량의 이동 경로를 뒤지다가, 어제 특정 통신 신호가 잡힌 위치랑 겹친 거에요. 심지어 그 근처에서 올라온 소셜미디어 게시물도 있다? 이런 식으로 판단해서 표적 후보로 올려버리는겁니다.
 * - 단어 등장 프레임: { "클로드가": 700f, "그": 720f, "차량의": 732f, "이동": 740f, "경로를": 753f, "뒤지다가,": 766f, "어제": 786f, "특정": 797f, "통신": 812f, "신호가": 817f, "잡힌": 833f, "위치랑": 842f, "겹친": 858f, "거에요.": 868f, "심지어": 895f, "그": 914f, "근처에서": 920f, "올라온": 946f, "소셜미디어": 964f, "게시물도": 999f, "있다?": 1021f, "이런": 1040f, "식으로": 1058f, "판단해서": 1062f, "표적": 1079f, "후보로": 1087f, "올려버리는겁니다.": 1100f }
 * - 타임라인: 700f 부터 시작 (총 421f 지속)
 * - 비주얼 컨셉: {FILL_S5_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S5_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 6]
 * - 원본 텍스트: 그리고 이렇게 뽑힌 표적들에 대해서 리스트를 만들어요. GPS 좌표, 추천 무기, 그리고 심지어 법적 정당화 문서까지 자동으로요.
 * - 단어 등장 프레임: { "그리고": 1121f, "이렇게": 1157f, "뽑힌": 1173f, "표적들에": 1183f, "대해서": 1203f, "리스트를": 1221f, "만들어요.": 1239f, "GPS": 1267f, "좌표,": 1272f, "추천": 1297f, "무기,": 1299f, "그리고": 1314f, "심지어": 1331f, "법적": 1348f, "정당화": 1359f, "문서까지": 1378f, "자동으로요.": 1399f }
 * - 타임라인: 1121f 부터 시작 (총 316f 지속)
 * - 비주얼 컨셉: {FILL_S6_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S6_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 7]
 * - 원본 텍스트: 분석관이 말로 "이 지역 위협 요소 요약해줘" 하면, 바로 전술 브리핑을 뽑아줘요. 전쟁터에서 AI한테 말로 보고서를 받는 겁니다.
 * - 단어 등장 프레임: { "분석관이": 1437f, "말로": 1464f, ""이": 1467f, "지역": 1472f, "위협": 1482f, "요소": 1492f, "요약해줘"": 1505f, "하면,": 1523f, "바로": 1533f, "전술": 1543f, "브리핑을": 1556f, "뽑아줘요.": 1573f, "전쟁터에서": 1602f, "AI한테": 1634f, "말로": 1646f, "보고서를": 1657f, "받는": 1679f, "겁니다.": 1691f }
 * - 타임라인: 1437f 부터 시작 (총 279f 지속)
 * - 비주얼 컨셉: {FILL_S7_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S7_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 8]
 * - 원본 텍스트: 그래도 아직 마지막 결정은 사람이 내리고 AI는 그 직전 단계까지만 관여한다고 합니다.
 * - 단어 등장 프레임: { "그래도": 1716f, "아직": 1723f, "마지막": 1739f, "결정은": 1802f, "사람이": 1812f, "내리고": 1825f, "AI는": 1835f, "그": 1842f, "직전": 1847f, "단계까지만": 1853f, "관여한다고": 1873f, "합니다.": 1892f }
 * - 타임라인: 1716f 부터 시작 (총 196f 지속)
 * - 비주얼 컨셉: {FILL_S8_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S8_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 9]
 * - 원본 텍스트: 과거 전쟁에서는 이 작업에 분석관 2,000명이 필요했는데, 지금은 겨우 20명이에요. AI 덕분에 효율이 100배 뻥튀기 된거죠.
 * - 단어 등장 프레임: { "과거": 1912f, "전쟁에서는": 1922f, "이": 1952f, "작업에": 1962f, "분석관": 1975f, "2,000명이": 1992f, "필요했는데,": 2026f, "지금은": 2057f, "겨우": 2074f, "20명이에요.": 2081f, "AI": 2114f, "덕분에": 2119f, "효율이": 2138f, "100배": 2156f, "뻥튀기": 2182f, "된거죠.": 2201f }
 * - 타임라인: 1912f 부터 시작 (총 338f 지속)
 * - 비주얼 컨셉: {FILL_S9_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S9_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={101}>
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
