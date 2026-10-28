import type { ExternalLink } from '../types';
import { isSafeUrl } from '../lib/format';
import { DocumentIcon, ExternalLinkIcon } from './Icons';

interface ExternalLinksProps {
  links: ExternalLink[];
}

// 외부 공유 링크(Google Drive 등) 목록. 새 창으로 열립니다.
export default function ExternalLinks({ links }: ExternalLinksProps) {
  // http/https 링크만 보여줍니다.
  const safeLinks = links.filter((link) => isSafeUrl(link.url));

  if (safeLinks.length === 0) {
    return <p className="text-sm text-slate-500">등록된 링크가 없습니다.</p>;
  }

  return (
    <ul className="divide-y divide-slate-200 overflow-hidden rounded-md border border-slate-200 bg-white">
      {safeLinks.map((link) => (
        <li key={link.url + link.label}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-50"
          >
            <DocumentIcon className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="flex-1 font-medium text-slate-800 group-hover:text-brand-700">{link.label}</span>
            <ExternalLinkIcon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-brand-600" />
            <span className="sr-only">(새 창에서 열림)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
