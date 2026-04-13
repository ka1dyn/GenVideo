import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS, FONTS } from '../../../constants/theme';
import { interpolate, spring, useVideoConfig } from 'remotion';

interface Props {
  type: 'tragedy' | 'mismatch';
  progress: number;
}

// Sketch-style Home Icon
const HomeIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

// Sketch-style School Icon
const SchoolIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
);

// Sketch-style Family Icon
const FamilyIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 18v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

/**
 * @gallery: <EventTimeline type="tragedy" progress={1} />
 * @gallery: <EventTimeline type="mismatch" progress={1} />
 */
export const EventTimeline: React.FC<Props> = ({ type, progress }) => {
  const { fps } = useVideoConfig();

  const renderTragedy = () => (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '80%', height: '4px', backgroundColor: COLORS.STROKE_DEFAULT, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress * 100}%`, backgroundColor: COLORS.SECONDARY }} />
        
        {/* Icons along timeline */}
        {[20, 50, 80].map((pos, i) => {
          const iconProgress = Math.max(0, Math.min(1, progress * 1.5 - (pos / 100)));
          return (
            <div key={i} style={{ 
              position: 'absolute', 
              left: `${pos}%`, 
              top: '-50px', 
              transform: `translate(-50%, ${(1 - iconProgress) * 20}px)`,
              opacity: iconProgress,
              color: i === 1 ? COLORS.PRIMARY : COLORS.TEXT_MAIN
            }}>
              <Wobble intensity={1.5}>
                {i === 0 ? <HomeIcon /> : i === 1 ? <SchoolIcon /> : <FamilyIcon />}
              </Wobble>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMismatch = () => {
    const wallProgress = spring({ frame: progress * 60 - 20, fps, config: { damping: 12 } });
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '100px', gap: '40px' }}>
          <div style={{ border: `2px dashed ${COLORS.SECONDARY}`, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTS.DISPLAY }}>학교</div>
          <div style={{ border: `2px dashed ${COLORS.STATE_ERROR_FG}`, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONTS.DISPLAY }}>군사 시설</div>
        </div>
        {/* The Wall */}
        <div style={{ 
          position: 'absolute', 
          width: '10px', 
          height: `${wallProgress * 80}%`, 
          backgroundColor: COLORS.STROKE_INK,
          left: '50%',
          transform: 'translateX(-50%)'
        }} />
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontFamily: FONTS.MONO, opacity: wallProgress }}>
          2013-2016
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.BG_BASE }}>
      {type === 'tragedy' ? renderTragedy() : renderMismatch()}
    </div>
  );
};
