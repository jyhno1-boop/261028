import { GoogleIcon } from './Icons';
import { useNotice } from './NoticeProvider';

// 구글 로그인 버튼 (Phase 1에서는 모양만 있고, 누르면 "준비 중" 안내)
// Phase 2에서 Firebase 구글 로그인으로 연결합니다.
export default function LoginButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const notify = useNotice();

  return (
    <button
      type="button"
      onClick={() => notify('구글 로그인은 준비 중입니다.')}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      <GoogleIcon />
      구글 로그인
    </button>
  );
}
