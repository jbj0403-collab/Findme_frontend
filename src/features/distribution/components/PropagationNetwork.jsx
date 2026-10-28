import { useEffect, useRef } from 'react';

const colors = ['var(--color-network-gold)', 'var(--color-network-address)', 'var(--color-network-torrent)', 'var(--color-network-adult)', 'var(--color-network-pink)', 'var(--color-network-white)'];
const hubs = [
  { x: 320, y: 58, label: 'ju5***84.vip', color: 1 }, { x: 495, y: 82, label: 'tot***k4.com', color: 1 },
  { x: 195, y: 152, label: 'all***87.xyz', color: 1 }, { x: 285, y: 330, label: 'moa***oa.net', color: 1 },
  { x: 430, y: 375, label: 'CP215', color: 0 }, { x: 560, y: 485, label: 'hub***99.shop', color: 1 },
  { x: 150, y: 485, label: 'vip17', color: 0 }, { x: 570, y: 220, label: '1522', color: 0 },
  { x: 405, y: 220, label: '6802', color: 0 }, { x: 60, y: 280, label: '', color: 1 },
  { x: 610, y: 455, label: '1380', color: 0 },
];
const leafNodes = Array.from({ length: 112 }, (_, i) => {
  const angle = i * 2.399963;
  const radius = 42 + ((i * 37) % 190);
  const center = hubs[(i * 7 + Math.floor(i / 9)) % hubs.length];
  return { x: Math.max(12, Math.min(650, center.x + Math.cos(angle) * radius)), y: Math.max(15, Math.min(520, center.y + Math.sin(angle) * radius * 0.75)), color: (i * 13 + Math.floor(i / 4)) % colors.length, r: 2.2 + (i % 5) * 0.3, to: center };
});

export default function PropagationNetwork() {
  const offsetRef = useRef({ x: 0, y: 0 });
  const mapRef = useRef(null);
  const dragRef = useRef(null);
  const zoomRef = useRef(1);
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;
    const onWheel = event => {
      event.preventDefault();
      event.stopPropagation();
      const factor = event.deltaY < 0 ? 1.1 : 0.9;
      const nextZoom = clamp(zoomRef.current * factor, 0.65, 2.2);
      zoomRef.current = nextZoom;
      svg.style.setProperty('--network-zoom', String(nextZoom));
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, []);

  const handlePointerDown = event => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: offsetRef.current.x, y: offsetRef.current.y };
  };
  const handlePointerMove = event => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const next = {
      x: clamp(drag.x + event.clientX - drag.startX, -180, 180),
      y: clamp(drag.y + event.clientY - drag.startY, -90, 90),
    };
    offsetRef.current = next;
    event.currentTarget.style.setProperty('--network-drag-x', `${next.x}px`);
    event.currentTarget.style.setProperty('--network-drag-y', `${next.y}px`);
  };
  const finishDrag = event => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return <div className="propagation-column"><section className="panel propagation-panel">
    <h2 className="panel-title">유포 관계망 박스</h2>
    <div className="network-stage">
      <svg
        className="network-svg"
        ref={mapRef}
        viewBox="0 0 680 540"
        aria-label="유포 사이트 연결 관계망. 드래그하여 이동하고 마우스 휠로 확대하거나 축소할 수 있습니다."
        title="드래그 이동 · 휠 확대/축소"
        role="group"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={() => { dragRef.current = null; }}
      >
        {leafNodes.map((node, i) => <line key={`edge-${i}`} x1={node.to.x} y1={node.to.y} x2={node.x} y2={node.y} className="network-edge" style={{ "--animation-order": i }}/>) }
        {leafNodes.map((node, i) => <circle key={`leaf-${i}`} cx={node.x} cy={node.y} r={node.r} fill={colors[node.color]} className="network-leaf" style={{ "--animation-order": i }}/>) }
        {hubs.map((hub, i) => <g key={`hub-${i}`} className="network-hub-group" style={{ "--animation-order": i }}><circle cx={hub.x} cy={hub.y} r="var(--radius-network-hub-glow)" fill={colors[hub.color]} opacity="var(--opacity-network-hub)"/><circle cx={hub.x} cy={hub.y} r="var(--radius-network-hub)" fill={colors[hub.color]} className="network-hub"/>{hub.label && <text x={hub.x} y={hub.y - 16} textAnchor="middle" fill={colors[hub.color]} className="network-hub-label">{hub.label}</text>}</g>)}
      </svg>
      <div className="network-sidecards">
        <section className="network-rank-card"><h3>유포 순위 (검침)</h3><div className="network-rank-columns"><div><b>유포사이트</b><div className="network-rank-row"><span>tot***ha.net 주소모음</span><strong>38</strong></div><div className="network-rank-row"><span>jus***gg.com 도박</span><strong>24</strong></div><div className="network-rank-row"><span>moa***k.cc 토렌트</span><strong>19</strong></div></div><div><b>가입코드</b><div className="network-rank-row"><span>vip49</span><strong>50</strong></div><div className="network-rank-row"><span>AH814</span><strong>31</strong></div><div className="network-rank-row"><span>7721</span><strong>28</strong></div></div></div></section>
        <section className="network-rank-card network-status-card"><h3>표시 현황 (검침)</h3><b>지금 화면에 올린 수</b><p>도박 72 · 주소모음 2 · 토렌트 1 · 성인 1</p><p>SNS 게시물 12 · 가입코드 표기 연결선 23</p></section>
      </div>
    </div>
  </section><div className="network-legend">{[['도박', colors[0]], ['주소모음', colors[1]], ['토렌트', colors[2]], ['성인', colors[3]], ['SNS 게시물', colors[4]]].map(([label, color]) => <span key={label}><i style={{ background: color }}/>{label}</span>)}<small>→ 주소를 올린 쪽에서 도박사이트로, 점 크기 = 유포한 수 — 금색 = 여러 곳에서 같은 가입코드</small></div></div>;
}
