import {
  DEFAULT_PAGE_SIZE,
  getAllSpecies,
  getPokedex,
} from '@/services/pokemon';
import type { PokedexResponse } from '@/types/pokemon';
import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const getPageSize = (
  currentPage: number,
  totalPages: number,
  totalItems: number
): number => {
  if (currentPage === totalPages) {
    return totalItems - (totalPages - 1) * DEFAULT_PAGE_SIZE;
  }

  return DEFAULT_PAGE_SIZE;
};

const usePokedex = (): UseInfiniteQueryResult<
  InfiniteData<PokedexResponse>
> => {
  const [totalSpecies, setTotalSpecies] = useState<number>(-1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const response = useInfiniteQuery({
    queryKey: ['pokedex'],
    queryFn: async ({ pageParam }) => {
      const pageSize = getPageSize(pageParam, totalPages, totalSpecies);

      const response = await getPokedex({
        pageNumber: pageParam,
        pageSize,
        offset: pageParam === totalPages ? totalSpecies - pageSize : undefined,
      });

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (totalPages === allPages.length) return null;
      return lastPage.next === null ? null : allPages.length + 1;
    },
    enabled: totalSpecies !== -1,
  });

  useEffect(() => {
    getAllSpecies().then((species) => {
      setTotalSpecies(species.count);
      setTotalPages(Math.ceil(species.count / DEFAULT_PAGE_SIZE));
    });
  });

  return response;
};

export default usePokedex;
