import { Link } from 'react-router-dom';
import { getCourseMaterials } from '../lib/dataService';
import { formatDate } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { usePageTitle } from '../lib/usePageTitle';
import Container from '../components/Container';
import { ChevronRightIcon } from '../components/Icons';
import LoadState from '../components/LoadState';
import PageHeader from '../components/PageHeader';
import type { CourseMaterial } from '../types';

/** 자료를 과목명별로 묶습니다. 예: { 인간공학: [...], 산업안전공학: [...] } */
function groupByCourse(materials: CourseMaterial[]): [string, CourseMaterial[]][] {
  const groups = new Map<string, CourseMaterial[]>();
  for (const material of materials) {
    const list = groups.get(material.courseName) ?? [];
    list.push(material);
    groups.set(material.courseName, list);
  }
  return [...groups.entries()];
}

// 수업 자료 목록 (과목별로 묶어서 표시)
export default function CourseListPage() {
  usePageTitle('수업 자료');
  const { data: materials, loading, error } = useAsync(() => getCourseMaterials(), []);

  return (
    <>
      <PageHeader
        eyebrow="Teaching"
        title="수업 자료"
        description="강의 슬라이드, 실습 자료, 과제 안내를 과목별로 모았습니다."
        breadcrumbs={[{ label: '수업 자료' }]}
      />
      <Container className="py-12">
        <LoadState loading={loading} error={error}>
          <div className="space-y-10">
            {materials &&
              groupByCourse(materials).map(([courseName, list]) => (
                <section key={courseName} className="overflow-hidden rounded-lg border border-slate-200">
                  <div className="flex items-baseline justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                    <h2 className="text-lg font-bold text-slate-900">{courseName}</h2>
                    <span className="text-sm text-slate-500">자료 {list.length}개</span>
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {list.map((material) => (
                      <li key={material.id}>
                        <Link
                          to={`/courses/${material.id}`}
                          className="group flex items-center gap-4 px-5 py-4 hover:bg-slate-50"
                        >
                          <span className="hidden w-24 shrink-0 text-xs font-semibold text-brand-600 sm:block">{material.semester}</span>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-semibold text-brand-600 sm:hidden">{material.semester}</span>
                            <p className="font-semibold text-slate-900 group-hover:text-brand-700">{material.title}</p>
                            <p className="mt-0.5 text-sm text-slate-600">{material.description}</p>
                          </div>
                          <time dateTime={material.createdAt} className="hidden shrink-0 text-xs text-slate-400 tabular-nums md:block">
                            {formatDate(material.createdAt)}
                          </time>
                          <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            {materials?.length === 0 && <p className="text-slate-500">등록된 수업 자료가 없습니다.</p>}
          </div>
        </LoadState>
      </Container>
    </>
  );
}
