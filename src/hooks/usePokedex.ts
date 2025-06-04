import { getPokedex } from "@/services/pokemon";
import type { PokedexResponse } from "@/types/pokemon";
import { useInfiniteQuery, type InfiniteData, type UseInfiniteQueryResult } from "@tanstack/react-query";

const usePokedex = (): UseInfiniteQueryResult<InfiniteData<PokedexResponse>> => {
  const response = useInfiniteQuery({
    queryKey: ['pokedex'],
    queryFn: async ({ pageParam }) => await getPokedex({ pageNumber: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next === null ? null : allPages.length + 1
    }
  })

  return response;
}

export default usePokedex;