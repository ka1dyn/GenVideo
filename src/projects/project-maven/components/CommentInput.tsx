import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, SPACING, Z } from "../theme";

interface CommentInputProps {
  isActive?: boolean;
  style?: React.CSSProperties;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  isActive = false,
  style,
}) => {
  const frame = useCurrentFrame();
  const cursorBlink = Math.floor(frame / 30) % 2 === 0;

  return (
    <div
      style={{
        backgroundColor: COLORS.BG_ELEVATED,
        border: `${SPACING.BORDER_NORMAL}px solid ${
          isActive ? COLORS.PRIMARY : COLORS.BORDER_STRONG
        }`,
        borderRadius: SPACING.RADIUS_MD,
        padding: `${SPACING.PX_16}px ${SPACING.PX_24}px`,
        width: 600,
        display: "flex",
        alignItems: "center",
        boxShadow: isActive ? `0 0 20px ${COLORS.PRIMARY_DIM}` : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        ...style,
      }}
    >
      <span
        style={{
          color: isActive ? COLORS.TEXT_MAIN : COLORS.TEXT_DISABLED,
          fontFamily: FONTS.PRIMARY,
          fontSize: FONTS.SIZE_SM,
        }}
      >
        댓글 남기기...
      </span>
      {cursorBlink && (
        <div
          style={{
            width: 2,
            height: FONTS.SIZE_SM,
            backgroundColor: COLORS.PRIMARY,
            marginLeft: 4,
          }}
        />
      )}
    </div>
  );
};
