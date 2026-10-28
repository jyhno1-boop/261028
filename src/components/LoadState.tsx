import type { ReactNode } from 'react';

interface LoadStateProps {
  loading: boolean;
  error: Error | null;
  children: ReactNode;
}

// 데이터를 불러오는 중이거나 오류가 났을 때 안내를 보여주고, 정상일 때만 내용을 보여줍니다.
export default function LoadState({ loading, error, children }: LoadStateProps) {
  if (loading) {
    return <p className="py-12 text-center text-gray-500">불러오는 중입니다…</p>;
  }
  if (error) {
    return (
      <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
        자료를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </p>
    );
  }
  return <>{children}</>;
}
