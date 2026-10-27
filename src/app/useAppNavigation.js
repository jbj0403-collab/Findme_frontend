import { useEffect, useState } from 'react';

const normalizePath = path => path.replace(/\/+$/, '') || '/dashboard';
const routeTable = {
  '/dashboard': { id: 'dashboard', title: '통합 대시보드', needsData: true },
  '/distribution': { id: 'distribution', title: '유포 사이트 현황' },
  '/sites': { id: 'sites', title: '탐지 사이트', needsData: true },
  '/reports': { id: 'reports', title: '신고 처리' },
};

export default function useAppNavigation() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const syncPath = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);

  const navigate = (event, href) => {
    if (event) event.preventDefault();
    if (window.location.pathname !== href) window.history.pushState({}, '', href);
    setPathname(href);
  };

  return { route: routeTable[normalizePath(pathname)] || routeTable['/dashboard'], navigate };
}
