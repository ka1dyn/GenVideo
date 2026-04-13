import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS, FONTS } from '../../../constants/theme';

interface Props {
  progress: number;
}

/**
 * @gallery: <ChatBriefing progress={1} />
 */
export const ChatBriefing: React.FC<Props> = ({ progress }) => {
  const messages = [
    { sender: '분석관', text: '이 지역 위협 요소 요약해줘' },
    { sender: '인공지능', text: '위험 차량 2대 포착, 주변 민간 지역과 인접해 있습니다.' }
  ];

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.BG_MUTED, padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {messages.map((m, i) => {
        const msgProgress = Math.max(0, Math.min(1, progress * 2 - i));
        return (
          <Wobble key={i} intensity={1} style={{ alignSelf: m.sender === 'AI' ? 'flex-start' : 'flex-end' }}>
            <div style={{
              maxWidth: '400px',
              padding: '20px 30px',
              backgroundColor: m.sender === 'AI' ? COLORS.SECONDARY_SOFT : COLORS.BG_SURFACE,
              borderRadius: '20px',
              border: `2px solid ${COLORS.STROKE_INK}`,
              fontFamily: m.sender === 'AI' ? FONTS.MONO : FONTS.PRIMARY,
              fontSize: '24px',
              opacity: msgProgress,
              transform: `translateY(${(1 - msgProgress) * 20}px)`
            }}>
              <div style={{ fontSize: '14px', color: COLORS.TEXT_SUB, marginBottom: '5px' }}>{m.sender}</div>
              {m.text.slice(0, Math.floor(msgProgress * m.text.length))}
            </div>
          </Wobble>
        );
      })}
    </div>
  );
};
