import type { ExternalLink } from '../types';
import { isSafeUrl } from '../lib/format';

interface ExternalLinksProps {
  links: ExternalLink[];
}

// 외부 공유 링크(Google Drive 등) 목록. 새 창으로 열립니다.
export default function ExternalLinks({ links }: ExternalLinksProps) {
  // http/https 링크만 보여줍니다.
  const safeLinks = links.filter((link) => isSafeUrl(link.url));

  if (safeLinks.length === 0) {
    return <p className="text-sm text-gray-500">등록된 링크가 없습니다.</p>;
  }

  return (
    <ul className="space-y-2">
      {safeLinks.map((link) => (
        <li key={link.url + link.label}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-600 hover:underline"
          >
            🔗 {link.label}
            <span className="text-xs text-gray-400">(새 창)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
