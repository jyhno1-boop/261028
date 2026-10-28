import { useEffect, useState } from 'react';

// async 함수(데이터 불러오기)의 결과를 화면에서 쉽게 쓰도록 도와주는 도구입니다.
// 불러오는 중(loading), 결과(data), 오류(error) 세 가지 상태를 알려줍니다.

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * 사용 예: const { data, loading, error } = useAsync(() => getResearchList(), []);
 * deps: 이 값이 바뀌면 다시 불러옵니다 (예: 상세 페이지의 id).
 */
export function useAsync<T>(load: () => Promise<T>, deps: readonly unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    // 페이지를 빠르게 이동했을 때 이전 결과가 늦게 도착해 덮어쓰지 않도록 막는 표시
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    load()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({ data: null, loading: false, error: error instanceof Error ? error : new Error(String(error)) });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
