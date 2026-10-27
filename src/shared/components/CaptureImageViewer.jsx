import { useEffect, useState } from 'react';
import { RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { categoryForSite } from '../data/categories.js';

export default function CaptureImageViewer({ site, onClose }) {
  const [zoom, setZoom] = useState(100);
  useEffect(() => {
    if (!site) return undefined;
    const onKeyDown = event => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [site, onClose]);
  useEffect(() => { setZoom(100); }, [site?.id]);

  if (!site) return null;
  return <div className="image-viewer-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="image-viewer-dialog" role="dialog" aria-modal="true" aria-label={`${site.domain} 화면 캡처`}>
      <header><div><strong>{site.domain}</strong><span>{categoryForSite(site)?.name || '미분류'} · {site.insertedAt || '탐지 시각 정보 없음'}</span></div><div className="image-viewer-actions"><div className="image-zoom-controls" aria-label="이미지 확대 조절"><button type="button" onClick={() => setZoom(value => Math.max(50, value - 25))} disabled={zoom <= 50} aria-label="이미지 축소"><ZoomOut size={16}/></button><span>{zoom}%</span><button type="button" onClick={() => setZoom(value => Math.min(250, value + 25))} disabled={zoom >= 250} aria-label="이미지 확대"><ZoomIn size={16}/></button><button type="button" onClick={() => setZoom(100)} disabled={zoom === 100} aria-label="확대 비율 초기화"><RotateCcw size={14}/></button></div><button className="image-viewer-close" type="button" onClick={onClose} aria-label="이미지 뷰어 닫기"><X size={20}/></button></div></header>
      <div className="image-viewer-image-wrap"><img src={site.capture} alt={`${site.domain} 전체 화면 캡처`} style={{ width: `${zoom}%` }}/></div>
    </section>
  </div>;
}
