// Firestore 데이터베이스에서 자료를 읽어 오는 출처입니다.
//
// [Firestore 구조]
//   research/{연구ID}                      연구
//   research/{연구ID}/comments/{댓글ID}     해당 연구의 토론 댓글
//   courses/{자료ID}                        수업 자료
//   publications/{논문ID}                   논문·발표
//   admins/{이메일}                          관리자 목록 (Firebase 콘솔에서 직접 추가)
//
// [무료 요금제(Spark) 사용량 절약 원칙]
//  - 실시간 구독 기능이 없는 가벼운 버전(firestore/lite)을 사용하여, 필요할 때 한 번만 읽습니다(getDocs/getDoc).
//  - 목록은 항상 limit()으로 개수를 제한합니다.
//  - 개수 세기는 getCount()를 사용합니다. (문서를 모두 읽지 않아 읽기 횟수가 거의 들지 않음)
//  - 복합 색인(index)이 필요 없는 단순한 조회만 사용합니다.

import {
  collection,
  doc,
  getCount,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  type DocumentData,
  type DocumentSnapshot,
  type Firestore,
  type QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import type { Comment, CourseMaterial, Publication, Research } from '../../types';
import type { DataSource } from './types';
import { toRecentItems } from './recent';

/** Firestore 문서를 { id, ...내용 } 모양으로 바꿉니다. */
function fromDoc<T>(snap: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>): T {
  return { id: snap.id, ...snap.data() } as T;
}

/** 컬렉션에서 최신순으로 limitCount개를 읽습니다. */
async function listNewest<T>(db: Firestore, name: string, limitCount: number): Promise<T[]> {
  const snap = await getDocs(query(collection(db, name), orderBy('createdAt', 'desc'), limit(limitCount)));
  return snap.docs.map((d) => fromDoc<T>(d));
}

/** 문서 하나를 읽습니다 (없으면 null). */
async function getOne<T>(db: Firestore, name: string, id: string): Promise<T | null> {
  const snap = await getDoc(doc(db, name, id));
  return snap.exists() ? fromDoc<T>(snap) : null;
}

export function createFirestoreSource(db: Firestore): DataSource {
  return {
    getResearchList: (limitCount) => listNewest<Research>(db, 'research', limitCount),
    getResearchById: (id) => getOne<Research>(db, 'research', id),
    getCourseMaterials: (limitCount) => listNewest<CourseMaterial>(db, 'courses', limitCount),
    getCourseMaterialById: (id) => getOne<CourseMaterial>(db, 'courses', id),

    async getPublications(limitCount) {
      // 최신 등록순으로 읽은 뒤 화면에서는 연도순으로 정렬
      const list = await listNewest<Publication>(db, 'publications', limitCount);
      return list.sort((a, b) => b.year - a.year || b.createdAt.localeCompare(a.createdAt));
    },

    async getComments(researchId, limitCount) {
      const snap = await getDocs(
        query(collection(db, 'research', researchId, 'comments'), orderBy('createdAt', 'asc'), limit(limitCount)),
      );
      return snap.docs.map((d) => ({ ...fromDoc<Comment>(d), researchId }));
    },

    async getRecentItems(count) {
      // 세 컬렉션에서 각각 count개씩만 읽어 합칩니다.
      const [research, courses, publications] = await Promise.all([
        listNewest<Research>(db, 'research', count),
        listNewest<CourseMaterial>(db, 'courses', count),
        listNewest<Publication>(db, 'publications', count),
      ]);
      return toRecentItems(research, courses, publications, count);
    },

    async getSiteStats() {
      const [ongoing, publications, courses] = await Promise.all([
        getCount(query(collection(db, 'research'), where('status', '==', 'ongoing'))),
        getCount(collection(db, 'publications')),
        getCount(collection(db, 'courses')),
      ]);
      return {
        ongoingResearch: ongoing.data().count,
        publications: publications.data().count,
        courseMaterials: courses.data().count,
      };
    },
  };
}
