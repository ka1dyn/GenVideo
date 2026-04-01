import "./index.css";

import React from "react";
import { Folder, Composition } from "remotion";
import { DesignTest1 } from "./projects/design-test1/design-test1";
import { WebParadiam } from "./projects/web-paradiam/web-paradiam";

import { VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./constants/video-config";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Projects">
      <Composition
        id="design-test1"
        component={DesignTest1}
        durationInFrames={16011}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="web-paradiam"
        component={WebParadiam}
        durationInFrames={8006 * 2}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <></>
    </Folder>
  );
};
