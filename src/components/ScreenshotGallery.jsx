import { Expand, ImageOff } from 'lucide-react';

const cards = [
  { name: '강원 리조트 이벤트 페이지', domain: 'kangwon-resort365.co.kr', tone: 'pink', kind: '도박 홍보' },
  { name: '스포츠 베팅 랜딩 페이지', domain: 'sports-now88.com', tone: 'blue', kind: '도박 사이트' },
  { name: '가입 코드 홍보 게시물', domain: 'community.example', tone: 'amber', kind: 'SNS 게시물' },
  { name: '카지노 혜택 안내 페이지', domain: 'event-casino24.com', tone: 'pink', kind: '도박 사이트' },
  { name: '불법 사이트 광고 게시물', domain: 'social-feed.example', tone: 'blue', kind: 'SNS 게시물' },
  { name: '신규 가입 페이지', domain: 'join-now777.net', tone: 'amber', kind: '도박 홍보' },
];

export default function ScreenshotGallery() {
 return <section className="panel gallery-expanded p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><div><h2 className="panel-title">탐지 사이트 화면 캡처</h2><p className="mt-1 text-[10px] text-[var(--color-muted)]">최근 수집된 페이지 미리보기</p></div><button className="text-[11px] text-[var(--color-teal)]">모두 보기 <Expand className="ml-1 inline" size={12}/></button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 2xl:grid-cols-6">{cards.map(c=><article className="capture-card" key={c.domain}><div className={`capture-preview preview-${c.tone}`}><div className="fake-browser"><i/><i/><i/><span>{c.domain}</span></div><div className="preview-copy"><b>{c.name}</b><div className="preview-pills"><i/><i/><i/></div><div className="preview-button"/></div><span className="capture-overlay"><ImageOff size={15}/> 증거 자료</span></div><div className="flex items-center justify-between gap-2 px-2 py-2"><span className="truncate text-[10px] text-[var(--color-text-dim)]">{c.domain}</span><span className="tag tag-red">{c.kind}</span></div></article>)}</div></section>
}
