export interface Section {
  name: string;
  text: string;
}

export interface TimestampEntry {
  text: string;
  startMs: number;
  endMs: number;
}

export interface SectionMeta extends Section {
  audioDurationMs: number;
  durationInFrames: number;
  timestampPath: string;
  audioPath: string;
  txtPath: string;
  timestamps: TimestampEntry[];
}
