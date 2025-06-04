import { getPokemonByName } from "@/services/pokemon"
import type { PokemonInfo } from "@/types/pokemon";
import { useQuery, type UseQueryResult } from "@tanstack/react-query"

const usePokemon = (name: string): UseQueryResult<PokemonInfo> => {
  const response = useQuery({ queryKey: ['pokemon', name], queryFn: () => getPokemonByName(name) })
  return response;
}

export default usePokemon;
