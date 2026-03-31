import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const splitProgress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const codeTyping = Math.floor(interpolate(frame, [30, 200], [0, 400], {
    extrapolateRight: 'clamp',
  }));

  const mockCode = `
function AI_Assistant() {
  const [innovation, setInnovation] = useState(true);
  
  return (
    <Project 
      efficiency="55% up"
      speed="Fast"
    />
  );
}
  `;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', display: 'flex', flexDirection: 'row' }}>
      {/* Left: Past (Manual) */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#1E293B',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRight: '2px solid #334155',
          transform: `translateX(${(1 - splitProgress) * -100}%)`,
        }}
      >
        <div style={{ color: '#94A3B8', fontSize: 30, marginBottom: 20 }}>과거</div>
        <div style={{ fontSize: 50, color: '#64748B' }}>[ 커서 ]</div>
        <div style={{ color: '#475569', marginTop: 10 }}>빈 에디터...</div>
      </div>

      {/* Right: AI Pair Programmer */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#0F172A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
          transform: `translateX(${(1 - splitProgress) * 100}%)`,
        }}
      >
        <div style={{ color: '#A855F7', fontSize: 30, marginBottom: 20 }}>AI 어시스턴트</div>
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 15,
            padding: 30,
            width: '100%',
            height: 300,
            fontFamily: 'monospace',
            color: '#22D3EE',
            fontSize: 24,
            overflow: 'hidden',
          }}
        >
          {mockCode.slice(0, codeTyping)}
          <span style={{ borderLeft: '2px solid #22D3EE', marginLeft: 2 }} />
        </div>
      </div>

      {/* Subtitles */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#FFFFFF',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: 10,
            maxWidth: '80%',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}
        >
          과거에는 모든 컴포넌트를 바닥부터 직접 작성해야 했지만,{"\n"}
          이제는 AI가 우리의 가장 든든한 페어 프로그래머가 되었습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
