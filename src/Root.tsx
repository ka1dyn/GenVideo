import "./index.css";

import React from "react";
import { Folder, Composition } from "remotion";
import { ProjectMaven } from "./projects/project-maven/project-maven";
import { DesignTest3 } from "./projects/design-test3/design-test3";
import { DesignTest2 } from "./projects/design-test2/design-test2";
import { DesignTest1 } from "./projects/design-test1/design-test1";
import { WebParadiam } from "./projects/web-paradiam/web-paradiam";

import { VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./constants/video-config";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Projects">
      <Composition
        id="project-maven"
        component={ProjectMaven}
        durationInFrames={25067}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="design-test3"
        component={DesignTest3}
        durationInFrames={16011}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="design-test2"
        component={DesignTest2}
        durationInFrames={16011}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

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
        durationInFrames={8006}
        fps={30}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <></>
    </Folder>
  );
};
