// 관리자 전용: 샘플 데이터(src/data/sample.ts)를 Firestore에 한 번에 올리는 기능입니다.
// 내 계정 페이지(/account)의 "샘플 데이터 올리기" 버튼에서 사용합니다.

import { collection, doc, getDocs, limit, query, writeBatch } from 'firebase/firestore/lite';
import { sampleComments, sampleCourses, samplePublications, sampleResearch } from '../data/sample';
import { db } from './firebase';

/** Firestore에 연구 자료가 하나라도 있는지 확인 (읽기 1회) */
export async function hasExistingData(): Promise<boolean> {
  if (!db) return false;
  const snap = await getDocs(query(collection(db, 'research'), limit(1)));
  return !snap.empty;
}

/** 샘플 데이터를 Firestore에 올립니다. 이미 데이터가 있으면 실행하지 않습니다. */
export async function seedSampleData(): Promise<void> {
  if (!db) throw new Error('Firebase 설정이 없습니다.');
  if (await hasExistingData()) throw new Error('이미 데이터가 있어 샘플 데이터를 올리지 않았습니다.');

  // 여러 건을 한 번에 저장 (중간에 실패하면 아무것도 저장되지 않음)
  const batch = writeBatch(db);

  // 문서 ID는 따로 관리되므로 내용에서는 id를 뺍니다.
  for (const { id, ...data } of sampleResearch) batch.set(doc(db, 'research', id), data);
  for (const { id, ...data } of sampleCourses) batch.set(doc(db, 'courses', id), data);
  for (const { id, ...data } of samplePublications) batch.set(doc(db, 'publications', id), data);
  for (const { id, researchId, ...data } of sampleComments) {
    batch.set(doc(db, 'research', researchId, 'comments', id), data);
  }

  await batch.commit();
}
