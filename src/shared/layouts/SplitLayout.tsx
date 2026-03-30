import React from "react";
import { AbsoluteFill } from "remotion";
import { SPACING } from "../constants/design";
import { SectionLabel } from "./SectionLabel";

type SplitLayoutProps = {
  sectionTitle?: string;
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: "50:50" | "40:60" | "60:40" | "75:25";
};

const RATIO_MAP: Record<NonNullable<SplitLayoutProps["ratio"]>, [string, string]> = {
  "50:50": ["1 1 0%", "1 1 0%"],
  "40:60": ["2 1 0%", "3 1 0%"],
  "60:40": ["3 1 0%", "2 1 0%"],
  "75:25": ["3 1 0%", "1 1 0%"],
};

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  sectionTitle,
  left,
  right,
  ratio = "50:50",
}) => {
  const [leftFlex, rightFlex] = RATIO_MAP[ratio];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "row",
        padding: SPACING.XXL,
        gap: SPACING.XL,
      }}
    >
      {sectionTitle && <SectionLabel title={sectionTitle} />}
      <div
        style={{
          flex: leftFlex,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {left}
      </div>
      <div
        style={{
          flex: rightFlex,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {right}
      </div>
    </AbsoluteFill>
  );
};
