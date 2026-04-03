export interface Section {
  name: string;
  text: string;
}

export interface TimestampEntry {
  text: string;
  startFrame: number;
  endFrame: number;
}

export interface SectionMeta extends Section {
  audioDurationMs: number;
  durationInFrames: number;
  timestampPath: string;
  audioPath: string;
  txtPath: string;
  timestamps: TimestampEntry[];
}
