import type { RequestOptions } from '@/types/requests';

export const getRequestOffset = (params: RequestOptions): number => {
  const page = Math.max(params.pageNumber || 1, 1);
  const size = Math.max(params.pageSize || 1, 1);
  return (page - 1) * size;
};
