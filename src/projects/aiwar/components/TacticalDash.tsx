import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS, FONTS } from '../../../constants/theme';
import { interpolate, useVideoConfig } from 'remotion';

interface Props {
  type: 'drone' | 'dashboard';
  progress: number;
}

/**
 * @gallery: <TacticalDash type="drone" progress={1} />
 * @gallery: <TacticalDash type="dashboard" progress={1} />
 */
export const TacticalDash: React.FC<Props> = ({ type, progress }) => {
  const { width, height } = useVideoConfig();

  const renderDroneHUD = () => (
    <div style={{ position: 'relative', width: '100%', height: '100%', color: COLORS.STATE_WARN_FG }}>
      {/* Crosshair */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="1" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1" />
          <path d="M 40,40 L 35,35 M 60,40 L 65,35 M 40,60 L 35,65 M 60,60 L 65,65" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      
      {/* HUD Info */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', fontFamily: FONTS.MONO, fontSize: '20px' }}>
        <div>고도: {Math.floor(progress * 4500)}m</div>
        <div>속도: {Math.floor(progress * 120)}km/h</div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', fontFamily: FONTS.MONO, fontSize: '24px', fontWeight: 'bold' }}>
        {progress > 0.5 ? '추적 고정' : '스캔 중...'}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', width: '100%', height: '100%', gap: '20px', padding: '40px' }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ border: `1px solid ${COLORS.STROKE_DEFAULT}`, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path
              d="M 20,80 A 40,40 0 1,1 80,80"
              fill="none"
              stroke={COLORS.STROKE_SUBTLE}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 20,80 A 40,40 0 1,1 80,80"
              fill="none"
              stroke={COLORS.PRIMARY}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="188"
              strokeDashoffset={188 * (1 - progress * (0.5 + i * 0.1))}
            />
          </svg>
          <div style={{ fontFamily: FONTS.MONO, fontSize: '14px', marginTop: '10px', color: COLORS.TEXT_SUB }}>
            채널 {i}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: type === 'drone' ? 'rgba(0,0,0,0.1)' : 'transparent' }}>
      <Wobble intensity={1}>
        <div style={{ width: '800px', height: '600px', border: `2px solid ${COLORS.STROKE_DEFAULT}`, borderRadius: '20px', overflow: 'hidden' }}>
          {type === 'drone' ? renderDroneHUD() : renderDashboard()}
        </div>
      </Wobble>
    </div>
  );
};
