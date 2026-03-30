import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type StepIndicatorProps = {
  steps: string[];
  currentStep: number;
  delay?: number;
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = Math.round(delay * fps);
  const adjustedFrame = Math.max(0, frame - delayFrames);

  const opacity = interpolate(adjustedFrame, [0, fps * 0.4], [0, 1], CLAMP);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        opacity,
      }}
    >
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isUpcoming = i > currentStep;

        const dotDelay = delayFrames + Math.round(i * 0.1 * fps);
        const dotFrame = Math.max(0, frame - dotDelay);
        const dotSpring = spring({
          frame: dotFrame,
          fps,
          config: SPRING_CONFIG.GENTLE,
        });
        const dotScale = interpolate(dotSpring, [0, 1], [0.5, 1]);

        return (
          <React.Fragment key={i}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: SPACING.XS,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: isCurrent ? 16 : 12,
                  height: isCurrent ? 16 : 12,
                  borderRadius: "50%",
                  backgroundColor: isCompleted || isCurrent
                    ? COLORS.ACCENT
                    : COLORS.BG_ELEVATED,
                  border: isUpcoming ? `2px solid ${COLORS.BORDER_HOVER}` : "none",
                  transform: `scale(${dotScale})`,
                  boxShadow: isCurrent ? `0 0 12px ${COLORS.ACCENT_GLOW}` : "none",
                }}
              />
              {/* Label */}
              <div
                style={{
                  ...TYPOGRAPHY.BODY,
                  fontSize: FONT_SIZES.XS,
                  color: isCurrent
                    ? COLORS.TEXT_PRIMARY
                    : isCompleted
                      ? COLORS.TEXT_SECONDARY
                      : COLORS.TEXT_MUTED,
                  textAlign: "center",
                  maxWidth: 100,
                }}
              >
                {step}
              </div>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor: isCompleted ? COLORS.ACCENT : COLORS.BORDER,
                  marginBottom: SPACING.MD,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
