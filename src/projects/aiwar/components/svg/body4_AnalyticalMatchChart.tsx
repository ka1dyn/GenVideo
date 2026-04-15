import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, random } from 'remotion';
import { COLORS, ANIMATION, FONTS, SPACING } from '../../../../constants/theme';

export const body4_AnalyticalMatchChart: React.FC<{
  size?: number;
  scanProgress: number; // 0 to 1
  isMatched: boolean;
}> = ({
  size = 800,
  scanProgress,
  isMatched,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = size;
  const height = size * 0.5;
  const padding = 60;
  const chartWidth = width - padding * 2;
  const rowHeight = height / 2;

  // Generate noisy waveform for Human
  const getHumanY = (x: number) => {
    const r = random(`human-${x}`);
    return rowHeight / 2 + (r - 0.5) * 40;
  };

  // Generate precise waveform for AI
  const getAIY = (x: number) => {
    return rowHeight / 2 + Math.sin(x / 20) * 30 + (Math.sin(x / 5) * 10);
  };

  const points = 100;
  const step = chartWidth / points;

  return (
    <div style={{ position: 'relative', width, height }}>
      {/* Background Grid */}
      <svg width={width} height={height} style={{ position: 'absolute' }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.STROKE_SUBTLE} strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" rx={12} />
        
        {/* Human Pattern (Top) */}
        <g transform={`translate(${padding}, 0)`}>
          <text x="-10" y="30" fill={COLORS.TEXT_DISABLED} fontSize="14" fontFamily={FONTS.MONO}>[ HUMAN_PATTERN ]</text>
          <path
            d={`M 0 ${getHumanY(0)} ${Array.from({ length: points }).map((_, i) => `L ${i * step} ${getHumanY(i)}`).join(' ')}`}
            fill="none"
            stroke={COLORS.TEXT_DISABLED}
            strokeWidth="3"
            opacity="0.6"
          />
        </g>

        {/* AI Pattern (Bottom) */}
        <g transform={`translate(${padding}, ${rowHeight})`}>
          <text x="-10" y="30" fill={isMatched ? COLORS.STATE_ERROR_FG : COLORS.PRIMARY} fontSize="14" fontFamily={FONTS.MONO}>
            [ AI_MAVEN_PATTERN ]
          </text>
          <path
            d={`M 0 ${getAIY(0)} ${Array.from({ length: points }).map((_, i) => `L ${i * step} ${getAIY(i)}`).join(' ')}`}
            fill="none"
            stroke={isMatched ? COLORS.STATE_ERROR_FG : COLORS.PRIMARY}
            strokeWidth="4"
            strokeDasharray="8 4"
          />
          
          {/* Matched overlay (Turns red as scanner passes) */}
          <path
            d={`M 0 ${getAIY(0)} ${Array.from({ length: Math.floor(points * scanProgress) }).map((_, i) => `L ${i * step} ${getAIY(i)}`).join(' ')}`}
            fill="none"
            stroke={COLORS.STATE_ERROR_FG}
            strokeWidth="5"
            style={{ transition: 'stroke 0.2s ease' }}
          />
        </g>

        {/* Scanner Vertical Line */}
        <line
          x1={padding + chartWidth * scanProgress}
          y1={0}
          x2={padding + chartWidth * scanProgress}
          y2={height}
          stroke={COLORS.STATE_ERROR_FG}
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        
        {/* Scanning Glow */}
        <rect
          x={padding}
          y={0}
          width={chartWidth * scanProgress}
          height={height}
          fill={`linear-gradient(to right, transparent, ${COLORS.STATE_ERROR_FG}11)`}
          style={{ pointerEvents: 'none' }}
        />
      </svg>

      {/* Probability Badge */}
      <div style={{
        position: 'absolute',
        bottom: -40,
        right: 0,
        backgroundColor: isMatched ? COLORS.STATE_ERROR_BG : COLORS.BG_MUTED,
        padding: '10px 20px',
        border: `2px solid ${isMatched ? COLORS.STATE_ERROR_FG : COLORS.STROKE_DEFAULT}`,
        borderRadius: 8,
        fontFamily: FONTS.MONO,
        fontSize: 24,
        color: isMatched ? COLORS.STATE_ERROR_FG : COLORS.TEXT_SUB,
        fontWeight: 'bold',
      }}>
        MATCH: {Math.round(scanProgress * 94.2)}%
      </div>
    </div>
  );
};
