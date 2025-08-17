import { type PokemonInfo, type PokedexResponse, type PokemonSpecieInfo, type PokemonChainData } from "@/types/pokemon";
import type { RequestOptions } from "@/types/requests";
import { getRequestOffset } from "@/utils/axios";
import axios, { type AxiosResponse } from "axios"

export const DEFAULT_PAGE_SIZE = 20;

export const getPokedex = async ({
  pageNumber = 1,
  pageSize = DEFAULT_PAGE_SIZE
}: RequestOptions = {}): Promise<PokedexResponse> => {
  const offset = getRequestOffset({ pageNumber, pageSize })
  const { data } = await axios.get<PokedexResponse>(`/pokemon-species?limit=${pageSize}&offset=${offset}`);

  return data
}

export const getPokemon = async (url: string): Promise<PokemonInfo> => {
  const { data } = await axios.get<PokemonInfo>(url);

  return data;
}

export const getPokemonSpecie = async (name?: string): Promise<PokemonSpecieInfo> => {
  const { data } = await axios.get<PokemonSpecieInfo>(`/pokemon-species/${name}`);
  return data
}

export const getPokemonEvolutionChainById = async (id: number, evolutionChainURL?: string): Promise<PokemonChainData> => {
  const { data } = await axios.get<PokemonChainData>(evolutionChainURL ?? `/evolution-chain/${id}`);

  return data;
}