import "./index.css";

import React from "react";
import { Folder, Composition } from "remotion";
import { Aiwar } from "./projects/aiwar/aiwar";
import { ProjectMaven } from "./projects/project-maven/project-maven";
import { WebParadiam } from "./projects/web-paradiam/web-paradiam";

import { VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./constants/video-config";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Projects">
      <Composition
        id="aiwar"
        component={Aiwar}
        durationInFrames={10613}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="project-maven"
        component={ProjectMaven}
        durationInFrames={25067}
        fps={60}
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
