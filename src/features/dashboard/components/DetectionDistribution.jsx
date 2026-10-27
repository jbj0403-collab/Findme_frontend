import { categoryForSite } from '../../../shared/data/categories.js';
const items = [{id:'gambling',label:'도박',color:'var(--color-red)'},{id:'harmful',label:'유해',color:'var(--color-amber)'},{id:'normal',label:'정상',color:'var(--color-teal)'},{id:'other',label:'기타',color:'var(--color-violet)'}];

export default function DetectionDistribution({ sites = [] }) {
 const total = sites.length; const stats = items.map(item => ({ ...item, count: sites.filter(site => categoryForSite(site)?.id === item.id).length }));
 let progress = 0; const segments = stats.map(item => { const start = progress; progress += total ? item.count / total * 100 : 0; return `${item.color} ${start}% ${progress}%`; }).join(', ');
 const top = [...stats].sort((a,b)=>b.count-a.count)[0];
 return <section className="panel aligned-panel p-4 sm:p-5"><div className="mb-4"><h2 className="panel-title">탐지 분포</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">유형별 탐지 비율</p></div><div className="distribution-content"><div className="donut" style={{background:`conic-gradient(${segments || 'var(--color-line) 0% 100%'})`}}><div><strong>{total ? `${((top?.count || 0) / total * 100).toFixed(1)}%` : '0%'}</strong><small>{top?.label || '데이터 없음'}</small></div></div><div className="min-w-0 flex-1 space-y-3">{stats.map(c=><div className="dist-item" key={c.label}><i style={{background:c.color}}/><span>{c.label}</span><b>{c.count.toLocaleString('ko-KR')}</b><small>{total ? `${(c.count/total*100).toFixed(1)}%` : '0.0%'}</small></div>)}</div></div></section>
}
