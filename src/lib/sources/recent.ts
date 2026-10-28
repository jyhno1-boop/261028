import type { CourseMaterial, Publication, RecentItem, Research } from '../../types';

// 연구·수업 자료·논문을 "최근 등록된 자료" 한 줄 형태로 바꿔 최신순으로 합칩니다.
export function toRecentItems(
  research: Research[],
  courses: CourseMaterial[],
  publications: Publication[],
  count: number,
): RecentItem[] {
  const items: RecentItem[] = [
    ...research.map((r) => ({
      kind: 'research' as const,
      id: r.id,
      title: r.title,
      createdAt: r.createdAt,
      path: `/research/${r.id}`,
    })),
    ...courses.map((c) => ({
      kind: 'course' as const,
      id: c.id,
      title: `[${c.courseName}] ${c.title}`,
      createdAt: c.createdAt,
      path: `/courses/${c.id}`,
    })),
    ...publications.map((p) => ({
      kind: 'publication' as const,
      id: p.id,
      title: p.title,
      createdAt: p.createdAt,
      path: '/publications',
    })),
  ];
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, count);
}
