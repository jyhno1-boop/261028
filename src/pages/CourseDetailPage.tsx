import { Link, useParams } from 'react-router-dom';
import { getCourseMaterialById } from '../lib/dataService';
import { formatDate } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { usePageTitle } from '../lib/usePageTitle';
import Container from '../components/Container';
import ExternalLinks from '../components/ExternalLinks';
import { ArrowLeftIcon } from '../components/Icons';
import LoadState from '../components/LoadState';
import PageHeader from '../components/PageHeader';

// 수업 자료 상세
export default function CourseDetailPage() {
  const { id = '' } = useParams();
  const { data: material, loading, error } = useAsync(() => getCourseMaterialById(id), [id]);
  usePageTitle(material?.title ?? '수업 자료');

  if (loading || error) {
    return (
      <Container className="py-12">
        <LoadState loading={loading} error={error}>
          {null}
        </LoadState>
      </Container>
    );
  }

  if (!material) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-600">해당 수업 자료를 찾을 수 없습니다.</p>
        <Link to="/courses" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          <ArrowLeftIcon /> 수업 자료 목록으로
        </Link>
      </Container>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={`${material.courseName} · ${material.semester}`}
        title={material.title}
        breadcrumbs={[{ label: '수업 자료', to: '/courses' }, { label: material.title }]}
      />
      <Container className="max-w-3xl py-12">
        <p className="text-base leading-[1.85] text-slate-700">{material.description}</p>

        <h2 className="mt-10 text-lg font-bold text-slate-900">자료 링크</h2>
        <div className="mt-4">
          <ExternalLinks links={material.links} />
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6 text-sm">
          <Link to="/courses" className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700">
            <ArrowLeftIcon /> 목록으로
          </Link>
          <span className="text-xs text-slate-400">등록일 {formatDate(material.createdAt)}</span>
        </div>
      </Container>
    </>
  );
}
