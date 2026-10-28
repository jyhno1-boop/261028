import { Link, useParams } from 'react-router-dom';
import { getResearchById } from '../lib/dataService';
import { formatDate } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { usePageTitle } from '../lib/usePageTitle';
import CommentSection from '../components/CommentSection';
import Container from '../components/Container';
import ExternalLinks from '../components/ExternalLinks';
import { ArrowLeftIcon } from '../components/Icons';
import LoadState from '../components/LoadState';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import Tag from '../components/Tag';

// 연구 상세: 왼쪽 본문(개요 + 토론), 오른쪽 요약 정보
export default function ResearchDetailPage() {
  // 주소의 :id 부분 (예: /research/r1 → "r1")
  const { id = '' } = useParams();
  const { data: research, loading, error } = useAsync(() => getResearchById(id), [id]);
  usePageTitle(research?.title ?? '연구');

  if (loading || error) {
    return (
      <Container className="py-12">
        <LoadState loading={loading} error={error}>
          {null}
        </LoadState>
      </Container>
    );
  }

  if (!research) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-600">해당 연구를 찾을 수 없습니다.</p>
        <Link to="/research" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          <ArrowLeftIcon /> 연구 목록으로
        </Link>
      </Container>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title={research.title}
        breadcrumbs={[{ label: '연구', to: '/research' }, { label: research.title }]}
      >
        <div className="flex flex-wrap gap-1.5">
          {research.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </PageHeader>

      <Container className="grid gap-12 py-12 lg:grid-cols-[1fr_20rem]">
        {/* 본문 */}
        <article className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900">연구 개요</h2>
          <p className="mt-4 text-base leading-[1.85] text-slate-700">{research.description}</p>

          <h2 className="mt-12 text-lg font-bold text-slate-900">관련 자료</h2>
          <div className="mt-4">
            <ExternalLinks links={research.links} />
          </div>

          <CommentSection researchId={research.id} />
        </article>

        {/* 요약 정보 (넓은 화면에서는 스크롤해도 따라옴) */}
        <aside className="order-first lg:order-none">
          <dl className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 text-sm lg:sticky lg:top-28">
            <div>
              <dt className="text-xs font-semibold tracking-wide text-slate-500">진행 상태</dt>
              <dd className="mt-1.5">
                <StatusBadge status={research.status} />
              </dd>
            </div>
            {research.period && (
              <div>
                <dt className="text-xs font-semibold tracking-wide text-slate-500">연구 기간</dt>
                <dd className="mt-1 text-slate-800 tabular-nums">{research.period}</dd>
              </div>
            )}
            {research.funding && (
              <div>
                <dt className="text-xs font-semibold tracking-wide text-slate-500">지원 기관</dt>
                <dd className="mt-1 text-slate-800">{research.funding}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-semibold tracking-wide text-slate-500">참여 연구원</dt>
              <dd className="mt-1.5">
                <ul className="space-y-1 text-slate-800">
                  {research.members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <dt className="sr-only">등록일</dt>
              <dd className="text-xs text-slate-400">등록일 {formatDate(research.createdAt)}</dd>
            </div>
          </dl>
        </aside>
      </Container>
    </>
  );
}
