import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import {
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
} from "@remotion/install-whisper-cpp"; // toCaptions 제거됨

const run = async () => {
  const whisperPath = path.join(process.cwd(), "whisper.cpp");
  
  console.log("📦 Installing whisper.cpp...");
  await installWhisperCpp({
    to: whisperPath,
    version: "1.5.5",
  });
  
  console.log("📥 Downloading Whisper model...");
  // 한국어 인식률을 높이고 특수문자 깨짐을 줄이기 위해 'large-v3' 사용
  const modelToUse = "large-v3";
  await downloadWhisperModel({
    model: modelToUse,
    folder: whisperPath,
  });

  // 파일 경로 설정
  const inputAudioPath = path.join(process.cwd(), "public/projects/test-project/audio/scene1.wav");
  const processedAudioPath = path.join(process.cwd(), "public/projects/test-project/audio/scene1_16khz.wav");
  const scriptPath = path.join(process.cwd(), "src/sources/test-project/script.txt");
  const outputPath = path.join(process.cwd(), "public/projects/test-project/audio/scene1.json");

  // 프롬프트로 활용하기 위해 대본을 읽어옵니다.
  const scriptText = fs.readFileSync(scriptPath, "utf-8");

  console.log("⚙️ Converting audio to 16kHz (Required by Whisper)...");
  execSync(`ffmpeg -i "${inputAudioPath}" -ar 16000 "${processedAudioPath}" -y`);

  console.log("🎙️ Transcribing audio. This may take a few minutes...");
  
  const whisperCppOutput = await transcribe({
    model: modelToUse, 
    whisperPath,
    whisperCppVersion: "1.5.5",
    inputPath: processedAudioPath,
    
    // 문장 단위 추출을 위해 false로 설정
    tokenLevelTimestamps: false, 
    
    // @ts-ignore
    language: "ko",
    // @ts-ignore
    prompt: scriptText, 

    // @ts-ignore
    tokensPerItem: 0
  });

  console.log("📝 Extracting sentence-level segments...");
  
  // Whisper가 출력한 문장(segment) 단위 데이터를 직접 가공합니다.
  // 이 방식은 바이트를 쪼개지 않으므로 '' 현상이 발생하지 않습니다.
  const cleanCaptions = whisperCppOutput.transcription.map((segment) => ({
    text: segment.text.trim(),
    startMs: segment.offsets.from,
    endMs: segment.offsets.to,
  }));

  console.log("💾 Saving captions JSON...");
  fs.writeFileSync(outputPath, JSON.stringify(cleanCaptions, null, 2));

  console.log("🧹 Cleaning up temporary audio file...");
  if (fs.existsSync(processedAudioPath)) {
    fs.unlinkSync(processedAudioPath);
  }

  console.log(`✅ Success! Captions generated at ${outputPath}`);
};

run().catch((error) => {
  console.error("❌ Error generating captions:", error);
  process.exit(1);
});