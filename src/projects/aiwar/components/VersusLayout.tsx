import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../../constants/theme";

interface Props {
  progress: number;
  leftLabel: string;
  rightLabel: string;
}

/**
 * @gallery: <VersusLayout progress={1} leftLabel="HUMAN" rightLabel="AI" />
 */
export const VersusLayout: React.FC<Props> = ({ 
    progress, 
    leftLabel, 
    rightLabel 
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const spr = spring({ frame, fps, config: { damping: 12 } });
  const scale = interpolate(spr, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 0.2], [0, 1]);

  return (
    <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        opacity 
    }}>
      {/* Central Divider */}
      <div style={{
          position: 'absolute',
          width: 2,
          height: interpolate(progress, [0, 1], [0, height]),
          backgroundColor: COLORS.STROKE_STRONG,
          transform: `scaleY(${progress})`,
      }} />

      {/* VS Label */}
      <div style={{
          position: 'absolute',
          padding: '10px 20px',
          backgroundColor: COLORS.BG_BASE,
          border: `2px solid ${COLORS.STROKE_STRONG}`,
          borderRadius: '50px',
          fontFamily: FONTS.DISPLAY,
          fontWeight: 'bold',
          fontSize: 40,
          color: COLORS.STATE_ERROR_FG,
          transform: `scale(${scale})`,
          zIndex: 10,
      }}>
        VS
      </div>

      {/* Labels */}
      <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 60,
          fontFamily: FONTS.DISPLAY,
          fontWeight: 'bold',
          color: COLORS.TEXT_MAIN,
          transform: `translateX(${interpolate(progress, [0, 1], [-100, 0])}px)`,
      }}>
        {leftLabel}
      </div>
      <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 60,
          fontFamily: FONTS.DISPLAY,
          fontWeight: 'bold',
          color: COLORS.PRIMARY_BOLD,
          transform: `translateX(${interpolate(progress, [0, 1], [100, 0])}px)`,
      }}>
        {rightLabel}
      </div>
    </div>
  );
};
