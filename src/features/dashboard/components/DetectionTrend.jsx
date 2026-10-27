import { categoryForSite } from '../../../shared/data/categories.js';

const seriesMeta = [
  { id: 'gambling', name: '도박 사이트', color: '#fb5365' },
  { id: 'harmful', name: '유해 사이트', color: '#f7bf44' },
  { id: 'normal', name: '정상 사이트', color: '#25c5d6' },
  { id: 'other', name: '기타 사이트', color: '#9270ff' },
];

const localDateKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const dateKeyFromTimestamp = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : '';
const points = data => data.map((value, index) => `${data.length === 1 ? 50 : (index / (data.length - 1)) * 100},${100 - value}`).join(' ');

export default function DetectionTrend({ period, sites = [] }) {
  const dayLimit = period === '오늘' ? 1 : period === '최근 7일' ? 7 : 30;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayLimit + 1);
  const dates = Array.from({ length: dayLimit }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return localDateKey(date);
  });
  const dateSet = new Set(dates);
  const grouped = Object.fromEntries(seriesMeta.map(series => [series.id, new Map(dates.map(date => [date, 0]))]));

  sites.forEach(site => {
    const date = dateKeyFromTimestamp(site.insertedAt);
    const category = categoryForSite(site);
    if (dateSet.has(date) && category && grouped[category.id]) {
      grouped[category.id].set(date, grouped[category.id].get(date) + 1);
    }
  });

  const rawSeries = seriesMeta.map(series => ({ ...series, raw: dates.map(date => grouped[series.id].get(date)) }));
  const maxDaily = Math.max(0, ...rawSeries.flatMap(series => series.raw));
  const axisMax = Math.max(4, Math.ceil(maxDaily / 4) * 4);
  const series = rawSeries.map(item => ({ ...item, data: item.raw.map(value => value / axisMax * 78) }));
  const axis = [4, 3, 2, 1, 0].map(step => axisMax * step / 4);
  const dateLabel = index => dates.length ? dates[Math.round((dates.length - 1) * index / 4)].slice(5).replace('-', '/') : '—';
  const formatDate = date => new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);

  return <section className="panel mt-5 p-4 sm:p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="panel-title">실시간 탐지 추이</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">{formatDate(startDate)} ~ {formatDate(today)} · {period} 카테고리별 탐지 건수</p></div><div className="flex flex-wrap gap-x-4 gap-y-2">{series.map(item => <span key={item.name} className="legend"><i style={{ background: item.color }}/>{item.name}</span>)}</div></div><div className="chart-wrap"><div className="chart-ylabels">{axis.map((value, index) => <span key={index}>{value.toLocaleString('ko-KR')}</span>)}</div><div className="trend-chart">{[0, 1, 2, 3, 4].map(index => <i key={index} className="grid-line" style={{ top: `${index * 25}%` }}/>)}{series.map((item, index) => <svg key={item.name} className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label={`${item.name} 일별 탐지 추이`}><defs><linearGradient id={`area-${index}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={item.color} stopOpacity=".18"/><stop offset="100%" stopColor={item.color} stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${points(item.data)} 100,100`} fill={`url(#area-${index})`}/><polyline points={points(item.data)} fill="none" stroke={item.color} strokeWidth=".8" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"/>{dayLimit === 1 && <circle cx="50" cy={100 - item.data[0]} r="1.1" fill={item.color}/>}</svg>)}</div></div><div className="ml-10 mt-2 flex justify-between text-[9px] text-[var(--color-muted)]">{[0, 1, 2, 3, 4].map(index => <span key={index}>{dateLabel(index)}</span>)}</div></section>;
}
