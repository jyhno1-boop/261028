import type { FormEvent } from 'react';
import { getComments } from '../lib/dataService';
import { formatDateTime } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import LoadState from './LoadState';
import PrivacyNotice from './PrivacyNotice';

interface CommentSectionProps {
  researchId: string;
}

// 연구 상세 페이지 하단의 토론(댓글) 영역
// Phase 1: 샘플 댓글만 보여주고, 입력창은 "준비 중" 상태입니다.
// Phase 3: 로그인한 사용자가 실제로 댓글을 작성하도록 연결합니다.
export default function CommentSection({ researchId }: CommentSectionProps) {
  const { data: comments, loading, error } = useAsync(() => getComments(researchId), [researchId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    window.alert('댓글 작성은 로그인 기능이 준비된 후 사용할 수 있습니다.');
  };

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold text-gray-900">토론</h2>
      <p className="mt-1 text-sm text-gray-500">연구에 대한 질문과 의견을 나누는 공간입니다.</p>

      {/* 댓글 입력창 (준비 중) */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <textarea
          disabled
          rows={3}
          placeholder="로그인 후 작성 가능 (준비 중)"
          className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 p-3 text-sm placeholder:text-gray-400"
        />
        <PrivacyNotice />
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-gray-400"
          >
            댓글 등록 (준비 중)
          </button>
        </div>
      </form>

      {/* 댓글 목록 */}
      <div className="mt-6">
        <LoadState loading={loading} error={error}>
          {comments && comments.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {comments.map((comment) => (
                <li key={comment.id} className="py-4">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-semibold text-gray-800">{comment.authorName}</span>
                    <span className="text-xs text-gray-400">{formatDateTime(comment.createdAt)}</span>
                  </div>
                  <p className="mt-1 whitespace-pre-line text-sm text-gray-700">{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">아직 댓글이 없습니다.</p>
          )}
        </LoadState>
      </div>
    </section>
  );
}
