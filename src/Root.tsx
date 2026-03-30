import "./index.css";
import "./shared/styles/global.css";

import React from "react";
import { Folder, Composition } from "remotion";
import type { ProjectProps } from "./shared/types/project";

import {
  Composition as TestProject,
  calculateMetadata as testProjectMeta,
} from "./projects/test-project";
import { config as testProjectConfig } from "./projects/test-project/config";

/*
 * ─── 프로젝트 등록 ───
 * 새 프로젝트를 추가하려면 아래 패턴을 따르세요:
 *
 * 1. import 추가:
 *   import { Composition } from "remotion";
 *   import type { ProjectProps } from "./shared/types/project";
 *   import { Composition as MyTopic, calculateMetadata as myTopicMeta } from "./projects/my-topic";
 *   import { config as myTopicConfig } from "./projects/my-topic/config";
 *
 * 2. <Folder> 안에 <Composition> 추가:
 *   <Composition
 *     id={myTopicConfig.id}
 *     component={MyTopic}
 *     calculateMetadata={myTopicMeta}
 *     durationInFrames={300}
 *     fps={myTopicConfig.fps}
 *     width={myTopicConfig.width}
 *     height={myTopicConfig.height}
 *     defaultProps={{ segmentDurations: [] } satisfies ProjectProps}
 *   />
 */

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Projects">
      {/* 여기에 프로젝트 Composition을 등록하세요 */}
      <Composition
        id={testProjectConfig.id}
        component={TestProject}
        calculateMetadata={testProjectMeta}
        durationInFrames={300}
        fps={testProjectConfig.fps}
        width={testProjectConfig.width}
        height={testProjectConfig.height}
        defaultProps={{ segmentDurations: [] } satisfies ProjectProps}
      />
    </Folder>
  );
};
