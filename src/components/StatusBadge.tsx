import type { ResearchStatus } from '../types';

interface StatusBadgeProps {
  status: ResearchStatus;
}

// 연구 진행 상태 표시 (진행중: 초록, 완료: 회색)
export default function StatusBadge({ status }: StatusBadgeProps) {
  const isOngoing = status === 'ongoing';
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
        isOngoing ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
      }`}
    >
      {isOngoing ? '진행중' : '완료'}
    </span>
  );
}
