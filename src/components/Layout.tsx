import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// 모든 페이지에 공통으로 들어가는 틀: 상단 메뉴 + 본문 + 하단 정보
export default function Layout() {
  const { pathname } = useLocation();

  // 다른 페이지로 이동하면 화면 맨 위부터 보이게 합니다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
