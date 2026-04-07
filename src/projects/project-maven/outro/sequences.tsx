import React from "react";
import {
  AbsoluteFill,
  Sequence,
} from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 망설임 없이 핵 버튼을 누르는 AI.
 * 단어 등장 타이밍: "망설임": 0f, "없이": 33f, "핵": 55f, "버튼을": 97f, "누르는": 130f, "AI.": 139f
 * 비주얼 컨셉: BG_VOID 배경. 화면 중앙에 TEXT_MAIN SIZE_2XL WEIGHT_BOLD 텍스트가 단어별 타이핑 이펙트로 등장. "핵" 단어 등장 시 배경 전체에 NEGATIVE_DIM 순간 flash. "AI." 마지막 단어에서 텍스트 전체가 NEGATIVE GLOW_TEXT_SM 효과. 인트로 레벨의 강렬한 첫 줄.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  return <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}></AbsoluteFill>;
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 진짜 영화가 아니라 현실입니다.
 * 단어 등장 타이밍: "진짜": 139f, "영화가": 160f, "아니라": 190f, "현실입니다.": 216f
 * 비주얼 컨셉: Scene 1 텍스트가 상단으로 이동하며 축소. 하단에 "진짜 영화가 아니라 현실입니다." 텍스트가 TEXT_BODY SIZE_LG로 fade-in. "현실입니다." 단어 등장 시 PRIMARY 색 수평선 2px가 텍스트 아래에 좌→우로 draw. 선언의 무게감.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 무섭고 섬뜩하죠?
 * 단어 등장 타이밍: "무섭고": 275f, "섬뜩하죠?": 312f
 * 비주얼 컨셉: 위의 두 텍스트가 유지된 채, 화면 중앙 하단에 "무섭고 섬뜩하죠?" 텍스트가 WARNING 색 SIZE_XL 으로 강조 등장. 배경에 NEGATIVE_DIM 오버레이가 서서히 짙어짐. 공감 유도.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 하지만 피한다고 피할 수 있는 게 아니에요.
 * 단어 등장 타이밍: "하지만": 367f, "피한다고": 390f, "피할": 427f, "수": 445f, "있는": 452f, "게": 475f, "아니에요.": 478f
 * 비주얼 컨셉: NEGATIVE_DIM 오버레이 유지된 채, 화면에 "피한다고" 텍스트 등장 시 우측에서 좌측으로 화살표가 그려졌다가 "아니에요." 단어에서 차단선(X)으로 변경. 회피 불가 시각화. "하지만" 단어에서 PRIMARY GLOW_SM 빛 등장 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 이게 우리가 AI를 무작정 두려워하기보다, 똑바로 알고 공부해야 하는 이유입니다.
 * 단어 등장 타이밍: "이게": 526f, "우리가": 565f, "AI를": 589f, "무작정": 601f, "두려워하기보다,": 635f, "똑바로": 716f, "알고": 738f, "공부해야": 753f, "하는": 782f, "이유입니다.": 797f
 * 비주얼 컨셉: 화면 배경이 BG_VOID → BG_BASE로 전환하며 밝아짐. 중앙에 대비 그래픽: [두려워하기 — X (NEGATIVE)] vs [알고 공부해야 — ✓ (SECONDARY)]. "똑바로" 단어에서 SECONDARY 색 [알고 공부해야] 아이템 크게 강조. 행동 촉구 UI.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 나만 모르면 진짜 영화 속 엑스트라처럼 휩쓸려 갈 수도 있으니까요.
 * 단어 등장 타이밍: "나만": 845f, "모르면": 886f, "진짜": 908f, "영화": 934f, "속": 958f, "엑스트라처럼": 977f, "휩쓸려": 1016f, "갈": 1042f, "수도": 1057f, "있으니까요.": 1099f
 * 비주얼 컨셉: 화면 좌측에 군중 은유: 여러 작은 점들(TEXT_DISABLED)이 규칙 없이 흐르는 파티클 애니메이션(엑스트라/군중). "엑스트라처럼" 단어에서 하나의 점만 PRIMARY 색으로 강조되며 정지 — 나머지는 휩쓸려 사라짐. 시청자가 특별한 존재가 될 수 있음을 암시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 오늘 제 얘기가 '아, 세상이 진짜 이렇게 돌아가고 있구나' 하고 조금이라도 와닿으셨다면
 * 단어 등장 타이밍: "오늘": 1099f, "제": 1135f, "얘기가": 1137f, "'아,": 1176f, "세상이": 1183f, "진짜": 1213f, "이렇게": 1231f, "돌아가고": 1259f, "있구나'": 1295f, "하고": 1326f, "조금이라도": 1360f, "와닿으셨다면": 1390f
 * 비주얼 컨셉: BG_BASE 배경에 RADIAL_PRIMARY 방사형 glow가 화면 중앙에서 서서히 등장. 텍스트가 TEXT_BODY SIZE_MD로 중앙에 부드럽게 fade-in. 인용구("아, 세상이...") 부분은 TEXT_MAIN SIZE_LG WEIGHT_SEMIBOLD 강조. 온기 있는 직접 소통 느낌.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 구독 한번 꾹 눌러주세요.
 * 단어 등장 타이밍: "구독": 1447f, "한번": 1481f, "꾹": 1489f, "눌러주세요.": 1499f
 * 비주얼 컨셉: 화면 중앙에 구독 버튼 스타일의 UI 컴포넌트 등장: 직사각형 PRIMARY 배경, "구독" TEXT_ON_PRIMARY SIZE_MD WEIGHT_BOLD, RADIUS_MD 모서리. 버튼이 spring 애니메이션으로 scale-up 등장. "꾹" 단어에서 버튼이 살짝 scale-down(눌리는 느낌) 후 복원. GLOW_MD 효과.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 아, 그리고 영상 끄기 전에 이거 하나만 댓글로 남겨주세요.
 * 단어 등장 타이밍: "아,": 1600f, "그리고": 1607f, "영상": 1629f, "끄기": 1644f, "전에": 1658f, "이거": 1675f, "하나만": 1706f, "댓글로": 1721f, "남겨주세요.": 1749f
 * 비주얼 컨셉: 구독 버튼이 상단으로 이동하며 축소. 하단 중앙에 댓글 입력창 스타일의 UI 컴포넌트 등장: 직사각형 BG_ELEVATED 배경, BORDER_STRONG 테두리, "댓글 남기기..." placeholder TEXT_DISABLED cursor blink. "남겨주세요." 단어에 입력창 테두리 PRIMARY 색으로 활성화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: '내 목숨이 걸린 전쟁터, 사람 사령관을 믿을 것인가, 냉철한 AI를 믿을 것인가?'
 * 단어 등장 타이밍: "'내": 1807f, "목숨이": 1825f, "걸린": 1886f, "전쟁터,": 1906f, "사람": 1958f, "사령관을": 1988f, "믿을": 2015f, "것인가,": 2035f, "냉철한": 2066f, "AI를": 2106f, "믿을": 2128f, "것인가?'": 2155f
 * 비주얼 컨셉: 화면을 두 영역으로 분할. 좌: [사람 사령관] SECONDARY 색 레이블/영역, 우: [냉철한 AI] PRIMARY 색 레이블/영역. 중앙에 "vs" TEXT_MUTED SIZE_XL. 각 단어 등장 시 해당 영역이 순차적으로 강조. "것인가?'" 마지막 단어에서 두 영역 모두 equal 강도로 pulse — 답이 없는 딜레마 시각화. 화면 하단에 댓글 입력창 레이블 "당신의 선택은?" TEXT_MUTED SIZE_SM.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={139}>
        <Scene1 />
      </Sequence>
      <Sequence from={139} durationInFrames={136}>
        <Scene2 />
      </Sequence>
      <Sequence from={275} durationInFrames={92}>
        <Scene3 />
      </Sequence>
      <Sequence from={367} durationInFrames={159}>
        <Scene4 />
      </Sequence>
      <Sequence from={526} durationInFrames={319}>
        <Scene5 />
      </Sequence>
      <Sequence from={845} durationInFrames={254}>
        <Scene6 />
      </Sequence>
      <Sequence from={1099} durationInFrames={348}>
        <Scene7 />
      </Sequence>
      <Sequence from={1447} durationInFrames={153}>
        <Scene8 />
      </Sequence>
      <Sequence from={1600} durationInFrames={207}>
        <Scene9 />
      </Sequence>
      <Sequence from={1807} durationInFrames={409}>
        <Scene10 />
      </Sequence>
    </AbsoluteFill>
  );
};
