import React from "react";
import { AbsoluteFill } from "remotion";
import { SPACING } from "../constants/design";
import { SectionLabel } from "./SectionLabel";

type StackLayoutProps = {
  sectionTitle?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  gap?: number;
  staggerDelay?: number;
};

export const StackLayout: React.FC<StackLayoutProps> = ({
  sectionTitle,
  header,
  children,
  gap = SPACING.MD,
}) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: SPACING.XXL,
        paddingTop: sectionTitle ? SPACING.XXL + SPACING.XL : SPACING.XXL,
      }}
    >
      {sectionTitle && <SectionLabel title={sectionTitle} />}
      {header && (
        <div style={{ marginBottom: SPACING.LG, flexShrink: 0 }}>
          {header}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap,
          flex: 1,
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
