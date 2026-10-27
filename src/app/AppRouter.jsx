import useAppNavigation from './useAppNavigation.js';
import WorkspaceLayout from '../layouts/WorkspaceLayout.jsx';
import DashboardPage from '../features/dashboard/DashboardPage.jsx';
import DistributionStatusPage from '../features/distribution/components/DistributionStatusPage.jsx';
import DetectedSitesRoutePage from '../features/sites/DetectedSitesRoutePage.jsx';
import ReportsRoutePage from '../features/reports/ReportsRoutePage.jsx';
import useMonitoringData from '../shared/data/useMonitoringData.js';

function RouteContent({ route, sites, status, error, generatedAt, reload, navigate }) {
  switch (route.id) {
    case 'dashboard':
      return <DashboardPage sites={sites} status={status} error={error} generatedAt={generatedAt} onReload={reload} onNavigate={navigate} />;
    case 'distribution':
      return <DistributionStatusPage />;
    case 'sites':
      return <DetectedSitesRoutePage sites={sites} status={status} error={error} onReload={reload} />;
    case 'reports':
      return <ReportsRoutePage />;
    default:
      return null;
  }
}

export default function AppRouter() {
  const { route, navigate } = useAppNavigation();
  const { data, status, error, reload } = useMonitoringData({ enabled: Boolean(route.needsData) });

  return (
    <WorkspaceLayout route={route} generatedAt={data?.generatedAt} status={status} onNavigate={navigate}>
      <RouteContent
        route={route}
        sites={data?.sites ?? []}
        status={status}
        error={error}
        generatedAt={data?.generatedAt}
        reload={reload}
        navigate={navigate}
      />
    </WorkspaceLayout>
  );
}
