import { categories, categoryForSite } from '../../../shared/data/categories.js';

export function rootDomain(value = '') {
  const host = value.toLowerCase().replace(/^www\./, '').split(':')[0];
  const parts = host.split('.').filter(Boolean);
  if (parts.length <= 2) return host;
  const compoundSuffixes = new Set(['co.kr', 'or.kr', 'go.kr', 'ac.kr', 'com.au', 'co.jp']);
  const lastTwo = parts.slice(-2).join('.');
  return compoundSuffixes.has(lastTwo) ? parts.slice(-3).join('.') : lastTwo;
}

export function getDomainGroups(sites) {
  const groups = new Map();
  sites.forEach(site => {
    const root = rootDomain(site.domain);
    if (!root) return;
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(site);
  });
  return [...groups.entries()].map(([domain, members]) => ({ domain, members, count: members.length })).sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain));
}

export function countCategories(sites) {
  return categories.map(category => ({ ...category, count: sites.filter(site => categoryForSite(site)?.id === category.id).length }));
}

export { categories, categoryForSite };
