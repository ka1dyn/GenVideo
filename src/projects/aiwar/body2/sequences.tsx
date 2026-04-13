/**
 * [Section Global Context]
 * 주제: 미 국방부 프로젝트 메이븐 내에서 AI 클로드가 수행하는 전술적 역할과 극대화된 효율성
 * 내용 요약: 메이븐 시스템이 방대한 영상 및 신호 데이터를 수집하면, 클로드가 이를 실시간으로 분석해 표적의 동선을 추적하고 타격 리스트를 자동 생성한다. 심지어 음성 명령만으로 전술 브리핑을 제공하는 등, 과거 수천 명의 분석관이 하던 일을 AI가 대체하며 효율이 극적으로 증대된 사례를 구체적으로 묘사한다.
 * 
 * ## 2. 섹션 개요
 * 
 * | 항목      | 값 |
 * | --------- | --- |
 * | 총 길이   | 75000ms |
 * | 총 프레임 | 2250f |
 * | Scene 수  | 9 |
 * 
 * - `src/constants/theme.ts`에 명시된 디자인 토큰을 엄격히 준수한다.
 * 
 * ### 🚨 페르소나
 * 
 * [타겟 시청자]
 * AI에 관심은 있지만, 전문 용어가 어렵고 복잡하게 느껴져서 시작하기 망설여지는 20~50 직장인 및 일반인
 * 
 * [영상 스타일]
 * 
 * - 톤앤매너: 친근함, 쉬운 설명, 따뜻함, 스케치, 아날로그
 * - 디자인 스타일: 펜으로 직접 그린 듯한 스케치 스타일 UI, 크림색 종이 배경 위에 마커와 펜으로 핵심 내용을 요약하며, 자유롭고 생동감 넘치는 드로잉 애니메이션으로 복잡한 AI 트렌드를 쉽게 설명한다
 * - 단어를 일차원적으로 묘사하는 유치한 아이콘(가위, 전구, 돋보기 등) 사용을 엄격히 금지합니다. 맥락에 맞는 시각적 디자인을 svg와 canvas 그림으로 계획하세요.
 */
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';

/**
 * [Scene 1]
 * - 원본 텍스트: 자, 그럼 이제 클로드가 거기서 뭘 하는 건지 한번 알아봅시다.
 * - 단어 등장 프레임: { "자,": 0f, "그럼": 5f, "이제": 12f, "클로드가": 20f, "거기서": 35f, "뭘": 46f, "하는": 50f, "건지": 58f, "한번": 65f, "알아봅시다.": 73f }
 * - 타임라인: 0f 부터 시작 (총 101f 지속)
 * - 비주얼 컨셉: 칠판 느낌의 화면 구석에서 돋보기를 든 친숙한 클로드(Claude) 로고가 튀어나온다. 클로드가 스케치된 지시봉을 들고 칠판 한가운데를 가리키며, 이제부터 본격적으로 자신이 무슨 역할을 하는지 설명하겠다는 듯한 재치있는 애니메이션이 연출된다.
 * - 비주얼 컨셉: 칠판 느낌의 화면 구석에서 돋보기를 든 친숙한 클로드(Claude) 로고가 튀어나온다. 클로드가 스케치된 지시봉을 들고 칠판 한가운데를 가리키며, 이제부터 본격적으로 자신이 무슨 역할을 하는지 설명하겠다는 듯한 재치있는 애니메이션이 연출된다.
 * 
 * COMPONENTS:
 * - <ChalkboardBg progress={p} color={COLORS.ink} width={1200} height={800} strokeWidth={8} /> (화면 전체 칠판 배경)
 * - <ClaudeWithPointer progress={p} color={COLORS.ink} size={600} strokeWidth={6} /> (지시봉을 들고 튀어나오는 클로드)
 */
const Scene1: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2]
 * - 원본 텍스트: 메이븐이 데이터를 끌어오면, 클로드가 그걸 일단 분석하고 봅니다.
 * - 단어 등장 프레임: { "메이븐이": 101f, "데이터를": 130f, "끌어오면,": 159f, "클로드가": 190f, "그걸": 207f, "일단": 215f, "분석하고": 224f, "봅니다.": 241f }
 * - 타임라인: 101f 부터 시작 (총 161f 지속)
 * - 비주얼 컨셉: 화면에 펜 드로잉 스타일의 컨베이어 벨트가 가로지른다. 한쪽 끝(메이븐 구역)에서 거친 무더기로 쌓인 서류와 테이프들이 쏟아져 나오면, 반대쪽 끝에 떡 버티고 서 있는 거대한 통(클로드 분석기) 안으로 쏙쏙 빨려 들어가는 톱니바퀴 애니메이션이 이어진다.
 * - 비주얼 컨셉: 화면에 펜 드로잉 스타일의 컨베이어 벨트가 가로지른다. 한쪽 끝(메이븐 구역)에서 거친 무더기로 쌓인 서류와 테이프들이 쏟아져 나오면, 반대쪽 끝에 떡 버티고 서 있는 거대한 통(클로드 분석기) 안으로 쏙쏙 빨려 들어가는 톱니바퀴 애니메이션이 이어진다.
 * 
 * COMPONENTS:
 * - <ConveyorBelt progress={p} color={COLORS.ink} width={1000} height={200} strokeWidth={4} /> (화면 가로지르는 컨베이어 벨트)
 * - <DataBlocks progress={p} color={COLORS.ink} size={300} strokeWidth={4} /> (벨트 왼쪽에서 쏟아지는 데이터 블록들)
 * - <ClaudeFunnel progress={p} color={COLORS.ink} size={500} strokeWidth={6} /> (벨트 오른쪽 끝에서 데이터를 집어삼키는 깔때기)
 */
const Scene2: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3]
 * - 원본 텍스트: 위성 사진, 드론 영상, 레이더, 신호 정보까지. 160개가 넘는 정보 채널이 실시간으로 들어오고, 그 데이터를 보면서 클로드는 이런 걸 해요.
 * - 단어 등장 프레임: { "위성": 262f, "사진,": 296f, "드론": 300f, "영상,": 304f, "레이더,": 320f, "신호": 344f, "정보까지.": 382f, "160개가": 397f, "넘는": 416f, "정보": 424f, "채널이": 436f, "실시간으로": 453f, "들어오고,": 483f, "그": 512f, "데이터를": 514f, "보면서": 527f, "클로드는": 539f, "이런": 554f, "걸": 562f, "해요.": 566f }
 * - 타임라인: 262f 부터 시작 (총 317f 지속)
 * - 비주얼 컨셉: 클로드 분석기 깔때기 위로 수많은 정보 채널 아이콘들이 비처럼 쏟아진다. 하늘 위에서 인공위성이 전파를 쏘고, 주변에서 미니 드론 비디오와 동심원 모양의 레이더 파동들이 빙글빙글 돈다. 160개 이상의 데이터 소스가 거대한 실시간 폭포수(데이터 스트림) 형태의 선들로 그려진다.
 * - 필요한 그림(svg, canvas) 컴포넌트: 인공위성, 작은 드론 렌즈, 레이더 파동망 스케치, 소나기처럼 쏟아지는 데이터 라인(선) 이펙트
 * - SIMPLIFIED:
 * - 사용 컴포넌트: <DataStreamLines progress={p} /> (생략, 대신 레이더 파동과 인공위성을 적극 활용)
 * 
 * COMPONENTS:
 * - <Satellite progress={p} color={COLORS.ink} size={300} strokeWidth={4} /> (상단에서 전파 쏘는 인공위성)
 * - <RadarWaves progress={p} color={COLORS.accent} size={400} strokeWidth={3} /> (곳곳에서 퍼져나가는 레이더 파동)
 * - <ClaudeFunnel progress={1} color={COLORS.ink} size={400} strokeWidth={6} /> (아래에서 데이터를 받는 깔때기 반복 사용)
 */
const Scene3: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4]
 * - 원본 텍스트: 수상한 차량 한 대를 드론이 포착했다고 해볼게요.
 * - 단어 등장 프레임: { "수상한": 579f, "차량": 596f, "한": 607f, "대를": 620f, "드론이": 624f, "포착했다고": 641f, "해볼게요.": 671f }
 * - 타임라인: 579f 부터 시작 (총 121f 지속)
 * - 비주얼 컨셉: 화면이 드론 시점(1인칭)의 조준경(십자선) 인터페이스로 전환된다. 하단에서 황량한 사막 길을 달리는 낡은 픽업트럭 스케치가 등장하고, 트럭 위로 사각형 타겟 박스가 씌워지며 'Tracking'이라는 빨간색 텍스트가 깜빡인다.
 * - 비주얼 컨셉: 화면이 드론 시점(1인칭)의 조준경(십자선) 인터페이스로 전환된다. 하단에서 황량한 사막 길을 달리는 낡은 픽업트럭 스케치가 등장하고, 트럭 위로 사각형 타겟 박스가 씌워지며 'Tracking'이라는 빨간색 텍스트가 깜빡인다.
 * 
 * COMPONENTS:
 * - <DroneUI progress={p} color={COLORS.secondary} size={800} strokeWidth={4} /> (드론 시점 UI 렌즈 오버레이)
 * - <PickupTruck progress={p} color={COLORS.ink} size={400} strokeWidth={4} /> (사막을 달리는 트럭 스케치)
 * - <TrackingBox progress={p} color={COLORS.accent} size={300} strokeWidth={6} /> (트럭에 씌워지는 빨간 락온 박스)
 */
const Scene4: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5]
 * - 원본 텍스트: 클로드가 그 차량의 이동 경로를 뒤지다가, 어제 특정 통신 신호가 잡힌 위치랑 겹친 거에요. 심지어 그 근처에서 올라온 소셜미디어 게시물도 있다? 이런 식으로 판단해서 표적 후보로 올려버리는겁니다.
 * - 단어 등장 프레임: { "클로드가": 700f, "그": 720f, "차량의": 732f, "이동": 740f, "경로를": 753f, "뒤지다가,": 766f, "어제": 786f, "특정": 797f, "통신": 812f, "신호가": 817f, "잡힌": 833f, "위치랑": 842f, "겹친": 858f, "거에요.": 868f, "심지어": 895f, "그": 914f, "근처에서": 920f, "올라온": 946f, "소셜미디어": 964f, "게시물도": 999f, "있다?": 1021f, "이런": 1040f, "식으로": 1058f, "판단해서": 1062f, "표적": 1079f, "후보로": 1087f, "올려버리는겁니다.": 1100f }
 * - 타임라인: 700f 부터 시작 (총 421f 지속)
 * - 비주얼 컨셉: 트럭의 이동 경로가 지도 위에 구불구불한 붉은 점선으로 스케치된다. 그 선형 위 특정 위치에 안테나 핑(통신 신호) 아이콘과 모바일 폰 팝업창(소셜미디어) 조각들이 탁탁 맞춰지며, 복합적인 데이터를 종합하여 해당 차량 위에 최종적으로 거대한 표적(Target) 스탬프가 낙인찍힌다.
 * - 비주얼 컨셉: 트럭의 이동 경로가 지도 위에 구불구불한 붉은 점선으로 스케치된다. 그 선형 위 특정 위치에 안테나 핑(통신 신호) 아이콘과 모바일 폰 팝업창(소셜미디어) 조각들이 탁탁 맞춰지며, 복합적인 데이터를 종합하여 해당 차량 위에 최종적으로 거대한 표적(Target) 스탬프가 낙인찍힌다.
 * 
 * COMPONENTS:
 * - <DottedRoute progress={p} color={COLORS.accent} width={600} height={400} strokeWidth={6} /> (구불구불한 타겟 궤적)
 * - <AntennaPing progress={p} color={COLORS.ink} size={200} strokeWidth={4} /> (안테나 통신 핑 아이콘)
 * - <SocialPopup progress={p} color={COLORS.ink} size={300} strokeWidth={3} /> (SNS 게시글 팝업)
 * - <TargetStamp progress={p} color={COLORS.accent} size={600} strokeWidth={8} /> (최종 분석 후 쾅 찍히는 낙인)
 */
const Scene5: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 6]
 * - 원본 텍스트: 그리고 이렇게 뽑힌 표적들에 대해서 리스트를 만들어요. GPS 좌표, 추천 무기, 그리고 심지어 법적 정당화 문서까지 자동으로요.
 * - 단어 등장 프레임: { "그리고": 1121f, "이렇게": 1157f, "뽑힌": 1173f, "표적들에": 1183f, "대해서": 1203f, "리스트를": 1221f, "만들어요.": 1239f, "GPS": 1267f, "좌표,": 1272f, "추천": 1297f, "무기,": 1299f, "그리고": 1314f, "심지어": 1331f, "법적": 1348f, "정당화": 1359f, "문서까지": 1378f, "자동으로요.": 1399f }
 * - 타임라인: 1121f 부터 시작 (총 316f 지속)
 * - 비주얼 컨셉: 영수증이나 투-두 리스트 같은 서류가 기계에서 출력되듯 화면 아래에서부터 쭉 올라온다. 타자기가 빠르게 타이핑되듯이 빈칸들이 자동으로 채워지는데, GPS 좌표, 무기 아이콘(미사일 형태 등), 그리고 법원 판사봉 아이콘과 허가(APPROVED) 도장이 순식간에 찍혀 소름 돋게 철저한 자동화를 보여준다.
 * - 비주얼 컨셉: 영수증이나 투-두 리스트 같은 서류가 기계에서 출력되듯 화면 아래에서부터 쭉 올라온다. 타자기가 빠르게 타이핑되듯이 빈칸들이 자동으로 채워지는데, GPS 좌표, 무기 아이콘(미사일 형태 등), 그리고 법원 판사봉 아이콘과 허가(APPROVED) 도장이 순식간에 찍혀 소름 돋게 철저한 자동화를 보여준다.
 * 
 * COMPONENTS:
 * - <ReceiptPrint progress={p} color={COLORS.ink} size={500} strokeWidth={4} /> (출력되는 자동 생성 영수증/문서)
 * - <MissileIcon progress={p} color={COLORS.accent} size={200} strokeWidth={4} /> (결정된 타격 수단 미사일)
 * - <Gavel progress={p} color={COLORS.ink} size={300} strokeWidth={6} /> (법적 정당성을 부여하는 판사봉)
 * - <StampText progress={p} color={COLORS.accent} text="APPROVED" size={300} strokeWidth={8} /> (승인 도장)
 */
const Scene6: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 7]
 * - 원본 텍스트: 분석관이 말로 "이 지역 위협 요소 요약해줘" 하면, 바로 전술 브리핑을 뽑아줘요. 전쟁터에서 AI한테 말로 보고서를 받는 겁니다.
 * - 단어 등장 프레임: { "분석관이": 1437f, "말로": 1464f, ""이": 1467f, "지역": 1472f, "위협": 1482f, "요소": 1492f, "요약해줘"": 1505f, "하면,": 1523f, "바로": 1533f, "전술": 1543f, "브리핑을": 1556f, "뽑아줘요.": 1573f, "전쟁터에서": 1602f, "AI한테": 1634f, "말로": 1646f, "보고서를": 1657f, "받는": 1679f, "겁니다.": 1691f }
 * - 타임라인: 1437f 부터 시작 (총 279f 지속)
 * - 비주얼 컨셉: 군인 모자를 쓴 분석관 실루엣이 마이크에 대고 말하는 스케치가 등장한다. 마이크에서 나온 음성 파동(사운드 웨이브) 형태가 클로드 로고로 흡수되고, 곧이어 완성된 형태의 '기밀 전술 브리핑' 문서(폴더)가 홀로그램처럼 튀어나오며 AI가 생성한 보고서를 즉각 전달하는 장면을 보여준다.
 * - 비주얼 컨셉: 군인 모자를 쓴 분석관 실루엣이 마이크에 대고 말하는 스케치가 등장한다. 마이크에서 나온 음성 파동(사운드 웨이브) 형태가 클로드 로고로 흡수되고, 곧이어 완성된 형태의 '기밀 전술 브리핑' 문서(폴더)가 홀로그램처럼 튀어나오며 AI가 생성한 보고서를 즉각 전달하는 장면을 보여준다.
 * 
 * COMPONENTS:
 * - <SoldierSilhouette progress={p} color={COLORS.ink} size={400} strokeWidth={6} /> (질문하는 분석관 실루엣)
 * - <VoiceWave progress={p} color={COLORS.accent} width={300} height={150} strokeWidth={4} /> (분석관이 말하는 음성 파장)
 * - <BriefingFolder progress={p} color={COLORS.ink} size={400} strokeWidth={6} /> (즉각 생성된 브리핑 폴더)
 */
const Scene7: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 8]
 * - 원본 텍스트: 그래도 아직 마지막 결정은 사람이 내리고 AI는 그 직전 단계까지만 관여한다고 합니다.
 * - 단어 등장 프레임: { "그래도": 1716f, "아직": 1723f, "마지막": 1739f, "결정은": 1802f, "사람이": 1812f, "내리고": 1825f, "AI는": 1835f, "그": 1842f, "직전": 1847f, "단계까지만": 1853f, "관여한다고": 1873f, "합니다.": 1892f }
 * - 타임라인: 1716f 부터 시작 (총 196f 지속)
 * - 비주얼 컨셉: 화면 중앙에 커다랗고 경고등이 달린 빨간색 최종 발사(LAUNCH) 버튼이 거칠게 스케치된다. 화면 밖에서 뻗어 나온 사람의 손끝 일러스트가 이 버튼 위에 조심스럽게 놓이며, AI가 모든 것을 다 하더라도 결국 방아쇠(최종 결정)를 당기는 주체는 인간임을 시각화한다.
 * - 비주얼 컨셉: 화면 중앙에 커다랗고 경고등이 달린 빨간색 최종 발사(LAUNCH) 버튼이 거칠게 스케치된다. 화면 밖에서 뻗어 나온 사람의 손끝 일러스트가 이 버튼 위에 조심스럽게 놓이며, AI가 모든 것을 다 하더라도 결국 방아쇠(최종 결정)를 당기는 주체는 인간임을 시각화한다.
 * 
 * COMPONENTS:
 * - <LaunchButton progress={p} color={COLORS.accent} size={600} strokeWidth={8} /> (거대한 발사/결정 버튼)
 * - <FingerPress progress={p} color={COLORS.ink} size={500} strokeWidth={6} /> (조심스레 방아쇠를 누르는 사람 손끝)
 */
const Scene8: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 9]
 * - 원본 텍스트: 과거 전쟁에서는 이 작업에 분석관 2,000명이 필요했는데, 지금은 겨우 20명이에요. AI 덕분에 효율이 100배 뻥튀기 된거죠.
 * - 단어 등장 프레임: { "과거": 1912f, "전쟁에서는": 1922f, "이": 1952f, "작업에": 1962f, "분석관": 1975f, "2,000명이": 1992f, "필요했는데,": 2026f, "지금은": 2057f, "겨우": 2074f, "20명이에요.": 2081f, "AI": 2114f, "덕분에": 2119f, "효율이": 2138f, "100배": 2156f, "뻥튀기": 2182f, "된거죠.": 2201f }
 * - 타임라인: 1912f 부터 시작 (총 338f 지속)
 * - 비주얼 컨셉: 화면을 양분하여, 좌측에는 화면을 꽉 채울 정도로 빼곡한 2,000명의 졸라맨(스틱맨) 무리가 구슬땀을 흘리며 일하는 모습을 스케치한다. 우측에는 단 20명의 스틱맨과 당당히 서 있는 클로드 로고가 대비되며, 가운데에 'X 100'이라는 커다란 배수 마크가 쾅 하고 도장처럼 찍혀 폭발적인 효율성 증대를 강조한다.
 * - 비주얼 컨셉: 화면을 양분하여, 좌측에는 화면을 꽉 채울 정도로 빼곡한 2,000명의 졸라맨(스틱맨) 무리가 구슬땀을 흘리며 일하는 모습을 스케치한다. 우측에는 단 20명의 스틱맨과 당당히 서 있는 클로드 로고가 대비되며, 가운데에 'X 100'이라는 커다란 배수 마크가 쾅 하고 도장처럼 찍혀 폭발적인 효율성 증대를 강조한다.
 * 
 * COMPONENTS:
 * - <StickmanCrowd progress={p} color={COLORS.ink} size={600} strokeWidth={2} count={400} /> (왼쪽: 과거 2000명의 분석관 묘사)
 * - <StickmanCrowd progress={p} color={COLORS.ink} size={600} strokeWidth={4} count={20} /> (오른쪽: 현재 20명의 분석관 묘사)
 * - <MultiplierStamp progress={p} color={COLORS.accent} size={400} strokeWidth={8} /> (가운데 쾅 찍히는 X 100 마크)
 * - <ClaudeLogo progress={p} color={COLORS.ink} size={300} strokeWidth={6} /> (오른쪽에서 스틱맨들을 돕는 클로드)
 */
const Scene9: React.FC = () => {
  // TODO: 구현
  return (
    <AbsoluteFill>
      {/* 현재 씬 작업 영역 */}
      {/* 하단 150px은 자막 영역으로, 핵심 요소 및 텍스트 배치 금지 */}
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
