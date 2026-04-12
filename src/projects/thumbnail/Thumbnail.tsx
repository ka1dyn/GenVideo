import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { COLORS, FONTS, SPACING, EFFECTS } from "../../constants/theme";
import { BackgroundLayer } from "./components/BackgroundLayer";
import { BadgeTag } from "./components/BadgeTag";
import { StrokedText } from "./components/StrokedText";
import { PRESETS, type PresetName } from "./presets";

// ─────────────────────────────────────────
// Zod Schema (Remotion Studio Props 패널용)
// ─────────────────────────────────────────

export const ThumbnailSchema = z.object({
  /** 배경 이미지 경로 (staticFile 또는 URL) */
  backgroundImage: z.string(),

  /** 상단 뱃지 텍스트 */
  badgeText: z.string().optional(),
  /** 상단 뱃지 아이콘 (이모지) */
  badgeIcon: z.string().optional(),

  /** 메인 타이틀 1줄 */
  titleLine1: z.string(),
  /** 메인 타이틀 2줄 (선택) */
  titleLine2: z.string().optional(),
  /** 강조할 단어 목록 */
  highlightWords: z.array(z.string()),

  /** 서브타이틀 (하단 박스형) */
  subtitle: z.string().optional(),

  /** 스타일 프리셋 */
  preset: z.enum(["drama", "info", "minimal"]).default("drama"),
});

export type ThumbnailProps = z.infer<typeof ThumbnailSchema>;

// ─────────────────────────────────────────
// Thumbnail Component
// ─────────────────────────────────────────

export const Thumbnail: React.FC<ThumbnailProps> = ({
  backgroundImage,
  badgeText,
  badgeIcon,
  titleLine1,
  titleLine2,
  highlightWords,
  subtitle,
  preset = "drama",
}) => {
  const p = PRESETS[preset as PresetName] ?? PRESETS.drama;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_DARKEST,
        overflow: "hidden",
      }}
    >
      {/* ── Layer 1: 배경 이미지 + 오버레이 ── */}
      <BackgroundLayer
        imageSrc={backgroundImage}
        overlayColor={p.overlayColor}
        overlayOpacity={p.overlayOpacity}
        enableVignette={p.enableVignette}
      />

      {/* ── Layer 2: 상단 뱃지 ── */}
      {badgeText && (
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 40,
            zIndex: 10,
          }}
        >
          <BadgeTag
            label={badgeText}
            icon={badgeIcon}
            bgColor={p.badgeBgColor}
            textColor={p.badgeTextColor}
          />
        </div>
      )}

      {/* ── Layer 3: 타이틀 블록 ── */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 50,
          right: 140, // 우측 하단 YouTube 뱃지 회피
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: SPACING.PX_12,
        }}
      >
        {/* 메인 타이틀 라인 1 */}
        <StrokedText
          text={titleLine1}
          fontSize={90}
          fillColor={p.titleFillColor}
          strokeColor={p.titleStrokeColor}
          strokeWidth={p.titleStrokeWidth}
          highlightWords={highlightWords}
          highlightColor={p.highlightColor}
        />

        {/* 메인 타이틀 라인 2 */}
        {titleLine2 && (
          <StrokedText
            text={titleLine2}
            fontSize={100}
            fillColor={p.titleFillColor}
            strokeColor={p.titleStrokeColor}
            strokeWidth={p.titleStrokeWidth}
            highlightWords={highlightWords}
            highlightColor={p.highlightColor}
          />
        )}

        {/* 서브타이틀 (박스형) */}
        {subtitle && (
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              marginTop: SPACING.PX_4,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: `${SPACING.PX_8}px ${SPACING.PX_24}px`,
                backgroundColor: p.subtitleBgColor,
                borderRadius: SPACING.RADIUS_SM,
                boxShadow: EFFECTS.SHADOW_PRIMARY,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.PRIMARY,
                  fontSize: 36,
                  fontWeight: FONTS.WEIGHT_BOLD,
                  color: p.subtitleTextColor,
                  letterSpacing: FONTS.TRACKING_WIDE * 36,
                }}
              >
                {subtitle}
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
