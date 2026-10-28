// 구글 로그인 버튼 (Phase 1에서는 모양만 있고, 누르면 "준비 중" 안내)
// Phase 2에서 Firebase 구글 로그인으로 연결합니다.
export default function LoginButton() {
  const handleClick = (): void => {
    window.alert('구글 로그인은 준비 중입니다.');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {/* 구글 로고 대신 간단한 G 표시 */}
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
        G
      </span>
      구글 로그인
    </button>
  );
}
