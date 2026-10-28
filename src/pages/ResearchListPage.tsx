import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getResearchList } from '../lib/dataService';
import { useAsync } from '../lib/useAsync';
import { usePageTitle } from '../lib/usePageTitle';
import Container from '../components/Container';
import FilterTabs from '../components/FilterTabs';
import { ArrowRightIcon } from '../components/Icons';
import LoadState from '../components/LoadState';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import Tag from '../components/Tag';
import type { ResearchStatus } from '../types';

type StatusFilter = 'all' | ResearchStatus;

// 연구 목록 (진행 상태로 걸러 보기 가능)
export default function ResearchListPage() {
  usePageTitle('연구');
  const { data: researchList, loading, error } = useAsync(() => getResearchList(), []);
  const [filter, setFilter] = useState<StatusFilter>('all');

  const list = researchList ?? [];
  const visible = filter === 'all' ? list : list.filter((r) => r.status === filter);

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="연구"
        description="연구실에서 진행 중이거나 완료한 연구 프로젝트를 소개합니다."
        breadcrumbs={[{ label: '연구' }]}
      />
      <Container className="py-12">
        <LoadState loading={loading} error={error}>
          <FilterTabs
            label="진행 상태"
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: '전체', count: list.length },
              { value: 'ongoing', label: '진행중', count: list.filter((r) => r.status === 'ongoing').length },
              { value: 'completed', label: '완료', count: list.filter((r) => r.status === 'completed').length },
            ]}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {visible.map((research) => (
              <Link
                key={research.id}
                to={`/research/${research.id}`}
                className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 transition hover:border-brand-200 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge status={research.status} />
                  {research.period && <span className="text-xs text-slate-400 tabular-nums">{research.period}</span>}
                </div>
                <h2 className="mt-3 text-lg leading-snug font-bold text-slate-900 group-hover:text-brand-700">{research.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{research.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {research.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  자세히 보기
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          {visible.length === 0 && <p className="text-slate-500">해당하는 연구가 없습니다.</p>}
        </LoadState>
      </Container>
    </>
  );
}
