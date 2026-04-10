import React from "react";
import { COLORS, FONTS, SPACING } from "../theme";
import { Wobble } from "./Wobble";

interface RoughMemoProps {
  text: string;
  rotation?: number;
  style?: React.CSSProperties;
}

/**
 * HANDWRITING 폰트를 활용한 손글씨 메모 예시 컴포넌트입니다.
 * 주로 스케치 주변의 부가 설명이나 낙서 느낌을 위해 사용합니다.
 */
export const RoughMemo: React.FC<RoughMemoProps> = ({
  text,
  rotation = -5,
  style,
}) => {
  return (
    <Wobble mode="jumpy" intensity={2} interval={8}>
      <div
        style={{
          display: "inline-block",
          transform: `rotate(${rotation}deg)`,
          ...style,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.HANDWRITING,
            fontSize: 32,
            color: COLORS.PRIMARY,
            lineHeight: 1.2,
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </span>
        
        {/* Underline drawn beneath the handwriting */}
        <Wobble mode="jumpy" intensity={1} interval={6}>
            <svg width="120%" height="8" style={{ position: "absolute", bottom: -4, left: "-10%" }}>
                <path 
                    d="M 0,4 Q 30,2 60,4 Q 90,6 120,4" 
                    stroke={COLORS.PRIMARY_LIGHT} 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round"
                    opacity={0.6}
                />
            </svg>
        </Wobble>
      </div>
    </Wobble>
  );
};
