import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS, ANIMATION } from '../theme';

interface Props {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  textAlign?: 'center' | 'left' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
  stagger?: number;
}

export const TextReveal: React.FC<Props> = ({
  text,
  delay = 0,
  fontSize = FONTS.SIZE_XL,
  fontWeight = FONTS.WEIGHT_BOLD,
  color = COLORS.TEXT_MAIN,
  textAlign = 'center',
  letterSpacing = FONTS.TRACKING_TIGHT,
  lineHeight = 1.2,
  style,
  stagger = 2,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: textAlign === 'center' ? 'center' : 'flex-start',
        textAlign,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + i * stagger;
        const spr = spring({
          frame: frame - wordDelay,
          fps,
          config: ANIMATION.SPRING_GENTLE,
        });

        const y = interpolate(spr, [0, 1], [ANIMATION.ENTER_Y_MD, 0]);
        const opacity = interpolate(spr, [0, 0.4, 1], [0, 0, 1]);

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: '0.25em',
              fontSize,
              fontWeight,
              color,
              letterSpacing,
              lineHeight,
              transform: `translateY(${y}px)`,
              opacity,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
