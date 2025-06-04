export interface PokedexResult {
  name: string;
  url: string;
}

export interface PokedexResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokedexResult[];
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  }
}


interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

// @TODO: Update the interface as needed.
export interface PokemonInfo {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: PokedexResult[];
  game_indices: GameIndex[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  types: PokemonType[];
  weight: number;
}