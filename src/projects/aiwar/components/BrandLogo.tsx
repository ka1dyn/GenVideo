import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS } from '../../../constants/theme';

export type BrandType = 'Claude' | 'Maven' | 'Pentagon' | 'GPT' | 'Gemini' | 'Anthropic';

interface Props {
  type: BrandType;
  variant?: 'default' | 'cards';
  progress: number;
  size?: number;
  color?: string;
}

/**
 * @gallery: <BrandLogo type="Claude" progress={1} size={120} />
 * @gallery: <BrandLogo type="Maven" progress={1} size={120} />
 * @gallery: <BrandLogo type="Pentagon" progress={1} size={120} />
 * @gallery: <BrandLogo variant="cards" progress={1} size={300} type="Claude" />
 */
export const BrandLogo: React.FC<Props> = ({
  type,
  variant = 'default',
  progress,
  size = 200,
  color = COLORS.PRIMARY,
}) => {
  const strokeWidth = 3;
  
  const getLogoPath = (t: BrandType) => {
    switch (t) {
      case 'Claude':
        // Simplified Anthropic "A" shape
        return "M 50,90 L 50,40 M 50,40 L 25,90 M 50,40 L 75,90 M 35,70 L 65,70";
      case 'Maven':
        // Stylized "M" with drone-like wings
        return "M 20,80 L 35,40 L 50,60 L 65,40 L 80,80 M 35,40 L 15,30 M 65,40 L 85,30";
      case 'Pentagon':
        // Hexagonal building shape
        return "M 50,20 L 80,35 L 80,65 L 50,80 L 20,65 L 20,35 Z M 50,35 L 65,45 L 65,55 L 50,65 L 35,55 L 35,45 Z";
      case 'GPT':
        // Spiral-like OpenAI logo simplification
        return "M 50,50 m -30,0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0 M 50,25 L 50,40 M 70,35 L 60,45 M 75,55 L 60,55";
      case 'Gemini':
        // Stylized star/Google Gemini icon
        return "M 50,20 Q 55,50 80,50 Q 55,50 50,80 Q 45,50 20,50 Q 45,50 50,20";
      case 'Anthropic':
        return "M 50,90 L 50,40 M 50,40 L 25,90 M 50,40 L 75,90";
      default:
        return "";
    }
  };

  const renderSingleLogo = (t: BrandType, s: number, c: string) => (
    <Wobble intensity={2} rotationIntensity={0.5}>
      <svg width={s} height={s} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
        <path
          d={getLogoPath(t)}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: 400 * (1 - progress),
            transition: 'stroke-dashoffset 0.5s ease-out',
          }}
        />
      </svg>
    </Wobble>
  );

  if (variant === 'cards') {
    const cardLogos: BrandType[] = ['GPT', 'Gemini', 'Claude'];
    return (
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center' }}>
        {cardLogos.map((cardType, i) => (
          <div key={cardType} style={{ 
            padding: '20px', 
            background: COLORS.BG_SURFACE, 
            borderRadius: '20px',
            border: `2px solid ${COLORS.STROKE_DEFAULT}`,
            opacity: progress > (i / cardLogos.length) ? 1 : 0,
            transform: `translateY(${(1 - progress) * 20}px)`,
          }}>
            {renderSingleLogo(cardType, size * 0.4, color)}
            <div style={{ 
              marginTop: '10px', 
              textAlign: 'center', 
              fontFamily: 'Pretendard Variable',
              color: COLORS.TEXT_MAIN,
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              {cardType}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return renderSingleLogo(type, size, color);
};
