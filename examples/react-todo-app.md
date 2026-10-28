# 사용 예시: React + TypeScript Todo 앱

**사용자 요청:**
> "React와 TypeScript로 Todo 앱을 만들고 싶어요. 로컬 스토리지 저장, 드래그앤드롭 정렬 기능이 필요합니다."

### 🔷 1단계: Sam의 구조 분석
- 목표: CRUD 기능 + 영속성 + 정렬 인터랙션을 갖춘 Todo 앱
- 범위: 단일 페이지 앱, 프론트엔드 전용
- 컨텍스트: 새 프로젝트, 기존 코드 없음
- 구조: 컴포넌트 기반, 상태 관리 필요

### 🔶 2단계: Jenny의 기술적 강화
- React 18 + TypeScript 5 + Vite
- 상태 관리: useReducer + 커스텀 훅(`useTodos`)
- 드래그앤드롭: @dnd-kit/core + @dnd-kit/sortable (react-beautiful-dnd는 유지보수 중단)
- 스타일: CSS Modules
- 테스트: Vitest + React Testing Library

### 🔹 3단계: Will의 최종 검토
- 타입 정의 명확화 → `Todo` 인터페이스 명시
- localStorage 파싱 실패 시 처리 추가
- 접근성(a11y): 키보드로도 정렬 가능해야 함
- 체크리스트 통과, 최종 프롬프트 확정

---

## 📋 최종 프롬프트

````markdown
## 🎯 작업 목표
React 18 + TypeScript로 할 일 추가/수정/삭제/완료 토글, localStorage 저장, 드래그앤드롭 정렬을 지원하는 Todo 앱을 만들어 주세요.

## 📋 배경 컨텍스트
새 프로젝트이며 기존 코드는 없습니다. 백엔드 없이 브라우저에서만 동작합니다.

## 🔧 기술 스택
- 언어: TypeScript 5 (strict 모드)
- 프레임워크: React 18, Vite
- 주요 라이브러리: @dnd-kit/core, @dnd-kit/sortable
- 테스트: Vitest, @testing-library/react

## 📝 상세 요구사항

### 필수 요구사항
1. 데이터 타입:
   ```ts
   interface Todo { id: string; text: string; completed: boolean; createdAt: number; }
   ```
2. 할 일 추가(빈 문자열·공백만 입력은 거부), 텍스트 수정, 삭제, 완료 토글
3. 드래그앤드롭으로 순서 변경 (마우스 + 키보드 지원)
4. 모든 변경 사항을 localStorage(`todos` 키)에 저장하고, 새로고침 후 복원
5. 상태 로직은 `useReducer` 기반 `useTodos` 커스텀 훅으로 분리

### 선택적 요구사항
1. 전체/진행 중/완료 필터
2. 완료 항목 일괄 삭제

## ⚠️ 제약사항 및 주의사항
- react-beautiful-dnd 사용 금지 (유지보수 중단)
- `any` 타입 사용 금지
- localStorage 데이터가 손상되었거나 파싱에 실패하면 빈 목록으로 시작하고 앱이 죽지 않아야 함

## 📐 코드 스타일 가이드
- 컴포넌트: PascalCase, 함수형 컴포넌트만 사용
- 파일 구조: `src/components/`, `src/hooks/`, `src/types/`
- 주석: 자명하지 않은 로직에만

## 🧪 테스트 요구사항
- `useTodos` 리듀서의 모든 액션 단위 테스트
- 추가/토글/삭제 컴포넌트 테스트
- localStorage 저장·복원 및 손상 데이터 처리 테스트

## 🪜 작업 순서
1. Vite 프로젝트 생성 및 의존성 설치 → `npm run dev` 동작 확인
2. 타입과 `useTodos` 훅 구현 → 리듀서 테스트 통과 확인
3. UI 컴포넌트 구현 → 수동 동작 확인
4. 드래그앤드롭 적용 → 마우스/키보드 정렬 확인
5. 컴포넌트 테스트 작성 → `npm test` 전체 통과 확인

## ✅ 완료 기준
- `npm run build`, `npm test`가 오류 없이 통과
- 새로고침 후에도 목록과 순서가 유지됨

## 📤 예상 출력 형식
각 파일을 경로와 함께 코드 블록으로 제시하고, 마지막에 실행 방법을 안내해 주세요.
````
