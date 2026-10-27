import { Globe2, Link2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { categoryForSite } from '../../../shared/data/categories.js';

const stats = [
  { id: 'gambling', label: '도박 사이트', icon: ShieldAlert, color: 'red' },
  { id: 'harmful', label: '유해 사이트', icon: Globe2, color: 'amber' },
  { id: 'normal', label: '정상 사이트', icon: ShieldCheck, color: 'teal' },
  { id: 'other', label: '기타 사이트', icon: Link2, color: 'violet' },
];

export default function Overview({ sites = [] }) {
  return <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">{stats.map(({ id, label, icon: Icon, color }) => { const count = sites.filter(site => categoryForSite(site)?.id === id).length; return <article className="metric-card" key={label}><div className="flex items-start justify-between"><span className="text-xs text-[var(--color-text-dim)]">{label}</span><span className={`metric-icon metric-${color}`}><Icon size={16}/></span></div><div className="mt-4 flex items-end justify-between gap-2"><strong className="text-[26px] font-semibold leading-none tracking-[-.04em]">{count.toLocaleString('ko-KR')}</strong></div></article>; })}</section>;
}
