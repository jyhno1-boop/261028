import { Link } from 'react-router-dom';
import { getResearchList } from '../lib/dataService';
import { useAsync } from '../lib/useAsync';
import LoadState from '../components/LoadState';
import PageTitle from '../components/PageTitle';
import StatusBadge from '../components/StatusBadge';
import Tag from '../components/Tag';

// 연구 목록
export default function ResearchListPage() {
  const { data: researchList, loading, error } = useAsync(() => getResearchList(), []);

  return (
    <div>
      <PageTitle title="연구" description="연구실에서 진행 중이거나 완료한 연구 프로젝트입니다." />
      <LoadState loading={loading} error={error}>
        <div className="space-y-4">
          {researchList?.map((research) => (
            <Link
              key={research.id}
              to={`/research/${research.id}`}
              className="block rounded-lg border border-gray-200 p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <StatusBadge status={research.status} />
              </div>
              <h2 className="mt-2 text-lg font-semibold text-gray-900">{research.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{research.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {research.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </Link>
          ))}
          {researchList?.length === 0 && <p className="text-gray-500">등록된 연구가 없습니다.</p>}
        </div>
      </LoadState>
    </div>
  );
}
