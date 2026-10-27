import PageHeader from '../../layouts/PageHeader.jsx';
import DetectedSitesPage from './DetectedSitesPage.jsx';

export default function DetectedSitesRoutePage({ sites, status, error, onReload }) {
  return (
    <>
      <PageHeader title="탐지 사이트" />
      <DetectedSitesPage sites={sites} status={status} error={error} onReload={onReload} />
    </>
  );
}
