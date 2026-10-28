import { isUsingSampleData } from '../lib/dataService';

// Firebase 설정 전에는 화면 맨 위에 "샘플 데이터" 안내를 표시합니다.
export default function SampleDataBanner() {
  if (!isUsingSampleData) return null;
  return (
    <div className="bg-amber-100 px-4 py-2 text-center text-xs text-amber-900">
      Firebase 설정 전입니다. 지금은 샘플 데이터를 보여주고 있습니다.
    </div>
  );
}
