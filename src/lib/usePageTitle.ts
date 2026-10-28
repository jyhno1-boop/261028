import { useEffect } from 'react';
import { siteInfo } from '../data/site';

/** 브라우저 탭에 보이는 제목을 "페이지 이름 | 연구실 이름"으로 바꿉니다. */
export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} | ${siteInfo.labName}` : siteInfo.labName;
  }, [title]);
}
