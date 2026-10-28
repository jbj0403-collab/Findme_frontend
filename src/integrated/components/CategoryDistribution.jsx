import { categories } from '../../shared/data/categories.js';

export default function CategoryDistribution({ sites }) {
  const counts = categories.map(category => ({ ...category, count: sites.filter(site => category.sourceLabelIds.includes(Number(site.labelId))).length }));
  const total = sites.length || 1;
  const stops = [];
  let offset = 0;
  counts.forEach(category => {
    const next = offset + category.count / total * 100;
    stops.push(`${category.color} ${offset}% ${next}%`);
    offset = next;
  });
  return <section className="panel h-full min-h-[var(--size-290px)] p-4 sm:p-5"><div><h2 className="panel-title">사이트 분류 분포</h2><p className="mt-1 text-[length:var(--size-10px)] text-[var(--color-muted)]">폴더 분류 기준</p></div><div className="mt-5 flex items-center gap-4"><div className="donut shrink-0" style={{ "--donut-background": `conic-gradient(${stops.join(',')})` }}><div><strong>{sites.length}</strong><small>사이트</small></div></div><div className="min-w-0 flex-1 space-y-3">{counts.map(item => <div className="flex items-center gap-2 text-[length:var(--size-10px)]" key={item.id}><i className="h-2 w-2 shrink-0 rounded-full" style={{ background: item.color }}/><span className="min-w-0 flex-1 truncate text-[var(--color-text-dim)]">{item.name}</span><b>{item.count}</b><small className="w-10 text-right text-[var(--color-muted)]">{(item.count / total * 100).toFixed(1)}%</small></div>)}</div></div><p className="mt-auto pt-4 text-[length:var(--size-9px)] text-[var(--color-muted)]">사이트 분류 라벨은 원본 폴더명을 기준으로 적용됩니다.</p></section>;
}
