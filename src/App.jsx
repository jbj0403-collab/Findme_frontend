import { useEffect, useState } from 'react';
import { Bell, ChevronDown, CircleHelp, Command, Download, LayoutDashboard, Network, Search, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import Overview from './features/dashboard/components/Overview.jsx';
import TotalDetected from './features/dashboard/components/TotalDetected.jsx';
import DetectionTrend from './features/dashboard/components/DetectionTrend.jsx';
import DetectionLog from './features/dashboard/components/DetectionLog.jsx';
import ReportStatus from './features/dashboard/components/ReportStatus.jsx';
import DetectionDistribution from './features/dashboard/components/DetectionDistribution.jsx';
import SNSDetectionDistribution from './features/dashboard/components/SNSDetectionDistribution.jsx';
import ScreenshotGallery from './features/dashboard/components/ScreenshotGallery.jsx';
import DetectedSitesPage from './features/sites/DetectedSitesPage.jsx';
import ReportsPage from './features/reports/ReportsPage.jsx';
import useMonitoringData from './shared/data/useMonitoringData.js';
import DistributionStatusPage from './features/distribution/components/DistributionStatusPage.jsx';

const nav = [
  { icon: LayoutDashboard, label: '통합 대시보드', href: '/dashboard' },
  { icon: Network, label: '유포 사이트 현황', href: '/distribution' },
  { icon: ShieldAlert, label: '탐지 사이트', href: '/sites' },
  { icon: Bell, label: '신고 처리', href: '/reports' },
];
const pathToPage = {
  '/dashboard': '통합 대시보드',
  '/distribution': '유포 사이트 현황',
  '/sites': '탐지 사이트',
  '/reports': '신고 처리',
};
const routeToPage = path => pathToPage[path.replace(/\/+$/, '')] || '통합 대시보드';
const formatGeneratedAt = value => {
  if (!value) return '대기 중';
  const date = new Date(value.replace(' ', 'T'));
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'medium' }).format(date);
};

export default function App() {
  const [active, setActive] = useState(() => routeToPage(window.location.pathname));
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState('최근 30일');
  const { data, status, error, reload } = useMonitoringData({ enabled: active === '통합 대시보드' || active === '탐지 사이트' });
  const sites = data?.sites ?? [];
  const navigate = (event, href) => {
    event.preventDefault();
    if (window.location.pathname !== href) window.history.pushState({}, '', href);
    setActive(routeToPage(href));
  };
  useEffect(() => {
    const syncRoute = () => setActive(routeToPage(window.location.pathname));
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);
  return <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text)]">
    <aside className="sidebar fixed inset-y-0 left-0 z-20 hidden w-[232px] flex-col border-r border-[var(--color-line)] bg-[var(--color-sidebar)] px-4 py-5 xl:flex">
      <a className="mb-9 flex items-center gap-3 px-2" href="#top"><span className="brand-mark"><Command size={19}/></span><span><b className="block text-[14px] tracking-tight">사이트 모니터</b><small className="text-[10px] text-[var(--color-muted)]">THREAT INTELLIGENCE</small></span></a>
      <p className="section-caption px-3">WORKSPACE</p>
      <nav className="mt-2 space-y-1">{nav.map(({ icon: Icon, label, href }) => {
        const contents = <><Icon size={17}/>{label}{label === '신고 처리' && <span className="ml-auto rounded-full bg-[var(--color-red-soft)] px-2 py-0.5 text-[10px] text-[var(--color-red)]">12</span>}</>;
        return <a key={label} href={href} onClick={event => navigate(event, href)} aria-current={active === label ? 'page' : undefined} className={`nav-item ${active === label ? 'nav-item-active' : ''}`}>{contents}</a>;
      })}</nav>
      <p className="section-caption mt-8 px-3">SETTING</p><button className="nav-item mt-2"><SlidersHorizontal size={17}/>분석 설정</button>
      <div className="mt-auto rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] p-3"><div className="flex items-center gap-2"><span className="pulse-dot"/><span className="text-xs font-medium">{active === '유포 사이트 현황' ? '정적 예시 화면' : status === 'error' ? '데이터 연결 오류' : status === 'loading' ? '데이터 연결 중' : '마지막 데이터 반영'}</span></div><p className="mt-2 text-[10px] text-[var(--color-muted)]">{active === '유포 사이트 현황' ? '사이트 데이터 연동 없음' : `마지막 반영 · ${formatGeneratedAt(data?.generatedAt)}`}</p><div className="mt-3 h-1 rounded-full bg-[var(--color-line)]"><div className={`h-full rounded-full bg-[var(--color-teal)] ${active === '유포 사이트 현황' || status === 'ready' ? 'w-full' : 'w-1/3'}`}/></div></div>
      <button className="mt-4 flex items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-[var(--color-panel)]"><div className="avatar">김</div><span className="flex-1"><b className="block text-xs">김보안</b><small className="text-[10px] text-[var(--color-muted)]">관리자 계정</small></span><ChevronDown size={15}/></button>
    </aside>

    <main id="top" className={`mx-auto ${active === '유포 사이트 현황' ? 'max-w-none' : 'max-w-[1600px]'} px-4 py-5 sm:px-6 xl:ml-[232px] xl:px-8 xl:py-7`}>
      {active === '유포 사이트 현황' ? <DistributionStatusPage/> : <>
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="brand-mark xl:hidden"><Command size={18}/></span><div><div className="flex items-center gap-2 text-[11px] text-[var(--color-muted)]"><span>워크스페이스</span><span>/</span><span className="text-[var(--color-text-dim)]">{active}</span></div><h1 className="mt-1 text-xl font-semibold tracking-tight">{active === '통합 대시보드' ? <>좋은 아침입니다, 보안팀 <span className="text-xl">👋</span></> : active}</h1></div></div><div className="flex items-center gap-2">{active === '통합 대시보드' && <label className="search-box hidden sm:flex"><Search size={15}/><input aria-label="사이트 검색" value={query} onChange={e => setQuery(e.target.value)} placeholder="도메인, 유형 검색"/><kbd>검색</kbd></label>}<button className="icon-button" aria-label="알림"><Bell size={17}/><i/></button><button className="help-button hidden md:flex"><CircleHelp size={15}/> 도움말</button>{active === '통합 대시보드' && <div className="ml-2 flex items-center gap-2 text-[11px] font-medium text-[var(--color-text-dim)]"><button type="button" className="hover:text-[var(--color-text)]">LOGIN</button><span className="h-3 w-px bg-[var(--color-line)]"/><button type="button" className="hover:text-[var(--color-text)]">ADMIN</button></div>}</div></header>
      {active === '통합 대시보드' ? <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-1.5 text-[11px]"><span className="pulse-dot"/>{status === 'error' ? '데이터 연결 오류' : status === 'loading' ? '데이터 불러오는 중' : '마지막 데이터 반영'} <span className="text-[var(--color-muted)]">{data?.generatedAt ? `· ${formatGeneratedAt(data.generatedAt)}` : ''}</span>{status === 'error' && <button className="ml-1 text-[var(--color-teal)]" onClick={reload}>다시 시도</button>}</div><div className="flex gap-2"><select aria-label="기간 선택" className="control-select" value={period} onChange={e => setPeriod(e.target.value)}><option>최근 30일</option><option>최근 7일</option><option>오늘</option></select><button className="control-button" type="button" disabled aria-disabled="true" title="내보내기는 현재 비활성화되어 있습니다."><Download size={14}/>내보내기</button></div></div>
      {status === 'error' && <p role="alert" className="mb-3 text-xs text-[var(--color-red)]">{error} · public/monitoring-data/sites.json 파일을 확인하세요.</p>}
      <Overview sites={sites}/><TotalDetected sites={sites}/><DetectionTrend period={period} sites={sites}/>
      <div className="dashboard-row"><div className="distribution-stack"><DetectionDistribution sites={sites}/><SNSDetectionDistribution/></div><DetectionLog query={query} sites={sites}/><ReportStatus/></div>
      <div className="dashboard-row dashboard-row-bottom"><ScreenshotGallery sites={sites} onViewAll={event => navigate(event, '/sites')}/></div>
      </> : active === '탐지 사이트' ? <DetectedSitesPage sites={sites} status={status} error={error} onReload={reload}/> : active === '신고 처리' ? <ReportsPage/> : null}
      <footer className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-line)] py-4 text-[10px] text-[var(--color-muted)]"><span>© 2026 SITE MONITOR · 불법·유해 사이트 통합 모니터링</span><span className="flex items-center gap-2"><span className="pulse-dot"/>모든 수집기 연결됨 <span className="mx-1">·</span> 응답 시간 415ms</span></footer>
      </>}
    </main>
  </div>;
}
