import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { siteInfo } from '../data/site';
import Container from './Container';
import { CloseIcon, MenuIcon } from './Icons';
import LoginButton from './LoginButton';
import { menuItems } from './menu';

// 상단 메뉴. 넓은 화면에서는 가로로, 휴대폰에서는 ☰ 버튼을 눌러 펼칩니다.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  // 메뉴에서 페이지를 고르면 휴대폰 메뉴를 자동으로 닫습니다.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-20 bg-white">
      {/* 맨 위 얇은 띠: 학과 이름 */}
      <div className="hidden bg-brand-900 text-xs text-white/70 sm:block">
        <Container className="flex h-8 items-center justify-between">
          <span>{siteInfo.university}</span>
          <span>{siteInfo.universityEn}</span>
        </Container>
      </div>

      <div className="border-b border-slate-200">
        <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
          {/* 로고 + 연구실 이름 */}
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-700 text-[0.7rem] font-bold tracking-wider text-white">
              {siteInfo.labShortName}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.95rem] font-bold text-slate-900 sm:text-base">{siteInfo.labName}</span>
              <span className="block truncate text-xs text-slate-500">{siteInfo.labNameEn}</span>
            </span>
          </Link>

          {/* 넓은 화면용 메뉴: 현재 페이지 아래에 파란 밑줄 */}
          <nav aria-label="주 메뉴" className="hidden h-full items-center gap-8 md:flex">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative flex h-full items-center text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 ${
                    isActive ? 'text-brand-700 after:bg-brand-600' : 'text-slate-600 after:bg-transparent hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <LoginButton />
          </nav>

          {/* 휴대폰용 메뉴 열기 버튼 */}
          <button
            type="button"
            className="-mr-2 rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </Container>
      </div>

      {/* 휴대폰용 펼친 메뉴 */}
      {menuOpen && (
        <nav aria-label="주 메뉴" className="border-b border-slate-200 bg-white shadow-sm md:hidden">
          <Container className="py-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `block border-l-2 px-3 py-2.5 text-[0.95rem] font-medium ${
                    isActive ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-transparent text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 border-t border-slate-100 pt-3">
              <LoginButton fullWidth />
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
