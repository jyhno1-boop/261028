// 데이터를 불러오는 모든 함수는 이 파일을 통해서만 사용합니다.
// 화면(페이지)들은 데이터가 어디서 오는지 모르고 이 함수들만 호출합니다.
//
// - Firebase 설정값이 있으면 → Firestore에서 읽음 (sources/firestoreSource.ts)
// - 설정값이 없으면       → 샘플 데이터 사용 (sources/sampleSource.ts)
//
// 같은 자료를 여러 번 보더라도 Firestore를 한 번만 읽도록, 한 번 읽은 결과는
// 페이지를 새로고침하기 전까지 기억해 둡니다(캐시). → 무료 사용량 절약

import type { Comment, CourseMaterial, Publication, RecentItem, Research, SiteStats } from '../types';
import { db, isFirebaseConfigured } from './firebase';
import { createFirestoreSource } from './sources/firestoreSource';
import { sampleSource } from './sources/sampleSource';
import type { DataSource } from './sources/types';

/** 목록 한 번에 불러올 최대 개수 */
export const PAGE_SIZE = 20;

/** 지금 샘플 데이터를 쓰는 중인지 (화면 상단 안내 표시용) */
export const isUsingSampleData: boolean = !isFirebaseConfigured;

const source: DataSource = db ? createFirestoreSource(db) : sampleSource;

// ---------- 캐시(한 번 읽은 결과 기억) ----------
const cache = new Map<string, Promise<unknown>>();

function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit) return hit as Promise<T>;
  const promise = load().catch((error: unknown) => {
    // 실패한 결과는 기억하지 않아, 다음에 다시 시도할 수 있게 합니다.
    cache.delete(key);
    console.error(`[dataService] ${key} 불러오기 실패`, error);
    throw error;
  });
  cache.set(key, promise);
  return promise;
}

/** 기억해 둔 결과를 모두 지웁니다. (데이터를 새로 올린 뒤 사용) */
export function clearDataCache(): void {
  cache.clear();
}

// ---------- 연구 ----------

/** 연구 목록 (최신순) */
export function getResearchList(): Promise<Research[]> {
  return cached('researchList', () => source.getResearchList(PAGE_SIZE));
}

/** 연구 하나 (없으면 null) */
export function getResearchById(id: string): Promise<Research | null> {
  return cached(`research/${id}`, () => source.getResearchById(id));
}

// ---------- 수업 자료 ----------

/** 수업 자료 목록 (최신순) */
export function getCourseMaterials(): Promise<CourseMaterial[]> {
  return cached('courseList', () => source.getCourseMaterials(PAGE_SIZE));
}

/** 수업 자료 하나 (없으면 null) */
export function getCourseMaterialById(id: string): Promise<CourseMaterial | null> {
  return cached(`course/${id}`, () => source.getCourseMaterialById(id));
}

// ---------- 논문·발표 ----------

/** 논문·발표 목록 (연도 최신순) */
export function getPublications(): Promise<Publication[]> {
  return cached('publicationList', () => source.getPublications(PAGE_SIZE));
}

// ---------- 토론(댓글) ----------

/** 특정 연구에 달린 댓글 목록 (오래된 순) */
export function getComments(researchId: string): Promise<Comment[]> {
  return cached(`comments/${researchId}`, () => source.getComments(researchId, PAGE_SIZE));
}

// ---------- 홈 화면 ----------

/** 최근 등록된 자료 (연구·수업·논문을 합쳐 최신순으로 count개) */
export function getRecentItems(count = 5): Promise<RecentItem[]> {
  return cached(`recent/${count}`, () => source.getRecentItems(count));
}

/** 홈 화면 상단의 숫자 요약 */
export function getSiteStats(): Promise<SiteStats> {
  return cached('stats', () => source.getSiteStats());
}
