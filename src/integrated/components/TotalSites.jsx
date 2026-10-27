import { Database, RefreshCw } from 'lucide-react';

export default function TotalSites({ sites, generatedAt, onRefresh, isLoading }) {
  const latest = sites.reduce((value, site) => site.insertedAt > value ? site.insertedAt : value, '');
  return <section className="panel mt-4 flex flex-wrap items-center gap-4 p-4 sm:px-5">
    <span className="metric-icon metric-teal"><Database size={17}/></span>
    <div className="min-w-[150px]"><p className="text-[10px] font-semibold tracking-[.12em] text-[var(--color-muted)]">WEBSITE DATA</p><h2 className="mt-1 text-xs text-[var(--color-text-dim)]">총 탐지 누적 수</h2></div>
    <strong className="text-[28px] font-semibold tracking-[-.04em]">{sites.length.toLocaleString('ko-KR')}<small className="ml-1 text-xs font-normal text-[var(--color-muted)]">개</small></strong>
    <div className="ml-auto flex flex-wrap items-center gap-3 text-[10px] text-[var(--color-muted)]"><span>최근 등록 {latest || '—'}</span><span className="hidden sm:inline">·</span><span>데이터 생성 {generatedAt || '—'}</span><button disabled={isLoading} onClick={onRefresh} className="control-button disabled:opacity-50"><RefreshCw size={13} className={isLoading ? 'animate-spin' : ''}/>새로고침</button></div>
  </section>;
}
