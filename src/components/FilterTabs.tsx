interface FilterOption<T extends string> {
  value: T;
  label: string;
  count: number;
}

interface FilterTabsProps<T extends string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string; // 화면 읽기 프로그램용 이름 (예: "진행 상태")
}

// 목록 위의 분류 버튼 (예: 전체 / 진행중 / 완료)
// 이미 불러온 목록 안에서만 걸러 보여주므로 데이터베이스를 다시 읽지 않습니다.
export default function FilterTabs<T extends string>({ options, value, onChange, label }: FilterTabsProps<T>) {
  return (
    <div role="group" aria-label={label} className="mb-8 flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'border-brand-700 bg-brand-700 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
            }`}
          >
            {option.label}
            <span className={`ml-1.5 text-xs ${active ? 'text-white/70' : 'text-slate-400'}`}>{option.count}</span>
          </button>
        );
      })}
    </div>
  );
}
