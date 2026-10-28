import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import Container from '../components/Container';
import { useNotice } from '../components/NoticeProvider';
import PageHeader from '../components/PageHeader';
import { clearDataCache } from '../lib/dataService';
import { isFirebaseConfigured } from '../lib/firebase';
import { seedSampleData } from '../lib/seed';
import { usePageTitle } from '../lib/usePageTitle';

// 내 계정: 로그인 정보, 로그아웃, (관리자만) 샘플 데이터 올리기
export default function AccountPage() {
  usePageTitle('내 계정');
  const { user, isAdmin, ready, login, logout } = useAuth();
  const notify = useNotice();
  const [seeding, setSeeding] = useState<boolean>(false);

  const handleSeed = async (): Promise<void> => {
    if (!window.confirm('샘플 데이터(연구 3, 수업 자료 4, 논문 3, 댓글 3)를 데이터베이스에 올릴까요?')) return;
    setSeeding(true);
    try {
      await seedSampleData();
      clearDataCache();
      notify('샘플 데이터를 올렸습니다. 다른 페이지에서 확인해 보세요.');
    } catch (error) {
      notify(error instanceof Error ? error.message : '샘플 데이터를 올리지 못했습니다.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Account" title="내 계정" breadcrumbs={[{ label: '내 계정' }]} />
      <Container className="max-w-3xl py-12">
        {!isFirebaseConfigured ? (
          <p className="text-slate-600">Firebase 설정 후 사용할 수 있습니다.</p>
        ) : !ready ? (
          <p className="text-slate-500">로그인 상태를 확인하는 중입니다…</p>
        ) : !user ? (
          <div className="rounded-lg border border-slate-200 p-6">
            <p className="text-slate-700">로그인이 필요합니다.</p>
            <button
              type="button"
              onClick={() => login().catch(() => notify('로그인에 실패했습니다.'))}
              className="mt-4 rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
            >
              구글 로그인
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="flex flex-col gap-4 rounded-lg border border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900">{user.displayName}</p>
                <p className="text-sm text-slate-600">{user.email}</p>
                <p className="mt-2 text-xs font-semibold text-brand-600">{isAdmin ? '관리자' : '일반 사용자'}</p>
              </div>
              <button
                type="button"
                onClick={() => logout()}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                로그아웃
              </button>
            </section>

            {isAdmin && (
              <section className="rounded-lg border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900">샘플 데이터 올리기</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  데이터베이스가 비어 있을 때 한 번만 사용합니다. 예시 연구·수업 자료·논문·댓글이 올라가며, 이후
                  Firebase 콘솔에서 내용을 고치거나 지울 수 있습니다. 이미 자료가 있으면 실행되지 않습니다.
                </p>
                <button
                  type="button"
                  onClick={handleSeed}
                  disabled={seeding}
                  className="mt-4 rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
                >
                  {seeding ? '올리는 중…' : '샘플 데이터 올리기'}
                </button>
              </section>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
