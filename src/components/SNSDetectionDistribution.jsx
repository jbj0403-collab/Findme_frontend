const items = [{label:'X',pct:'20%',color:'var(--color-violet)'},{label:'Instagram',pct:'26.7%',color:'var(--color-amber)'},{label:'Facebook',pct:'53.3%',color:'#37d7a1'}];

export default function SNSDetectionDistribution() {
 return <section className="panel aligned-panel p-4 sm:p-5"><div className="mb-4"><h2 className="panel-title">SNS 탐지 분포</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">플랫폼별 탐지 비중</p></div><div className="distribution-content"><div className="donut donut-sns"><div><strong>53.3%</strong><small>Facebook</small></div></div><div className="min-w-0 flex-1 space-y-3">{items.map(c=><div className="dist-item" key={c.label}><i style={{background:c.color}}/><span>{c.label}</span><b>{c.pct}</b></div>)}</div></div></section>
}
