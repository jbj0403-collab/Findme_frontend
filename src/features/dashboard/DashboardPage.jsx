import { useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../layouts/PageHeader.jsx';
import formatDateTime from '../../shared/utils/formatDateTime.js';
import Overview from './components/Overview.jsx';
import TotalDetected from './components/TotalDetected.jsx';
import DetectionTrend from './components/DetectionTrend.jsx';
import DetectionLog from './components/DetectionLog.jsx';
import ReportStatus from './components/ReportStatus.jsx';
import DetectionDistribution from './components/DetectionDistribution.jsx';
import SNSDetectionDistribution from './components/SNSDetectionDistribution.jsx';
import ScreenshotGallery from './components/ScreenshotGallery.jsx';

export default function DashboardPage({ sites, status, error, generatedAt, onReload, onNavigate }) {
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState('최근 30일');

  return (
    <>
      <PageHeader title="통합 대시보드" showSearch query={query} onQueryChange={setQuery} />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-1.5 text-[11px]">
          <span className="pulse-dot" />{status === 'error' ? '데이터 연결 오류' : status === 'loading' ? '데이터 불러오는 중' : '마지막 데이터 반영'}
          <span className="text-[var(--color-muted)]">{generatedAt ? `· ${formatDateTime(generatedAt, '')}` : ''}</span>
          {status === 'error' && <button className="ml-1 text-[var(--color-teal)]" onClick={onReload}>다시 시도</button>}
        </div>
        <div className="flex gap-2">
          <select aria-label="기간 선택" className="control-select" value={period} onChange={event => setPeriod(event.target.value)}><option>최근 30일</option><option>최근 7일</option><option>오늘</option></select>
          <button className="control-button" type="button" disabled aria-disabled="true" title="내보내기는 현재 비활성화되어 있습니다."><Download size={14} />내보내기</button>
        </div>
      </div>
      {status === 'error' && <p role="alert" className="mb-3 text-xs text-[var(--color-red)]">{error} · public/monitoring-data/sites.json 파일을 확인하세요.</p>}
      <Overview sites={sites} />
      <TotalDetected sites={sites} />
      <DetectionTrend period={period} sites={sites} />
      <div className="dashboard-row"><div className="distribution-stack"><DetectionDistribution sites={sites} /><SNSDetectionDistribution /></div><DetectionLog query={query} sites={sites} /><ReportStatus /></div>
      <div className="dashboard-row dashboard-row-bottom"><ScreenshotGallery sites={sites} onViewAll={event => onNavigate(event, '/sites')} /></div>
    </>
  );
}
