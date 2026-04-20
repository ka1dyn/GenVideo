import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TypeWriterProps {
  /** 표시할 텍스트 */
  text: string;
  /** 타이핑 시작 프레임 (default: 0) */
  startFrame?: number;
  /** 글자당 프레임 수 — 낮을수록 빠름 (default: 2) */
  speed?: number;
  /** 커서 표시 여부 (default: false) */
  showCursor?: boolean;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

/**
 * 타이핑 효과 텍스트.
 * 글자가 순차적으로 나타납니다.
 *
 * @example
 * <TypeWriter
 *   text="능력 은폐 시도"
 *   startFrame={183}
 *   speed={3}
 *   style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_XL, color: COLORS.STATE_ERROR_FG }}
 * />
 */
export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  startFrame = 0,
  speed = 2,
  showCursor = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - startFrame;

  const charCount = Math.floor(
    interpolate(
      elapsed,
      [0, text.length * speed],
      [0, text.length],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    ),
  );

  const visibleText = text.slice(0, charCount);
  const isTyping = charCount < text.length && elapsed >= 0;

  // 커서 깜빡임 (15프레임 = 0.5초 주기)
  const cursorVisible = showCursor && (isTyping || frame % 30 < 15);

  return (
    <span style={style}>
      {visibleText}
      {cursorVisible && (
        <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>
      )}
    </span>
  );
};
