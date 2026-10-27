import { useState } from 'react';
import { Expand, ImageOff } from 'lucide-react';
import { categories, categoryForSite } from '../../shared/data/categories.js';
import SiteDetailsDialog from './SiteDetailsDialog.jsx';

export default function CaptureGallery({ sites }) {
  const [filter, setFilter] = useState('all');
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState(null);
  const captures = sites.filter(site => site.capture && (filter === 'all' || categoryForSite(site)?.id === filter));
  return <>
    <section className="panel p-4 sm:p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="panel-title">탐지 사이트 화면 캡처</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">분류 데이터와 함께 수집된 화면 {captures.length}건</p></div><label className="flex items-center gap-2 text-[10px] text-[var(--color-muted)]">분류<select className="control-select h-8 min-w-0" value={filter} onChange={event => { setFilter(event.target.value); setLimit(12); }}><option value="all">전체</option>{categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}</select></label></div>
      {captures.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">{captures.slice(0, limit).map(site => { const category = categoryForSite(site); return <button key={`${site.labelId}-${site.id}`} onClick={() => setSelected(site)} className="capture-card group text-left"><div className="relative flex h-[125px] items-center justify-center overflow-hidden bg-black/30 sm:h-[145px]"><img loading="lazy" src={site.capture} alt={`${site.domain} 사이트 캡처`} className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03]"/><span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/75 px-1.5 py-1 text-[8px] text-white"><Expand size={10}/> 크게 보기</span></div><div className="flex min-w-0 items-center justify-between gap-2 px-2 py-2"><span className="truncate text-[9px] text-[var(--color-text-dim)]">{site.domain}</span><i className="h-2 w-2 shrink-0 rounded-full" title={category?.name} style={{ background: category?.color }}/></div></button>; })}</div> : <div className="flex min-h-40 flex-col items-center justify-center gap-2 text-xs text-[var(--color-muted)]"><ImageOff size={20}/>선택한 분류에 캡처 이미지가 없습니다.</div>}
      {captures.length > limit && <button onClick={() => setLimit(value => value + 12)} className="mt-4 w-full rounded-md border border-[var(--color-line)] py-2 text-[10px] text-[var(--color-text-dim)] hover:border-[var(--color-teal)]/50">캡처 더 보기 · {captures.length - limit}건 남음</button>}
    </section>
    <SiteDetailsDialog site={selected} onClose={() => setSelected(null)}/>
  </>;
}
