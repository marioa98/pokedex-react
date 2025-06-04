import { getPokedex } from "@/services/pokemon";
import type { PokedexResponse } from "@/types/pokemon";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

const usePokedex = (): UseQueryResult<PokedexResponse> => {
  const response = useQuery({ queryKey: ['pokedex'], queryFn: getPokedex })

  return response;
}

export default usePokedex;