import type { ReactNode } from 'react';

// 내용의 가로 폭을 일정하게 맞춰 주는 틀
export default function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
