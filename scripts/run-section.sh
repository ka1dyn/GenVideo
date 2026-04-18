#!/bin/bash

# ─────────────────────────────────────────────
# run-section.sh — Execute Gemini CLI per Section
# Usage: ./scripts/run-section.sh <project_id> <section>
# ─────────────────────────────────────────────

PROJECT_ID=$1
SECTION=$2

if [ -z "$PROJECT_ID" ] || [ -z "$SECTION" ]; then
  echo "Usage: ./scripts/run-section.sh <project_id> <section>"
  exit 1
fi

TARGET_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLANS_DIR="$TARGET_DIR/src/projects/$PROJECT_ID/$SECTION/plans"

if [ ! -d "$PLANS_DIR" ]; then
  echo "⏭️  [$SECTION] 섹션의 기획 폴더가 존재하지 않습니다: $PLANS_DIR"
  exit 0
fi

# ── Scene 수 감지 ──
SCENE_COUNT=$(ls "$PLANS_DIR"/Scene*.md 2>/dev/null | wc -l | tr -d ' ')

if [ "$SCENE_COUNT" -eq 0 ]; then
  echo "⏭️  [$SECTION] Scene 파일이 없습니다."
  exit 0
fi

echo "=== [$SECTION] 에이전트 시작 ==="
echo "📂 [$SECTION] 총 ${SCENE_COUNT}개 Scene 감지 (순차 처리)"

# ── Section 단위 1회 호출 (최대 2회 재시도) ──
SUCCESS=false
for attempt in 1 2; do
  echo "▶️  [$SECTION] 에이전트 실행 (시도 $attempt/2)..."
  HOME=~/GeminiCLI/$SECTION gemini --yolo -p "/implement-section $PROJECT_ID $SECTION"
  if [ $? -eq 0 ]; then
    SUCCESS=true
    break
  fi
  echo "⚠️  [$SECTION] 시도 $attempt/2 실패. 10초 후 재시도..."
  sleep 10
done

# ── 결과 요약 ──
echo ""
echo "═══ [$SECTION] 실행 결과 ═══"

if [ "$SUCCESS" = true ]; then
  echo "🎉 [$SECTION] 완료! (${SCENE_COUNT} scenes)"
else
  echo "❌ [$SECTION] 2회 시도 후 실패."
  echo "  재실행: ./scripts/run-section.sh $PROJECT_ID $SECTION"
  exit 1
fi
