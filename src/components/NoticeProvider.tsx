import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

// 화면 아래쪽에 잠깐 나타났다 사라지는 안내 메시지입니다.
// 사용 예: const notify = useNotice(); notify('구글 로그인은 준비 중입니다.');

const NoticeContext = createContext<(message: string) => void>(() => {});

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  // 메시지가 나타나면 3초 뒤에 자동으로 사라집니다.
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 3000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const notify = useCallback((text: string) => setMessage(text), []);

  return (
    <NoticeContext.Provider value={notify}>
      {children}
      {/* 화면 읽기 프로그램도 메시지를 읽어 주도록 aria-live 사용 */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {message && (
          <div className="pointer-events-auto rounded-md bg-slate-900 px-5 py-3 text-sm text-white shadow-lg">{message}</div>
        )}
      </div>
    </NoticeContext.Provider>
  );
}

/** 안내 메시지를 띄우는 함수를 돌려줍니다. */
export function useNotice(): (message: string) => void {
  return useContext(NoticeContext);
}
