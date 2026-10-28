import { useState } from 'react';

const metrics = [
  { label: '유포사이트 수', value: '3,106', note: '그중 2곳 이상 유포 237', color: 'pink' },
  { label: '가입코드 수', value: '8,742', note: '그중 2곳 이상에서 쓰임 1,047', color: 'yellow' },
  { label: '유포사이트 최대 유포 수', value: '38곳', note: 'tot***ha.net', color: 'purple' },
  { label: '가입코드 최대 공유 수', value: '50곳', note: 'vip49', color: 'cyan' },
];
const bands = [
  { label: '2 ~ 5곳', count: '819', fill: 82 },
  { label: '6 ~ 15곳', count: '346', fill: 48 },
  { label: '31곳 이상', count: '125', fill: 28 },
  { label: '16 ~ 30곳', count: '3', fill: 14 },
];

export default function DistributionOverview() {
  const [period, setPeriod] = useState('전체');
  return <div className="distribution-overview">
    <section className="panel distribution-metrics-panel">
      <div className="distribution-metrics-heading"><h2 className="panel-title">유포 현황 지표 박스</h2><div className="distribution-period-tabs">{['전체', '월', '주', '일'].map(item => <button key={item} onClick={() => setPeriod(item)} className={period === item ? 'active' : ''}>{item}</button>)}</div></div>
      <div className="distribution-metric-grid">{metrics.map(metric => <article className={`distribution-metric metric-${metric.color}`} key={metric.label}><div><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.note}</small></div></article>)}</div>
    </section>
    <section className="panel connection-distribution-panel">
      <h2 className="panel-title">연결 사이트 수 분포 박스</h2>
      <div className="connection-bands">{bands.map((row, index) => <div className="connection-band" key={row.label}><span className="connection-band-dot"/><span className="connection-band-label">{row.label}</span><span className="connection-band-track"><i style={{ width: `${row.fill}%`, "--animation-order": index }}/><b style={{ left: `${row.fill}%`, width: `${Math.max(9, (100 - row.fill) * 0.5)}%`, "--animation-order": index }}/></span><strong>{row.count}</strong></div>)}</div>
      <div className="connection-legend"><span><i className="legend-pink"/>가입코드 (붉은 연결선 수)</span><span><i className="legend-blue"/>유포사이트</span></div>
    </section>
  </div>;
}
