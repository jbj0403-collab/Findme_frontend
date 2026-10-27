import { Globe2, ShieldAlert, ShieldCheck, Layers3 } from 'lucide-react';
import { categories } from '../../shared/data/categories.js';

const icons = { normal: ShieldCheck, gambling: ShieldAlert, other: Layers3, harmful: Globe2 };

export default function MetricCards({ sites }) {
  return <section aria-label="분류별 사이트 수" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
    {categories.map(category => {
      const Icon = icons[category.id] || Globe2;
      const count = sites.filter(site => category.sourceLabelIds.includes(Number(site.labelId))).length;
      return <article className="metric-card" key={category.id}>
        <div className="flex items-start justify-between gap-2"><span className="min-h-8 text-xs leading-5 text-[var(--color-text-dim)]">{category.name}</span><span className="metric-icon" style={{ color: category.color, backgroundColor: `${category.color}1A` }}><Icon size={16}/></span></div>
        <strong className="mt-3 block text-[26px] font-semibold leading-none tracking-[-.04em]">{count.toLocaleString('ko-KR')}<small className="ml-1 text-xs font-normal text-[var(--color-muted)]">개</small></strong>
      </article>;
    })}
  </section>;
}
