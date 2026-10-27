import { useCallback, useEffect, useState } from 'react';

export default function useMonitoringData({ enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey(value => value + 1), []);

  useEffect(() => {
    if (!enabled) return undefined;
    const controller = new AbortController();
    let timeoutId;
    let firstRequest = true;
    const load = async () => {
      if (firstRequest) setStatus('loading');
      try {
        const response = await fetch(`/monitoring-data/sites.json?refresh=${Date.now()}-${reloadKey}`, { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('분류 데이터 파일을 불러오지 못했습니다.');
        const result = await response.json();
        if (!Array.isArray(result.sites)) throw new Error('데이터 파일에 사이트 목록이 없습니다.');
        setData(result);
        setError('');
        setStatus('ready');
      } catch (reason) {
        if (reason.name !== 'AbortError') {
          setError(reason.message || '데이터를 읽는 중 오류가 발생했습니다.');
          setStatus('error');
        }
      } finally {
        firstRequest = false;
        if (!controller.signal.aborted) timeoutId = window.setTimeout(load, 3000);
      }
    };
    load();
    return () => { controller.abort(); window.clearTimeout(timeoutId); };
  }, [enabled, reloadKey]);

  return { data, status, error, reload };
}
