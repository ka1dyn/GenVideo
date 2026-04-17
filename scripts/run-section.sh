#!/bin/bash

# ─────────────────────────────────────────────
# run-section.sh — Execute Gemini CLI per Scene
# Usage: ./scripts/run-section.sh <project_id> <section>
# ─────────────────────────────────────────────

PROJECT_ID=$1
SECTION=$2

if [ -z "$PROJECT_ID" ] || [ -z "$SECTION" ]; then
  echo "Usage: ./scripts/run-section.sh <project_id> <section>"
  exit 1
fi

TARGET_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCENES_DIR="$TARGET_DIR/src/projects/$PROJECT_ID/$SECTION/plans"

if [ ! -d "$SCENES_DIR" ]; then
  echo "⏭️  [$SECTION] 섹션의 기획 폴더가 존재하지 않습니다: $SCENES_DIR"
  exit 0
fi

echo "=== [$SECTION] 에이전트 루프 시작 ==="

# SceneX.md 파일들을 숫자 순서대로 정렬하여 배열로 저장
SCENE_FILES=()
while IFS= read -r f; do
  SCENE_FILES+=("$f")
done < <(ls "$SCENES_DIR"/Scene*.md 2>/dev/null | sort -V)

if [ ${#SCENE_FILES[@]} -eq 0 ]; then
  echo "⏭️  [$SECTION] Scene 파일이 없습니다."
  exit 0
fi

echo "📂 [$SECTION] 총 ${#SCENE_FILES[@]}개 Scene 감지"

# ── 허용 경로 패턴 (yolo 안전장치) ──
ALLOWED_PATTERN="src/projects/$PROJECT_ID/$SECTION/(scenes|plans|components)/"

FAILED_SCENES=()
SKIPPED=0
COMPLETED=0

for scene_file in "${SCENE_FILES[@]}"; do
   SCENE_NAME=$(basename "$scene_file" .md)
   
   # ── 이미 구현된 Scene 스킵 ──
   SCENE_TSX="$TARGET_DIR/src/projects/$PROJECT_ID/$SECTION/scenes/${SCENE_NAME}.tsx"
   if [ -f "$SCENE_TSX" ] && ! grep -q "TODO: 구현" "$SCENE_TSX"; then
     echo "⏭️  [$SECTION/$SCENE_NAME] 이미 구현 완료. 스킵."
     SKIPPED=$((SKIPPED + 1))
     continue
   fi
   
   echo "▶️  Running agent for $SECTION / $SCENE_NAME..."
   
   # ── 최대 3회 재시도 ──
   SUCCESS=false
   for attempt in 1 2 3; do
     HOME=~/GeminiCLI/$SECTION gemini --yolo -p "/implement-scene $PROJECT_ID $SECTION $SCENE_NAME"
     if [ $? -eq 0 ]; then
       SUCCESS=true
       break
     fi
     echo "⚠️  [$SECTION/$SCENE_NAME] 시도 $attempt/3 실패. $((attempt * 5))초 후 재시도..."
     sleep $((attempt * 5))
   done
   
   # ── yolo 안전장치: 예상 외 파일 변경 롤백 ──
   UNEXPECTED=$(git diff --name-only 2>/dev/null | grep -v -E "$ALLOWED_PATTERN" | grep -v "^$")
   if [ -n "$UNEXPECTED" ]; then
     echo "⚠️  [$SECTION/$SCENE_NAME] 예상 외 파일 변경 감지 → 롤백:"
     echo "$UNEXPECTED" | sed 's/^/   /'
     echo "$UNEXPECTED" | xargs git checkout -- 2>/dev/null
   fi
   
   if [ "$SUCCESS" = true ]; then
     echo "✅ [$SECTION/$SCENE_NAME] 완료."
     COMPLETED=$((COMPLETED + 1))
   else
     echo "❌ [$SECTION/$SCENE_NAME] 3회 시도 후 실패. 다음 Scene으로 진행."
     FAILED_SCENES+=("$SCENE_NAME")
   fi
   
   sleep 2
done

# ── 결과 요약 ──
echo ""
echo "═══ [$SECTION] 실행 결과 ═══"
echo "  완료: $COMPLETED / 스킵: $SKIPPED / 실패: ${#FAILED_SCENES[@]}"

if [ ${#FAILED_SCENES[@]} -gt 0 ]; then
  echo "  실패 목록: ${FAILED_SCENES[*]}"
  echo "  재실행: ./scripts/run-section.sh $PROJECT_ID $SECTION"
  exit 1
fi

echo "🎉 [$SECTION] 모든 Scene 처리 완료!"
