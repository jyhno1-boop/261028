# 인간공학·안전공학 연구실 웹사이트

산업공학과 연구실 웹사이트입니다. 연구·수업 자료·논문을 보여주고, 이후 대학원생 토론(댓글) 기능으로 확장할 예정입니다.

- **현재 단계: Phase 2** — Firebase(Firestore + 구글 로그인) 연동. Firebase 설정값이 없으면 샘플 데이터로 동작합니다.
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
  lib/          dataService.ts(모든 데이터 불러오기의 입구), firebase.ts(연결 설정), sources/(샘플·Firestore 출처)
  data/         연구실 정보, 샘플 데이터
  types/        데이터 모양(타입) 정의
netlify.toml    Netlify 배포 설정 (새로고침 404 방지 포함)
firestore.rules Firestore 보안 규칙 (콘솔에 붙여 넣기)
.env.example    Phase 2용 Firebase 환경변수 이름 목록
```

## Firebase 연결 (Phase 2)

1. `.env.example`을 복사해 `.env.local`을 만들고 Firebase 웹 앱 설정값을 채웁니다. (Netlify에는 Environment variables에 같은 이름으로 입력)
2. `firestore.rules` 내용을 Firebase 콘솔 > Firestore Database > 규칙 탭에 붙여 넣고 게시합니다.
3. Firestore에 `admins` 컬렉션을 만들고, 관리자 구글 이메일을 문서 ID로 하는 문서를 추가합니다.
4. 사이트에서 관리자 계정으로 로그인 → 내 계정(`/account`) → "샘플 데이터 올리기"

Firestore 구조:

```
research/{연구ID}                    연구
research/{연구ID}/comments/{댓글ID}   토론 댓글
courses/{자료ID}                      수업 자료
publications/{논문ID}                 논문·발표
admins/{이메일}                        관리자 목록 (콘솔에서만 추가)
```

## 요금제 원칙 (Firebase Spark 무료)

- Firestore + 구글 로그인만 사용. Cloud Functions, Cloud Storage, Firebase Hosting 사용 안 함.
- 파일은 업로드하지 않고 Google Drive 공유 링크로 등록.
- 실시간 구독이 없는 가벼운 `firestore/lite` 사용, 목록은 개수 제한(`PAGE_SIZE`), 한 번 읽은 결과는 기억(캐시), 개수는 `getCount()`로 셈.

## 기타

- `prompts/`, `examples/`: 코딩 AI용 프롬프트 작성 도우미(Sam·Jenny·Will 팀) 자료
