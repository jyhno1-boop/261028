# 인간공학·안전공학 연구실 웹사이트

산업공학과 연구실 웹사이트입니다. 연구·수업 자료·논문을 보여주고, 이후 대학원생 토론(댓글) 기능으로 확장할 예정입니다.

- **현재 단계: Phase 1** — 샘플 데이터로 동작하는 화면 틀 (Firebase 연동 전)
- 기술: React 18 + Vite + TypeScript, Tailwind CSS, React Router / 배포: Netlify

## 내 컴퓨터에서 실행하기

[Node.js](https://nodejs.org) (LTS 버전)를 먼저 설치한 뒤, 이 폴더에서 터미널을 열고 실행합니다.

```bash
npm install
```

```bash
npm run dev
```

터미널에 나온 주소(보통 http://localhost:5173)를 브라우저에서 엽니다. 끝낼 때는 터미널에서 `Ctrl + C`.

## 내용 수정하는 곳

| 고치고 싶은 것 | 파일 |
|---|---|
| 연구실 이름, 교수명, 소개 문구, 연구 분야, 연락처 | `src/data/site.ts` |
| 연구·수업 자료·논문·댓글 샘플 | `src/data/sample.ts` (Phase 2부터는 Firestore) |
| 포인트 컬러, 글꼴 | `src/index.css` |

## 폴더 구조

```
src/
  pages/        페이지 화면 (홈, 연구 목록/상세, 수업 자료 목록/상세, 논문·발표)
  components/   여러 페이지에서 함께 쓰는 부품 (메뉴, 푸터, 댓글 영역 등)
  lib/          dataService.ts(데이터 불러오기 — Phase 2에서 이 파일만 Firestore로 교체), 도구 함수
  data/         연구실 정보, 샘플 데이터
  types/        데이터 모양(타입) 정의
netlify.toml    Netlify 배포 설정 (새로고침 404 방지 포함)
.env.example    Phase 2용 Firebase 환경변수 이름 목록
```

## 요금제 원칙 (Firebase Spark 무료)

- Firestore + 구글 로그인만 사용. Cloud Functions, Cloud Storage, Firebase Hosting 사용 안 함.
- 파일은 업로드하지 않고 Google Drive 공유 링크로 등록.
- 실시간 구독 대신 한 번만 불러오기, 목록은 개수 제한(`PAGE_SIZE`).

## 기타

- `prompts/`, `examples/`: 코딩 AI용 프롬프트 작성 도우미(Sam·Jenny·Will 팀) 자료
