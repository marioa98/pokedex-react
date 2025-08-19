import type {
  PokemonInfo,
  PokedexResponse,
  PokemonSpecieInfo,
  PokemonChainData,
} from '@/types/pokemon';
import type { RequestOptions } from '@/types/requests';
import { getRequestOffset } from '@/utils/axios';
import axios from 'axios';

export const DEFAULT_PAGE_SIZE = 20;

export const getPokedex = async ({
  pageNumber = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  offset: customOffset,
}: RequestOptions = {}): Promise<PokedexResponse> => {
  const offset = customOffset ?? getRequestOffset({ pageNumber, pageSize });
  const { data } = await axios.get<PokedexResponse>(
    `/pokemon?limit=${pageSize}&offset=${offset}`
  );

  return data;
};

export const getPokemon = async (url: string): Promise<PokemonInfo> => {
  try {
    const { data } = await axios.get<PokemonInfo>(url);

    return data;
  } catch (error) {
    console.error('Error fetching Pokémon info:', error);
    throw error;
  }
};

export const getAllSpecies = async ({
  pageNumber = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: RequestOptions = {}): Promise<PokedexResponse> => {
  const { data } = await axios.get<PokedexResponse>(
    `/pokemon-species?limit=${pageSize}&offset=${getRequestOffset({ pageNumber, pageSize })}`
  );

  return data;
};

export const getPokemonSpecie = async (
  name?: string
): Promise<PokemonSpecieInfo> => {
  try {
    const { data } = await axios.get<PokemonSpecieInfo>(
      `/pokemon-species/${name}`
    );
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon species info:', error);
    throw error;
  }
};

export const getPokemonFullInfo = async (
  name: string
): Promise<{ pokemon: PokemonInfo; pokemonSpecie: PokemonSpecieInfo }> => {
  try {
    const speciesData = await getPokemonSpecie(name);
    const pokemonInfoData = await getPokemon(`/pokemon/${speciesData.id}`);
    return { pokemon: pokemonInfoData, pokemonSpecie: speciesData };
  } catch (error) {
    console.error('Error fetching Pokémon full info:', error);
    throw error;
  }
};

export const getPokemonEvolutionChainById = async (
  id: number,
  evolutionChainURL?: string
): Promise<PokemonChainData> => {
  const { data } = await axios.get<PokemonChainData>(
    evolutionChainURL ?? `/evolution-chain/${id}`
  );

  return data;
};
