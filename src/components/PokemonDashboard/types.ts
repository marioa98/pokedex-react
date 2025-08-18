import type { PokemonInfo, PokemonSpecieInfo } from '@/types/pokemon';

export interface PokemonDashboardProps {
  pokemonInfo: PokemonInfo;
  pokemonSpecie: PokemonSpecieInfo;
  onVariantSelect?: (item: string) => void;
}
