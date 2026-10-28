import { FirebaseError } from 'firebase/app';
import { Link } from 'react-router-dom';
import { isFirebaseConfigured } from '../lib/firebase';
import { useAuth } from './AuthProvider';
import { GoogleIcon } from './Icons';
import { useNotice } from './NoticeProvider';

/** 로그인 실패 이유를 쉬운 말로 바꿉니다. */
function loginErrorMessage(error: unknown): string | null {
  if (error instanceof FirebaseError) {
    // 사용자가 로그인 창을 직접 닫은 경우는 안내하지 않음
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') return null;
    if (error.code === 'auth/popup-blocked') return '팝업이 차단되었습니다. 브라우저에서 팝업을 허용해 주세요.';
    if (error.code === 'auth/unauthorized-domain') return '이 주소는 Firebase 로그인 허용 도메인에 등록되지 않았습니다.';
  }
  return '로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.';
}

// 상단 메뉴의 로그인 버튼
// - 로그인 전: "구글 로그인" 버튼
// - 로그인 후: 내 이름(누르면 내 계정 페이지로 이동)
export default function LoginButton({ fullWidth = false }: { fullWidth?: boolean }) {
  const { user, ready, login } = useAuth();
  const notify = useNotice();
  const width = fullWidth ? 'w-full' : '';

  if (user) {
    return (
      <Link
        to="/account"
        className={`inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 ${width}`}
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="h-6 w-6 rounded-full" />
        ) : (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
            {(user.displayName ?? user.email ?? '?').charAt(0)}
          </span>
        )}
        <span className="max-w-[8rem] truncate">{user.displayName ?? user.email}</span>
      </Link>
    );
  }

  const handleClick = async (): Promise<void> => {
    if (!isFirebaseConfigured) {
      notify('Firebase 설정 후 로그인할 수 있습니다.');
      return;
    }
    try {
      await login();
    } catch (error) {
      const message = loginErrorMessage(error);
      if (message) notify(message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!ready}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-60 ${width}`}
    >
      <GoogleIcon />
      구글 로그인
    </button>
  );
}
