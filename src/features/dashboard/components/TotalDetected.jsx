import { Activity } from 'lucide-react';
import { categoryForSite } from '../../../shared/data/categories.js';

const categories = [
  { id: 'gambling', label: '도박', color: 'red' },
  { id: 'harmful', label: '유해', color: 'amber' },
  { id: 'normal', label: '정상', color: 'teal' },
  { id: 'other', label: '기타', color: 'violet' },
];

export default function TotalDetected({ sites = [] }) {
  return <section className="total-detected mt-4"><div className="total-heading"><span className="total-icon"><Activity size={17}/></span><span><small>WEBSITE DATA</small><b>총 탐지 누적 수</b></span><strong>{sites.length.toLocaleString('ko-KR')} <small>건</small></strong></div><div className="total-categories">{categories.map(item => { const count = sites.filter(site => categoryForSite(site)?.id === item.id).length; return <div className={`total-category total-${item.color}`} key={item.label}><span>{item.label}</span><div><strong>{count.toLocaleString('ko-KR')}</strong></div></div>; })}</div></section>;
}
