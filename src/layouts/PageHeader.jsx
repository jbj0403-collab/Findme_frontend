import { Bell, CircleHelp, Command, Search } from 'lucide-react';

export default function PageHeader({ title, showSearch = false, query = '', onQueryChange }) {
  return (
    <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="brand-mark xl:hidden"><Command size={18} /></span>
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[var(--color-muted)]"><span>워크스페이스</span><span>/</span><span className="text-[var(--color-text-dim)]">{title}</span></div>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">{title === '통합 대시보드' ? <>좋은 아침입니다, 보안팀 <span className="text-xl">👋</span></> : title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {showSearch && <label className="search-box hidden sm:flex"><Search size={15} /><input aria-label="사이트 검색" value={query} onChange={event => onQueryChange(event.target.value)} placeholder="도메인, 유형 검색" /><kbd>검색</kbd></label>}
        <button className="icon-button" aria-label="알림"><Bell size={17} /><i /></button>
        <button className="help-button hidden md:flex"><CircleHelp size={15} /> 도움말</button>
        {title === '통합 대시보드' && <div className="ml-2 flex items-center gap-2 text-[11px] font-medium text-[var(--color-text-dim)]"><button type="button" className="hover:text-[var(--color-text)]">LOGIN</button><span className="h-3 w-px bg-[var(--color-line)]" /><button type="button" className="hover:text-[var(--color-text)]">ADMIN</button></div>}
      </div>
    </header>
  );
}
