// 데이터를 불러오는 모든 함수를 이 파일 한 곳에 모았습니다.
// 화면(페이지)들은 데이터가 어디서 오는지 모르고 이 함수들만 호출합니다.
//
// [Phase 2 안내]
// 이 파일 내부만 Firestore 코드로 바꾸면 화면 코드는 고칠 필요가 없습니다.
// 그래서 지금은 샘플 데이터를 바로 돌려줘도 되지만, 일부러 모두 async 함수로 만들었습니다.
// Firestore 사용량(읽기 횟수)을 아끼기 위해 Phase 2에서도 다음 원칙을 지킵니다.
//  - 실시간 구독(onSnapshot) 대신 한 번만 불러오기(getDocs / getDoc)를 사용
//  - 목록은 limit()으로 개수를 제한 (아래 PAGE_SIZE 사용)

import type { Comment, CourseMaterial, Publication, RecentItem, Research, SiteStats } from '../types';
import { sampleComments, sampleCourses, samplePublications, sampleResearch } from '../data/sample';

/** 목록 한 번에 불러올 최대 개수 (Phase 2에서 Firestore limit()에 사용) */
export const PAGE_SIZE = 20;

/** 등록일(createdAt) 기준 최신순 정렬 */
function byNewest<T extends { createdAt: string }>(a: T, b: T): number {
  return b.createdAt.localeCompare(a.createdAt);
}

// ---------- 연구 ----------

/** 연구 목록 (최신순) */
export async function getResearchList(): Promise<Research[]> {
  return [...sampleResearch].sort(byNewest).slice(0, PAGE_SIZE);
}

/** 연구 하나 (없으면 null) */
export async function getResearchById(id: string): Promise<Research | null> {
  return sampleResearch.find((r) => r.id === id) ?? null;
}

// ---------- 수업 자료 ----------

/** 수업 자료 목록 (최신순) */
export async function getCourseMaterials(): Promise<CourseMaterial[]> {
  return [...sampleCourses].sort(byNewest).slice(0, PAGE_SIZE);
}

/** 수업 자료 하나 (없으면 null) */
export async function getCourseMaterialById(id: string): Promise<CourseMaterial | null> {
  return sampleCourses.find((c) => c.id === id) ?? null;
}

// ---------- 논문·발표 ----------

/** 논문·발표 목록 (연도 최신순) */
export async function getPublications(): Promise<Publication[]> {
  return [...samplePublications].sort((a, b) => b.year - a.year || byNewest(a, b)).slice(0, PAGE_SIZE);
}

// ---------- 토론(댓글) ----------

/** 특정 연구에 달린 댓글 목록 (오래된 순) */
export async function getComments(researchId: string): Promise<Comment[]> {
  return sampleComments
    .filter((c) => c.researchId === researchId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(0, PAGE_SIZE);
}

// ---------- 홈 화면 ----------

/** 최근 등록된 자료 (연구·수업·논문을 합쳐 최신순으로 count개) */
export async function getRecentItems(count = 5): Promise<RecentItem[]> {
  // Phase 2에서는 각 컬렉션에서 orderBy('createdAt','desc').limit(count)로 count개씩만 읽어 합칩니다.
  const items: RecentItem[] = [
    ...sampleResearch.map((r) => ({
      kind: 'research' as const,
      id: r.id,
      title: r.title,
      createdAt: r.createdAt,
      path: `/research/${r.id}`,
    })),
    ...sampleCourses.map((c) => ({
      kind: 'course' as const,
      id: c.id,
      title: `[${c.courseName}] ${c.title}`,
      createdAt: c.createdAt,
      path: `/courses/${c.id}`,
    })),
    ...samplePublications.map((p) => ({
      kind: 'publication' as const,
      id: p.id,
      title: p.title,
      createdAt: p.createdAt,
      path: '/publications',
    })),
  ];
  return items.sort(byNewest).slice(0, count);
}

/** 홈 화면 상단의 숫자 요약 */
export async function getSiteStats(): Promise<SiteStats> {
  // Phase 2에서는 getCountFromServer()로 개수만 셉니다. (문서를 모두 읽지 않아 읽기 횟수가 거의 들지 않음)
  return {
    ongoingResearch: sampleResearch.filter((r) => r.status === 'ongoing').length,
    publications: samplePublications.length,
    courseMaterials: sampleCourses.length,
  };
}
