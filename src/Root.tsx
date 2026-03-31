import "./index.css";

import React from "react";
import { Folder, Composition } from "remotion";
import { DesignTest1 } from "./projects/design-test1/design-test1";
import { WebParadiam } from "./projects/web-paradiam/web-paradiam";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Projects">
      <Composition
        id="design-test1"
        component={DesignTest1}
        durationInFrames={8006}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="web-paradiam"
        component={WebParadiam}
        durationInFrames={8006}
        fps={30}
        width={1920}
        height={1080}
      />

      <></>
    </Folder>
  );
};
