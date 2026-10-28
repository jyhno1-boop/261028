import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string; // 제목 위의 작은 영문 표시 (예: "RESEARCH AREAS")
  title: string;
  action?: ReactNode; // 오른쪽에 둘 링크 (예: "전체 보기")
}

// 홈 화면 등에서 각 구역의 제목
export default function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">{eyebrow}</p>
        <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
      </div>
      {action}
    </div>
  );
}
