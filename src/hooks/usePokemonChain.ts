import { getPokemonEvolutionChainById } from '@/services/pokemon';
import type { PokemonChainData } from '@/types/pokemon';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

const usePokemonChain = (
  id: number,
  evolutionChainURL?: string
): UseQueryResult<PokemonChainData> => {
  const response = useQuery({
    queryKey: ['pokemonChain', id],
    queryFn: () => getPokemonEvolutionChainById(id, evolutionChainURL),
  });

  return response;
};

export default usePokemonChain;
