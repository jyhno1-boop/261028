import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import { ChevronRightIcon } from './Icons';

interface Crumb {
  label: string;
  to?: string; // 없으면 현재 페이지(링크 아님)
}

interface PageHeaderProps {
  eyebrow: string; // 제목 위의 작은 영문 표시
  title: string;
  description?: string;
  breadcrumbs?: Crumb[]; // 현재 위치 표시 (예: 홈 › 연구 › 연구 제목)
  children?: ReactNode; // 제목 아래 추가 정보 (태그 등)
}

// 각 페이지 맨 위의 제목 영역
export default function PageHeader({ eyebrow, title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <Container className="py-10 sm:py-14">
        {breadcrumbs && (
          <nav aria-label="현재 위치" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
              <li>
                <Link to="/" className="hover:text-brand-700">
                  홈
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex min-w-0 items-center gap-1">
                  <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-brand-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="max-w-[16rem] truncate text-slate-700" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        {description && <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}
        {children && <div className="mt-5">{children}</div>}
      </Container>
    </div>
  );
}
