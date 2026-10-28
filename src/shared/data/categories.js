export const categories = [
  { id: 'normal', name: '정상사이트', sourceLabelIds: [1], color: 'var(--color-success-bright)', tone: 'teal' },
  { id: 'gambling', name: '도박사이트', sourceLabelIds: [2], color: 'var(--color-red)', tone: 'red' },
  { id: 'other', name: '기타 사이트', sourceLabelIds: [3, 4], color: 'var(--color-violet)', tone: 'violet' },
  { id: 'harmful', name: '유해 사이트', sourceLabelIds: [5], color: 'var(--color-amber)', tone: 'amber' },
];

export const categoryById = Object.fromEntries(categories.map(category => [category.id, category]));
export const categoryBySourceLabelId = Object.fromEntries(categories.flatMap(category => category.sourceLabelIds.map(labelId => [labelId, category])));
export const categoryForSite = site => categoryBySourceLabelId[Number(site.labelId)];
