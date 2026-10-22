import { ArrowUpRight, Camera, Radio, TriangleAlert } from 'lucide-react';

const rows = [
  { domain: 'kangwon-resort365.co.kr', time: '14:31:05', kind: '도박 사이트', tone: 'red', source: 'UL852 · OVH', icon: 'X' },
  { domain: 'kangwon-resort.co.kr', time: '14:28:42', kind: '도박 홍보', tone: 'amber', source: 'UL852 · OVH', icon: 'ig' },
  { domain: 'kangwon-resort-king365.co.kr', time: '14:26:19', kind: '주소 모음', tone: 'teal', source: 'UL852 · OVH', icon: 'f' },
  { domain: 'kangwon-resort-co.kr', time: '14:21:57', kind: '도박 사이트', tone: 'red', source: 'UL852 · OVH', icon: 'tg' },
];
const icons = { X: <span className="social-x">𝕏</span>, ig: <Camera size={14}/>, f: <b>f</b>, tg: <Radio size={14}/> };

export default function DetectionLog({ query }) {
 const filtered = rows.filter(r => r.domain.toLowerCase().includes(query.toLowerCase()) || r.kind.includes(query));
 return <section className="panel overflow-hidden"><div className="flex items-center justify-between border-b border-[var(--color-line)] px-4 py-4 sm:px-5"><div><h2 className="panel-title">최근 탐지 로그</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">새롭게 발견된 의심 사이트</p></div><button className="text-[11px] text-[var(--color-teal)] hover:underline">전체 보기 <ArrowUpRight className="inline" size={13}/></button></div><div className="overflow-x-auto"><table className="w-full min-w-[590px] text-left"><thead><tr><th>분류</th><th>사이트 URL</th><th>탐지 시각</th><th>유형</th><th>가입코드</th></tr></thead><tbody>{filtered.length ? filtered.map(r => <tr key={r.domain}><td><span className={`social-icon social-${r.icon}`}>{icons[r.icon]}</span></td><td><a className="domain-link" href={`https://${r.domain}`} onClick={e => e.preventDefault()}>{r.domain}<ArrowUpRight size={12}/></a></td><td className="whitespace-nowrap">2026.09.28 {r.time}</td><td><span className={`tag tag-${r.tone}`}>{r.kind}</span></td><td>{r.source}</td></tr>) : <tr><td colSpan="5" className="py-8 text-center text-[var(--color-muted)]"><TriangleAlert className="mr-2 inline" size={14}/>검색 결과가 없습니다.</td></tr>}</tbody></table></div></section>
}
