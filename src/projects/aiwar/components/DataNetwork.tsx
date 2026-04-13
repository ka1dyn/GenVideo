import React, { useMemo } from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS } from '../../../constants/theme';
import { interpolate, useVideoConfig } from 'remotion';

interface Props {
  type: 'grid' | 'core' | 'cross-check' | 'poisoning' | 'wave' | 'hierarchy';
  progress: number;
}

/**
 * @gallery: <DataNetwork type="grid" progress={1} />
 * @gallery: <DataNetwork type="core" progress={1} />
 * @gallery: <DataNetwork type="poisoning" progress={1} />
 * @gallery: <DataNetwork type="cross-check" progress={1} />
 */
export const DataNetwork: React.FC<Props> = ({ type, progress }) => {
  const nodes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      id: i
    }));
  }, []);

  const renderGrid = () => (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <React.Fragment key={i}>
          <line x1={i * 20} y1="0" x2={i * 20} y2="100" stroke={COLORS.STROKE_SUBTLE} strokeWidth="0.5" />
          <line x1="0" y1={i * 20} x2="100" y2={i * 20} stroke={COLORS.STROKE_SUBTLE} strokeWidth="0.5" />
        </React.Fragment>
      ))}
      {nodes.map((node, i) => {
        const pulse = Math.sin(progress * 10 + i) * 0.5 + 0.5;
        return (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={progress * (2 + pulse * 2)}
            fill={COLORS.PRIMARY}
            opacity={progress * 0.6}
          />
        );
      })}
    </svg>
  );

  const renderCore = () => (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      <circle cx="50" cy="50" r="10" fill="none" stroke={COLORS.PRIMARY_BOLD} strokeWidth="2" />
      {nodes.map((node, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={node.x}
          y2={node.y}
          stroke={COLORS.PRIMARY_MID}
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity={progress}
        />
      ))}
    </svg>
  );

  const renderPoisoning = () => {
    const poisonColor = "#8A2818"; // STATE_ERROR_FG
    const cleanColor = COLORS.SECONDARY;
    return (
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        {nodes.map((node, i) => {
          const nodePoisonProgress = Math.max(0, Math.min(1, progress * 1.5 - (node.x / 100)));
          const color = interpolate(nodePoisonProgress, [0, 1], [0, 1]) > 0.5 ? poisonColor : cleanColor;
          return (
            <g key={i}>
              <circle cx={node.x} cy={node.y} r="3" fill={color} />
              {i > 0 && (
                <line
                  x1={nodes[i-1].x}
                  y1={nodes[i-1].y}
                  x2={node.x}
                  y2={node.y}
                  stroke={color}
                  strokeWidth="0.5"
                  opacity={0.4}
                />
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Wobble intensity={2}>
        <div style={{ width: '600px', height: '600px' }}>
          {type === 'grid' && renderGrid()}
          {type === 'core' && renderCore()}
          {type === 'poisoning' && renderPoisoning()}
          {type === 'wave' && (
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              {[1, 2, 3].map(i => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={((progress * 50 + i * 20) % 50)}
                  fill="none"
                  stroke={COLORS.PRIMARY}
                  strokeWidth="1"
                  opacity={1 - ((progress * 50 + i * 20) % 50) / 50}
                />
              ))}
            </svg>
          )}
        </div>
      </Wobble>
    </div>
  );
};
