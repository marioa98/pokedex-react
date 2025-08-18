import { getPokemon, getPokemonEvolutionChainById } from '@/services/pokemon';
import {
  type PokemonChainData,
  type PokemonEvolutionLine,
  type PokemonInfo,
} from '@/types/pokemon';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

type EvolutionChain = (PokemonInfo | PokemonInfo[])[];
interface PokemonEvolutionHook {
  isLoading: boolean;
  data: EvolutionChain;
}

const usePokemonEvolution = (
  id: number,
  evolutionUrl: string
): PokemonEvolutionHook => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [pokemonEvolutionLine, setEvolutionLine] = useState<EvolutionChain>([]);

  const { data: pokemonEvolutionData } = useQuery<PokemonChainData>({
    queryKey: ['pokemon-evolution-base', id],
    queryFn: () => getPokemonEvolutionChainById(id, evolutionUrl),
  });

  const getEvolutionLine = useCallback(
    async (
      data: PokemonEvolutionLine | PokemonEvolutionLine[],
      prevEvolution: EvolutionChain = []
    ): Promise<EvolutionChain> => {
      let currentPokemonData: PokemonInfo[] | PokemonInfo;

      if (Array.isArray(data)) {
        currentPokemonData = await Promise.all(
          data.map((pokemon) => getPokemon(pokemon.species.url))
        );
      } else {
        currentPokemonData = await getPokemon(data.species.url);
      }

      const evolutionChain: EvolutionChain = [
        ...prevEvolution,
        currentPokemonData,
      ];

      if (!Array.isArray(data) && data.evolves_to.length) {
        const nextEvolution =
          data.evolves_to.length === 1 ? data.evolves_to[0] : data.evolves_to;
        return await getEvolutionLine(nextEvolution, evolutionChain);
      }

      return evolutionChain;
    },
    []
  );

  useEffect(() => {
    if (pokemonEvolutionData) {
      getEvolutionLine(pokemonEvolutionData.chain)
        .then((evolutionChain) => {
          setEvolutionLine(evolutionChain);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [pokemonEvolutionData, getEvolutionLine]);

  return {
    data: pokemonEvolutionLine,
    isLoading,
  };
};

export default usePokemonEvolution;
