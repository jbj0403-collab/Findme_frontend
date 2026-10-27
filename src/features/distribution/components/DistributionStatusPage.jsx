import { Bell, CircleHelp, Command } from 'lucide-react';
import DistributionOverview from './DistributionOverview.jsx';
import PropagationNetwork from './PropagationNetwork.jsx';
import DistributionTrend from './DistributionTrend.jsx';

export default function DistributionStatusPage() {
  return <div className="distribution-reference-page">
    <header className="distribution-reference-header">
      <div className="flex items-center gap-3"><span className="brand-mark xl:hidden"><Command size={18}/></span><div><div className="flex items-center gap-2 text-[11px] text-[var(--color-muted)]"><span>WORKSPACE</span><span>/</span><span className="text-[var(--color-text-dim)]">유포 사이트 현황</span></div><h1 className="mt-1 text-xl font-semibold tracking-tight text-[var(--color-text)]">유포 사이트 현황</h1></div></div>
      <div className="flex items-center gap-2"><button className="icon-button" aria-label="알림"><Bell size={17}/><i/></button><button className="help-button hidden md:flex"><CircleHelp size={15}/> 도움말</button><div className="distribution-reference-account ml-2"><button>LOGIN</button><i/><button>ADMIN</button></div></div>
    </header>
    <div className="distribution-reference-content">
      <div className="distribution-main-grid">
        <DistributionOverview/>
        <PropagationNetwork/>
      </div>
      <DistributionTrend/>
    </div>
  </div>;
}
