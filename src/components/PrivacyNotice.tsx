// 개인정보 주의 안내 문구. 푸터, 댓글 입력창, (Phase 3의) 자료 등록 화면에서 사용합니다.
export const PRIVACY_MESSAGE = '실험 참여자 개인정보 및 식별 가능한 원자료는 게시하지 마세요.';

interface PrivacyNoticeProps {
  /** true면 작은 글씨 한 줄, false면 눈에 띄는 안내 상자 */
  compact?: boolean;
}

export default function PrivacyNotice({ compact = false }: PrivacyNoticeProps) {
  if (compact) {
    return <p className="text-xs text-gray-500">⚠️ {PRIVACY_MESSAGE}</p>;
  }
  return (
    <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
      ⚠️ {PRIVACY_MESSAGE}
    </p>
  );
}
