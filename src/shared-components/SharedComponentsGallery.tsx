import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Appear } from './Appear';
import { Card } from './Card';
import { QuoteCard } from './QuoteCard';
import { StepList } from './StepList';
import { Counter } from './Counter';
import { ProgressBar } from './ProgressBar';
import { UnderLine } from './UnderLine';
import { TypeWriter } from './TypeWriter';
import { COLORS, FONTS } from '../constants/theme';

const CARD_H = 400;
const LABEL_H = 36;

export const SharedComponentsGallery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 150프레임 주기로 반복되도록 startFrame 계산
  const loopStart = Math.floor(frame / 150) * 150;

  const renderGridItem = (label: string, element: React.ReactNode) => (
    <div
      key={label}
      style={{
        height: CARD_H,
        boxSizing: 'border-box',
        border: '1px solid #DDD',
        background: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          height: LABEL_H,
          padding: '0 16px',
          lineHeight: `${LABEL_H}px`,
          fontFamily: 'monospace',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#555',
          borderBottom: '1px solid #EEE',
          background: '#FAFAFA',
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 32,
          position: 'relative',
          overflow: 'auto',
          background: COLORS.BG_BASE,
        }}
      >
        {element}
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ background: '#F5F0EB', overflowY: 'auto', padding: 40 }}>
      <h2 style={{ fontFamily: 'sans-serif', fontSize: 32, marginBottom: 20 }}>
        🧩 Shared Components Gallery (루프 주기를 확인하세요)
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {renderGridItem(
          'Appear (fadeUp)',
          <Appear delay={loopStart + 10} type="fadeUp" exitAt={loopStart + 120}>
            <span style={{ fontSize: 48, fontWeight: 'bold' }}>Fade Up</span>
          </Appear>
        )}
        {renderGridItem(
          'Appear (fadeDown)',
          <Appear delay={loopStart + 10} type="fadeDown" exitAt={loopStart + 120}>
            <span style={{ fontSize: 48, fontWeight: 'bold' }}>Fade Down</span>
          </Appear>
        )}
        {renderGridItem(
          'Appear (fadeLeft)',
          <Appear delay={loopStart + 10} type="fadeLeft" exitAt={loopStart + 120}>
            <span style={{ fontSize: 48, fontWeight: 'bold' }}>Fade Left</span>
          </Appear>
        )}
        {renderGridItem(
          'Appear (fadeRight)',
          <Appear delay={loopStart + 10} type="fadeRight" exitAt={loopStart + 120}>
            <span style={{ fontSize: 48, fontWeight: 'bold' }}>Fade Right</span>
          </Appear>
        )}
        {renderGridItem(
          'Appear (scale)',
          <Appear delay={loopStart + 10} type="scale" exitAt={loopStart + 120}>
            <span style={{ fontSize: 48, fontWeight: 'bold', color: COLORS.PRIMARY }}>Scale In</span>
          </Appear>
        )}
        {renderGridItem(
          'Appear (fade)',
          <Appear delay={loopStart + 10} type="fade" exitAt={loopStart + 120}>
            <span style={{ fontSize: 48, fontWeight: 'bold' }}>Fade Only</span>
          </Appear>
        )}
        {renderGridItem(
          'Appear (wipe)',
          <Appear delay={loopStart + 10} type="wipe" exitAt={loopStart + 120}>
            <span style={{ fontSize: 48, fontWeight: 'bold' }}>Wipe Reveal</span>
          </Appear>
        )}
        {renderGridItem(
          'Appear (blur)',
          <Appear delay={loopStart + 10} type="blur" exitAt={loopStart + 120}>
            <span style={{ fontSize: 48, fontWeight: 'bold' }}>Blur In</span>
          </Appear>
        )}
        {renderGridItem(
          'Card (emphasis)',
          <Appear delay={loopStart + 10} type="fadeUp">
            <Card variant="emphasis" shadow="lg">
              <span style={{ fontSize: 32 }}>Emphasis Card</span>
            </Card>
          </Appear>
        )}
        {renderGridItem(
          'QuoteCard',
          <Appear delay={loopStart + 10} type="fadeLeft">
            <QuoteCard accentColor={COLORS.STATE_ERROR_FG}>
              <span style={{ fontSize: 32 }}>"인용구 텍스트입니다"</span>
            </QuoteCard>
          </Appear>
        )}
        {renderGridItem(
          'StepList (Number, Long text)',
          <StepList
            items={[
              '첫 번째 단계: 데이터 수집 및 전처리 완료',
              '두 번째 단계: 딥러닝 모델 학습 및 검증 진행 중',
              '세 번째 단계: 프로덕션 환경에 최종 배포 및 모니터링',
            ]}
            startFrame={loopStart + 10}
            stagger={15}
            labelType="number"
            style={{ width: '100%', maxWidth: 500 }}
          />
        )}
        {renderGridItem(
          'StepList (Dot)',
          <StepList
            items={[
              '이상 징후 최초 감지',
              '보안 프로토콜 즉각 가동',
              '외부 네트워크 접근 전면 차단 완료',
            ]}
            startFrame={loopStart + 10}
            stagger={15}
            labelType="dot"
            style={{ width: '100%', maxWidth: 500 }}
          />
        )}
        {renderGridItem(
          'StepList (Korean)',
          <StepList
            items={['문제 인지', '상황 분석', '대응책 마련']}
            startFrame={loopStart + 10}
            stagger={15}
            labelType="korean"
            style={{ width: '100%', maxWidth: 500 }}
          />
        )}
        {renderGridItem(
          'TypeWriter',
          <TypeWriter
            text="타이핑 애니메이션 텍스트입니다."
            startFrame={loopStart + 10}
            speed={2}
            showCursor
            style={{ fontSize: 36, fontWeight: 'bold', color: COLORS.TEXT_MAIN }}
          />
        )}
        {renderGridItem(
          'Counter',
          <Counter
            from={0}
            to={97.3}
            startFrame={loopStart + 10}
            duration={45}
            suffix="%"
            decimals={1}
            style={{ fontSize: 64, fontWeight: 'bold', color: COLORS.PRIMARY, fontFamily: FONTS.MONO }}
          />
        )}
        {renderGridItem(
          'ProgressBar',
          <div style={{ width: '100%', padding: '0 40px' }}>
            <ProgressBar value={0.8} startFrame={loopStart + 10} direction="center" />
          </div>
        )}
        {renderGridItem(
          'UnderLine',
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ fontSize: 48, fontWeight: 'bold' }}>밑줄 하이라이트</span>
            <UnderLine startFrame={loopStart + 15} style={{ position: 'absolute', bottom: -10, left: 0 }} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
