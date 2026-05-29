export const FEED_PAGE_SIZE = 2;

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    totalItems: items.length,
    page: safePage,
  };
}
