import { Link } from 'react-router-dom';
import { siteInfo } from '../data/site';
import { getRecentItems } from '../lib/dataService';
import { formatDate } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import LoadState from '../components/LoadState';
import type { RecentItem } from '../types';

// 자료 종류별 표시 이름
const kindLabel: Record<RecentItem['kind'], string> = {
  research: '연구',
  course: '수업',
  publication: '논문·발표',
};

// 홈: 연구실 소개, 연구 분야, 최근 등록된 자료
export default function HomePage() {
  const { data: recentItems, loading, error } = useAsync(() => getRecentItems(5), []);

  return (
    <div className="space-y-14">
      {/* 연구실 소개 */}
      <section className="rounded-xl bg-brand-50 px-6 py-10 sm:px-10">
        <p className="text-sm font-semibold text-brand-600">{siteInfo.university}</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{siteInfo.labName}</h1>
        <p className="mt-1 text-gray-500">{siteInfo.labNameEn}</p>
        <p className="mt-6 max-w-2xl leading-relaxed text-gray-700">{siteInfo.intro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/research" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
            연구 보기
          </Link>
          <Link
            to="/courses"
            className="rounded-md border border-brand-600 bg-white px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100"
          >
            수업 자료 보기
          </Link>
        </div>
      </section>

      {/* 연구 분야 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">연구 분야</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {siteInfo.researchAreas.map((area) => (
            <div key={area.name} className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-brand-700">{area.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 최근 등록된 자료 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900">최근 등록된 자료</h2>
        <div className="mt-4">
          <LoadState loading={loading} error={error}>
            <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
              {recentItems?.map((item) => (
                <li key={`${item.kind}-${item.id}`}>
                  <Link to={item.path} className="flex flex-col gap-1 px-4 py-3 hover:bg-gray-50 sm:flex-row sm:items-center sm:gap-3">
                    <span className="w-20 shrink-0 text-xs font-semibold text-brand-600">{kindLabel[item.kind]}</span>
                    <span className="flex-1 text-gray-800">{item.title}</span>
                    <span className="shrink-0 text-xs text-gray-400">{formatDate(item.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </LoadState>
        </div>
      </section>
    </div>
  );
}
