import { getPokemon, getPokemonSpecie } from '@/services/pokemon';
import type { PokemonInfo, PokemonSpecieInfo } from '@/types/pokemon';
import { useQueries, type UseQueryResult } from '@tanstack/react-query';

interface UsePokemonOptions {
  url?: string;
  enabled?: boolean;
}

const usePokemon = (
  name: string,
  { url, enabled = true }: UsePokemonOptions = {}
): [UseQueryResult<PokemonInfo>, UseQueryResult<PokemonSpecieInfo>] => {
  const response = useQueries({
    queries: [
      {
        queryKey: ['pokemon', name],
        queryFn: () => getPokemon(url ?? `/pokemon/${name}`),
        enabled: !!name && enabled,
      },
      {
        queryKey: ['pokemon-specie', name],
        queryFn: () => getPokemonSpecie(name),
        enabled: !!name && enabled,
      },
    ],
  });

  return response;
};

export default usePokemon;
