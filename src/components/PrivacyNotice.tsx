import { AlertIcon } from './Icons';

// 개인정보 주의 안내 문구. 푸터, 댓글 입력창, (Phase 3의) 자료 등록 화면에서 사용합니다.
export const PRIVACY_MESSAGE = '실험 참여자 개인정보 및 식별 가능한 원자료는 게시하지 마세요.';

interface PrivacyNoticeProps {
  /** dark: 어두운 배경(푸터)용, box: 눈에 띄는 안내 상자 */
  variant?: 'box' | 'dark';
}

export default function PrivacyNotice({ variant = 'box' }: PrivacyNoticeProps) {
  if (variant === 'dark') {
    return (
      <p className="flex items-start gap-2 text-xs text-white/60">
        <AlertIcon className="mt-px h-3.5 w-3.5 shrink-0" />
        {PRIVACY_MESSAGE}
      </p>
    );
  }
  return (
    <p className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
      <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
      {PRIVACY_MESSAGE}
    </p>
  );
}
