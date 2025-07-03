import type { PokemonInfo, PokemonSpecieInfo } from "@/types/pokemon";

export interface PokemonDashboardProps {
  data: PokemonInfo & PokemonSpecieInfo
}