import { ArrowUpRight, Check, Clock3, FileWarning, ListChecks } from 'lucide-react';

const items = [
  { icon: Clock3, label: '신고 접수 대기', value: '281', color: 'amber', detail: '평균 대기 18분' },
  { icon: FileWarning, label: '신고서 작성 중', value: '55', color: 'red', detail: '검토가 필요해요' },
  { icon: ListChecks, label: '신고 완료', value: '97', color: 'teal', detail: '오늘 처리됨' },
  { icon: Check, label: '처리 완료', value: '12,254', color: 'blue', detail: '누적 처리' },
];

export default function ReportStatus() {
 return <section className="panel p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="panel-title">신고 처리 현황</h2><p className="mt-1 text-[length:var(--size-10px)] text-[var(--color-muted)]">신고 접수부터 조치까지</p></div><button className="icon-subtle" aria-label="신고 처리 더 보기"><ArrowUpRight size={15}/></button></div><div className="space-y-2">{items.map(({icon:Icon,label,value,color,detail}) => <div className="status-row" key={label}><span className={`status-icon status-${color}`}><Icon size={15}/></span><span className="min-w-0 flex-1"><b className="block text-xs font-medium">{label}</b><small className="text-[length:var(--size-10px)] text-[var(--color-muted)]">{detail}</small></span><strong className="text-base font-semibold tabular-nums">{value}<small className="ml-1 text-[length:var(--size-10px)] font-normal text-[var(--color-muted)]">건</small></strong></div>)}</div></section>
}
