import { Link, useParams } from 'react-router-dom';
import { getResearchById } from '../lib/dataService';
import { formatDate } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import CommentSection from '../components/CommentSection';
import ExternalLinks from '../components/ExternalLinks';
import LoadState from '../components/LoadState';
import StatusBadge from '../components/StatusBadge';
import Tag from '../components/Tag';

// 연구 상세: 연구 정보 + 하단 토론 영역
export default function ResearchDetailPage() {
  // 주소의 :id 부분 (예: /research/r1 → "r1")
  const { id = '' } = useParams();
  const { data: research, loading, error } = useAsync(() => getResearchById(id), [id]);

  return (
    <div>
      <Link to="/research" className="text-sm text-brand-600 hover:underline">
        ← 연구 목록으로
      </Link>

      <LoadState loading={loading} error={error}>
        {research ? (
          <article className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={research.status} />
              <span className="text-xs text-gray-400">등록일 {formatDate(research.createdAt)}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{research.title}</h1>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {research.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            <p className="mt-6 leading-relaxed text-gray-700">{research.description}</p>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-gray-900">참여자</dt>
                <dd className="mt-2">
                  <ul className="space-y-1 text-sm text-gray-700">
                    {research.members.map((member) => (
                      <li key={member}>· {member}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900">관련 링크</dt>
                <dd className="mt-2 text-sm">
                  <ExternalLinks links={research.links} />
                </dd>
              </div>
            </dl>

            <CommentSection researchId={research.id} />
          </article>
        ) : (
          <p className="mt-6 text-gray-500">해당 연구를 찾을 수 없습니다.</p>
        )}
      </LoadState>
    </div>
  );
}
