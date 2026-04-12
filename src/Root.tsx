import "./index.css";

import React from "react";
import { Folder, Composition, Still, staticFile } from "remotion";
import { ProjectMaven } from "./projects/project-maven/project-maven";
import { WebParadiam } from "./projects/web-paradiam/web-paradiam";
import { Thumbnail, ThumbnailSchema } from "./projects/thumbnail/Thumbnail";

import { VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./constants/video-config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Projects">
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

      <Folder name="Thumbnails">
        <Still
          id="thumbnail"
          component={Thumbnail}
          width={1280}
          height={720}
          schema={ThumbnailSchema}
          defaultProps={{
            backgroundImage: staticFile("thumbnail/aiwar-bg.png"),
            badgeText: "AI 실제 활용사례",
            badgeIcon: "🏴",
            titleLine1: "미국, 이란 전쟁 클로드 참전?",
            titleLine2: "표적 직접 추적한다",
            highlightWords: ["클로드 참전", "추적한다"],
            preset: "minimal" as const,
          }}
        />
      </Folder>
    </>
  );
};
