import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { COLORS } from "../../../constants/theme";

export type BackgroundLayerProps = {
  /** 배경 이미지 경로 (staticFile 또는 URL) */
  imageSrc: string;
  /** 오버레이 색상 */
  overlayColor?: string;
  /** 오버레이 투명도 (0~1) */
  overlayOpacity?: number;
  /** 그라데이션 방향 (CSS linear-gradient direction) */
  overlayDirection?: string;
  /** 비네팅 효과 활성화 */
  enableVignette?: boolean;
  /** 브랜드 컬러 틴트 색상 */
  brandTintColor?: string;
  /** 브랜드 컬러 틴트 투명도 (0~1) */
  brandTintOpacity?: number;
  /** 종이 노이즈 텍스처 투명도 (0~1) */
  paperNoiseOpacity?: number;
};

/**
 * 썸네일 배경 레이어.
 * 배경 이미지 위에 브랜드 컬러 틴트, 종이 노이즈 질감,
 * 그라데이션 오버레이와 비네팅 효과를 적용하여
 * 채널 아이덴티티 통일과 텍스트 가독성을 확보합니다.
 */
export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  imageSrc,
  overlayColor = COLORS.BG_DARKEST,
  overlayOpacity = 0.55,
  overlayDirection = "to top",
  enableVignette = true,
  brandTintColor = COLORS.SECONDARY_LIGHT,
  brandTintOpacity = 0.3,
  paperNoiseOpacity = 0.1,
}) => {
  return (
    <AbsoluteFill>
      {/* SVG 필터 정의 (종이 노이즈 텍스처용) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="paperNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grayNoise"
            />
          </filter>
        </defs>
      </svg>

      {/* Layer 1: 배경 이미지 */}
      <Img
        src={imageSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Layer 2: 브랜드 컬러 틴트 (세이지 톤 통일감) */}
      <AbsoluteFill
        style={{
          backgroundColor: brandTintColor,
          mixBlendMode: "multiply",
          opacity: brandTintOpacity,
        }}
      />

      {/* Layer 3: 종이 노이즈 텍스처 (아날로그 감성) */}
      <AbsoluteFill
        style={{
          filter: "url(#paperNoise)",
          opacity: paperNoiseOpacity,
          mixBlendMode: "overlay",
        }}
      />

      {/* Layer 4: 그라데이션 오버레이 (하단→상단 어둡게) */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${overlayDirection}, ${overlayColor} 0%, transparent 60%)`,
          opacity: overlayOpacity,
        }}
      />

      {/* Layer 5: 상단 그라데이션 (배경 상단도 살짝 어둡게) */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${overlayColor} 0%, transparent 40%)`,
          opacity: overlayOpacity * 0.5,
        }}
      />

      {/* Layer 6: 비네팅 (가장자리 어둡게 → 시선 중앙 집중) */}
      {enableVignette && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 70% 60% at center, transparent 40%, ${overlayColor} 100%)`,
            opacity: 0.6,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
