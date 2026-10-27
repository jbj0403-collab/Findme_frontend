import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { categoryForSite, categories } from '../../shared/data/categories.js';
import CaptureImageViewer from '../../shared/components/CaptureImageViewer.jsx';

const dateLabel = value => {
  if (!value) return '—';
  const date = new Date(value.replace(' ', 'T'));
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};

export default function DetectedSitesPage({ sites = [], status, error, onReload }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedCapture, setSelectedCapture] = useState(null);
  const rows = useMemo(() => [...sites]
    .sort((a, b) => (b.insertedAt || '').localeCompare(a.insertedAt || ''))
    .filter(site => category === 'all' || categoryForSite(site)?.id === category)
    .filter(site => `${site.domain || ''} ${site.id || ''} ${categoryForSite(site)?.name || ''}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [sites, category, query]);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const rangeStart = rows.length ? (currentPage - 1) * pageSize + 1 : 0;
  const rangeEnd = Math.min(currentPage * pageSize, rows.length);

  return <section className="panel detected-sites-panel">
    <div className="detected-sites-heading"><div><p className="text-[11px] text-[var(--color-muted)]">WORKSPACE / 탐지 사이트</p><h2 className="panel-title mt-1">탐지 사이트 목록</h2><p className="mt-1 text-xs text-[var(--color-muted)]">모니터링 원본의 전체 사이트 데이터</p></div><span className="detected-sites-total">전체 <strong>{sites.length.toLocaleString('ko-KR')}</strong>건</span></div>
    {status === 'error' && <div role="alert" className="detected-sites-message error">데이터를 불러오지 못했습니다. {error || ''}<button type="button" onClick={onReload}>다시 시도</button></div>}
    <div className="detected-sites-toolbar"><label className="search-box detected-sites-search"><Search size={15}/><input aria-label="사이트 목록 검색" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="도메인, 분류, 데이터 ID 검색"/><kbd>{rows.length}건</kbd></label><div className="detected-sites-filters"><select aria-label="분류 필터" value={category} onChange={event => { setCategory(event.target.value); setPage(1); }}><option value="all">전체 분류</option>{categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><label>페이지당 <select aria-label="페이지당 목록 수" value={pageSize} onChange={event => { setPageSize(Number(event.target.value)); setPage(1); }}><option value={10}>10개</option><option value={30}>30개</option></select></label></div></div>
    <div className="detected-sites-table-wrap"><table className="detected-sites-table"><thead><tr><th>번호</th><th>사이트 도메인</th><th>분류</th><th>탐지 시각</th><th>캡처</th><th>데이터 ID</th></tr></thead><tbody>{status === 'loading' && !sites.length ? <tr><td colSpan="6" className="detected-sites-empty">사이트 데이터를 불러오는 중입니다.</td></tr> : visibleRows.length ? visibleRows.map((site, index) => { const type = categoryForSite(site); return <tr key={site.id}><td>{rows.length - ((currentPage - 1) * pageSize + index)}</td><td className="detected-domain">{site.domain || '도메인 정보 없음'}</td><td><span className={`tag tag-${type?.tone || 'red'}`}>{type?.name || '미분류'}</span></td><td>{dateLabel(site.insertedAt)}</td><td>{site.capture ? <button type="button" className="capture-file-link" onClick={() => setSelectedCapture(site)}>이미지 보기</button> : <span className="text-[var(--color-muted)]">없음</span>}</td><td className="detected-id">{site.id || '—'}</td></tr>; }) : <tr><td colSpan="6" className="detected-sites-empty">검색 결과가 없습니다.</td></tr>}</tbody></table></div>
    <footer className="detected-sites-pagination"><span>{rangeStart}–{rangeEnd} / {rows.length.toLocaleString('ko-KR')}건</span><div><button type="button" aria-label="이전 페이지" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={16}/></button><span>{currentPage} / {pageCount}</span><button type="button" aria-label="다음 페이지" disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)}><ChevronRight size={16}/></button></div></footer>
    <CaptureImageViewer site={selectedCapture} onClose={() => setSelectedCapture(null)}/>
  </section>;
}
