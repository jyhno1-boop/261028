import { getPublications } from '../lib/dataService';
import { isSafeUrl } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import LoadState from '../components/LoadState';
import PageTitle from '../components/PageTitle';
import type { PublicationType } from '../types';

// 논문·발표 종류별 표시 이름
const typeLabel: Record<PublicationType, string> = {
  journal: '학술지',
  conference: '학술대회',
  presentation: '발표',
};

// 논문·발표 목록 (연도 최신순)
export default function PublicationListPage() {
  const { data: publications, loading, error } = useAsync(() => getPublications(), []);

  return (
    <div>
      <PageTitle title="논문·발표" description="연구실의 학술지 논문, 학술대회 발표, 초청 강연 목록입니다." />
      <LoadState loading={loading} error={error}>
        <ul className="space-y-4">
          {publications?.map((pub) => (
            <li key={pub.id} className="rounded-lg border border-gray-200 p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-brand-700">{pub.year}</span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-600">{typeLabel[pub.type]}</span>
              </div>
              <p className="mt-2 font-semibold text-gray-900">{pub.title}</p>
              <p className="mt-1 text-sm text-gray-600">{pub.authors.join(', ')}</p>
              <p className="text-sm italic text-gray-500">{pub.venue}</p>
              {pub.link && isSafeUrl(pub.link) && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-brand-600 hover:underline"
                >
                  🔗 원문 보기 <span className="text-xs text-gray-400">(새 창)</span>
                </a>
              )}
            </li>
          ))}
          {publications?.length === 0 && <p className="text-gray-500">등록된 논문·발표가 없습니다.</p>}
        </ul>
      </LoadState>
    </div>
  );
}
