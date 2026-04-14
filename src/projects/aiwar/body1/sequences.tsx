import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { Wobble } from '../../../shared-components/Wobble';
import { DrawLine } from '../../../shared-components/DrawLine';
import { PaperTexture } from '../../../shared-components/PaperTexture';

/**
 * [Scene 1]
 * - 원본 텍스트: 우선 이 작전의 중심에 있던 시스템, 프로젝트 메이븐에 대해 알아봐야합니다.
 * - 단어 등장 프레임: { "우선": 0f, "이": 10f, "작전의": 14f, "중심에": 27f, "있던": 41f, "시스템,": 50f, "프로젝트": 74f, "메이븐에": 80f, "대해": 93f, "알아봐야합니다.": 100f }
 * - 타임라인: 0f 부터 시작 (총 113f 지속)
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
 * - 원본 텍스트: 메이븐을 이해하기 위해 2017년으로 한번 돌아가 보자구요.
 * - 단어 등장 프레임: { "메이븐을": 113f, "이해하기": 148f, "위해": 166f, "2017년으로": 176f, "한번": 208f, "돌아가": 217f, "보자구요.": 231f }
 * - 타임라인: 113f 부터 시작 (총 143f 지속)
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
 * - 원본 텍스트: 당시 미국 국방부가 심각한 고민에 빠졌어요.
 * - 단어 등장 프레임: { "당시": 256f, "미국": 267f, "국방부가": 282f, "심각한": 298f, "고민에": 313f, "빠졌어요.": 329f }
 * - 타임라인: 256f 부터 시작 (총 100f 지속)
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
 * - 원본 텍스트: 전 세계에 깔린 군사 드론이 하루 24시간 영상을 찍어서 막 쏟아붓는데, 그걸 어떻게 사람이 일일히 다 보고 있겠어요.
 * - 단어 등장 프레임: { "전": 356f, "세계에": 359f, "깔린": 384f, "군사": 387f, "드론이": 416f, "하루": 420f, "24시간": 423f, "영상을": 443f, "찍어서": 459f, "막": 474f, "쏟아붓는데,": 479f, "그걸": 508f, "어떻게": 525f, "사람이": 528f, "일일히": 540f, "다": 551f, "보고": 555f, "있겠어요.": 563f }
 * - 타임라인: 356f 부터 시작 (총 229f 지속)
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
 * - 원본 텍스트: "저게 군사 차량이야, 민간 차량이야?" 이러다가 전쟁이 먼저 끝나는 거죠.
 * - 단어 등장 프레임: { ""저게": 585f, "군사": 597f, "차량이야,": 609f, "민간": 639f, "차량이야?"": 651f, "이러다가": 685f, "전쟁이": 701f, "먼저": 716f, "끝나는": 722f, "거죠.": 735f }
 * - 타임라인: 585f 부터 시작 (총 164f 지속)
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
 * - 원본 텍스트: 그래서 만든 게 메이븐이에요.
 * - 단어 등장 프레임: { "그래서": 749f, "만든": 766f, "게": 771f, "메이븐이에요.": 775f }
 * - 타임라인: 749f 부터 시작 (총 58f 지속)
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
 * - 원본 텍스트: Bloomberg 기자이자, 메이븐을 수년간 취재한 카트리나 맨슨은 이 시스템을 이렇게 표현했어요.
 * - 단어 등장 프레임: { "Bloomberg": 807f, "기자이자,": 848f, "메이븐을": 866f, "수년간": 883f, "취재한": 896f, "카트리나": 910f, "맨슨은": 928f, "이": 943f, "시스템을": 950f, "이렇게": 962f, "표현했어요.": 971f }
 * - 타임라인: 807f 부터 시작 (총 187f 지속)
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
 * - 원본 텍스트: "전쟁판 구글 어스예요. 고도, 좌표, 그 위치에 뭐가 있는지, 아군인지 적군인지. 이 모든 정보가 담긴 전쟁 지도예요."
 * - 단어 등장 프레임: { ""전쟁판": 994f, "구글": 1021f, "어스예요.": 1029f, "고도,": 1064f, "좌표,": 1077f, "그": 1091f, "위치에": 1096f, "뭐가": 1111f, "있는지,": 1121f, "아군인지": 1140f, "적군인지.": 1161f, "이": 1187f, "모든": 1201f, "정보가": 1202f, "담긴": 1216f, "전쟁": 1226f, "지도예요."": 1235f }
 * - 타임라인: 994f 부터 시작 (총 266f 지속)
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
 * - 원본 텍스트: 처음에 드론 영상 분석 도구로 시작한 메이븐은, 8년이 지난 지금 전쟁 전체를 운영하는 시스템으로 커졌습니다.
 * - 단어 등장 프레임: { "처음에": 1260f, "드론": 1282f, "영상": 1287f, "분석": 1298f, "도구로": 1309f, "시작한": 1326f, "메이븐은,": 1341f, "8년이": 1364f, "지난": 1377f, "지금": 1386f, "전쟁": 1394f, "전체를": 1404f, "운영하는": 1415f, "시스템으로": 1431f, "커졌습니다.": 1454f }
 * - 타임라인: 1260f 부터 시작 (총 218f 지속)
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

/**
 * [Scene 10]
 * - 원본 텍스트: 그리고 클로드가 이 시스템의 핵심 기능을 수행하고 있는거에요.
 * - 단어 등장 프레임: { "그리고": 1478f, "클로드가": 1490f, "이": 1511f, "시스템의": 1515f, "핵심": 1533f, "기능을": 1542f, "수행하고": 1555f, "있는거에요.": 1573f }
 * - 타임라인: 1478f 부터 시작 (총 156f 지속)
 * - 비주얼 컨셉: {FILL_S10_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S10_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene10: React.FC = () => {
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
      <Sequence durationInFrames={113}>
        <Scene1 />
      </Sequence>
      <Sequence from={113} durationInFrames={143}>
        <Scene2 />
      </Sequence>
      <Sequence from={256} durationInFrames={100}>
        <Scene3 />
      </Sequence>
      <Sequence from={356} durationInFrames={229}>
        <Scene4 />
      </Sequence>
      <Sequence from={585} durationInFrames={164}>
        <Scene5 />
      </Sequence>
      <Sequence from={749} durationInFrames={58}>
        <Scene6 />
      </Sequence>
      <Sequence from={807} durationInFrames={187}>
        <Scene7 />
      </Sequence>
      <Sequence from={994} durationInFrames={266}>
        <Scene8 />
      </Sequence>
      <Sequence from={1260} durationInFrames={218}>
        <Scene9 />
      </Sequence>
      <Sequence from={1478} durationInFrames={156}>
        <Scene10 />
      </Sequence>
    </AbsoluteFill>
  );
};
