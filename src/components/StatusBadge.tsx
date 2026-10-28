import type { ResearchStatus } from '../types';

interface StatusBadgeProps {
  status: ResearchStatus;
}

// 연구 진행 상태 표시 (진행중: 초록 점, 완료: 회색 점)
export default function StatusBadge({ status }: StatusBadgeProps) {
  const isOngoing = status === 'ongoing';
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${isOngoing ? 'text-emerald-700' : 'text-slate-500'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isOngoing ? 'bg-emerald-500' : 'bg-slate-400'}`} />
      {isOngoing ? '진행중' : '완료'}
    </span>
  );
}
