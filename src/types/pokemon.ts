export interface PokemonExternalResource {
  name: string;
  url: string;
}

export interface PokedexResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: PokemonExternalResource[];
}

interface PokedexNumber {
  entry_number: number;
  pokedex: PokemonExternalResource;
}

interface PokemonName {
  name: string;
  language: PokemonExternalResource;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: PokemonExternalResource;
  version: PokemonExternalResource;
}

interface FormDescription {
  description: string;
  language: PokemonExternalResource;
}

export interface PokemonGenera {
  genus: string;
  language: PokemonExternalResource
}

interface PokemonVariety {
  is_default: boolean;
  pokemon: PokemonExternalResource;
}

export interface PokemonAbility {
  ability: PokemonExternalResource;
  is_hidden: boolean;
  slot: number;
}

interface PokemonGameIndex {
  game_index: number;
  version: PokemonExternalResource;
}

interface PokemonMove {
  move: PokemonExternalResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: PokemonExternalResource;
    order: null;
    version: PokemonExternalResource
  }[]
}

interface PokemonSprite {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export type PokemonType =
  'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | 'stellar' | 'unknown'

export interface PokemonTypeInfo {
  slot: number;
  type: { name: PokemonType } & PokemonExternalResource;
}

export interface PokemonInfo {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: PokemonExternalResource[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_abilities: {
    abilities: PokemonAbility[];
    generation: PokemonExternalResource;
  }[];
  past_types: unknown[];
  species: PokemonExternalResource;
  sprites: PokemonSprite;
  types: PokemonTypeInfo[];
  weight: number;
}

export interface PokemonSpecieInfo {
  base_happiness: number;
  capture_rate: number;
  color: PokemonExternalResource;
  egg_groups: PokemonExternalResource[];
  evolution_chain: PokemonExternalResource;
  evolves_from_species: PokemonExternalResource;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: FormDescription[]
  forms_switchable: boolean;
  gender_rate: number;
  genera: PokemonGenera[];
  generation: PokemonExternalResource;
  growth_rate: PokemonExternalResource;
  habitat: string | null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: PokemonName[];
  order: number;
  pokedex_numbers: PokedexNumber[];
  shape: PokemonExternalResource;
  varieties: PokemonVariety[];
}

export type PokemonFullInfo = PokemonInfo & PokemonSpecieInfo;

// Evolution Chain Types

interface EvolutionDetail {
  gender: null | number;
  held_item: null | PokemonExternalResource;
  item: null | PokemonExternalResource;
  known_move: null | PokemonExternalResource;
  known_move_type: null | PokemonExternalResource;
  location: null | PokemonExternalResource;
  min_affection: null | number;
  min_beauty: null | number;
  min_level: null | number;
  needs_overworld_rain: boolean;
  party_species: null | PokemonExternalResource;
  party_type: null | PokemonExternalResource;
  relative_physical_stats: null | number;
  time_of_day: string;
  trade_species: null | PokemonExternalResource;
  trigger: PokemonExternalResource;
  turn_upside_down: boolean;
}

export interface PokemonEvolutionLine {
  evolution_details: EvolutionDetail[];
  evolves_to: PokemonEvolutionLine[];
  is_baby: boolean;
  species: PokemonExternalResource;
}
export interface PokemonChainData {
  baby_trigger_item: null | PokemonExternalResource;
  chain: PokemonEvolutionLine
  id: number;
}
