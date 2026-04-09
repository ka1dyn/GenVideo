import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { Wobble } from "./Wobble";

interface RoughCatProps {
  size?: number;
  color?: string;
}

/**
 * 첨부된 이미지의 동그란 고양이를 완벽히 재현한 캐릭터입니다.
 * 기웃거리기, 꼬리 쫓고 빙글빙글 돌기 등 다채로운 모션이 포함되어 있습니다.
 */
export const RoughCat: React.FC<RoughCatProps> = ({
  size = 180,
  color = COLORS.TEXT_MAIN,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 큰 사이클 (약 10초)
  const totalCycle = 600; 
  const phase = frame % totalCycle;

  // 상태 구분: 0~150(기웃), 150~300(평화), 300~500(꼬리 쫓기!), 500~600(퇴장)
  
  // 1. 위치 제어 (기본 x, y)
  const basePeekY = interpolate(
    phase,
    [0, 30, 150, 200, 500, 550, 600],
    [120, 0, 0, -40, -40, 0, 120], // 300~500 프레임에서 좀 더 위로 올라와서 돌 준비
    { extrapolateRight: "clamp" }
  );

  const basePeekX = interpolate(
    phase,
    [300, 320, 480, 500],
    [0, -100, -100, 0], // 꼬리 쫓을 때 화면 안쪽으로 더 들어옴
    { extrapolateRight: "clamp" }
  );

  // 2. 꼬리 쫓기 회전 ( Spinning! )
  const isSpinning = phase >= 320 && phase <= 480;
  const spinRotation = interpolate(
    phase,
    [320, 480],
    [0, 1440], // 4바퀴 회전
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 3. 꼬리 살랑거리기 vs 꼬리 쫓기용 꼬리
  const tailWag = Math.sin(frame / 6) * 15;
  const tailChaseAngle = isSpinning ? -40 : tailWag;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 60,
        transform: `translate(${basePeekX}px, ${basePeekY}px)`,
        zIndex: 100,
      }}
    >
      <div style={{
         transform: `rotate(${spinRotation}deg)`,
         transformOrigin: "center 70%", // 몸통 중심으로 회전
      }}>
        <Wobble mode={isSpinning ? "jumpy" : "smooth"} intensity={isSpinning ? 3 : 1} interval={isSpinning ? 2 : 5}>
          <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            style={{ overflow: "visible" }}
          >
            {/* Tail (원본 이미지처럼 얇고 곡선) */}
            <path
              d="M 140,150 Q 160,165 170,140 Q 180,110 160,90"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                transform: `rotate(${tailChaseAngle}deg)`,
                transformOrigin: "140px 150px",
              }}
            />

            {/* Body (Pear Shape - 원본 이미지 완벽 재현) */}
            <path
              d="M 100,185 
                 C 50,185 45,150 45,120 
                 C 45,80 70,55 100,55 
                 C 130,55 155,80 155,120 
                 C 155,150 150,185 100,185 Z"
              fill="white"
              stroke={color}
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Head Detail: Ears (Sharp triangles) */}
            <path d="M 68,65 L 55,30 L 85,58" fill="white" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 132,65 L 145,30 L 115,58" fill="white" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Face: Eyes (Dots, smaller and centered) */}
            <circle cx="82" cy="100" r="3.5" fill={color} />
            <circle cx="118" cy="100" r="3.5" fill={color} />

            {/* Face: Mouth (Typical W shape) */}
            <path
              d="M 92,108 Q 100,118 108,108 Q 116,118 124,108"
              stroke={color}
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Whiskers (Thin and short) */}
            <line x1="45" y1="105" x2="30" y2="103" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="45" y1="115" x2="30" y2="117" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            
            <line x1="155" y1="105" x2="170" y2="103" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="155" y1="115" x2="170" y2="117" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

            {/* Paws (Cute small nubs) */}
            <path d="M 85,185 Q 85,175 95,185" stroke={color} strokeWidth="5" strokeLinecap="round" />
            <path d="M 105,185 Q 105,175 115,185" stroke={color} strokeWidth="5" strokeLinecap="round" />
          </svg>
        </Wobble>
      </div>
    </div>
  );
};
