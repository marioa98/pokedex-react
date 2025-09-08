import { getPokemonType } from '@/services/pokemon';
import type { PokemonType, PokemonTypeInfo } from '@/types/pokemon';
import { useQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const usePokemonWeakness = (types: PokemonTypeInfo[]) => {
  const [weaknesses, setWeaknesses] = useState<PokemonType[]>([]);
  const results = useQueries({
    queries: types.map(({ type }) => ({
      queryKey: ['pokemon-type', type.name],
      queryFn: () => getPokemonType(type.url),
    })),
    combine: (results) => {
      return results.map(({ data }) => {
        if (!data) return;
        const { damage_relations: { double_damage_from } } = data

        return double_damage_from.map(({ name }) => name);
      })
    },
  });

  useEffect(() => {
    const weaknesses = results.flat().filter((name, _, currentArray) => currentArray.includes(name) && name) as PokemonType[];
    setWeaknesses(weaknesses);
  }, [results]);

  return weaknesses
};

export default usePokemonWeakness;
