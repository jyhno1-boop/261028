import { useState } from 'react';
import { getPublications } from '../lib/dataService';
import { isSafeUrl } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { usePageTitle } from '../lib/usePageTitle';
import Container from '../components/Container';
import FilterTabs from '../components/FilterTabs';
import { ExternalLinkIcon } from '../components/Icons';
import LoadState from '../components/LoadState';
import PageHeader from '../components/PageHeader';
import type { Publication, PublicationType } from '../types';

// 논문·발표 종류별 표시 이름
const typeLabel: Record<PublicationType, string> = {
  journal: '학술지',
  conference: '학술대회',
  presentation: '발표',
};

type TypeFilter = 'all' | PublicationType;

/** 연도별로 묶습니다 (최신 연도부터). */
function groupByYear(list: Publication[]): [number, Publication[]][] {
  const groups = new Map<number, Publication[]>();
  for (const pub of list) {
    groups.set(pub.year, [...(groups.get(pub.year) ?? []), pub]);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

// 논문·발표 목록 (연도별, 종류로 걸러 보기 가능)
export default function PublicationListPage() {
  usePageTitle('논문·발표');
  const { data: publications, loading, error } = useAsync(() => getPublications(), []);
  const [filter, setFilter] = useState<TypeFilter>('all');

  const list = publications ?? [];
  const visible = filter === 'all' ? list : list.filter((p) => p.type === filter);
  const countOf = (type: PublicationType): number => list.filter((p) => p.type === type).length;

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="논문·발표"
        description="연구실의 학술지 논문, 학술대회 발표, 초청 강연 목록입니다."
        breadcrumbs={[{ label: '논문·발표' }]}
      />
      <Container className="py-12">
        <LoadState loading={loading} error={error}>
          <FilterTabs
            label="종류"
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: '전체', count: list.length },
              { value: 'journal', label: '학술지', count: countOf('journal') },
              { value: 'conference', label: '학술대회', count: countOf('conference') },
              { value: 'presentation', label: '발표', count: countOf('presentation') },
            ]}
          />
          <div className="space-y-12">
            {groupByYear(visible).map(([year, pubs]) => (
              <section key={year} className="grid gap-4 md:grid-cols-[6rem_1fr]">
                <h2 className="text-2xl font-bold text-brand-700 tabular-nums md:pt-4">{year}</h2>
                <ol className="divide-y divide-slate-200 border-t border-slate-200 md:border-t-0">
                  {pubs.map((pub) => (
                    <li key={pub.id} className="py-5 first:pt-4">
                      <span className="inline-block rounded border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {typeLabel[pub.type]}
                      </span>
                      <p className="mt-2 leading-snug font-semibold text-slate-900">{pub.title}</p>
                      {/* 학술 인용 형식: 저자. 게재지, 연도. */}
                      <p className="mt-1.5 text-sm text-slate-600">
                        {pub.authors.join(', ')}. <span className="italic">{pub.venue}</span>, {pub.year}.
                      </p>
                      {pub.link && isSafeUrl(pub.link) && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                          원문 보기
                          <ExternalLinkIcon className="h-3.5 w-3.5" />
                          <span className="sr-only">(새 창에서 열림)</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
          {visible.length === 0 && <p className="text-slate-500">해당하는 논문·발표가 없습니다.</p>}
        </LoadState>
      </Container>
    </>
  );
}
