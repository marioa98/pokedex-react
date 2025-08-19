import type { PokemonExternalResource } from "@/types/pokemon";

export interface PokemonContextProps {
  total: number;
  pokemonList: PokemonExternalResource[]
}