import React from "react";
import { AbsoluteFill } from "remotion";
import { SPACING } from "../constants/design";
import { SectionLabel } from "./SectionLabel";

type CenteredLayoutProps = {
  sectionTitle?: string;
  children: React.ReactNode;
  verticalAlign?: "center" | "top" | "bottom";
  gap?: number;
};

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  sectionTitle,
  children,
  verticalAlign = "center",
  gap = SPACING.MD,
}) => {
  const alignMap = {
    center: "center",
    top: "flex-start",
    bottom: "flex-end",
  } as const;

  return (
    <AbsoluteFill
      style={{
        justifyContent: alignMap[verticalAlign],
        alignItems: "center",
        padding: SPACING.XXL,
      }}
    >
      {sectionTitle && <SectionLabel title={sectionTitle} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap,
          maxWidth: "85%",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
