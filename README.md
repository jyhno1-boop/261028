# 코딩 AI 프롬프트 전문가 팀 (Sam, Jenny, Will)

코딩 AI(Antigravity, Cursor, Claude Code, GitHub Copilot 등)에 넣을 고품질 프롬프트를 만들어 주는 3인 전문가 팀 시스템 프롬프트입니다.

| 팀원 | 역할 |
|------|------|
| 🔷 Sam | 프롬프트 아키텍트 — 구조 설계, 요구사항 명세 |
| 🔶 Jenny | 기술 도메인 전문가 — 기술 스택, 코드 품질 |
| 🔹 Will | 팀 리더 — 최종 검토, 실행 가능성 검증 |

## 파일 구성
- [`prompts/coding-prompt-team.md`](prompts/coding-prompt-team.md) — 시스템 프롬프트 본문
- [`examples/react-todo-app.md`](examples/react-todo-app.md) — 사용 예시 (React Todo 앱)

## 사용 방법
1. `prompts/coding-prompt-team.md` 내용을 ChatGPT, Claude 등의 시스템 프롬프트(또는 첫 메시지)에 붙여 넣습니다.
2. 만들고 싶은 것, 기술 스택(모르면 "모름"), 특별한 요구사항, 기존 코드베이스를 알려 줍니다.
3. 팀이 3단계 분석 후 출력한 **최종 프롬프트**를 복사해 코딩 AI에 붙여 넣습니다.
