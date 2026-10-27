import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { categories, categoryForSite } from '../../shared/data/categories.js';

function formatDate(value) {
  const date = new Date(`${String(value || '').replace(' ', 'T')}+09:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export default function SiteLog({ sites }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState(10);
  const filtered = useMemo(() => sites.filter(site => {
    const matchesCategory = filter === 'all' || categoryForSite(site)?.id === filter;
    const matchesQuery = `${site.domain} ${categoryForSite(site)?.name || ''}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [sites, filter, query]);

  return <section className="panel min-h-[290px] overflow-hidden p-4 sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="panel-title">사이트 목록</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">데이터 파일에 포함된 분류 및 탐지 도메인</p></div><label className="search-box"><Search size={14}/><input aria-label="도메인 검색" placeholder="도메인 검색" value={query} onChange={event => { setQuery(event.target.value); setShown(10); }}/></label></div>
    <div className="my-4 flex flex-wrap gap-1.5"><button onClick={() => { setFilter('all'); setShown(10); }} className={`rounded-md border px-2 py-1 text-[9px] ${filter === 'all' ? 'border-[var(--color-teal)]/40 bg-[var(--color-teal)]/10 text-[var(--color-teal)]' : 'border-[var(--color-line)] text-[var(--color-muted)]'}`}>전체 {sites.length}</button>{categories.map(category => <button key={category.id} onClick={() => { setFilter(category.id); setShown(10); }} className={`rounded-md border px-2 py-1 text-[9px] ${filter === category.id ? 'border-[var(--color-teal)]/40 bg-[var(--color-teal)]/10 text-[var(--color-teal)]' : 'border-[var(--color-line)] text-[var(--color-muted)]'}`}>{category.name}</button>)}</div>
    <div className="overflow-x-auto"><table className="w-full min-w-[570px] text-left"><thead><tr><th>분류</th><th>사이트 도메인</th><th>등록 일시</th><th>ID</th></tr></thead><tbody>{filtered.slice(0, shown).map(site => { const category = categoryForSite(site); return <tr key={`${site.labelId}-${site.id}`}><td><span className="tag" style={{ color: category?.color, borderColor: `${category?.color}80`, backgroundColor: `${category?.color}12` }}>{category?.name || '분류 없음'}</span></td><td className="font-medium text-[var(--color-text)]">{site.domain}</td><td className="whitespace-nowrap">{formatDate(site.insertedAt)}</td><td className="font-mono text-[9px]">{site.id}</td></tr>; })}{filtered.length === 0 && <tr><td colSpan="4" className="py-8 text-center text-[var(--color-muted)]">검색 결과가 없습니다.</td></tr>}</tbody></table></div>
    {filtered.length > shown && <button onClick={() => setShown(value => value + 10)} className="mt-3 w-full rounded-md border border-[var(--color-line)] py-2 text-[10px] text-[var(--color-text-dim)] hover:border-[var(--color-teal)]/50">더 불러오기 · {filtered.length - shown}건 남음</button>}
  </section>;
}
