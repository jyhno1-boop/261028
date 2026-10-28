import { Link, useParams } from 'react-router-dom';
import { getCourseMaterialById } from '../lib/dataService';
import { formatDate } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import ExternalLinks from '../components/ExternalLinks';
import LoadState from '../components/LoadState';

// 수업 자료 상세
export default function CourseDetailPage() {
  const { id = '' } = useParams();
  const { data: material, loading, error } = useAsync(() => getCourseMaterialById(id), [id]);

  return (
    <div>
      <Link to="/courses" className="text-sm text-brand-600 hover:underline">
        ← 수업 자료 목록으로
      </Link>

      <LoadState loading={loading} error={error}>
        {material ? (
          <article className="mt-4">
            <p className="text-sm font-semibold text-brand-600">
              {material.courseName} · {material.semester}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">{material.title}</h1>
            <p className="mt-1 text-xs text-gray-400">등록일 {formatDate(material.createdAt)}</p>
            <p className="mt-6 leading-relaxed text-gray-700">{material.description}</p>

            <h2 className="mt-8 text-sm font-semibold text-gray-900">자료 링크</h2>
            <div className="mt-2 text-sm">
              <ExternalLinks links={material.links} />
            </div>
          </article>
        ) : (
          <p className="mt-6 text-gray-500">해당 수업 자료를 찾을 수 없습니다.</p>
        )}
      </LoadState>
    </div>
  );
}
