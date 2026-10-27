import { X } from 'lucide-react';
import { categoryForSite } from '../../shared/data/categories.js';

export default function SiteDetailsDialog({ site, onClose }) {
  if (!site) return null;
  const category = categoryForSite(site);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-label={`${site.domain} 사이트 캡처`} className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] shadow-2xl"><header className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] p-4 sm:p-5"><div className="min-w-0"><span className="tag" style={{ color: category?.color, borderColor: `${category?.color}80` }}>{category?.name}</span><h2 className="mt-2 break-all text-sm font-semibold">{site.domain}</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">등록 {site.insertedAt} · ID {site.id}</p></div><button className="icon-subtle shrink-0" onClick={onClose} aria-label="닫기"><X size={16}/></button></header>{site.capture ? <img src={site.capture} alt={`${site.domain} 수집 캡처`} className="mx-auto max-h-[70vh] max-w-full object-contain"/> : <div className="p-12 text-center text-xs text-[var(--color-muted)]">캡처 이미지가 없습니다.</div>}</section></div>;
}
