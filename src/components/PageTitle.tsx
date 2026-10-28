interface PageTitleProps {
  title: string;
  description?: string;
}

// 각 페이지 맨 위의 제목과 설명
export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
    </div>
  );
}
