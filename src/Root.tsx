import "./index.css";

import React from "react";
import { Folder, Composition, Still, staticFile } from "remotion";
import { TestProject } from "./projects/test-project/test-project";
import { Aiwar } from "./projects/aiwar/aiwar";
import { ProjectMaven } from "./projects/project-maven/project-maven";
import { WebParadiam } from "./projects/web-paradiam/web-paradiam";
import { Thumbnail, ThumbnailSchema } from "./projects/thumbnail/Thumbnail";

import { VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./constants/video-config";
import { ComponentGallery } from './projects/test-project/components/ComponentGallery';
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Projects">
      <Composition
        id="test-project"
        component={TestProject}
        durationInFrames={1797}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      <Composition
        id="aiwar"
        component={Aiwar}
        durationInFrames={12462}
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
        <Composition
          id="test-project-component-gallery"
          component={ComponentGallery}
          width={1920}
          height={1080}
          durationInFrames={300}
          fps={30}
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
            offsetX: 0,
            offsetY: 60,
          }}
        />
      </Folder>
    </>
  );
};
