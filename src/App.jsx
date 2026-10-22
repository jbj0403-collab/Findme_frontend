import { useState } from 'react';
import { Bell, ChevronDown, CircleHelp, Command, Download, LayoutDashboard, Search, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import Overview from './components/Overview.jsx';
import TotalDetected from './components/TotalDetected.jsx';
import DetectionTrend from './components/DetectionTrend.jsx';
import DetectionLog from './components/DetectionLog.jsx';
import ReportStatus from './components/ReportStatus.jsx';
import DetectionDistribution from './components/DetectionDistribution.jsx';
import SNSDetectionDistribution from './components/SNSDetectionDistribution.jsx';
import ScreenshotGallery from './components/ScreenshotGallery.jsx';

const nav = [{ icon: LayoutDashboard, label: '통합 대시보드' }, { icon: ShieldAlert, label: '탐지 사이트' }, { icon: Bell, label: '신고 처리' }];

export default function App() {
  const [active, setActive] = useState('통합 대시보드');
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState('최근 30일');
  return <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text)]">
    <aside className="sidebar fixed inset-y-0 left-0 z-20 hidden w-[232px] flex-col border-r border-[var(--color-line)] bg-[var(--color-sidebar)] px-4 py-5 xl:flex">
      <a className="mb-9 flex items-center gap-3 px-2" href="#top"><span className="brand-mark"><Command size={19}/></span><span><b className="block text-[14px] tracking-tight">사이트 모니터</b><small className="text-[10px] text-[var(--color-muted)]">THREAT INTELLIGENCE</small></span></a>
      <p className="section-caption px-3">WORKSPACE</p>
      <nav className="mt-2 space-y-1">{nav.map(({ icon: Icon, label }) => <button key={label} onClick={() => setActive(label)} className={`nav-item ${active === label ? 'nav-item-active' : ''}`}><Icon size={17}/>{label}{label === '신고 처리' && <span className="ml-auto rounded-full bg-[var(--color-red-soft)] px-2 py-0.5 text-[10px] text-[var(--color-red)]">12</span>}</button>)}</nav>
      <p className="section-caption mt-8 px-3">SETTING</p><button className="nav-item mt-2"><SlidersHorizontal size={17}/>분석 설정</button>
      <div className="mt-auto rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] p-3"><div className="flex items-center gap-2"><span className="pulse-dot"/><span className="text-xs font-medium">수집 시스템 정상</span></div><p className="mt-2 text-[10px] text-[var(--color-muted)]">마지막 동기화 · 12초 전</p><div className="mt-3 h-1 rounded-full bg-[var(--color-line)]"><div className="h-full w-[94%] rounded-full bg-[var(--color-teal)]"/></div></div>
      <button className="mt-4 flex items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-[var(--color-panel)]"><div className="avatar">김</div><span className="flex-1"><b className="block text-xs">김보안</b><small className="text-[10px] text-[var(--color-muted)]">관리자 계정</small></span><ChevronDown size={15}/></button>
    </aside>

    <main id="top" className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 xl:ml-[232px] xl:px-8 xl:py-7">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="brand-mark xl:hidden"><Command size={18}/></span><div><div className="flex items-center gap-2 text-[11px] text-[var(--color-muted)]"><span>워크스페이스</span><span>/</span><span className="text-[var(--color-text-dim)]">통합 대시보드</span></div><h1 className="mt-1 text-xl font-semibold tracking-tight">좋은 아침입니다, 보안팀 <span className="text-xl">👋</span></h1></div></div><div className="flex items-center gap-2"><label className="search-box hidden sm:flex"><Search size={15}/><input aria-label="사이트 검색" value={query} onChange={e => setQuery(e.target.value)} placeholder="도메인, 유형 검색"/><kbd>검색</kbd></label><button className="icon-button" aria-label="알림"><Bell size={17}/><i/></button><button className="help-button hidden md:flex"><CircleHelp size={15}/> 도움말</button></div></header>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-1.5 text-[11px]"><span className="pulse-dot"/>실시간 모니터링 <span className="text-[var(--color-muted)]">· 업데이트 12초 전</span></div><div className="flex gap-2"><select aria-label="기간 선택" className="control-select" value={period} onChange={e => setPeriod(e.target.value)}><option>최근 30일</option><option>최근 7일</option><option>오늘</option></select><button className="control-button" onClick={() => window.print()}><Download size={14}/>내보내기</button></div></div>
      <Overview/><TotalDetected/><DetectionTrend period={period}/>
      <div className="dashboard-row"><DetectionDistribution/><DetectionLog query={query}/><ReportStatus/></div>
      <div className="dashboard-row dashboard-row-bottom"><SNSDetectionDistribution/><ScreenshotGallery/></div>
      <footer className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-line)] py-4 text-[10px] text-[var(--color-muted)]"><span>© 2026 SITE MONITOR · 불법·유해 사이트 통합 모니터링</span><span className="flex items-center gap-2"><span className="pulse-dot"/>모든 수집기 연결됨 <span className="mx-1">·</span> 응답 시간 415ms</span></footer>
    </main>
  </div>;
}
