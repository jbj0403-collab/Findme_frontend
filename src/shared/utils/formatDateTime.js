export default function formatDateTime(value, fallback = '대기 중') {
  if (!value) return fallback;
  const date = new Date(value.replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'medium' }).format(date);
}
