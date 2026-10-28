import { Link } from 'react-router-dom';
import { getCourseMaterials } from '../lib/dataService';
import { useAsync } from '../lib/useAsync';
import LoadState from '../components/LoadState';
import PageTitle from '../components/PageTitle';
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
  const { data: materials, loading, error } = useAsync(() => getCourseMaterials(), []);

  return (
    <div>
      <PageTitle title="수업 자료" description="강의 슬라이드, 실습 자료 등을 과목별로 모았습니다." />
      <LoadState loading={loading} error={error}>
        <div className="space-y-10">
          {materials &&
            groupByCourse(materials).map(([courseName, list]) => (
              <section key={courseName}>
                <h2 className="border-b-2 border-brand-600 pb-2 text-lg font-bold text-gray-900">{courseName}</h2>
                <ul className="divide-y divide-gray-100">
                  {list.map((material) => (
                    <li key={material.id}>
                      <Link to={`/courses/${material.id}`} className="block py-4 hover:bg-gray-50 sm:px-2">
                        <span className="text-xs font-medium text-gray-500">{material.semester}</span>
                        <p className="mt-0.5 font-medium text-gray-900">{material.title}</p>
                        <p className="mt-1 text-sm text-gray-600">{material.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          {materials?.length === 0 && <p className="text-gray-500">등록된 수업 자료가 없습니다.</p>}
        </div>
      </LoadState>
    </div>
  );
}
