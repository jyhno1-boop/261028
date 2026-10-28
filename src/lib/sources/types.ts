import type { Comment, CourseMaterial, Publication, RecentItem, Research, SiteStats } from '../../types';

// 데이터 출처(샘플 데이터 또는 Firestore)가 공통으로 갖춰야 할 함수 목록입니다.
export interface DataSource {
  getResearchList(limitCount: number): Promise<Research[]>;
  getResearchById(id: string): Promise<Research | null>;
  getCourseMaterials(limitCount: number): Promise<CourseMaterial[]>;
  getCourseMaterialById(id: string): Promise<CourseMaterial | null>;
  getPublications(limitCount: number): Promise<Publication[]>;
  getComments(researchId: string, limitCount: number): Promise<Comment[]>;
  getRecentItems(count: number): Promise<RecentItem[]>;
  getSiteStats(): Promise<SiteStats>;
}
