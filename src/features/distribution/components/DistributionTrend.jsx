const domain = [32, 45, 45, 39, 58, 48, 58, 57, 52, 53, 47, 61, 47, 51, 41, 48, 38, 40, 34, 25, 39, 30, 23, 26, 29, 35, 25, 32, 34];
const codes = [16, 18, 15, 15, 16, 16, 16, 17, 15, 16, 13, 14, 13, 14, 13, 14, 13, 14, 14, 13, 16, 17, 15, 14, 15, 16, 14, 15, 16];
const posts = [21, 18, 19, 22, 20, 19, 17, 20, 18, 21, 16, 17, 19, 16, 20, 16, 15, 19, 17, 17, 19, 17, 16, 19, 21, 19, 17, 19, 20];
const polyline = values => values.map((value, i) => `${i / (values.length - 1) * 1000},${90 - value}`).join(' ');

export default function DistributionTrend() {
  return <section className="panel distribution-trend-panel">
    <div className="distribution-trend-heading"><h2 className="panel-title">신규 등장 추이 박스</h2><div className="distribution-trend-legend"><span><i style={{ borderColor: '#d94b4b' }}/>신규 도메인</span><span><i style={{ borderColor: '#f1c543' }}/>신규 가입코드</span><span><i className="trend-dashed"/>신규 게시 계정</span></div></div>
    <div className="distribution-trend-chart static-trend"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" role="img" aria-label="신규 도메인, 가입코드, 게시 계정 추이 예시">{[20, 55, 90].map(y => <line key={y} x1="0" x2="1000" y1={y} y2={y} className="distribution-grid-line"/>)}<polyline points={polyline(domain)} fill="none" stroke="#d94b4b" strokeWidth="2.7" vectorEffect="non-scaling-stroke"/><polyline points={polyline(codes)} fill="none" stroke="#f1c543" strokeWidth="2.3" vectorEffect="non-scaling-stroke"/><polyline points={polyline(posts)} fill="none" stroke="#f2f4f8" strokeWidth="2.2" strokeDasharray="7 6" vectorEffect="non-scaling-stroke"/></svg></div>
    <div className="distribution-trend-dates">{['8/30', '9/03', '9/07', '9/11', '9/15', '9/19', '9/23', '9/28'].map(day => <span key={day}>{day}</span>)}</div>
  </section>;
}
