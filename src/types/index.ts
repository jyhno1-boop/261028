// 사이트 전체에서 사용하는 데이터의 "모양(타입)"을 정의하는 파일입니다.
// Phase 2에서 Firestore에 저장할 문서도 이 모양을 그대로 따릅니다.

/** 외부 공유 링크 (Google Drive 등). 파일은 직접 올리지 않고 링크만 등록합니다. */
export interface ExternalLink {
  label: string; // 화면에 보일 이름 (예: "발표 자료(PDF)")
  url: string; // 링크 주소
}

/** 연구 진행 상태: 진행중(ongoing) 또는 완료(completed) */
export type ResearchStatus = 'ongoing' | 'completed';

/** 연구 프로젝트 */
export interface Research {
  id: string;
  title: string; // 연구 제목
  summary: string; // 목록에 보일 짧은 요약
  description: string; // 상세 페이지에 보일 긴 설명
  tags: string[]; // 연구 분야 태그
  status: ResearchStatus;
  members: string[]; // 참여자
  links: ExternalLink[]; // 관련 링크
  createdAt: string; // 등록일 (예: "2026-09-01")
}

/** 수업 자료 */
export interface CourseMaterial {
  id: string;
  courseName: string; // 과목명
  semester: string; // 학기 (예: "2026-2학기")
  title: string; // 자료 제목
  description: string; // 설명
  links: ExternalLink[]; // 외부 링크
  createdAt: string;
}

/** 논문·발표 종류 */
export type PublicationType = 'journal' | 'conference' | 'presentation';

/** 논문·발표 */
export interface Publication {
  id: string;
  title: string;
  authors: string[]; // 저자 목록
  venue: string; // 게재지(학술지·학회 이름)
  year: number; // 연도
  type: PublicationType;
  link?: string; // 원문 링크 (없어도 됨)
  createdAt: string;
}

/** 토론 댓글 (연구 상세 페이지 하단) */
export interface Comment {
  id: string;
  researchId: string; // 어느 연구에 달린 댓글인지
  authorName: string; // 작성자 이름 (Phase 2부터 구글 로그인 이름 사용)
  content: string;
  createdAt: string; // 작성 시각 (예: "2026-10-20T14:30:00")
}

/** 홈 화면의 "최근 등록된 자료" 한 줄 */
export interface RecentItem {
  kind: 'research' | 'course' | 'publication';
  id: string;
  title: string;
  createdAt: string;
  path: string; // 클릭하면 이동할 사이트 내 주소
}
