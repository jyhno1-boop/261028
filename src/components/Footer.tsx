import { siteInfo } from '../data/site';
import PrivacyNotice from './PrivacyNotice';

// 하단 정보: 연구실 연락처 + 개인정보 주의 안내
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl space-y-3 px-4 py-8 text-sm text-gray-600">
        <div>
          <p className="font-semibold text-gray-800">{siteInfo.labName}</p>
          <p>
            {siteInfo.university} · {siteInfo.professor}
          </p>
          <p>{siteInfo.address}</p>
          <p>
            이메일:{' '}
            <a href={`mailto:${siteInfo.email}`} className="text-brand-600 hover:underline">
              {siteInfo.email}
            </a>
          </p>
        </div>
        <PrivacyNotice compact />
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} {siteInfo.labNameEn}</p>
      </div>
    </footer>
  );
}
