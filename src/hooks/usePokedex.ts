import { usePokemonContext } from '@/context/PokemonContext/PokemonContext';
import {
  DEFAULT_PAGE_SIZE,
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
  const { total: totalSpecies } = usePokemonContext()
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
    setTotalPages(Math.ceil(totalSpecies / DEFAULT_PAGE_SIZE));
  }, [totalSpecies]);

  return response;
};

export default usePokedex;
