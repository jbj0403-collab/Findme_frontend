import { ArrowUpRight, Globe2, Link2, ShieldAlert, ShieldCheck } from 'lucide-react';

const stats = [
  { label: '도박 사이트', value: '48,413', change: '+18.4%', icon: ShieldAlert, color: 'red' },
  { label: '유해 사이트', value: '23,571', change: '+7.1%', icon: Globe2, color: 'amber' },
  { label: '정상 사이트', value: '1,046', change: '+22.6%', icon: ShieldCheck, color: 'teal' },
  { label: '기타 사이트', value: '33,057', change: '−3.2%', icon: Link2, color: 'violet' },
];

export default function Overview() {
  return <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">{stats.map(({ label, value, change, icon: Icon, color }) => <article className="metric-card" key={label}><div className="flex items-start justify-between"><span className="text-xs text-[var(--color-text-dim)]">{label}</span><span className={`metric-icon metric-${color}`}><Icon size={16}/></span></div><div className="mt-4 flex items-end justify-between gap-2"><strong className="text-[26px] font-semibold leading-none tracking-[-.04em]">{value}</strong><span className={`change change-${color}`}><ArrowUpRight size={13}/> {change}</span></div></article>)}</section>;
}
