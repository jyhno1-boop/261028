import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ResearchListPage from './pages/ResearchListPage';
import ResearchDetailPage from './pages/ResearchDetailPage';
import CourseListPage from './pages/CourseListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import PublicationListPage from './pages/PublicationListPage';
import NotFoundPage from './pages/NotFoundPage';

// 주소(URL)와 페이지를 연결하는 곳입니다.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/research" element={<ResearchListPage />} />
        <Route path="/research/:id" element={<ResearchDetailPage />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/publications" element={<PublicationListPage />} />
        {/* 위에 없는 주소는 "페이지를 찾을 수 없음" 화면 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
