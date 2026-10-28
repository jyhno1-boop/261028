// 사이트에서 쓰는 작은 그림(아이콘) 모음입니다. 글자 색을 그대로 따라갑니다.
import type { ReactNode } from 'react';

interface IconProps {
  className?: string;
}

/** 선으로 그린 아이콘의 공통 틀 */
function Outline({ className = 'h-4 w-4', children }: IconProps & { children: ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Outline>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Outline>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M9 6l6 6-6 6" />
  </Outline>
);

export const ExternalLinkIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Outline>
);

export const DocumentIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </Outline>
);

export const AlertIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M12 3l9.5 17h-19z" />
    <path d="M12 10v4M12 17.5v.01" />
  </Outline>
);

export const LockIcon = (p: IconProps) => (
  <Outline {...p}>
    <rect x="5" y="11" width="14" height="9" rx="1.5" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Outline>
);

export const MailIcon = (p: IconProps) => (
  <Outline {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3.5 6l8.5 7 8.5-7" />
  </Outline>
);

export const MapPinIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Outline>
);

export const MenuIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Outline>
);

export const CloseIcon = (p: IconProps) => (
  <Outline {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Outline>
);

/** 구글 로그인 버튼용 구글 "G" 로고 */
export const GoogleIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
    <path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
  </svg>
);
