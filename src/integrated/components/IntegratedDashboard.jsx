import { ArrowLeft, CircleHelp, Shield, TriangleAlert } from 'lucide-react';
import useMonitoringData from '../../shared/data/useMonitoringData.js';
import MetricCards from './MetricCards.jsx';
import TotalSites from './TotalSites.jsx';
import CategoryTrend from './CategoryTrend.jsx';
import CategoryDistribution from './CategoryDistribution.jsx';
import SiteLog from './SiteLog.jsx';
import DataStatus from './DataStatus.jsx';
import CaptureGallery from './CaptureGallery.jsx';

export default function IntegratedDashboard() {
  const { data, status, error, reload } = useMonitoringData();

  return <main className="mx-auto min-h-screen max-w-[var(--size-1600px)] px-4 py-5 sm:px-6 xl:px-8 xl:py-7">
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="brand-mark"><Shield size={18}/></span><div><div className="flex items-center gap-2 text-[length:var(--size-10px)] text-[var(--color-muted)]"><a href="/" className="flex items-center gap-1 hover:text-[var(--color-teal)]"><ArrowLeft size={12}/>기존 프로토타입</a><span>/</span><span>데이터 연동</span></div><h1 className="mt-1 text-xl font-semibold tracking-tight">사이트 모니터링 대시보드</h1></div></div><div className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-1.5 text-[length:var(--size-10px)] text-[var(--color-text-dim)]"><span className="pulse-dot"/>분류 데이터 연동<CircleHelp size={13} className="ml-1 text-[var(--color-muted)]"/></div></header>
    {status === 'loading' && <div className="panel flex min-h-64 items-center justify-center text-xs text-[var(--color-text-dim)]"><span className="pulse-dot mr-2"/>website_data를 불러오는 중입니다.</div>}
    {status === 'error' && <div className="panel flex min-h-64 flex-col items-center justify-center gap-3 text-center"><TriangleAlert className="text-[var(--color-amber)]"/><p className="text-sm font-medium">데이터 파일을 불러오지 못했습니다.</p><p className="max-w-xl text-xs text-[var(--color-muted)]">{error}<br/>가져오기 스크립트를 실행해 <code className="text-[var(--color-text-dim)]">public/monitoring-data/sites.json</code>을 생성했는지 확인하세요.</p><button className="control-button" onClick={reload}>다시 시도</button></div>}
    {status === 'ready' && data && <>
      <MetricCards sites={data.sites}/>
      <TotalSites sites={data.sites} generatedAt={data.generatedAt} onRefresh={reload} isLoading={status === 'loading'}/>
      <CategoryTrend sites={data.sites}/>
      <div className="dashboard-row"><CategoryDistribution sites={data.sites}/><SiteLog sites={data.sites}/><DataStatus sites={data.sites} generatedAt={data.generatedAt}/></div>
      <section className="mt-5"><CaptureGallery sites={data.sites}/></section>
    </>}
    <footer className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-line)] py-4 text-[length:var(--size-10px)] text-[var(--color-muted)]"><span>불법·유해 사이트 분류 데이터 기반 모니터링</span><span>캡처 파일은 화면 표시용으로 축소 변환됩니다.</span></footer>
  </main>;
}
