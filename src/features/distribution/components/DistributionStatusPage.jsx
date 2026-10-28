import PageHeader from '../../../layouts/PageHeader.jsx';
import DistributionOverview from './DistributionOverview.jsx';
import PropagationNetwork from './PropagationNetwork.jsx';
import DistributionTrend from './DistributionTrend.jsx';

export default function DistributionStatusPage() {
  return <div className="distribution-reference-page">
    <PageHeader title="유포 사이트 현황" />
    <div className="distribution-reference-content">
      <div className="distribution-main-grid">
        <DistributionOverview/>
        <PropagationNetwork/>
      </div>
      <DistributionTrend/>
    </div>
  </div>;
}
