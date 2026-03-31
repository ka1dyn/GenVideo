import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq8: React.FC = () => {
  const frame = useCurrentFrame();

  const codeProgress = interpolate(frame, [30, 200], [0, 400], {
    extrapolateRight: 'clamp',
  });

  const nextJsCode = `
export default function Page() {
  const data = useQuery('api/data');
  
  return (
    <Container>
      <ListComponent items={data} />
    </Container>
  );
}
  `;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ color: '#FFFFFF', fontSize: 40, fontWeight: 800, marginBottom: 30 }}>Next.js 컴포넌트 자동 생성</div>
      
      <div
        style={{
          width: 800,
          height: 400,
          backgroundColor: '#1E293B',
          borderRadius: 20,
          padding: 40,
          fontFamily: 'monospace',
          fontSize: 24,
          color: '#22D3EE',
          border: '1px solid #334155',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {nextJsCode.slice(0, codeProgress)}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#0F172A',
            padding: '10px 20px',
            borderRadius: 10,
            color: '#FFFFFF',
            fontSize: 20,
            opacity: frame > 150 ? 1 : 0,
          }}
        >
          NEXT.JS 14
        </div>
      </div>

      {/* Subtitles */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#FFFFFF',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '10px 20px',
            borderRadius: 10,
            display: 'inline-block',
            maxWidth: '80%',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}
        >
          프롬프트 몇 줄만 입력하면, API 연동부터 상태 관리까지 갖춘{"\n"}
          완벽한 Next.js 컴포넌트 코드가 순식간에 작성됩니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
