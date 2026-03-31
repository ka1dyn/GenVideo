import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import {
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
} from "@remotion/install-whisper-cpp";
import { Section, SectionMeta, TimestampEntry } from "./scaffold-types";

const FPS = 30;

function getAudioDurationMs(wavPath: string): number {
  try {
    const result = execSync(
      `conda run -n qwen3-tts ffprobe -v error -show_entries format=duration -of csv=p=0 "${wavPath}"`,
      { encoding: "utf-8" }
    );
    return Math.round(parseFloat(result.trim()) * 1000);
  } catch (e) {
    console.error(`❌ ffprobe failed for ${wavPath}`, e);
    return 0;
  }
}

export async function processMediaForSections(
  projectId: string,
  sections: Section[]
): Promise<SectionMeta[]> {
  const sectionMetas: SectionMeta[] = [];

  // 1. Create folders and text files
  console.log("\n=== Phase 1: Creating Directories and TXT files ===");
  for (const doc of sections) {
    const publicDir = path.join(
      process.cwd(),
      `public/${projectId}/${doc.name}`
    );
    const srcDir = path.join(
      process.cwd(),
      `src/projects/${projectId}/${doc.name}`
    );

    fs.mkdirSync(publicDir, { recursive: true });
    fs.mkdirSync(srcDir, { recursive: true });

    const txtPath = path.join(publicDir, `${doc.name}.txt`);
    fs.writeFileSync(txtPath, doc.text, "utf-8");
    console.log(
      `📄 Created structure and saved text for [${doc.name}] -> ${txtPath}`
    );
  }

  // 2. Generate TTS (WAV) files
  console.log("\n=== Phase 2: Generating TTS Audio ===");
  for (const doc of sections) {
    const publicDir = path.join(
      process.cwd(),
      `public/${projectId}/${doc.name}`
    );
    const wavPath = path.join(publicDir, `${doc.name}.wav`);

    console.log(`🎙️ Generating TTS for [${doc.name}]...`);
    try {
      const safeText = doc.text.replace(/"/g, '\\"');
      execSync(
        `python3 scripts/scaffold-tts.py "${safeText}" "${wavPath}"`,
        { stdio: "inherit" }
      );
    } catch (e) {
      console.error(`❌ TTS generation failed for ${doc.name}`, e);
    }
  }

  // 3. Setup Whisper and Generate Timestamps
  console.log("\n=== Phase 3: Setup Whisper and Generate Timestamps ===");
  const whisperPath = path.join(process.cwd(), "whisper.cpp");
  console.log("📦 Checking/installing whisper.cpp...");
  await installWhisperCpp({
    to: whisperPath,
    version: "1.5.5",
  });

  const modelToUse = "large-v3";
  console.log(`📥 Downloading Whisper model (${modelToUse})...`);
  await downloadWhisperModel({
    model: modelToUse,
    folder: whisperPath,
  });

  for (const doc of sections) {
    const publicDir = path.join(
      process.cwd(),
      `public/${projectId}/${doc.name}`
    );
    const wavPath = path.join(publicDir, `${doc.name}.wav`);
    const processed16kWavPath = path.join(
      publicDir,
      `${doc.name}_16khz.wav`
    );
    const jsonPath = path.join(publicDir, `${doc.name}_timestamp.json`);
    const txtPath = path.join(publicDir, `${doc.name}.txt`);

    // Check if TTS was successful before doing Whisper
    if (!fs.existsSync(wavPath)) {
      console.log(
        `⚠️ Skipping Whisper for [${doc.name}] because wav file is missing.`
      );
      continue;
    }

    // Convert to 16khz for Whisper
    console.log(`⚙️ Converting to 16kHz for Whisper [${doc.name}]...`);
    try {
      execSync(
        `ffmpeg -i "${wavPath}" -ar 16000 "${processed16kWavPath}" -y`,
        { stdio: "ignore" }
      );
    } catch (e) {
      console.error(`❌ ffmpeg failed for ${doc.name}`, e);
      continue;
    }

    // Whisper
    console.log(`📝 Transcribing [${doc.name}]...`);
    let timestamps: TimestampEntry[] = [];
    try {
      const whisperOutput = await transcribe({
        model: modelToUse,
        whisperPath,
        whisperCppVersion: "1.5.5",
        inputPath: processed16kWavPath,
        tokenLevelTimestamps: false,
        // @ts-ignore
        language: "ko",
        // @ts-ignore
        prompt: doc.text,
        // @ts-ignore
        tokensPerItem: 0,
      });

      timestamps = whisperOutput.transcription.map((segment) => ({
        text: segment.text.trim(),
        startMs: segment.offsets.from,
        endMs: segment.offsets.to,
      }));

      fs.writeFileSync(jsonPath, JSON.stringify(timestamps, null, 2));
      console.log(`💾 Saved captions to ${jsonPath}`);
    } catch (e) {
      console.error(`❌ Whisper transcription failed for ${doc.name}`, e);
    }

    if (fs.existsSync(processed16kWavPath)) fs.unlinkSync(processed16kWavPath);

    // 4. Calculate audio duration via ffprobe
    console.log(`⏱️ Measuring audio duration for [${doc.name}]...`);
    const audioDurationMs = getAudioDurationMs(wavPath);
    const durationInFrames = Math.ceil((audioDurationMs / 1000) * FPS);
    console.log(
      `   → ${audioDurationMs}ms (${durationInFrames} frames @${FPS}fps)`
    );

    sectionMetas.push({
      ...doc,
      audioDurationMs,
      durationInFrames,
      timestampPath: jsonPath,
      audioPath: wavPath,
      txtPath,
      timestamps,
    });
  }

  return sectionMetas;
}
