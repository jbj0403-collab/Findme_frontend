import { useMemo } from 'react';
import { categories, categoryForSite } from '../../shared/data/categories.js';

function dateKey(value) {
  const date = new Date(`${String(value || '').replace(' ', 'T')}+09:00`);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function CategoryTrend({ sites }) {
  const { days, series, max } = useMemo(() => {
    const latest = sites.reduce((value, site) => dateKey(site.insertedAt) > value ? dateKey(site.insertedAt) : value, '');
    const end = latest ? new Date(`${latest}T00:00:00+09:00`) : new Date();
    const dayList = Array.from({ length: 30 }, (_, index) => {
      const day = new Date(end);
      day.setDate(day.getDate() - (29 - index));
      return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    });
    const counts = new Map(dayList.map(day => [day, new Map()]));
    sites.forEach(site => {
      const day = dateKey(site.insertedAt);
      if (counts.has(day)) {
        const bucket = counts.get(day);
        const category = categoryForSite(site);
        if (category) bucket.set(category.id, (bucket.get(category.id) || 0) + 1);
      }
    });
    const lines = categories.map(category => ({
      ...category,
      values: dayList.map(day => counts.get(day).get(category.id) || 0),
    }));
    return { days: dayList, series: lines, max: Math.max(1, ...lines.flatMap(line => line.values)) };
  }, [sites]);

  return <section className="panel mt-5 p-4 sm:p-5">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="panel-title">분류별 수집 추이</h2><p className="mt-1 text-[length:var(--size-10px)] text-[var(--color-muted)]">웹사이트 데이터의 등록일 기준 최근 30일</p></div><div className="flex flex-wrap gap-x-4 gap-y-2">{series.map(item => <span key={item.id} className="legend"><i style={{ background: item.color }}/>{item.name}</span>)}</div></div>
    <div className="chart-wrap"><div className="chart-ylabels"><span>{max}</span><span>{Math.ceil(max * .75)}</span><span>{Math.ceil(max * .5)}</span><span>{Math.ceil(max * .25)}</span><span>0</span></div><div className="trend-chart" role="img" aria-label="최근 30일 분류별 사이트 데이터 등록 추이">{[0,1,2,3,4].map(line => <i key={line} className="grid-line" style={{ top: `${line * 25}%` }} />)}{series.map(item => {
      const points = item.values.map((value, index) => `${(index / (item.values.length - 1)) * 100},${100 - value / max * 92}`).join(' ');
      return <svg key={item.id} className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={points} fill="none" stroke={item.color} strokeWidth="var(--stroke-detection-trend)" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"/></svg>;
    })}</div></div>
    <div className="ml-10 mt-2 flex justify-between text-[length:var(--size-9px)] text-[var(--color-muted)]"><span>{days[0]?.slice(5).replace('-', '/')}</span><span>{days[7]?.slice(5).replace('-', '/')}</span><span>{days[14]?.slice(5).replace('-', '/')}</span><span>{days[21]?.slice(5).replace('-', '/')}</span><span>{days[29]?.slice(5).replace('-', '/')}</span></div>
  </section>;
}
