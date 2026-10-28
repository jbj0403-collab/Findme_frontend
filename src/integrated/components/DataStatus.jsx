import { CheckCircle2, Database, Image, Layers3 } from 'lucide-react';
import { categories, categoryForSite } from '../../shared/data/categories.js';

export default function DataStatus({ sites, generatedAt }) {
  const captureCount = sites.filter(site => site.capture).length;
  const labelCount = new Set(sites.map(site => categoryForSite(site)?.id).filter(Boolean)).size;
  const items = [
    { icon: Database, label: '사이트 레코드', value: sites.length },
    { icon: Layers3, label: '연결된 분류', value: `${labelCount} / ${categories.length}` },
    { icon: Image, label: '화면 캡처', value: captureCount },
  ];
  return <section className="panel h-full min-h-[var(--size-290px)] p-4 sm:p-5"><div className="flex items-start justify-between gap-2"><div><h2 className="panel-title">데이터 연결 상태</h2><p className="mt-1 text-[length:var(--size-10px)] text-[var(--color-muted)]">website_data 가져오기 결과</p></div><span className="flex items-center gap-1.5 rounded-full bg-[var(--color-success-soft)] px-2 py-1 text-[length:var(--size-9px)] text-[var(--color-success)]"><CheckCircle2 size={12}/>연결됨</span></div><div className="mt-5 space-y-3">{items.map(({icon:Icon,label,value})=><div className="flex items-center gap-2.5" key={label}><Icon size={14} className="text-[var(--color-muted)]"/><span className="flex-1 text-[length:var(--size-10px)] text-[var(--color-text-dim)]">{label}</span><b className="text-xs">{value}</b></div>)}</div><div className="mt-5 border-t border-[var(--color-line)] pt-3"><p className="text-[length:var(--size-9px)] text-[var(--color-muted)]">데이터 파일 갱신 시 가져오기 스크립트를 다시 실행하세요.</p><p className="mt-2 text-[length:var(--size-9px)] text-[var(--color-muted)]">마지막 생성 · {generatedAt || '—'}</p></div></section>;
}
