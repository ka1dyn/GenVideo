# Chunk 8 Implementation Plan (Scene 15 & 16)

## Scene 15: 타격 목표의 변질 (Target Corruption)
- **컴포넌트 구조**:
  - `AbsoluteFill` (BG_BASE)
  - `MapGrid`: 은은한 그리드 배경
  - `CivilianNode`: "민간 시설" (Circle, STATE_SUCCESS_BG)
  - `MilitaryNode`: "군사 시설" (Triangle, STATE_ERROR_BG)
  - `CorruptionWarning`: "데이터 조작 발생" (Alert Badge)
- **연출 상세**:
  - 0-50f: 지도가 등장하고 민간 시설(초록)과 군사 시설(빨강)이 표시됨.
  - 70-120f: '슬쩍 오류를 심으면' 시점에 마우스 커서/데이터 입자가 민간 시설 노드를 건드림.
  - 130f~: 민간 시설 노드의 색상이 빨갛게 변하며 '추천 목표' 텍스트가 쾅 박힘.

## Scene 16: 새로운 전쟁 (New Era of War)
- **컴포넌트 구조**:
  - `AbsoluteFill` (BG_DARKEST transition)
  - `FinalTitle`: "새로운 형태의 전쟁" (Huge Typography)
  - `NetworkGrid`: 연결된 점과 선들이 배경에서 움직임
- **연출 상세**:
  - 0-30f: 배경이 어두워지며 중앙 텍스트가 `spring`으로 깊이감 있게 등장.
  - 전체 기간: 텍스트가 서서히 뒤로 멀어지며(`scale` 1.0 -> 0.95) 장엄한 마무리.
  - 배경의 네트워크 선들이 하나둘씩 붉게 변하며 점멸하다가 암전.
