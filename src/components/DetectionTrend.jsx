const series = [
  { name: '도박', color: '#fb5365', data: [40,55,54,47,69,56,68,66,61,62,54,72,54,58,48,55,44,47,39,27,44,33,25,29,32,43,27,40,44] },
  { name: '도박 홍보', color: '#f7bf44', data: [38,45,54,46,40,30,29,24,18,12,14,17,25,33,42,49,40,51,43,47,40,43,31,29,33,34,25,28,36] },
  { name: '유해 콘텐츠', color: '#25c5d6', data: [17,19,22,18,21,17,12,10,13,9,11,12,9,13,10,16,15,20,18,20,19,22,18,20,18,15,17,14,12] },
  { name: '기타', color: '#9270ff', data: [8,10,11,12,14,11,13,9,8,6,7,8,5,10,6,11,9,13,12,13,11,14,12,15,11,10,9,12,13] },
];
const points = data => data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`).join(' ');

export default function DetectionTrend({ period }) {
 return <section className="panel mt-5 p-4 sm:p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="panel-title">실시간 탐지 추이</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">{period} 동안의 카테고리별 탐지 건수</p></div><div className="flex flex-wrap gap-x-4 gap-y-2">{series.map(s => <span key={s.name} className="legend"><i style={{ background: s.color }}/>{s.name}</span>)}</div></div><div className="chart-wrap"><div className="chart-ylabels"><span>5,000</span><span>3,750</span><span>2,500</span><span>1,250</span><span>0</span></div><div className="trend-chart">{[0,1,2,3,4].map(x => <i key={x} className="grid-line" style={{top:`${x*25}%`}}/>)}{series.map((s, i) => <svg key={s.name} className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id={`area-${i}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={s.color} stopOpacity=".18"/><stop offset="100%" stopColor={s.color} stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${points(s.data)} 100,100`} fill={`url(#area-${i})`}/><polyline points={points(s.data)} fill="none" stroke={s.color} strokeWidth=".8" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"/></svg>)}</div></div><div className="ml-10 mt-2 flex justify-between text-[9px] text-[var(--color-muted)]"><span>09/01</span><span>09/07</span><span>09/14</span><span>09/21</span><span>09/30</span></div></section>
}
