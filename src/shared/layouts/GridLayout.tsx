import React from "react";
import { AbsoluteFill } from "remotion";
import { SPACING } from "../constants/design";
import { SectionLabel } from "./SectionLabel";

type GridLayoutProps = {
  sectionTitle?: string;
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: number;
  staggerDelay?: number;
};

export const GridLayout: React.FC<GridLayoutProps> = ({
  sectionTitle,
  children,
  columns = 2,
  gap = SPACING.MD,
}) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: SPACING.XXL,
        paddingTop: sectionTitle ? SPACING.XXL + SPACING.XL : SPACING.XXL,
      }}
    >
      {sectionTitle && <SectionLabel title={sectionTitle} />}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
