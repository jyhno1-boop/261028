// 샘플 데이터(src/data/sample.ts)에서 자료를 꺼내 주는 출처입니다.
// Firebase 설정값이 없을 때(예: 내 컴퓨터에서 처음 실행할 때) 사용됩니다.

import { sampleComments, sampleCourses, samplePublications, sampleResearch } from '../../data/sample';
import type { DataSource } from './types';
import { toRecentItems } from './recent';

/** 등록일(createdAt) 기준 최신순 정렬 */
function byNewest<T extends { createdAt: string }>(a: T, b: T): number {
  return b.createdAt.localeCompare(a.createdAt);
}

export const sampleSource: DataSource = {
  async getResearchList(limitCount) {
    return [...sampleResearch].sort(byNewest).slice(0, limitCount);
  },
  async getResearchById(id) {
    return sampleResearch.find((r) => r.id === id) ?? null;
  },
  async getCourseMaterials(limitCount) {
    return [...sampleCourses].sort(byNewest).slice(0, limitCount);
  },
  async getCourseMaterialById(id) {
    return sampleCourses.find((c) => c.id === id) ?? null;
  },
  async getPublications(limitCount) {
    return [...samplePublications].sort((a, b) => b.year - a.year || byNewest(a, b)).slice(0, limitCount);
  },
  async getComments(researchId, limitCount) {
    return sampleComments
      .filter((c) => c.researchId === researchId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .slice(0, limitCount);
  },
  async getRecentItems(count) {
    return toRecentItems(sampleResearch, sampleCourses, samplePublications, count);
  },
  async getSiteStats() {
    return {
      ongoingResearch: sampleResearch.filter((r) => r.status === 'ongoing').length,
      publications: samplePublications.length,
      courseMaterials: sampleCourses.length,
    };
  },
};
