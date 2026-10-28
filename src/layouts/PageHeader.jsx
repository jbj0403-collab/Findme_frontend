import { Bell, CircleHelp, Command } from 'lucide-react';

export default function PageHeader({ title, showAccount = title === '통합 대시보드' || title === '유포 사이트 현황' }) {
  return (
    <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="brand-mark xl:hidden"><Command size={18} /></span>
        <div>
          <div className="flex items-center gap-2 text-[length:var(--size-11px)] text-[var(--color-muted)]"><span>워크스페이스</span><span>/</span><span className="text-[var(--color-text-dim)]">{title}</span></div>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">{title === '통합 대시보드' ? <>좋은 아침입니다, 보안팀 <span className="text-xl">👋</span></> : title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="icon-button" aria-label="알림"><Bell size={17} /><i /></button>
        <button className="help-button hidden md:flex"><CircleHelp size={15} /> 도움말</button>
        {showAccount && <div className="ml-2 flex items-center gap-2 text-[length:var(--size-11px)] font-medium text-[var(--color-text-dim)]"><button type="button" className="hover:text-[var(--color-text)]">LOGIN</button><span className="h-3 w-px bg-[var(--color-line)]" /><button type="button" className="hover:text-[var(--color-text)]">ADMIN</button></div>}
      </div>
    </header>
  );
}
