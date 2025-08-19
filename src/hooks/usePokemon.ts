import { getPokemon, getPokemonSpecie } from '@/services/pokemon';
import type { PokemonInfo, PokemonSpecieInfo } from '@/types/pokemon';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

interface UsePokemonOptions {
  url?: string;
  enabled?: boolean;
}

const usePokemon = (
  name: string,
  { url, enabled = true }: UsePokemonOptions = {}
): UseQueryResult<PokemonInfo> => {
  const response = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => getPokemon(url ?? `/pokemon/${name}`),
    enabled: !!name && enabled,
  });

  return response;
};

export const usePokemonSpecie = (
  name: string,
  enabled = true
): UseQueryResult<PokemonSpecieInfo> => {
  const response = useQuery<PokemonSpecieInfo>({
    queryKey: ['pokemon-specie', name],
    queryFn: () => getPokemonSpecie(name),
    enabled: !!name && enabled,
  });

  return response;
};

export default usePokemon;
