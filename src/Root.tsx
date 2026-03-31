import "./index.css";

import React from "react";
import { Folder, Composition } from "remotion";
import { WebParadiam } from "./projects/web-paradiam/web-paradiam";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Projects">
      <Composition
        id="web-paradiam"
        component={WebParadiam}
        durationInFrames={1200} // dummy duration
        fps={30}
        width={1920}
        height={1080}
      />

      <></>
    </Folder>
  );
};
