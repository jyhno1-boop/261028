import { Link } from 'react-router-dom';
import { siteInfo } from '../data/site';
import { getRecentItems, getSiteStats } from '../lib/dataService';
import { formatDate } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { usePageTitle } from '../lib/usePageTitle';
import Container from '../components/Container';
import { ArrowRightIcon, MailIcon, MapPinIcon } from '../components/Icons';
import LoadState from '../components/LoadState';
import SectionHeading from '../components/SectionHeading';
import type { RecentItem } from '../types';

// 자료 종류별 표시 이름
const kindLabel: Record<RecentItem['kind'], string> = {
  research: '연구',
  course: '수업 자료',
  publication: '논문·발표',
};

// 홈: 연구실 소개, 연구 분야, 최근 등록된 자료, 연구실 안내
export default function HomePage() {
  usePageTitle();
  const { data: stats } = useAsync(() => getSiteStats(), []);
  const { data: recentItems, loading, error } = useAsync(() => getRecentItems(5), []);

  const statItems = [
    { label: '진행 중인 연구', value: stats?.ongoingResearch },
    { label: '논문·발표', value: stats?.publications },
    { label: '수업 자료', value: stats?.courseMaterials },
  ];

  return (
    <>
      {/* 첫 화면: 연구실 소개 */}
      <section className="relative overflow-hidden bg-brand-800 text-white">
        {/* 배경의 옅은 격자 무늬 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[3fr_2fr] lg:items-end">
          <div>
            <p className="text-sm font-medium text-brand-200">{siteInfo.university}</p>
            <h1 className="mt-3 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">{siteInfo.labName}</h1>
            <p className="mt-2 text-lg text-white/70">{siteInfo.labNameEn}</p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{siteInfo.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/research"
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50"
              >
                연구 살펴보기
                <ArrowRightIcon />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                수업 자료
              </Link>
            </div>
          </div>

          {/* 숫자 요약 */}
          <dl className="grid grid-cols-3 divide-x divide-white/15 border-t border-white/20 pt-6 lg:border-t-0 lg:pt-0">
            {statItems.map((item) => (
              <div key={item.label} className="px-4 first:pl-0">
                <dt className="text-xs text-white/60 sm:text-sm">{item.label}</dt>
                <dd className="mt-1 text-3xl font-bold tabular-nums sm:text-4xl">{item.value ?? '–'}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 연구 분야 */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Research Areas" title="연구 분야" />
          <div className="grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:grid-cols-3">
            {siteInfo.researchAreas.map((area, index) => (
              <div key={area.name} className="bg-white p-6 sm:p-8">
                <p className="text-sm font-semibold text-brand-600 tabular-nums">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{area.name}</h3>
                <p className="mt-0.5 text-xs tracking-wide text-slate-400">{area.nameEn}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{area.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 최근 등록된 자료 + 연구실 안내 */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Latest" title="최근 등록된 자료" />
            <LoadState loading={loading} error={error}>
              <ul className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
                {recentItems?.map((item) => (
                  <li key={`${item.kind}-${item.id}`}>
                    <Link
                      to={item.path}
                      className="group flex flex-col gap-1 px-5 py-4 hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-5"
                    >
                      <span className="w-20 shrink-0 text-xs font-semibold text-brand-600">{kindLabel[item.kind]}</span>
                      <span className="flex-1 font-medium text-slate-800 group-hover:text-brand-700">{item.title}</span>
                      <time dateTime={item.createdAt} className="shrink-0 text-xs text-slate-400 tabular-nums">
                        {formatDate(item.createdAt)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </LoadState>
          </div>

          <aside>
            <SectionHeading eyebrow="Contact" title="연구실 안내" />
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-xs text-slate-500">지도교수</p>
              <p className="mt-0.5 font-bold text-slate-900">{siteInfo.professor}</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  {siteInfo.address}
                </li>
                <li className="flex items-start gap-2.5">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <a href={`mailto:${siteInfo.email}`} className="text-brand-600 hover:underline">
                    {siteInfo.email}
                  </a>
                </li>
              </ul>
              {siteInfo.recruitment && (
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-sm font-semibold text-slate-900">대학원생 모집</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{siteInfo.recruitment}</p>
                </div>
              )}
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
