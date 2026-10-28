import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { siteInfo } from '../data/site';
import LoginButton from './LoginButton';

// 상단 메뉴 항목
const menuItems = [
  { to: '/', label: '홈' },
  { to: '/research', label: '연구' },
  { to: '/courses', label: '수업 자료' },
  { to: '/publications', label: '논문·발표' },
];

// 상단 메뉴. 넓은 화면에서는 가로로, 휴대폰에서는 ☰ 버튼을 눌러 펼칩니다.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  // 메뉴에서 페이지를 고르면 휴대폰 메뉴를 자동으로 닫습니다.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link to="/" className="min-w-0">
          <span className="block truncate text-base font-bold text-brand-700 sm:text-lg">{siteInfo.labName}</span>
          <span className="hidden text-xs text-gray-500 sm:block">{siteInfo.university}</span>
        </Link>

        {/* 넓은 화면용 메뉴 */}
        <nav className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <div className="ml-2">
            <LoginButton />
          </div>
        </nav>

        {/* 휴대폰용 메뉴 열기 버튼 */}
        <button
          type="button"
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 휴대폰용 펼친 메뉴 */}
      {menuOpen && (
        <nav className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2">
              <LoginButton />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
