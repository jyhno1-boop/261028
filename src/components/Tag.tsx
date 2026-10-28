interface TagProps {
  label: string;
}

// 연구 분야 등을 표시하는 작은 꼬리표
export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
      {label}
    </span>
  );
}
