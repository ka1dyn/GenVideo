import React from "react";
import { SceneBackground, AnimatedTitle, AnimatedText } from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";

/**
 * Scene 1 — 기본 템플릿
 *
 * 이 템플릿은 새 아키텍처의 사용법을 보여줍니다.
 *
 * 핵심 규칙:
 * 1. 원시 HTML 대신 shared/components 사용
 * 2. 매직 넘버 대신 shared/constants 상수 사용
 * 3. 자유 배치 대신 shared/layouts 사용
 * 4. useCurrentFrame() + fps + clamp로 애니메이션
 *
 * SectionLabel 규칙:
 * - 소제목의 첫 번째 씬: sectionTitle 필수
 * - 소제목의 후속 씬: sectionTitle 생략 가능
 * - intro/outro: sectionTitle 생략
 */
export const Scene1: React.FC = () => {
  return (
    <SceneBackground variant="gradient">
      <CenteredLayout gap={SPACING.LG}>
        <AnimatedTitle
          text="Scene 1 Title"
          size="hero"
          animation="slideUp"
        />
        <AnimatedText
          text="여기에 설명 텍스트가 들어갑니다."
          variant="body"
          animation="fadeIn"
          delay={0.3}
        />
      </CenteredLayout>
    </SceneBackground>
  );
};
