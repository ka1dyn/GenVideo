import React from "react";
import { AbsoluteFill } from "remotion";
import { SPACING } from "../constants/design";
import { SectionLabel } from "./SectionLabel";

type TopBottomLayoutProps = {
  sectionTitle?: string;
  top: React.ReactNode;
  bottom: React.ReactNode;
  ratio?: "40:60" | "50:50" | "30:70";
};

const RATIO_MAP: Record<NonNullable<TopBottomLayoutProps["ratio"]>, [string, string]> = {
  "30:70": ["3 1 0%", "7 1 0%"],
  "40:60": ["2 1 0%", "3 1 0%"],
  "50:50": ["1 1 0%", "1 1 0%"],
};

export const TopBottomLayout: React.FC<TopBottomLayoutProps> = ({
  sectionTitle,
  top,
  bottom,
  ratio = "40:60",
}) => {
  const [topFlex, bottomFlex] = RATIO_MAP[ratio];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: SPACING.XXL,
        gap: SPACING.LG,
        paddingTop: sectionTitle ? SPACING.XXL + SPACING.XL : SPACING.XXL,
      }}
    >
      {sectionTitle && <SectionLabel title={sectionTitle} />}
      <div
        style={{
          flex: topFlex,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {top}
      </div>
      <div
        style={{
          flex: bottomFlex,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {bottom}
      </div>
    </AbsoluteFill>
  );
};
