// 날짜 표시, 링크 검사 등 여러 화면에서 함께 쓰는 작은 도구 함수들입니다.

/** "2026-09-15" → "2026. 9. 15." */
export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ko-KR');
}

/** "2026-10-20T14:30:00" → "2026. 10. 20. 오후 2:30" */
export function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
}

/**
 * http:// 또는 https:// 로 시작하는 안전한 링크인지 검사합니다.
 * (Phase 3에서 사용자가 링크를 직접 등록할 때 악성 링크를 막기 위한 준비)
 */
export function isSafeUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}
