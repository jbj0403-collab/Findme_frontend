import { Bell, ChevronDown, Command, LayoutDashboard, Network, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import formatDateTime from '../shared/utils/formatDateTime.js';

const navigation = [
  { icon: LayoutDashboard, label: '통합 대시보드', href: '/dashboard' },
  { icon: Network, label: '유포 사이트 현황', href: '/distribution' },
  { icon: ShieldAlert, label: '탐지 사이트', href: '/sites' },
  { icon: Bell, label: '신고 처리', href: '/reports', badge: '12' },
];

function Sidebar({ activeTitle, status, generatedAt, onNavigate }) {
  const isDistribution = activeTitle === '유포 사이트 현황';
  const statusLabel = isDistribution
    ? '정적 예시 화면'
    : status === 'error' ? '데이터 연결 오류' : status === 'loading' ? '데이터 연결 중' : '마지막 데이터 반영';

  return (
    <aside className="sidebar fixed inset-y-0 left-0 z-[var(--layer-sidebar)] hidden w-[var(--size-232px)] flex-col border-r border-[var(--color-line)] bg-[var(--color-sidebar)] px-4 py-5 xl:flex">
      <a className="mb-9 flex items-center gap-3 px-2" href="/dashboard" onClick={event => onNavigate(event, '/dashboard')}>
        <span className="brand-mark"><Command size={19} /></span>
        <span><b className="block text-[length:var(--size-14px)] tracking-tight">사이트 모니터</b><small className="text-[length:var(--size-10px)] text-[var(--color-muted)]">THREAT INTELLIGENCE</small></span>
      </a>
      <p className="section-caption px-3">WORKSPACE</p>
      <nav className="mt-2 space-y-1">
        {navigation.map(({ icon: Icon, label, href, badge }) => (
          <a key={href} href={href} onClick={event => onNavigate(event, href)} aria-current={activeTitle === label ? 'page' : undefined} className={`nav-item ${activeTitle === label ? 'nav-item-active' : ''}`}>
            <Icon size={17} />{label}{badge && <span className="ml-auto rounded-full bg-[var(--color-red-soft)] px-2 py-0.5 text-[length:var(--size-10px)] text-[var(--color-red)]">{badge}</span>}
          </a>
        ))}
      </nav>
      <p className="section-caption mt-8 px-3">SETTING</p>
      <button className="nav-item mt-2"><SlidersHorizontal size={17} />분석 설정</button>
      <div className="mt-auto rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] p-3">
        <div className="flex items-center gap-2"><span className="pulse-dot" /><span className="text-xs font-medium">{statusLabel}</span></div>
        <p className="mt-2 text-[length:var(--size-10px)] text-[var(--color-muted)]">{isDistribution ? '사이트 데이터 연동 없음' : `마지막 반영 · ${formatDateTime(generatedAt)}`}</p>
        <div className="mt-3 h-1 rounded-full bg-[var(--color-line)]"><div className={`h-full rounded-full bg-[var(--color-teal)] ${isDistribution || status === 'ready' ? 'w-full' : 'w-1/3'}`} /></div>
      </div>
      <button className="mt-4 flex items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-[var(--color-panel)]"><div className="avatar">김</div><span className="flex-1"><b className="block text-xs">김보안</b><small className="text-[length:var(--size-10px)] text-[var(--color-muted)]">관리자 계정</small></span><ChevronDown size={15} /></button>
    </aside>
  );
}

export default function WorkspaceLayout({ route, status, generatedAt, onNavigate, children }) {
  const widePage = route.id === 'distribution';
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text)]">
      <Sidebar activeTitle={route.title} status={status} generatedAt={generatedAt} onNavigate={onNavigate} />
      <main id="top" className={`mx-auto ${widePage ? 'max-w-none' : 'max-w-[var(--size-1600px)]'} px-4 py-5 sm:px-6 xl:ml-[232px] xl:px-8 xl:py-7`}>
        {children}
        {!widePage && <footer className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-line)] py-4 text-[length:var(--size-10px)] text-[var(--color-muted)]"><span>© 2026 SITE MONITOR · 불법·유해 사이트 통합 모니터링</span><span className="flex items-center gap-2"><span className="pulse-dot" />모든 수집기 연결됨 <span className="mx-1">·</span> 응답 시간 415ms</span></footer>}
      </main>
    </div>
  );
}
