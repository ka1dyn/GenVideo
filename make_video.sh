#!/bin/bash

# ─────────────────────────────────────────────
# make_video.sh — N-pane 병렬 Gemini CLI 오케스트레이션
#
# Usage: ./make_video.sh <project_id>
# Example: ./make_video.sh aiwar2
# ─────────────────────────────────────────────

PROJECT_ID=${1:?"Usage: ./make_video.sh <project_id>"}
TARGET_DIR="~/Projects/GenVideo"
PROJECT_PUBLIC="public/${PROJECT_ID}"

if [ ! -d "$PROJECT_PUBLIC" ]; then
  echo "❌ 프로젝트 디렉토리가 없습니다: $PROJECT_PUBLIC"
  exit 1
fi

# ── 존재하는 섹션만 동적으로 감지 (intro → body1~N → outro 순서 보장) ──
SECTIONS=()

# intro 먼저
[ -d "$PROJECT_PUBLIC/intro" ] && SECTIONS+=("intro")

# body1 ~ bodyN (숫자 순서 정렬)
BODY_SECTIONS=()
for d in "$PROJECT_PUBLIC"/body*/; do
  [ -d "$d" ] && BODY_SECTIONS+=("$(basename "$d")")
done
IFS=$'\n' BODY_SORTED=($(printf '%s\n' "${BODY_SECTIONS[@]}" | sort -V)); unset IFS
SECTIONS+=("${BODY_SORTED[@]}")

# outro 마지막
[ -d "$PROJECT_PUBLIC/outro" ] && SECTIONS+=("outro")

PANE_COUNT=${#SECTIONS[@]}

if [ "$PANE_COUNT" -eq 0 ]; then
  echo "❌ 섹션이 하나도 없습니다."
  exit 1
fi

echo "=== make_video.sh ==="
echo "Project: ${PROJECT_ID}"
echo "Detected sections: ${SECTIONS[*]}"
echo "Total panes: ${PANE_COUNT}"
echo ""

# 각 섹션의 Scene 수 표시
for s in "${SECTIONS[@]}"; do
  SCENE_COUNT=$(ls "src/projects/${PROJECT_ID}/${s}/plans/"Scene*.md 2>/dev/null | wc -l | tr -d ' ')
  echo "  📂 ${s}: ${SCENE_COUNT} scenes"
done
echo ""

# ── iTerm2 pane 분할 계산 ──
if [ "$PANE_COUNT" -le 1 ]; then
  COLS=1; ROWS=1
elif [ "$PANE_COUNT" -le 2 ]; then
  COLS=2; ROWS=1
elif [ "$PANE_COUNT" -le 4 ]; then
  COLS=2; ROWS=2
elif [ "$PANE_COUNT" -le 6 ]; then
  COLS=3; ROWS=2
elif [ "$PANE_COUNT" -le 9 ]; then
  COLS=3; ROWS=3
else
  COLS=4; ROWS=$(( (PANE_COUNT + 3) / 4 ))
fi

echo "Grid: ${COLS}x${ROWS} (${PANE_COUNT} panes)"
echo ""

osascript - "$TARGET_DIR" "$PROJECT_ID" "$COLS" "$ROWS" "${SECTIONS[@]}" <<'EOF'
on run argv
    set targetDir to item 1 of argv
    set projectId to item 2 of argv
    set colCount to (item 3 of argv) as integer
    set rowCount to (item 4 of argv) as integer
    set sectionNames to items 5 thru -1 of argv
    set paneCount to count of sectionNames

    tell application "iTerm2"
        -- 1. 새 창 생성 및 크기 설정
        set newWin to (create window with default profile)
        tell newWin
            set bounds to {50, 50, 1400, 1000}

            -- 2. 동적 화면 분할
            -- 2a. 세로 분할 (열 생성)
            set s1 to current session of current tab
            repeat with c from 2 to colCount
                tell s1 to split vertically with default profile
            end repeat

            -- 2b. 각 열에서 가로 분할 (행 생성)
            set colSessions to sessions of current tab
            repeat with c from 1 to colCount
                tell item c of colSessions
                    repeat with r from 2 to rowCount
                        split horizontally with default profile
                    end repeat
                end tell
            end repeat

            -- 3. 각 pane에 명령어 전송
            set allSessions to sessions of current tab

            repeat with i from 1 to paneCount
                set currentSection to item i of sectionNames

                -- 0~10초 랜덤 딜레이 (CPU/IO 피크 분산)
                set waitTime to (random number) * 10

                tell item i of allSessions
                    write text "cd " & targetDir & " && source ~/.zshrc && sleep " & waitTime & " && ./scripts/run-section.sh " & projectId & " " & currentSection
                end tell
            end repeat
        end tell
    end tell
end run
EOF

echo "✅ iTerm2 ${PANE_COUNT}-pane 실행 완료"