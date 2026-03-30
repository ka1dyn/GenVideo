import React from "react";
import { AbsoluteFill } from "remotion";
import { SPACING } from "../constants/design";
import { SectionLabel } from "./SectionLabel";

type FullBleedLayoutProps = {
  sectionTitle?: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
  darkenOverlay?: boolean;
};

export const FullBleedLayout: React.FC<FullBleedLayoutProps> = ({
  sectionTitle,
  children,
  overlay,
  darkenOverlay = false,
}) => {
  return (
    <AbsoluteFill>
      {sectionTitle && <SectionLabel title={sectionTitle} />}
      {/* Main content — edge-to-edge */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </AbsoluteFill>
      {/* Optional overlay */}
      {overlay && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            padding: SPACING.LG,
            background: darkenOverlay
              ? "linear-gradient(transparent 50%, rgba(0,0,0,0.7) 100%)"
              : "none",
          }}
        >
          {overlay}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
