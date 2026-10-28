import { Link } from 'react-router-dom';
import { usePageTitle } from '../lib/usePageTitle';
import Container from '../components/Container';
import { ArrowLeftIcon } from '../components/Icons';

// 없는 주소로 들어왔을 때 보이는 화면
export default function NotFoundPage() {
  usePageTitle('페이지를 찾을 수 없음');
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold tracking-[0.18em] text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-slate-600">주소가 바뀌었거나 삭제된 페이지입니다.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
      >
        <ArrowLeftIcon /> 홈으로 가기
      </Link>
    </Container>
  );
}
