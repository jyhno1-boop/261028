import type { ReactNode } from 'react';

interface LoadStateProps {
  loading: boolean;
  error: Error | null;
  children: ReactNode;
}

// 데이터를 불러오는 중이거나 오류가 났을 때 안내를 보여주고, 정상일 때만 내용을 보여줍니다.
export default function LoadState({ loading, error, children }: LoadStateProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
        불러오는 중입니다
      </div>
    );
  }
  if (error) {
    return (
      <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        자료를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </p>
    );
  }
  return <>{children}</>;
}
