import { Activity } from 'lucide-react';

const categories = [
  { label: '도박', value: '48,413', change: '+18.4%', color: 'red' },
  { label: '유해', value: '23,571', change: '+7.1%', color: 'amber' },
  { label: '정상', value: '1,046', change: '+22.6%', color: 'teal' },
  { label: '기타', value: '33,057', change: '−3.2%', color: 'violet' },
];

export default function TotalDetected() {
  return <section className="total-detected mt-4"><div className="total-heading"><span className="total-icon"><Activity size={17}/></span><span><small>LIVE THREATS</small><b>총 탐지 누적 수</b></span><strong>1,256,015 <small>건</small></strong></div><div className="total-categories">{categories.map(item => <div className={`total-category total-${item.color}`} key={item.label}><span>{item.label}</span><div><strong>{item.value}</strong><small>{item.change}</small></div></div>)}</div></section>;
}
