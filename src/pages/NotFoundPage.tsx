import { Link } from 'react-router-dom';

// 없는 주소로 들어왔을 때 보이는 화면
export default function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <p className="text-5xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-xl font-bold text-gray-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-gray-600">주소가 바뀌었거나 삭제된 페이지입니다.</p>
      <Link to="/" className="mt-6 inline-block rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
        홈으로 가기
      </Link>
    </div>
  );
}
