import { getComments } from '../lib/dataService';
import { formatDateTime } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { useAuth } from './AuthProvider';
import { LockIcon } from './Icons';
import LoadState from './LoadState';
import { useNotice } from './NoticeProvider';
import PrivacyNotice from './PrivacyNotice';

interface CommentSectionProps {
  researchId: string;
}

// 연구 상세 페이지 하단의 토론(댓글) 영역
// Phase 2: 댓글 목록은 Firestore에서 읽고, 입력창은 아직 "준비 중" 상태입니다.
// Phase 3: 로그인한 사용자가 실제로 댓글을 작성하도록 연결합니다.
export default function CommentSection({ researchId }: CommentSectionProps) {
  const { data: comments, loading, error } = useAsync(() => getComments(researchId), [researchId]);
  const notify = useNotice();
  const { user } = useAuth();

  return (
    <section className="mt-14 border-t border-slate-200 pt-10" aria-labelledby="discussion-title">
      <div className="flex items-baseline gap-2">
        <h2 id="discussion-title" className="text-xl font-bold text-slate-900">
          토론
        </h2>
        {comments && <span className="text-sm text-slate-500">{comments.length}개</span>}
      </div>
      <p className="mt-1 text-sm text-slate-500">연구에 대한 질문과 의견을 나누는 공간입니다.</p>

      {/* 댓글 목록 */}
      <div className="mt-6">
        <LoadState loading={loading} error={error}>
          {comments && comments.length > 0 ? (
            <ul className="space-y-5">
              {comments.map((comment) => (
                <li key={comment.id} className="flex gap-3">
                  {/* 이름 첫 글자로 만든 동그라미 */}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                    {comment.authorName.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-4 py-3">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-semibold text-slate-900">{comment.authorName}</span>
                      <time dateTime={comment.createdAt} className="text-xs text-slate-400">
                        {formatDateTime(comment.createdAt)}
                      </time>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-line text-slate-700">{comment.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">아직 댓글이 없습니다.</p>
          )}
        </LoadState>
      </div>

      {/* 댓글 입력창 (준비 중) */}
      <div className="mt-8 rounded-md border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <label htmlFor="comment-input" className="text-sm font-semibold text-slate-900">
          댓글 작성
        </label>
        <textarea
          id="comment-input"
          disabled
          rows={3}
          placeholder={user ? '댓글 작성 기능은 준비 중입니다' : '로그인 후 작성 가능 (준비 중)'}
          className="mt-2 w-full cursor-not-allowed resize-none rounded-md border border-slate-300 bg-white p-3 text-sm placeholder:text-slate-400"
        />
        <div className="mt-3 space-y-3 sm:flex sm:items-start sm:justify-between sm:gap-4 sm:space-y-0">
          <PrivacyNotice />
          <button
            type="button"
            onClick={() => notify('댓글 작성은 로그인 기능이 준비된 후 사용할 수 있습니다.')}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-slate-300 px-4 py-2.5 text-sm font-medium text-white sm:w-auto"
          >
            <LockIcon className="h-4 w-4" />
            댓글 등록 (준비 중)
          </button>
        </div>
      </div>
    </section>
  );
}
