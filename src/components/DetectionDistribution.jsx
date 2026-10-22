const items = [{label:'도박',value:'82,215',pct:'42.5%',color:'var(--color-red)'},{label:'유해',value:'72,945',pct:'23.5%',color:'var(--color-amber)'},{label:'정상',value:'2,218',pct:'11.0%',color:'var(--color-teal)'},{label:'기타',value:'33,057',pct:'23.0%',color:'var(--color-violet)'}];

export default function DetectionDistribution() {
 return <section className="panel aligned-panel p-4 sm:p-5"><div className="mb-4"><h2 className="panel-title">탐지 분포</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">유형별 탐지 비율</p></div><div className="distribution-content"><div className="donut"><div><strong>42.5%</strong><small>도박</small></div></div><div className="min-w-0 flex-1 space-y-3">{items.map(c=><div className="dist-item" key={c.label}><i style={{background:c.color}}/><span>{c.label}</span><b>{c.value}</b><small>{c.pct}</small></div>)}</div></div></section>
}
